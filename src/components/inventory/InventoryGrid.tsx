import React from 'react';
import { motion } from 'framer-motion';
import { CarUnit } from '../../types/showroom';
import { InventoryCardItem } from './InventoryCardItem';
import { RotateCcw } from 'lucide-react';

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
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 bg-forest text-white font-mono text-xs font-bold hover:bg-forest-light border border-forest transition-colors shadow-sm"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Tampilkan Seluruh Stok Mobil</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car, idx) => (
        <motion.div
          key={car.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.32,
            delay: Math.min(idx * 0.05, 0.3),
            ease: 'easeOut',
          }}
          style={{ willChange: 'transform, opacity' }}
        >
          <InventoryCardItem car={car} />
        </motion.div>
      ))}
    </div>
  );
};
