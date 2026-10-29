import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Menu, CarFront, Radio } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';
import { useScrollDirection } from '../../hooks/useScrollDirection';
import { useShowroomToast } from '../../hooks/useShowroomToast';
import { ActiveTab } from '../../types/showroom';
import { MobileNavbarDrawer } from './MobileNavbarDrawer';

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
    const text = encodeURIComponent('Halo labsite.id Showroom Bogor, saya ingin berkonsultasi mengenai unit mobil seken.');
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
      <header
        aria-label="Floating Dynamic Island Navbar"
        className={`fixed top-3 sm:top-5 inset-x-0 z-40 flex justify-center pointer-events-none transition-all duration-300 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-[120%] opacity-0'
        }`}
      >
        <div className="pointer-events-auto w-[94%] max-w-5xl rounded-full bg-white/85 backdrop-blur-xl border border-gray-200/80 px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg flex items-center justify-between gap-3 select-none">
          <button type="button" onClick={() => handleTabClick('home')} className="flex items-center gap-2.5 text-left focus:outline-none shrink-0 group pl-1">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center bg-forest text-white rounded-full group-hover:scale-105 transition-transform">
              <CarFront className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xs sm:text-sm font-bold tracking-tight text-charcoal leading-none">SHOWROOM<span className="text-forest">.BOGOR</span></span>
              <span className="text-[9px] tracking-wider font-mono text-muted uppercase mt-0.5">by labsite.id</span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1 p-1 bg-alabaster/80 rounded-full border border-hairline/70">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleTabClick(link.id)}
                className={`relative px-3.5 py-1.5 text-xs font-mono font-semibold rounded-full transition-colors duration-150 whitespace-nowrap z-10 ${
                  activeTab === link.id ? 'text-white' : 'text-charcoal hover:text-forest'
                }`}
              >
                {activeTab === link.id && (
                  <motion.span layoutId="activePill" transition={{ type: 'spring', stiffness: 450, damping: 35 }} className="absolute inset-0 bg-forest rounded-full -z-10 shadow-sm" />
                )}
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0 pr-1">
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-alabaster/90 border border-hairline rounded-full text-forest font-mono text-[10px] font-semibold">
              <Radio className="h-2.5 w-2.5 animate-pulse text-forest" />
              <span>Buka • 08-18 WIB</span>
            </div>
            <button
              type="button"
              onClick={openWhatsApp}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono font-bold bg-forest text-white hover:bg-forest-light border border-forest rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
            >
              <PhoneCall className="h-3 w-3" />
              <span>Hubungi Sales</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center border border-hairline bg-alabaster rounded-full text-charcoal md:hidden"
              aria-label="Buka navigasi"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

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
