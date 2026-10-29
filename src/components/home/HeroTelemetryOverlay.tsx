import React from 'react';
import { ShieldCheck, CheckCircle2, Award } from 'lucide-react';

interface TelemetryItem {
  icon: React.ReactNode;
  label: string;
  sub: string;
}

export const HeroTelemetryOverlay: React.FC = () => {
  const telemetryData: TelemetryItem[] = [
    {
      icon: <ShieldCheck className="h-4 w-4 text-forest" />,
      label: '160+ Poin',
      sub: 'Lolos Inspeksi',
    },
    {
      icon: <Award className="h-4 w-4 text-forest" />,
      label: '365 Hari',
      sub: 'Garansi Mesin',
    },
    {
      icon: <CheckCircle2 className="h-4 w-4 text-forest" />,
      label: 'Samsat Bogor',
      sub: 'BPKB Terverifikasi',
    },
  ];

  return (
    <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap gap-2 pointer-events-none">
      {telemetryData.map((item, index) => (
        <div
          key={index}
          className="pointer-events-auto bg-canvas/95 backdrop-blur-none border border-hairline px-3 py-1.5 shadow-sm flex items-center gap-2"
        >
          <div className="flex h-6 w-6 items-center justify-center bg-sage-light">
            {item.icon}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-mono font-bold text-charcoal leading-none">
              {item.label}
            </span>
            <span className="text-[9px] font-mono text-muted uppercase mt-0.5">
              {item.sub}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
