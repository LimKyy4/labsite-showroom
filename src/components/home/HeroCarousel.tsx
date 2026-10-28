import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, PhoneCall, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { HERO_SLIDES } from '../../data/heroData';
import { useShowroomStore } from '../../store/useShowroomStore';

export const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { cars, setActiveTab } = useShowroomStore();

  const availableCount = cars.filter((c) => c.status === 'Tersedia').length;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  const slide = HERO_SLIDES[current];

  return (
    <section
      aria-label="Sorotan Utama Showroom"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative bg-canvas border-b border-hairline pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Kinetic Typography Column */}
          <div className="lg:col-span-8 min-h-[380px] sm:min-h-[340px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="space-y-5"
              >
                {/* Eyebrow & Live Stock */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 border border-sage-border bg-sage-light px-3 py-1">
                    <ShieldCheck className="h-4 w-4 text-forest" />
                    <span className="font-mono text-xs font-bold text-forest tracking-wider uppercase">
                      {slide.tagline}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 border border-hairline bg-alabaster px-2.5 py-1 font-mono text-xs font-semibold text-charcoal">
                    <span className="h-2 w-2 rounded-full bg-forest animate-pulse" />
                    <span>{availableCount} UNIT READY DI BOGOR</span>
                  </div>
                </div>

                {/* Main Kinetic Headline */}
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-charcoal leading-[1.15]">
                  {slide.headline}
                </h1>

                {/* Sub Description */}
                <p className="font-body text-sm sm:text-base text-muted leading-relaxed max-w-2xl">
                  {slide.description}
                </p>

                {/* Micro Feature Checkmarks */}
                <div className="flex flex-wrap gap-y-2 gap-x-4 pt-1 font-body">
                  {slide.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-charcoal">
                      <CheckCircle2 className="h-4 w-4 text-forest shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-6">
              <Button variant="primary" size="lg" onClick={() => setActiveTab('inventory')}>
                <span>Eksplorasi Katalog Lengkap</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  window.open(
                    'https://wa.me/6281234567890?text=Halo%20labsite.id%20Showroom,%20saya%20ingin%20konsultasi%20pembelian%20mobil%20bekas.',
                    '_blank'
                  )
                }
              >
                <PhoneCall className="h-4 w-4 text-forest" />
                <span>Konsultasi Penjualan</span>
              </Button>
            </div>
          </div>

          {/* Minimalist Controls & Metric Panel */}
          <div className="lg:col-span-4 flex flex-col justify-between border border-hairline bg-alabaster p-6 sm:p-7 space-y-6">
            <div className="space-y-4">
              <span className="font-mono text-[11px] tracking-wider uppercase text-muted block font-semibold">
                STANDAR PENGUJIAN BOGOR
              </span>
              <div className="border-b border-hairline pb-3">
                <span className="font-heading text-3xl font-extrabold text-forest">160+ Poin</span>
                <p className="font-body text-xs text-muted mt-0.5">Uji sasis, kompresi mesin, & deteksi lumpur banjir</p>
              </div>
              <div className="border-b border-hairline pb-3">
                <span className="font-heading text-3xl font-extrabold text-forest">365 Hari</span>
                <p className="font-body text-xs text-muted mt-0.5">Jaminan garansi mekanikal mesin & modul transmisi</p>
              </div>
              <div>
                <span className="font-heading text-3xl font-extrabold text-forest">Samsat Jabar</span>
                <p className="font-body text-xs text-muted mt-0.5">Verifikasi cek fisik BPKB & STNK resmi Kota Bogor</p>
              </div>
            </div>

            {/* Slide Navigation Numbers & Controls */}
            <div className="pt-4 border-t border-hairline flex items-center justify-between">
              <div className="flex items-center space-x-2 font-mono text-xs text-charcoal font-bold">
                <span>0{current + 1}</span>
                <span className="text-muted">/</span>
                <span className="text-muted">0{HERO_SLIDES.length}</span>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="flex h-9 w-9 items-center justify-center border border-hairline bg-canvas text-charcoal hover:bg-forest hover:text-white transition-colors"
                  aria-label="Slide sebelumnya"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="flex h-9 w-9 items-center justify-center border border-hairline bg-canvas text-charcoal hover:bg-forest hover:text-white transition-colors"
                  aria-label="Slide berikutnya"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
