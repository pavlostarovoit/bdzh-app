import * as React from 'react';
import { TYPOGRAPHY_CLASSES, TYPOGRAPHY_STYLES } from '../utils/typography';
import svgPaths from '../imports/svg-f01iyulfcm';

/**
 * ParametersPanel Component
 * Displays calculated parameters overlaid on the camera viewport
 * Only visible during State 0 (Ignited)
 */

// Individual parameter components with icons
function TotalImpulse({ value }: { value: string }) {
  return (
    <div className="flex-[1_0_0] mb-[-1px] min-h-px min-w-px relative w-full" data-name="Total impulse">
      <div aria-hidden="true" className="absolute border-[#666] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center justify-center px-[12px] py-[8px] relative size-full">
          {/* Icon and unit */}
          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="sigma">
              <div className="absolute bottom-[16.67%] left-1/4 right-1/4 top-[16.67%]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 10.6667">
                  <path d={svgPaths.p1d812f80} fill="white" />
                </svg>
              </div>
            </div>
            <p 
              className={`${TYPOGRAPHY_CLASSES.h4Text} leading-[16px] not-italic relative shrink-0 text-[#cdcdcd] text-right`}
              style={TYPOGRAPHY_STYLES.fontWeights.normal}
            >
              Ns
            </p>
          </div>
          {/* Value */}
          <p 
            className={`${TYPOGRAPHY_CLASSES.h2Title} leading-[20px] not-italic relative shrink-0 text-right text-white`}
            style={TYPOGRAPHY_STYLES.fontWeights.medium}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function SpecificImpulse({ value }: { value: string }) {
  return (
    <div className="flex-[1_0_0] mb-[-1px] min-h-px min-w-px relative w-full" data-name="Specific impulse">
      <div aria-hidden="true" className="absolute border-[#666] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center justify-center px-[12px] py-[8px] relative size-full">
          {/* Icon and unit */}
          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="water-opacity">
              <div className="absolute inset-[2.08%_15.54%_8.33%_15.54%]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0256 14.3333">
                  <path d={svgPaths.p118cf400} fill="white" />
                </svg>
              </div>
            </div>
            <p 
              className={`${TYPOGRAPHY_CLASSES.h4Text} h-[16px] leading-[16px] not-italic relative shrink-0 text-[#cdcdcd] text-right w-[7px] whitespace-pre-wrap`}
              style={TYPOGRAPHY_STYLES.fontWeights.normal}
            >
              s
            </p>
          </div>
          {/* Value */}
          <p 
            className={`${TYPOGRAPHY_CLASSES.h2Title} leading-[20px] not-italic relative shrink-0 text-right text-white`}
            style={TYPOGRAPHY_STYLES.fontWeights.medium}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function MaxThrust({ value }: { value: string }) {
  return (
    <div className="flex-[1_0_0] mb-[-1px] min-h-px min-w-px relative w-full" data-name="Max thrust">
      <div aria-hidden="true" className="absolute border-[#666] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center justify-center px-[12px] py-[8px] relative size-full">
          {/* Icon and unit */}
          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="weight">
              <div className="absolute inset-[12.5%_8.33%]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 12">
                  <path d={svgPaths.p1e3cd780} fill="white" />
                </svg>
              </div>
            </div>
            <p 
              className={`${TYPOGRAPHY_CLASSES.h4Text} leading-[16px] not-italic relative shrink-0 text-[#cdcdcd] text-right`}
              style={TYPOGRAPHY_STYLES.fontWeights.normal}
            >
              kg
            </p>
          </div>
          {/* Value */}
          <p 
            className={`${TYPOGRAPHY_CLASSES.h2Title} leading-[20px] not-italic relative shrink-0 text-right text-white`}
            style={TYPOGRAPHY_STYLES.fontWeights.medium}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function Pressure({ value }: { value: string }) {
  return (
    <div className="flex-[1_0_0] mb-[-1px] min-h-px min-w-px relative w-full" data-name="Pressure">
      <div aria-hidden="true" className="absolute border-[#666] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center justify-center px-[12px] py-[8px] relative size-full">
          {/* Icon and unit */}
          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="weather-windy">
              <div className="absolute inset-[8.33%_8.33%_8.33%_12.5%]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.6667 13.3333">
                  <path d={svgPaths.p275e1b00} fill="white" />
                </svg>
              </div>
            </div>
            <p 
              className={`${TYPOGRAPHY_CLASSES.h4Text} leading-[16px] not-italic relative shrink-0 text-[#cdcdcd] text-right`}
              style={TYPOGRAPHY_STYLES.fontWeights.normal}
            >
              MPa
            </p>
          </div>
          {/* Value */}
          <p 
            className={`${TYPOGRAPHY_CLASSES.h2Title} leading-[20px] not-italic relative shrink-0 text-right text-white`}
            style={TYPOGRAPHY_STYLES.fontWeights.medium}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function TWR({ value }: { value: string }) {
  return (
    <div className="flex-[1_0_0] mb-[-1px] min-h-px min-w-px relative w-full" data-name="TWR">
      <div aria-hidden="true" className="absolute border-[#666] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center justify-center px-[12px] py-[8px] relative size-full">
          {/* Icon and unit */}
          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="square-opacity">
              <div className="absolute inset-[8.33%]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                  <path d={svgPaths.pc8b1d80} fill="white" />
                </svg>
              </div>
            </div>
            <p 
              className={`${TYPOGRAPHY_CLASSES.h4Text} leading-[16px] not-italic relative shrink-0 text-[#cdcdcd] text-right`}
              style={TYPOGRAPHY_STYLES.fontWeights.normal}
            >
              Ns/kg
            </p>
          </div>
          {/* Value */}
          <p 
            className={`${TYPOGRAPHY_CLASSES.h2Title} leading-[20px] not-italic relative shrink-0 text-right text-white`}
            style={TYPOGRAPHY_STYLES.fontWeights.medium}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function BurnDuration({ value }: { value: string }) {
  return (
    <div className="flex-[1_0_0] mb-[-1px] min-h-px min-w-px relative w-full" data-name="Burn duration">
      <div aria-hidden="true" className="absolute border-[#666] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-center justify-center px-[12px] py-[8px] relative size-full">
          {/* Icon and unit */}
          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="timer-sand-complete">
              <div className="absolute bottom-[8.33%] left-1/4 right-1/4 top-[8.33%]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 13.3333">
                  <path d={svgPaths.p20a92780} fill="white" />
                </svg>
              </div>
            </div>
            <p 
              className={`${TYPOGRAPHY_CLASSES.h4Text} leading-[16px] not-italic relative shrink-0 text-[#cdcdcd] text-right`}
              style={TYPOGRAPHY_STYLES.fontWeights.normal}
            >
              s
            </p>
          </div>
          {/* Value */}
          <p 
            className={`${TYPOGRAPHY_CLASSES.h2Title} leading-[20px] not-italic relative shrink-0 text-right text-white`}
            style={TYPOGRAPHY_STYLES.fontWeights.medium}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

interface ParametersPanelProps {
  totalImpulse: number;
  specificImpulse: number;
  maxThrust: number;
  pressure: number | null;
  twr: number | null;
  burnDuration: number | null;
  hasFuelMass: boolean;
  // Drag handlers for zoom control
  onDragStart?: (clientX: number, clientY: number) => void;
}

/**
 * ParametersPanel - Displays real-time parameters during ignition (State 0)
 * Shows Total Impulse, Specific Impulse (conditional), Max Thrust, Pressure, TWR, and Burn Duration
 */
export function ParametersPanel({ 
  totalImpulse, 
  specificImpulse, 
  maxThrust, 
  pressure, 
  twr, 
  burnDuration,
  hasFuelMass,
  onDragStart
}: ParametersPanelProps) {
  // Format values or show dash
  const formatValue = (value: number | null, decimals: number = 0): string => {
    if (value === null) return '-';
    return decimals > 0 ? value.toFixed(decimals) : value.toString();
  };

  return (
    <div 
      className="absolute bg-[rgba(61,60,60,0.8)] bottom-[-1px] content-stretch flex flex-col items-center justify-center left-0 overflow-clip pb-px top-0" 
      data-name="Parameters blocks"
    >
      {/* Drag Overlay for Zoom Control */}
      {onDragStart && (
        <div 
          className="absolute inset-0 z-10"
          style={{ 
            touchAction: 'none' 
          }}
          onTouchStart={(e) => {
            if (e.touches.length === 1) {
              onDragStart(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          onMouseDown={(e) => {
            onDragStart(e.clientX, e.clientY);
          }}
        />
      )}
      
      <TotalImpulse value={formatValue(totalImpulse)} />
      {/* Only show Specific Impulse if fuel mass is provided */}
      {hasFuelMass && <SpecificImpulse value={formatValue(specificImpulse)} />}
      <MaxThrust value={formatValue(maxThrust, 2)} />
      <Pressure value={formatValue(pressure, 2)} />
      <TWR value={formatValue(twr, 2)} />
      <BurnDuration value={formatValue(burnDuration, 2)} />
    </div>
  );
}