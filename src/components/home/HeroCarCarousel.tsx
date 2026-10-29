import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, Gauge } from 'lucide-react';
import { HeroTelemetryOverlay } from './HeroTelemetryOverlay';
import { HeroHotspotPin } from './HeroHotspotPin';
import { CarUnit } from '../../types/showroom';

interface HeroCarCarouselProps {
  cars: CarUnit[];
  currentIndex: number;
  onIndexChange: (idx: number) => void;
  onCarClick: (carId: string) => void;
}

const STUDIO_ANGLES = [
  { id: 0, label: '01 Depan 3/4' },
  { id: 1, label: '02 Kokpit Interior' },
  { id: 2, label: '03 Ruang Mesin' },
];

export const HeroCarCarousel: React.FC<HeroCarCarouselProps> = ({
  cars,
  currentIndex,
  onCarClick,
}) => {
  const [angleIndex, setAngleIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeCar = cars[currentIndex] || cars[0];

  const carImages = activeCar.images && activeCar.images.length >= 3
    ? activeCar.images
    : [
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
      ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setAngleIndex((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className="relative w-full aspect-[16/10] sm:aspect-[16/9] border border-hairline bg-alabaster overflow-hidden group select-none shadow-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3D Isometric Studio Floor Grid Lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-25 pointer-events-none stroke-hairline"
        viewBox="0 0 800 450"
        fill="none"
      >
        <line x1="0" y1="360" x2="800" y2="360" stroke="#183B2B" strokeWidth="1" strokeDasharray="6 4" opacity="0.3" />
        <ellipse cx="400" cy="370" rx="360" ry="45" stroke="#183B2B" strokeWidth="1" opacity="0.25" />
        <ellipse cx="400" cy="370" rx="280" ry="32" stroke="#183B2B" strokeWidth="1" strokeDasharray="4 4" opacity="0.35" />
        <line x1="400" y1="320" x2="100" y2="450" stroke="#4D7260" strokeWidth="0.8" opacity="0.2" />
        <line x1="400" y1="320" x2="700" y2="450" stroke="#4D7260" strokeWidth="0.8" opacity="0.2" />
      </svg>

      <HeroTelemetryOverlay />

      {/* Main Showcase with Zoom & Crossfade */}
      <div
        className="relative w-full h-full cursor-pointer overflow-hidden"
        onClick={() => onCarClick(activeCar.id)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={`${activeCar.id}-${angleIndex}`}
            src={carImages[angleIndex] || carImages[0]}
            alt={`${activeCar.title} sudut ${angleIndex + 1}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Realistic Contact Shadow on Studio Floor */}
        <div className="absolute bottom-0 inset-x-8 h-10 bg-black/25 blur-md -z-0 pointer-events-none rounded-[100%]" />
      </div>

      {/* Interactive Telemetry Hotspot Pins (Only on Exterior Angle 0) */}
      {angleIndex === 0 && (
        <>
          <HeroHotspotPin
            x="36%"
            y="54%"
            label="KAP MESIN & ECU"
            metric="KOMPRESI 98%"
            detail="Kompresi Mesin 98% • ECU Bebas Residu Banjir • Servis Record Auto2000"
            icon={Activity}
          />
          <HeroHotspotPin
            x="60%"
            y="66%"
            label="SASIS & RANGKA"
            metric="INTEGRITAS 100%"
            detail="Rangka Presisi 100% • Segel Pabrik Utuh • Garansi Buyback"
            icon={ShieldCheck}
          />
          <HeroHotspotPin
            x="24%"
            y="74%"
            label="RODA & REM"
            metric="TAPAK 90%"
            detail="Ketebalan Tapak Ban 90% • Sistem Rem ABS/EBD Optimal"
            icon={Gauge}
          />
        </>
      )}

      {/* Multi-Angle Studio Switcher */}
      <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between gap-2 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1 bg-white/90 backdrop-blur-md border border-hairline p-1 shadow-sm">
          {STUDIO_ANGLES.map((angle) => {
            const isActive = angleIndex === angle.id;
            return (
              <button
                key={angle.id}
                type="button"
                onClick={() => setAngleIndex(angle.id)}
                className={`px-2.5 py-1 text-[10px] font-mono font-semibold transition-colors ${
                  isActive ? 'bg-forest text-white' : 'text-charcoal hover:bg-alabaster'
                }`}
              >
                {angle.label}
              </button>
            );
          })}
        </div>

        <div className="pointer-events-auto bg-white/90 backdrop-blur-md border border-hairline px-2.5 py-1 font-mono text-[11px] text-charcoal font-semibold shadow-sm">
          <span className="text-forest font-bold">{angleIndex + 1}</span> / 3 Studio Views
        </div>
      </div>
    </div>
  );
};
