import * as React from 'react';
import { useState } from 'react';
import svgPaths from "../imports/svg-8wdqkjm58d";
import svgPathsParams from "../imports/svg-6rr5zcigwu";
import { RecordingValues } from './SetupRecordingModal';
import { TYPOGRAPHY_CLASSES, TYPOGRAPHY_STYLES } from '../utils/typography';
import { BurnGraph } from './BurnGraph';
import { generateGraphSVG } from '../utils/generateGraphSVG';

interface StopRecordingModalProps {
  onClose: () => void;
  onSave: (savedFileName: string) => void;
  recordingValues: RecordingValues;
  serverTime: string;
  samples: number;
  state?: string; // Add state to determine if Parameters should show
  // Additional calculated parameters
  totalImpulse?: number;
  specificImpulse?: number;
  peakThrust?: number;
  averageThrust?: number;
  peakPressure?: number;
  averagePressure?: number;
  burnDuration?: number | null;
  burnData?: Array<{ time: number; thrust: number; pressure: number }>;
  twr?: number | null; // Add TWR parameter
  showErrorToast?: (message: string) => void; // Add error toast callback
}

/**
 * Individual parameter value components with icons
 * Based on Figma design for Stop & Save recording modal
 */

// Color helper function for parameter values
function getValueColor(value: number, type: 'totalImpulse' | 'specificImpulse' | 'thrust' | 'pressure' | 'twr' | 'burnDuration'): string {
  switch (type) {
    case 'totalImpulse':
      return 'var(--text-primary)'; // Always black
    
    case 'specificImpulse':
      if (value < 70) return 'var(--error)'; // Red
      if (value > 100) return 'var(--success)'; // Green
      return 'var(--text-primary)'; // Black
    
    case 'thrust':
      if (value < 100 || value > 250) return 'var(--error)'; // Red
      if (value >= 100 && value <= 248) return 'var(--success)'; // Green
      return 'var(--text-primary)'; // Black
    
    case 'pressure':
      if (value > 7 || value < 1) return 'var(--error)'; // Red
      if (value >= 1.5 && value <= 2.5) return 'var(--success)'; // Green
      return 'var(--text-primary)'; // Black
    
    case 'twr':
      if (value < 583) return 'var(--error)'; // Red
      if (value > 700) return 'var(--success)'; // Green
      return 'var(--text-primary)'; // Black
    
    case 'burnDuration':
      if (value < 2 || value > 10) return 'var(--error)'; // Red
      if (value > 4 && value < 8) return 'var(--success)'; // Green
      return 'var(--text-primary)'; // Black
    
    default:
      return 'var(--text-primary)';
  }
}

// Total Impulse icon + value
function ImpulseValue({ totalImpulse, specificImpulse, hasFuelMass }: { totalImpulse: number; specificImpulse: number; hasFuelMass: boolean }) {
  // Debug logging
  console.log('ImpulseValue rendering:', { totalImpulse, specificImpulse, hasFuelMass });
  
  const totalImpulseColor = getValueColor(totalImpulse, 'totalImpulse');
  const specificImpulseColor = hasFuelMass ? getValueColor(specificImpulse, 'specificImpulse') : 'var(--text-primary)';
  
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      {/* Total Impulse */}
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
        <div className="overflow-clip relative shrink-0 size-[16px]">
          <div className="absolute bottom-[16.67%] left-1/4 right-1/4 top-[16.67%]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 10.6667">
              <path d={svgPathsParams.p1d812f80} fill="var(--text-secondary)" />
            </svg>
          </div>
        </div>
        <p 
          className="flex-[1_0_0] font-['IBM_Plex_Sans',_sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[14px] whitespace-pre-wrap"
          style={{ color: totalImpulseColor, fontWeight: 'var(--font-weight-medium)' }}
        >
          {totalImpulse.toFixed(0)}
        </p>
        <p 
          className="font-['IBM_Plex_Sans',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[14px] text-right"
          style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-weight-normal)' }}
        >
          Ns
        </p>
      </div>
      
      {/* Specific Impulse */}
      <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-full">
        <div className="overflow-clip relative shrink-0 size-[16px]">
          <div className="absolute inset-[2.08%_15.54%_8.33%_15.54%]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0256 14.3333">
              <path d={svgPathsParams.p118cf400} fill="var(--text-secondary)" />
            </svg>
          </div>
        </div>
        <p 
          className="flex-[1_0_0] font-['IBM_Plex_Sans',_sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[14px] whitespace-pre-wrap"
          style={{ color: specificImpulseColor, fontWeight: 'var(--font-weight-medium)' }}
        >
          {hasFuelMass ? specificImpulse.toFixed(0) : '-'}
        </p>
        <p 
          className="font-['IBM_Plex_Sans',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[14px] text-right"
          style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-weight-normal)' }}
        >
          s
        </p>
      </div>
    </div>
  );
}

// Thrust values with peak (up arrow) and average (horizontal line)
function ThrustValue({ peakThrust, averageThrust }: { peakThrust: number; averageThrust: number }) {
  const peakThrustColor = getValueColor(peakThrust, 'thrust');
  const averageThrustColor = getValueColor(averageThrust, 'thrust');
  
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      {/* Peak Thrust */}
      <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-full">
        <div className="flex items-center justify-center relative shrink-0 size-[16px]">
          <div className="flex-none rotate-90">
            <div className="overflow-clip relative size-[16px]">
              <div className="absolute inset-[17%_16.67%_17%_17.33%]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.56 10.56">
                  <path d={svgPathsParams.pee91800} fill="var(--text-secondary)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <p 
          className="flex-[1_0_0] font-['IBM_Plex_Sans',_sans-serif] leading-[16px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-ellipsis whitespace-nowrap"
          style={{ color: peakThrustColor, fontWeight: 'var(--font-weight-medium)' }}
        >
          {peakThrust.toFixed(2)}
        </p>
        <p 
          className="font-['IBM_Plex_Sans',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[14px] text-right"
          style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-weight-normal)' }}
        >
          kg
        </p>
      </div>
      
      {/* Average Thrust */}
      <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-full">
        <div className="overflow-clip relative shrink-0 size-[16px]">
          <div className="absolute inset-[8.33%_12.5%]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13.3333">
              <path d={svgPathsParams.p19d7980} fill="var(--text-secondary)" />
            </svg>
          </div>
        </div>
        <p 
          className="flex-[1_0_0] font-['IBM_Plex_Sans',_sans-serif] leading-[16px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-ellipsis whitespace-nowrap"
          style={{ color: averageThrustColor, fontWeight: 'var(--font-weight-medium)' }}
        >
          {averageThrust.toFixed(2)}
        </p>
        <p 
          className="font-['IBM_Plex_Sans',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[14px] text-right"
          style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-weight-normal)' }}
        >
          kg
        </p>
      </div>
    </div>
  );
}

// Pressure values with peak (up arrow) and average (horizontal line)
function PressureValue({ peakPressure, averagePressure }: { peakPressure: number; averagePressure: number }) {
  const peakPressureColor = getValueColor(peakPressure, 'pressure');
  const averagePressureColor = getValueColor(averagePressure, 'pressure');
  
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      {/* Peak Pressure */}
      <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-full">
        <div className="flex items-center justify-center relative shrink-0 size-[16px]">
          <div className="flex-none rotate-90">
            <div className="overflow-clip relative size-[16px]">
              <div className="absolute inset-[17%_16.67%_17%_17.33%]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.56 10.56">
                  <path d={svgPathsParams.pee91800} fill="var(--text-secondary)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <p 
          className="flex-[1_0_0] font-['IBM_Plex_Sans',_sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[14px] whitespace-pre-wrap"
          style={{ color: peakPressureColor, fontWeight: 'var(--font-weight-medium)' }}
        >
          {peakPressure.toFixed(2)}
        </p>
        <p 
          className="font-['IBM_Plex_Sans',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[14px] text-right"
          style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-weight-normal)' }}
        >
          MPa
        </p>
      </div>
      
      {/* Average Pressure */}
      <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-full">
        <div className="overflow-clip relative shrink-0 size-[16px]">
          <div className="absolute inset-[8.33%_12.5%]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13.3333">
              <path d={svgPathsParams.p19d7980} fill="var(--text-secondary)" />
            </svg>
          </div>
        </div>
        <p 
          className="flex-[1_0_0] font-['IBM_Plex_Sans',_sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[14px] whitespace-pre-wrap"
          style={{ color: averagePressureColor, fontWeight: 'var(--font-weight-medium)' }}
        >
          {averagePressure.toFixed(2)}
        </p>
        <p 
          className="font-['IBM_Plex_Sans',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[14px] text-right"
          style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-weight-normal)' }}
        >
          MPa
        </p>
      </div>
    </div>
  );
}

/**
 * Parameter blocks - groups of related parameters with borders
 */

function ImpulseBlock({ totalImpulse, specificImpulse, hasFuelMass }: { totalImpulse: number; specificImpulse: number; hasFuelMass: boolean }) {
  return (
    <div className="bg-[#f7f7f7] flex-[1_0_0] min-h-px min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[8px] relative w-full">
        <div 
          className="flex flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[13px] text-ellipsis uppercase w-full whitespace-nowrap"
          style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-weight-medium)' }}
        >
          <p className="leading-[16px] overflow-hidden">IMPULSE</p>
        </div>
        <ImpulseValue totalImpulse={totalImpulse} specificImpulse={specificImpulse} hasFuelMass={hasFuelMass} />
      </div>
    </div>
  );
}

function ThrustBlock({ peakThrust, averageThrust }: { peakThrust: number; averageThrust: number }) {
  return (
    <div className="bg-[#f7f7f7] flex-[1_0_0] min-h-px min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[8px] relative w-full">
        <div 
          className="flex flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[13px] text-ellipsis uppercase w-full whitespace-nowrap"
          style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-weight-medium)' }}
        >
          <p className="leading-[16px] overflow-hidden">THRUST</p>
        </div>
        <ThrustValue peakThrust={peakThrust} averageThrust={averageThrust} />
      </div>
    </div>
  );
}

function PressureBlock({ peakPressure, averagePressure }: { peakPressure: number; averagePressure: number }) {
  return (
    <div className="bg-[#f7f7f7] flex-[1_0_0] min-h-px min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[8px] relative w-full">
        <div 
          className="flex flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[13px] text-ellipsis uppercase w-full whitespace-nowrap"
          style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-weight-medium)' }}
        >
          <p className="leading-[16px] overflow-hidden">PRESSURE</p>
        </div>
        <PressureValue peakPressure={peakPressure} averagePressure={averagePressure} />
      </div>
    </div>
  );
}

function ParametersBlocks({ totalImpulse, specificImpulse, peakThrust, averageThrust, peakPressure, averagePressure, hasFuelMass }: {
  totalImpulse: number;
  specificImpulse: number;
  peakThrust: number;
  averageThrust: number;
  peakPressure: number;
  averagePressure: number;
  hasFuelMass: boolean;
}) {
  return (
    <div className="content-stretch flex gap-[12px] h-[80px] items-start relative shrink-0 w-full">
      <ImpulseBlock totalImpulse={totalImpulse} specificImpulse={specificImpulse} hasFuelMass={hasFuelMass} />
      <ThrustBlock peakThrust={peakThrust} averageThrust={averageThrust} />
      <PressureBlock peakPressure={peakPressure} averagePressure={averagePressure} />
    </div>
  );
}

/**
 * Parameters Blocks 2 - TWR and Burn Time (horizontal layout)
 */
function TWRBlock({ twr }: { twr: number | null }) {
  const formatTWR = (value: number | null): string => {
    if (value === null) return '-';
    return value.toFixed(2);
  };
  
  const twrColor = twr !== null ? getValueColor(twr, 'twr') : 'var(--text-primary)';

  return (
    <div className="bg-[#f7f7f7] flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between not-italic p-[8px] relative size-full">
          <div 
            className="flex flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] relative shrink-0 text-[13px] uppercase whitespace-nowrap"
            style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-weight-medium)' }}
          >
            <p className="leading-[16px]">TWR</p>
          </div>
          <div className="content-stretch flex gap-[4px] items-center justify-center leading-[16px] relative shrink-0 text-[14px] text-right">
            <p 
              className="font-['IBM_Plex_Sans',_sans-serif] relative shrink-0"
              style={{ color: twrColor, fontWeight: 'var(--font-weight-medium)' }}
            >
              {formatTWR(twr)}
            </p>
            <p 
              className="font-['IBM_Plex_Sans',_sans-serif] relative shrink-0"
              style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-weight-normal)' }}
            >
              Ns/kg
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BurnTimeBlock({ burnDuration }: { burnDuration: number | null }) {
  const burnDurationColor = burnDuration !== null ? getValueColor(burnDuration, 'burnDuration') : 'var(--text-primary)';
  
  return (
    <div className="bg-[#f7f7f7] flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between not-italic p-[8px] relative size-full">
          <div 
            className="flex flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] relative shrink-0 text-[13px] uppercase whitespace-nowrap"
            style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-weight-medium)' }}
          >
            <p className="leading-[16px]">BURN TIME</p>
          </div>
          <div className="content-stretch flex gap-[4px] items-center justify-center leading-[16px] relative shrink-0 text-[14px] text-right">
            <p 
              className="font-['IBM_Plex_Sans',_sans-serif] relative shrink-0"
              style={{ color: burnDurationColor, fontWeight: 'var(--font-weight-medium)' }}
            >
              {burnDuration !== null ? burnDuration.toFixed(2) : '-'}
            </p>
            <p 
              className="font-['IBM_Plex_Sans',_sans-serif] relative shrink-0"
              style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-weight-normal)' }}
            >
              s
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ParametersBlocks2({ burnDuration, twr }: { burnDuration: number | null; twr: number | null }) {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
      <TWRBlock twr={twr} />
      <BurnTimeBlock burnDuration={burnDuration} />
    </div>
  );
}

/**
 * Existing modal components
 */

function Title1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px not-italic relative text-black">
      <div className="flex flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] relative shrink-0 text-[16px] w-full" style={{ fontWeight: 'var(--font-weight-medium)' }}>
        <p className="leading-[24px] whitespace-pre-wrap">Stop & Save recording</p>
      </div>
      <p className="font-['IBM_Plex_Sans',_sans-serif] leading-[20px] relative shrink-0 text-[15px] w-full whitespace-pre-wrap" style={{ fontWeight: 'var(--font-weight-light)' }}>{`Recorded file will be saved to SD card. `}</p>
    </div>
  );
}

function Close({ onClick }: { onClick: () => void }) {
  return (
    <div className="relative shrink-0 size-[20px] cursor-pointer" onClick={onClick}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path d={svgPaths.p23fd7e00} fill="var(--fill-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Button({ onClick }: { onClick: () => void }) {
  return (
    <div className="content-stretch flex items-center relative rounded-[4px] shrink-0">
      <Close onClick={onClick} />
    </div>
  );
}

function Title({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#efefef] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[24px] items-start p-[16px] relative w-full">
        <Title1 />
        <Button onClick={onClose} />
      </div>
    </div>
  );
}

function FileInfo({ time, samples }: { time: string; samples: number }) {
  return (
    <div className="content-stretch flex font-['IBM_Plex_Sans',_sans-serif] gap-[4px] items-start leading-[20px] relative shrink-0 text-[#777]" style={{ fontWeight: 'var(--font-weight-normal)' }}>
      <p className="relative shrink-0">{time}</p>
      <p className="relative shrink-0">/</p>
      <p className="relative shrink-0">{samples}</p>
      <p className="relative shrink-0">samples</p>
    </div>
  );
}

function FileStatus({ engineId, time, samples, totalImpulse, specificImpulse, peakThrust, averageThrust, peakPressure, averagePressure, hasFuelMass, showParameters, burnDuration, burnData, twr }: { 
  engineId: string; 
  time: string; 
  samples: number;
  totalImpulse: number;
  specificImpulse: number;
  peakThrust: number;
  averageThrust: number;
  peakPressure: number;
  averagePressure: number;
  hasFuelMass: boolean;
  showParameters: boolean;
  burnDuration: number | null;
  burnData?: Array<{ time: number; thrust: number; pressure: number }>;
  twr?: number | null;
}) {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#efefef] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-[16px] pt-[12px] px-[16px] relative w-full">
        {/* File name and info */}
        <div className="content-stretch flex items-center justify-between not-italic relative shrink-0 w-full">
          <div className="flex flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] relative shrink-0 text-[16px] text-black whitespace-nowrap" style={{ fontWeight: 'var(--font-weight-medium)' }}>
            <p className="leading-[24px]">B{engineId}.txt</p>
          </div>
          <FileInfo time={time} samples={samples} />
        </div>
        
        {/* Parameters blocks - Only show when burnDuration has started (not null and > 0) */}
        {showParameters && burnDuration !== null && burnDuration > 0 && (
          <>
            <ParametersBlocks 
              totalImpulse={totalImpulse}
              specificImpulse={specificImpulse}
              peakThrust={peakThrust}
              averageThrust={averageThrust}
              peakPressure={peakPressure}
              averagePressure={averagePressure}
              hasFuelMass={hasFuelMass}
            />
            
            {/* Parameters blocks 2 */}
            <ParametersBlocks2 burnDuration={burnDuration} twr={twr} />
            
            {/* Burn Graph - directly below Parameters blocks 2, no separation line */}
            {burnData && burnData.length > 0 && (
              <BurnGraph burnData={burnData} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="flex flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] relative shrink-0 text-black whitespace-nowrap" style={{ fontWeight: 'var(--font-weight-medium)' }}>
        <p className="leading-[20px]">Study comment</p>
      </div>
      <p className="font-['IBM_Plex_Sans',_sans-serif] leading-[20px] relative shrink-0 text-[#666] text-right" style={{ fontWeight: 'var(--font-weight-normal)' }}>(optional)</p>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex gap-[12px] items-start not-italic relative shrink-0 text-[15px] w-full">
      <Frame />
      <p className="flex-[1_0_0] font-['IBM_Plex_Sans',_sans-serif] leading-[20px] min-h-px min-w-px relative text-[#666] text-right whitespace-pre-wrap" style={{ fontWeight: 'var(--font-weight-normal)' }}>ASCII symbols</p>
    </div>
  );
}

function TextInput({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Replace non-ASCII characters with underscore
    // eslint-disable-next-line no-control-regex
    const newValue = e.target.value.replace(/[^\x00-\x7F]/g, "_");
    onChange(newValue);
  };

  return (
    <div className="bg-[#efefef] relative rounded-[4px] shrink-0 w-full">
      <input
        type="text"
        className="content-stretch flex items-center px-[16px] py-[12px] w-full bg-transparent border-none outline-none font-['IBM_Plex_Sans',_sans-serif] text-[15px]"
        value={value}
        onChange={handleChange}
        placeholder="Enter notes..."
        style={{ fontWeight: 'var(--font-weight-normal)' }}
      />
    </div>
  );
}

function TextArea1({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Label />
      <TextInput value={value} onChange={onChange} />
    </div>
  );
}

function TextArea({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <div className="bg-white relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#efefef] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start p-[16px] relative w-full">
        <TextArea1 value={value} onChange={onChange} />
      </div>
    </div>
  );
}

function Button1({ onClick }: { onClick: () => void }) {
  return (
    <button 
      className="flex-[1_0_0] min-h-px min-w-px relative rounded-[4px] cursor-pointer bg-transparent border-none p-0" 
      onClick={onClick}
    >
      <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] py-[12px] relative w-full">
          <div className="flex flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-black text-center whitespace-nowrap" style={{ fontWeight: 'var(--font-weight-medium)' }}>
            <p className="leading-[20px]">Cancel</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function StopIcon() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path d="M15 15H5V5H15V15Z" fill="var(--fill-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function Button2({ onClick, loading }: { onClick: () => void; loading?: boolean }) {
  return (
    <button 
      className="bg-[#c13211] flex-[1_0_0] min-h-px min-w-px relative rounded-[4px] cursor-pointer border-none p-0 disabled:opacity-70" 
      onClick={onClick}
      disabled={loading}
    >
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[12px] relative w-full">
          <StopIcon />
          <div className="flex flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-center text-white whitespace-nowrap" style={{ fontWeight: 'var(--font-weight-medium)' }}>
            <p className="leading-[20px]">{loading ? 'Saving...' : 'Stop & Save'}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

function Buttons({ onCancel, onSave, loading }: { onCancel: () => void; onSave: () => void; loading: boolean }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex gap-[12px] items-start p-[16px] relative w-full">
        <Button1 onClick={onCancel} />
        <Button2 onClick={onSave} loading={loading} />
      </div>
    </div>
  );
}

export function StopRecordingModal({ 
  onClose, 
  onSave, 
  recordingValues, 
  serverTime, 
  samples,
  state,
  totalImpulse = 0,
  specificImpulse = 0,
  peakThrust = 0,
  averageThrust = 0,
  peakPressure = 0,
  averagePressure = 0,
  burnDuration = null,
  burnData = [],
  twr = null,
  showErrorToast
}: StopRecordingModalProps) {
  const [studyNote, setStudyNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Log received values for debugging
  React.useEffect(() => {
    console.log('StopRecordingModal - Received values:', {
      totalImpulse,
      specificImpulse,
      peakThrust,
      averageThrust,
      peakPressure,
      averagePressure,
      fuelMass: recordingValues.fuelMass
    });
  }, [totalImpulse, specificImpulse, peakThrust, averageThrust, peakPressure, averagePressure, recordingValues.fuelMass]);

  const handleStopAndSave = async () => {
    setIsLoading(true);
    
    console.log('=== STOP & SAVE INITIATED ===');
    console.log('Button clicked, starting save process...');
    
    try {
      // Generate SVG from burn data with parameters
      const graphSVG = burnData && burnData.length > 0 ? generateGraphSVG(burnData, {
        fileName: `B${recordingValues.engineId}.txt`,
        totalImpulse,
        specificImpulse,
        peakThrust,
        averageThrust,
        peakPressure,
        averagePressure,
        twr,
        burnDuration
      }) : '';
      
      const payload = {
        studyNote: studyNote,
        // Include all parameters if available
        ...(totalImpulse !== undefined && { totalImpulse }),
        ...(specificImpulse !== undefined && { specificImpulse }),
        ...(peakThrust !== undefined && { peakThrust }),
        ...(averageThrust !== undefined && { averageThrust }),
        ...(peakPressure !== undefined && { peakPressure }),
        ...(averagePressure !== undefined && { averagePressure }),
        ...(twr !== undefined && twr !== null && { twr }),
        ...(burnDuration !== undefined && burnDuration !== null && { burnDuration }),
        // Include graphSVG
        ...(graphSVG && { graphSVG })
      };

      console.log('Payload prepared:', {
        ...payload,
        graphSVG: graphSVG ? `[SVG string of ${graphSVG.length} chars]` : 'none'
      });
      console.log('Sending POST request to http://192.168.4.1/save...');

      const response = await fetch('http://192.168.4.1/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Response received:', {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText
      });

      if (response.ok) {
        const responseText = await response.text();
        console.log('Response text:', responseText);
        
        try {
          const json = JSON.parse(responseText);
          console.log('Parsed JSON:', json);
          
          // Only proceed if fileName exists in response
          if (json.fileName) {
            console.log('Calling onSave with fileName:', json.fileName);
            onSave(json.fileName);
          } else {
            console.error('Response missing fileName property');
            if (showErrorToast) {
              showErrorToast('Error saving results. Check connection and try again.');
            }
          }
        } catch (parseError) {
          console.error('Failed to parse JSON response:', parseError);
          if (showErrorToast) {
            showErrorToast('Error saving results. Check connection and try again.');
          }
        }
      } else {
        console.error('Save request failed:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response:', errorText);
        if (showErrorToast) {
          showErrorToast('Error saving results. Check connection and try again.');
        }
      }
    } catch (error) {
      console.error('=== ERROR IN SAVE PROCESS ===');
      console.error('Error details:', error);
      console.error('Error type:', error instanceof Error ? error.message : 'Unknown error');
      if (showErrorToast) {
        showErrorToast('Error saving results. Check connection and try again.');
      }
    } finally {
      console.log('=== SAVE PROCESS COMPLETE ===');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start relative w-full max-h-[90vh]">
      {/* Sticky Title */}
      <div className="sticky top-0 z-10 w-full">
        <Title onClose={onClose} />
      </div>
      
      {/* Scrollable Content */}
      <div className="flex flex-col items-start w-full overflow-y-auto">
        <FileStatus 
          engineId={recordingValues.engineId} 
          time={serverTime} 
          samples={samples}
          totalImpulse={totalImpulse}
          specificImpulse={specificImpulse}
          peakThrust={peakThrust}
          averageThrust={averageThrust}
          peakPressure={peakPressure}
          averagePressure={averagePressure}
          hasFuelMass={!!recordingValues.fuelMass}
          showParameters={state === '0'}
          burnDuration={burnDuration}
          burnData={burnData}
          twr={twr}
        />
        
        <TextArea value={studyNote} onChange={setStudyNote} />
        <Buttons onCancel={onClose} onSave={handleStopAndSave} loading={isLoading} />
      </div>
    </div>
  );
}