import svgPaths from "./svg-ugm3lxr9nt";

function Rssi() {
  return (
    <div className="content-stretch flex font-['_IBM_Plex_Sans_:Medium',sans-serif] items-center leading-[20px] not-italic relative shrink-0 text-[15px] text-white" data-name="RSSI">
      <p className="relative shrink-0">25</p>
      <p className="relative shrink-0">%</p>
    </div>
  );
}

function DateTime() {
  return (
    <div className="content-stretch flex font-['_IBM_Plex_Sans_:Medium',sans-serif] gap-[4px] items-center leading-[20px] not-italic px-[4px] relative rounded-[4px] shrink-0 text-[15px] text-white" data-name="Date & Time">
      <p className="opacity-50 relative shrink-0">2 Oct 2025</p>
      <p className="relative shrink-0">11:03:23</p>
    </div>
  );
}

export default function StatusBar() {
  return (
    <div className="bg-[#c37500] content-stretch flex items-center justify-between p-[8px] relative size-full" data-name="Status bar">
      <div className="content-stretch flex gap-[4px] items-center px-[4px] relative rounded-[4px] shrink-0" data-name="RSSI">
        <div className="overflow-clip relative shrink-0 size-[20px]" data-name="wifi-strength-1">
          <div className="absolute inset-[12.5%_1.46%_10.42%_1.58%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.3917 15.4167">
              <path d={svgPaths.p15c05f0} fill="var(--fill-0, white)" id="Vector" />
            </svg>
          </div>
        </div>
        <Rssi />
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Refresh rate">
          <p className="font-['_IBM_Plex_Sans_:Medium',sans-serif] leading-[20px] not-italic opacity-50 relative shrink-0 text-[15px] text-white">10ms</p>
          <div className="overflow-clip relative shrink-0 size-[8px]" data-name="circle">
            <div className="-translate-x-1/2 absolute aspect-[6.666666507720947/6.666666507720947] bottom-[16.67%] left-1/2 top-[16.67%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 5.33333">
                <path d={svgPaths.p5399800} fill="var(--fill-0, white)" id="Vector" opacity="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <DateTime />
    </div>
  );
}