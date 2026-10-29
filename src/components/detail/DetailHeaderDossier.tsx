import React from 'react';
import { ArrowLeft, ShieldCheck, Wrench, UserCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { CarUnit } from '../../types/showroom';
import { useShowroomStore } from '../../store/useShowroomStore';

interface DetailHeaderDossierProps {
  car: CarUnit;
}

export const DetailHeaderDossier: React.FC<DetailHeaderDossierProps> = ({ car }) => {
  const { setActiveTab } = useShowroomStore();

  const isAvailable = car.status === 'Tersedia';
  const statusLabel = isAvailable
    ? `STOK TERSEDIA • ${car.plateNumber || 'PLAT F BOGOR'}`
    : `${car.status.toUpperCase()} • ${car.plateNumber || 'PLAT F BOGOR'}`;

  return (
    <div className="space-y-4 select-none">
      {/* Modern Breadcrumb & Minimalist Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setActiveTab('inventory')}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-canvas border border-hairline hover:border-forest text-xs font-mono font-semibold text-charcoal hover:text-forest transition-colors shadow-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-forest" />
          <span>Kembali ke Katalog</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sage-light text-forest border border-sage-border font-mono text-[11px] font-bold">
            <span className="h-2 w-2 rounded-full bg-forest animate-pulse" />
            <span>{statusLabel}</span>
          </span>
          <div className="hidden sm:flex items-center gap-1 text-xs font-mono text-muted">
            <span className="hover:text-forest cursor-pointer" onClick={() => setActiveTab('inventory')}>
              Katalog
            </span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-charcoal font-semibold truncate max-w-xs">{car.title}</span>
          </div>
        </div>
      </div>

      {/* Headline Dossier Unit */}
      <div className="border border-hairline bg-canvas p-6 sm:p-7 space-y-4 shadow-sm">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="bg-forest text-white px-2.5 py-0.5 font-bold uppercase tracking-wider">
              {car.brand || 'Toyota'}
            </span>
            <span className="px-2 py-0.5 bg-alabaster border border-hairline text-charcoal font-semibold">
              Tahun {car.year}
            </span>
            <span className="px-2 py-0.5 bg-alabaster border border-hairline text-charcoal font-semibold">
              {car.transmission}
            </span>
            <span className="text-forest flex items-center gap-1 font-semibold ml-auto">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Sertifikasi 160 Titik</span>
            </span>
          </div>

          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal leading-tight">
            {car.title}
          </h1>
        </div>

        {/* Micro-Badges: Kepemilikan & Servis */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-hairline text-xs font-body">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-alabaster border border-hairline text-charcoal">
            <UserCheck className="h-3.5 w-3.5 text-forest shrink-0" />
            <span>{car.ownership || 'Tangan Pertama dari Baru'}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-alabaster border border-hairline text-charcoal">
            <Wrench className="h-3.5 w-3.5 text-forest shrink-0" />
            <span>{car.serviceHistory || 'Service Rutin Bengkel Resmi'}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-alabaster border border-hairline text-charcoal">
            <ShieldCheck className="h-3.5 w-3.5 text-forest shrink-0" />
            <span>Lolos Uji Genangan Air Bogor</span>
          </div>
        </div>
      </div>
    </div>
  );
};
