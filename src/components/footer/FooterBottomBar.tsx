import React from 'react';
import { ArrowUp, ShieldCheck, RotateCcw } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';
import { useShowroomToast } from '../../hooks/useShowroomToast';

export const FooterBottomBar: React.FC = () => {
  const { setActiveTab, resetToInitialData } = useShowroomStore();
  const { showToast } = useShowroomToast();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="pt-8 border-t border-hairline flex flex-col md:flex-row items-center justify-between text-xs text-muted gap-5 text-center md:text-left">
      {/* Hak Cipta & Brand Identity */}
      <div className="flex items-center justify-center md:justify-start gap-2">
        <ShieldCheck className="h-4 w-4 text-forest shrink-0" />
        <p className="font-body text-[11px] sm:text-xs text-charcoal">
          &copy; 2026 <span className="font-bold text-forest">SHOWROOM.BOGOR</span> by Labsite Showroom. Seluruh hak cipta dilindungi.
        </p>
      </div>

      {/* Tautan Legal Editorial */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-mono text-[11px]">
        <button
          type="button"
          onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="hover:text-forest transition-colors py-1 px-1.5"
        >
          Kebijakan Privasi
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="hover:text-forest transition-colors py-1 px-1.5"
        >
          Ketentuan Garansi 1 Tahun
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="hover:text-forest transition-colors py-1 px-1.5"
        >
          Sitemap Lokasi
        </button>
        <button
          type="button"
          onClick={handleResetCache}
          className="md:hidden text-muted hover:text-forest transition-colors flex items-center gap-1 py-1 px-1.5"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset Cache</span>
        </button>
      </div>

      {/* Tactile Back to Top Button - Centered on mobile */}
      <div className="w-full md:w-auto flex justify-center">
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 sm:px-3.5 sm:py-1.5 bg-canvas border border-hairline text-charcoal hover:text-white hover:bg-forest hover:border-forest rounded-full font-mono text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm group"
          title="Kembali ke Bagian Atas Halaman"
        >
          <span>Kembali ke Atas</span>
          <ArrowUp className="h-3.5 w-3.5 text-forest group-hover:text-white transition-colors" />
        </button>
      </div>
    </div>
  );
};
