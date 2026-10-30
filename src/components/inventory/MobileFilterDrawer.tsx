import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal, RotateCcw, Check } from 'lucide-react';
import { SegmentedPillControl } from './SegmentedPillControl';
import { TactileBudgetSlider } from './TactileBudgetSlider';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  statusFilter: string;
  setStatusFilter: (st: string) => void;
  transmissionFilter: string;
  setTransmissionFilter: (tr: string) => void;
  maxBudget: number;
  setMaxBudget: (b: number) => void;
  onReset: () => void;
  unitCount?: number;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  statusFilter,
  setStatusFilter,
  transmissionFilter,
  setTransmissionFilter,
  maxBudget,
  setMaxBudget,
  onReset,
  unitCount = 0,
}) => {
  const statusOptions = ['Semua', 'Tersedia', 'Terpesan', 'Terjual'];
  const transOptions = ['Semua', 'Otomatis', 'Manual'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end justify-center select-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/70"
            onClick={onClose}
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
              paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
            }}
            className="relative z-10 w-full max-w-lg bg-canvas border-t border-hairline p-5 shadow-2xl space-y-4 rounded-t-2xl max-h-[85vh] overflow-y-auto"
          >
            {/* iOS Drag Handle */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-1" />

            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-forest" />
                <h3 className="font-heading text-base font-bold text-charcoal">
                  Filter & Pagu Anggaran
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 border border-hairline bg-alabaster rounded-full text-charcoal active:scale-90"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 pt-1">
              <SegmentedPillControl
                label="Status Unit Showroom"
                options={statusOptions}
                selected={statusFilter}
                onChange={setStatusFilter}
                layoutGroupId="mobileStatusPill"
              />

              <SegmentedPillControl
                label="Tipe Transmisi"
                options={transOptions}
                selected={transmissionFilter}
                onChange={setTransmissionFilter}
                layoutGroupId="mobileTransPill"
              />

              <div className="pt-1">
                <TactileBudgetSlider value={maxBudget} onChange={setMaxBudget} />
              </div>
            </div>

            <div className="pt-3 border-t border-hairline flex gap-2.5">
              <button
                type="button"
                onClick={onReset}
                className="py-3 px-3.5 border border-hairline bg-alabaster text-charcoal font-mono text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-forest text-white font-mono text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
              >
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Terapkan ({unitCount} Unit Siap)</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
