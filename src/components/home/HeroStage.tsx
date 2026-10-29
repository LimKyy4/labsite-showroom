import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { HeroCarCarousel } from './HeroCarCarousel';
import { FloatingQuickSearch } from './FloatingQuickSearch';
import { useShowroomStore } from '../../store/useShowroomStore';

export const HeroStage: React.FC = () => {
  const { cars, setSelectedCarId, setActiveTab } = useShowroomStore();
  const [slideIndex, setSlideIndex] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 36]);

  const heroCars = cars.filter((c) => c.isFeatured).slice(0, 3);
  const activeCar = heroCars[slideIndex] || cars[0];

  const handleSelectCar = (id: string) => {
    setSelectedCarId(id);
    setActiveTab('detail');
  };

  const formattedPrice = activeCar
    ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(activeCar.price)
    : 'Rp 478.000.000';

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative' }}
      className="relative w-full bg-canvas border-b border-hairline pt-4 sm:pt-6 pb-24 sm:pb-20 overflow-hidden"
    >
      <motion.div style={{ scale: stageScale, y: stageY }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Kolom Kiri: Tipografi Editorial & Telemetri Bogor */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sage-light text-forest border border-sage-border font-mono text-xs font-semibold uppercase tracking-wider rounded-full">
                <span className="h-2 w-2 bg-forest rounded-full animate-pulse" />
                18 UNIT READY DI BOGOR
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted">
                <MapPin className="h-3 w-3 text-forest" /> Pajajaran Timur
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal leading-[1.12]">
                STANDAR TINGGI MOBIL SEKEN <span className="text-forest">WILAYAH BOGOR.</span>
              </h1>
              <p className="text-sm sm:text-base text-muted font-body leading-relaxed">
                Platform kurasi showroom independen. Setiap unit diuji 160 titik, tervalidasi Samsat Polda Jabar, dan bergaransi resmi 1 tahun.
              </p>
            </div>

            {/* Kinetic Typography Reveal untuk Mobil Aktif */}
            <div className="p-4 bg-alabaster border border-hairline space-y-2">
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">
                Unit Sorotan Hari Ini:
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCar?.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <p className="font-heading text-lg sm:text-xl font-bold text-charcoal truncate">
                    {activeCar?.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-mono text-base font-bold text-forest">
                      {formattedPrice}
                    </span>
                    <span className="text-xs font-mono text-muted">
                      • {activeCar?.mileage?.toLocaleString('id-ID')} KM • {activeCar?.transmission}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 3 Butir Validasi Lokal */}
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-hairline">
              <div className="flex items-center gap-1.5 text-xs text-charcoal font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-forest shrink-0" />
                <span className="truncate">Bebas Banjir Bogor</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-charcoal font-medium">
                <CheckCircle2 className="h-3.5 w-3.5 text-forest shrink-0" />
                <span className="truncate">Odometer Asli</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-charcoal font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-forest shrink-0" />
                <span className="truncate">Garansi 1 Tahun</span>
              </div>
            </div>

            {/* Tombol Aksi Utama */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('inventory')}
                className="px-5 py-3 bg-forest text-white font-mono text-xs font-bold hover:bg-forest-light border border-forest rounded-full transition-all flex items-center gap-2 shadow-sm hover:scale-102"
              >
                <span>Jelajahi 18 Unit Siap Pakai</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleSelectCar(activeCar.id)}
                className="px-4 py-3 bg-canvas text-charcoal font-mono text-xs font-bold border border-hairline rounded-full hover:border-forest transition-colors"
              >
                Detail Unit Ini
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Panggung Showcase Sinematik */}
          <div className="lg:col-span-7">
            <HeroCarCarousel
              cars={heroCars}
              currentIndex={slideIndex}
              onIndexChange={setSlideIndex}
              onCarClick={handleSelectCar}
            />
          </div>
        </div>

        {/* Floating Quick Search Dock di batas bawah banner */}
        <div className="mt-8 lg:mt-12">
          <FloatingQuickSearch />
        </div>
      </motion.div>
    </section>
  );
};
