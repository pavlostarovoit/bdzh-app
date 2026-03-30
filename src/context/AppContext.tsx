import { createContext, useContext } from 'react';
import { RecordingValues } from '../components/SetupRecordingModal';
import { ThrustDataPoint, PressureDataPoint, FullDataPoint } from '../hooks/useMeasurementData';
import { BurnCalculations } from '../hooks/useBurnCalculations';

/**
 * Central application context providing measurement data, recording state,
 * burn calculations, and toast notifications to all child components.
 */
export interface AppContextType {
  // Connection & server state
  state: string;
  isConnected: boolean;
  isInitialLoading: boolean;

  // Live sensor values
  thrust: number;
  pressure: number;
  rate: number;
  rssi: number;
  samples: number;
  serverTime: string;

  // Data histories for graphs
  thrustHistory: ThrustDataPoint[];
  pressureHistory: PressureDataPoint[];
  fullHistory: FullDataPoint[];
  sessionStartTime: number | null;
  lastFetchTimestamp: number | null;

  // Recording state
  recordingValues: RecordingValues;
  setRecordingValues: (values: RecordingValues) => void;
  isRecording: boolean;
  currentDuration: number;

  // Burn calculations
  burn: BurnCalculations;

  // Toast notifications
  showToast: (fileName: string) => void;
  showErrorToast: (message: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

/**
 * Hook to access the app context. Throws if used outside AppProvider.
 */
export function useAppContext(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}

export const AppProvider = AppContext.Provider;
