import React from 'react';
import { ArrowRight, PhoneCall, Calendar, Cog, Gauge, Eye, ArrowUpRight } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';
import { CarStatusBadge } from '../common/CarStatusBadge';
import { Button } from '../ui/button';

export const FeaturedCarsPreview: React.FC = () => {
  const { cars, setSelectedCarId, setActiveTab, setQuickPeekCar } = useShowroomStore();
  const featured = cars.filter((c) => c.isFeatured).slice(0, 3);

  const handleOpenDetail = (id: string) => {
    setSelectedCarId(id);
    setActiveTab('detail');
  };

  const formatRupiah = (num: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  return (
    <section aria-label="Sorotan Unit Unggulan" className="bg-alabaster border-b border-hairline py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
              KURASI INVENTARIS PILIHAN BOGOR
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
              Sorotan Unit Unggulan Siap Pakai.
            </h2>
            <p className="font-body text-sm text-muted">
              Unit terverifikasi 160 titik dengan garansi resmi 1 tahun. Klik Intip Cepat untuk ringkasan instan.
            </p>
          </div>

          <Button variant="outline" size="md" onClick={() => setActiveTab('inventory')} className="self-start md:self-auto">
            <span>Buka Seluruh Katalog</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((car) => {
            const isSold = car.status === 'Terjual';
            return (
              <article
                key={car.id}
                className={`group border border-hairline bg-canvas flex flex-col justify-between transition-all duration-200 ${
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
                    {/* Quick Peek Button on image */}
                    <button
                      type="button"
                      onClick={() => setQuickPeekCar(car)}
                      className="absolute top-3 right-3 bg-canvas/90 hover:bg-forest hover:text-white text-charcoal border border-hairline px-2 py-1 text-[11px] font-mono tracking-wider uppercase transition-colors flex items-center gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      <span>Intip Cepat</span>
                    </button>
                  </div>

                  <div className="p-5 space-y-3">
                    <span className="font-mono text-xs text-muted block">{car.plateNumber}</span>
                    <h3 className="font-heading text-lg font-bold text-charcoal tracking-tight line-clamp-1">
                      {car.title}
                    </h3>

                    <div className="grid grid-cols-3 gap-1.5 pt-1 text-[11px] font-mono text-muted">
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
                    <Button variant="outline" size="sm" onClick={() => handleOpenDetail(car.id)}>
                      <span>Detail Lengkap</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        const text = encodeURIComponent(`Halo admin, saya tertarik dengan unit ${car.title} tahun ${car.year}.`);
                        window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
                      }}
                      disabled={isSold}
                    >
                      <PhoneCall className="h-3.5 w-3.5" />
                      <span>{isSold ? 'Terjual' : 'Tanya Unit'}</span>
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
