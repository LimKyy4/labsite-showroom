import React from 'react';
import { PhoneCall } from 'lucide-react';
import { Button } from '../ui/button';
import { CarUnit } from '../../types/showroom';

interface MobileBottomConversionBarProps {
  car: CarUnit;
}

export const MobileBottomConversionBar: React.FC<MobileBottomConversionBarProps> = ({ car }) => {
  const isSold = car?.status === 'Terjual';
  const formatRupiah = (num: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Halo admin, saya ingin inspeksi unit ${car?.title} (${car?.plateNumber}).`);
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  return (
    <div
      aria-label="Bilah Konversi Cepat Ponsel"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-canvas border-t border-hairline p-3 shadow-2xl flex items-center justify-between gap-3"
    >
      <div>
        <span className="font-mono text-[10px] text-muted block uppercase">Harga Tunai OTR</span>
        <span className="font-heading text-lg font-bold text-forest leading-none">
          {formatRupiah(car?.price || 300000000)}
        </span>
      </div>

      <Button
        variant="primary"
        size="sm"
        onClick={handleWhatsApp}
        disabled={isSold}
        className="px-4 py-2.5"
      >
        <PhoneCall className="h-4 w-4" />
        <span>{isSold ? 'Terjual' : 'Chat WA'}</span>
      </Button>
    </div>
  );
};
