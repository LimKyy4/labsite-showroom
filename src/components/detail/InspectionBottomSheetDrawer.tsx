import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';
import { InspectionBreakdown } from '../../types/showroom';

interface InspectionBottomSheetDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  carTitle?: string;
  breakdown?: Partial<InspectionBreakdown> | null;
}

export const InspectionBottomSheetDrawer: React.FC<InspectionBottomSheetDrawerProps> = ({
  isOpen,
  onClose,
  carTitle = 'Toyota Fortuner VRZ',
}) => {
  if (!isOpen) return null;

  const sections = [
    {
      title: '1. Ruang Bakar, Kompresi Mesin & Transmisi',
      score: '99/100',
      details: [
        'Kompresi ruang bakar silinder stabil 185-190 PSI, bebas knocking atau bunyi abnormal',
        'Blok mesin & girboks kering, bebas rembesan oli maupun cairan pendingin radiator',
        'Transmisi matic responsif tanpa slip atau jeda saat perpindahan gigi maju-mundur',
      ],
    },
    {
      title: '2. Integritas Struktur Sasis & Rangka Utama',
      score: '100/100',
      details: [
        'Pilar A, B, C dan apron depan utuh dengan titik las pabrik original tanpa perbaikan las',
        'Sasis bebas bekas benturan, deformasi, maupun proses penarikan hidrolik ulang',
        'Garis nat kap mesin, pintu samping, dan bagasi belakang simetris presisi',
      ],
    },
    {
      title: '3. Sensor ECU, Kelistrikan & Uji Genangan Air',
      score: '98/100',
      details: [
        'Kolong karpet dasar dan rel jok kering, bebas residu lumpur genangan air banjir Bogor',
        'Soket sensor ECU di bawah dasbor bersih tanpa korosi residu rendaman air',
        'Komputer ECU terbebas dari kode kerusakan kelistrikan (DTC Clean)',
      ],
    },
  ];

  const handleAskTechnician = (sectionTitle: string) => {
    const text = encodeURIComponent(
      `Halo Teknisi Showroom Bogor by labsite.id, saya ingin bertanya hasil inspeksi ${sectionTitle} untuk unit ${carTitle}.`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center select-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-charcoal/70 backdrop-blur-xs"
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
          style={{
            paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
          }}
          className="relative z-10 w-full max-w-2xl bg-canvas border-t border-hairline rounded-t-2xl shadow-2xl p-5 sm:p-7 max-h-[88vh] overflow-y-auto space-y-5"
        >
          {/* Drag Handle Indicator */}
          <div className="w-12 h-1.5 bg-hairline rounded-full mx-auto" />

          {/* Drawer Header */}
          <div className="flex items-start justify-between pb-3 border-b border-hairline">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-forest" />
                <h3 className="font-heading text-lg font-bold text-charcoal">
                  Buku Laporan Uji Kelayakan 160 Titik
                </h3>
              </div>
              <p className="font-mono text-xs text-muted mt-0.5">
                Unit Kendaraan: <strong className="text-charcoal">{carTitle}</strong>
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 border border-hairline bg-alabaster hover:bg-hairline text-charcoal transition-colors active:scale-90"
              aria-label="Tutup Laporan"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Inspection Category Rows */}
          <div className="space-y-4">
            {sections.map((sec, idx) => (
              <div key={idx} className="border border-hairline bg-alabaster p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-hairline">
                  <h4 className="font-heading text-xs sm:text-sm font-bold text-charcoal">
                    {sec.title}
                  </h4>
                  <span className="font-mono text-xs font-bold text-forest bg-sage-light px-2 py-0.5 border border-sage-border">
                    Skor: {sec.score}
                  </span>
                </div>
                <div className="space-y-2">
                  {sec.details.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs font-body text-charcoal">
                      <CheckCircle2 className="h-3.5 w-3.5 text-forest shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{d}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-hairline flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleAskTechnician(sec.title)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-canvas hover:bg-forest text-charcoal hover:text-white border border-hairline hover:border-forest font-mono text-[11px] font-semibold transition-all shadow-sm active:scale-95"
                  >
                    <MessageSquare className="h-3 w-3 text-forest" />
                    <span>Tanyakan Bagian Ini ke Teknisi</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
