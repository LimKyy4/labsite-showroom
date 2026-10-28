import React, { useState } from 'react';
import { Share2, PhoneCall, ChevronLeft, ChevronRight } from 'lucide-react';
import { CarUnit } from '../../types/showroom';
import { CarStatusBadge } from '../common/CarStatusBadge';
import { Button } from '../ui/button';
import { useShowroomStore } from '../../store/useShowroomStore';
import { CarSpecsGrid } from './CarSpecsGrid';

interface CarCardProps {
  car: CarUnit;
}

export const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { setCarStatus, addToast } = useShowroomStore();

  const isSold = car.status === 'Terjual';

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/#unit-${car.id}`;
    navigator.clipboard.writeText(url).finally(() => {
      addToast('Tautan Disalin', `Tautan spesifikasi unit ${car.title} telah tersalin.`);
    });
  };

  const handleWhatsApp = () => {
    const text = `Halo admin, saya tertarik dengan unit ${car.title} tahun ${car.year} yang tertera di Beranda.`;
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(text)}`, '_blank');
  };

  const cycleStatus = () => {
    const statuses: ('Tersedia' | 'Terpesan' | 'Terjual')[] = ['Tersedia', 'Terpesan', 'Terjual'];
    const nextStatus = statuses[(statuses.indexOf(car.status) + 1) % statuses.length];
    setCarStatus(car.id, nextStatus);
    addToast('Status Diperbarui', `Unit ${car.title} kini berstatus ${nextStatus}.`);
  };

  const formatRupiah = (num: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  return (
    <article
      id={`unit-${car.id}`}
      className={`group flex flex-col border border-hairline bg-canvas transition-all duration-200 ${
        isSold ? 'opacity-60 bg-alabaster' : 'hover:border-forest'
      }`}
    >
      {/* Mini Image Carousel */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-hairline select-none">
        <img
          src={car.images[activeImageIndex]}
          alt={`${car.title} foto ${activeImageIndex + 1}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 z-10">
          <CarStatusBadge status={car.status} />
        </div>

        <button
          type="button"
          onClick={cycleStatus}
          title="Klik untuk mengubah status inventaris secara langsung (Demo State)"
          className="absolute top-3 right-3 z-10 bg-canvas/90 hover:bg-forest hover:text-white text-charcoal border border-hairline px-2 py-1 text-[10px] font-mono tracking-wider uppercase transition-colors"
        >
          Ubah Status
        </button>

        {car.images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={prevImage}
              className="flex h-7 w-7 items-center justify-center bg-canvas text-charcoal border border-hairline hover:bg-forest hover:text-white"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="flex h-7 w-7 items-center justify-center bg-canvas text-charcoal border border-hairline hover:bg-forest hover:text-white"
              aria-label="Foto berikutnya"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {car.images.map((_, i) => (
            <span
              key={i}
              className={`h-1 transition-all ${
                activeImageIndex === i ? 'w-4 bg-white' : 'w-1.5 bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-muted font-mono">
            <span>{car.brand.toUpperCase()}</span>
            <span>{car.inspectionStatus}</span>
          </div>

          <h3 className="font-display text-base sm:text-lg font-bold text-charcoal tracking-tight line-clamp-1">
            {car.title}
          </h3>

          <CarSpecsGrid car={car} />
        </div>

        {/* Pricing & CTAs */}
        <div className="mt-6 pt-4 border-t border-hairline space-y-4">
          <div>
            <span className="text-[11px] font-mono uppercase text-muted tracking-wider block">
              Harga Tunai OTR Bogor
            </span>
            <span className="font-display text-xl sm:text-2xl font-extrabold text-forest tracking-tight">
              {formatRupiah(car.price)}
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleWhatsApp}
              disabled={isSold}
              aria-label={`Hubungi WhatsApp untuk unit ${car.title}`}
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>{isSold ? 'Unit Terjual' : 'Tanya Unit'}</span>
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={handleShare}
              aria-label={`Bagikan unit ${car.title}`}
              title="Bagikan Unit"
            >
              <Share2 className="h-3.5 w-3.5 text-charcoal" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};
