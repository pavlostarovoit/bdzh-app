//ESP32-WROOM-DA Module
#include <Arduino.h>
#include <WiFi.h>
#include <SPI.h>
#include <SD.h>
#include <ADS1256.h>
#include "esp_wifi.h"

// --- КОНФІГУРАЦІЯ ПІНІВ ---
#define ADS1256_CS 5
#define ADS1256_DRDY 4
#define SD_CS 21
#define BUZZER_PIN 22
#define LAUNCH_PIN 27

// --- НАЛАШТУВАННЯ ДАТЧИКІВ ---
ADS1256 ads(ADS1256_DRDY, 0, 0, ADS1256_CS, 2.500);
long zeroOffset = 7500;
float coefficient = -0.001871;
float tareOffset = 0;
float pressure = 0.0;
float maxPressureRange = 10.0; // МПа

// --- НАЛАШТУВАННЯ МЕРЕЖІ ---
const char* ssid = "bdzh.space";
const char* password = "bdzh.space";
WiFiServer server(80);

// --- ГЛОБАЛЬНІ ЗМІННІ ---
File logFile;
char timeStr[16];
unsigned long recStartMillis = 0;
unsigned long rate = 0;
float thrust = 0;
unsigned long samples = 0;
String state = "S";
int rssi = 0;

// Поля для запису (POST-запити)
String postMessage = "";
String fileName = "";
String totalMass = ""; // g
String fuelMass = ""; // g
String propNote = "";
String currentTime = "";
String studyNote = "";
String totalImpulse = ""; // Ns
String specificImpulse = ""; // s
String peakThrust = ""; // kg
String averageThrust = ""; // kg
String peakPressure = ""; // MPa
String averagePressure = ""; // MPa
String twr = ""; // Ns/kg
String burnDuration = ""; // s
String graphSVG = "";

bool writeSetup = false;
bool writeSave = false;

// Запал
bool launch = false;
unsigned long samplesStamp = 0;
unsigned long lastMesDataMillis = 0;
unsigned long launchStartMillis = 0;

// === НЕБЛОКУЮЧИЙ BUZZER ===
unsigned long buzzerStartMillis = 0;
unsigned long buzzerInterval = 0;
int buzzerTimesLeft = 0;
bool buzzerState = HIGH;

// Фільтр
double filteredValue = 0.0;
static bool firstReading = true;
double alpha = 0.1;
bool autoTarePending = true; // Прапорець для авто-тарування при запуску

// FreeRTOS
TaskHandle_t taskMeasure, taskWeb;
SemaphoreHandle_t spiMutex;

// ====================== BEEP (НОВА КОНСИСТЕНТНА СИСТЕМА) ======================
void beep(int times, int duration_ms) {
  if (times <= 0) return;
  digitalWrite(BUZZER_PIN, LOW);
  buzzerStartMillis = millis();
  buzzerInterval = duration_ms;
  buzzerTimesLeft = times * 2 - 1;
  buzzerState = LOW;
}

// --- SETUP ---
void setup() {
  Serial.begin(500000);
  spiMutex = xSemaphoreCreateMutex();

  SPI.begin(18, 19, 23);
  pinMode(ADS1256_CS, OUTPUT); digitalWrite(ADS1256_CS, HIGH);
  pinMode(SD_CS, OUTPUT);      digitalWrite(SD_CS, HIGH);
  pinMode(BUZZER_PIN, OUTPUT); digitalWrite(BUZZER_PIN, HIGH);
  pinMode(LAUNCH_PIN, OUTPUT); digitalWrite(LAUNCH_PIN, LOW);

  ads.InitializeADC();
  ads.setDRATE(DRATE_1000SPS); // old value DRATE_2000SPS
  if (!SD.begin(SD_CS)) Serial.println("Помилка SD");

  WiFi.softAP(ssid, password);
  server.begin();

  xTaskCreatePinnedToCore(taskMeasure_func, "taskMeasure", 32768, nullptr, 1, &taskMeasure, 1);
  xTaskCreatePinnedToCore(taskWeb_func,     "taskWeb",     16384, nullptr, 0, &taskWeb,     0);

  beep(2, 100); // 2 коротких: Система повністю готова + тарування
}

// --- ФУНКЦІЇ ---
long fastReadChannel(byte muxVal, byte pgaVal) {
  unsigned long timeout = micros();
  while (digitalRead(ADS1256_DRDY) == HIGH) {
    if (micros() - timeout > 70000) return 0;
  }
  SPI.beginTransaction(SPISettings(1920000, MSBFIRST, SPI_MODE1));
  digitalWrite(ADS1256_CS, LOW);
  SPI.transfer(0x50 | 0x01);
  SPI.transfer(0x01);
  SPI.transfer(muxVal);
  SPI.transfer(pgaVal);
  SPI.transfer(0xFC);
  delayMicroseconds(4);
  SPI.transfer(0x00);
  timeout = micros();
  while (digitalRead(ADS1256_DRDY) == HIGH) {
    if (micros() - timeout > 70000) {
      digitalWrite(ADS1256_CS, HIGH);
      SPI.endTransaction();
      return 0;
    }
  }
  SPI.transfer(0x01);
  delayMicroseconds(7);
  long raw = 0;
  raw |= SPI.transfer(0x00);
  raw <<= 8;
  raw |= SPI.transfer(0x00);
  raw <<= 8;
  raw |= SPI.transfer(0x00);
  digitalWrite(ADS1256_CS, HIGH);
  SPI.endTransaction();
  if (raw & 0x800000) raw -= 0x1000000;
  return raw;
}

// ====================== JSON ПАРСЕР ======================
String getJsonString(const String& json, const String& key) {
  String search = "\"" + key + "\":";
  int startIdx = json.indexOf(search);
  if (startIdx == -1) return "";
  startIdx += search.length();
  while (startIdx < json.length() && isspace(json[startIdx])) startIdx++;
  if (json[startIdx] != '"') return "";
  startIdx++;
  String result = "";
  for (int i = startIdx; i < json.length(); i++) {
    char c = json[i];
    if (c == '"' && (i == startIdx || json[i-1] != '\\')) {
      return result;
    }
    if (c == '\\' && i+1 < json.length() && json[i+1] == '"') {
      result += '"';
      i++;
      continue;
    }
    result += c;
  }
  return result;
}

float getJsonFloat(const String& json, const String& key) {
  String search = "\"" + key + "\":";
  int startIdx = json.indexOf(search);
  if (startIdx == -1) return 0.0;
  startIdx += search.length();
  while (startIdx < json.length() && isspace(json[startIdx])) startIdx++;
  int endIdx = startIdx;
  while (endIdx < json.length() &&
         (isdigit(json[endIdx]) || json[endIdx] == '.' || json[endIdx] == '-')) {
    endIdx++;
  }
  String valueStr = json.substring(startIdx, endIdx);
  return valueStr.toFloat();
}

// --- ЗАДАЧА ВИМІРЮВАННЯ (ЯДРО 1) ---
void taskMeasure_func(void* pvParameters) {
  static unsigned long lastUpdateMillis = 0;
  char sdBuffer[128];

  for (;;) {
    unsigned long currentMillis = millis();
    rate = currentMillis - lastUpdateMillis;

    if (xSemaphoreTake(spiMutex, (TickType_t)10) == pdTRUE) {
      // 1. ТЕНЗОДАТЧИК
      long rawThrust = fastReadChannel(0x01, 0x06);
      if (firstReading) {
        filteredValue = (double)rawThrust;
        firstReading = false;
      } else {
        filteredValue = alpha * (double)rawThrust + (1.0 - alpha) * filteredValue;
      }

      // АВТО-ТАРУВАННЯ ПРИ ЗАПУСКУ ПРИСТРОЮ
      if (autoTarePending && currentMillis > 3000) {
        tareOffset = (filteredValue - zeroOffset) * coefficient;
        autoTarePending = false;
        Serial.println("--- АВТО-ТАРУВАННЯ ВИКОНАНО ---");
        beep(1, 300); // 1 довгий — система готова
      }

      thrust = ((filteredValue - zeroOffset) * coefficient) - tareOffset;

      // 2. ДАТЧИК ТИСКУ
      long rawP = fastReadChannel(0x68, 0x00);
      float vMeasured = (rawP / 8388608.0f) * 5.0f;
      pressure = ((vMeasured - 0.5f) / 4.0f) * maxPressureRange;
      if (pressure < 0) pressure = 0;

      // 3. ЗАПИС НА SD
      if (logFile) {
        unsigned long totalMillis = currentMillis - recStartMillis;
        snprintf(timeStr, sizeof(timeStr), "%02lu:%02lu:%03lu",
                 totalMillis / 60000, (totalMillis % 60000) / 1000, totalMillis % 1000);

        snprintf(sdBuffer, sizeof(sdBuffer), "%s,%s,%.2f,%.3f,%lu,%lu",
                 state.c_str(), timeStr, thrust, pressure, samples, rate);

        if (writeSetup) {
          logFile.println("File name: " + fileName);
          logFile.println("Total mass: " + totalMass);
          logFile.println("Fuel mass: " + fuelMass);
          logFile.println("Propellant notes: " + propNote);
          logFile.println("Current Date & Time: " + currentTime);
          logFile.println("");
          writeSetup = false;
          logFile.flush();
        }

        logFile.println(sdBuffer);
        samples++;
        if (samples % 5000 == 0) logFile.flush();

        if (writeSave) {
          logFile.println("");
          logFile.println("Total impulse: " + totalImpulse);
          logFile.println("Specific impulse: " + specificImpulse);
          logFile.println("Peak thrust: " + peakThrust);
          logFile.println("Average thrust: " + averageThrust);
          logFile.println("Peak pressure: " + peakPressure);
          logFile.println("Average pressure: " + averagePressure);
          logFile.println("TWR: " + twr);
          logFile.println("Burn duration: " + burnDuration);
          logFile.println("Study notes: " + studyNote);
          writeSave = false;
          logFile.flush();
          logFile.close();

          if (graphSVG.length() > 100) {
            String svgFileName = "/" + fileName + "_graph.svg";
            File svgFile = SD.open(svgFileName.c_str(), FILE_WRITE);
            if (svgFile) {
              svgFile.print(graphSVG);
              svgFile.close();
              Serial.println("✓ Графік збережено: " + svgFileName);
              Serial.println(" Розмір: " + String(graphSVG.length()) + " байт");
            } else {
              Serial.println("✖ Помилка запису SVG на SD!");
            }
          }
          graphSVG = "";
        }
      }
      xSemaphoreGive(spiMutex);
    }

    lastUpdateMillis = currentMillis;
    vTaskDelay(2 / portTICK_PERIOD_MS); // 1
  }
}

// --- ЗАДАЧА ВЕБ-СЕРВЕРА (ЯДРО 0) ---
void taskWeb_func(void* pvParameters) {
  unsigned long updateMillis = 0;

  for (;;) {
    // === КЕРУВАННЯ ЗАПАЛОМ ТА БЕЗПЕКОЮ ===
    if (state.toInt() > 0 && state.toInt() <= 9) {
      if (millis() - updateMillis >= 1000) {
        int currentState = state.toInt() - 1;
        state = String(currentState);
        beep(1, 100);                    // 1 короткий — відлік
        updateMillis = millis();

        if (currentState == 0) {
          launch = true;
          launchStartMillis = millis();
          samplesStamp = samples;
          digitalWrite(LAUNCH_PIN, HIGH);
          beep(1, 1000);                 // 1 дуже довгий — ЗАПУСК ЗАПАЛУ
        }
      }

      if (millis() - lastMesDataMillis > 450) {
        state = "R";
        launch = false;
        digitalWrite(LAUNCH_PIN, LOW);
        beep(8, 60);                     // 8 швидких — КРИТИЧНА АВАРІЯ
        Serial.println("!!! EMERGENCY AUTO ABORT - NO HEARTBEAT (450ms) !!!");
      }
    }

    if (launch && (millis() - launchStartMillis >= 15000)) {
      digitalWrite(LAUNCH_PIN, LOW);
      launch = false;
      beep(1, 100);
      Serial.println("Авто-вимкнення запалу після 15 секунд");
    }

    if (!launch && digitalRead(LAUNCH_PIN) == HIGH) {
      digitalWrite(LAUNCH_PIN, LOW);
    }

    // Неблокуючий buzzer
    if (buzzerTimesLeft > 0) {
      if (millis() - buzzerStartMillis >= buzzerInterval) {
        buzzerState = !buzzerState;
        digitalWrite(BUZZER_PIN, buzzerState);
        buzzerStartMillis = millis();
        buzzerTimesLeft--;
        if (buzzerTimesLeft == 0) digitalWrite(BUZZER_PIN, HIGH);
      }
    }

    // === ОБРОБКА КЛІЄНТІВ ===
    WiFiClient client = server.available();
    if (client) {
      client.setNoDelay(true);
      wifi_sta_list_t wifi_sta_list;
      if (esp_wifi_ap_get_sta_list(&wifi_sta_list) == ESP_OK && wifi_sta_list.num > 0) {
        rssi = map(wifi_sta_list.sta[0].rssi, -90, -30, 0, 100);
        rssi = constrain(rssi, 0, 100);
      }

      String HTTP_header = client.readStringUntil('\n');

      // --- OPTIONS ---
      if (HTTP_header.startsWith("OPTIONS ")) {
        client.println(F("HTTP/1.1 204 No Content\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Methods: GET, POST, OPTIONS\r\nAccess-Control-Allow-Headers: Content-Type\r\nConnection: close\r\n"));
      }
      // --- GET /mesData ---
      else if (HTTP_header.indexOf("GET /mesData") >= 0) {
        if (state.toInt() > 0 && state.toInt() <= 9) {
          lastMesDataMillis = millis();
        }
        client.println(F("HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nAccess-Control-Allow-Origin: *\r\nConnection: close\r\n"));
        client.printf("{\"state\":\"%s\",\"time\":\"%s\",\"thrust\":%.2f,\"pressure\":%.3f,\"samples\":%lu,\"rate\":%lu,\"rssi\":%d}\n", state.c_str(), timeStr, thrust, pressure, samples, rate, rssi);
      }
      // --- GET /igniterStatus ---
      else if (HTTP_header.indexOf("GET /igniterStatus") >= 0) {
        if (state.toInt() > 0 && state.toInt() <= 9) {
          lastMesDataMillis = millis();
        }
        if (digitalRead(LAUNCH_PIN) == HIGH && launch && launchStartMillis != 0) {
          int remainingIgnition = 15 - (int)((millis() - launchStartMillis) / 1000);
          if (remainingIgnition < 0) remainingIgnition = 0;
          client.println(F("HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nAccess-Control-Allow-Origin: *\r\nConnection: close\r\n"));
          client.println(remainingIgnition);
        } else {
          client.println(F("HTTP/1.1 503 Service Unavailable\r\nContent-Type: text/plain\r\nAccess-Control-Allow-Origin: *\r\nConnection: close\r\n"));
          client.println("0");
        }
      }
      // --- POST /launch ---
      else if (HTTP_header.indexOf("POST /launch") >= 0) {
        state = "9";
        updateMillis = millis();
        lastMesDataMillis = millis();
        beep(1, 100);
        client.println(F("HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin: *\r\nConnection: close\r\n"));
      }
      // --- POST /abort ---
      else if (HTTP_header.indexOf("POST /abort") >= 0) {
        state = "R";
        launch = false;
        digitalWrite(LAUNCH_PIN, LOW);
        beep(1, 100);
        client.println(F("HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin: *\r\nConnection: close\r\n"));
      }
      // --- POST /rec ---
      else if (HTTP_header.indexOf("POST /rec") >= 0) {
        postMessage = "";
        while (client.connected() && client.available()) {
          postMessage += (char)client.read();
          if (postMessage.endsWith("\r\n\r\n")) break;
        }
        while (client.available()) postMessage += (char)client.read();

        if (postMessage.indexOf("{") != -1) {
          fileName = getJsonString(postMessage, "fileName");
          propNote = getJsonString(postMessage, "propNote");
          currentTime = getJsonString(postMessage, "currentTime");
          totalMass = String(getJsonFloat(postMessage, "totalMass"), 1) + "g";
          fuelMass = String(getJsonFloat(postMessage, "fuelMass"), 1) + "g";
          writeSetup = true;
        } else {
          client.println(F("HTTP/1.1 400 Bad Request\r\nAccess-Control-Allow-Origin: *\r\nConnection: close\r\n\r\n{\"error\":\"Bad JSON\"}"));
          client.stop();
          continue;
        }

        if (xSemaphoreTake(spiMutex, portMAX_DELAY) == pdTRUE) {
          if (SD.exists(("/" + fileName).c_str())) {
            beep(3, 100); // 3 коротких — помилка (файл вже існує)
            client.println("HTTP/1.1 409 Conflict\r\nAccess-Control-Allow-Origin: *\r\nConnection: close\r\n\r\n{\"error\":\"File exists.\"}");
            state = "S";
          } else {
            logFile = SD.open(("/" + fileName).c_str(), FILE_APPEND);
            if (logFile) {
              recStartMillis = millis();
              samples = 0;
              state = "R";

              // ТАРУВАННЯ ТЕНЗОДАТЧИКА
              tareOffset = (filteredValue - zeroOffset) * coefficient;
              Serial.println("=== ТАРУВАННЯ ТЕНЗОДАТЧИКА ВИКОНАНО ПРИ СТАРТІ ЗАПИСУ ===");
              beep(2, 100); // 2 коротких — тарування + запис почато

              client.println(F("HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin: *\r\nConnection: close\r\n"));
            } else {
              beep(3, 100); // 3 коротких — помилка SD
              client.println(F("HTTP/1.1 500 Internal Error\r\nAccess-Control-Allow-Origin: *\r\nConnection: close\r\n\r\n{\"error\":\"SD init failed.\"}"));
            }
          }
          xSemaphoreGive(spiMutex);
        }
      }
      // --- POST /save ---
      else if (HTTP_header.indexOf("POST /save") >= 0) {
        launch = false;
        digitalWrite(LAUNCH_PIN, LOW);
        beep(1, 100);
        postMessage = "";
        postMessage.reserve(10000);
        while (client.connected() && client.available()) {
          postMessage += (char)client.read();
          if (postMessage.endsWith("\r\n\r\n")) break;
        }
        while (client.available()) postMessage += (char)client.read();

        if (postMessage.indexOf("{") != -1) {
          studyNote = getJsonString(postMessage, "studyNote");
          totalImpulse = String(getJsonFloat(postMessage, "totalImpulse"), 1) + "Ns";
          specificImpulse = String(getJsonFloat(postMessage, "specificImpulse"), 1) + "s";
          peakThrust = String(getJsonFloat(postMessage, "peakThrust"), 2) + "kg";
          averageThrust = String(getJsonFloat(postMessage, "averageThrust"), 2) + "kg";
          peakPressure = String(getJsonFloat(postMessage, "peakPressure"), 2) + "MPa";
          averagePressure = String(getJsonFloat(postMessage, "averagePressure"), 2) + "MPa";
          twr = String(getJsonFloat(postMessage, "twr"), 2) + "Ns/kg";
          burnDuration = String(getJsonFloat(postMessage, "burnDuration"), 2) + "s";
          graphSVG = getJsonString(postMessage, "graphSVG");
          writeSave = true;
          state = "S";
        }
        client.println(F("HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nAccess-Control-Allow-Origin: *\r\nConnection: close\r\n"));
        client.println("{\"fileName\": \"" + fileName + "\"}");
      }
      // --- GET /fileName ---
      else if (HTTP_header.indexOf("GET /fileName") >= 0) {
        beep(1, 100);
        client.println(F("HTTP/1.1 200 OK\r\nContent-Type: application/json\r\nAccess-Control-Allow-Origin: *\r\nConnection: close\r\n"));
        client.println("{\"fileName\":\"\\\"" + fileName + "\\\" saved to SD card.\"}");
      }

      client.stop();
    }
    vTaskDelay(5 / portTICK_PERIOD_MS);
  }
}

void loop() {
  vTaskDelete(NULL);
}
