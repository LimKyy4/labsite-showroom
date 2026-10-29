import React from 'react';
import { SpatialBlueprintCanvas } from './SpatialBlueprintCanvas';
import { FacilityOperationsCard } from './FacilityOperationsCard';
import { Compass } from 'lucide-react';

export const InteractiveMapFacade: React.FC = () => {
  return (
    <section
      aria-label="Peta Interaktif CAD & Fasilitas Showroom"
      className="bg-alabaster border-b border-hairline py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white border border-hairline text-forest font-mono text-xs font-bold uppercase tracking-wider">
              <Compass className="h-3.5 w-3.5" />
              <span>ZONA 02 • SPATIAL COMMAND & FACILITY DOCK</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
              AKSES ARTERIAL STRATEGIS & FASILITAS INSPEKSI.
            </h2>
            <p className="font-body text-sm text-muted max-w-2xl">
              Jl. Raya Pajajaran No. 88 Baranangsiang, Bogor Timur. Terkoneksi 5 menit langsung dari Exit Gerbang Tol Jagorawi dengan fasilitas car-lift mandiri dan ruang negosiasi VIP.
            </p>
          </div>
        </div>

        {/* 12-Column Blueprint & Operations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7">
            <SpatialBlueprintCanvas />
          </div>
          <div className="lg:col-span-5 flex flex-col">
            <FacilityOperationsCard />
          </div>
        </div>
      </div>
    </section>
  );
};
