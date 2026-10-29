import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { useTiltEffect } from '../../hooks/useTiltEffect';

interface BentoBlueprintCardProps {
  badge: string;
  title: string;
  description: string;
  icon: LucideIcon;
  blueprintType?: 'transmission' | 'flood_sensor' | 'samsat_stamp' | 'buyback';
  items?: string[];
  className?: string;
}

export const BentoBlueprintCard: React.FC<BentoBlueprintCardProps> = ({
  badge,
  title,
  description,
  icon: Icon,
  blueprintType,
  items,
  className = '',
}) => {
  const { ref, style, onMouseMove, onMouseLeave } = useTiltEffect({ maxTilt: 8, scale: 1.01 });
  const [activeTab, setActiveTab] = useState(0);

  const microTabs = ['Blok Mesin', 'Girboks Matic', 'ECU & Wiring', 'Radiator'];

  return (
    <div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative bg-canvas border border-hairline p-6 hover:border-forest transition-colors duration-200 overflow-hidden flex flex-col justify-between group select-none ${className}`}
    >
      {/* Specular Sheen Reflection Layer (Solid flat overlay per zero-gradient policy) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 bg-white/20 border border-forest/20" />

      {/* Laser Scanline Sweeper for Transmission */}
      {blueprintType === 'transmission' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="w-full h-0.5 bg-forest/40 shadow-[0_0_8px_#183B2B] animate-[bounce_4s_infinite]" />
        </div>
      )}

      {/* Blueprint Visuals */}
      {blueprintType === 'transmission' && (
        <svg className="absolute -right-6 -bottom-6 w-48 h-48 opacity-[0.08] pointer-events-none stroke-forest fill-none" viewBox="0 0 200 200" strokeWidth="1.2">
          <circle cx="100" cy="100" r="70" strokeDasharray="4 2" />
          <circle cx="100" cy="100" r="45" />
          <path d="M100 20 V180 M20 100 H180" />
          <circle cx="100" cy="100" r="15" />
        </svg>
      )}

      {blueprintType === 'flood_sensor' && (
        <div className="absolute right-4 bottom-4 p-2 bg-alabaster border border-hairline text-right font-mono text-[10px] text-muted space-y-0.5 pointer-events-none">
          <span className="text-forest font-bold block">SENSOR PROBE: 0.0 CM</span>
          <span>Sungai Cisadane: Aman</span>
          <span>Bendung Katulampa: Bebas</span>
        </div>
      )}

      {blueprintType === 'samsat_stamp' && (
        <div className="absolute right-4 top-4 border-2 border-forest/30 bg-alabaster/60 px-3 py-1 rotate-6 pointer-events-none shadow-sm">
          <span className="text-[10px] font-mono font-bold tracking-widest text-forest uppercase block">
            TERVALIDASI SAMSAT KOTA BOGOR
          </span>
          <span className="text-[8px] font-mono text-muted text-center block">LEGALITAS FISIK SAH</span>
        </div>
      )}

      {/* Card Content */}
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
            Komponen Utama yang Terlindungi Polis:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {microTabs.map((tab, idx) => (
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
