import svgPaths from "./svg-3hy9bdpweg";
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
    <div className="bg-white relative shrink-0 w-full" data-name="Status bar">
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

function Name() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Name">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center p-[8px] relative size-full">
          <div className="flex flex-col font-['_IBM_Plex_Sans_:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-center text-white whitespace-nowrap">
            <p className="leading-[20px]">B5333.1</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Status1() {
  return (
    <div className="h-full relative shrink-0" data-name="Status">
      <div className="content-stretch flex h-full items-center justify-center overflow-clip px-[12px] py-[8px] relative rounded-[inherit]">
        <div className="flex flex-col font-['_IBM_Plex_Sans_:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-white uppercase whitespace-nowrap">
          <p className="leading-[16px]">Recording</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#efefef] border-l border-solid inset-[0_0_0_-1px] pointer-events-none" />
    </div>
  );
}

function Status2() {
  return (
    <div className="h-full relative shrink-0" data-name="Status 2">
      <div className="content-stretch flex h-full items-center overflow-clip pl-[12px] py-[8px] relative rounded-[inherit]">
        <div className="flex flex-col font-['_IBM_Plex_Sans_:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-white uppercase whitespace-nowrap">
          <p className="leading-[16px]">Engine IGNITION</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#efefef] border-l border-solid inset-[0_0_0_-1px] pointer-events-none" />
    </div>
  );
}

function Status() {
  return (
    <div className="bg-[#c13211] h-[40px] relative shrink-0 w-full" data-name="Status">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[12px] relative size-full">
          <div className="content-stretch flex items-center opacity-50 relative rounded-[4.8px] shrink-0 size-[24px]" data-name="Button">
            <div className="overflow-clip relative shrink-0 size-[24px]" data-name="menu">
              <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 12">
                  <path d={svgPaths.p668c00} fill="var(--fill-0, white)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
          <Name />
          <Status1 />
          <Status2 />
        </div>
      </div>
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
        <g clipPath="url(#clip0_274_949)" id="Data">
          <path d={svgPaths.p1d2705c0} id="Data line" stroke="var(--stroke-0, #C13211)" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_274_949">
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
    <div className="bg-white relative shrink-0 w-full" data-name="Thrust section">
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
        <g clipPath="url(#clip0_274_949)" id="Data">
          <path d={svgPaths.p1d2705c0} id="Data line" stroke="var(--stroke-0, #C13211)" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_274_949">
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
    <div className="bg-white relative shrink-0 w-full" data-name="Pressure section">
      <div aria-hidden="true" className="absolute border-[#dfdfdf] border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
        <Title1 />
        <Graph1 />
      </div>
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0" data-name="Title">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="sigma">
        <div className="absolute bottom-[16.67%] left-1/4 right-1/4 top-[16.67%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 13.3333">
            <path d={svgPaths.p28b7db70} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#cdcdcd] text-[14px] text-right">Ns</p>
    </div>
  );
}

function TotalImpulse() {
  return (
    <div className="flex-[1_0_0] mb-[-1px] min-h-px min-w-px relative w-full" data-name="Total impulse">
      <div aria-hidden="true" className="absolute border-[#666] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[6px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <Title2 />
          <p className="font-['_IBM_Plex_Sans_:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[15px] text-right text-white">8120.22</p>
        </div>
      </div>
    </div>
  );
}

function Title3() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0" data-name="Title">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="speedometer">
        <div className="absolute inset-[12.5%_8.33%_15.19%_8.33%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 14.4615">
            <path d={svgPaths.p12d8100} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#cdcdcd] text-[14px] text-right">s</p>
    </div>
  );
}

function SepcificImpulse() {
  return (
    <div className="flex-[1_0_0] mb-[-1px] min-h-px min-w-px relative w-full" data-name="Sepcific impulse">
      <div aria-hidden="true" className="absolute border-[#666] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[6px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <Title3 />
          <p className="font-['_IBM_Plex_Sans_:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[15px] text-right text-white">100.22</p>
        </div>
      </div>
    </div>
  );
}

function Title4() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0" data-name="Title">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="weight">
        <div className="absolute inset-[12.5%_8.33%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 15">
            <path d={svgPaths.p33d3b200} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#cdcdcd] text-[14px] text-right">kg</p>
    </div>
  );
}

function Thrust1() {
  return (
    <div className="flex-[1_0_0] mb-[-1px] min-h-px min-w-px relative w-full" data-name="Thrust">
      <div aria-hidden="true" className="absolute border-[#666] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[6px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <Title4 />
          <p className="font-['_IBM_Plex_Sans_:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[15px] text-right text-white">204.22</p>
        </div>
      </div>
    </div>
  );
}

function Title5() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0" data-name="Title">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="weather-windy">
        <div className="absolute inset-[8.33%_8.33%_8.33%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.8333 16.6667">
            <path d={svgPaths.p4c57200} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#cdcdcd] text-[14px] text-right">MPa</p>
    </div>
  );
}

function Pressure1() {
  return (
    <div className="flex-[1_0_0] mb-[-1px] min-h-px min-w-px relative w-full" data-name="Pressure">
      <div aria-hidden="true" className="absolute border-[#666] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[6px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <Title5 />
          <p className="font-['_IBM_Plex_Sans_:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[15px] text-right text-white">10.99</p>
        </div>
      </div>
    </div>
  );
}

function Title6() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center relative shrink-0" data-name="Title">
      <div className="overflow-clip relative shrink-0 size-[20px]" data-name="timer-sand-complete">
        <div className="absolute bottom-[8.33%] left-1/4 right-1/4 top-[8.33%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 16.6667">
            <path d={svgPaths.p22cf9b00} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#cdcdcd] text-[14px] text-right">s</p>
    </div>
  );
}

function BurnDuration() {
  return (
    <div className="flex-[1_0_0] mb-[-1px] min-h-px min-w-px relative w-full" data-name="Burn duration">
      <div aria-hidden="true" className="absolute border-[#666] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[6px] items-center justify-center px-[12px] py-[8px] relative size-full">
          <Title6 />
          <p className="font-['_IBM_Plex_Sans_:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[15px] text-right text-white">20.22</p>
        </div>
      </div>
    </div>
  );
}

function ParametersBlocks() {
  return (
    <div className="absolute bg-[rgba(61,60,60,0.8)] bottom-[-1px] content-stretch flex flex-col items-center justify-center left-0 overflow-clip pb-px top-0" data-name="Parameters blocks">
      <TotalImpulse />
      <SepcificImpulse />
      <Thrust1 />
      <Pressure1 />
      <BurnDuration />
    </div>
  );
}

function CameraViewport() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px pr-px relative w-full" data-name="Camera viewport">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCameraViewport} />
      <div aria-hidden="true" className="absolute border-[#efefef] border-solid border-t inset-[-1px_0_0_0] pointer-events-none" />
      <div className="absolute bg-[#3d3c3c] bottom-[84px] content-stretch flex flex-col items-center justify-center p-[16px] right-[16px] rounded-[4px] w-[52px]" data-name="Zoom control">
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="flashlight">
          <div className="absolute bottom-[8.33%] left-1/4 right-1/4 top-[8.33%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 16.6667">
              <path d={svgPaths.p2fef2980} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute bg-[#3d3c3c] content-stretch flex flex-col items-center justify-center p-[16px] right-[16px] rounded-[4px] top-[16px] w-[52px]" data-name="Zoom control">
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="magnify-plus-outline">
          <div className="absolute inset-[12.5%_14.58%_14.58%_12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5833 14.5833">
              <path d={svgPaths.p25058200} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute bg-black bottom-[16px] content-stretch cursor-pointer flex gap-[8px] items-center justify-center overflow-clip p-[16px] right-[16px] rounded-[4px]" data-name="Record button">
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="stop">
          <div className="absolute inset-1/4" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
              <path d="M10 10H0V0H10V10Z" fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col font-['_IBM_Plex_Sans_:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-center text-white whitespace-nowrap">
          <p className="leading-[20px]">00:05:023</p>
        </div>
      </div>
      <ParametersBlocks />
    </div>
  );
}

function Title8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-h-px min-w-px not-italic relative text-black" data-name="Title">
      <div className="flex flex-col font-['_IBM_Plex_Sans_:Medium',sans-serif] justify-center leading-[0] min-w-full relative shrink-0 text-[16px] w-[min-content]">
        <p className="leading-[24px] whitespace-pre-wrap">{`Stop & Save recording`}</p>
      </div>
      <p className="font-['_IBM_Plex_Sans_:Light',sans-serif] leading-[20px] relative shrink-0 text-[15px]">{`Recorded file will be saved to SD card. `}</p>
    </div>
  );
}

function Title7() {
  return (
    <div className="bg-white h-[80px] relative shrink-0 w-full" data-name="Title">
      <div aria-hidden="true" className="absolute border-[#efefef] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex gap-[24px] items-start p-[16px] relative size-full">
        <Title8 />
        <div className="content-stretch cursor-pointer flex items-center relative rounded-[4px] shrink-0" data-name="Button">
          <div className="overflow-clip relative rounded-[3px] shrink-0 size-[20px]" data-name="close">
            <div className="absolute inset-[20.83%]" data-name="close-24">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
                <path d={svgPaths.p2a4bf680} fill="var(--fill-0, black)" id="close-24" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileInfo() {
  return (
    <div className="content-stretch flex font-['_IBM_Plex_Sans_:Regular',sans-serif] gap-[4px] items-start leading-[20px] relative shrink-0 text-[#777] text-[15px]" data-name="File info">
      <p className="relative shrink-0">00:05:023</p>
      <p className="relative shrink-0">/</p>
      <p className="relative shrink-0">232323</p>
      <p className="relative shrink-0">samples</p>
    </div>
  );
}

function FileStatus() {
  return (
    <div className="content-stretch flex items-center justify-between not-italic relative shrink-0 w-full" data-name="File status">
      <div className="flex flex-col font-['_IBM_Plex_Sans_:Medium',sans-serif] justify-center leading-[0] relative shrink-0 text-[16px] text-black whitespace-nowrap">
        <p className="leading-[24px]">B5333.1.txt</p>
      </div>
      <FileInfo />
    </div>
  );
}

function Value() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full" data-name="Value">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="sigma">
        <div className="absolute bottom-[16.67%] left-1/4 right-1/4 top-[16.67%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 10.6667">
            <path d={svgPaths.p1d812f80} fill="var(--fill-0, #545454)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-['_IBM_Plex_Sans_:Medium',sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[#c13211] text-[14px] whitespace-pre-wrap">4536</p>
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#545454] text-[14px] text-right">Ns</p>
    </div>
  );
}

function Value1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-full" data-name="Value">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="water-opacity">
        <div className="absolute inset-[2.08%_15.54%_8.33%_15.54%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.0256 14.3333">
            <path d={svgPaths.p118cf400} fill="var(--fill-0, #545454)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-['_IBM_Plex_Sans_:Medium',sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[#0a771a] text-[14px] whitespace-pre-wrap">101.23</p>
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#545454] text-[14px] text-right">s</p>
    </div>
  );
}

function Impulse() {
  return (
    <div className="bg-[#f7f7f7] flex-[1_0_0] min-h-px min-w-px relative rounded-[4px]" data-name="Impulse">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[8px] relative w-full">
        <div className="flex flex-col font-['_IBM_Plex_Sans_:Medium',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#545454] text-[13px] text-ellipsis uppercase w-full whitespace-nowrap">
          <p className="leading-[16px] overflow-hidden">IMPULSE</p>
        </div>
        <Value />
        <Value1 />
      </div>
    </div>
  );
}

function Value2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-full" data-name="Value">
      <div className="flex items-center justify-center relative shrink-0 size-[16px]" style={{ "--transform-inner-width": "1200.0999755859375", "--transform-inner-height": "19.800003051757812" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="overflow-clip relative size-[16px]" data-name="arrow-left">
            <div className="absolute inset-[17%_16.67%_17%_17.33%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.56 10.56">
                <path d={svgPaths.pee91800} fill="var(--fill-0, #545454)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="flex-[1_0_0] font-['_IBM_Plex_Sans_:Medium',sans-serif] leading-[16px] min-h-px min-w-px not-italic overflow-hidden relative text-[#c13211] text-[14px] text-ellipsis whitespace-nowrap">221.10</p>
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#545454] text-[14px] text-right">kg</p>
    </div>
  );
}

function Value3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-full" data-name="Value">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="format-align-middle">
        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13.3333">
            <path d={svgPaths.p19d7980} fill="var(--fill-0, #545454)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-['_IBM_Plex_Sans_:Medium',sans-serif] leading-[16px] min-h-px min-w-px not-italic overflow-hidden relative text-[14px] text-black text-ellipsis whitespace-nowrap">102.90</p>
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#545454] text-[14px] text-right">kg</p>
    </div>
  );
}

function Thrust2() {
  return (
    <div className="bg-[#f7f7f7] flex-[1_0_0] min-h-px min-w-px relative rounded-[4px]" data-name="Thrust">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[8px] relative w-full">
        <div className="flex flex-col font-['_IBM_Plex_Sans_:Medium',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#545454] text-[13px] text-ellipsis uppercase w-full whitespace-nowrap">
          <p className="leading-[16px] overflow-hidden">THRUST</p>
        </div>
        <Value2 />
        <Value3 />
      </div>
    </div>
  );
}

function Value4() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-full" data-name="Value">
      <div className="flex items-center justify-center relative shrink-0 size-[16px]" style={{ "--transform-inner-width": "1200.0999755859375", "--transform-inner-height": "19.800003051757812" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="overflow-clip relative size-[16px]" data-name="arrow-left">
            <div className="absolute inset-[17%_16.67%_17%_17.33%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.56 10.56">
                <path d={svgPaths.pee91800} fill="var(--fill-0, #545454)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="flex-[1_0_0] font-['_IBM_Plex_Sans_:Medium',sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[#0a771a] text-[14px] whitespace-pre-wrap">13.2</p>
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#545454] text-[14px] text-right">MPa</p>
    </div>
  );
}

function Value5() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0 w-full" data-name="Value">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="format-align-middle">
        <div className="absolute inset-[8.33%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 13.3333">
            <path d={svgPaths.p19d7980} fill="var(--fill-0, #545454)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-['_IBM_Plex_Sans_:Medium',sans-serif] leading-[16px] min-h-px min-w-px not-italic relative text-[#0a771a] text-[14px] whitespace-pre-wrap">3.01</p>
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#545454] text-[14px] text-right">MPa</p>
    </div>
  );
}

function Pressure2() {
  return (
    <div className="bg-[#f7f7f7] flex-[1_0_0] min-h-px min-w-px relative rounded-[4px]" data-name="Pressure">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[8px] items-start p-[8px] relative w-full">
        <div className="flex flex-col font-['_IBM_Plex_Sans_:Medium',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#545454] text-[13px] text-ellipsis uppercase w-full whitespace-nowrap">
          <p className="leading-[16px] overflow-hidden">Pressure</p>
        </div>
        <Value4 />
        <Value5 />
      </div>
    </div>
  );
}

function ParametersBlocks1() {
  return (
    <div className="content-stretch flex gap-[12px] h-[80px] items-start relative shrink-0 w-full" data-name="Parameters blocks">
      <Impulse />
      <Thrust2 />
      <Pressure2 />
    </div>
  );
}

function Value6() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center leading-[16px] relative shrink-0 text-[14px] text-right" data-name="Value">
      <p className="font-['_IBM_Plex_Sans_:Medium',sans-serif] relative shrink-0 text-black">30.25</p>
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] relative shrink-0 text-[#545454]">Ns/kg</p>
    </div>
  );
}

function Twr() {
  return (
    <div className="bg-[#f7f7f7] flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]" data-name="TWR">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between not-italic p-[8px] relative size-full">
          <div className="flex flex-col font-['_IBM_Plex_Sans_:Medium',sans-serif] justify-center leading-[0] relative shrink-0 text-[#545454] text-[13px] uppercase whitespace-nowrap">
            <p className="leading-[16px]">TWR</p>
          </div>
          <Value6 />
        </div>
      </div>
    </div>
  );
}

function Value7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center leading-[16px] relative shrink-0 text-[14px] text-right" data-name="Value">
      <p className="font-['_IBM_Plex_Sans_:Medium',sans-serif] relative shrink-0 text-black">3.25</p>
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] relative shrink-0 text-[#545454]">s</p>
    </div>
  );
}

function BurnTime() {
  return (
    <div className="bg-[#f7f7f7] flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[4px]" data-name="Burn time">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between not-italic p-[8px] relative size-full">
          <div className="flex flex-col font-['_IBM_Plex_Sans_:Medium',sans-serif] justify-center leading-[0] relative shrink-0 text-[#545454] text-[13px] uppercase whitespace-nowrap">
            <p className="leading-[16px]">burn time</p>
          </div>
          <Value7 />
        </div>
      </div>
    </div>
  );
}

function ParametersBlocks2() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Parameters blocks 2">
      <Twr />
      <BurnTime />
    </div>
  );
}

function Left() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Left">
      <div className="flex flex-col font-['_IBM_Plex_Sans_:Medium',sans-serif] justify-center leading-[0] relative shrink-0 text-[#0150c8] text-[13px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">Thrust</p>
      </div>
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#545454] text-[14px] text-right">kg</p>
    </div>
  );
}

function Right() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Right">
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#545454] text-[14px] text-right">MPa</p>
      <div className="flex flex-col font-['_IBM_Plex_Sans_:Medium',sans-serif] justify-center leading-[0] relative shrink-0 text-[#c37500] text-[13px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">Pressure</p>
      </div>
    </div>
  );
}

function Title10() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between not-italic relative shrink-0 w-full" data-name="Title">
      <Left />
      <Right />
    </div>
  );
}

function Component8() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="4">
      <div className="flex flex-col font-['_IBM_Plex_Sans_:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0150c8] text-[13px] whitespace-nowrap">
        <p className="leading-[16px]">300</p>
      </div>
      <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative" data-name="Guide line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 264 1">
            <line id="Guide line" stroke="var(--stroke-0, #DFDFDF)" x2="264" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['_IBM_Plex_Sans_:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#c37500] text-[13px] text-right whitespace-nowrap">
        <p className="leading-[16px]">3</p>
      </div>
    </div>
  );
}

function Component9() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="2">
      <div className="flex flex-col font-['_IBM_Plex_Sans_:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0150c8] text-[13px] whitespace-nowrap">
        <p className="leading-[16px]">200</p>
      </div>
      <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative" data-name="Guide line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 264 1">
            <line id="Guide line" stroke="var(--stroke-0, #DFDFDF)" x2="264" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['_IBM_Plex_Sans_:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#c37500] text-[13px] whitespace-nowrap">
        <p className="leading-[16px]">2</p>
      </div>
    </div>
  );
}

function Component10() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="1">
      <div className="flex flex-col font-['_IBM_Plex_Sans_:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0150c8] text-[13px] whitespace-nowrap">
        <p className="leading-[16px]">100</p>
      </div>
      <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative" data-name="Guide line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 264 1">
            <line id="Guide line" stroke="var(--stroke-0, #DFDFDF)" x2="264" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['_IBM_Plex_Sans_:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#c37500] text-[13px] text-right whitespace-nowrap">
        <p className="leading-[16px]">1</p>
      </div>
    </div>
  );
}

function Component11() {
  return (
    <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full" data-name="0">
      <div className="flex flex-col font-['_IBM_Plex_Sans_:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0150c8] text-[13px] w-[24px]">
        <p className="leading-[16px] whitespace-pre-wrap">0</p>
      </div>
      <div className="flex-[1_0_0] h-0 min-h-px min-w-px relative" data-name="Guide line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 264 1">
            <line id="Guide line" stroke="var(--stroke-0, #DFDFDF)" x2="264" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-['_IBM_Plex_Sans_:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#c37500] text-[13px] text-right whitespace-nowrap">
        <p className="leading-[16px]">0</p>
      </div>
    </div>
  );
}

function Values() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-h-px min-w-px overflow-clip relative w-full" data-name="Values">
      <Component8 />
      <Component9 />
      <Component10 />
      <Component11 />
    </div>
  );
}

function Seconds2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Seconds">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex font-['_IBM_Plex_Sans_:Regular',sans-serif] items-center justify-between leading-[16px] not-italic px-[31px] relative text-[#545454] text-[13px] text-right w-full">
          <p className="relative shrink-0">0</p>
          <p className="relative shrink-0">2</p>
          <p className="relative shrink-0">4</p>
          <p className="relative shrink-0">6</p>
          <p className="relative shrink-0">8</p>
          <p className="relative shrink-0">10</p>
          <p className="relative shrink-0">12</p>
          <p className="relative shrink-0">14</p>
        </div>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="relative size-full" data-name="Data">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 264 164">
        <g clipPath="url(#clip0_274_954)" id="Data">
          <path d={svgPaths.p82a09c0} id="Data line" stroke="var(--stroke-0, #C37500)" strokeWidth="2" />
          <path d={svgPaths.p83f800} id="Data line_2" stroke="var(--stroke-0, #0150C8)" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_274_954">
            <rect fill="white" height="164" width="264" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Graph3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-between min-h-px min-w-px overflow-clip relative w-full" data-name="Graph">
      <Values />
      <Seconds2 />
      <div className="absolute flex inset-[0_16px_26px_32px] items-center justify-center">
        <div className="-scale-y-100 flex-none h-[164px] w-[264px]">
          <Data2 />
        </div>
      </div>
    </div>
  );
}

function Graph2() {
  return (
    <div className="bg-[#f7f7f7] h-[242px] relative rounded-[4px] shrink-0 w-full" data-name="Graph">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start px-[8px] py-[12px] relative size-full">
        <Title10 />
        <Graph3 />
      </div>
    </div>
  );
}

function Title9() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Title">
      <div aria-hidden="true" className="absolute border-[#efefef] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-[16px] pt-[12px] px-[16px] relative w-full">
        <FileStatus />
        <ParametersBlocks1 />
        <ParametersBlocks2 />
        <Graph2 />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <div className="flex flex-col font-['_IBM_Plex_Sans_:Medium',sans-serif] justify-center leading-[0] relative shrink-0 text-black whitespace-nowrap">
        <p className="leading-[20px]">Study comment</p>
      </div>
      <p className="font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#666] text-right">(optional)</p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="bg-[#efefef] relative rounded-[4px] shrink-0 w-full" data-name="Text input">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] py-[12px] w-full" />
      </div>
    </div>
  );
}

function Title11() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Title">
      <div aria-hidden="true" className="absolute border-[#efefef] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start p-[16px] relative w-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Text field">
          <div className="content-stretch flex gap-[12px] items-start not-italic relative shrink-0 text-[15px] w-full" data-name="Label">
            <Frame />
            <p className="flex-[1_0_0] font-['_IBM_Plex_Sans_:Regular',sans-serif] leading-[20px] min-h-px min-w-px relative text-[#666] text-right whitespace-pre-wrap">ASCII symbols</p>
          </div>
          <TextInput />
        </div>
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div className="relative shrink-0 w-full" data-name="Buttons">
      <div className="content-stretch cursor-pointer flex gap-[12px] items-start p-[16px] relative w-full">
        <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[4px]" data-name="Button">
          <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 pointer-events-none rounded-[4px]" />
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center px-[16px] py-[12px] relative w-full">
              <div className="flex flex-col font-['_IBM_Plex_Sans_:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-black text-center whitespace-nowrap">
                <p className="leading-[20px]">Cancel</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#c13211] flex-[1_0_0] min-h-px min-w-px relative rounded-[4px]" data-name="Button">
          <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[12px] relative w-full">
              <div className="overflow-clip relative shrink-0 size-[20px]" data-name="stop">
                <div className="absolute inset-1/4" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                    <path d="M10 10H0V0H10V10Z" fill="var(--fill-0, white)" id="Vector" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col font-['_IBM_Plex_Sans_:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-center text-white whitespace-nowrap">
                <p className="leading-[20px]">{`Stop & Save`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Modal() {
  return (
    <div className="absolute bg-white bottom-0 content-stretch flex flex-col items-center justify-end left-0 overflow-clip right-0 rounded-tl-[4px] rounded-tr-[4px] shadow-[0px_-1px_8px_0px_rgba(42,42,42,0.08)]" data-name="Modal">
      <Title7 />
      <Title9 />
      <Title11 />
      <div className="h-0 relative shrink-0 w-[360px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 1">
            <line id="Line 4" stroke="var(--stroke-0, #EFEFEF)" x2="360" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <Buttons />
    </div>
  );
}

export default function MainRecordingIgnitedStopSaveFlyout() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center relative size-full" data-name="Main - Recording & Ignited - Stop & Save Flyout">
      <StatusBar />
      <Status />
      <ThrustSection />
      <PressureSection />
      <CameraViewport />
      <div className="absolute backdrop-blur-[8px] bg-[#f7f7f7] inset-[36px_0_0_0] opacity-90 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" data-name="BG" />
      <Modal />
    </div>
  );
}