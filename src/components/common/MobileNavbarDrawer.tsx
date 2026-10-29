import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, X, CarFront, Radio, RotateCcw } from 'lucide-react';
import { ActiveTab } from '../../types/showroom';

interface MobileNavbarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  onTabClick: (tab: ActiveTab) => void;
  onWhatsApp: () => void;
  onResetCache: () => void;
  navLinks: { id: ActiveTab; label: string }[];
}

export const MobileNavbarDrawer: React.FC<MobileNavbarDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onTabClick,
  onWhatsApp,
  onResetCache,
  navLinks,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-sm" onClick={onClose}>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 32 }}
            className="fixed top-0 right-0 bottom-0 w-[84%] max-w-sm bg-canvas border-l border-hairline p-5 shadow-2xl flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-hairline">
                <div className="flex items-center gap-2">
                  <CarFront className="h-4 w-4 text-forest" />
                  <span className="font-heading text-sm font-bold">SHOWROOM.BOGOR</span>
                </div>
                <button type="button" onClick={onClose} className="p-1 border border-hairline bg-alabaster">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-sage-light border border-sage-border text-forest font-mono text-[11px] font-semibold">
                <Radio className="h-2.5 w-2.5 animate-pulse text-forest" />
                <span>Showroom Buka • 08-18 WIB</span>
              </div>
              <div className="space-y-1.5">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => onTabClick(link.id)}
                    className={`block w-full text-left px-4 py-2.5 text-xs font-mono font-semibold rounded-lg border ${
                      activeTab === link.id ? 'border-forest bg-sage-light text-forest' : 'border-hairline bg-alabaster text-charcoal'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2 pt-4 border-t border-hairline">
              <button
                type="button"
                onClick={onWhatsApp}
                className="w-full py-2.5 px-4 text-xs font-mono font-bold bg-forest text-white rounded-lg flex items-center justify-center gap-2 shadow-sm"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span>Chat WhatsApp Sales Bogor</span>
              </button>
              <button
                type="button"
                onClick={onResetCache}
                className="w-full py-2 px-3 text-[11px] font-mono text-muted hover:text-forest flex items-center justify-center gap-1.5 border border-hairline bg-alabaster rounded-lg"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Perbarui Data / Reset Cache</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
