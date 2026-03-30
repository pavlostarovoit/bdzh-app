import * as React from 'react';
import svgPaths from "../imports/svg-25pklir3jb";
import { TYPOGRAPHY_CLASSES, TYPOGRAPHY_STYLES } from '../utils/typography';

function Close() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g>
          <path d={svgPaths.p23fd7e00} fill="var(--fill-0, white)" id="close-24" />
        </g>
      </svg>
    </div>
  );
}

function Button({ onClick }: { onClick: () => void }) {
  return (
    <div 
      className="content-stretch flex h-full items-center px-[16px] relative shrink-0 cursor-pointer" 
      data-name="Button"
      onClick={onClick}
    >
      <div aria-hidden="true" className="absolute border-[#c13211] border-l border-solid inset-0 pointer-events-none" />
      <Close />
    </div>
  );
}

function Title({ message }: { message: string }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px py-[12px] relative" data-name="Title">
      <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans',_sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[15px] text-white" style={{ fontWeight: 'var(--font-weight-normal)' }}>
        <p className="leading-[20px]">{message}</p>
      </div>
    </div>
  );
}

interface ErrorToastProps {
  message: string;
  onClose: () => void;
}

export function ErrorToast({ message, onClose }: ErrorToastProps) {
  return (
    <div className="bg-error content-stretch flex gap-[16px] items-center overflow-clip pl-[16px] relative rounded-[var(--radius)] size-full shadow-lg" data-name="Error Toast">
      <Title message={message} />
      <div className="flex flex-row items-center self-stretch">
        <Button onClick={onClose} />
      </div>
    </div>
  );
}