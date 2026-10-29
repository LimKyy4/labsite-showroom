import React from 'react';
import { CarFront, Radio, CalendarClock, ArrowUpRight } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';

export const FooterBrandAnchor: React.FC = () => {
  const { setActiveTab, setBookingModalOpen } = useShowroomStore();

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center bg-forest text-white rounded-lg shadow-sm">
          <CarFront className="h-5 w-5" />
        </div>
        <div>
          <span className="font-heading text-xl font-bold tracking-tight text-charcoal block leading-none">
            SHOWROOM<span className="text-forest">.BOGOR</span>
          </span>
          <span className="text-[10px] tracking-wider font-mono text-muted uppercase mt-0.5 block">
            by labsite.id
          </span>
        </div>
      </div>

      {/* Live Telemetry Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sage-light border border-sage-border text-forest font-mono text-xs font-semibold">
        <Radio className="h-3 w-3 animate-pulse text-forest" />
        <span>SHOWROOM AKTIF BOGOR</span>
      </div>

      <p className="text-xs sm:text-sm text-muted leading-relaxed font-body max-w-sm">
        Platform kurasi independen unit mobil seken bergaransi resmi 1 tahun wilayah Bogor. Bebas banjir, rangka presisi, legalitas Samsat terverifikasi 100%.
      </p>

      {/* Tactile Button */}
      <div>
        <button
          type="button"
          onClick={() => {
            setBookingModalOpen(true);
            setActiveTab('contact');
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-canvas hover:bg-forest text-forest hover:text-white border-2 border-forest font-mono text-xs font-bold transition-all duration-200 shadow-sm"
        >
          <CalendarClock className="h-4 w-4" />
          <span>Jadwalkan Kunjungan Fisik</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
