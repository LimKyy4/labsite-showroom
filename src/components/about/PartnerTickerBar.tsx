import React from 'react';
import { Landmark, ShieldCheck } from 'lucide-react';

const PARTNERS_LIST = [
  { name: 'BCA Finance', type: 'Terdaftar & Diawasi OJK' },
  { name: 'Mandiri Utama Finance', type: 'Rekanan BUMN Terdaftar OJK' },
  { name: 'Adira Finance', type: 'Mitra Pembiayaan Nasional' },
  { name: 'BSI OTO', type: 'Pembiayaan Syariah OJK' },
  { name: 'Balai Lelang Resmi Nasional', type: 'Akreditasi Lelang Indonesia' },
  { name: 'CIMB Niaga Auto Finance', type: 'Perbankan Terdaftar OJK' },
];

export const PartnerTickerBar: React.FC = () => {
  return (
    <aside aria-label="Mitra Pembiayaan dan Tata Kelola Resmi" className="bg-forest text-white border-y border-hairline overflow-hidden select-none">
      {/* Formal Marker Label */}
      <div className="bg-forest-dark border-b border-white/10 py-1.5 px-4 text-center">
        <p className="font-mono text-[10px] text-sage-light font-bold tracking-widest uppercase flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-3 w-3 text-emerald-400" />
          <span>JARINGAN PEMBIAYAAN & PENJAMINAN MUTU RESMI TERDAFTAR OTORITAS JASA KEUANGAN (OJK)</span>
        </p>
      </div>

      {/* Running Ticker 60fps Nir-Jeda */}
      <div className="py-3 ticker-gpu">
        <div className="flex w-max animate-ticker">
          <div className="flex items-center space-x-10 px-6">
            {PARTNERS_LIST.map((p, idx) => (
              <div key={idx} className="flex items-center space-x-2.5">
                <Landmark className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="font-heading text-xs font-bold tracking-wider uppercase whitespace-nowrap text-white">
                  {p.name}
                </span>
                <span className="text-[10px] font-mono text-sage-light/80">({p.type})</span>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-10 px-6" aria-hidden="true">
            {PARTNERS_LIST.map((p, idx) => (
              <div key={`dup-${idx}`} className="flex items-center space-x-2.5">
                <Landmark className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="font-heading text-xs font-bold tracking-wider uppercase whitespace-nowrap text-white">
                  {p.name}
                </span>
                <span className="text-[10px] font-mono text-sage-light/80">({p.type})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
