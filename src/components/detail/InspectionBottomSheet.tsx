import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PhoneCall, Download, Award } from 'lucide-react';
import { useShowroomToast } from '../../hooks/useShowroomToast';
import { InspectionBreakdown } from '../../types/showroom';
import { InspectionAuditCard, AUDIT_SECTIONS } from './InspectionAuditCard';

interface InspectionBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  carTitle?: string;
  breakdown?: Partial<InspectionBreakdown> | null;
}

export const InspectionBottomSheet: React.FC<InspectionBottomSheetProps> = ({
  isOpen,
  onClose,
  carTitle = 'Toyota Fortuner VRZ',
}) => {
  const { showToast } = useShowroomToast();
  if (!isOpen) return null;

  const handleConsultWhatsApp = () => {
    const text = encodeURIComponent(
      `Halo Tim Teknisi Labsite Showroom Bogor, saya ingin konsultasi laporan inspeksi 160 titik untuk unit ${carTitle}.`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  const handleDownloadReport = () => {
    showToast('Laporan 160 Titik Siap', `Dokumen inspeksi resmi untuk ${carTitle} berhasil diproses.`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center select-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#19201D]/35"
          onClick={onClose}
        />

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 350 }}
          drag="y"
          dragConstraints={{ top: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.y > 100) onClose();
          }}
          style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
          className="relative z-10 w-full max-w-xl bg-white border-t border-hairline rounded-t-2xl shadow-2xl p-5 max-h-[85vh] overflow-y-auto space-y-4"
        >
          {/* iOS-Style Drag Handle */}
          <div className="w-12 h-1.5 rounded-full bg-gray-300 mx-auto" />

          {/* Header Dossier */}
          <div className="flex items-start justify-between pb-3 border-b border-hairline">
            <div className="space-y-0.5">
              <span className="font-mono text-[10px] uppercase text-forest font-bold tracking-wider block">
                DOSSIER HASIL INSPEKSI 160 TITIK
              </span>
              <h3 className="font-heading text-base sm:text-lg font-bold text-charcoal">{carTitle}</h3>
              <div className="flex items-center gap-2 pt-1 font-mono text-[10px]">
                <span className="px-2 py-0.5 bg-sage-light text-forest border border-sage-border rounded font-bold">
                  SKOR: 99/100
                </span>
                <span className="text-muted flex items-center gap-1">
                  <Award className="h-3 w-3 text-forest" />
                  <span>SAMSAT BOGOR TERVALIDASI</span>
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 border border-hairline bg-alabaster rounded-full text-charcoal hover:bg-forest hover:text-white transition-colors"
              aria-label="Tutup laporan"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* 4 Audit Sections with Staggered Slide-up */}
          <div className="space-y-2.5">
            {AUDIT_SECTIONS.map((sec, idx) => (
              <InspectionAuditCard key={sec.title} section={sec} index={idx} />
            ))}
          </div>

          {/* Action Dock */}
          <div className="pt-2 border-t border-hairline space-y-2">
            <button
              type="button"
              onClick={handleConsultWhatsApp}
              className="w-full py-2.5 px-4 bg-forest text-white hover:bg-forest-light border border-forest rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Konsultasi Hasil Uji via WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={handleDownloadReport}
              className="w-full py-2 px-4 bg-canvas text-charcoal hover:bg-alabaster border border-hairline rounded-lg font-mono text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Unduh Sertifikat Digital 160 Titik</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
