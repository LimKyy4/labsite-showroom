import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, Cpu, ShieldCheck, Award } from 'lucide-react';

export type CockpitTabType = 'telemetry' | 'specs' | 'legality' | 'inspection';

interface CockpitSegmentedNavProps {
  activeTab: CockpitTabType;
  onChangeTab: (tab: CockpitTabType) => void;
}

interface NavTabItem {
  id: CockpitTabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: NavTabItem[] = [
  { id: 'telemetry', label: 'Ringkasan Telemetri', icon: Gauge },
  { id: 'specs', label: 'Spesifikasi Teknis', icon: Cpu },
  { id: 'legality', label: 'Legalitas Samsat', icon: ShieldCheck },
  { id: 'inspection', label: 'Uji 160 Titik', icon: Award },
];

export const CockpitSegmentedNav: React.FC<CockpitSegmentedNavProps> = ({
  activeTab,
  onChangeTab,
}) => {
  return (
    <div className="sticky top-16 sm:top-20 z-20 bg-alabaster/95 backdrop-blur-sm py-2 select-none">
      <nav
        aria-label="Navigasi Kokpit Mobil"
        className="flex items-center gap-1.5 p-1 bg-white border border-hairline overflow-x-auto no-scrollbar shadow-sm"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeTab(tab.id)}
              className={`relative flex items-center justify-center gap-2 py-2 px-3.5 sm:px-4 text-xs font-mono font-semibold transition-colors whitespace-nowrap flex-1 shrink-0 ${
                isActive ? 'text-white' : 'text-charcoal hover:text-forest'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="cockpitActiveSegment"
                  className="absolute inset-0 bg-forest"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-forest'}`} />
                <span>{tab.label}</span>
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
