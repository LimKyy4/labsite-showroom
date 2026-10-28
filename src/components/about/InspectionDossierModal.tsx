import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, PhoneCall, Award } from 'lucide-react';
import { InspectionStage } from '../../data/inspectionJourneyData';
import { Button } from '../ui/button';

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
    const text = `Halo sales advisor labsite.id Bogor, saya ingin bertanya lebih rinci mengenai parameter hasil uji ${stage.title} (No. Sertifikasi: ${stage.certCode}).`;
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop Solid Redup */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-charcoal/70"
        />

        {/* Floating Dossier Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-white border border-hairline p-6 sm:p-7 shadow-2xl z-10 space-y-6"
        >
          {/* Header Berkas Audit */}
          <div className="flex items-start justify-between pb-4 border-b border-hairline gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase text-forest font-bold tracking-wider">
                  DOSSIER AUDIT FASE {stage.num}
                </span>
                <span className="text-muted font-mono text-xs">•</span>
                <span className="font-mono text-[11px] text-muted">{stage.certCode}</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-charcoal">
                {stage.title}
              </h3>
              <p className="font-mono text-xs text-muted">
                Inspektur Penguji: <strong className="text-charcoal">{stage.inspectorName}</strong>
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center border border-hairline bg-alabaster hover:bg-forest hover:text-white transition-colors text-charcoal shrink-0"
              aria-label="Tutup berkas inspeksi"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Lembar Rincian Pengujian Fisik Riil */}
          <div className="space-y-2.5">
            <span className="font-mono text-xs text-muted uppercase tracking-wider block font-bold">
              Parameter Pengujian Fisik & Kalibrasi Riil:
            </span>
            <div className="border border-hairline divide-y divide-hairline bg-alabaster">
              {stage.deepParameters.map((param, pIdx) => (
                <div key={pIdx} className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs font-mono">
                  <div className="space-y-0.5">
                    <span className="text-muted block text-[11px] uppercase">{param.label}</span>
                    <span className="font-bold text-charcoal">{param.value}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 self-start sm:self-auto px-2.5 py-1 bg-sage-light border border-sage-border text-forest font-bold text-[11px]">
                    <ShieldCheck className="h-3 w-3 shrink-0" />
                    <span>{param.result}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stempel Kelulusan Flat Solid */}
          <div className="p-4 bg-sage-light border border-sage-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Award className="h-5 w-5 text-forest shrink-0" />
              <div>
                <span className="font-mono text-[10px] uppercase text-forest font-bold block">
                  STATUS AKREDITASI SHOWROOM BOGOR
                </span>
                <p className="font-heading font-bold text-sm text-forest">
                  LULUS STANDARISASI SHOWROOM BOGOR
                </p>
              </div>
            </div>
            <span className="font-mono text-[10px] text-muted bg-white px-2.5 py-1 border border-hairline self-start sm:self-auto">
              ID: {stage.certCode}
            </span>
          </div>

          {/* Aksi Konsultasi & Penutupan */}
          <div className="flex flex-col sm:flex-row justify-end gap-2.5 pt-2 border-t border-hairline">
            <Button variant="outline" size="md" onClick={onClose}>
              <span>Tutup Berkas</span>
            </Button>
            <Button variant="primary" size="md" onClick={handleWhatsAppConsult}>
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Tanya Detail via WhatsApp</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
