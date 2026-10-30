import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Share2, Eye } from 'lucide-react';
import { CarUnit } from '../../types/showroom';
import { CarStatusBadge } from '../common/CarStatusBadge';

interface CardMediaViewerProps {
  car: CarUnit;
  photoIndex: number;
  onPrev: (e: React.MouseEvent) => void;
  onNext: (e: React.MouseEvent) => void;
  onShare: (e: React.MouseEvent) => void;
  onQuickPeek: (e: React.MouseEvent) => void;
}

export const CardMediaViewer: React.FC<CardMediaViewerProps> = ({
  car,
  photoIndex,
  onPrev,
  onNext,
  onShare,
  onQuickPeek,
}) => {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const photos = car.images?.length > 0 ? car.images : [
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        onNext(e as unknown as React.MouseEvent);
      } else {
        onPrev(e as unknown as React.MouseEvent);
      }
    }
    setTouchStartX(null);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative aspect-[16/9] overflow-hidden bg-hairline select-none touch-pan-y"
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={photoIndex}
          src={photos[photoIndex]}
          alt={car.title}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.7 }}
          transition={{ duration: 0.2 }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
        />
      </AnimatePresence>

      {/* Floating Badges */}
      <div className="absolute top-2.5 left-2.5 z-10">
        <CarStatusBadge status={car.status} size="sm" />
      </div>

      <button
        type="button"
        onClick={onShare}
        className="absolute top-2.5 right-2.5 z-10 bg-canvas/90 hover:bg-forest hover:text-white text-charcoal border border-hairline p-1.5 transition-colors shadow-sm active:scale-90"
        title="Salin Tautan Unit"
      >
        <Share2 className="h-3 w-3" />
      </button>

      {/* Quick Peek Button */}
      <button
        type="button"
        onClick={onQuickPeek}
        className="absolute bottom-2.5 right-2.5 z-10 px-2 py-1 bg-white border border-hairline text-[10px] font-mono font-bold text-charcoal hover:bg-forest hover:text-white flex items-center gap-1 shadow-sm transition-colors active:scale-95"
      >
        <Eye className="h-3 w-3 text-forest" />
        <span>Intip Cepat</span>
      </button>

      {/* Micro Photo Carousel Buttons */}
      {photos.length > 1 && (
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 z-10">
          <button
            type="button"
            onClick={onPrev}
            className="h-6 w-6 flex items-center justify-center bg-canvas/90 hover:bg-forest hover:text-white border border-hairline text-charcoal transition-colors shadow-sm active:scale-90"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <span className="px-1.5 py-0.5 bg-canvas/90 border border-hairline text-[9px] font-mono font-bold text-charcoal">
            {photoIndex + 1}/{photos.length}
          </span>
          <button
            type="button"
            onClick={onNext}
            className="h-6 w-6 flex items-center justify-center bg-canvas/90 hover:bg-forest hover:text-white border border-hairline text-charcoal transition-colors shadow-sm active:scale-90"
            aria-label="Foto Selanjutnya"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
