import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Menu, Radio } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useShowroomToast } from '../../hooks/useShowroomToast';
import { ActiveTab } from '../../types/showroom';
import { MobileNavbarDrawer } from './MobileNavbarDrawer';
import { NavbarBrandAnchor } from './NavbarBrandAnchor';

export const NavbarPill: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeTab, setActiveTab, resetToInitialData } = useShowroomStore();
  const { scrollDirection, isAtTop } = useScrollDirection();
  const { showToast } = useShowroomToast();
  const isVisible = isAtTop || scrollDirection === 'up';

  const navLinks: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Beranda' },
    { id: 'inventory', label: 'Katalog Unit' },
    { id: 'about', label: 'Garansi & Profil' },
    { id: 'contact', label: 'Kontak & Lokasi' },
  ];

  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent('Halo Labsite Showroom Bogor, saya ingin berkonsultasi mengenai unit mobil seken.');
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  const handleResetCache = () => {
    try {
      localStorage.removeItem('labsite_showroom_inventory');
      resetToInitialData();
      showToast('Cache Direset', 'Mock data berhasil dipulihkan.');
      setTimeout(() => window.location.reload(), 400);
    } catch { /* fallback */ }
  };

  return (
    <>
      <motion.header
        aria-label="Floating Dynamic Island Navbar"
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: isVisible ? '0%' : '-120%',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 360, damping: 28 }}
        style={{ top: 'calc(0.75rem + env(safe-area-inset-top, 0px))' }}
        className="fixed inset-x-0 z-40 flex justify-center pointer-events-none select-none"
      >
        <div className="pointer-events-auto w-[94%] max-w-5xl rounded-full bg-white/85 backdrop-blur-xl border border-gray-200/80 px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg flex items-center justify-between gap-2.5 sm:gap-3">
          <NavbarBrandAnchor onTabClick={handleTabClick} />

          {/* Desktop Navigation Links with Sliding Active Pill */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-alabaster rounded-full border border-hairline">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleTabClick(link.id)}
                className={`relative px-3.5 py-1.5 text-xs font-mono font-semibold rounded-full transition-colors duration-150 whitespace-nowrap z-10 active:scale-95 ${
                  activeTab === link.id ? 'text-white' : 'text-charcoal hover:text-forest'
                }`}
              >
                {activeTab === link.id && (
                  <motion.span
                    layoutId="activePill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    className="absolute inset-0 bg-forest rounded-full -z-10 shadow-sm"
                  />
                )}
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Island & Mobile Triggers */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 pr-0.5">
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-alabaster border border-hairline rounded-full text-forest font-mono text-[10px] font-semibold">
              <Radio className="h-2.5 w-2.5 animate-pulse text-forest" />
              <span>Buka • 08-18 WIB</span>
            </div>

            <div className="flex lg:hidden items-center gap-1 px-2 py-1 bg-sage-light border border-sage-border rounded-full text-forest font-mono text-[9px] font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-forest animate-pulse" />
              <span>Buka</span>
            </div>

            <button
              type="button"
              onClick={openWhatsApp}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono font-bold bg-forest text-white hover:bg-forest-light border border-forest rounded-full transition-all hover:scale-105 active:scale-95 shadow-sm"
            >
              <PhoneCall className="h-3 w-3" />
              <span>Hubungi Sales</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center border border-hairline bg-alabaster rounded-full text-charcoal md:hidden active:scale-90 transition-transform"
              aria-label="Buka navigasi menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileNavbarDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeTab={activeTab}
        onTabClick={handleTabClick}
        onWhatsApp={openWhatsApp}
        onResetCache={handleResetCache}
        navLinks={navLinks}
      />
    </>
  );
};
