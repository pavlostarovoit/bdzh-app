import svgPaths from "./svg-qm4f030b3h";

export default function Status() {
  return (
    <div className="bg-[#545454] relative size-full" data-name="Status">
      <div className="content-stretch flex gap-[4px] items-center justify-center px-[12px] py-[8px] relative size-full">
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
      <div aria-hidden="true" className="absolute border-[#545454] border-b-2 border-dashed inset-[0_0_-2px_0] pointer-events-none" />
    </div>
  );
}