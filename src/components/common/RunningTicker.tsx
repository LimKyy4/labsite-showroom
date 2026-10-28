import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const RunningTicker: React.FC = () => {
  const tickerText =
    'UNIT LOLOS INSPEKSI KETAT 160 TITIK • JAMINAN BEBAS BANJIR & TABRAKAN BESAR • GARANSI MESIN & TRANSMISI 1 TAHUN • DOKUMEN BPKB & STNK RESMI TERVERIFIKASI • SHOWROOM TERPERCAYA WILAYAH BOGOR';

  return (
    <aside
      aria-label="Pita Pengumuman Jaminan Kualitas"
      className="relative w-full overflow-hidden bg-forest text-white py-3 border-y border-forest-light select-none"
    >
      <div className="flex w-max animate-ticker">
        <div className="flex items-center space-x-6 px-4">
          <ShieldCheck className="h-4 w-4 shrink-0 text-sage-light" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase font-display whitespace-nowrap">
            {tickerText}
          </span>
          <ShieldCheck className="h-4 w-4 shrink-0 text-sage-light" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase font-display whitespace-nowrap">
            {tickerText}
          </span>
        </div>
        <div className="flex items-center space-x-6 px-4" aria-hidden="true">
          <ShieldCheck className="h-4 w-4 shrink-0 text-sage-light" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase font-display whitespace-nowrap">
            {tickerText}
          </span>
          <ShieldCheck className="h-4 w-4 shrink-0 text-sage-light" />
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase font-display whitespace-nowrap">
            {tickerText}
          </span>
        </div>
      </div>
    </aside>
  );
};
