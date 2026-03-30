import svgPaths from "./svg-m9dka7q5l4";
import imgCameraViewport from "figma:asset/c7c185243b765067fcc555b2183fff8de0e33baf.png";

function Rssi() {
  return (
    <div className="content-stretch flex font-['_IBM_Plex_Sans_:Medium',sans-serif] items-center leading-[20px] not-italic relative shrink-0 text-[#545454] text-[15px]" data-name="RSSI">
      <p className="relative shrink-0">100</p>
      <p className="relative shrink-0">%</p>
    </div>
  );
}

function DateTime() {
  return (
    <div className="content-stretch flex font-['_IBM_Plex_Sans_:Medium',sans-serif] gap-[4px] items-center leading-[20px] not-italic px-[4px] relative rounded-[4px] shrink-0 text-[#545454] text-[15px]" data-name="Date & Time">
      <p className="opacity-50 relative shrink-0">2 Oct 2025</p>
      <p className="relative shrink-0">11:03:23</p>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="bg-white relative shrink-0 w-full z-[5]" data-name="Status bar">
      <div aria-hidden="true" className="absolute border-[#efefef] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[8px] relative w-full">
          <div className="content-stretch flex gap-[4px] items-center px-[4px] relative rounded-[4px] shrink-0" data-name="RSSI">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="wifi-strength-4">
              <div className="absolute inset-[12.5%_1.46%_10.42%_1.58%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.3917 15.4167">
                  <path d={svgPaths.pfcdb700} fill="var(--fill-0, #545454)" id="Vector" />
                </svg>
              </div>
            </div>
            <Rssi />
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Refresh rate">
              <p className="font-['_IBM_Plex_Sans_:Medium',sans-serif] leading-[20px] not-italic opacity-50 relative shrink-0 text-[#545454] text-[15px]">10ms</p>
              <div className="overflow-clip relative shrink-0 size-[8px]" data-name="circle">
                <div className="-translate-x-1/2 absolute aspect-[6.666666507720947/6.666666507720947] bottom-[16.67%] left-1/2 top-[16.67%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 5.33333">
                    <path d={svgPaths.p5399800} fill="var(--fill-0, #545454)" id="Vector" opacity="0.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <DateTime />
        </div>
      </div>
    </div>
  );
}

function Status() {
  return (
    <div className="bg-[#545454] relative shrink-0 w-full z-[4]" data-name="Status">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[4px] items-center justify-center px-[12px] py-[8px] relative w-full">
          <div className="content-stretch cursor-pointer flex items-center opacity-50 relative rounded-[4.8px] shrink-0 size-[24px]" data-name="Button">
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="menu">
              <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 12">
                  <path d={svgPaths.p668c00} fill="var(--fill-0, white)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-[1_0_0] flex-col font-['_IBM_Plex_Sans_:Medium',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[13px] text-right text-white uppercase">
            <p className="leading-[16px] whitespace-pre-wrap">standby</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#545454] border-b-2 border-dashed inset-[0_0_-2px_0] pointer-events-none" />
    </div>
  );
}

function Thrust() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Thrust">
      <p className="font-['_IBM_Plex_Sans_:Medium',sans-serif] leading-[24px] relative shrink-0 text-[16px] text-black">5.02</p>
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#545454] text-[15px]">kg</p>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex h-[24px] items-start justify-between not-italic relative shrink-0 text-right w-full" data-name="Title">
      <p className="font-['_IBM_Plex_Sans_:Medium',sans-serif] leading-[24px] relative shrink-0 text-[16px] text-black">Thrust</p>
      <Thrust />
    </div>
  );
}

function Component3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="3">
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#545454] text-[13px]">3</p>
      <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative" data-name="Guide line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 312 1">
            <line id="Guide line" stroke="var(--stroke-0, #EFEFEF)" x2="312" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Component2() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="2">
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#545454] text-[13px]">2</p>
      <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative" data-name="Guide line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 312 1">
            <line id="Guide line" stroke="var(--stroke-0, #EFEFEF)" x2="312" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="1">
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#545454] text-[13px]">1</p>
      <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative" data-name="Guide line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 312 1">
            <line id="Guide line" stroke="var(--stroke-0, #EFEFEF)" x2="312" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="0">
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#545454] text-[13px]">0</p>
      <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative" data-name="Guide line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 312 1">
            <line id="Guide line" stroke="var(--stroke-0, #EFEFEF)" x2="312" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Kilograms() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-h-px min-w-px overflow-clip relative w-full" data-name="Kilograms">
      <Component3 />
      <Component2 />
      <Component1 />
      <Component />
    </div>
  );
}

function Seconds() {
  return (
    <div className="relative shrink-0 w-full" data-name="Seconds">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex font-['_IBM_Plex_Sans_:Regular',sans-serif] items-center justify-between leading-[16px] not-italic pl-[12px] relative text-[#545454] text-[13px] text-right w-full">
          <p className="relative shrink-0">0</p>
          <p className="relative shrink-0">2</p>
          <p className="relative shrink-0">4</p>
          <p className="relative shrink-0">6</p>
          <p className="relative shrink-0">8</p>
          <p className="relative shrink-0">10</p>
          <p className="relative shrink-0">12</p>
        </div>
      </div>
    </div>
  );
}

function Data() {
  return (
    <div className="absolute inset-[0_0_26px_16px]" data-name="Data">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 312 90">
        <g clipPath="url(#clip0_341_409)" id="Data">
          <path d={svgPaths.p1d2705c0} id="Data line" stroke="var(--stroke-0, #545454)" strokeDasharray="8 8" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_341_409">
            <rect fill="white" height="90" width="312" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Graph() {
  return (
    <div className="content-stretch flex flex-col h-[116px] items-start justify-between overflow-clip relative shrink-0 w-full" data-name="Graph">
      <Kilograms />
      <Seconds />
      <Data />
    </div>
  );
}

function ThrustSection() {
  return (
    <div className="bg-white relative shrink-0 w-full z-[3]" data-name="Thrust section">
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
        <Title />
        <Graph />
      </div>
    </div>
  );
}

function Pressure() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Pressure">
      <p className="font-['_IBM_Plex_Sans_:Medium',sans-serif] leading-[24px] relative shrink-0 text-[16px] text-black">5.02</p>
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#545454] text-[15px]">MPa</p>
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex h-[24px] items-start justify-between not-italic relative shrink-0 text-right w-full" data-name="Title">
      <p className="font-['_IBM_Plex_Sans_:Medium',sans-serif] leading-[24px] relative shrink-0 text-[16px] text-black">Pressure</p>
      <Pressure />
    </div>
  );
}

function Component4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="3">
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#545454] text-[13px]">3</p>
      <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative" data-name="Guide line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 312 1">
            <line id="Guide line" stroke="var(--stroke-0, #EFEFEF)" x2="312" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Component5() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="2">
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#545454] text-[13px]">2</p>
      <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative" data-name="Guide line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 312 1">
            <line id="Guide line" stroke="var(--stroke-0, #EFEFEF)" x2="312" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Component6() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="1">
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#545454] text-[13px]">1</p>
      <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative" data-name="Guide line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 312 1">
            <line id="Guide line" stroke="var(--stroke-0, #EFEFEF)" x2="312" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Component7() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="0">
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#545454] text-[13px]">0</p>
      <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative" data-name="Guide line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 312 1">
            <line id="Guide line" stroke="var(--stroke-0, #EFEFEF)" x2="312" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MPa() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-h-px min-w-px overflow-clip relative w-full" data-name="MPa">
      <Component4 />
      <Component5 />
      <Component6 />
      <Component7 />
    </div>
  );
}

function Seconds1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Seconds">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex font-['_IBM_Plex_Sans_:Regular',sans-serif] items-center justify-between leading-[16px] not-italic pl-[12px] relative text-[#545454] text-[13px] text-right w-full">
          <p className="relative shrink-0">0</p>
          <p className="relative shrink-0">2</p>
          <p className="relative shrink-0">4</p>
          <p className="relative shrink-0">6</p>
          <p className="relative shrink-0">8</p>
          <p className="relative shrink-0">10</p>
          <p className="relative shrink-0">12</p>
        </div>
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="absolute inset-[0_0_26px_16px]" data-name="Data">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 312 90">
        <g clipPath="url(#clip0_341_409)" id="Data">
          <path d={svgPaths.p1d2705c0} id="Data line" stroke="var(--stroke-0, #545454)" strokeDasharray="8 8" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_341_409">
            <rect fill="white" height="90" width="312" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Graph1() {
  return (
    <div className="content-stretch flex flex-col h-[116px] items-start justify-between overflow-clip relative shrink-0 w-full" data-name="Graph">
      <MPa />
      <Seconds1 />
      <Data1 />
    </div>
  );
}

function PressureSection() {
  return (
    <div className="bg-white relative shrink-0 w-full z-[2]" data-name="Pressure section">
      <div aria-hidden="true" className="absolute border-[#dfdfdf] border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
        <Title1 />
        <Graph1 />
      </div>
    </div>
  );
}

function TopSection() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Top section">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[4px] relative size-full">
          <div className="bg-[#3d3c3c] flex-[1_0_0] h-full min-h-px min-w-px rounded-tl-[40px] rounded-tr-[40px]" data-name="Section" />
          <div className="-translate-x-1/2 absolute left-1/2 overflow-clip size-[20px] top-[16px]" data-name="magnify-plus-outline">
            <div className="absolute inset-[12.5%_14.58%_14.58%_12.5%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5833 14.5833">
                <path d={svgPaths.p25058200} fill="var(--fill-0, white)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BottomSection() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Bottom section">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[4px] relative size-full">
          <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px rounded-bl-[40px] rounded-br-[40px]" data-name="Section" />
        </div>
      </div>
    </div>
  );
}

function CameraViewport() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px pr-px relative w-full z-[1]" data-name="Camera viewport">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCameraViewport} />
      <div aria-hidden="true" className="absolute border-[#efefef] border-solid border-t inset-[-1px_0_0_0] pointer-events-none" />
      <div className="absolute bg-black bottom-[16px] content-stretch cursor-pointer flex gap-[8px] items-center justify-center overflow-clip p-[16px] right-[16px] rounded-[4px]" data-name="Record button">
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="record">
          <div className="absolute inset-[8.33%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
              <path d={svgPaths.p86d1980} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col font-['_IBM_Plex_Sans_:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-center text-white whitespace-nowrap">
          <p className="leading-[20px]">Record</p>
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[4px] h-[218px] items-start right-[12px] rounded-[40px] top-[16px] w-[60px]" data-name="Zoom control - expanded">
        <TopSection />
        <div className="flex h-[4.092px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
          <div className="flex-none rotate-[0.09deg] w-full">
            <div className="bg-white h-[4px] rounded-[4px] w-full" data-name="Cursor" />
          </div>
        </div>
        <BottomSection />
      </div>
    </div>
  );
}

export default function MainStandbyZoomControlExpanded() {
  return (
    <div className="bg-white content-stretch flex flex-col isolate items-center relative size-full" data-name="Main - Standby - Zoom control expanded">
      <StatusBar />
      <Status />
      <ThrustSection />
      <PressureSection />
      <CameraViewport />
    </div>
  );
}