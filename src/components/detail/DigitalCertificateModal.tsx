import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { CarUnit } from '../../types/showroom';

interface DigitalCertificateModalProps {
  car: CarUnit;
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalCertificateModal: React.FC<DigitalCertificateModalProps> = ({
  car,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-charcoal/70"
          onClick={onClose}
          aria-hidden="true"
        />

        <motion.div
          initial={{ y: '100%', opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          drag="y"
          dragConstraints={{ top: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.y > 100) onClose();
          }}
          style={{
            paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
          }}
          className="relative z-10 w-full max-w-lg border-t sm:border border-hairline bg-canvas p-5 sm:p-7 shadow-2xl space-y-4 rounded-t-2xl sm:rounded-none max-h-[90vh] overflow-y-auto"
        >
          {/* Drag Handle */}
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-1 sm:hidden" />

          <div className="flex items-start justify-between pb-3 border-b border-hairline">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-forest" />
                <h3 className="font-heading text-lg font-bold text-charcoal">
                  Sertifikat Digital Uji Kelayakan 160 Titik
                </h3>
              </div>
              <p className="font-mono text-xs text-muted mt-0.5">
                Nomor Registrasi: CERT-BOGOR-{car.id.toUpperCase().substring(0, 14)}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 border border-hairline bg-alabaster rounded-full text-charcoal active:scale-90"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="border border-hairline bg-alabaster p-4 space-y-2.5 font-mono text-xs">
            <div className="flex justify-between border-b border-hairline pb-2">
              <span className="text-muted">Unit Kendaraan:</span>
              <strong className="text-charcoal">{car.title}</strong>
            </div>
            <div className="flex justify-between border-b border-hairline pb-2">
              <span className="text-muted">Nomor Polisi:</span>
              <strong className="text-forest">{car.plateNumber}</strong>
            </div>
            <div className="flex justify-between border-b border-hairline pb-2">
              <span className="text-muted">Status Validasi Samsat:</span>
              <strong className="text-forest">Lolos Cek Fisik Polda Jabar</strong>
            </div>
            <div className="flex justify-between border-b border-hairline pb-2">
              <span className="text-muted">Jaminan Rendaman Air:</span>
              <strong className="text-forest">100% Bebas Banjir Bogor</strong>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-muted">Masa Perlindungan:</span>
              <strong className="text-forest">365 Hari Polis Mekanikal Mesin</strong>
            </div>
          </div>

          <div className="p-3 bg-sage-light border border-sage-border flex items-center gap-2 text-xs font-mono text-forest font-bold">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Sertifikat Resmi Bergaransi Buyback 100% labsite.id Showroom</span>
          </div>

          <div className="pt-1">
            <Button variant="primary" size="md" fullWidth onClick={onClose} className="py-3">
              <FileCheck className="h-4 w-4" />
              <span>Tutup Sertifikat Digital</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
