import React from 'react';
import { motion } from 'framer-motion';

interface SegmentedPillControlProps {
  label: string;
  options: string[];
  selected: string;
  onChange: (val: string) => void;
  layoutGroupId: string;
}

export const SegmentedPillControl: React.FC<SegmentedPillControlProps> = ({
  label,
  options,
  selected,
  onChange,
  layoutGroupId,
}) => {
  return (
    <div className="space-y-1.5">
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted font-bold block">
        {label}
      </span>
      <div className="flex items-center gap-1 p-1 bg-alabaster rounded-lg border border-hairline">
        {options.map((opt) => {
          const isActive = selected === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`relative px-3 py-1.5 text-xs font-mono font-semibold rounded-md transition-colors duration-150 whitespace-nowrap z-10 ${
                isActive ? 'text-white' : 'text-charcoal hover:text-forest'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId={layoutGroupId}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  className="absolute inset-0 bg-forest rounded-md -z-10 shadow-sm"
                />
              )}
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};
