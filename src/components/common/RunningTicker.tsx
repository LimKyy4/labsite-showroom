import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface RunningTickerProps {
  text?: string;
  items?: string[];
  className?: string;
  bgColor?: string;
  textColor?: string;
}

export const RunningTicker: React.FC<RunningTickerProps> = ({
  text,
  items,
  className = '',
  bgColor = 'bg-forest',
  textColor = 'text-white',
}) => {
  const content = items ? items.join(' • ') : (text || 'UNIT LOLOS INSPEKSI KETAT 160 TITIK • JAMINAN BEBAS BANJIR & TABRAKAN BESAR • GARANSI MESIN & TRANSMISI 1 TAHUN • DOKUMEN BPKB & STNK RESMI TERVERIFIKASI • SHOWROOM TERPERCAYA WILAYAH BOGOR');

  return (
    <aside
      aria-label="Pita Pengumuman Jaminan Kualitas"
      className={`relative w-full overflow-hidden ${bgColor} ${textColor} py-2.5 sm:py-3 border-y border-hairline select-none ticker-gpu ${className}`}
    >
      <div className="flex w-max animate-ticker">
        <div className="flex items-center space-x-6 px-4">
          <ShieldCheck className="h-4 w-4 shrink-0 opacity-80" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase font-heading whitespace-nowrap">
            {content}
          </span>
          <ShieldCheck className="h-4 w-4 shrink-0 opacity-80" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase font-heading whitespace-nowrap">
            {content}
          </span>
        </div>
        <div className="flex items-center space-x-6 px-4" aria-hidden="true">
          <ShieldCheck className="h-4 w-4 shrink-0 opacity-80" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase font-heading whitespace-nowrap">
            {content}
          </span>
          <ShieldCheck className="h-4 w-4 shrink-0 opacity-80" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase font-heading whitespace-nowrap">
            {content}
          </span>
        </div>
      </div>
    </aside>
  );
};
