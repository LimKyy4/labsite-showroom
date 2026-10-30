import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowRight, PhoneCall, Share2 } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';
import { useShowroomToast } from '../../hooks/useShowroomToast';
import { CarStatusBadge } from '../common/CarStatusBadge';
import { RollingCounter } from '../common/RollingCounter';
import { CarUnit } from '../../types/showroom';

export const FeaturedCarsSection: React.FC = () => {
  const { cars, setSelectedCarId, setActiveTab, setQuickPeekCar } = useShowroomStore();
  const { showToast } = useShowroomToast();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const featuredCars = cars.filter((c) => c.isFeatured).slice(0, 3);

  const handleOpenDetail = (carId: string) => {
    setSelectedCarId(carId);
    setActiveTab('detail');
  };

  const handleShare = (car: CarUnit, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    showToast('Tautan Disalin', `Informasi unit ${car.title} berhasil disalin ke clipboard.`);
  };

  const handleWhatsApp = (car: CarUnit, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(`Halo labsite.id Bogor, saya tertarik dengan unit ${car.title} OTR Rp ${car.price.toLocaleString('id-ID')}.`);
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  const handleScrollSnap = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const cardWidth = el.scrollWidth / featuredCars.length;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveCardIndex(Math.max(0, Math.min(featuredCars.length - 1, idx)));
  };

  return (
    <section className="py-16 sm:py-20 bg-alabaster border-b border-hairline select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-hairline pb-6">
          <div>
            <span className="text-[11px] font-mono tracking-widest text-forest uppercase font-bold">UNIT REKOMENDASI TERBAIK</span>
            <h2 className="font-heading text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold text-charcoal tracking-tight">KOLEKSI UNGGULAN SIAP PAKAI.</h2>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('inventory')}
            className="px-4 py-2 border border-forest text-forest font-mono text-xs font-bold hover:bg-forest hover:text-white transition-colors flex items-center gap-2 self-start sm:self-auto active:scale-95 shadow-sm"
          >
            <span>Semua Katalog (18 Unit)</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile Horizontal Snap Card Rail / Desktop 3-Col Grid */}
        <div
          onScroll={handleScrollSnap}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:grid md:grid-cols-3 md:gap-6 no-scrollbar pb-2"
        >
          {featuredCars.map((car, idx) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className={`shrink-0 w-[84vw] sm:w-[320px] md:w-auto snap-center bg-canvas border border-hairline hover:border-forest transition-all flex flex-col justify-between group ${car.status === 'Terjual' ? 'opacity-60' : ''}`}
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-hairline cursor-pointer" onClick={() => handleOpenDetail(car.id)}>
                  <img src={car.images[0]} alt={car.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3"><CarStatusBadge status={car.status} size="sm" /></div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setQuickPeekCar(car); }}
                    className="absolute bottom-3 right-3 px-2.5 py-1 bg-canvas/90 hover:bg-canvas text-charcoal border border-hairline text-[11px] font-mono font-semibold flex items-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <Eye className="h-3 w-3 text-forest" />
                    <span>Intip Cepat</span>
                  </button>
                </div>
                <div className="p-4 sm:p-5 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-muted uppercase block">{car.brand} • {car.year} • Plat F Bogor</span>
                    <h3 onClick={() => handleOpenDetail(car.id)} className="font-heading text-base font-bold text-charcoal hover:text-forest cursor-pointer transition-colors truncate mt-0.5">
                      {car.title}
                    </h3>
                  </div>
                  <div className="flex items-baseline justify-between border-y border-hairline py-2">
                    <RollingCounter value={car.price} prefix="Rp " className="font-mono text-lg font-bold text-forest" />
                    <RollingCounter value={car.mileage} suffix=" KM" className="text-xs font-mono text-muted" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-muted">
                    <div>Transmisi: <span className="text-charcoal font-semibold">{car.transmission}</span></div>
                    <div>Pajak: <span className="text-charcoal font-semibold">Aktif</span></div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 pt-0 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenDetail(car.id)}
                  className="col-span-2 py-2.5 px-3 bg-forest text-white font-mono text-xs font-bold hover:bg-forest-light border border-forest transition-colors text-center active:scale-95 shadow-sm"
                >
                  Detail Lengkap
                </button>
                <div className="flex gap-1.5">
                  <button type="button" onClick={(e) => handleWhatsApp(car, e)} className="flex-1 flex items-center justify-center border border-hairline hover:border-forest bg-alabaster text-forest active:scale-95" title="WhatsApp">
                    <PhoneCall className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" onClick={(e) => handleShare(car, e)} className="flex-1 flex items-center justify-center border border-hairline hover:border-forest bg-alabaster text-muted hover:text-charcoal active:scale-95" title="Bagikan">
                    <Share2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Pagination Dots Indicator */}
        <div className="flex md:hidden items-center justify-center gap-1.5 pt-1">
          {featuredCars.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeCardIndex === i ? 'w-6 bg-forest' : 'w-1.5 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
