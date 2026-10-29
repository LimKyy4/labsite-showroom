import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShieldCheck, ArrowRight } from 'lucide-react';

export interface ScrubberPhaseData {
  step: string;
  duration: string;
  title: string;
  subtitle: string;
  description: string;
  checklist: string[];
  docStamp: string;
  actionHint: string;
}

interface ScrubberDossierPanelProps {
  data: ScrubberPhaseData;
}

export const ScrubberDossierPanel: React.FC<ScrubberDossierPanelProps> = ({ data }) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleConsult = () => {
    const text = encodeURIComponent(`Halo labsite.id Bogor, saya ingin bertanya tentang: Fase ${data.step} - ${data.title}`);
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  return (
    <div className="bg-canvas border border-hairline p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-sm">
      {/* Spring Physics Digital Stamp Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={data.step}
          initial={{ scale: 2.2, opacity: 0, rotate: -25 }}
          animate={{ scale: 1, opacity: 1, rotate: -6 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 22 }}
          className="absolute right-4 top-4 sm:right-8 sm:top-6 border-2 border-forest/40 bg-sage-light/80 backdrop-blur-sm px-3.5 py-1.5 pointer-events-none select-none z-20 shadow-sm"
        >
          <div className="flex items-center gap-1.5 text-forest">
            <ShieldCheck className="h-4 w-4" />
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest">
              VERIFIED & CERTIFIED
            </span>
          </div>
          <span className="text-[8px] font-mono text-muted text-center block mt-0.5">
            SAMSAT & LABSITE INSPECTED
          </span>
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-forest">
              FASE {data.step}
            </span>
            <span className="text-hairline">•</span>
            <span className="px-2.5 py-0.5 bg-sage-light text-forest font-mono text-[11px] font-bold rounded-full">
              Estimasi: {data.duration}
            </span>
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-charcoal mt-1">
            {data.title}
          </h3>
        </div>
      </div>

      <p className="text-sm text-muted font-body leading-relaxed max-w-2xl relative z-10">
        {data.description}
      </p>

      {/* Interactive Clickable Checklist */}
      <div className="space-y-2 pt-1 relative z-10">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase text-muted tracking-wider block font-bold">
            Checklist Transparansi (Klik untuk Uji Verifikasi):
          </span>
          <span className="text-[10px] font-mono text-forest">
            Interaktif • Berkas Fisik Tersedia
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {data.checklist.map((item, idx) => {
            const isChecked = checkedItems[idx] ?? true;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => toggleCheck(idx)}
                className={`flex items-center gap-2.5 p-3 text-left border transition-all ${
                  isChecked
                    ? 'bg-alabaster border-hairline text-charcoal'
                    : 'bg-canvas border-hairline/60 text-muted opacity-60'
                }`}
              >
                <span className={`h-5 w-5 flex items-center justify-center rounded-sm shrink-0 border transition-colors ${
                  isChecked ? 'bg-forest text-white border-forest' : 'border-hairline bg-canvas'
                }`}>
                  {isChecked && <Check className="h-3.5 w-3.5" />}
                </span>
                <span className="text-xs font-body font-medium">{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t border-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <span className="text-xs font-mono text-muted">
          {data.actionHint}
        </span>
        <button
          type="button"
          onClick={handleConsult}
          className="px-4 py-2 bg-forest text-white font-mono text-xs font-bold hover:bg-forest-light border border-forest rounded-full transition-colors flex items-center gap-2 shadow-sm"
        >
          <span>Tanyakan Prosedur Ini</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
