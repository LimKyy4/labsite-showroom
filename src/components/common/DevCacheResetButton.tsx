import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Database } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';
import { useShowroomToast } from '../../hooks/useShowroomToast';

export const DevCacheResetButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const { showToast } = useShowroomToast();

  const handleHardReset = () => {
    setIsResetting(true);
    try {
      localStorage.removeItem('labsite_showroom_inventory');
      useShowroomStore.getState().resetToInitialData();
      showToast(
        'Cache Data Direset',
        'Mock data showroom berhasil dipulihkan ke kondisi awal.',
        'success'
      );
      setTimeout(() => {
        window.location.reload();
      }, 400);
    } catch {
      setIsResetting(false);
    }
  };

  return (
    <aside
      aria-label="Utilitas Reset Data Showroom"
      className="hidden md:flex fixed bottom-5 left-5 z-40 items-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        type="button"
        onClick={handleHardReset}
        disabled={isResetting}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="flex items-center gap-2 h-9 px-3.5 bg-[#183B2B] text-white border border-[#4D7260] rounded-full shadow-lg hover:bg-forest-light focus:outline-none transition-colors"
        title="Bersihkan Cache & Pulihkan Mock Data"
      >
        <div className="relative flex items-center justify-center shrink-0">
          <RotateCcw className={`h-3.5 w-3.5 text-sage-light ${isResetting ? 'animate-spin' : ''}`} />
          <span className="absolute -top-1 -right-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </div>

        <span className="font-mono text-[11px] font-semibold text-white whitespace-nowrap">
          Reset Cache Data
        </span>
      </motion.button>

      {/* Floating Micro Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute left-0 bottom-full mb-2 px-2.5 py-1 bg-charcoal text-white text-[10px] font-mono border border-hairline shadow-xl whitespace-nowrap pointer-events-none flex items-center gap-1.5 rounded"
          >
            <Database className="h-3 w-3 text-sage-light" />
            <span>Reset LocalStorage & Muat Ulang</span>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};
