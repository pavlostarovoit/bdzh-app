import * as React from 'react';
import { ThrustGraph } from './ThrustGraph';
import { PressureGraph } from './PressureGraph';
import { RecordingValues } from './SetupRecordingModal';

/**
 * Section Title component - displays metric label (e.g., "Thrust") and current value with unit
 * Uses design system typography variables from globals.css
 */
function SectionTitle({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="content-stretch flex h-[24px] items-start justify-between not-italic relative shrink-0 text-right w-full" data-name="Title">
      <p 
        className="font-['IBM_Plex_Sans',_sans-serif] leading-[24px] relative shrink-0 text-foreground"
        style={{ fontSize: 'var(--text-h1-size)', fontWeight: 'var(--font-weight-medium)' }}
      >
        {label}
      </p>
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
        <p 
          className="font-['IBM_Plex_Sans',_sans-serif] leading-[24px] relative shrink-0 text-foreground"
          style={{ fontSize: 'var(--text-h1-size)', fontWeight: 'var(--font-weight-medium)' }}
        >
          {value.toFixed(2)}
        </p>
        <p 
          className="font-['IBM_Plex_Sans',_sans-serif] relative shrink-0 text-text-secondary"
          style={{ 
            fontSize: 'var(--text-h2-size)', 
            fontWeight: 'var(--font-weight-normal)',
            lineHeight: 'var(--text-h2-line-height)'
          }}
        >
          {unit}
        </p>
      </div>
    </div>
  );
}

/**
 * Calculates a "nice" scale for the graph with proper headroom
 * Always generates exactly 4 grid lines (3 intervals) with round numbers
 * Step size is always 1 unit - simple and consistent
 * IMPORTANT: Always ensures ALL data is visible within the calculated scale
 * For sensor data (thrust, pressure), always starts from 0 or above
 */
function calculateNiceScale(minValue: number, maxValue: number): { min: number; max: number; step: number } {
  // Always use step of 1 unit for simplicity
  const step = 1;
  
  // For sensor data that can't be negative (thrust, pressure),
  // always ensure minimum is at least 0
  const effectiveMin = Math.max(0, minValue);
  
  // Add 10% headroom to avoid graph touching the edges
  const targetMin = effectiveMin * 0.9; // Will be 0 or slightly less than effectiveMin
  const targetMax = maxValue > 0 ? maxValue * 1.1 : maxValue * 0.9;
  
  // All values are non-negative - create a scale from 0 upward
  let max = 3 * step; // Start with 3 units (0, 1, 2, 3)
  const min = 0;
  
  // Keep extending upward until data fits with headroom
  while (max < targetMax) {
    max += step;
  }
  
  return { min, max, step };
}

/**
 * Graph component - displays Y-axis labels, grid lines, and data visualization
 * Uses design system colors and typography from globals.css
 * Generic component that can display any metric data (thrust, pressure, etc.)
 */
function Graph({ 
  dataHistory, 
  sessionStartTime, 
  state, 
  dataKey = 'thrust' 
}: { 
  dataHistory: any[]; 
  sessionStartTime: number | null; 
  state: string;
  dataKey?: string;
}) {
  // Calculate dynamic scale based on ALL visible data to ensure nothing is clipped
  // This ensures all data points within the time window stay within the graph bounds
  const minValue = dataHistory.length > 0 
    ? Math.min(...dataHistory.map(d => d[dataKey]))
    : 0;
  const maxValue = dataHistory.length > 0 
    ? Math.max(...dataHistory.map(d => d[dataKey]))
    : 0;
  
  const scale = calculateNiceScale(minValue, maxValue);
  
  // Debug logging to help diagnose scale issues
  React.useEffect(() => {
    if (dataHistory.length > 0) {
      console.log('Graph Scale Debug:', {
        dataKey,
        totalPoints: dataHistory.length,
        dataRange: { min: minValue, max: maxValue },
        scale: { min: scale.min, max: scale.max, step: scale.step },
        gridLines: [scale.max, scale.max - scale.step, scale.max - 2*scale.step, scale.min]
      });
    }
  }, [minValue, maxValue, scale.min, scale.max, scale.step, dataHistory.length, dataKey]);
  
  return (
    <div className="relative rounded-[8px] size-full" data-name="Graph">
      {/* CSS Grid layout: auto-sized Y-axis column + flexible graph area column */}
      <div 
        className="h-full"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'auto 1fr',
          gridTemplateRows: '1fr auto',
          columnGap: '8px', // 8px between Y-axis labels and guide lines
          rowGap: '10px'    // 10px between graph and seconds row
        }}
      >
        {/* Row 1: Y-axis labels (in first column) */}
        <div className="flex flex-col justify-between items-end" style={{ gridColumn: '1', gridRow: '1' }}>
          {[scale.max, scale.max - scale.step, scale.max - 2 * scale.step, scale.min].map((value, index) => (
            <div key={index} className="h-[20px] flex items-center">
              <p 
                className="font-['IBM_Plex_Sans',_sans-serif] leading-[16px] not-italic text-right"
                style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-h4-size)' }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
        
        {/* Row 1: Guide lines and data (in second column) - with overflow clipping */}
        <div className="relative overflow-clip" style={{ gridColumn: '2', gridRow: '1' }}>
          {/* Guide lines */}
          <div className="flex flex-col justify-between h-full">
            {[scale.max, scale.max - scale.step, scale.max - 2 * scale.step, scale.min].map((_, index) => (
              <div key={index} className="h-[20px] flex items-center w-full">
                <div className="w-full h-0 relative">
                  <div className="absolute bottom-0 left-0 right-0 top-[-1px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 312 1">
                      <line id="Guide line" stroke="var(--border-light)" x2="312" y1="0.5" y2="0.5" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Graph data overlay - positioned absolutely within this grid cell */}
          <div className="absolute inset-0 pointer-events-none">
            {dataKey === 'thrust' ? (
              <ThrustGraph 
                data={dataHistory} 
                minThrust={scale.min} 
                maxThrust={scale.max}
                variant={state === '0' ? 'ignited' : (state === 'R' || ['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(state)) ? 'recording' : 'standby'}
                dataKey={dataKey}
              />
            ) : (
              <PressureGraph 
                data={dataHistory} 
                minPressure={scale.min} 
                maxPressure={scale.max}
                variant={state === '0' ? 'ignited' : (state === 'R' || ['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(state)) ? 'recording' : 'standby'}
                dataKey={dataKey}
              />
            )}
          </div>
        </div>
        
        {/* Row 2: Empty cell for Y-axis column */}
        <div style={{ gridColumn: '1', gridRow: '2' }} />
        
        {/* Row 2: X-axis time labels */}
        <div style={{ gridColumn: '2', gridRow: '2' }} className="w-full">
          <Seconds dataHistory={dataHistory} sessionStartTime={sessionStartTime} />
        </div>
      </div>
    </div>
  );
}

/**
 * Format time in seconds according to the rules:
 * - "S" for values < 10 seconds (e.g., "0", "2", "5", "9")
 * - "SS" for values 10-59 seconds (e.g., "10", "25", "45")
 * - "MM:SS" for values >= 60 seconds (e.g., "1:00", "2:30")
 */
function formatTimeLabel(seconds: number): string {
  if (seconds < 10) {
    return seconds.toString();
  } else if (seconds < 60) {
    return seconds.toString().padStart(2, '0');
  } else {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}

/**
 * Seconds component - displays X-axis time labels
 * Uses design system typography from globals.css
 */
function Seconds({ dataHistory, sessionStartTime }: { dataHistory: any[]; sessionStartTime: number | null }) {
  const numLabels = 8; // Number of time labels to show
  
  // Calculate time range from actual data
  let labels: string[];
  
  if (dataHistory.length === 0 || sessionStartTime === null) {
    // No data - show all zeros
    labels = Array.from({ length: numLabels }, () => '0');
  } else {
    // Calculate elapsed time from session start for each label position
    const oldestTime = dataHistory[0]?.time || Date.now();
    const newestTime = dataHistory[dataHistory.length - 1]?.time || Date.now();
    
    // Calculate elapsed time from session start (in seconds)
    const oldestElapsed = Math.round((oldestTime - sessionStartTime) / 1000);
    const newestElapsed = Math.round((newestTime - sessionStartTime) / 1000);
    
    // Generate labels based on absolute elapsed time
    labels = Array.from({ length: numLabels }, (_, i) => {
      const elapsedSeconds = Math.round(oldestElapsed + (i / (numLabels - 1)) * (newestElapsed - oldestElapsed));
      return formatTimeLabel(elapsedSeconds);
    });
  }
  
  return (
    <div 
      className="flex items-center justify-between font-['IBM_Plex_Sans',_sans-serif] leading-[16px] not-italic text-nowrap text-right whitespace-pre w-full"
      style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-h4-size)' }}
    >
      {labels.map((label, index) => (
        <p key={index} className="relative shrink-0">{label}</p>
      ))}
    </div>
  );
}

/**
 * Thrust Section - displays thrust graph with title
 * Matches Figma design with simple title and graph layout
 */
export function ThrustSection({ state, thrust, thrustHistory, sessionStartTime }: { state: string; thrust: number; thrustHistory: any[]; sessionStartTime: number | null }) {
  return (
    <div className="bg-card relative shrink-0 w-full z-[3]" data-name="Thrust section">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
        <SectionTitle label="Thrust" value={thrust} unit="kg" />
        <div className="content-stretch flex flex-col h-[116px] items-start justify-between overflow-clip relative shrink-0 w-full">
          <Graph dataHistory={thrustHistory} sessionStartTime={sessionStartTime} state={state} dataKey="thrust" />
        </div>
      </div>
    </div>
  );
}

/**
 * Pressure Section - displays pressure graph with title
 * Uses real pressure data from /mesData endpoint
 * Includes top border to separate from Thrust section
 */
export function PressureSection({ state, pressure, pressureHistory, sessionStartTime }: { state: string; pressure: number; pressureHistory: any[]; sessionStartTime: number | null }) {
  return (
    <div className="bg-card relative shrink-0 w-full z-[2]" data-name="Pressure section">
      <div aria-hidden="true" className="absolute border-border-light border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
        <SectionTitle label="Pressure" value={pressure} unit="MPa" />
        <div className="content-stretch flex flex-col h-[116px] items-start justify-between overflow-clip relative shrink-0 w-full">
          <Graph dataHistory={pressureHistory} sessionStartTime={sessionStartTime} state={state} dataKey="pressure" />
        </div>
      </div>
    </div>
  );
}

/**
 * DataSection - wrapper component that renders both Thrust and Pressure sections
 * Maintained for backward compatibility with existing code
 */
export function DataSection({ 
  state, 
  thrust, 
  pressure, 
  rate, 
  thrustHistory, 
  pressureHistory, 
  fullHistory, 
  sessionStartTime, 
  recordingValues
}: { 
  state: string; 
  thrust: number; 
  pressure: number; 
  rate: number; 
  thrustHistory: any[]; 
  pressureHistory: any[]; 
  fullHistory?: any[]; 
  sessionStartTime: number | null; 
  recordingValues?: RecordingValues;
}) {
  return (
    <>
      <ThrustSection state={state} thrust={thrust} thrustHistory={thrustHistory} sessionStartTime={sessionStartTime} />
      <PressureSection state={state} pressure={pressure} pressureHistory={pressureHistory} sessionStartTime={sessionStartTime} />
    </>
  );
}