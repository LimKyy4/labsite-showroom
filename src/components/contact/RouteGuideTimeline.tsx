import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';
import { ROUTE_STEPS } from '../../data/routeStepsData';

export const RouteGuideTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const current = ROUTE_STEPS[activeStep];

  const openNavigation = (app: 'google' | 'waze') => {
    const lat = -6.6012;
    const lng = 106.8048;
    const url = app === 'google'
      ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
      : `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
    window.open(url, '_blank');
  };

  return (
    <section aria-label="Panduan Rute Jalan Menuju Showroom" className="bg-canvas border-b border-hairline pt-16 lg:pt-20 pb-24 sm:pb-28 lg:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
              PANDUAN AKSES KENDARAAN (5 MENIT DARI TOL)
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
              Rute Menuju Showroom labsite.id Bogor
            </h2>
            <p className="font-body text-sm text-muted">
              Pilih langkah rute di bawah ini untuk melihat patokan marka jalan dan estimasi jarak akumulatif.
            </p>
          </div>
          <div className="font-mono text-xs text-forest bg-sage-light px-3 py-1.5 border border-sage-border font-bold shrink-0">
            Jarak Saat Ini: {current.distance}
          </div>
        </div>

        {/* Animated Horizontal Track Progress */}
        <div className="relative w-full h-1.5 bg-hairline">
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-forest"
            initial={{ width: '12%' }}
            animate={{ width: `${current.progressPercent}%` }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          />
        </div>

        {/* 4 Interactive Step Controllers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROUTE_STEPS.map((st, idx) => {
            const Icon = st.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={st.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`relative text-left p-5 border transition-all duration-150 ${
                  isActive
                    ? 'border-forest bg-forest text-white shadow-sm'
                    : 'border-hairline bg-white hover:border-muted text-charcoal hover:bg-alabaster'
                }`}
              >
                <div className={`flex items-center justify-between pb-3 border-b ${
                  isActive ? 'border-white/20' : 'border-hairline'
                }`}>
                  <span className={`font-mono text-xs font-bold tracking-wider ${
                    isActive ? 'text-sage-light' : 'text-forest'
                  }`}>
                    LANGKAH {st.num}
                  </span>
                  <div className={`flex items-center gap-1.5 ${
                    isActive ? 'text-white' : 'text-muted'
                  }`}>
                    <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-sage-light' : 'text-forest'}`} />
                    <span className="font-mono text-[11px] font-semibold">{st.distance}</span>
                  </div>
                </div>
                <h3 className={`font-heading text-sm font-bold mt-3 leading-snug ${
                  isActive ? 'text-white' : 'text-charcoal'
                }`}>
                  {st.title}
                </h3>
                <p className={`font-body text-xs mt-1.5 line-clamp-1 ${
                  isActive ? 'text-sage-light/85' : 'text-muted'
                }`}>
                  {st.landmark}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Landmark Card with Crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="border border-hairline bg-alabaster p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm"
          >
            <div className="space-y-2.5 max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-forest bg-sage-light px-2.5 py-1 border border-sage-border font-bold">
                  PATOKAN UTAMA: {current.landmark}
                </span>
                <span className="font-mono text-[11px] text-muted border border-hairline bg-white px-2 py-0.5 font-semibold">
                  Kumulatif: {current.distance}
                </span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-charcoal">
                {current.title}
              </h3>
              <p className="font-body text-sm text-muted leading-relaxed">
                {current.desc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
              <Button variant="primary" size="md" onClick={() => openNavigation('google')}>
                <span>Buka Google Maps</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
              <Button variant="outline" size="md" onClick={() => openNavigation('waze')}>
                <span>Navigasi Waze</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
