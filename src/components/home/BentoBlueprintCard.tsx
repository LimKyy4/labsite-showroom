import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { useTiltEffect } from '../../hooks/useTiltEffect';
import { BentoBlueprintVisual } from './BentoBlueprintVisual';

interface BentoBlueprintCardProps {
  badge: string;
  title: string;
  description: string;
  icon: LucideIcon;
  blueprintType?: 'transmission' | 'flood_sensor' | 'samsat_stamp' | 'buyback';
  items?: string[];
  className?: string;
}

const MICRO_TABS = ['Blok Mesin', 'Girboks Matic', 'ECU & Wiring', 'Radiator'];
const TAB_DETAILS = [
  'Garansi silinder blok, poros engkol, dan klep internal mesin.',
  'Perlindungan planetary gear, solenoid matic, dan valve body.',
  'Jaminan bebas korsleting dan modul ECU 100% orisinil pabrik.',
  'Pencegahan overheating dengan radiator core dan waterpump segar.',
];

export const BentoBlueprintCard: React.FC<BentoBlueprintCardProps> = ({
  badge,
  title,
  description,
  icon: Icon,
  blueprintType,
  items,
  className = '',
}) => {
  const { ref, style, sheenPos, onMouseMove, onMouseLeave } = useTiltEffect({ maxTilt: 9, scale: 1.015 });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative bg-canvas border border-hairline p-5 sm:p-6 hover:border-sage transition-all duration-300 overflow-hidden flex flex-col justify-between group select-none ${className}`}
    >
      {/* Specular Sheen Tracker (Solid overlay with blur, per zero-gradient directive) */}
      <div
        style={{
          left: `${sheenPos.x}%`,
          top: `${sheenPos.y}%`,
          opacity: sheenPos.opacity * 0.15,
          transform: 'translate(-50%, -50%)',
        }}
        className="absolute w-48 h-48 bg-white rounded-full pointer-events-none transition-opacity duration-200 blur-xl z-20"
      />

      <BentoBlueprintVisual blueprintType={blueprintType} />

      {/* Card Header & Content */}
      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-wider px-2.5 py-1 bg-sage-light text-forest border border-sage-border font-bold uppercase rounded-full">
            {badge}
          </span>
          <div className="flex h-9 w-9 items-center justify-center bg-alabaster border border-hairline group-hover:bg-forest group-hover:text-white transition-colors rounded-full">
            <Icon className="h-4 w-4 text-forest group-hover:text-white" />
          </div>
        </div>

        <div>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-charcoal leading-snug">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-muted font-body leading-relaxed mt-2">
            {description}
          </p>
        </div>
      </div>

      {/* Micro-Tabs for Transmission Blueprint Scanner */}
      {blueprintType === 'transmission' && (
        <div className="mt-4 pt-3 border-t border-hairline relative z-10 space-y-2">
          <span className="text-[10px] font-mono uppercase text-muted tracking-wider block font-bold">
            Komponen Terlindungi Polis:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {MICRO_TABS.map((tab, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-full border transition-colors ${
                  activeTab === idx
                    ? 'bg-forest text-white border-forest font-bold'
                    : 'bg-alabaster text-charcoal border-hairline hover:border-forest'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <p className="text-[11px] font-mono text-forest bg-sage-light px-2.5 py-1.5 border border-sage-border rounded-lg">
            {TAB_DETAILS[activeTab]}
          </p>
        </div>
      )}

      {/* Items List */}
      {items && items.length > 0 && !blueprintType?.includes('transmission') && (
        <div className="mt-5 pt-4 border-t border-hairline relative z-10 space-y-1.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs text-charcoal font-mono">
                <span className="h-1.5 w-1.5 bg-forest rounded-full shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
