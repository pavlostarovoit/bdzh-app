import { useState, useEffect } from 'react';
import { MeasurementData, ThrustDataPoint, PressureDataPoint, FullDataPoint } from './useMeasurementData';

/**
 * Mock data hook for testing without actual hardware.
 * Simulates realistic thrust measurement data with all fields
 * matching the real useMeasurementData interface.
 *
 * To use: Replace useMeasurementData with useMockData in MainLayout.tsx
 */
export function useMockData() {
  const [data, setData] = useState<MeasurementData | null>(null);
  const [thrustHistory, setThrustHistory] = useState<ThrustDataPoint[]>([]);
  const [fullHistory, setFullHistory] = useState<FullDataPoint[]>([]);
  const [pressureHistory, setPressureHistory] = useState<PressureDataPoint[]>([]);
  const [isConnected] = useState(true);
  const [error] = useState<string | null>(null);
  const [sessionStartTime] = useState<number | null>(Date.now());
  const [lastFetchTimestamp, setLastFetchTimestamp] = useState<number | null>(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 0.2);

      const t = time;
      let thrust = 0;
      let pressure = 0;

      if (t < 0.5) {
        thrust = t * 6;
        pressure = t * 2;
      } else if (t < 2) {
        thrust = 2.5 + Math.sin(t * 10) * 0.3 + Math.random() * 0.2;
        pressure = 1.8 + Math.random() * 0.1;
      } else if (t < 4) {
        thrust = 2.2 + Math.random() * 0.15;
        pressure = 1.6 + Math.random() * 0.1;
      } else if (t < 5) {
        thrust = 2.2 * (1 - (t - 4));
        pressure = 1.6 * (1 - (t - 4));
      } else {
        setTime(0);
      }

      const mockData: MeasurementData = {
        state: t > 0.3 && t < 5 ? 'R' : 'S',
        time: formatMockTime(t),
        thrust: Math.max(0, thrust),
        samples: Math.floor(t * 500),
        rate: 500,
        rssi: -65 + Math.random() * 10,
        pressure: Math.max(0, pressure),
      };

      setData(mockData);
      setLastFetchTimestamp(Date.now());

      const now = Date.now();

      setThrustHistory((prev) => {
        const updated = [...prev, { time: now, thrust: mockData.thrust }];
        return updated.slice(-70);
      });

      setPressureHistory((prev) => {
        const updated = [...prev, { time: now, pressure: mockData.pressure }];
        return updated.slice(-70);
      });

      setFullHistory((prev) => [
        ...prev,
        { time: now, thrust: mockData.thrust, pressure: mockData.pressure, state: mockData.state },
      ]);
    }, 200);

    return () => clearInterval(interval);
  }, [time]);

  return {
    data,
    thrustHistory,
    fullHistory,
    pressureHistory,
    isConnected,
    error,
    refreshRate: 5,
    sessionStartTime,
    lastFetchTimestamp,
  };
}

function formatMockTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${ms.toString().padStart(3, '0')}`;
}