import React from 'react';
import { useTiltEffect } from '../../hooks/useTiltEffect';
import { LucideIcon } from 'lucide-react';

interface ValueCardProps {
  number: string;
  title: string;
  description: string;
  badge: string;
  icon: LucideIcon;
  delay?: number;
}

export const ValueCard: React.FC<ValueCardProps> = ({
  number,
  title,
  description,
  badge,
  icon: Icon,
}) => {
  const { ref, style, onMouseMove, onMouseLeave } = useTiltEffect({
    maxTilt: 6,
    perspective: 1000,
    scale: 1.015,
  });

  return (
    <div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative flex flex-col justify-between border border-hairline bg-canvas p-6 sm:p-8 hover:border-forest transition-colors duration-200"
    >
      <div>
        <div className="flex items-center justify-between pb-6 border-b border-hairline">
          <div className="flex h-11 w-11 items-center justify-center border border-hairline bg-alabaster text-forest group-hover:bg-forest group-hover:text-white transition-colors duration-200">
            <Icon className="h-5 w-5" />
          </div>
          <span className="font-mono text-2xl font-bold text-muted/40 group-hover:text-forest transition-colors duration-200">
            {number}
          </span>
        </div>

        <div className="mt-6 space-y-2">
          <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-sage font-semibold">
            {badge}
          </span>
          <h3 className="font-display text-lg sm:text-xl font-bold text-charcoal tracking-tight group-hover:text-forest transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-muted leading-relaxed pt-1">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-hairline flex items-center justify-between text-xs font-mono text-muted group-hover:text-forest">
        <span>STANDAR RESMI</span>
        <span className="h-1.5 w-1.5 bg-forest"></span>
      </div>
    </div>
  );
};
