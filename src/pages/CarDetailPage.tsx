import React, { useEffect } from 'react';
import { useShowroomStore } from '../store/useShowroomStore';
import { ArrowLeft, ChevronRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { DetailGalleryCarousel } from '../components/detail/DetailGalleryCarousel';
import { QuickSpecsGrid } from '../components/detail/QuickSpecsGrid';
import { TechnicalSpecsBento } from '../components/detail/TechnicalSpecsBento';
import { DocumentLegalityPanel } from '../components/detail/DocumentLegalityPanel';
import { InspectionReportAccordion } from '../components/detail/InspectionReportAccordion';
import { CreditSimulator } from '../components/detail/CreditSimulator';
import { StickyDetailCTA } from '../components/detail/StickyDetailCTA';
import { MobileBottomConversionBar } from '../components/detail/MobileBottomConversionBar';
import { Button } from '../components/ui/button';
import { INITIAL_CARS } from '../data/mockCars';

export const CarDetailPage: React.FC = () => {
  const { cars, selectedCarId, setSelectedCarId, setActiveTab } = useShowroomStore();

  const car =
    (selectedCarId ? cars.find((c) => c.id === selectedCarId) : null) ||
    cars[0] ||
    INITIAL_CARS[0];

  useEffect(() => {
    if (car && (!selectedCarId || selectedCarId !== car.id)) {
      setSelectedCarId(car.id);
    }
  }, [car, selectedCarId, setSelectedCarId]);

  if (!car) {
    return (
      <div className="bg-alabaster min-h-[500px] flex items-center justify-center p-6">
        <div className="border border-hairline bg-canvas p-8 max-w-md w-full text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center bg-sage-light text-forest border border-sage-border">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h2 className="font-heading text-xl font-bold text-charcoal">Unit Mobil Tidak Ditemukan</h2>
          <Button variant="primary" size="md" fullWidth onClick={() => setActiveTab('inventory')}>
            Kembali ke Katalog Unit
          </Button>
        </div>
      </div>
    );
  }

  const safeImages = Array.isArray(car.images) && car.images.length > 0 ? car.images : INITIAL_CARS[0].images;
  const safeBreakdown = car.inspectionBreakdown || INITIAL_CARS[0].inspectionBreakdown;
  const safePrice = car.price > 0 ? car.price : 300000000;

  return (
    <div className="bg-alabaster py-8 lg:py-12 pb-24 md:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-forest hover:text-charcoal transition-colors border border-hairline bg-canvas px-3 py-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Katalog</span>
          </button>
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-muted">
            <span className="hover:text-forest cursor-pointer" onClick={() => setActiveTab('inventory')}>Katalog</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-charcoal font-semibold truncate max-w-xs">{car.title}</span>
          </div>
        </div>

        {/* Header Unit Title Banner */}
        <div className="border border-hairline bg-canvas p-6 sm:p-7 space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="bg-forest text-white px-2 py-0.5 font-bold uppercase">{car.brand || 'Toyota'}</span>
            <span className="text-muted">{car.plateNumber || 'Plat F Kota Bogor'}</span>
            <span className="text-muted">•</span>
            <span className="text-forest flex items-center gap-1 font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              Lolos Uji Genangan Air Bogor
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
            {car.title}
          </h1>
          <p className="font-body text-xs sm:text-sm text-muted">
            Kepemilikan {car.ownership || 'Tangan Pertama'} • {car.serviceHistory || 'Service Rutin Bengkel Resmi'} • Cek Fisik Samsat Polda Jabar Lengkap.
          </p>
        </div>

        {/* Dual-Pane Asymmetric Sticky Layout (Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column: Visuals, Quick Specs, Deep Specs, Legality & Inspection */}
          <div className="lg:col-span-7 space-y-6">
            <DetailGalleryCarousel images={safeImages} title={car.title} status={car.status || 'Tersedia'} />
            <QuickSpecsGrid car={car} />
            <TechnicalSpecsBento specs={car.technicalSpecs} />
            <DocumentLegalityPanel car={car} legality={car.legalitySheet} />
            <InspectionReportAccordion breakdown={safeBreakdown} />
          </div>

          {/* Right Column (Scroll-Locked Sticky Console): Conversion & Financials */}
          <div className="lg:col-span-5 relative">
            <aside className="lg:sticky lg:top-24 space-y-6">
              <StickyDetailCTA car={car} />
              <CreditSimulator carPrice={safePrice} />
            </aside>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Conversion Sticky Bar */}
      <MobileBottomConversionBar car={car} />
    </div>
  );
};
