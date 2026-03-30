import { useMemo, useEffect, useRef } from 'react';
import { FullDataPoint } from './useMeasurementData';

/**
 * Burn detection and calculation results
 */
export interface BurnCalculations {
  /** Filtered history containing only State 0 data points */
  state0History: FullDataPoint[];
  /** Burn start/end indices within state0History */
  burnIndices: { startIndex: number; endIndex: number };
  /** Data points during active burn only */
  burnHistory: FullDataPoint[];
  /** Burn duration in seconds (null if not detected) */
  burnDuration: number | null;
  /** Total impulse in Newton-seconds */
  totalImpulse: number;
  /** Specific impulse in seconds (requires fuel mass) */
  specificImpulse: number;
  /** Peak thrust during burn in kg */
  maxThrust: number;
  /** Average thrust during burn in kg */
  averageThrust: number;
  /** Peak pressure during burn in MPa */
  peakPressure: number;
  /** Average pressure during burn in MPa */
  averagePressure: number;
  /** Thrust-to-Weight Ratio in Ns/kg (null if no total mass) */
  twr: number | null;
}

interface UseBurnCalculationsParams {
  fullHistory: FullDataPoint[];
  state: string;
  pressure: number;
  isRecording: boolean;
  fuelMassGrams: string;
  totalMassGrams: string;
}

/**
 * Hook that encapsulates all burn detection and performance calculations.
 * Extracts burn start/end from pressure+thrust thresholds and computes
 * impulse, ISP, TWR, etc.
 */
export function useBurnCalculations({
  fullHistory,
  state,
  pressure,
  isRecording,
  fuelMassGrams,
  totalMassGrams,
}: UseBurnCalculationsParams): BurnCalculations {
  // Track last known pressure when state was 'R' (baseline for burn detection)
  const lastStateRPressure = useRef<number>(0);
  useEffect(() => {
    if (state === 'R') {
      lastStateRPressure.current = pressure;
    }
  }, [state, pressure]);

  // Filter to State 0 data only
  const state0History = useMemo(() => {
    return fullHistory.filter(d => d.state === '0');
  }, [fullHistory]);

  // Detect burn start and end indices
  const burnIndices = useMemo(() => {
    if (state0History.length === 0) return { startIndex: -1, endIndex: -1 };

    const baseline = lastStateRPressure.current;
    let startIndex = -1;
    let endIndex = -1;

    // Burn start: first point where (pressure >= baseline + 0.03) OR (thrust >= 1.00)
    for (let i = 0; i < state0History.length; i++) {
      const p = state0History[i];
      if (p.pressure >= baseline + 0.03 || p.thrust >= 1.0) {
        startIndex = i;
        break;
      }
    }

    // Burn end: first point after start where (pressure <= baseline + 0.03) AND (thrust <= -0.50)
    if (startIndex !== -1) {
      for (let i = startIndex + 1; i < state0History.length; i++) {
        const p = state0History[i];
        if (p.pressure <= baseline + 0.03 && p.thrust <= -0.5) {
          endIndex = i;
          break;
        }
      }
    }

    return { startIndex, endIndex };
  }, [state0History]);

  // Slice burn history from detected indices
  const burnHistory = useMemo(() => {
    const { startIndex, endIndex } = burnIndices;
    if (startIndex === -1) return [];
    if (endIndex === -1) return state0History.slice(startIndex);
    return state0History.slice(startIndex, endIndex + 1);
  }, [state0History, burnIndices]);

  // Burn duration (seconds)
  const burnDuration = useMemo(() => {
    if (burnHistory.length < 2) return null;
    const ms = burnHistory[burnHistory.length - 1].time - burnHistory[0].time;
    return Math.round((ms / 1000) * 100) / 100;
  }, [burnHistory]);

  // Total impulse (Ns) via trapezoidal integration
  const totalImpulse = useMemo(() => {
    if (!isRecording || burnHistory.length < 2) return 0;
    let impulse = 0;
    for (let i = 1; i < burnHistory.length; i++) {
      const dt = (burnHistory[i].time - burnHistory[i - 1].time) / 1000;
      const avgForce = ((burnHistory[i - 1].thrust + burnHistory[i].thrust) / 2) * 9.80665;
      impulse += avgForce * dt;
    }
    return Math.round(impulse);
  }, [burnHistory, isRecording]);

  // Specific impulse (seconds) — requires fuel mass
  const specificImpulse = useMemo(() => {
    if (!fuelMassGrams || !totalImpulse) return 0;
    const massG = parseFloat(fuelMassGrams);
    if (isNaN(massG) || massG === 0) return 0;
    return Math.round(totalImpulse / ((massG / 1000) * 9.80665));
  }, [totalImpulse, fuelMassGrams]);

  // Peak thrust (kg)
  const maxThrust = useMemo(() => {
    if (!isRecording || burnHistory.length === 0) return 0;
    return Math.round(Math.max(...burnHistory.map(d => d.thrust)) * 100) / 100;
  }, [burnHistory, isRecording]);

  // Average thrust (kg)
  const averageThrust = useMemo(() => {
    if (!isRecording || burnHistory.length === 0) return 0;
    const sum = burnHistory.reduce((a, d) => a + d.thrust, 0);
    return Math.round((sum / burnHistory.length) * 100) / 100;
  }, [burnHistory, isRecording]);

  // Peak pressure (MPa)
  const peakPressure = useMemo(() => {
    if (!isRecording || burnHistory.length === 0) return 0;
    return Math.round(Math.max(...burnHistory.map(d => d.pressure || 0)) * 100) / 100;
  }, [burnHistory, isRecording]);

  // Average pressure (MPa)
  const averagePressure = useMemo(() => {
    if (!isRecording || burnHistory.length === 0) return 0;
    const sum = burnHistory.reduce((a, d) => a + (d.pressure || 0), 0);
    return Math.round((sum / burnHistory.length) * 100) / 100;
  }, [burnHistory, isRecording]);

  // TWR (Ns/kg) — requires total mass
  const twr = useMemo(() => {
    if (!totalMassGrams || !totalImpulse) return null;
    const massG = parseFloat(totalMassGrams);
    if (isNaN(massG) || massG === 0) return null;
    return Math.round((totalImpulse / (massG / 1000)) * 100) / 100;
  }, [totalImpulse, totalMassGrams]);

  return {
    state0History,
    burnIndices,
    burnHistory,
    burnDuration,
    totalImpulse,
    specificImpulse,
    maxThrust,
    averageThrust,
    peakPressure,
    averagePressure,
    twr,
  };
}
