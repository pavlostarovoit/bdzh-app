/**
 * StatusElement Component
 * 
 * Displays the current system state with different visual treatments:
 * - State S (Standby): Grey background with dashed border
 * - States R, 9-1 (Recording): Black background with name and recording status
 * - State 0 (Ignited): Red background with name, recording, and ignition status
 */

import * as React from 'react';
import svgPathsMenu from '../imports/svg-qm4f030b3h';
import { TYPOGRAPHY_CLASSES, TYPOGRAPHY_STYLES } from '../utils/typography';
import { useIgniterStatus } from '../hooks/useIgniterStatus';

interface StatusElementProps {
  state: string;
  recordingName?: string;
}

/**
 * Menu icon component - used across all states
 */
function MenuIcon() {
  return (
    <div 
      className="content-stretch flex items-center opacity-50 relative rounded-[4.8px] shrink-0 size-[24px]" 
      data-name="Button"
    >
      <div className="overflow-clip relative flex items-center justify-center shrink-0 size-[24px]" data-name="menu">
        <div className="relative w-[18px] h-[12px]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 12">
            <path d={svgPathsMenu.p668c00} fill="white" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * State S - Standby
 * Grey background with dashed border
 */
function StandbyState() {
  return (
    <div 
      className="relative w-full h-[40px]" 
      data-name="Status"
      style={{
        borderRadius: 'var(--spacing-0, 0)',
        borderBottom: '2px dashed var(--text-secondary)',
        background: 'var(--text-secondary)'
      }}
    >
      <div className="content-stretch flex items-center px-[12px] py-[8px] relative size-full">
        <MenuIcon />
        <div 
          className={`${TYPOGRAPHY_CLASSES.h4Title} flex flex-[1_0_0] flex-col justify-center leading-[0] min-h-px min-w-px not-italic relative text-right text-white uppercase`}
          style={TYPOGRAPHY_STYLES.h4Title}
        >
          <p className="leading-[16px] whitespace-pre-wrap">STANDBY</p>
        </div>
      </div>
    </div>
  );
}

/**
 * States R, 9, 8, 7, 6, 5, 4, 3, 2, 1 - Recording
 * Black background with name and recording status
 */
function RecordingState({ recordingName }: { recordingName: string }) {
  return (
    <div className="bg-foreground content-stretch flex items-center gap-[8px] px-[12px] py-[8px] relative w-full h-[40px]" data-name="Status">
      <MenuIcon />
      
      {/* Name */}
      <div className="flex-[1_0_0] min-h-px min-w-px relative flex items-center" data-name="Name">
        <div 
          className={`${TYPOGRAPHY_CLASSES.h2Title} leading-[0] not-italic text-left text-white whitespace-nowrap`}
          style={TYPOGRAPHY_STYLES.h2Title}
        >
          <p className="leading-[20px]">{recordingName}</p>
        </div>
      </div>
      
      {/* Recording Status */}
      <div className="relative shrink-0" data-name="Status">
        <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative rounded-[inherit]">
          <div 
            className={`${TYPOGRAPHY_CLASSES.h4Title} flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-center text-white uppercase whitespace-nowrap`}
            style={TYPOGRAPHY_STYLES.h4Title}
          >
            <p className="leading-[16px]">RECORDING</p>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-border-light border-l border-solid inset-[0_0_0_-1px] pointer-events-none" />
      </div>
    </div>
  );
}

/**
 * State 0 - Ignited
 * Red background with name, recording, and ignition status with countdown timer
 */
function IgnitionState({ recordingName, igniterStatus, secondsRemaining }: { recordingName: string; igniterStatus: 'ON' | 'OFF'; secondsRemaining: number | null }) {
  return (
    <div className="bg-destructive content-stretch flex items-center gap-[8px] px-[12px] py-[8px] relative w-full h-[40px]" data-name="Status">
      <MenuIcon />
      
      {/* Name */}
      <div className="flex-[1_0_0] min-h-px min-w-px relative flex items-center" data-name="Name">
        <div 
          className={`${TYPOGRAPHY_CLASSES.h2Title} leading-[0] not-italic text-left text-white whitespace-nowrap`}
          style={TYPOGRAPHY_STYLES.h2Title}
        >
          <p className="leading-[20px]">{recordingName}</p>
        </div>
      </div>
      
      {/* Recording Status */}
      <div className="relative shrink-0" data-name="Status">
        <div className="content-stretch flex items-center justify-center overflow-clip px-[12px] relative rounded-[inherit]">
          <div 
            className={`${TYPOGRAPHY_CLASSES.h4Title} flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-center text-white uppercase whitespace-nowrap`}
            style={TYPOGRAPHY_STYLES.h4Title}
          >
            <p className="leading-[16px]">RECORDING</p>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-[#efefef] border-l border-solid inset-[0_0_0_-1px] pointer-events-none" />
      </div>
      
      {/* Ignition Status with Timer */}
      <div className="relative shrink-0" data-name="Status 2">
        <div className="content-stretch flex items-center overflow-clip pl-[12px] relative rounded-[inherit]">
          <div 
            className={`${TYPOGRAPHY_CLASSES.h4Title} flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-center text-white uppercase whitespace-nowrap`}
            style={TYPOGRAPHY_STYLES.h4Title}
          >
            <p className="leading-[16px]">
              {igniterStatus === 'ON' 
                ? (secondsRemaining !== null ? `IGNITION: ${secondsRemaining} s` : 'IGNITION')
                : 'IGNITION OFF'
              }
            </p>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border-[#efefef] border-l border-solid inset-[0_0_0_-1px] pointer-events-none" />
      </div>
    </div>
  );
}

/**
 * Main StatusElement Component
 * Renders the appropriate state based on the current system state
 */
export function StatusElement({ state, recordingName = 'B5333.1' }: StatusElementProps) {
  // Monitor igniter status during state 0
  const { igniterStatus, secondsRemaining } = useIgniterStatus(state);
  
  // State S: Standby
  if (state === 'S') {
    return <StandbyState />;
  }
  
  // State 0: Ignited
  if (state === '0') {
    return <IgnitionState recordingName={recordingName} igniterStatus={igniterStatus} secondsRemaining={secondsRemaining} />;
  }
  
  // States R, 9, 8, 7, 6, 5, 4, 3, 2, 1: Recording
  if (state === 'R' || ['9', '8', '7', '6', '5', '4', '3', '2', '1'].includes(state)) {
    return <RecordingState recordingName={recordingName} />;
  }
  
  // Default to standby if unknown state
  return <StandbyState />;
}