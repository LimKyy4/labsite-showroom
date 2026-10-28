import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';

export const LiveStatusBar: React.FC = () => {
  const statusText =
    'BUKA HARI INI: 08.00 - 18.00 WIB • KONSULTASI LANGSUNG & TEST DRIVE AKTIF • FASILITAS CAR LIFT & SCANNER OBD SIAP • LOKASI 5 MENIT DARI EXIT TOL BARANANGSIANG BOGOR';

  return (
    <aside aria-label="Status Operasional Showroom" className="bg-forest text-white py-3 border-b border-forest-light overflow-hidden select-none">
      <div className="flex w-max animate-ticker">
        <div className="flex items-center space-x-6 px-4">
          <Clock className="h-4 w-4 text-sage-light" />
          <span className="font-heading text-xs font-bold tracking-wider uppercase whitespace-nowrap">
            {statusText}
          </span>
          <CheckCircle className="h-4 w-4 text-sage-light" />
          <span className="font-heading text-xs font-bold tracking-wider uppercase whitespace-nowrap">
            {statusText}
          </span>
        </div>
        <div className="flex items-center space-x-6 px-4" aria-hidden="true">
          <Clock className="h-4 w-4 text-sage-light" />
          <span className="font-heading text-xs font-bold tracking-wider uppercase whitespace-nowrap">
            {statusText}
          </span>
          <CheckCircle className="h-4 w-4 text-sage-light" />
          <span className="font-heading text-xs font-bold tracking-wider uppercase whitespace-nowrap">
            {statusText}
          </span>
        </div>
      </div>
    </aside>
  );
};
