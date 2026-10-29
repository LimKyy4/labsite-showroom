import React from 'react';
import { useShowroomStore } from '../../store/useShowroomStore';

export const FooterDirectoryGrid: React.FC = () => {
  const { setActiveTab } = useShowroomStore();

  const handleNav = (tab: 'inventory' | 'about' | 'contact') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
      {/* Kolom 1: Inventaris Unggulan */}
      <div className="space-y-3">
        <h4 className="font-mono text-xs uppercase tracking-wider text-forest font-bold pb-1 border-b border-hairline">
          Inventaris Unggulan
        </h4>
        <ul className="space-y-2 text-xs font-body text-charcoal">
          <li>
            <button type="button" onClick={() => handleNav('inventory')} className="text-left text-muted hover:text-forest transition-colors">
              SUV & MPV Keluarga Bogor
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleNav('inventory')} className="text-left text-muted hover:text-forest transition-colors">
              Unit Siap Pakai Lolos Uji
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleNav('inventory')} className="text-left text-muted hover:text-forest transition-colors">
              Mobil Berplat F Asli
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleNav('inventory')} className="text-left text-muted hover:text-forest transition-colors">
              Transmisi Otomatis Siap Macet
            </button>
          </li>
        </ul>
      </div>

      {/* Kolom 2: Jaminan & Legalitas */}
      <div className="space-y-3">
        <h4 className="font-mono text-xs uppercase tracking-wider text-forest font-bold pb-1 border-b border-hairline">
          Jaminan & Legalitas
        </h4>
        <ul className="space-y-2 text-xs font-body text-charcoal">
          <li>
            <button type="button" onClick={() => handleNav('about')} className="text-left text-muted hover:text-forest transition-colors">
              Sertifikat Inspeksi 160 Titik
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleNav('about')} className="text-left text-muted hover:text-forest transition-colors">
              Jaminan Buyback 100% Sasis
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleNav('about')} className="text-left text-muted hover:text-forest transition-colors">
              Mitra Samsat Polda Jabar
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleNav('about')} className="text-left text-muted hover:text-forest transition-colors">
              Garansi Mesin 365 Hari
            </button>
          </li>
        </ul>
      </div>

      {/* Kolom 3: Fasilitas & Layanan */}
      <div className="space-y-3">
        <h4 className="font-mono text-xs uppercase tracking-wider text-forest font-bold pb-1 border-b border-hairline">
          Fasilitas & Layanan
        </h4>
        <ul className="space-y-2 text-xs font-body text-charcoal">
          <li>
            <button type="button" onClick={() => handleNav('contact')} className="text-left text-muted hover:text-forest transition-colors">
              Simulasi Kredit 5 Leasing
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleNav('contact')} className="text-left text-muted hover:text-forest transition-colors">
              Bengkel Rekanan Pajajaran
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleNav('contact')} className="text-left text-muted hover:text-forest transition-colors">
              Layanan Towing Darurat Gratis
            </button>
          </li>
          <li>
            <button type="button" onClick={() => handleNav('contact')} className="text-left text-muted hover:text-forest transition-colors">
              Layanan Balik Nama Dokumen
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
