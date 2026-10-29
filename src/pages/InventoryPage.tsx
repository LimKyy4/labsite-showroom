import React, { useState, useMemo, useEffect } from 'react';
import { useShowroomStore } from '../store/useShowroomStore';
import { StickyFilterToolbar } from '../components/inventory/StickyFilterToolbar';
import { InventoryGrid } from '../components/inventory/InventoryGrid';
import { QuickPeekModal } from '../components/home/QuickPeekModal';
import { CarFront, ShieldCheck } from 'lucide-react';

export const InventoryPage: React.FC = () => {
  const { cars, resetInventory, addToast, filterBudget, filterTransmission, setFilterBudget, setFilterTransmission } =
    useShowroomStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [transmissionFilter, setLocalTransmission] = useState(filterTransmission || 'Semua');
  const [maxBudget, setLocalBudget] = useState(filterBudget || 800000000);

  useEffect(() => {
    if (filterTransmission) setLocalTransmission(filterTransmission);
    if (filterBudget) setLocalBudget(filterBudget);
  }, [filterTransmission, filterBudget]);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchSearch =
        car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.plateNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'Semua' || car.status === statusFilter;
      const matchTrans = transmissionFilter === 'Semua' || car.transmission === transmissionFilter;
      const matchBudget = car.price <= maxBudget;

      return matchSearch && matchStatus && matchTrans && matchBudget;
    });
  }, [cars, searchQuery, statusFilter, transmissionFilter, maxBudget]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('Semua');
    setLocalTransmission('Semua');
    setLocalBudget(800000000);
    setFilterBudget(800000000);
    setFilterTransmission('Semua');
    resetInventory();
    addToast('Filter & Stok Direset', 'Katalog kembali menampilkan seluruh unit seeder awal.');
  };

  return (
    <div className="bg-alabaster min-h-screen pb-16">
      {/* 1. Top Section: Header Title Banner */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-4">
        <div className="border border-hairline bg-canvas p-6 sm:p-7 space-y-2 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CarFront className="h-5 w-5 text-forest" />
              <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold">
                INVENTARIS KENDARAAN READY BOGOR
              </span>
            </div>
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-forest bg-sage-light px-2.5 py-1 border border-sage-border font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Garansi Mesin & Transmisi 365 Hari</span>
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
            KATALOG MOBIL SEKEN BERGARANSI.
          </h1>
          <p className="font-body text-xs sm:text-sm text-muted">
            Menampilkan {filteredCars.length} dari total {cars.length} unit bergaransi mesin 1 tahun dengan hasil uji 160 titik.
          </p>
        </div>
      </div>

      {/* 2. Flush-Top Sticky Filter Shelf (Full-Width Solid Pure White Surface) */}
      <StickyFilterToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        transmissionFilter={transmissionFilter}
        setTransmissionFilter={(tr) => {
          setLocalTransmission(tr);
          setFilterTransmission(tr);
        }}
        maxBudget={maxBudget}
        setMaxBudget={(b) => {
          setLocalBudget(b);
          setFilterBudget(b);
        }}
        onReset={handleResetFilters}
        unitCount={filteredCars.length}
      />

      {/* 3. Catalog Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <InventoryGrid cars={filteredCars} onReset={handleResetFilters} />
      </div>

      <QuickPeekModal />
    </div>
  );
};
