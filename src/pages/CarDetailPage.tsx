import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { CarNotFoundState } from '../components/detail/CarNotFoundState';
import { pageContainerVariants, pageItemVariants } from '../utils/motionVariants';
import { INITIAL_CARS } from '../data/mockCars';
import { CAR_SPECS_MAP, DEFAULT_TECHNICAL_SPECS, DEFAULT_LEGALITY_SHEET } from '../data/technicalSpecsData';

export const CarDetailPage: React.FC = () => {
  const { cars, selectedCarId, setSelectedCarId } = useShowroomStore();
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
    return <CarNotFoundState />;
  }

  const safeImages = Array.isArray(car.images) && car.images.length > 0 ? car.images : INITIAL_CARS[0].images;
  const safeBreakdown = car.inspectionBreakdown || INITIAL_CARS[0].inspectionBreakdown;
  const carSpecs = car.technicalSpecs || CAR_SPECS_MAP[car.id]?.specs || DEFAULT_TECHNICAL_SPECS;
  const carLegality = car.legalitySheet || CAR_SPECS_MAP[car.id]?.legality || DEFAULT_LEGALITY_SHEET;

  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      style={{ position: 'relative' }}
      className="relative bg-alabaster py-6 sm:py-10 pb-32 md:pb-16 select-none"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <motion.div variants={pageItemVariants}>
          <DetailHeaderDossier car={car} />
        </motion.div>

        {/* Dual-Pane Asymmetric Cockpit Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Visuals, Fold-1 Price, Segmented Controller & Dynamic Tab Cluster */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <motion.div variants={pageItemVariants}>
              <DetailGalleryViewer images={safeImages} title={car.title} status={car.status || 'Tersedia'} />
            </motion.div>

            <motion.div variants={pageItemVariants}>
              <FoldOnePricingStrip car={car} />
            </motion.div>

            <CockpitSegmentedNav activeTab={activeCockpitTab} onChangeTab={setActiveCockpitTab} />

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

      <MobileBottomConversionBar car={car} />

      <InspectionBottomSheetDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        carTitle={car.title}
        breakdown={safeBreakdown}
      />
    </motion.div>
  );
};
