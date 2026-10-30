import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, ArrowRight, PhoneCall, CheckCircle2 } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';
import { CarStatusBadge } from '../common/CarStatusBadge';

export const QuickPeekModal: React.FC = () => {
  const { quickPeekCar, setQuickPeekCar, setSelectedCarId, setActiveTab } = useShowroomStore();

  if (!quickPeekCar) return null;

  const handleOpenDetail = () => {
    setSelectedCarId(quickPeekCar.id);
    setActiveTab('detail');
    setQuickPeekCar(null);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Halo admin labsite.id, saya tertarik dengan unit ${quickPeekCar.title} (${quickPeekCar.plateNumber}).`);
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  const formatRupiah = (num: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm"
          onClick={() => setQuickPeekCar(null)}
          aria-hidden="true"
        />

        {/* Bottom Sheet Drawer on Mobile / Centered Modal on Desktop */}
        <motion.div
          initial={{ y: '100%', opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          drag="y"
          dragConstraints={{ top: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.y > 100) setQuickPeekCar(null);
          }}
          style={{
            paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
          }}
          className="relative z-10 w-full max-w-lg border-t sm:border border-hairline bg-canvas p-5 sm:p-6 shadow-2xl space-y-3.5 rounded-t-2xl sm:rounded-none max-h-[92vh] overflow-y-auto"
        >
          {/* iOS-Style Drag Handle Pill */}
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-1.5 sm:hidden" />

          <div className="flex items-start justify-between pb-2.5 border-b border-hairline">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
                INTIP CEPAT HASIL INSPEKSI 160 TITIK
              </span>
              <h3 className="font-heading text-lg font-bold text-charcoal">{quickPeekCar.title}</h3>
            </div>
            <button
              type="button"
              onClick={() => setQuickPeekCar(null)}
              className="p-1.5 border border-hairline bg-alabaster rounded-full text-charcoal active:scale-90"
              aria-label="Tutup intip cepat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="relative aspect-[16/9] overflow-hidden bg-hairline border border-hairline">
            <img src={quickPeekCar.images[0]} alt={quickPeekCar.title} className="h-full w-full object-cover" />
            <div className="absolute top-2.5 left-2.5">
              <CarStatusBadge status={quickPeekCar.status} size="sm" />
            </div>
          </div>

          <div className="bg-alabaster border border-hairline p-3 space-y-2 font-mono text-xs text-charcoal">
            <div className="flex justify-between border-b border-hairline pb-1.5">
              <span className="text-muted">Skor Mesin & Transmisi:</span>
              <span className="font-bold text-forest">{quickPeekCar.inspectionBreakdown?.engineScore || '98/100'}</span>
            </div>
            <div className="flex justify-between border-b border-hairline pb-1.5">
              <span className="text-muted">Integritas Struktur Sasis:</span>
              <span className="font-bold text-forest">{quickPeekCar.inspectionBreakdown?.chassisScore || '100/100'}</span>
            </div>
            <div className="flex items-center justify-between text-forest font-bold pt-0.5 text-[11px]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Bebas Banjir Bogor</span>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Polis 365 Hari</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 gap-2">
            <div>
              <span className="font-mono text-[9px] text-muted block uppercase">Harga OTR Bogor</span>
              <span className="font-heading text-lg sm:text-xl font-bold text-forest leading-none">
                {formatRupiah(quickPeekCar.price)}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleOpenDetail}
                className="px-3 py-2.5 border border-hairline hover:border-forest text-xs font-mono font-bold text-charcoal flex items-center gap-1.5 bg-canvas active:scale-95 shadow-sm"
              >
                <span>Detail</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={handleWhatsApp}
                className="px-3.5 py-2.5 bg-forest text-white text-xs font-mono font-bold hover:bg-forest-light border border-forest flex items-center gap-1.5 active:scale-95 shadow-sm"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span>Chat WA</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
