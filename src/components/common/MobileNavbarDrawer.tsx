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
        <div className="md:hidden fixed inset-0 z-50 bg-charcoal/70" onClick={onClose}>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 32 }}
            style={{
              paddingTop: 'calc(1.25rem + env(safe-area-inset-top, 0px))',
              paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
            }}
            className="fixed top-0 right-0 bottom-0 w-[84%] max-w-sm bg-white border-l border-hairline p-5 shadow-2xl flex flex-col justify-between select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-hairline">
                <div className="flex items-center gap-2">
                  <CarFront className="h-4 w-4 text-forest" />
                  <span className="font-heading text-sm font-bold text-charcoal">SHOWROOM.BOGOR</span>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 border border-hairline bg-alabaster rounded-full text-charcoal active:scale-90 transition-transform"
                  aria-label="Tutup menu navigasi"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-sage-light border border-sage-border text-forest font-mono text-[11px] font-semibold rounded-lg">
                <Radio className="h-2.5 w-2.5 animate-pulse text-forest" />
                <span>Showroom Buka • 08-18 WIB</span>
              </div>

              <div className="space-y-1.5 pt-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => onTabClick(link.id)}
                    className={`block w-full text-left px-4 py-3 text-xs font-mono font-semibold rounded-lg border transition-all active:scale-98 ${
                      activeTab === link.id
                        ? 'border-forest bg-sage-light text-forest font-bold'
                        : 'border-hairline bg-alabaster text-charcoal hover:border-forest'
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
                className="w-full py-3 px-4 text-xs font-mono font-bold bg-forest text-white rounded-lg flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-transform"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                <span>Chat WhatsApp Sales Bogor</span>
              </button>

              <button
                type="button"
                onClick={onResetCache}
                className="w-full py-2.5 px-3 text-[11px] font-mono text-muted hover:text-forest flex items-center justify-center gap-1.5 border border-hairline bg-alabaster rounded-lg active:scale-98 transition-all"
              >
                <RotateCcw className="h-3 w-3 text-forest" />
                <span>Perbarui Data / Reset Cache</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
