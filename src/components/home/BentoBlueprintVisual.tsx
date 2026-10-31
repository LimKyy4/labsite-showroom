import React from 'react';

interface BentoBlueprintVisualProps {
  blueprintType?: 'transmission' | 'flood_sensor' | 'samsat_stamp' | 'buyback';
}

export const BentoBlueprintVisual: React.FC<BentoBlueprintVisualProps> = ({ blueprintType }) => {
  if (blueprintType === 'transmission') {
    return (
      <div className="absolute -right-4 -bottom-4 w-52 h-52 pointer-events-none overflow-hidden opacity-20">
        <svg className="w-full h-full stroke-forest fill-none" viewBox="0 0 200 200" strokeWidth="1.2">
          <circle cx="100" cy="100" r="70" strokeDasharray="4 2" />
          <circle cx="100" cy="100" r="45" />
          <path d="M100 20 V180 M20 100 H180" />
          <circle cx="100" cy="100" r="15" />
        </svg>
        <div className="absolute inset-y-0 w-1 bg-forest animate-scanline opacity-60" />
      </div>
    );
  }

  if (blueprintType === 'flood_sensor') {
    return (
      <div className="absolute right-4 bottom-4 p-2.5 bg-alabaster border border-hairline font-mono text-[10px] space-y-1 pointer-events-none shadow-sm">
        <div className="flex items-center gap-2 border-b border-hairline pb-1">
          <div className="h-6 w-1.5 bg-hairline rounded-full overflow-hidden flex flex-col justify-end">
            <div className="h-1 w-full bg-forest" />
          </div>
          <div>
            <span className="text-forest font-bold block text-[11px]">PROBE: 0.0 CM</span>
            <span className="text-muted text-[8px]">BEBAS GENANGAN BANJIR</span>
          </div>
        </div>
        <span className="text-charcoal block">Bebas Rendaman Cisadane</span>
        <span className="text-charcoal block">Bebas Luapan Katulampa</span>
      </div>
    );
  }

  if (blueprintType === 'samsat_stamp') {
    return (
      <div className="absolute right-4 top-4 border-2 border-forest bg-sage-light text-forest px-3 py-1 rotate-3 pointer-events-none shadow-sm">
        <span className="text-[10px] font-mono font-bold tracking-widest uppercase block">
          TERVALIDASI SAMSAT KOTA BOGOR
        </span>
        <span className="text-[8px] font-mono text-muted text-center block">LEGALITAS FISIK SAH</span>
      </div>
    );
  }

  return null;
};
