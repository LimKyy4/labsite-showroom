import React, { useState, useMemo, useEffect } from 'react';
import { useShowroomStore } from '../store/useShowroomStore';
import { FilterBar } from '../components/inventory/FilterBar';
import { InventoryGrid } from '../components/inventory/InventoryGrid';
import { CarFront } from 'lucide-react';

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
    <div className="bg-alabaster py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border border-hairline bg-canvas p-6 sm:p-7 space-y-2">
          <div className="flex items-center gap-2">
            <CarFront className="h-5 w-5 text-forest" />
            <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold">
              INVENTARIS KENDARAAN READY BOGOR
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
            Katalog Lengkap Mobil Seken Terkurasi.
          </h1>
          <p className="font-body text-xs sm:text-sm text-muted">
            Menampilkan {filteredCars.length} dari total {cars.length} unit bergaransi mesin 1 tahun dengan hasil uji 160 titik.
          </p>
        </div>

        <FilterBar
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
        />

        <InventoryGrid cars={filteredCars} onReset={handleResetFilters} />
      </div>
    </div>
  );
};
