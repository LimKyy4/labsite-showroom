import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface HeroHotspotPinProps {
  x: string;
  y: string;
  label: string;
  metric: string;
  detail: string;
  icon: LucideIcon;
}

export const HeroHotspotPin: React.FC<HeroHotspotPinProps> = ({
  x,
  y,
  label,
  metric,
  detail,
  icon: Icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="absolute z-30"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Dual Concentric Pulsing Radar Beacon */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center h-7 w-7 rounded-full bg-forest text-white border-2 border-white shadow-md focus:outline-none hover:scale-110 active:scale-95 transition-transform"
        aria-label={`Hotspot Telemetri ${label}`}
      >
        <span className="absolute -inset-1.5 rounded-full bg-forest/30 animate-ping [animation-duration:2.5s]" />
        <span className="absolute -inset-3 rounded-full bg-forest/15 animate-ping [animation-duration:3.2s] [animation-delay:0.6s]" />
        <Icon className="h-3.5 w-3.5 relative z-10" />
      </button>

      {/* Floating HUD Telemetry Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 sm:w-64 bg-white border border-hairline p-3 shadow-xl z-40 text-left pointer-events-none rounded-lg"
          >
            <div className="flex items-center justify-between border-b border-hairline pb-1.5 mb-1.5">
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted font-bold">
                {label}
              </span>
              <span className="font-mono text-[10px] text-forest font-bold bg-sage-light px-1.5 py-0.5 border border-sage-border rounded">
                {metric}
              </span>
            </div>
            <p className="font-heading text-xs font-bold text-charcoal leading-snug">
              {detail}
            </p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 bg-white border-r border-b border-hairline rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
