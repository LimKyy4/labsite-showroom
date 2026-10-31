import React from 'react';
import { ActiveTab } from '../../types/showroom';

interface NavbarBrandAnchorProps {
  onTabClick: (tab: ActiveTab) => void;
}

export const NavbarBrandAnchor: React.FC<NavbarBrandAnchorProps> = ({ onTabClick }) => {
  return (
    <button
      type="button"
      onClick={() => onTabClick('home')}
      className="flex items-center gap-2 sm:gap-2.5 text-left focus:outline-none shrink-0 group pl-0.5"
    >
      <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center overflow-hidden rounded-full border border-hairline bg-white shrink-0 group-hover:scale-105 active:scale-95 transition-transform shadow-sm">
        <img
          src="/logo.jfif"
          alt="Labsite Showroom"
          className="h-full w-full object-contain mix-blend-multiply filter contrast-110 brightness-100"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-heading text-xs sm:text-sm font-bold tracking-tight text-charcoal leading-none">
          SHOWROOM<span className="text-forest">.BOGOR</span>
        </span>
        <span className="text-[9px] tracking-wider font-mono text-muted uppercase mt-0.5">
          by Labsite Showroom
        </span>
      </div>
    </button>
  );
};
