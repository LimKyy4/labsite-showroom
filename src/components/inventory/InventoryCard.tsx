import React from 'react';
import { Share2, PhoneCall, ArrowUpRight, Calendar, Cog, Gauge, ShieldCheck } from 'lucide-react';
import { CarUnit } from '../../types/showroom';
import { CarStatusBadge } from '../common/CarStatusBadge';
import { Button } from '../ui/button';
import { useShowroomStore } from '../../store/useShowroomStore';

interface InventoryCardProps {
  car: CarUnit;
}

export const InventoryCard: React.FC<InventoryCardProps> = ({ car }) => {
  const { setSelectedCarId, setActiveTab, addToast } = useShowroomStore();
  const isSold = car.status === 'Terjual';

  const handleOpenDetail = () => {
    setSelectedCarId(car.id);
    setActiveTab('detail');
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/#unit-${car.id}`;
    navigator.clipboard.writeText(url).finally(() => {
      addToast('Tautan Unit Tersalin', `Tautan spesifikasi ${car.title} siap dibagikan.`);
    });
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Halo admin labsite showroom, saya ingin inspeksi unit ${car.title} tahun ${car.year} (${car.plateNumber}).`;
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(text)}`, '_blank');
  };

  const formatRupiah = (num: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  return (
    <article
      onClick={handleOpenDetail}
      className={`group cursor-pointer border border-hairline bg-canvas flex flex-col justify-between transition-all duration-200 ${
        isSold ? 'opacity-60 bg-alabaster' : 'hover:border-forest'
      }`}
    >
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-hairline">
          <img
            src={car.images[0]}
            alt={car.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-102"
          />
          <div className="absolute top-3 left-3">
            <CarStatusBadge status={car.status} />
          </div>
          <button
            type="button"
            onClick={handleShare}
            title="Bagikan Unit"
            className="absolute top-3 right-3 bg-canvas/90 hover:bg-forest hover:text-white text-charcoal border border-hairline p-1.5 transition-colors"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span>{car.plateNumber}</span>
            <span className="flex items-center gap-1 text-forest">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>160 Titik</span>
            </span>
          </div>

          <h3 className="font-heading text-lg font-bold text-charcoal tracking-tight line-clamp-1 group-hover:text-forest transition-colors">
            {car.title}
          </h3>

          <div className="grid grid-cols-3 gap-1.5 text-[11px] font-mono text-charcoal pt-1">
            <div className="flex items-center gap-1 bg-alabaster border border-hairline p-1.5">
              <Calendar className="h-3 w-3 text-sage shrink-0" />
              <span>{car.year}</span>
            </div>
            <div className="flex items-center gap-1 bg-alabaster border border-hairline p-1.5">
              <Cog className="h-3 w-3 text-sage shrink-0" />
              <span>{car.transmission === 'Otomatis' ? 'Matic' : 'Manual'}</span>
            </div>
            <div className="flex items-center gap-1 bg-alabaster border border-hairline p-1.5">
              <Gauge className="h-3 w-3 text-sage shrink-0" />
              <span>{(car.mileage / 1000).toFixed(0)}k km</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 space-y-3 border-t border-hairline/60">
        <div className="pt-3">
          <span className="font-mono text-[10px] uppercase text-muted tracking-wider block">Harga Tunai OTR Bogor</span>
          <span className="font-heading text-xl font-bold text-forest">{formatRupiah(car.price)}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={handleOpenDetail}>
            <span>Lihat Detail</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleWhatsApp}
            disabled={isSold}
          >
            <PhoneCall className="h-3.5 w-3.5" />
            <span>{isSold ? 'Terjual' : 'Tanya Unit'}</span>
          </Button>
        </div>
      </div>
    </article>
  );
};
