import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { CarUnit } from '../../types/showroom';
import { useScrollDirection } from '../../hooks/useScrollDirection';

interface MobileBottomConversionBarProps {
  car: CarUnit;
}

export const MobileBottomConversionBar: React.FC<MobileBottomConversionBarProps> = ({ car }) => {
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [isExpanded, setIsExpanded] = useState(true);
  const isSold = car?.status === 'Terjual';
  const isScrollVisible = isAtTop || scrollDirection === 'up';

  const formatRupiah = (num: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Halo admin labsite, saya ingin konsultasi unit ${car?.title} (${car?.plateNumber}).`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  return (
    <motion.aside
      aria-label="Bilah Konversi Cepat Ponsel"
      initial={false}
      animate={{
        y: !isScrollVisible ? '120%' : isExpanded ? '0%' : 'calc(100% - 24px)',
        opacity: isScrollVisible ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
      style={{
        paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))',
      }}
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-hairline px-4 pt-3.5 shadow-2xl select-none"
    >
      {/* Manual Collapsible Toggle Handle */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-canvas border border-hairline text-charcoal hover:text-forest text-[10px] font-mono flex items-center gap-1 shadow-sm rounded-full active:scale-90 transition-transform"
        aria-label={isExpanded ? 'Ciutkan Bilah Harga' : 'Buka Bilah Harga'}
      >
        <ChevronDown
          className={`h-3 w-3 text-forest transition-transform duration-200 ${
            isExpanded ? '' : 'rotate-180'
          }`}
        />
        <span className="text-[9px] font-bold">{isExpanded ? 'Tutup' : 'Harga & Chat'}</span>
      </button>

      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="font-mono text-[9px] text-muted block uppercase tracking-wider">
            Harga Tunai OTR Bogor
          </span>
          <span className="font-heading text-lg font-bold text-forest leading-none">
            {formatRupiah(car?.price || 478000000)}
          </span>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleWhatsApp}
          disabled={isSold}
          className="px-4 py-2.5 h-10 active:scale-95 shadow-sm font-mono text-xs"
        >
          <PhoneCall className="h-4 w-4" />
          <span>{isSold ? 'Terjual' : 'Chat Sales WA'}</span>
        </Button>
      </div>
    </motion.aside>
  );
};
