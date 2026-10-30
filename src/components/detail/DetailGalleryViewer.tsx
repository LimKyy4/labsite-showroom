import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, Maximize2, Share2, X } from 'lucide-react';
import { CarStatusBadge } from '../common/CarStatusBadge';
import { CarStatus } from '../../types/showroom';
import { useShowroomToast } from '../../hooks/useShowroomToast';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
];

interface DetailGalleryViewerProps {
  images?: string[];
  title?: string;
  status?: CarStatus;
}

export const DetailGalleryViewer: React.FC<DetailGalleryViewerProps> = ({
  images,
  title = 'Unit Kendaraan Showroom',
  status = 'Tersedia',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const { showToast } = useShowroomToast();

  const safeImages = Array.isArray(images) && images.length >= 4 ? images : FALLBACK_IMAGES;
  const viewLabels = ['Depan 3/4', 'Samping', 'Interior', 'Ruang Mesin'];

  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % safeImages.length);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextImage();
      else prevImage();
    }
    setTouchStartX(null);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Tautan Disalin', `Tautan spesifikasi unit ${title} telah disalin.`);
  };

  return (
    <div className="space-y-3 select-none">
      {/* 16:9 Adaptive Viewport */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative aspect-[16/9] w-full overflow-hidden bg-alabaster border border-hairline group touch-pan-y shadow-sm"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={safeImages[currentIndex] || safeImages[0]}
            alt={`${title} - ${viewLabels[currentIndex] || 'Foto Unit'}`}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.8 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute top-3 left-3 z-10"><CarStatusBadge status={status} size="sm" /></div>
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="h-8 px-2.5 bg-canvas/95 hover:bg-forest hover:text-white text-charcoal border border-hairline font-mono text-[11px] font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-colors"
          >
            <Maximize2 className="h-3 w-3" /><span className="hidden sm:inline">Perbesar</span>
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="h-8 w-8 flex items-center justify-center bg-canvas/95 hover:bg-forest hover:text-white text-charcoal border border-hairline shadow-sm active:scale-95 transition-colors"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="absolute bottom-3 left-3 bg-charcoal/85 text-white font-mono text-[11px] px-2.5 py-1 flex items-center gap-1.5">
          <Eye className="h-3 w-3 text-emerald-400" />
          <span>{viewLabels[currentIndex] || `Foto ${currentIndex + 1}`}</span>
        </div>

        {/* Desktop Navigation Arrows Only (Hidden on Mobile) */}
        {safeImages.length > 1 && (
          <div className="hidden sm:flex absolute inset-y-0 inset-x-2 items-center justify-between pointer-events-none">
            <button type="button" onClick={prevImage} className="pointer-events-auto h-8 w-8 flex items-center justify-center bg-canvas/90 text-charcoal border border-hairline hover:bg-forest hover:text-white shadow-sm active:scale-90 transition-colors"><ChevronLeft className="h-4 w-4" /></button>
            <button type="button" onClick={nextImage} className="pointer-events-auto h-8 w-8 flex items-center justify-center bg-canvas/90 text-charcoal border border-hairline hover:bg-forest hover:text-white shadow-sm active:scale-90 transition-colors"><ChevronRight className="h-4 w-4" /></button>
          </div>
        )}
      </div>

      {/* Mobile Dot Indicators */}
      <div className="flex sm:hidden justify-center items-center gap-1.5 py-1">
        {safeImages.slice(0, 4).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-200 h-1.5 rounded-full ${currentIndex === idx ? 'w-6 bg-forest' : 'w-1.5 bg-hairline'}`}
            aria-label={`Lihat foto ${idx + 1}`}
          />
        ))}
      </div>

      {/* 4-Thumbnail Rail */}
      <div className="grid grid-cols-4 gap-2">
        {safeImages.slice(0, 4).map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`relative text-left border p-1 transition-all active:scale-95 ${currentIndex === idx ? 'border-forest bg-sage-light' : 'border-hairline bg-canvas hover:border-muted'}`}
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-hairline"><img src={img} alt={`Thumb ${viewLabels[idx]}`} className="h-full w-full object-cover" /></div>
            <span className={`block font-mono text-[9px] sm:text-[10px] text-center pt-1 truncate ${currentIndex === idx ? 'text-forest font-bold' : 'text-muted'}`}>{viewLabels[idx]}</span>
            {currentIndex === idx && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-forest" />}
          </button>
        ))}
      </div>

      {/* Lightbox Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setIsFullscreen(false)}>
            <button type="button" onClick={() => setIsFullscreen(false)} className="absolute top-5 right-5 h-10 w-10 flex items-center justify-center text-white bg-charcoal border border-hairline"><X className="h-5 w-5" /></button>
            <img src={safeImages[currentIndex]} alt="Fullscreen" className="max-h-[85vh] max-w-[90vw] object-contain border border-hairline" onClick={(e) => e.stopPropagation()} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
