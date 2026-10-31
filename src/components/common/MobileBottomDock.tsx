import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CarFront, Phone, MessageCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';
import { useScrollDirection } from '../../hooks/useScrollDirection';

export const MobileBottomDock: React.FC = () => {
  const { activeTab, setActiveTab } = useShowroomStore();
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // On car detail page, MobileBottomConversionBar takes precedence to avoid overlap
  if (activeTab === 'detail') return null;

  const isVisible = !isCollapsed && (isAtTop || scrollDirection === 'up');

  const openWhatsApp = () => {
    const text = encodeURIComponent('Halo admin Labsite Showroom Bogor, saya ingin bertanya unit mobil ready.');
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Floating Micro Badge when Manually Collapsed */}
      <AnimatePresence>
        {isCollapsed && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{ bottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}
            onClick={() => setIsCollapsed(false)}
            className="md:hidden fixed right-4 z-40 bg-forest text-white border border-sage-border px-3.5 py-2 rounded-full shadow-2xl flex items-center gap-1.5 font-mono text-[11px] font-bold active:scale-95 select-none"
          >
            <CarFront className="h-3.5 w-3.5 text-sage-light" />
            <span>Buka Aksi</span>
            <ChevronUp className="h-3.5 w-3.5 text-emerald-400" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Bottom Action Dock with Smart Scroll Auto-Hide & Drag Handle */}
      <motion.nav
        aria-label="Bilah Aksi Cepat Jempol"
        initial={false}
        animate={{
          y: isVisible ? '0%' : '120%',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 360, damping: 28 }}
        style={{ bottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}
        className="md:hidden fixed left-3 right-3 z-40 bg-forest text-white border border-sage-border shadow-2xl px-2 pt-1 pb-2 rounded-2xl flex flex-col select-none"
      >
        {/* Collapsible Handle Pill at top */}
        <button
          type="button"
          onClick={() => setIsCollapsed(true)}
          className="w-full flex items-center justify-center gap-1 py-1 group focus:outline-none"
          title="Ciutkan Bilah Aksi"
        >
          <div className="w-8 h-1 bg-white/40 rounded-full group-hover:bg-white transition-colors" />
          <ChevronDown className="h-3 w-3 text-white/50 group-hover:text-white transition-colors" />
          <span className="sr-only">Ciutkan bilah aksi</span>
        </button>

        {/* 3 Thumb Zone Action Buttons */}
        <div className="flex items-center justify-around gap-1 pt-0.5">
          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className={`flex-1 py-2 px-1.5 flex flex-col items-center justify-center gap-1 rounded-xl transition-all active:scale-95 ${
              activeTab === 'inventory' ? 'bg-forest-dark text-white font-bold' : 'text-sage-light hover:text-white'
            }`}
          >
            <CarFront className="h-4 w-4" />
            <span className="font-mono text-[10px] tracking-wider uppercase">Katalog Stok</span>
          </button>

          <div className="h-6 w-px bg-forest-light shrink-0" />

          <a
            href="tel:+6281234567890"
            className="flex-1 py-2 px-1.5 flex flex-col items-center justify-center gap-1 text-sage-light hover:text-white rounded-xl transition-all active:scale-95"
          >
            <Phone className="h-4 w-4" />
            <span className="font-mono text-[10px] tracking-wider uppercase">Telepon</span>
          </a>

          <div className="h-6 w-px bg-forest-light shrink-0" />

          <button
            type="button"
            onClick={openWhatsApp}
            className="flex-1 py-2 px-1.5 flex flex-col items-center justify-center gap-1 bg-sage-light text-forest font-bold hover:bg-white rounded-xl transition-all active:scale-95 shadow-sm"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="font-mono text-[10px] tracking-wider uppercase">Chat WA</span>
          </button>
        </div>
      </motion.nav>
    </>
  );
};
