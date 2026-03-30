import svgPaths from "./svg-e3mjq7wcji";

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
      <div className="content-stretch flex h-full items-center justify-center overflow-clip pl-[12px] py-[8px] relative rounded-[inherit]">
        <div className="flex flex-col font-['_IBM_Plex_Sans_:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-white uppercase whitespace-nowrap">
          <p className="leading-[16px]">Recording</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#efefef] border-l border-solid inset-[0_0_0_-1px] pointer-events-none" />
    </div>
  );
}

export default function Status() {
  return (
    <div className="bg-black content-stretch flex items-center px-[12px] relative size-full" data-name="Status">
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
    </div>
  );
}