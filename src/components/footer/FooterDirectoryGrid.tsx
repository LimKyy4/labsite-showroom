import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';

export const FooterDirectoryGrid: React.FC = () => {
  const { setActiveTab } = useShowroomStore();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    inventaris: true,
    jaminan: false,
    fasilitas: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNav = (tab: 'inventory' | 'about' | 'contact') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {/* Kolom 1: Inventaris Unggulan */}
      <div className="border border-hairline sm:border-0 bg-canvas sm:bg-transparent p-3 sm:p-0">
        <button
          type="button"
          onClick={() => toggleSection('inventaris')}
          className="w-full flex items-center justify-between sm:cursor-default text-left pb-1 sm:border-b sm:border-hairline"
        >
          <h4 className="font-mono text-xs uppercase tracking-wider text-forest font-bold">
            Inventaris Unggulan
          </h4>
          <ChevronDown
            className={`h-4 w-4 text-forest sm:hidden transition-transform ${
              openSections.inventaris ? 'rotate-180' : ''
            }`}
          />
        </button>
        <ul className={`space-y-2 text-xs font-body pt-2 sm:pt-3 ${openSections.inventaris ? 'block' : 'hidden sm:block'}`}>
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
      <div className="border border-hairline sm:border-0 bg-canvas sm:bg-transparent p-3 sm:p-0">
        <button
          type="button"
          onClick={() => toggleSection('jaminan')}
          className="w-full flex items-center justify-between sm:cursor-default text-left pb-1 sm:border-b sm:border-hairline"
        >
          <h4 className="font-mono text-xs uppercase tracking-wider text-forest font-bold">
            Jaminan & Legalitas
          </h4>
          <ChevronDown
            className={`h-4 w-4 text-forest sm:hidden transition-transform ${
              openSections.jaminan ? 'rotate-180' : ''
            }`}
          />
        </button>
        <ul className={`space-y-2 text-xs font-body pt-2 sm:pt-3 ${openSections.jaminan ? 'block' : 'hidden sm:block'}`}>
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
      <div className="border border-hairline sm:border-0 bg-canvas sm:bg-transparent p-3 sm:p-0">
        <button
          type="button"
          onClick={() => toggleSection('fasilitas')}
          className="w-full flex items-center justify-between sm:cursor-default text-left pb-1 sm:border-b sm:border-hairline"
        >
          <h4 className="font-mono text-xs uppercase tracking-wider text-forest font-bold">
            Fasilitas & Layanan
          </h4>
          <ChevronDown
            className={`h-4 w-4 text-forest sm:hidden transition-transform ${
              openSections.fasilitas ? 'rotate-180' : ''
            }`}
          />
        </button>
        <ul className={`space-y-2 text-xs font-body pt-2 sm:pt-3 ${openSections.fasilitas ? 'block' : 'hidden sm:block'}`}>
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
