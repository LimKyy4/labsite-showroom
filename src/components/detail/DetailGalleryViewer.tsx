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
  const { showToast } = useShowroomToast();

  const safeImages = Array.isArray(images) && images.length >= 4 ? images : FALLBACK_IMAGES;
  const viewLabels = ['Eksterior Depan', 'Tampak Samping', 'Kokpit Interior', 'Ruang Mesin'];

  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % safeImages.length);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Tautan Disalin', `Tautan spesifikasi unit ${title} telah disalin ke clipboard.`);
  };

  return (
    <div className="space-y-3 select-none">
      {/* Viewport Utama 16:9 Sinematik */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-hairline border border-hairline group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={safeImages[currentIndex] || safeImages[0]}
            alt={`${title} - ${viewLabels[currentIndex]}`}
            initial={{ opacity: 0.7, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.7, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute top-3 left-3 z-10">
          <CarStatusBadge status={status} />
        </div>

        {/* Tombol Aksi Cepat: Perbesar & Bagikan */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="h-8 px-2.5 bg-canvas/95 hover:bg-forest hover:text-white text-charcoal border border-hairline font-mono text-[11px] font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            title="Perbesar Foto (Fullscreen Viewport)"
          >
            <Maximize2 className="h-3 w-3" />
            <span className="hidden sm:inline">Perbesar</span>
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="h-8 w-8 flex items-center justify-center bg-canvas/95 hover:bg-forest hover:text-white text-charcoal border border-hairline transition-colors shadow-sm"
            title="Bagikan Spesifikasi Unit"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Sudut Pandang Overlay Tag */}
        <div className="absolute bottom-3 left-3 bg-charcoal/85 text-white font-mono text-xs px-2.5 py-1 flex items-center gap-1.5">
          <Eye className="h-3 w-3 text-emerald-400" />
          <span>{viewLabels[currentIndex] || `Sudut ${currentIndex + 1}`}</span>
        </div>

        {/* Navigasi Kiri / Kanan */}
        {safeImages.length > 1 && (
          <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between pointer-events-none">
            <button
              type="button"
              onClick={prevImage}
              className="pointer-events-auto h-9 w-9 flex items-center justify-center bg-canvas/90 text-charcoal border border-hairline hover:bg-forest hover:text-white transition-colors shadow-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="pointer-events-auto h-9 w-9 flex items-center justify-center bg-canvas/90 text-charcoal border border-hairline hover:bg-forest hover:text-white transition-colors shadow-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* 4 Thumbnail Switcher Modern dengan Garis Aktif Forest Green */}
      <div className="grid grid-cols-4 gap-2">
        {safeImages.slice(0, 4).map((img, idx) => {
          const isActive = currentIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative text-left border p-1 transition-all ${
                isActive ? 'border-forest bg-sage-light' : 'border-hairline bg-canvas hover:border-muted'
              }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-hairline">
                <img src={img} alt={`Thumbnail ${viewLabels[idx]}`} className="h-full w-full object-cover" />
              </div>
              <span className={`block font-mono text-[10px] text-center pt-1 truncate ${
                isActive ? 'text-forest font-bold' : 'text-muted'
              }`}>
                {viewLabels[idx]}
              </span>
              {isActive && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-forest" />}
            </button>
          );
        })}
      </div>

      {/* Fullscreen Viewport Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setIsFullscreen(false)}>
            <button type="button" onClick={() => setIsFullscreen(false)} className="absolute top-5 right-5 h-10 w-10 flex items-center justify-center text-white bg-charcoal border border-hairline">
              <X className="h-5 w-5" />
            </button>
            <img src={safeImages[currentIndex]} alt="Fullscreen" className="max-h-[85vh] max-w-[90vw] object-contain border border-hairline" onClick={(e) => e.stopPropagation()} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
