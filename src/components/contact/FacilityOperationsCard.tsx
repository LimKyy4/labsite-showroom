import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Wrench, Cpu, ShieldCheck, Car } from 'lucide-react';

interface FacilityPhoto {
  url: string;
  title: string;
  desc: string;
}

const FACILITY_PHOTOS: FacilityPhoto[] = [
  {
    url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80',
    title: 'Fasad Utama & Area Paddock Tamu',
    desc: 'Jl. Raya Pajajaran No. 88 Baranangsiang, area parkir privat 25+ mobil aman 24 jam.',
  },
  {
    url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=80',
    title: 'Executive VIP Negotiation Suite',
    desc: 'Ruang transaksi personal ber-AC dingin, high-speed WiFi, dan koneksi instan leasing OJK.',
  },
  {
    url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=80',
    title: 'Dual Hydraulic Car-Lift Bay',
    desc: 'Fasilitas inspeksi kolong sasis transparan dan terminal scanner diagnosa OBD-2 aktif.',
  },
];

const READINESS_SPECS = [
  { icon: Wrench, title: '2 Unit Hydraulic Lift', detail: 'Inspeksi kolong sasis mandiri & mekanik luar' },
  { icon: Cpu, title: 'OBD-2 Scanner Hub', detail: 'Diagnosa real-time ECU, airbag, & transmisi' },
  { icon: ShieldCheck, title: 'VIP Negotiation Suite', detail: 'Transaksi privat & verifikasi faktur legal' },
  { icon: Car, title: '25+ Dedicated Paddock', detail: 'Area parkir luas aman dengan pantauan CCTV' },
];

export const FacilityOperationsCard: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState(0);

  const prevPhoto = () => setActivePhoto((prev) => (prev - 1 + FACILITY_PHOTOS.length) % FACILITY_PHOTOS.length);
  const nextPhoto = () => setActivePhoto((prev) => (prev + 1) % FACILITY_PHOTOS.length);

  return (
    <div className="border border-hairline bg-canvas p-6 flex flex-col justify-between space-y-5 select-none shadow-sm">
      {/* Header & Numbered Switcher */}
      <div className="flex items-center justify-between pb-3 border-b border-hairline">
        <div className="space-y-0.5">
          <div className="font-mono text-[10px] text-forest font-bold uppercase tracking-wider">
            OPERATIONAL READINESS
          </div>
          <h4 className="font-heading text-sm font-bold text-charcoal">FASILITAS & DOKUMENTASI FISIK</h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-charcoal bg-alabaster px-2 py-0.5 border border-hairline">
            0{activePhoto + 1} / 0{FACILITY_PHOTOS.length}
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={prevPhoto}
              aria-label="Foto sebelumnya"
              className="p-1 border border-hairline bg-alabaster hover:bg-forest hover:text-white transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={nextPhoto}
              aria-label="Foto berikutnya"
              className="p-1 border border-hairline bg-alabaster hover:bg-forest hover:text-white transition-colors"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 16:9 Photo Stage */}
      <div className="space-y-2">
        <div className="relative aspect-[16/9] overflow-hidden border border-hairline bg-charcoal">
          <img
            src={FACILITY_PHOTOS[activePhoto].url}
            alt={FACILITY_PHOTOS[activePhoto].title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-charcoal/90 border border-hairline/20 px-2 py-0.5 text-[9px] font-mono text-emerald-400 font-bold uppercase">
            LIVE FACILITY DOCK
          </div>
        </div>
        <div>
          <div className="font-heading text-xs font-bold text-charcoal">{FACILITY_PHOTOS[activePhoto].title}</div>
          <p className="font-body text-[11px] text-muted leading-tight mt-0.5">{FACILITY_PHOTOS[activePhoto].desc}</p>
        </div>
      </div>

      {/* 4 Readiness Specs Grid */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-hairline">
        {READINESS_SPECS.map((spec, i) => {
          const Icon = spec.icon;
          return (
            <div key={i} className="bg-alabaster border border-hairline p-2.5 space-y-1">
              <div className="flex items-center gap-1.5 text-forest">
                <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="font-heading text-[11px] font-bold text-charcoal truncate">{spec.title}</span>
              </div>
              <p className="font-body text-[10px] text-muted leading-tight">{spec.detail}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
