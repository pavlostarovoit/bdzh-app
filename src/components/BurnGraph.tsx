import * as React from 'react';

/**
 * BurnGraph Component
 * Displays Thrust vs Pressure data on a dual-axis graph
 * - Blue line for Thrust (kg) on left Y-axis
 * - Yellow/orange line for Pressure (MPa) on right Y-axis
 * - Uses only data acquired during burn duration
 * - Pressure scale uses round values, thrust scale is aligned accordingly
 */

interface BurnGraphProps {
  burnData: Array<{ time: number; thrust: number; pressure: number }>;
}

export interface BurnGraphRef {
  getSVG: () => string | null;
}

/**
 * Calculate nice round scale for pressure (primary axis)
 * Returns array of 4 values from 0 to max
 */
function calculatePressureScale(minValue: number, maxValue: number): number[] {
  // Always start from 0
  const min = 0;
  
  // Add 10% headroom
  const targetMax = maxValue * 1.1;
  
  // Find a nice round step (0.5, 1, 2, 5, 10, etc.)
  const roughStep = targetMax / 3; // We want 4 values (0, step, 2*step, 3*step)
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const normalized = roughStep / magnitude;
  
  let niceStep: number;
  if (normalized < 1.5) {
    niceStep = 1 * magnitude;
  } else if (normalized < 3) {
    niceStep = 2 * magnitude;
  } else if (normalized < 7) {
    niceStep = 5 * magnitude;
  } else {
    niceStep = 10 * magnitude;
  }
  
  // Create 4 values
  const max = Math.ceil(targetMax / niceStep) * niceStep;
  return [0, max / 3, (max / 3) * 2, max];
}

/**
 * Calculate thrust scale aligned with pressure scale
 */
function calculateThrustScale(minValue: number, maxValue: number): number[] {
  // Always start from 0
  const min = 0;
  
  // Add 10% headroom
  const targetMax = maxValue * 1.1;
  
  // Find step size
  const roughStep = targetMax / 3;
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const normalized = roughStep / magnitude;
  
  let niceStep: number;
  if (normalized < 1.5) {
    niceStep = 1 * magnitude;
  } else if (normalized < 3) {
    niceStep = 2 * magnitude;
  } else if (normalized < 7) {
    niceStep = 5 * magnitude;
  } else {
    niceStep = 10 * magnitude;
  }
  
  // Create 4 values
  const max = Math.ceil(targetMax / niceStep) * niceStep;
  return [0, max / 3, (max / 3) * 2, max];
}

/**
 * Format number for display
 * - Integers if whole numbers
 * - 1-2 decimals for non-integers
 */
function formatValue(value: number): string {
  if (Number.isInteger(value)) {
    return value.toString();
  }
  // Round to 2 decimals max, remove trailing zeros
  return parseFloat(value.toFixed(2)).toString();
}

export function BurnGraph({ burnData }: BurnGraphProps) {
  // If no data, show empty state
  if (!burnData || burnData.length === 0) {
    return (
      <div className="bg-[#f7f7f7] h-[242px] relative rounded-[4px] shrink-0 w-full" data-name="Graph">
        <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex items-center justify-center size-full">
          <p 
            className="font-['IBM_Plex_Sans',_sans-serif] leading-[16px] text-[13px]"
            style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-weight-normal)' }}
          >
            No burn data available
          </p>
        </div>
      </div>
    );
  }
  
  // Calculate data ranges
  const thrustValues = burnData.map(d => d.thrust);
  const pressureValues = burnData.map(d => d.pressure);
  
  const minThrust = Math.min(...thrustValues);
  const maxThrust = Math.max(...thrustValues);
  const minPressure = Math.min(...pressureValues);
  const maxPressure = Math.max(...pressureValues);
  
  // Calculate scales (pressure is primary with round values)
  const pressureScale = calculatePressureScale(minPressure, maxPressure);
  const thrustScale = calculateThrustScale(minThrust, maxThrust);
  
  // Time range for X-axis
  const startTime = burnData[0].time;
  const endTime = burnData[burnData.length - 1].time;
  const totalDuration = (endTime - startTime) / 1000; // seconds
  
  // Generate 8 time labels (evenly spaced)
  const timeLabels = Array.from({ length: 8 }, (_, i) => {
    const seconds = (totalDuration / 7) * i;
    return Math.round(seconds);
  });
  
  // Create SVG path for thrust data (blue line)
  const thrustPath = React.useMemo(() => {
    if (burnData.length === 0) return '';
    
    const graphWidth = 264;
    const graphHeight = 164;
    
    const points = burnData.map((point, index) => {
      // Map index to X position (0 to graphWidth)
      const x = (index / Math.max(1, burnData.length - 1)) * graphWidth;
      
      // Normalize thrust value to graph height (0 at bottom, max at top)
      const thrustRange = thrustScale[3] - thrustScale[0];
      const thrustNormalized = thrustRange > 0 ? (point.thrust - thrustScale[0]) / thrustRange : 0;
      const y = Math.max(0, Math.min(graphHeight, thrustNormalized * graphHeight));
      
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    });
    
    return points.join(' ');
  }, [burnData, thrustScale]);
  
  // Create SVG path for pressure data (yellow/orange line)
  const pressurePath = React.useMemo(() => {
    if (burnData.length === 0) return '';
    
    const graphWidth = 264;
    const graphHeight = 164;
    
    const points = burnData.map((point, index) => {
      // Map index to X position (0 to graphWidth)
      const x = (index / Math.max(1, burnData.length - 1)) * graphWidth;
      
      // Normalize pressure value to graph height (0 at bottom, max at top)
      const pressureRange = pressureScale[3] - pressureScale[0];
      const pressureNormalized = pressureRange > 0 ? (point.pressure - pressureScale[0]) / pressureRange : 0;
      const y = Math.max(0, Math.min(graphHeight, pressureNormalized * graphHeight));
      
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    });
    
    return points.join(' ');
  }, [burnData, pressureScale]);
  
  return (
    <div className="bg-[#f7f7f7] h-[242px] relative rounded-[4px] shrink-0 w-full" data-name="Graph">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start px-[8px] py-[12px] relative size-full">
        
        {/* Title - Left (Thrust) and Right (Pressure) labels */}
        <div className="content-stretch flex h-[16px] items-center justify-between not-italic relative shrink-0 w-full" data-name="Title">
          {/* Left - Thrust */}
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <div 
              className="flex flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] relative shrink-0 text-[13px] uppercase whitespace-nowrap"
              style={{ color: '#0150C8', fontWeight: 'var(--font-weight-medium)' }}
            >
              <p className="leading-[16px]">Thrust</p>
            </div>
            <p 
              className="font-['IBM_Plex_Sans',_sans-serif] leading-[16px] relative shrink-0 text-[14px] text-right"
              style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-weight-normal)' }}
            >
              kg
            </p>
          </div>
          {/* Right - Pressure */}
          <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
            <p 
              className="font-['IBM_Plex_Sans',_sans-serif] leading-[16px] relative shrink-0 text-[14px] text-right"
              style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-weight-normal)' }}
            >
              MPa
            </p>
            <div 
              className="flex flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] relative shrink-0 text-[13px] uppercase whitespace-nowrap"
              style={{ color: '#C37500', fontWeight: 'var(--font-weight-medium)' }}
            >
              <p className="leading-[16px]">Pressure</p>
            </div>
          </div>
        </div>
        
        {/* Graph Area */}
        <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-h-px min-w-px overflow-clip relative w-full" data-name="Graph">
          
          {/* Y-axis values and grid lines */}
          <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-h-px min-w-px overflow-clip relative w-full" data-name="Values">
            {/* Row 4 (top) */}
            <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full">
              <div 
                className="flex flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] whitespace-nowrap"
                style={{ color: '#0150C8', fontWeight: 'var(--font-weight-normal)' }}
              >
                <p className="leading-[16px]">{formatValue(thrustScale[3])}</p>
              </div>
              <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative" data-name="Guide line">
                <div className="absolute inset-[-1px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 264 1">
                    <line stroke="var(--border-light)" x2="264" y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
              <div 
                className="flex flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-right whitespace-nowrap"
                style={{ color: '#C37500', fontWeight: 'var(--font-weight-normal)' }}
              >
                <p className="leading-[16px]">{formatValue(pressureScale[3])}</p>
              </div>
            </div>
            
            {/* Row 3 */}
            <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full">
              <div 
                className="flex flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] whitespace-nowrap"
                style={{ color: '#0150C8', fontWeight: 'var(--font-weight-normal)' }}
              >
                <p className="leading-[16px]">{formatValue(thrustScale[2])}</p>
              </div>
              <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative" data-name="Guide line">
                <div className="absolute inset-[-1px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 264 1">
                    <line stroke="var(--border-light)" x2="264" y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
              <div 
                className="flex flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] whitespace-nowrap"
                style={{ color: '#C37500', fontWeight: 'var(--font-weight-normal)' }}
              >
                <p className="leading-[16px]">{formatValue(pressureScale[2])}</p>
              </div>
            </div>
            
            {/* Row 2 */}
            <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full">
              <div 
                className="flex flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] whitespace-nowrap"
                style={{ color: '#0150C8', fontWeight: 'var(--font-weight-normal)' }}
              >
                <p className="leading-[16px]">{formatValue(thrustScale[1])}</p>
              </div>
              <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative" data-name="Guide line">
                <div className="absolute inset-[-1px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 264 1">
                    <line stroke="var(--border-light)" x2="264" y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
              <div 
                className="flex flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-right whitespace-nowrap"
                style={{ color: '#C37500', fontWeight: 'var(--font-weight-normal)' }}
              >
                <p className="leading-[16px]">{formatValue(pressureScale[1])}</p>
              </div>
            </div>
            
            {/* Row 1 (bottom - 0) */}
            <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full">
              <div 
                className="flex flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] w-[24px]"
                style={{ color: '#0150C8', fontWeight: 'var(--font-weight-normal)' }}
              >
                <p className="leading-[16px] whitespace-pre-wrap">0</p>
              </div>
              <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative" data-name="Guide line">
                <div className="absolute inset-[-1px_0_0_0]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 264 1">
                    <line stroke="var(--border-light)" x2="264" y1="0.5" y2="0.5" />
                  </svg>
                </div>
              </div>
              <div 
                className="flex flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-right whitespace-nowrap"
                style={{ color: '#C37500', fontWeight: 'var(--font-weight-normal)' }}
              >
                <p className="leading-[16px]">0</p>
              </div>
            </div>
          </div>
          
          {/* X-axis time labels (seconds) */}
          <div className="relative shrink-0 w-full" data-name="Seconds">
            <div className="flex flex-row items-center size-full">
              <div 
                className="content-stretch flex font-['IBM_Plex_Sans',_sans-serif] items-center justify-between leading-[16px] not-italic px-[31px] relative text-[13px] text-right w-full"
                style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-weight-normal)' }}
              >
                {timeLabels.map((label, index) => (
                  <p key={index} className="relative shrink-0">{label}</p>
                ))}
              </div>
            </div>
          </div>
          
          {/* Data lines overlay */}
          <div className="absolute flex inset-[0_16px_26px_32px] items-center justify-center">
            <div className="-scale-y-100 flex-[1_0_0] min-h-px min-w-px w-full h-full">
              <div className="relative size-full" data-name="Data">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 264 164">
                  <g clipPath="url(#clip0_burn_graph)">
                    {/* Pressure line (yellow/orange) */}
                    <path 
                      d={pressurePath} 
                      stroke="#C37500" 
                      strokeWidth="2" 
                      fill="none"
                      vectorEffect="non-scaling-stroke"
                    />
                    {/* Thrust line (blue) */}
                    <path 
                      d={thrustPath} 
                      stroke="#0150C8" 
                      strokeWidth="2" 
                      fill="none"
                      vectorEffect="non-scaling-stroke"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_burn_graph">
                      <rect fill="white" height="164" width="264" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}