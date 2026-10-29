import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, PhoneCall, Award, Activity, Cpu } from 'lucide-react';
import { InspectionStage } from '../../data/inspectionJourneyData';

interface InspectionDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  stage: InspectionStage | null;
}

export const InspectionDossierModal: React.FC<InspectionDossierModalProps> = ({
  isOpen,
  onClose,
  stage,
}) => {
  if (!isOpen || !stage) return null;

  const handleWhatsAppConsult = () => {
    const text = `Halo sales advisor labsite.id Bogor, saya ingin bertanya hasil uji ${stage.title} (No. Sertifikasi: ${stage.certCode}).`;
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(text)}`, '_blank');
  };

  const compressionData = [
    { cyl: 'Cyl 1', psi: 188 },
    { cyl: 'Cyl 2', psi: 191 },
    { cyl: 'Cyl 3', psi: 189 },
    { cyl: 'Cyl 4', psi: 190 },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-charcoal/70" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          className="relative w-full max-w-2xl bg-white border border-hairline p-6 shadow-2xl z-10 space-y-4 max-h-[90vh] overflow-y-auto"
        >
          {/* Header Berkas Audit */}
          <div className="flex items-start justify-between pb-3 border-b border-hairline gap-3">
            <div className="space-y-0.5">
              <span className="font-mono text-xs uppercase text-forest font-bold block">{stage.sub} • {stage.certCode}</span>
              <h3 className="font-heading text-lg font-bold text-charcoal">{stage.title}</h3>
              <p className="font-mono text-xs text-muted">Auditor: <strong className="text-charcoal">{stage.inspectorName}</strong></p>
            </div>
            <button type="button" onClick={onClose} className="p-1 border border-hairline bg-alabaster hover:bg-forest hover:text-white" aria-label="Tutup berkas">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Instruments: Kompresi Silinder & Paint Gauge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-alabaster border border-hairline space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted font-bold flex items-center gap-1"><Activity className="h-3.5 w-3.5 text-forest" /> KOMPRESI (PSI)</span>
                <span className="text-forest font-bold">100% BALANCE</span>
              </div>
              <div className="grid grid-cols-4 gap-1 font-mono text-center">
                {compressionData.map((c, i) => (
                  <div key={i} className="p-1 bg-white border border-hairline">
                    <span className="text-[9px] text-muted block">{c.cyl}</span>
                    <span className="text-xs font-bold text-forest">{c.psi}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-alabaster border border-hairline space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted font-bold flex items-center gap-1"><Cpu className="h-3.5 w-3.5 text-forest" /> OBD-II & KETEBALAN CAT</span>
                <span className="text-forest font-bold">DTC CLEAN</span>
              </div>
              <div className="space-y-1 font-mono text-[10px]">
                <div className="flex justify-between bg-white px-2 py-0.5 border border-hairline"><span>Cat Kap Sasis</span><strong className="text-charcoal">108 µm</strong></div>
                <div className="flex justify-between bg-white px-2 py-0.5 border border-hairline"><span>DTC Scanner</span><strong className="text-forest">0 Faults</strong></div>
              </div>
            </div>
          </div>

          {/* Parameter Riil */}
          <div className="border border-hairline divide-y divide-hairline bg-alabaster">
            {stage.deepParameters.map((param, pIdx) => (
              <div key={pIdx} className="p-2 sm:p-2.5 flex items-center justify-between gap-2 text-xs font-mono">
                <div><span className="text-muted block text-[10px] uppercase">{param.label}</span><span className="font-bold text-charcoal">{param.value}</span></div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-sage-light border border-sage-border text-forest font-bold text-[10px]">
                  <ShieldCheck className="h-3 w-3" /><span>{param.result}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Stempel Pegas Taktil */}
          <motion.div initial={{ scale: 1.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 450, damping: 25 }} className="p-2.5 bg-sage-light border-2 border-forest flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-forest shrink-0" />
              <div><span className="font-mono text-[9px] uppercase text-forest font-bold block">CAP AKREDITASI RESMI</span><p className="font-heading font-bold text-xs text-forest uppercase">TERVERIFIKASI & MEMENUHI STANDAR MUTU 100%</p></div>
            </div>
            <span className="font-mono text-[10px] text-forest font-bold bg-white px-2 py-0.5 border border-forest">PASSED</span>
          </motion.div>

          {/* Aksi */}
          <div className="flex justify-end gap-2 pt-2 border-t border-hairline font-mono text-xs">
            <button type="button" onClick={onClose} className="px-3.5 py-1.5 bg-canvas border border-hairline hover:border-forest text-charcoal">Tutup</button>
            <button type="button" onClick={handleWhatsAppConsult} className="px-3.5 py-1.5 bg-forest text-white hover:bg-forest-light border border-forest font-bold flex items-center gap-1.5 shadow-sm">
              <PhoneCall className="h-3.5 w-3.5" /><span>Tanya via WhatsApp</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
