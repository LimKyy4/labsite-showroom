import React from 'react';
import { CarFront, Phone, MessageCircle } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';

export const MobileBottomDock: React.FC = () => {
  const { activeTab, setActiveTab } = useShowroomStore();

  const openWhatsApp = () => {
    const text = encodeURIComponent('Halo admin labsite showroom Bogor, saya ingin bertanya unit mobil ready.');
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  return (
    <div
      aria-label="Bilah Aksi Cepat Jempol"
      className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-forest text-white border border-sage-border shadow-2xl p-1.5 flex items-center justify-around"
    >
      <button
        type="button"
        onClick={() => setActiveTab('inventory')}
        className={`flex-1 py-2 px-2 flex flex-col items-center justify-center gap-1 transition-colors ${
          activeTab === 'inventory' ? 'bg-forest-dark text-white font-bold' : 'text-sage-light hover:text-white'
        }`}
      >
        <CarFront className="h-4 w-4" />
        <span className="font-mono text-[10px] tracking-wider uppercase">Katalog Stok</span>
      </button>

      <div className="h-6 w-px bg-forest-light shrink-0" />

      <a
        href="tel:+6281234567890"
        className="flex-1 py-2 px-2 flex flex-col items-center justify-center gap-1 text-sage-light hover:text-white transition-colors"
      >
        <Phone className="h-4 w-4" />
        <span className="font-mono text-[10px] tracking-wider uppercase">Telepon</span>
      </a>

      <div className="h-6 w-px bg-forest-light shrink-0" />

      <button
        type="button"
        onClick={openWhatsApp}
        className="flex-1 py-2 px-2 flex flex-col items-center justify-center gap-1 bg-sage-light text-forest font-bold hover:bg-white transition-colors"
      >
        <MessageCircle className="h-4 w-4" />
        <span className="font-mono text-[10px] tracking-wider uppercase">Chat WA</span>
      </button>
    </div>
  );
};
