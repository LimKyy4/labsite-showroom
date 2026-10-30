import React, { useState } from 'react';
import { PhoneCall, ArrowRight, ShieldCheck } from 'lucide-react';
import { CarUnit } from '../../types/showroom';
import { CardMediaViewer } from './CardMediaViewer';
import { RollingCounter } from '../common/RollingCounter';
import { useShowroomStore } from '../../store/useShowroomStore';
import { useShowroomToast } from '../../hooks/useShowroomToast';
import { useTiltEffect } from '../../hooks/useTiltEffect';

interface InventoryCardItemProps {
  car: CarUnit;
}

export const InventoryCardItem: React.FC<InventoryCardItemProps> = ({ car }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const { setSelectedCarId, setActiveTab, setQuickPeekCar } = useShowroomStore();
  const { showToast } = useShowroomToast();
  const { ref, style, sheenPos, onMouseMove, onMouseLeave } = useTiltEffect({ maxTilt: 6, scale: 1.012 });

  const isSold = car.status === 'Terjual';
  const photos = car.images?.length > 0 ? car.images : [];

  const handleOpenDetail = () => {
    setSelectedCarId(car.id);
    setActiveTab('detail');
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(`${window.location.origin}/#unit-${car.id}`);
    showToast('Tautan Disalin', `Informasi unit ${car.title} berhasil disalin.`);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(`Halo labsite.id Bogor, saya ingin bertanya unit ${car.title} (${car.plateNumber}).`);
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  return (
    <article
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={handleOpenDetail}
      className={`group cursor-pointer relative border border-hairline bg-canvas flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-sage select-none overflow-hidden ${
        isSold ? 'opacity-60 bg-alabaster' : ''
      }`}
    >
      {/* Specular Sheen Tracker */}
      <div
        style={{
          left: `${sheenPos.x}%`,
          top: `${sheenPos.y}%`,
          opacity: sheenPos.opacity * 0.12,
          transform: 'translate(-50%, -50%)',
        }}
        className="absolute w-40 h-40 bg-white rounded-full pointer-events-none blur-lg z-20"
      />

      <div>
        <CardMediaViewer
          car={car}
          photoIndex={photoIndex}
          onPrev={(e) => { e.stopPropagation(); setPhotoIndex((photoIndex - 1 + photos.length) % photos.length); }}
          onNext={(e) => { e.stopPropagation(); setPhotoIndex((photoIndex + 1) % photos.length); }}
          onShare={handleShare}
          onQuickPeek={(e) => { e.stopPropagation(); setQuickPeekCar(car); }}
        />

        <div className="p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span className="font-bold text-charcoal">{car.plateNumber}</span>
            <span className="flex items-center gap-1 text-forest font-bold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>160 Titik</span>
            </span>
          </div>

          <h3 className="font-heading text-base font-bold text-charcoal leading-snug group-hover:text-forest transition-colors truncate">
            {car.title}
          </h3>

          {/* 3-Column Telemetry Specs with Rolling Odometer */}
          <div className="grid grid-cols-3 gap-1.5 text-[11px] font-mono text-charcoal pt-1">
            <div className="bg-alabaster border border-hairline p-1.5 text-center">
              <span className="block text-[9px] text-muted">TAHUN</span>
              <span className="font-bold">{car.year}</span>
            </div>
            <div className="bg-alabaster border border-hairline p-1.5 text-center">
              <span className="block text-[9px] text-muted">TRANSMISI</span>
              <span className="font-bold truncate block">{car.transmission}</span>
            </div>
            <div className="bg-alabaster border border-hairline p-1.5 text-center">
              <span className="block text-[9px] text-muted">ODOMETER</span>
              <RollingCounter value={car.mileage} suffix=" KM" className="font-bold truncate block" />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing & Tactile Action Buttons */}
      <div className="p-4 sm:p-5 pt-0 space-y-3 border-t border-hairline/60">
        <div className="pt-2">
          <span className="font-mono text-[9px] uppercase text-muted tracking-wider block">Harga Tunai OTR Bogor</span>
          <span className="font-heading text-lg sm:text-xl font-bold text-forest block">
            <RollingCounter value={car.price} prefix="Rp " />
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleOpenDetail}
            className="py-2.5 px-2 bg-canvas text-charcoal font-mono text-xs font-bold border border-hairline hover:bg-charcoal hover:text-white hover:border-charcoal transition-all flex items-center justify-center gap-1 shadow-sm active:scale-95"
          >
            <span>Detail</span>
            <ArrowRight className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={handleWhatsApp}
            disabled={isSold}
            className="py-2.5 px-2 bg-forest text-white font-mono text-xs font-bold hover:bg-forest-light border border-forest transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 shadow-sm active:scale-95"
          >
            <PhoneCall className="h-3 w-3" />
            <span>{isSold ? 'Terjual' : 'Tanya WA'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
