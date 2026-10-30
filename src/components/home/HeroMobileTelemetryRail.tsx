import React from 'react';
import { Activity, ShieldCheck, Gauge } from 'lucide-react';

export const HeroMobileTelemetryRail: React.FC = () => {
  const telemetryData = [
    {
      icon: Activity,
      label: 'KAP MESIN & ECU',
      metric: 'KOMPRESI 98%',
      desc: 'ECU Bebas Banjir • Servis Auto2000',
    },
    {
      icon: ShieldCheck,
      label: 'SASIS & RANGKA',
      metric: 'INTEGRITAS 100%',
      desc: 'Segel Pabrik Utuh • Garansi Buyback',
    },
    {
      icon: Gauge,
      label: 'RODA & REM',
      metric: 'TAPAK 90%',
      desc: 'Tapak Ban Prima • Sistem ABS Optimal',
    },
  ];

  return (
    <div className="sm:hidden pt-2.5 space-y-1.5 select-none">
      <span className="font-mono text-[9px] uppercase tracking-wider text-muted font-bold block">
        Telemetri Inspeksi Unit (Geser Kartu):
      </span>
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-2 no-scrollbar pb-1">
        {telemetryData.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="shrink-0 w-[68vw] snap-center bg-canvas border border-hairline p-2.5 space-y-1 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-muted font-semibold">{item.label}</span>
                <span className="font-mono text-[10px] font-bold text-forest bg-sage-light px-1.5 py-0.5 border border-sage-border">
                  {item.metric}
                </span>
              </div>
              <div className="flex items-center gap-1.5 pt-0.5">
                <Icon className="h-3.5 w-3.5 text-forest shrink-0" />
                <p className="font-body text-[11px] text-charcoal truncate">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
