import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useShowroomStore } from '../store/useShowroomStore';
import { DetailHeaderDossier } from '../components/detail/DetailHeaderDossier';
import { DetailGalleryViewer } from '../components/detail/DetailGalleryViewer';
import { FoldOnePricingStrip } from '../components/detail/FoldOnePricingStrip';
import { CockpitSegmentedNav, CockpitTabType } from '../components/detail/CockpitSegmentedNav';
import { TouchSnapTelemetryRail } from '../components/detail/TouchSnapTelemetryRail';
import { AppleInsetGroupedSpecs } from '../components/detail/AppleInsetGroupedSpecs';
import { SamsatDossierSection } from '../components/detail/SamsatDossierSection';
import { CertificateSummaryCard } from '../components/detail/CertificateSummaryCard';
import { InspectionBottomSheetDrawer } from '../components/detail/InspectionBottomSheetDrawer';
import { StickyPricingSidebar } from '../components/detail/StickyPricingSidebar';
import { MobileBottomConversionBar } from '../components/detail/MobileBottomConversionBar';
import { INITIAL_CARS } from '../data/mockCars';
import { CAR_SPECS_MAP, DEFAULT_TECHNICAL_SPECS, DEFAULT_LEGALITY_SHEET } from '../data/technicalSpecsData';

export const CarDetailPage: React.FC = () => {
  const { cars, selectedCarId, setSelectedCarId, setActiveTab } = useShowroomStore();
  const [activeCockpitTab, setActiveCockpitTab] = useState<CockpitTabType>('telemetry');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
        <div className="border border-hairline bg-canvas p-8 max-w-md w-full text-center space-y-4 shadow-sm">
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
    <div className="bg-alabaster py-6 sm:py-10 pb-32 md:pb-16 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation Breadcrumb & Unit Identification Header */}
        <DetailHeaderDossier car={car} />

        {/* Dual-Pane Asymmetric Cockpit Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Visuals, Fold-1 Price, Segmented Controller & Dynamic Tab Cluster */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <DetailGalleryViewer images={safeImages} title={car.title} status={car.status || 'Tersedia'} />

            {/* Fold-1 Pricing Anchor Strip (Visible directly under gallery on Mobile & Tablet) */}
            <FoldOnePricingStrip car={car} />

            {/* Sticky Segmented Cockpit Controller */}
            <CockpitSegmentedNav activeTab={activeCockpitTab} onChangeTab={setActiveCockpitTab} />

            {/* Dynamic Swapping Cluster with Horizontal Slide & Crossfade */}
            <AnimatePresence mode="wait">
              {activeCockpitTab === 'telemetry' && (
                <motion.div
                  key="telemetry"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <TouchSnapTelemetryRail car={car} />
                </motion.div>
              )}

              {activeCockpitTab === 'specs' && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <AppleInsetGroupedSpecs specs={carSpecs} />
                </motion.div>
              )}

              {activeCockpitTab === 'legality' && (
                <motion.div
                  key="legality"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <SamsatDossierSection car={car} legality={carLegality} />
                </motion.div>
              )}

              {activeCockpitTab === 'inspection' && (
                <motion.div
                  key="inspection"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <CertificateSummaryCard
                    onOpenDrawer={() => setIsDrawerOpen(true)}
                    carTitle={car.title}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Independent Sticky Pricing Sidebar (Desktop) */}
          <div className="lg:col-span-5 hidden lg:block">
            <StickyPricingSidebar car={car} />
          </div>
        </div>
      </div>

      {/* Mobile Smart Auto-Hide Bottom Action Dock */}
      <MobileBottomConversionBar car={car} />

      {/* Native Bottom Sheet Drawer for 160-Point Detailed Report */}
      <InspectionBottomSheetDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        carTitle={car.title}
        breakdown={safeBreakdown}
      />
    </div>
  );
};
