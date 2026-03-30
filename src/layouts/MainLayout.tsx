import * as React from 'react';
import { Outlet } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useMeasurementData } from '../hooks/useMeasurementData';
import { useBurnCalculations } from '../hooks/useBurnCalculations';
import { AppProvider, AppContextType } from '../context/AppContext';
import { RecordingValues } from '../components/SetupRecordingModal';
import { StatusBar } from '../components/StatusBar';
import { StatusElement } from '../components/StatusElement';
import { Toast } from '../components/Toast';
import { ErrorToast } from '../components/ErrorToast';
import { InitialLoadingScreen } from '../components/InitialLoadingScreen';

/**
 * MainLayout - root layout component.
 * Owns all application state (measurement data, recording values, burn calculations)
 * and provides it via AppContext to avoid deep prop drilling.
 */
export function MainLayout() {
  // Measurement data from server
  const {
    data,
    thrustHistory,
    fullHistory,
    pressureHistory,
    isConnected,
    sessionStartTime,
    lastFetchTimestamp,
  } = useMeasurementData();

  // Recording form values
  const [recordingValues, setRecordingValues] = React.useState<RecordingValues>({
    engineId: '',
    totalMass: '',
    fuelMass: '',
    notes: '',
  });

  // Toast state
  const [toastFileName, setToastFileName] = React.useState<string | null>(null);
  const [errorToastMessage, setErrorToastMessage] = React.useState<string | null>(null);

  // Auto-dismiss toasts after 10 seconds
  React.useEffect(() => {
    if (!toastFileName) return;
    const timer = setTimeout(() => setToastFileName(null), 10_000);
    return () => clearTimeout(timer);
  }, [toastFileName]);

  React.useEffect(() => {
    if (!errorToastMessage) return;
    const timer = setTimeout(() => setErrorToastMessage(null), 10_000);
    return () => clearTimeout(timer);
  }, [errorToastMessage]);

  // Derived values with safe defaults
  const state = data?.state || 'S';
  const thrust = data?.thrust || 0;
  const pressure = data?.pressure || 0;
  const rate = data?.rate || 0;
  const rssi = data?.rssi || -100;
  const samples = data?.samples || 0;
  const serverTime = data?.time || '';
  const isInitialLoading = !data;

  // Recording state detection
  const isRecording = state === 'R' || state === '0' ||
    ['9', '8', '7', '6', '5', '4', '3', '2', '1'].includes(state);

  // Current recording duration
  const currentDuration = React.useMemo(() => {
    if (!isRecording || !sessionStartTime || thrustHistory.length === 0) return 0;
    return Math.max(0, thrustHistory[thrustHistory.length - 1].time - sessionStartTime);
  }, [isRecording, sessionStartTime, thrustHistory]);

  // All burn calculations in one hook
  const burn = useBurnCalculations({
    fullHistory,
    state,
    pressure,
    isRecording,
    fuelMassGrams: recordingValues.fuelMass,
    totalMassGrams: recordingValues.totalMass,
  });

  // Build context value
  const contextValue: AppContextType = React.useMemo(() => ({
    state,
    isConnected,
    isInitialLoading,
    thrust,
    pressure,
    rate,
    rssi,
    samples,
    serverTime,
    thrustHistory,
    pressureHistory,
    fullHistory,
    sessionStartTime,
    lastFetchTimestamp,
    recordingValues,
    setRecordingValues,
    isRecording,
    currentDuration,
    burn,
    showToast: (fileName: string) => setToastFileName(fileName),
    showErrorToast: (message: string) => setErrorToastMessage(message),
  }), [
    state, isConnected, isInitialLoading, thrust, pressure, rate, rssi,
    samples, serverTime, thrustHistory, pressureHistory, fullHistory,
    sessionStartTime, lastFetchTimestamp, recordingValues, isRecording,
    currentDuration, burn,
  ]);

  return (
    <AppProvider value={contextValue}>
      <div
        className="bg-card content-stretch flex flex-col items-center relative w-full overflow-hidden"
        style={{ height: '100dvh' }}
      >
        {/* Sticky header: StatusBar + StatusElement + Toasts */}
        <div className="sticky top-0 z-50 w-full flex-shrink-0">
          <div className="relative z-20">
            <div className="relative">
              <StatusBar
                rssi={rssi}
                rate={rate}
                isConnected={isConnected}
                lastUpdateTime={lastFetchTimestamp}
                isInitialLoading={isInitialLoading}
                state={state}
              />

              {/* Toasts positioned 8px below StatusBar */}
              <div className="absolute top-full left-0 w-full px-[8px] pt-[8px] z-10 pointer-events-none">
                <AnimatePresence>
                  {toastFileName && (
                    <motion.div
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className="pointer-events-auto"
                    >
                      <Toast fileName={toastFileName} onClose={() => setToastFileName(null)} />
                    </motion.div>
                  )}
                  {errorToastMessage && (
                    <motion.div
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className="pointer-events-auto"
                    >
                      <ErrorToast message={errorToastMessage} onClose={() => setErrorToastMessage(null)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Status element below status bar (hidden during initial loading) */}
            {!isInitialLoading && (
              <StatusElement
                state={state}
                recordingName={recordingValues.engineId ? `B${recordingValues.engineId}` : undefined}
              />
            )}
          </div>
        </div>

        {/* Main content area */}
        <div
          className="w-full flex-grow flex flex-col z-0 overflow-hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          {isInitialLoading ? <InitialLoadingScreen /> : <Outlet />}
        </div>
      </div>
    </AppProvider>
  );
}
