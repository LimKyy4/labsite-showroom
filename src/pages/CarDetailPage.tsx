import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useShowroomStore } from '../store/useShowroomStore';
import { AlertCircle } from 'lucide-react';
import { DetailHeaderDossier } from '../components/detail/DetailHeaderDossier';
import { DetailGalleryViewer } from '../components/detail/DetailGalleryViewer';
import { AutomotiveTelemetryHUD } from '../components/detail/AutomotiveTelemetryHUD';
import { TechnicalSpecsBento } from '../components/detail/TechnicalSpecsBento';
import { SamsatLegalityPanel } from '../components/detail/SamsatLegalityPanel';
import { InspectionReportAccordion } from '../components/detail/InspectionReportAccordion';
import { StickyPricingSidebar } from '../components/detail/StickyPricingSidebar';
import { MobileBottomConversionBar } from '../components/detail/MobileBottomConversionBar';
import { INITIAL_CARS } from '../data/mockCars';
import { CAR_SPECS_MAP, DEFAULT_TECHNICAL_SPECS, DEFAULT_LEGALITY_SHEET } from '../data/technicalSpecsData';

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
          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className="w-full py-2.5 px-4 bg-forest text-white font-mono text-xs font-bold"
          >
            Kembali ke Katalog Unit
          </button>
        </div>
      </div>
    );
  }

  const safeImages = Array.isArray(car.images) && car.images.length > 0 ? car.images : INITIAL_CARS[0].images;
  const safeBreakdown = car.inspectionBreakdown || INITIAL_CARS[0].inspectionBreakdown;
  const carSpecs = car.technicalSpecs || CAR_SPECS_MAP[car.id]?.specs || DEFAULT_TECHNICAL_SPECS;
  const carLegality = car.legalitySheet || CAR_SPECS_MAP[car.id]?.legality || DEFAULT_LEGALITY_SHEET;

  return (
    <div className="bg-alabaster py-8 sm:py-12 pb-24 md:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Dossier & Breadcrumb Modern */}
        <DetailHeaderDossier car={car} />

        {/* Dual-Pane Asymmetric Cockpit Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Visuals, Telemetry HUD, Deep Specs, Legality & Inspection */}
          <div className="lg:col-span-7 space-y-6">
            <DetailGalleryViewer images={safeImages} title={car.title} status={car.status || 'Tersedia'} />
            
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <AutomotiveTelemetryHUD car={car} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <TechnicalSpecsBento specs={carSpecs} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <SamsatLegalityPanel car={car} legality={carLegality} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <InspectionReportAccordion breakdown={safeBreakdown} carTitle={car.title} />
            </motion.div>
          </div>

          {/* Right Column: Independent Sticky Pricing & Credit Simulator */}
          <div className="lg:col-span-5">
            <StickyPricingSidebar car={car} />
          </div>
        </div>
      </div>

      {/* Mobile Safe-Area Floating Action Bar */}
      <MobileBottomConversionBar car={car} />
    </div>
  );
};
