import React, { useState, useEffect, useRef } from 'react';
import { PhoneCall, Menu, X, CarFront, Radio } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';
import { ActiveTab } from '../../types/showroom';

export const Navbar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeTab, setActiveTab } = useShowroomStore();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 40) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 6) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current && lastScrollY.current - currentScrollY > 6) {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <>
      <header
        aria-label="Navigasi Utama Melayang"
        className={`fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl transition-all duration-300 ease-out pointer-events-none ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-28 opacity-0'
        }`}
      >
        <div className="pointer-events-auto bg-white border border-hairline px-3 sm:px-4 py-2 sm:py-2.5 shadow-sm flex items-center justify-between gap-3 sm:gap-4">
          {/* Zona Kiri: Identitas Showroom */}
          <button
            type="button"
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none shrink-0"
          >
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center bg-forest text-white">
              <CarFront className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-sm sm:text-base font-bold tracking-tight text-charcoal leading-none">
                SHOWROOM<span className="text-forest">.BOGOR</span>
              </span>
              <span className="text-[9px] tracking-wider font-mono text-muted uppercase mt-0.5">
                by labsite.id
              </span>
            </div>
          </button>

          {/* Zona Tengah: Menu Tautan Kapsul */}
          <nav className="hidden md:flex items-center justify-center gap-1 sm:gap-1.5 flex-1 max-w-md mx-auto">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleTabClick(link.id)}
                  className={`px-3 py-1.5 text-xs font-mono transition-all duration-150 border whitespace-nowrap ${
                    isActive
                      ? 'border-forest bg-sage-light text-forest font-bold'
                      : 'border-transparent text-charcoal hover:bg-alabaster hover:border-hairline'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zona Kanan: Status Operasional & Tombol Aksi */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 bg-alabaster border border-hairline text-forest font-mono text-[10px] font-semibold whitespace-nowrap">
              <Radio className="h-2.5 w-2.5 animate-pulse text-forest" />
              <span>Buka • 08-18 WIB</span>
            </div>

            <button
              type="button"
              onClick={openWhatsApp}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold bg-forest text-white hover:bg-forest-light border border-forest transition-colors whitespace-nowrap"
            >
              <PhoneCall className="h-3 w-3" />
              <span>Hubungi Sales</span>
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center border border-hairline bg-alabaster text-charcoal md:hidden"
              aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-charcoal/60" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="fixed top-20 left-4 right-4 bg-white border border-hairline p-4 shadow-2xl space-y-2"
            onClick={(e) => e.stopPropagation()}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleTabClick(link.id)}
                className={`block w-full text-left px-3.5 py-2.5 text-xs font-mono font-semibold border ${
                  activeTab === link.id
                    ? 'border-forest bg-sage-light text-forest'
                    : 'border-hairline bg-alabaster text-charcoal'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={openWhatsApp}
              className="w-full mt-2 py-2.5 px-3 text-xs font-mono font-bold bg-forest text-white flex items-center justify-center gap-2 border border-forest"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Chat WhatsApp Sales Bogor</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
