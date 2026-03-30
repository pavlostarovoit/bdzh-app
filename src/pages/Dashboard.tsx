import * as React from 'react';
import { useAppContext } from '../context/AppContext';
import { DataSection } from '../components/DataSection';
import { CameraFeed } from '../components/CameraFeed';
import { IgnitionControl } from '../components/IgnitionControl';

/**
 * Dashboard page — the primary view of the thrust monitoring app.
 * Renders data graphs (thrust + pressure), camera viewport with recording
 * controls, and ignition control panel.
 *
 * All state is consumed from AppContext (provided by MainLayout).
 */
export function Dashboard() {
  const ctx = useAppContext();
  const {
    state, thrust, pressure, thrustHistory, pressureHistory,
    fullHistory, sessionStartTime, recordingValues, setRecordingValues,
    isRecording, currentDuration, serverTime, samples, isConnected,
    burn, showToast, showErrorToast,
  } = ctx;

  const handleRecordingStopped = (fileName: string) => showToast(fileName);

  return (
    <div className="flex flex-col h-full w-full relative z-0 overflow-hidden">
      {/* Thrust & Pressure graphs */}
      <DataSection
        state={state}
        thrust={thrust}
        pressure={pressure}
        rate={ctx.rate}
        thrustHistory={thrustHistory}
        pressureHistory={pressureHistory}
        fullHistory={fullHistory}
        sessionStartTime={sessionStartTime}
        recordingValues={recordingValues}
      />

      {/* Camera viewport with record/stop/zoom controls */}
      <CameraFeed
        disabled={!isConnected}
        className="flex-1 box-border content-stretch flex items-center justify-center relative w-full overflow-hidden"
        recordingValues={recordingValues}
        onRecordingValuesChange={setRecordingValues}
        isRecordingGlobal={isRecording}
        currentDuration={currentDuration}
        serverTime={serverTime}
        samples={samples}
        onRecordingStopped={handleRecordingStopped}
        state={state}
        totalImpulse={burn.totalImpulse}
        specificImpulse={burn.specificImpulse}
        maxThrust={burn.maxThrust}
        pressure={burn.peakPressure}
        twr={burn.twr}
        burnDuration={burn.burnDuration}
        averageThrust={burn.averageThrust}
        peakPressure={burn.peakPressure}
        averagePressure={burn.averagePressure}
        burnData={burn.burnHistory}
        currentThrust={thrust}
        showErrorToast={showErrorToast}
      />

      {/* Ignition / countdown control */}
      <IgnitionControl state={state} />
    </div>
  );
}
