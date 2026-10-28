import React from 'react';
import { CarUnit } from '../../types/showroom';
import { InventoryCard } from './InventoryCard';
import { Button } from '../ui/button';

interface InventoryGridProps {
  cars: CarUnit[];
  onReset: () => void;
}

export const InventoryGrid: React.FC<InventoryGridProps> = ({ cars, onReset }) => {
  if (cars.length === 0) {
    return (
      <div className="border border-hairline bg-canvas p-12 text-center space-y-4">
        <h3 className="font-heading text-xl font-bold text-charcoal">
          Tidak Ada Unit Sesuai Kriteria Filter
        </h3>
        <p className="font-body text-sm text-muted max-w-md mx-auto">
          Coba sesuaikan pagu anggaran, ubah filter transmisi, atau reset filter untuk menampilkan seluruh inventaris mobil seken Bogor.
        </p>
        <Button variant="primary" size="md" onClick={onReset}>
          Tampilkan Seluruh Stok Mobil
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <InventoryCard key={car.id} car={car} />
      ))}
    </div>
  );
};
