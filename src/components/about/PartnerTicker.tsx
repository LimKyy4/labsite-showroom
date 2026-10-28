import React from 'react';
import { Landmark } from 'lucide-react';
import { PARTNERS } from '../../data/mockData';

export const PartnerTicker: React.FC = () => {
  return (
    <aside aria-label="Mitra Pembiayaan Resmi" className="bg-forest text-white py-3.5 border-y border-forest-light overflow-hidden select-none">
      <div className="flex w-max animate-ticker">
        <div className="flex items-center space-x-8 px-4">
          {PARTNERS.map((p, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <Landmark className="h-4 w-4 text-sage-light" />
              <span className="font-heading text-xs font-bold tracking-wider uppercase whitespace-nowrap">
                {p.name}
              </span>
              <span className="text-[10px] font-mono text-sage-light/80">({p.type})</span>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-8 px-4" aria-hidden="true">
          {PARTNERS.map((p, idx) => (
            <div key={`dup-${idx}`} className="flex items-center space-x-2">
              <Landmark className="h-4 w-4 text-sage-light" />
              <span className="font-heading text-xs font-bold tracking-wider uppercase whitespace-nowrap">
                {p.name}
              </span>
              <span className="text-[10px] font-mono text-sage-light/80">({p.type})</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
