import React from 'react';
import { Gauge, Calendar, Cog, ShieldAlert } from 'lucide-react';
import { CarUnit } from '../../types/showroom';

interface CarSpecsGridProps {
  car: CarUnit;
}

export const CarSpecsGrid: React.FC<CarSpecsGridProps> = ({ car }) => {
  return (
    <div className="grid grid-cols-2 gap-2 text-xs text-charcoal font-medium pt-1">
      <div className="flex items-center gap-1.5 bg-alabaster border border-hairline p-2">
        <Calendar className="h-3.5 w-3.5 text-sage shrink-0" />
        <span>Tahun {car.year}</span>
      </div>
      <div className="flex items-center gap-1.5 bg-alabaster border border-hairline p-2">
        <Cog className="h-3.5 w-3.5 text-sage shrink-0" />
        <span>{car.transmission}</span>
      </div>
      <div className="flex items-center gap-1.5 bg-alabaster border border-hairline p-2">
        <Gauge className="h-3.5 w-3.5 text-sage shrink-0" />
        <span>{car.mileage.toLocaleString('id-ID')} km</span>
      </div>
      <div className="flex items-center gap-1.5 bg-alabaster border border-hairline p-2">
        <ShieldAlert className="h-3.5 w-3.5 text-sage shrink-0" />
        <span className="leading-tight">{car.taxStatus}</span>
      </div>
    </div>
  );
};
