import * as React from 'react';
import svgPaths from '../imports/svg-82pavbcneh';
import svgPathsClear from '../imports/svg-q71hn9fop1';
import { TYPOGRAPHY_CLASSES, TYPOGRAPHY_STYLES } from '../utils/typography';

export interface RecordingValues {
  engineId: string;
  totalMass: string;
  fuelMass: string;
  notes: string;
}

interface SetupRecordingModalProps {
  onClose: () => void;
  onRecord: () => void;
  values: RecordingValues;
  onChange: (values: RecordingValues) => void;
  currentThrust?: number; // Current thrust value in kg from /mesData
  showErrorToast?: (message: string) => void; // Callback to show error toast
}

function CloseIcon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path d={svgPaths.p23fd7e00} fill="var(--fill-0, black)" id="close-24" />
        </g>
      </svg>
    </div>
  );
}

function ClearIcon() {
  return (
    <div className="relative shrink-0 size-[20px] cursor-pointer" data-name="clear">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path d={svgPaths.p23fd7e00} fill="black" />
        </g>
      </svg>
    </div>
  );
}

function RecordIcon({ fill }: { fill?: string }) {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="record">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="record">
          <path d={svgPaths.p2ceb2700} fill={fill || "var(--fill-0, white)"} id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export function SetupRecordingModal({ onClose, onRecord, values, onChange, currentThrust = 0, showErrorToast }: SetupRecordingModalProps) {
  const { engineId, totalMass, fuelMass, notes } = values;
  
  // Track whether the totalMass value was manually edited by user
  const [isManuallyEdited, setIsManuallyEdited] = React.useState(false);
  const previousTotalMassRef = React.useRef(totalMass);
  
  // Track file exists error
  const [fileExistsError, setFileExistsError] = React.useState<string | null>(null);
  
  // Store whether thrust is available at modal open (prevent blinking)
  const isThrustAvailableRef = React.useRef(currentThrust > 0);
  
  // Update thrust availability if it becomes available
  React.useEffect(() => {
    if (currentThrust > 0 && !isThrustAvailableRef.current) {
      isThrustAvailableRef.current = true;
    }
  }, [currentThrust]);

  // Update totalMass with current thrust live (until user manually edits or clicks Record)
  React.useEffect(() => {
    if (!isManuallyEdited && currentThrust > 0) {
      const thrustInGrams = Math.round(currentThrust * 1000).toString(); // Integer only, no decimals
      onChange({ ...values, totalMass: thrustInGrams });
      previousTotalMassRef.current = thrustInGrams; // Track the auto-filled value
    }
  }, [currentThrust, isManuallyEdited]); // Re-run whenever thrust changes

  // Handlers
  const handleEngineIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Replace non-latin/non-number with _
    val = val.replace(/[^a-zA-Z0-9]/g, '_');
    if (val.length > 6) return; // Block
    onChange({ ...values, engineId: val });
    
    // Clear error when user changes the Engine ID
    if (fileExistsError) {
      setFileExistsError(null);
    }
  };

  const handleTotalMassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Allow numbers only (no decimal point)
    val = val.replace(/[^0-9]/g, '');
    if (val.length > 10) return; // Max 10 chars
    
    onChange({ ...values, totalMass: val });
    
    // If user manually changed the value (typed or deleted), show "Use load cell" button
    if (val !== previousTotalMassRef.current) {
      setIsManuallyEdited(true);
    }
  };

  const handleUseLoadCell = () => {
    console.log('Use Load Cell clicked - currentThrust:', currentThrust);
    console.log('Current values:', values);
    if (currentThrust > 0) {
      const thrustInGrams = Math.round(currentThrust * 1000).toString(); // Integer only, no decimals
      console.log('Setting totalMass to:', thrustInGrams);
      const newValues = { engineId, totalMass: thrustInGrams, fuelMass, notes };
      console.log('New values object:', newValues);
      onChange(newValues);
      previousTotalMassRef.current = thrustInGrams;
      setIsManuallyEdited(false); // Back to live updates, hide "Use load cell" button
    } else {
      console.log('currentThrust is not > 0, not updating');
    }
  };

  const handleFuelMassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Numbers only
    val = val.replace(/[^0-9]/g, '');
    if (val.length > 6) return;
    onChange({ ...values, fuelMass: val });
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // ASCII only (range 0-127)
    // Replace non-ascii with _
    // eslint-disable-next-line no-control-regex
    val = val.replace(/[^\x00-\x7F]/g, '_');
    onChange({ ...values, notes: val });
  };

  const handleClear = (field: keyof RecordingValues) => {
    onChange({ ...values, [field]: '' });
    // If clearing totalMass, stop auto-updates and show "Use load cell" button
    if (field === 'totalMass') {
      setIsManuallyEdited(true); // Stop auto-updates from thrust
      previousTotalMassRef.current = ''; // Reset the reference
    }
  };
  
  // Handle Record button click - validate with server first
  const handleRecordClick = async () => {
    if (!isRecordEnabled) return;
    
    // Check if filename exists on server with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    try {
      const fileName = `B${engineId}.txt`;
      
      // Convert string values to numbers (or 0 if empty)
      const totalMassNum = totalMass ? parseInt(totalMass, 10) : 0;
      const fuelMassNum = fuelMass ? parseInt(fuelMass, 10) : 0;
      
      const payload = {
        fileName: fileName,
        totalMass: totalMassNum,  // Send as number
        fuelMass: fuelMassNum,    // Send as number
        propNote: notes,
        currentTime: formatCurrentTime(),
      };

      console.log('=== Recording Values Debug ===');
      console.log('engineId:', engineId);
      console.log('totalMass (string):', totalMass, 'converted to number:', totalMassNum);
      console.log('fuelMass (string):', fuelMass, 'converted to number:', fuelMassNum);
      console.log('notes:', notes);
      console.log('Full payload:', payload);
      console.log('Stringified payload:', JSON.stringify(payload));
      console.log('=============================');
      
      const response = await fetch('http://192.168.4.1/rec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId); // Clear timeout if request completes
      console.log('Server response status:', response.status);

      // Check for 409 Conflict (file already exists) - show inline error
      if (response.status === 409) {
        const errorMessage = `File "${engineId}" exists. Try different name.`;
        setFileExistsError(errorMessage);
        return; // Don't proceed with recording
      }

      // Check for 500 Internal Server Error - SD card error
      if (response.status === 500) {
        console.error('Server returned 500 - SD card error');
        if (showErrorToast) {
          showErrorToast('SD card initialization error. Please check the SD card or SD module and try again.');
        }
        return;
      }

      // Check for 400 Bad Request - corrupt JSON
      if (response.status === 400) {
        console.error('Server returned 400 - bad request');
        if (showErrorToast) {
          showErrorToast('Server received corrupt message (bad JSON). Check connection and try again.');
        }
        return;
      }

      // Check for other errors
      if (!response.ok) {
        console.error(`Server returned ${response.status}`);
        if (showErrorToast) {
          showErrorToast('Server error. Please try again.');
        }
        return;
      }

      // If validation passed, proceed with recording
      setFileExistsError(null);
      onRecord();
      
    } catch (error: any) {
      clearTimeout(timeoutId); // Clear timeout
      
      // Check if error is due to abort (timeout)
      if (error.name === 'AbortError') {
        console.error('Request timed out after 5 seconds');
        if (showErrorToast) {
          showErrorToast('Cannot reach server. Check connection and try again.');
        }
        return;
      }
      
      // Network error or other fetch errors
      console.error('Error validating filename:', error);
      if (showErrorToast) {
        showErrorToast('Cannot reach server. Check connection and try again.');
      }
    }
  };

  // Helper function to format current time
  const formatCurrentTime = () => {
    const now = new Date();
    const d = now.getDate();
    const m = now.toLocaleString('en-GB', { month: 'short' });
    const y = now.getFullYear();
    const t = now.toLocaleTimeString('en-GB', { hour12: false });
    return `${d} ${m} ${y} ${t}`;
  };

  const isRecordEnabled = engineId.length > 0;

  return (
    <div className="bg-white content-stretch flex flex-col items-center w-full max-h-[90vh]" data-name="Setup new recording modal">
      {/* Sticky Title Bar */}
      <div className="sticky top-0 z-10 bg-white content-stretch flex gap-[24px] items-start p-[16px] relative shrink-0 w-full" data-name="Title">
        <div aria-hidden="true" className="absolute border-[#efefef] border-b border-solid inset-0 pointer-events-none" />
        <div className="flex flex-col justify-center leading-[0] not-italic relative grow shrink-0 text-black">
          <p className={`${TYPOGRAPHY_CLASSES.h1Title}`}>Setup new recording</p>
        </div>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="content-stretch flex items-center relative rounded-[4px] shrink-0 p-1 -mr-1 hover:bg-gray-100"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex flex-col w-full overflow-y-auto">
        {/* Fields Container */}
        <div className="relative shrink-0 w-full" data-name="Text field">
          <div className="content-stretch flex flex-col gap-[16px] items-start px-[16px] py-[16px] relative w-full">
            
            {/* Engine ID */}
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[12px] items-center justify-between not-italic relative shrink-0 w-full">
                <label className={`${TYPOGRAPHY_CLASSES.h2Title} text-black whitespace-nowrap`}>Engine ID</label>
                <p className={`${TYPOGRAPHY_CLASSES.h2Text} text-[#666] text-right`}>{engineId.length}/6 latin characters, numbers</p>
              </div>
              <div className="bg-[#efefef] relative rounded-[4px] shrink-0 w-full group focus-within:ring-2 focus-within:ring-black focus-within:ring-inset">
                <div className="flex flex-row items-center size-full px-[16px]">
                  <div className="content-stretch flex items-center py-[12px] relative w-full gap-[8px]">
                    <p className={`${TYPOGRAPHY_CLASSES.h2Title} text-[#777] shrink-0`}>B</p>
                    <input
                      type="text"
                      value={engineId}
                      onChange={handleEngineIdChange}
                      className={`w-full bg-transparent border-none outline-none p-0 m-0 text-black h-[20px] ${TYPOGRAPHY_CLASSES.h2Text}`}
                      placeholder=""
                    />
                    {engineId.length > 0 && (
                      <button onClick={() => handleClear('engineId')} className="shrink-0">
                         <ClearIcon />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {/* Error message for file exists */}
              {fileExistsError && (
                <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Error">
                  <div className="flex flex-col justify-center leading-[0] not-italic relative flex-1 text-[#e32b00] text-[15px]" style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 'var(--font-weight-medium)' }}>
                    <p className="leading-[20px]">{fileExistsError}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Total Mass */}
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[12px] items-center justify-between not-italic relative shrink-0 w-full">
                <div className="flex gap-[4px] items-center">
                  <label className={`${TYPOGRAPHY_CLASSES.h2Title} text-black whitespace-nowrap`}>Total mass</label>
                  <p className={`${TYPOGRAPHY_CLASSES.h2Text} text-[#666]`}>(optional)</p>
                </div>
                <p className={`${TYPOGRAPHY_CLASSES.h2Text} text-[#666] text-right`}>TWR calculation, grams</p>
              </div>
              <div className="bg-[#efefef] relative rounded-[4px] shrink-0 w-full group focus-within:ring-2 focus-within:ring-black focus-within:ring-inset">
                <div className="flex flex-row items-center size-full px-[16px]">
                  <div className="content-stretch flex items-center py-[12px] relative w-full gap-[8px]">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={totalMass}
                      onChange={handleTotalMassChange}
                      className={`flex-1 bg-transparent border-none outline-none p-0 m-0 text-black h-[20px] text-left ${TYPOGRAPHY_CLASSES.h2Text}`}
                      style={{ fontWeight: 'var(--font-weight-normal)' }}
                    />
                    {isManuallyEdited && isThrustAvailableRef.current && (
                      <button
                        onClick={handleUseLoadCell}
                        className="shrink-0"
                        type="button"
                      >
                        <p 
                          className={`${TYPOGRAPHY_CLASSES.h2Title} text-[#0a64eb] underline decoration-solid cursor-pointer whitespace-nowrap`}
                        >
                          Use load cell
                        </p>
                      </button>
                    )}
                    <p className={`${TYPOGRAPHY_CLASSES.h2Title} text-[#777] shrink-0`}>g</p>
                    {totalMass.length > 0 && (
                      <button onClick={() => handleClear('totalMass')} className="shrink-0" type="button">
                        <ClearIcon />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Fuel Mass */}
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[12px] items-center justify-between not-italic relative shrink-0 w-full">
                <div className="flex gap-[4px] items-center">
                  <label className={`${TYPOGRAPHY_CLASSES.h2Title} text-black whitespace-nowrap`}>Fuel mass</label>
                  <p className={`${TYPOGRAPHY_CLASSES.h2Text} text-[#666]`}>(optional)</p>
                </div>
                <p className={`${TYPOGRAPHY_CLASSES.h2Text} text-[#666] text-right`}>ISP calculation, grams</p>
              </div>
              <div className="bg-[#efefef] relative rounded-[4px] shrink-0 w-full group focus-within:ring-2 focus-within:ring-black focus-within:ring-inset">
                <div className="flex flex-row items-center size-full px-[16px]">
                  <div className="content-stretch flex items-center py-[12px] relative w-full gap-[8px]">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={fuelMass}
                      onChange={handleFuelMassChange}
                      className={`w-full bg-transparent border-none outline-none p-0 m-0 text-black h-[20px] text-left ${TYPOGRAPHY_CLASSES.h2Text}`}
                    />
                     <p className={`${TYPOGRAPHY_CLASSES.h2Title} text-[#777] shrink-0`}>g</p>
                     {fuelMass.length > 0 && (
                      <button onClick={() => handleClear('fuelMass')} className="shrink-0">
                         <ClearIcon />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex gap-[12px] items-center justify-between not-italic relative shrink-0 w-full">
                <div className="flex gap-[4px] items-center">
                  <label className={`${TYPOGRAPHY_CLASSES.h2Title} text-black whitespace-nowrap`}>Notes</label>
                  <p className={`${TYPOGRAPHY_CLASSES.h2Text} text-[#666]`}>(optional)</p>
                </div>
                <p className={`${TYPOGRAPHY_CLASSES.h2Text} text-[#666] text-right`}>ASCII symbols</p>
              </div>
              <div className="bg-[#efefef] relative rounded-[4px] shrink-0 w-full group focus-within:ring-2 focus-within:ring-black focus-within:ring-inset">
                <div className="flex flex-row items-center size-full px-[16px]">
                  <div className="content-stretch flex items-center py-[12px] relative w-full gap-[8px]">
                    <input
                      type="text"
                      value={notes}
                      onChange={handleNotesChange}
                      className={`w-full bg-transparent border-none outline-none p-0 m-0 text-black h-[20px] ${TYPOGRAPHY_CLASSES.h2Text}`}
                      placeholder=""
                    />
                    {notes.length > 0 && (
                      <button onClick={() => handleClear('notes')} className="shrink-0">
                         <ClearIcon />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#EFEFEF]" />

      {/* Action Buttons */}
      <div className="content-stretch flex gap-[12px] items-start p-[16px] relative w-full bg-white pb-[32px]">
        {/* Cancel */}
        <button
          onClick={onClose}
          className="flex-1 relative rounded-[4px] border-2 border-black h-[48px] flex items-center justify-center"
        >
           <p className={`${TYPOGRAPHY_CLASSES.h2Title} text-black`}>Cancel</p>
        </button>

        {/* Record */}
        <button
          onClick={handleRecordClick}
          disabled={!isRecordEnabled}
          className={`flex-1 relative rounded-[4px] h-[48px] flex items-center justify-center gap-[8px] ${
            !isRecordEnabled 
              ? 'bg-[#777] cursor-not-allowed text-[#efefef]' 
              : 'bg-black text-white'
          }`}
        >
          <RecordIcon fill={!isRecordEnabled ? "#efefef" : "white"} />
          <p className={`${TYPOGRAPHY_CLASSES.h2Title} text-inherit`}>Record</p>
        </button>
      </div>
    </div>
  );
}