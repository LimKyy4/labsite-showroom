import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, Activity, ShieldCheck, Cpu, Gauge } from 'lucide-react';

interface Compartment {
  title: string;
  metric: string;
  icon: LucideIcon;
  desc: string;
}

export const COMPARTMENTS: Compartment[] = [
  {
    title: '1. Ruang Bakar & Mesin',
    metric: '190 PSI • EURO 4',
    icon: Activity,
    desc: 'Kompresi 4 silinder stabil 188-192 PSI. Emisi gas buang lolos baku mutu, blok mesin kering tanpa rembes.',
  },
  {
    title: '2. Struktur Sasis & Bodi',
    metric: 'CAT: 108 µm',
    icon: ShieldCheck,
    desc: 'Ketebalan cat seluruh panel 105-112 µm (orisinal tanpa dempul). Tulang apron dan pilar sasis utuh simetris.',
  },
  {
    title: '3. Sistem Kelistrikan & Sensor',
    metric: 'ZERO DTC ERROR',
    icon: Cpu,
    desc: 'Diagnostik OBD-2 0 fault code. Soket ECU dan relay kedap kering, kolong karpet bebas residu lumpur Katulampa.',
  },
  {
    title: '4. Kaki-Kaki & Sistem Rem',
    metric: '88% TAPAK TEBAL',
    icon: Gauge,
    desc: 'Ketebalan tapak ban 88% rata, kampas rem cakram 90% tebal, bushing suspensi empuk tanpa bunyi abnormal.',
  },
];

export const DrawerCompartmentList: React.FC = () => {
  return (
    <div className="p-4 sm:p-5 space-y-3 overflow-y-auto flex-1 bg-alabaster">
      {COMPARTMENTS.map((comp, idx) => {
        const Icon = comp.icon;
        return (
          <motion.div
            key={comp.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03, duration: 0.2 }}
            className="p-3.5 bg-white border border-hairline rounded-lg space-y-1.5 shadow-sm"
          >
            <div className="flex items-center justify-between pb-1 border-b border-hairline">
              <div className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-forest" />
                <h4 className="font-heading text-xs font-bold text-charcoal">{comp.title}</h4>
              </div>
              <span className="font-mono text-[10px] font-bold text-forest bg-sage-light px-2 py-0.5 border border-sage-border rounded">
                {comp.metric}
              </span>
            </div>
            <p className="font-body text-xs text-muted leading-relaxed">{comp.desc}</p>
          </motion.div>
        );
      })}
    </div>
  );
};
