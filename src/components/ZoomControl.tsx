import * as React from 'react';
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import svgPaths from '../imports/svg-m9dka7q5l4';

interface ZoomControlProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
  minZoom?: number;
  maxZoom?: number;
  bottomOffset?: number; // Distance from Record button
  // Viewport drag handlers for external control
  onViewportDragStart?: (clientX: number, clientY: number) => void;
}

// Exposed methods for external control
export interface ZoomControlRef {
  startExternalDrag: (clientY: number) => void;
  updateExternalDrag: (clientY: number) => void;
  endExternalDrag: () => void;
}

/**
 * ZoomControl Component
 * - Default state: Small button with zoom icon
 * - Expanded state: Vertical slider that shows zoom progress
 * - Drag vertically on button to reveal slider and immediately control zoom
 * - At min zoom: Grey block fills from top, line at bottom, small white block
 * - As zoom increases: White block expands UP from bottom, grey shrinks from bottom
 * - At high zoom: Icon jumps from grey section to white section and turns black
 * - Clicking outside collapses back to button
 */
export const ZoomControl = forwardRef<ZoomControlRef, ZoomControlProps>(({ 
  zoom, 
  onZoomChange, 
  minZoom = 1, 
  maxZoom = 3,
  bottomOffset = 96, // 40px spacing + 56px Record button height
  onViewportDragStart
}, ref) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDraggingFromButton, setIsDraggingFromButton] = useState(false);
  const controlRef = useRef<HTMLDivElement>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const preventClickRef = useRef(false); // Track if we should prevent click (due to drag)
  const dragStateRef = useRef<{
    isDragging: boolean;
    startY: number;
    startZoom: number;
    sliderHeight: number;
    hasMoved: boolean; // Track if user actually dragged
  }>({
    isDragging: false,
    startY: 0,
    startZoom: zoom,
    sliderHeight: 0,
    hasMoved: false
  });

  // Reset inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    // Auto-collapse after 3 seconds of no interaction
    inactivityTimerRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 3000);
  };

  // Handle click outside to collapse
  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (controlRef.current && !controlRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    // Add slight delay to prevent immediate closure
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside as any);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside as any);
    };
  }, [isExpanded]);

  // Start inactivity timer when expanded
  useEffect(() => {
    if (isExpanded) {
      resetInactivityTimer();
    }
    
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [isExpanded]);

  const handleButtonClick = () => {
    setIsExpanded(true);
  };

  // Handle drag start on button
  const handleDragStart = (clientY: number) => {
    // Calculate slider height based on viewport
    const sliderHeight = Math.min(
      window.innerHeight - bottomOffset - 16, // Full available height
      218 // Max height
    );
    
    dragStateRef.current = {
      isDragging: true,
      startY: clientY,
      startZoom: zoom,
      sliderHeight,
      hasMoved: false
    };
    setIsDraggingFromButton(true);
  };

  // Handle drag move
  const handleDragMove = (clientY: number) => {
    if (!dragStateRef.current.isDragging) return;

    const dragState = dragStateRef.current;
    const deltaY = dragState.startY - clientY; // Positive = drag up (zoom in)
    
    // Expand slider if not already expanded
    if (!isExpanded) {
      setIsExpanded(true);
    }

    // Calculate new zoom based on drag distance
    // Map drag distance to zoom range
    const zoomRange = maxZoom - minZoom;
    const dragPercentage = deltaY / dragState.sliderHeight;
    const zoomDelta = dragPercentage * zoomRange;
    
    let newZoom = dragState.startZoom + zoomDelta;
    newZoom = Math.max(minZoom, Math.min(maxZoom, newZoom)); // Clamp to range
    
    onZoomChange(newZoom);
    resetInactivityTimer();
    dragStateRef.current.hasMoved = true; // Mark as moved
  };

  // Handle drag end
  const handleDragEnd = () => {
    dragStateRef.current.isDragging = false;
    setIsDraggingFromButton(false);
    preventClickRef.current = dragStateRef.current.hasMoved; // Prevent click if user dragged
  };

  // Mouse event handlers for button
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Trigger viewport drag system if available
    if (onViewportDragStart) {
      onViewportDragStart(e.clientX, e.clientY);
    }
  };

  // Touch event handlers for button
  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (e.touches.length === 1) {
      // Trigger viewport drag system if available
      if (onViewportDragStart) {
        onViewportDragStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    }
  };

  // Global mouse/touch move and end handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      handleDragMove(e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handleDragMove(e.touches[0].clientY);
      }
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    const handleTouchEnd = () => {
      handleDragEnd();
    };

    // Add listeners whenever we're potentially dragging
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []); // Empty deps - always active

  // Handle slider change
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    onZoomChange(value);
    resetInactivityTimer(); // Reset timer on interaction
  };

  // Handle slider interaction (touch/mouse down)
  const handleSliderInteraction = () => {
    resetInactivityTimer(); // Reset timer on any interaction
  };

  // Calculate slider percentage (0-100) representing zoom progress
  // At minZoom (1x): percentage = 0% -> line at bottom, grey fills top
  // At maxZoom (3x): percentage = 100% -> line at top, white fills bottom
  const sliderPercentage = ((zoom - minZoom) / (maxZoom - minZoom)) * 100;
  
  // Determine if icon should jump to white section
  // When white block expands enough (grey section becomes < ~50px), icon jumps
  // Grey section shrinks as zoom increases, so icon should jump earlier to avoid overlap
  const iconJumpThreshold = 75; // Jump earlier to prevent line overlap with icon
  const shouldIconJump = sliderPercentage > iconJumpThreshold;

  // Expose methods for external control
  useImperativeHandle(ref, () => ({
    startExternalDrag: handleDragStart,
    updateExternalDrag: handleDragMove,
    endExternalDrag: handleDragEnd
  }));

  if (isExpanded) {
    return (
      <div 
        ref={controlRef}
        className="absolute right-[12px] top-[16px] w-[60px]"
        style={{ 
          height: `calc(100% - ${bottomOffset}px)`,
          maxHeight: '218px'
        }}
      >
        {/* Container with rounded corners and overflow hidden */}
        <div className="relative w-full h-full rounded-[40px]">
          {/* Grey Section - Fills from top, shrinks as zoom increases - 52px wide, centered */}
          <div 
            className="bg-[#3d3c3c] absolute top-0 left-1/2 -translate-x-1/2 w-[52px] transition-all duration-150 ease-out rounded-t-[40px] rounded-b-[4px]"
            style={{ 
              height: `max(0px, calc(100% - (100% - 4px) * ${sliderPercentage / 100} - 10px))` // Container minus (line top position + 6px gap + 4px line)
            }}
          >
            {/* Zoom Icon - WHITE, stays at top of grey section until it gets too small */}
            {!shouldIconJump && (
              <div 
                className="absolute left-1/2 -translate-x-1/2 size-[20px] top-[16px] transition-all duration-150 ease-out"
              >
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5833 14.5833">
                  <path d={svgPaths.p25058200} fill="white" />
                </svg>
              </div>
            )}
          </div>

          {/* Horizontal Line (Cursor) - 60px wide (full width), larger than boxes, with rounded ends */}
          {/* Line travels so its bottom edge touches container bottom at 0%, and top edge touches container top at 100% */}
          <div 
            className="h-[4px] w-full bg-white absolute left-0 right-0 transition-all duration-150 ease-out z-10 rounded-[4px]"
            style={{
              bottom: `calc((100% - 4px) * ${sliderPercentage / 100})` // At 0%: 0px (bottom edge at bottom), At 100%: calc(100% - 4px) (top edge at top)
            }}
          />

          {/* White Section - Fills from bottom, expands as zoom increases - 52px wide, centered */}
          <div 
            className="bg-white absolute bottom-0 left-1/2 -translate-x-1/2 w-[52px] transition-all duration-150 ease-out rounded-b-[40px] rounded-t-[4px]"
            style={{ 
              height: `max(0px, calc((100% - 4px) * ${sliderPercentage / 100} - 6px))` // Line bottom position minus 6px gap
            }}
          >
            {/* Zoom Icon - BLACK, appears just below the line when grey section is too small */}
            {shouldIconJump && (
              <div 
                className="absolute left-1/2 -translate-x-1/2 size-[20px] top-[16px] transition-all duration-150 ease-out"
              >
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5833 14.5833">
                  <path d={svgPaths.p25058200} fill="black" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Invisible slider input overlay */}
        <input
          type="range"
          min={minZoom}
          max={maxZoom}
          step={0.1}
          value={zoom}
          onChange={handleSliderChange}
          onMouseDown={handleSliderInteraction}
          onTouchStart={handleSliderInteraction}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          style={{
            writingMode: 'bt-lr', // Vertical slider
            WebkitAppearance: 'slider-vertical',
            appearance: 'slider-vertical',
            pointerEvents: isDraggingFromButton ? 'none' : 'auto' // Disable during drag from button
          }}
        />
      </div>
    );
  }

  // Collapsed button state
  return (
    <button
      ref={controlRef as React.RefObject<HTMLButtonElement>}
      onClick={handleButtonClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className="absolute bg-[#3d3c3c] box-border content-stretch flex flex-col gap-[4px] items-center justify-center p-[16px] right-[16.46px] rounded-[4px] top-[16px] w-[52px] cursor-pointer border-none z-10"
    >
      <div className="relative shrink-0 size-[20px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5833 14.5833">
          <path d={svgPaths.p25058200} fill="white" />
        </svg>
      </div>
    </button>
  );
});