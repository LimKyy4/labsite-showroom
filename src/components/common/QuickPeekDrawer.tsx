import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, PhoneCall, Download, Award } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';
import { useShowroomToast } from '../../hooks/useShowroomToast';
import { DrawerCompartmentList } from './DrawerCompartmentList';

export const QuickPeekDrawer: React.FC = () => {
  const { quickPeekCar, setQuickPeekCar } = useShowroomStore();
  const { showToast } = useShowroomToast();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!quickPeekCar) return null;

  const handleConsultWhatsApp = () => {
    const text = encodeURIComponent(
      `Halo Labsite Showroom Bogor, saya ingin konsultasi hasil inspeksi 160 titik unit ${quickPeekCar.title} (${quickPeekCar.plateNumber}) dengan skor rata-rata 99/100.`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  const handleDownloadCertificate = () => {
    showToast('Sertifikat Digital Siap', `Dokumen inspeksi resmi 160 titik untuk ${quickPeekCar.title} berhasil diunduh.`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end items-end md:items-stretch select-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickPeekCar(null)}
          className="fixed inset-0 bg-[#19201D]/35"
        />

        <motion.div
          initial={isMobile ? { y: '100%' } : { x: '100%' }}
          animate={isMobile ? { y: 0 } : { x: 0 }}
          exit={isMobile ? { y: '100%' } : { x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 350 }}
          drag={isMobile ? 'y' : false}
          dragConstraints={{ top: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (isMobile && info.offset.y > 100) setQuickPeekCar(null);
          }}
          style={{ paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
          className="relative z-10 w-full md:w-[520px] max-w-full bg-white border-t md:border-t-0 md:border-l border-hairline shadow-2xl flex flex-col justify-between max-h-[85vh] md:max-h-full h-auto md:h-full rounded-t-2xl md:rounded-none overflow-hidden"
        >
          {/* Header Dossier */}
          <div className="p-4 sm:p-5 border-b border-hairline space-y-2.5 bg-white shrink-0">
            {isMobile && <div className="w-12 h-1.5 rounded-full bg-gray-300 mx-auto -mt-1 mb-1" />}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="font-mono text-[10px] uppercase text-forest font-bold tracking-wider block">
                  DOSSIER AUDIT FORENSIK 160 TITIK
                </span>
                <h3 className="font-heading text-base sm:text-lg font-bold text-charcoal leading-snug">
                  {quickPeekCar.title}
                </h3>
                <span className="font-mono text-xs text-muted block mt-0.5">
                  Plat: <strong className="text-charcoal">{quickPeekCar.plateNumber}</strong> • OTR: Rp {(quickPeekCar.price / 1000000).toFixed(0)} Jt
                </span>
              </div>
              <button
                type="button"
                onClick={() => setQuickPeekCar(null)}
                className="p-1.5 border border-hairline bg-alabaster rounded-full text-charcoal hover:bg-forest hover:text-white transition-colors"
                aria-label="Tutup laci inspeksi"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-sage-light text-forest border border-sage-border rounded font-mono text-[10px] font-bold">
                <CheckCircle2 className="h-3 w-3" />
                <span>SKOR RATA-RATA: 99/100</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-alabaster text-charcoal border border-hairline rounded font-mono text-[10px] font-semibold">
                <Award className="h-3 w-3 text-forest" />
                <span>TERVALIDASI SAMSAT KOTA BOGOR</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-forest font-semibold">
              <span>Bebas Banjir Cisadane/Katulampa</span>
              <span>Struktur Sasis 100% Presisi</span>
            </div>
          </div>

          {/* 4 Compartment List */}
          <DrawerCompartmentList />

          {/* Action Dock */}
          <div className="p-4 sm:p-5 border-t border-hairline bg-white space-y-2 shrink-0">
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
              onClick={handleDownloadCertificate}
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
