import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTE_STEPS } from '../../data/routeStepsData';
import { RouteStepDetail } from './RouteStepDetail';
import { Map, Navigation } from 'lucide-react';

export const RouteGuideTabs: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const current = ROUTE_STEPS[activeStep];

  const openNavigation = (app: 'google' | 'waze') => {
    const lat = -6.6022;
    const lng = 106.8122;
    const url =
      app === 'google'
        ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
        : `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
    window.open(url, '_blank');
  };

  return (
    <section aria-label="Panduan Rute Jalan Menuju Showroom" className="bg-canvas border-b border-hairline py-16 sm:py-20 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-alabaster border border-hairline text-forest font-mono text-xs font-bold uppercase tracking-wider">
              <Map className="h-3.5 w-3.5" />
              <span>ZONA 03 • DYNAMIC GPS WAYPOINT & TRACK</span>
            </div>
            <h2 className="font-heading text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-tight text-charcoal">
              NAVIGASI TOL JAGORAWI KE SHOWROOM.
            </h2>
            <p className="font-body text-xs sm:text-sm text-muted">
              Pilih waypoint di bawah untuk meninjau patokan fisik, panduan lajur bebas hambatan, serta profil elevasi jalan.
            </p>
          </div>
          <div className="font-mono text-xs text-forest bg-sage-light px-3 py-1.5 border border-sage-border font-bold shrink-0 flex items-center gap-2 self-start md:self-auto">
            <Navigation className="h-3.5 w-3.5" />
            <span>PROGRESS: {current.progressPercent}%</span>
          </div>
        </div>

        {/* Dynamic Track Line */}
        <div className="relative w-full h-1.5 bg-hairline overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-forest"
            initial={{ width: '12%' }}
            animate={{ width: `${current.progressPercent}%` }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          />
        </div>

        {/* Horizontal Scroll Rail on Mobile/Tablet / 4-Col Grid on Desktop */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 no-scrollbar lg:grid lg:grid-cols-4 lg:gap-4">
          {ROUTE_STEPS.map((st, idx) => {
            const Icon = st.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={st.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`shrink-0 w-[78vw] sm:w-[280px] lg:w-auto snap-center relative text-left p-3.5 sm:p-4 border transition-all duration-150 flex flex-col justify-between min-h-[110px] active:scale-98 ${
                  isActive
                    ? 'border-forest bg-forest text-white shadow-md'
                    : 'border-hairline bg-canvas hover:border-muted text-charcoal hover:bg-alabaster'
                }`}
              >
                <div
                  className={`flex items-center justify-between pb-2 border-b w-full ${
                    isActive ? 'border-white/20' : 'border-hairline'
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] font-bold tracking-wider ${
                      isActive ? 'text-sage-light' : 'text-forest'
                    }`}
                  >
                    WAYPOINT {st.num}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-sage-light' : 'text-forest'}`} />
                    <span
                      className={`font-mono text-[10px] font-semibold ${
                        isActive ? 'text-white' : 'text-charcoal'
                      }`}
                    >
                      {st.distance}
                    </span>
                  </div>
                </div>
                <div className="mt-2 space-y-0.5">
                  <h3
                    className={`font-heading text-xs font-bold leading-tight ${
                      isActive ? 'text-white' : 'text-charcoal'
                    }`}
                  >
                    {st.title}
                  </h3>
                  <p
                    className={`font-body text-[11px] leading-normal ${
                      isActive ? 'text-white/90' : 'text-muted'
                    }`}
                  >
                    {st.landmark}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Physical Landmark Dossier */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <RouteStepDetail step={current} onOpenNavigation={openNavigation} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
