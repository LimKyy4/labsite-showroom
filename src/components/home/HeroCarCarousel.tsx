import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, Gauge } from 'lucide-react';
import { HeroTelemetryOverlay } from './HeroTelemetryOverlay';
import { HeroHotspotPin } from './HeroHotspotPin';
import { HeroMobileTelemetryRail } from './HeroMobileTelemetryRail';
import { CarUnit } from '../../types/showroom';
import { useTiltEffect } from '../../hooks/useTiltEffect';

interface HeroCarCarouselProps {
  cars: CarUnit[];
  currentIndex: number;
  onIndexChange: (idx: number) => void;
  onCarClick: (carId: string) => void;
}

const STUDIO_ANGLES = [
  { id: 0, label: '01 Tampak Depan' },
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
  const { ref: tiltRef, style: tiltStyle, sheenPos, onMouseMove, onMouseLeave } = useTiltEffect({ maxTilt: 5, scale: 1.01 });
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
    <div className="space-y-2 select-none">
      <div
        ref={tiltRef}
        style={tiltStyle}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onMouseEnter={() => setIsPaused(true)}
        className="relative w-full aspect-[16/9] border border-hairline bg-alabaster overflow-hidden group shadow-sm"
      >
        {/* Isometric Studio Grid Floor (1px Hairline Without Gradients) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 stroke-hairline" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="isometricGrid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 48 M 0 0 L 48 48" fill="none" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#isometricGrid)" />
        </svg>

        {/* Specular Sheen Reflection Layer */}
        <div
          style={{
            left: `${sheenPos.x}%`,
            top: `${sheenPos.y}%`,
            opacity: sheenPos.opacity * 0.025,
            transform: 'translate(-50%, -50%)',
          }}
          className="absolute w-80 h-80 bg-white rounded-full pointer-events-none blur-2xl z-20 transition-opacity duration-150"
        />

        <HeroTelemetryOverlay />

        {/* Main Showcase with Ambient Floating Breathing (Anti-Off-Center Controlled Stage) */}
        <div
          className="relative w-full h-full flex items-center justify-center cursor-pointer overflow-hidden z-10 origin-center"
          onClick={() => onCarClick(activeCar.id)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={`${activeCar.id}-${angleIndex}`}
              src={carImages[angleIndex] || carImages[0]}
              alt={`${activeCar.title} sudut ${angleIndex + 1}`}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1, y: [0, -3.5, 0] }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{
                opacity: { duration: 0.35, ease: 'easeOut' },
                scale: { duration: 0.35, ease: 'easeOut' },
                y: { duration: 4.0, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="w-full h-full object-cover origin-center"
            />
          </AnimatePresence>
        </div>

        {/* Contact Shadow Underneath Wheels */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 w-[72%] h-5 bg-[#19201D]/12 rounded-[100%] blur-[2px] pointer-events-none z-10" />

        {/* Desktop Hotspot Pins (Hidden on Mobile) */}
        {angleIndex === 0 && (
          <div className="hidden sm:block">
            <HeroHotspotPin x="36%" y="54%" label="KAP MESIN" metric="KOMPRESI 98%" detail="Kompresi Mesin 98% • Bebas Residu Banjir" icon={Activity} />
            <HeroHotspotPin x="60%" y="66%" label="SASIS & RANGKA" metric="BUYBACK 100%" detail="Sasis Bebas Benturan • Garansi Buyback 100%" icon={ShieldCheck} />
            <HeroHotspotPin x="24%" y="74%" label="KAKI-KAKI" metric="KETEBALAN 92%" detail="Ketebalan Ban 92% • Suspensi Segar" icon={Gauge} />
          </div>
        )}

        {/* Multi-Angle Studio Switcher */}
        <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 z-30 flex items-center justify-between gap-2 pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-1 bg-white border border-hairline p-1 shadow-sm rounded-lg">
            {STUDIO_ANGLES.map((angle) => (
              <button
                key={angle.id}
                type="button"
                onClick={() => setAngleIndex(angle.id)}
                className={`px-2 sm:px-2.5 py-1 text-[9px] sm:text-[10px] font-mono font-semibold rounded transition-colors active:scale-95 ${
                  angleIndex === angle.id ? 'bg-forest text-white' : 'text-charcoal hover:bg-alabaster'
                }`}
              >
                {angle.label}
              </button>
            ))}
          </div>

          <div className="pointer-events-auto bg-white border border-hairline px-2 sm:px-2.5 py-1 font-mono text-[10px] sm:text-[11px] text-charcoal font-semibold shadow-sm rounded-lg">
            <span className="text-forest font-bold">{angleIndex + 1}</span>/3 Views
          </div>
        </div>
      </div>

      {/* Mobile-Only Horizontal Swipeable Telemetry Rail */}
      <HeroMobileTelemetryRail />
    </div>
  );
};
