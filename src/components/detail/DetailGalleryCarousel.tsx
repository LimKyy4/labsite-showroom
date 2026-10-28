import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { CarStatusBadge } from '../common/CarStatusBadge';
import { CarStatus } from '../../types/showroom';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
];

interface DetailGalleryCarouselProps {
  images?: string[];
  title?: string;
  status?: CarStatus;
}

export const DetailGalleryCarousel: React.FC<DetailGalleryCarouselProps> = ({
  images,
  title = 'Kendaraan Showroom',
  status = 'Tersedia',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const safeImages = Array.isArray(images) && images.length >= 4 ? images : FALLBACK_IMAGES;
  const viewLabels = ['Eksterior Depan', 'Tampak Samping', 'Kokpit Kemudi', 'Ruang Mesin'];

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % safeImages.length);
  };

  return (
    <div className="space-y-3.5">
      {/* Frame Foto Utama */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-hairline border border-hairline group select-none">
        <img
          src={safeImages[currentIndex] || safeImages[0]}
          alt={`${title} - ${viewLabels[currentIndex] || 'Sudut Pandang Mobil'}`}
          className="h-full w-full object-cover transition-transform duration-300"
        />

        <div className="absolute top-4 left-4 z-10">
          <CarStatusBadge status={status} />
        </div>

        <div className="absolute top-4 right-4 z-10 bg-white/95 border border-hairline px-3 py-1 font-mono text-[11px] text-charcoal flex items-center gap-1.5 shadow-sm">
          <Eye className="h-3 w-3 text-forest" />
          <span className="font-semibold">{viewLabels[currentIndex] || `Sudut ${currentIndex + 1}`}</span>
        </div>

        {safeImages.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between p-3 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={prevImage}
              className="flex h-10 w-10 items-center justify-center bg-white text-charcoal border border-hairline hover:bg-forest hover:text-white transition-colors shadow-sm"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="flex h-10 w-10 items-center justify-center bg-white text-charcoal border border-hairline hover:bg-forest hover:text-white transition-colors shadow-sm"
              aria-label="Foto berikutnya"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="absolute bottom-4 right-4 bg-charcoal/85 text-white font-mono text-xs px-2.5 py-1">
          {currentIndex + 1} / {safeImages.length}
        </div>
      </div>

      {/* Barisan 4 Thumbnail Ternormalisasi Presisi */}
      <div className="grid grid-cols-4 gap-2.5">
        {safeImages.slice(0, 4).map((img, idx) => {
          const isActive = currentIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`group text-left border p-1 transition-all ${
                isActive
                  ? 'border-sage bg-sage-light/40 shadow-sm'
                  : 'border-hairline bg-white hover:border-muted'
              }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-hairline">
                <img
                  src={img}
                  alt={`Thumbnail ${viewLabels[idx]}`}
                  className={`h-full w-full object-cover transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-90'
                  }`}
                />
              </div>
              <span className={`block font-mono text-[10px] text-center pt-1.5 truncate ${
                isActive ? 'text-forest font-bold' : 'text-muted'
              }`}>
                {viewLabels[idx]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
