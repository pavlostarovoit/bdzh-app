import * as React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';
import svgPaths from '../imports/svg-6eos6lj7at';
import svgPathsNew from '../imports/svg-mjjuvc3kaw';
import { APP_CONFIG } from '../config/app-config';
import { TYPOGRAPHY_CLASSES, TYPOGRAPHY_STYLES, COLORS } from '../utils/typography';
import { Flyout } from './Flyout';
import { SetupRecordingModal, RecordingValues } from './SetupRecordingModal';
import { StopRecordingModal } from './StopRecordingModal';
import { ParametersPanel } from './ParametersPanel';
import { ZoomControl, ZoomControlRef } from './ZoomControl';
import { motion } from 'motion/react';

interface CameraFeedProps {
  className?: string;
  disabled?: boolean;
  recordingValues: RecordingValues;
  onRecordingValuesChange: (values: RecordingValues) => void;
  isRecordingGlobal?: boolean;
  currentDuration?: number;
  serverTime?: string;
  samples?: number;
  onRecordingStopped?: (fileName: string) => void;
  state?: string;
  // Parameters data for ParametersPanel
  totalImpulse?: number;
  specificImpulse?: number;
  maxThrust?: number;
  pressure?: number | null;
  twr?: number | null;
  burnDuration?: number | null;
  // Additional parameters for StopRecordingModal
  averageThrust?: number;
  peakPressure?: number;
  averagePressure?: number;
  burnData?: Array<{ time: number; thrust: number; pressure: number }>;
  // Current thrust for totalMass pre-fill
  currentThrust?: number;
  // Error toast callback
  showErrorToast?: (message: string) => void;
}

function formatCurrentTime() {
  const now = new Date();
  const d = now.getDate();
  const m = now.toLocaleString('en-GB', { month: 'short' });
  const y = now.getFullYear();
  const t = now.toLocaleTimeString('en-GB', { hour12: false });
  return `${d} ${m} ${y} ${t}`;
}

type CameraState = 'loading' | 'active' | 'denied' | 'error';

export function CameraFeed({ 
  className, 
  disabled = false, 
  recordingValues, 
  onRecordingValuesChange, 
  isRecordingGlobal, 
  currentDuration = 0,
  serverTime = '',
  samples = 0,
  onRecordingStopped,
  state,
  // Parameters data for ParametersPanel
  totalImpulse,
  specificImpulse,
  maxThrust,
  pressure,
  twr,
  burnDuration,
  // Additional parameters for StopRecordingModal
  averageThrust,
  peakPressure,
  averagePressure,
  burnData,
  // Current thrust for totalMass pre-fill
  currentThrust,
  // Error toast callback
  showErrorToast
}: CameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const zoomControlRef = useRef<ZoomControlRef>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [zoom, setZoom] = useState(1);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isStopOpen, setIsStopOpen] = useState(false);
  
  const [cameraState, setCameraState] = useState<CameraState>('loading');
  const [flashAvailable, setFlashAvailable] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);
  
  // Store available camera devices
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
  const [maxZoomLevel, setMaxZoomLevel] = useState(3);

  // Track viewport drag state
  const viewportDragRef = useRef<{
    isDragging: boolean;
    startY: number;
    startX: number;
    hasMoved: boolean;
  }>({
    isDragging: false,
    startY: 0,
    startX: 0,
    hasMoved: false
  });

  // Determine if we should show bottom stroke
  // Rule: Add bottom stroke for any State except S, 0
  const showBottomStroke = state && state !== 'S' && state !== '0';

  // Ignition states where recording interaction should be disabled
  const isIgnitionState = state && ['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(state);
  
  // Sync local recording state with global state if provided
  useEffect(() => {
    if (isRecordingGlobal !== undefined) {
      if (isRecordingGlobal && !isRecording) {
        setIsRecording(true);
      } else if (!isRecordingGlobal && isRecording) {
        stopRecording();
      }
    }
  }, [isRecordingGlobal]);

  // Enumerate available cameras on mount
  useEffect(() => {
    const enumerateCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        console.log('Available cameras:', videoDevices);
        setAvailableCameras(videoDevices);
      } catch (err) {
        console.error('Error enumerating cameras:', err);
      }
    };
    
    enumerateCameras();
  }, []);

  // Initialize camera with specific device or constraints
  const startCameraWithDevice = useCallback(async (deviceId?: string) => {
    setCameraState('loading');
    
    // Stop existing stream if any
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    
    try {
      const constraints: MediaStreamConstraints = {
        audio: true,
        video: deviceId ? {
          deviceId: { exact: deviceId },
          width: { ideal: APP_CONFIG.camera.idealWidth },
          height: { ideal: APP_CONFIG.camera.idealHeight },
        } : {
          facingMode: APP_CONFIG.camera.facingMode,
          width: { ideal: APP_CONFIG.camera.idealWidth },
          height: { ideal: APP_CONFIG.camera.idealHeight },
        }
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
      setCameraState('active');

      // Check capabilities and get zoom range
      const track = mediaStream.getVideoTracks()[0];
      const capabilities = track.getCapabilities() as any;
      
      console.log('Camera capabilities:', capabilities);
      
      // Check for torch/flash capability
      if (capabilities.torch || ('fillLightMode' in capabilities && capabilities.fillLightMode.includes('flash'))) {
        setFlashAvailable(true);
      }
      
      // Get max zoom from camera capabilities
      if (capabilities.zoom) {
        const maxCameraZoom = capabilities.zoom.max || 3;
        setMaxZoomLevel(maxCameraZoom);
        console.log('Camera zoom range:', capabilities.zoom.min, '-', maxCameraZoom);
      }

    } catch (error: any) {
      // Suppress expected permission errors in console - UI already handles them
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        // User hasn't granted camera permission yet - show UI prompt
        setCameraState('denied');
      } else {
        // Unexpected error - log it and show error state
        console.error('Error accessing camera:', error);
        setCameraState('error');
      }
    }
  }, [stream]);

  // Initial camera start
  const startCamera = useCallback(async () => {
    await startCameraWithDevice();
  }, [startCameraWithDevice]);

  useEffect(() => {
    startCamera();

    return () => {
      // Cleanup: stop all tracks when component unmounts
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Apply zoom effect
  useEffect(() => {
    if (videoRef.current && stream) {
      const videoTrack = stream.getVideoTracks()[0];
      const capabilities = videoTrack.getCapabilities() as any;

      if ('zoom' in capabilities) {
        const constraints = {
          advanced: [{ zoom: zoom }],
        };
        videoTrack.applyConstraints(constraints).catch(console.error);
      }
    }
  }, [zoom, stream]);

  const toggleFlash = async () => {
    if (!stream || !flashAvailable) return;
    const track = stream.getVideoTracks()[0];
    const newFlashState = !isFlashOn;
    
    try {
      await track.applyConstraints({
        advanced: [{ torch: newFlashState } as any]
      });
      setIsFlashOn(newFlashState);
    } catch (err) {
      console.error('Error toggling flash:', err);
    }
  };

  // Handle actual recording start (called after setup)
  const startRecording = async () => {
    // The POST request to /rec was already sent by SetupRecordingModal during validation
    // This function just handles starting the local camera recording and closing the modal
    
    console.log('Starting recording - server already notified by modal validation');

    // Close the setup modal immediately
    setIsSetupOpen(false);
    setIsRecording(true);

    // Start local camera recording if stream is available
    if (stream) {
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm',
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `thrust-test-${Date.now()}.webm`;
        a.click();
        setRecordedChunks([]);
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
    } else {
      console.warn('No camera stream available - only server recording started');
    }
  };

  // Stop recording
  const stopRecording = () => {
    // Stop local recording
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleStopSuccess = (savedFileName: string) => {
    setIsStopOpen(false);
    stopRecording();
    if (onRecordingStopped) {
      onRecordingStopped(savedFileName);
    }
  };

  // Toggle button handler
  const handleRecordClick = () => {
    if (isRecording) {
      setIsStopOpen(true);
    } else {
      setIsSetupOpen(true);
    }
  };

  // Increase zoom
  const handleZoom = () => {
    setZoom((prev) => Math.min(prev + APP_CONFIG.camera.zoomStep, APP_CONFIG.camera.maxZoom));
  };

  // Viewport drag handlers for zoom control
  const handleViewportDragStart = (clientX: number, clientY: number) => {
    viewportDragRef.current = {
      isDragging: true,
      startY: clientY,
      startX: clientX,
      hasMoved: false
    };
  };

  const handleViewportDragMove = (clientX: number, clientY: number) => {
    if (!viewportDragRef.current.isDragging) return;

    const deltaY = Math.abs(viewportDragRef.current.startY - clientY);
    const deltaX = Math.abs(viewportDragRef.current.startX - clientX);

    // Detect if this is a vertical drag (more vertical than horizontal)
    const isVerticalDrag = deltaY > deltaX && deltaY > 10; // 10px threshold

    if (isVerticalDrag && !viewportDragRef.current.hasMoved) {
      // First vertical movement detected - trigger zoom control
      viewportDragRef.current.hasMoved = true;
      if (zoomControlRef.current) {
        zoomControlRef.current.startExternalDrag(viewportDragRef.current.startY);
      }
    }

    // Continue updating zoom if we've started
    if (viewportDragRef.current.hasMoved && zoomControlRef.current) {
      zoomControlRef.current.updateExternalDrag(clientY);
    }
  };

  const handleViewportDragEnd = () => {
    if (viewportDragRef.current.hasMoved && zoomControlRef.current) {
      zoomControlRef.current.endExternalDrag();
    }
    viewportDragRef.current = {
      isDragging: false,
      startY: 0,
      startX: 0,
      hasMoved: false
    };
  };

  // Global viewport drag listeners
  useEffect(() => {
    if (cameraState !== 'active') return;

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && viewportDragRef.current.isDragging) {
        handleViewportDragMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (viewportDragRef.current.isDragging) {
        handleViewportDragMove(e.clientX, e.clientY);
      }
    };

    const handleTouchEnd = () => {
      handleViewportDragEnd();
    };

    const handleMouseUp = () => {
      handleViewportDragEnd();
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cameraState]);

  return (
    <div className={`${className} bg-input relative overflow-hidden`}>
      {/* Video Feed - Only visible when active */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`absolute inset-0 max-w-none object-cover pointer-events-none size-full object-center transition-opacity duration-300 ${cameraState === 'active' ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* Drag Overlay for Zoom Control - Captures vertical drags on viewport */}
      {cameraState === 'active' && (
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            touchAction: 'none' // Prevent default touch behaviors during drag
          }}
          onTouchStart={(e) => {
            if (e.touches.length === 1) {
              handleViewportDragStart(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          onMouseDown={(e) => {
            handleViewportDragStart(e.clientX, e.clientY);
          }}
        />
      )}
      
      {/* Bottom Border */}
      <div 
        aria-hidden="true" 
        className={`absolute border-[#efefef] border-solid bottom-0 left-0 pointer-events-none right-0 top-[-1px] ${showBottomStroke ? 'border-y' : 'border-t'}`} 
      />

      {/* Loading State */}
      {cameraState === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-[8px]">
            <p className={`${TYPOGRAPHY_CLASSES.h1Title} text-muted`}>Camera loading</p>
            <div className="size-[20px] animate-spin">
              <svg className="block size-full" fill="none" viewBox="0 0 20 20">
                <path d={svgPathsNew.p204a7710} fill="#666666" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Denied / Error State */}
      {(cameraState === 'denied' || cameraState === 'error') && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[8px] p-[32px] text-center">
          <div className="flex flex-col gap-[4px] items-center">
            <p className={`${TYPOGRAPHY_CLASSES.h1Title} text-muted w-[296px]`}>
              No camera access
            </p>
            <p className={`${TYPOGRAPHY_CLASSES.h2Text} text-text-secondary w-[296px]`}>
              Please provide camera access permission to capture video.
            </p>
          </div>
          <button 
            onClick={() => startCamera()}
            className={`${TYPOGRAPHY_CLASSES.h2Title} text-accent underline mt-[8px] cursor-pointer hover:opacity-80 transition-opacity`}
          >
            Provide camera permission
          </button>
        </div>
      )}
      
      {/* Flashlight Control - Top Right, to the left of Zoom button */}
      {cameraState === 'active' && flashAvailable && (
        <button
          onClick={toggleFlash}
          className={`absolute w-[52px] p-[16px] rounded-[4px] flex items-center justify-center transition-colors z-10 ${
            isFlashOn ? 'bg-white' : 'bg-[#3d3c3c]'
          } active:bg-opacity-80`}
          style={{
            top: '16px', // 16px from top of Camera viewport
            right: '84.46px' // 16.46px (zoom right) + 52px (zoom width) + 16px (spacing)
          }}
        >
          <div className="relative shrink-0 size-[20px]">
            <svg className="block size-full" fill="none" viewBox="0 0 20 20">
               <path d={svgPathsNew.p281d0900} fill={isFlashOn ? "black" : "white"} />
            </svg>
          </div>
        </button>
      )}

      {/* Record Button - Bottom Right */}
      <button
        onClick={handleRecordClick}
        disabled={(disabled && !isRecording) || isIgnitionState}
        className={`absolute box-border content-stretch flex gap-[8px] items-center justify-center overflow-clip p-[16px] right-[16px] rounded-[4px] z-10 ${((disabled && !isRecording) || isIgnitionState) ? 'cursor-not-allowed' : ''}`}
        style={{ 
          backgroundColor: isRecording ? '#000000' : (disabled ? 'var(--muted)' : '#000000'),
          opacity: isIgnitionState ? 0.5 : 1, // Visual feedback for disabled state during ignition
          bottom: 'max(16px, calc(16px + env(safe-area-inset-bottom)))' // Add safe area padding
        }}
      >
        {isRecording ? (
          // Recording State: Stop Icon + Timer (regardless of ignition state)
          <>
            <div className="relative shrink-0 size-[20px]">
              <svg className="block size-full" fill="none" viewBox="0 0 20 20">
                <path d="M15 15H5V5H15V15Z" fill="white" />
              </svg>
            </div>
            <div className={`${TYPOGRAPHY_CLASSES.h2Title} flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-center text-nowrap`} style={{ ...TYPOGRAPHY_STYLES.fontWeights.medium, color: 'white' }}>
              <p className="leading-[20px] whitespace-pre">{serverTime}</p>
            </div>
          </>
        ) : (
          // Standby State: Record Icon + "Record" Text
          <>
            <div className="relative shrink-0 size-[20px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <g>
                  {/* Using existing record icon or new one - staying consistent with existing */}
                  <path d={svgPaths.p3cd9f000} fill={disabled ? "var(--muted-foreground)" : "white"} />
                </g>
              </svg>
            </div>
            <div className={`${TYPOGRAPHY_CLASSES.h2Title} flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-center text-nowrap`} style={{ ...TYPOGRAPHY_STYLES.fontWeights.medium, color: disabled ? 'var(--muted-foreground)' : 'white' }}>
              <p className="leading-[20px] whitespace-pre">Record</p>
            </div>
          </>
        )}
      </button>

      {/* Zoom Control - Top Right (Only when active) */}
      {cameraState === 'active' && (
        <ZoomControl
          ref={zoomControlRef}
          zoom={zoom}
          onZoomChange={setZoom}
          minZoom={APP_CONFIG.camera.minZoom || 1}
          maxZoom={maxZoomLevel}
          bottomOffset={96} // 40px spacing + 56px for Record button
          onViewportDragStart={handleViewportDragStart}
        />
      )}

      {/* Setup Modal Flyout */}
      <Flyout isOpen={isSetupOpen} onClose={() => setIsSetupOpen(false)}>
        <SetupRecordingModal 
          onClose={() => setIsSetupOpen(false)}
          onRecord={startRecording}
          values={recordingValues}
          onChange={onRecordingValuesChange}
          currentThrust={currentThrust}
          showErrorToast={showErrorToast}
        />
      </Flyout>

      {/* Stop Modal Flyout */}
      <Flyout isOpen={isStopOpen} onClose={() => setIsStopOpen(false)}>
        <StopRecordingModal 
          onClose={() => {
            console.log('StopRecordingModal closing, values were:', {
              totalImpulse,
              specificImpulse,
              maxThrust,
              averageThrust,
              peakPressure,
              averagePressure,
              burnDuration,
              twr
            });
            setIsStopOpen(false);
          }}
          onSave={(savedFileName) => {
            console.log('Recording saved:', savedFileName);
            setIsStopOpen(false);
            if (onRecordingStopped) {
              onRecordingStopped(savedFileName);
            }
          }}
          recordingValues={recordingValues}
          serverTime={serverTime}
          samples={samples}
          state={state}
          totalImpulse={totalImpulse}
          specificImpulse={specificImpulse}
          peakThrust={maxThrust}
          averageThrust={averageThrust}
          peakPressure={peakPressure}
          averagePressure={averagePressure}
          burnDuration={burnDuration}
          burnData={burnData}
          currentThrust={currentThrust}
          twr={twr}
          showErrorToast={showErrorToast}
        />
      </Flyout>

      {/* Parameters Panel - Only visible during State 0 (Ignited) */}
      {state === '0' && burnDuration !== null && burnDuration > 0 && (
        <ParametersPanel
          totalImpulse={totalImpulse || 0}
          specificImpulse={specificImpulse || 0}
          maxThrust={maxThrust || 0}
          pressure={pressure}
          twr={twr}
          burnDuration={burnDuration}
          hasFuelMass={!!recordingValues.fuelMass && recordingValues.fuelMass.length > 0}
          onDragStart={handleViewportDragStart}
        />
      )}
    </div>
  );
}