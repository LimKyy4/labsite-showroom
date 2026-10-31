import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BudgetSliderBarProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const BudgetSliderBar: React.FC<BudgetSliderBarProps> = ({
  value,
  onChange,
  min = 100000000,
  max = 800000000,
  step = 20000000,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const formatJuta = (num: number) => `Rp ${(num / 1000000).toFixed(0)} Juta`;

  return (
    <div
      className="space-y-1.5 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center text-xs">
        <span className="font-mono text-[10px] text-muted uppercase tracking-wider font-bold">
          Batas Pagu Anggaran
        </span>
        <span className="font-mono font-bold text-forest bg-sage-light px-2.5 py-0.5 border border-sage-border rounded text-xs shadow-sm">
          Maks: {formatJuta(value)}
        </span>
      </div>

      {/* Tactile Track & Thumb */}
      <div className="relative py-2 flex items-center">
        <div className="w-full h-2 bg-hairline rounded-full overflow-hidden">
          <div
            className="h-full bg-forest transition-all duration-75"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Floating Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              style={{ left: `${percentage}%` }}
              className="absolute -top-7 -translate-x-1/2 pointer-events-none z-20"
            >
              <div className="px-2 py-0.5 bg-forest text-white font-mono text-[10px] font-bold rounded shadow-md whitespace-nowrap">
                {formatJuta(value)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          aria-label="Filter Pagu Anggaran"
        />

        {/* 18px Taktil Thumb */}
        <div
          className="absolute h-[18px] w-[18px] bg-white border-2 border-forest rounded-full shadow-md pointer-events-none transition-all duration-75 -translate-x-1/2 flex items-center justify-center"
          style={{ left: `${percentage}%` }}
        >
          <div className="h-1.5 w-1.5 rounded-full bg-forest" />
        </div>
      </div>

      <div className="flex justify-between text-[10px] font-mono text-muted">
        <span>Rp 100 Jt</span>
        <span>Rp 450 Jt</span>
        <span>Rp 800 Jt</span>
      </div>
    </div>
  );
};
