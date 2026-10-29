import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useTiltEffect } from '../../hooks/useTiltEffect';

interface PillarMatrixCardProps {
  num: string;
  regCode: string;
  title: string;
  desc: string;
  scope: string;
  icon: LucideIcon;
}

export const PillarMatrixCard: React.FC<PillarMatrixCardProps> = ({
  num,
  regCode,
  title,
  desc,
  scope,
  icon: Icon,
}) => {
  const { ref, style, onMouseMove, onMouseLeave } = useTiltEffect({ maxTilt: 6, scale: 1.01 });

  return (
    <article
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative border border-hairline bg-canvas p-6 flex flex-col justify-between hover:border-forest transition-all duration-300 shadow-sm select-none"
    >
      {/* Specular Sheen Reflection Layer (Solid flat overlay per zero-gradient policy) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 bg-white/15 border border-forest/20 z-10" />

      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-hairline">
          <div className="flex h-10 w-10 items-center justify-center bg-alabaster border border-hairline text-forest group-hover:bg-forest group-hover:text-white transition-colors">
            <Icon className="h-5 w-5" />
          </div>
          <div className="text-right">
            <span className="font-mono text-xs font-bold text-forest block">PILAR {num}</span>
            <span className="font-mono text-[9px] text-muted">{regCode}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <h3 className="font-heading text-base font-bold text-charcoal group-hover:text-forest transition-colors leading-snug">
            {title}
          </h3>
          <p className="font-body text-xs text-muted leading-relaxed">
            {desc}
          </p>
        </div>

        {/* Lingkup Proteksi Teknis */}
        <div className="p-2.5 bg-alabaster border border-hairline/80 space-y-1">
          <span className="font-mono text-[9px] uppercase tracking-wider text-muted font-bold block">
            CAKUPAN PERLINDUNGAN:
          </span>
          <p className="font-mono text-[10px] text-charcoal font-semibold leading-tight">
            {scope}
          </p>
        </div>
      </div>

      {/* Cap Stempel Flat Digital Legal */}
      <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between text-[10px] font-mono">
        <span className="text-forest font-bold bg-sage-light px-2 py-0.5 border border-sage-border">
          LEGAL STANDARDIZATION BOGOR
        </span>
        <span className="text-muted">100% COVERAGE</span>
      </div>
    </article>
  );
};
