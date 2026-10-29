import React from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';

export const FooterBottomBar: React.FC = () => {
  const { setActiveTab } = useShowroomStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-8 border-t border-hairline flex flex-col md:flex-row items-center justify-between text-xs text-muted gap-4">
      {/* Hak Cipta & Brand Identity */}
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-forest shrink-0" />
        <p className="font-body text-[11px] sm:text-xs">
          &copy; 2026 <span className="font-bold text-charcoal">SHOWROOM.BOGOR</span> by labsite.id. Seluruh hak cipta dilindungi.
        </p>
      </div>

      {/* Tautan Legal Editorial */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-[11px]">
        <button
          type="button"
          onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="hover:text-forest transition-colors"
        >
          Kebijakan Privasi
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="hover:text-forest transition-colors"
        >
          Ketentuan Garansi 1 Tahun
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="hover:text-forest transition-colors"
        >
          Sitemap Lokasi
        </button>
      </div>

      {/* Tactile Back to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-canvas border border-hairline text-charcoal hover:text-white hover:bg-forest hover:border-forest rounded-full font-mono text-[11px] font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm group"
        title="Kembali ke Bagian Atas Halaman"
      >
        <span>Kembali ke Atas</span>
        <ArrowUp className="h-3.5 w-3.5 text-forest group-hover:text-white transition-colors" />
      </button>
    </div>
  );
};
