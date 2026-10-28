import React, { useState, useMemo } from 'react';
import { useShowroomStore } from '../../store/useShowroomStore';
import { CarCard } from './CarCard';
import { Slider } from '../ui/slider';
import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/button';

export const FeaturedCars: React.FC = () => {
  const { cars, resetInventory, addToast } = useShowroomStore();
  const [selectedStatus, setSelectedStatus] = useState<string>('Semua');
  const [maxPrice, setMaxPrice] = useState<number>(600000000);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const featuredCars = useMemo(() => {
    return cars
      .filter((car) => car.isFeatured)
      .filter((car) => (selectedStatus === 'Semua' ? true : car.status === selectedStatus))
      .filter((car) => car.price <= maxPrice);
  }, [cars, selectedStatus, maxPrice]);

  const handleReset = () => {
    resetInventory();
    setSelectedStatus('Semua');
    setMaxPrice(600000000);
    addToast('Inventaris Direset', 'Data unit kendaraan telah dikembalikan ke kondisi awal seeder.');
  };

  const statusOptions = ['Semua', 'Tersedia', 'Terpesan', 'Terjual'];

  return (
    <section id="featured-cars" aria-label="Inventaris Mobil Unggulan" className="bg-alabaster border-b border-hairline py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-forest">
              KURASI INVENTARIS BOGOR
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal tracking-tight">
              Sorotan Unit Unggulan Siap Pakai.
            </h2>
            <p className="text-xs sm:text-sm text-muted">
              Menampilkan {featuredCars.length} dari total {cars.length} unit terseleksi bergaransi.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              aria-label="Buka filter anggaran"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>{showFilters ? 'Sembunyikan Filter' : 'Filter Anggaran'}</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleReset}
              title="Reset data ke seeder awal"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Seeder</span>
            </Button>
          </div>
        </div>

        {/* Filter Bar & Budget Slider Panel */}
        <div className="border border-hairline bg-canvas p-4 sm:p-6 mb-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-mono uppercase text-muted mr-2">Status:</span>
              {statusOptions.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1.5 text-xs font-mono transition-colors border ${
                    selectedStatus === st
                      ? 'bg-forest text-white border-forest'
                      : 'bg-alabaster text-charcoal border-hairline hover:border-muted'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Total Value */}
            <div className="text-xs font-mono text-muted">
              Pagu Anggaran Maks: <span className="font-bold text-forest">Rp {(maxPrice / 1000000).toFixed(0)} Juta</span>
            </div>
          </div>

          {/* Collapsible Budget Range Slider */}
          {showFilters && (
            <div className="pt-4 border-t border-hairline max-w-xl">
              <Slider
                min={200000000}
                max={600000000}
                step={25000000}
                value={maxPrice}
                onChange={setMaxPrice}
                label="Batas Anggaran Maksimal"
                formatValue={(v) => `Rp ${(v / 1000000).toFixed(0)} Juta`}
              />
            </div>
          )}
        </div>

        {/* Cars Grid */}
        {featuredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="border border-hairline bg-canvas p-12 text-center space-y-3">
            <p className="font-display text-lg font-bold text-charcoal">Tidak Ada Unit Sesuai Kriteria</p>
            <p className="text-xs text-muted">Coba tingkatkan batas pagu anggaran atau atur filter status ke Semua.</p>
            <Button variant="primary" size="sm" onClick={() => { setSelectedStatus('Semua'); setMaxPrice(600000000); }}>
              Tampilkan Seluruh Unit
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
