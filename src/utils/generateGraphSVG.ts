/**
 * Utility to generate SVG string from burn graph data
 * This creates a standalone SVG that can be saved to file or embedded
 */

// SVG icon paths from the design system
const iconPaths = {
  totalImpulse: "M8 1.33333H1.88667L5.88667 5.33333L1.88667 9.33333H8V10.6667H0V9.33333L4 5.33333L0 1.33333V0H8V1.33333Z",
  specificImpulse: "M9.18803 9.199V7.48756H10.6673C10.8878 8.09512 11.0256 8.67701 11.0256 9.199H9.18803ZM8.80214 4.06468C8.37949 3.45711 7.94765 2.87522 7.53419 2.35323H7.35043V4.06468H8.80214ZM9.18803 7.48756V5.77612H7.35043V7.48756H9.18803ZM9.18803 4.64657V5.77612H9.86795C9.64744 5.3996 9.42692 5.01453 9.18803 4.64657ZM5.51282 10.9104V9.199H7.35043V7.48756H5.51282V5.77612H7.35043V4.06468H5.51282V2.35323H7.35043V2.12219C6.33974 0.864279 5.51282 0 5.51282 0C5.51282 0 0 5.77612 0 9.199C0 12.0314 2.47158 14.3333 5.51282 14.3333V12.6219H7.35043V10.9104H5.51282ZM7.35043 14.0338C8.03953 13.8113 8.65513 13.4776 9.18803 13.0155V12.6219H7.35043V14.0338ZM7.35043 10.9104H9.18803V9.199H7.35043V10.9104ZM9.18803 12.6219H9.61068C10.1068 12.1256 10.4652 11.5522 10.7041 10.9104H9.18803V12.6219Z",
  arrow: "M10.56 4.61333V5.94667H2.56L6.22667 9.61333L5.28 10.56L0 5.28L5.28 0L6.22667 0.946667L2.56 4.61333H10.56Z",
  average: "M6.66667 2.66667L8 1.33333L8.94667 2.28L6 5.22667L3.05333 2.28L4 1.33333L5.33333 2.66667V0H6.66667V2.66667ZM0 6H12V7.33333H0V6ZM6.66667 10.6667V13.3333H5.33333V10.6667L4 12L3.05333 11.0533L6 8.10667L8.94667 11.0533L8 12L6.66667 10.6667Z"
};

// Color helper function for parameter values (matching StopRecordingModal)
function getValueColor(value: number, type: 'totalImpulse' | 'specificImpulse' | 'thrust' | 'pressure' | 'twr' | 'burnDuration'): string {
  switch (type) {
    case 'totalImpulse':
      return '#000000'; // Always black
    
    case 'specificImpulse':
      if (value < 70) return '#C13211'; // Red
      if (value > 100) return '#0A771A'; // Green
      return '#000000'; // Black
    
    case 'thrust':
      if (value < 100 || value > 250) return '#C13211'; // Red
      if (value >= 100 && value <= 248) return '#0A771A'; // Green
      return '#000000'; // Black
    
    case 'pressure':
      if (value > 7 || value < 1) return '#C13211'; // Red
      if (value >= 1.5 && value <= 2.5) return '#0A771A'; // Green
      return '#000000'; // Black
    
    case 'twr':
      if (value < 583) return '#C13211'; // Red
      if (value > 700) return '#0A771A'; // Green
      return '#000000'; // Black
    
    case 'burnDuration':
      if (value < 2 || value > 10) return '#C13211'; // Red
      if (value > 4 && value < 8) return '#0A771A'; // Green
      return '#000000'; // Black
    
    default:
      return '#000000';
  }
}

/**
 * Calculate nice round scale for pressure (primary axis)
 */
function calculatePressureScale(minValue: number, maxValue: number): number[] {
  const min = 0;
  const targetMax = maxValue * 1.1;
  const roughStep = targetMax / 5; // 5 steps for more granularity
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
  
  const max = Math.ceil(targetMax / niceStep) * niceStep;
  return [0, max / 5, (max / 5) * 2, (max / 5) * 3, (max / 5) * 4, max];
}

/**
 * Calculate thrust scale aligned with pressure scale
 */
function calculateThrustScale(minValue: number, maxValue: number): number[] {
  const min = 0;
  const targetMax = maxValue * 1.1;
  const roughStep = targetMax / 5; // 5 steps for more granularity
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
  
  const max = Math.ceil(targetMax / niceStep) * niceStep;
  return [0, max / 5, (max / 5) * 2, (max / 5) * 3, (max / 5) * 4, max];
}

/**
 * Format number for display
 */
function formatValue(value: number): string {
  if (Number.isInteger(value)) {
    return value.toString();
  }
  return parseFloat(value.toFixed(2)).toString();
}

/**
 * Generate complete SVG string from burn data
 * Returns standalone SVG markup that can be saved or embedded
 */
export function generateGraphSVG(
  burnData: Array<{ time: number; thrust: number; pressure: number }>,
  params?: {
    fileName?: string;
    totalImpulse?: number;
    specificImpulse?: number;
    peakThrust?: number;
    averageThrust?: number;
    peakPressure?: number;
    averagePressure?: number;
    twr?: number;
    burnDuration?: number;
  }
): string {
  // If no data, return empty SVG
  if (!burnData || burnData.length === 0) {
    return '<svg width="800" height="650" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="650" fill="#f7f7f7"/><text x="400" y="325" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="13" fill="#666">No burn data available</text></svg>';
  }
  
  // Calculate data ranges
  const thrustValues = burnData.map(d => d.thrust);
  const pressureValues = burnData.map(d => d.pressure);
  
  const minThrust = Math.min(...thrustValues);
  const maxThrust = Math.max(...thrustValues);
  const minPressure = Math.min(...pressureValues);
  const maxPressure = Math.max(...pressureValues);
  
  // Calculate scales
  const pressureScale = calculatePressureScale(minPressure, maxPressure);
  const thrustScale = calculateThrustScale(minThrust, maxThrust);
  
  // Time range for X-axis
  const startTime = burnData[0].time;
  const endTime = burnData[burnData.length - 1].time;
  const totalDuration = (endTime - startTime) / 1000; // seconds
  
  // Generate 11 time labels for more granular time axis
  const timeLabels = Array.from({ length: 11 }, (_, i) => {
    const seconds = (totalDuration / 10) * i;
    return Math.round(seconds);
  });
  
  // Create SVG path for thrust data (blue line) - HIGH RESOLUTION
  const graphWidth = 680; // Much wider for better detail
  const graphHeight = 260; // Taller for better detail
  
  const thrustPathPoints = burnData.map((point, index) => {
    const x = (index / Math.max(1, burnData.length - 1)) * graphWidth;
    const thrustRange = thrustScale[5] - thrustScale[0];
    const thrustNormalized = thrustRange > 0 ? (point.thrust - thrustScale[0]) / thrustRange : 0;
    const y = Math.max(0, Math.min(graphHeight, thrustNormalized * graphHeight));
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  });
  const thrustPath = thrustPathPoints.join(' ');
  
  // Create SVG path for pressure data (yellow/orange line)
  const pressurePathPoints = burnData.map((point, index) => {
    const x = (index / Math.max(1, burnData.length - 1)) * graphWidth;
    const pressureRange = pressureScale[5] - pressureScale[0];
    const pressureNormalized = pressureRange > 0 ? (point.pressure - pressureScale[0]) / pressureRange : 0;
    const y = Math.max(0, Math.min(graphHeight, pressureNormalized * graphHeight));
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  });
  const pressurePath = pressurePathPoints.join(' ');
  
  // Generate parameter blocks if params are provided
  let parametersBlock = '';
  if (params) {
    const { 
      fileName, 
      totalImpulse, 
      specificImpulse, 
      peakThrust, 
      averageThrust, 
      peakPressure, 
      averagePressure, 
      twr, 
      burnDuration 
    } = params;
    
    parametersBlock = `
  <!-- Parameters Section -->
  
  <!-- Parameter Blocks Row 1: Impulse, Thrust, Pressure -->
  <g>
    <!-- Impulse Block -->
    <rect x="16" y="390" width="250" height="80" fill="#f7f7f7" stroke="#efefef" stroke-width="1" rx="4"/>
    <text x="24" y="410" font-family="IBM Plex Sans, sans-serif" font-size="13" font-weight="500" fill="#666" text-transform="uppercase">IMPULSE</text>
    
    ${totalImpulse !== undefined ? `
    <!-- Total Impulse -->
    <g transform="translate(24, 420)">
      <svg x="0" y="0" width="16" height="16" viewBox="0 0 8 10.6667">
        <path d="${iconPaths.totalImpulse}" fill="#666"/>
      </svg>
      <text x="24" y="12" font-family="IBM Plex Sans, sans-serif" font-size="14" font-weight="500" fill="${getValueColor(totalImpulse, 'totalImpulse')}">${totalImpulse.toFixed(0)}</text>
      <text x="242" y="12" font-family="IBM Plex Sans, sans-serif" font-size="14" fill="#666" text-anchor="end">Ns</text>
    </g>
    ` : ''}
    
    ${specificImpulse !== undefined ? `
    <!-- Specific Impulse -->
    <g transform="translate(24, 446)">
      <svg x="0" y="0" width="16" height="16" viewBox="0 0 11.0256 14.3333">
        <path d="${iconPaths.specificImpulse}" fill="#666"/>
      </svg>
      <text x="24" y="12" font-family="IBM Plex Sans, sans-serif" font-size="14" font-weight="500" fill="${getValueColor(specificImpulse, 'specificImpulse')}">${specificImpulse.toFixed(0)}</text>
      <text x="242" y="12" font-family="IBM Plex Sans, sans-serif" font-size="14" fill="#666" text-anchor="end">s</text>
    </g>
    ` : ''}
    
    <!-- Thrust Block -->
    <rect x="280" y="390" width="250" height="80" fill="#f7f7f7" stroke="#efefef" stroke-width="1" rx="4"/>
    <text x="288" y="410" font-family="IBM Plex Sans, sans-serif" font-size="13" font-weight="500" fill="#666" text-transform="uppercase">THRUST</text>
    
    ${peakThrust !== undefined ? `
    <!-- Peak Thrust -->
    <g transform="translate(288, 420)">
      <g transform="translate(8, 8) rotate(90) translate(-8, -8)">
        <svg x="0" y="0" width="16" height="16" viewBox="0 0 10.56 10.56">
          <path d="${iconPaths.arrow}" fill="#666"/>
        </svg>
      </g>
      <text x="24" y="12" font-family="IBM Plex Sans, sans-serif" font-size="14" font-weight="500" fill="${getValueColor(peakThrust, 'thrust')}">${peakThrust.toFixed(2)}</text>
      <text x="242" y="12" font-family="IBM Plex Sans, sans-serif" font-size="14" fill="#666" text-anchor="end">kg</text>
    </g>
    ` : ''}
    
    ${averageThrust !== undefined ? `
    <!-- Average Thrust -->
    <g transform="translate(288, 446)">
      <svg x="0" y="0" width="16" height="16" viewBox="0 0 12 13.3333">
        <path d="${iconPaths.average}" fill="#666"/>
      </svg>
      <text x="24" y="12" font-family="IBM Plex Sans, sans-serif" font-size="14" font-weight="500" fill="${getValueColor(averageThrust, 'thrust')}">${averageThrust.toFixed(2)}</text>
      <text x="242" y="12" font-family="IBM Plex Sans, sans-serif" font-size="14" fill="#666" text-anchor="end">kg</text>
    </g>
    ` : ''}
    
    <!-- Pressure Block -->
    <rect x="544" y="390" width="250" height="80" fill="#f7f7f7" stroke="#efefef" stroke-width="1" rx="4"/>
    <text x="552" y="410" font-family="IBM Plex Sans, sans-serif" font-size="13" font-weight="500" fill="#666" text-transform="uppercase">PRESSURE</text>
    
    ${peakPressure !== undefined ? `
    <!-- Peak Pressure -->
    <g transform="translate(552, 420)">
      <g transform="translate(8, 8) rotate(90) translate(-8, -8)">
        <svg x="0" y="0" width="16" height="16" viewBox="0 0 10.56 10.56">
          <path d="${iconPaths.arrow}" fill="#666"/>
        </svg>
      </g>
      <text x="24" y="12" font-family="IBM Plex Sans, sans-serif" font-size="14" font-weight="500" fill="${getValueColor(peakPressure, 'pressure')}">${peakPressure.toFixed(2)}</text>
      <text x="242" y="12" font-family="IBM Plex Sans, sans-serif" font-size="14" fill="#666" text-anchor="end">MPa</text>
    </g>
    ` : ''}
    
    ${averagePressure !== undefined ? `
    <!-- Average Pressure -->
    <g transform="translate(552, 446)">
      <svg x="0" y="0" width="16" height="16" viewBox="0 0 12 13.3333">
        <path d="${iconPaths.average}" fill="#666"/>
      </svg>
      <text x="24" y="12" font-family="IBM Plex Sans, sans-serif" font-size="14" font-weight="500" fill="${getValueColor(averagePressure, 'pressure')}">${averagePressure.toFixed(2)}</text>
      <text x="242" y="12" font-family="IBM Plex Sans, sans-serif" font-size="14" fill="#666" text-anchor="end">MPa</text>
    </g>
    ` : ''}
  </g>
  
  <!-- Parameter Blocks Row 2: TWR and Burn Duration -->
  <g>
    ${twr !== undefined && twr !== null ? `
    <!-- TWR Block -->
    <rect x="16" y="490" width="390" height="40" fill="#f7f7f7" stroke="#efefef" stroke-width="1" rx="4"/>
    <text x="24" y="514" font-family="IBM Plex Sans, sans-serif" font-size="13" font-weight="500" fill="#666" text-transform="uppercase">TWR</text>
    <text x="350" y="514" font-family="IBM Plex Sans, sans-serif" font-size="14" font-weight="500" fill="${getValueColor(twr, 'twr')}" text-anchor="end">${twr.toFixed(2)}</text>
    <text x="398" y="514" font-family="IBM Plex Sans, sans-serif" font-size="14" fill="#666" text-anchor="end">Ns/kg</text>
    ` : ''}
    
    ${burnDuration !== undefined && burnDuration !== null ? `
    <!-- Burn Duration Block -->
    <rect x="420" y="490" width="374" height="40" fill="#f7f7f7" stroke="#efefef" stroke-width="1" rx="4"/>
    <text x="428" y="514" font-family="IBM Plex Sans, sans-serif" font-size="13" font-weight="500" fill="#666" text-transform="uppercase">BURN TIME</text>
    <text x="760" y="514" font-family="IBM Plex Sans, sans-serif" font-size="14" font-weight="500" fill="${getValueColor(burnDuration, 'burnDuration')}" text-anchor="end">${burnDuration.toFixed(2)}</text>
    <text x="786" y="514" font-family="IBM Plex Sans, sans-serif" font-size="14" fill="#666" text-anchor="end">s</text>
    ` : ''}
  </g>`;
  }
  
  // Build the complete SVG with larger dimensions
  const svg = `<svg width="810" height="${params ? '560' : '400'}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="810" height="${params ? '560' : '400'}" fill="#f7f7f7" rx="4"/>
  <rect width="810" height="${params ? '560' : '400'}" fill="none" stroke="#efefef" stroke-width="1" rx="4"/>
  
  ${params?.fileName ? `<!-- File Name - LARGEST TEXT -->
  <text x="405" y="32" font-family="IBM Plex Sans, sans-serif" font-size="20" font-weight="600" fill="#000" text-anchor="middle">${params.fileName}</text>
  ` : ''}
  
  <!-- Title Labels -->
  <text x="16" y="${params?.fileName ? '66' : '32'}" font-family="IBM Plex Sans, sans-serif" font-size="13" font-weight="500" fill="#0150C8" text-transform="uppercase">THRUST</text>
  <text x="90" y="${params?.fileName ? '66' : '32'}" font-family="IBM Plex Sans, sans-serif" font-size="14" fill="#666">kg</text>
  
  <text x="794" y="${params?.fileName ? '66' : '32'}" font-family="IBM Plex Sans, sans-serif" font-size="14" fill="#666" text-anchor="end">MPa</text>
  <text x="730" y="${params?.fileName ? '66' : '32'}" font-family="IBM Plex Sans, sans-serif" font-size="13" font-weight="500" fill="#C37500" text-transform="uppercase" text-anchor="end">PRESSURE</text>
  
  <!-- Y-axis labels and grid lines (6 levels for more detail) -->
  <!-- Row 6 (top) -->
  <text x="16" y="${params?.fileName ? '96' : '62'}" font-family="IBM Plex Sans, sans-serif" font-size="13" fill="#0150C8">${formatValue(thrustScale[5])}</text>
  <line x1="60" y1="${params?.fileName ? '92' : '58'}" x2="740" y2="${params?.fileName ? '92' : '58'}" stroke="#efefef"/>
  <text x="794" y="${params?.fileName ? '96' : '62'}" font-family="IBM Plex Sans, sans-serif" font-size="13" fill="#C37500" text-anchor="end">${formatValue(pressureScale[5])}</text>
  
  <!-- Row 5 -->
  <text x="16" y="${params?.fileName ? '148' : '114'}" font-family="IBM Plex Sans, sans-serif" font-size="13" fill="#0150C8">${formatValue(thrustScale[4])}</text>
  <line x1="60" y1="${params?.fileName ? '144' : '110'}" x2="740" y2="${params?.fileName ? '144' : '110'}" stroke="#efefef"/>
  <text x="794" y="${params?.fileName ? '148' : '114'}" font-family="IBM Plex Sans, sans-serif" font-size="13" fill="#C37500" text-anchor="end">${formatValue(pressureScale[4])}</text>
  
  <!-- Row 4 -->
  <text x="16" y="${params?.fileName ? '200' : '166'}" font-family="IBM Plex Sans, sans-serif" font-size="13" fill="#0150C8">${formatValue(thrustScale[3])}</text>
  <line x1="60" y1="${params?.fileName ? '196' : '162'}" x2="740" y2="${params?.fileName ? '196' : '162'}" stroke="#efefef"/>
  <text x="794" y="${params?.fileName ? '200' : '166'}" font-family="IBM Plex Sans, sans-serif" font-size="13" fill="#C37500" text-anchor="end">${formatValue(pressureScale[3])}</text>
  
  <!-- Row 3 -->
  <text x="16" y="${params?.fileName ? '252' : '218'}" font-family="IBM Plex Sans, sans-serif" font-size="13" fill="#0150C8">${formatValue(thrustScale[2])}</text>
  <line x1="60" y1="${params?.fileName ? '248' : '214'}" x2="740" y2="${params?.fileName ? '248' : '214'}" stroke="#efefef"/>
  <text x="794" y="${params?.fileName ? '252' : '218'}" font-family="IBM Plex Sans, sans-serif" font-size="13" fill="#C37500" text-anchor="end">${formatValue(pressureScale[2])}</text>
  
  <!-- Row 2 -->
  <text x="16" y="${params?.fileName ? '304' : '270'}" font-family="IBM Plex Sans, sans-serif" font-size="13" fill="#0150C8">${formatValue(thrustScale[1])}</text>
  <line x1="60" y1="${params?.fileName ? '300' : '266'}" x2="740" y2="${params?.fileName ? '300' : '266'}" stroke="#efefef"/>
  <text x="794" y="${params?.fileName ? '304' : '270'}" font-family="IBM Plex Sans, sans-serif" font-size="13" fill="#C37500" text-anchor="end">${formatValue(pressureScale[1])}</text>
  
  <!-- Row 1 (bottom - 0) -->
  <text x="16" y="${params?.fileName ? '356' : '322'}" font-family="IBM Plex Sans, sans-serif" font-size="13" fill="#0150C8">0</text>
  <line x1="60" y1="${params?.fileName ? '352' : '318'}" x2="740" y2="${params?.fileName ? '352' : '318'}" stroke="#efefef"/>
  <text x="794" y="${params?.fileName ? '356' : '322'}" font-family="IBM Plex Sans, sans-serif" font-size="13" fill="#C37500" text-anchor="end">0</text>
  
  <!-- X-axis time labels (11 labels for more granular time scale) -->
  <g font-family="IBM Plex Sans, sans-serif" font-size="13" fill="#666">
    ${timeLabels.map((label, i) => {
      const x = 60 + (i * (680 / 10));
      return `<text x="${x.toFixed(1)}" y="${params?.fileName ? '376' : '342'}" text-anchor="middle">${label}</text>`;
    }).join('\n    ')}
  </g>
  
  <!-- Data lines (flipped vertically) - HIGH RESOLUTION -->
  <g transform="translate(60, ${params?.fileName ? '352' : '318'}) scale(1, -1)">
    <clipPath id="clip_graph">
      <rect width="680" height="260"/>
    </clipPath>
    <g clip-path="url(#clip_graph)">
      <!-- Pressure line (yellow/orange) -->
      <path d="${pressurePath}" stroke="#C37500" stroke-width="2" fill="none" vector-effect="non-scaling-stroke"/>
      <!-- Thrust line (blue) -->
      <path d="${thrustPath}" stroke="#0150C8" stroke-width="2" fill="none" vector-effect="non-scaling-stroke"/>
    </g>
  </g>
  ${parametersBlock}
</svg>`;
  
  return svg;
}
