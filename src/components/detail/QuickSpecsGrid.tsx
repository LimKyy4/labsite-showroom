import React from 'react';
import { Calendar, Cog, Gauge, Fuel, ShieldCheck, MapPin, Wrench, UserCheck } from 'lucide-react';
import { CarUnit } from '../../types/showroom';

interface QuickSpecsGridProps {
  car?: Partial<CarUnit> | null;
}

export const QuickSpecsGrid: React.FC<QuickSpecsGridProps> = ({ car }) => {
  const specs = [
    {
      label: 'Tahun Perakitan',
      value: car?.year ? `Tahun ${car.year}` : 'Tahun 2021',
      icon: Calendar,
    },
    {
      label: 'Transmisi Unit',
      value: car?.transmission || 'Otomatis',
      icon: Cog,
    },
    {
      label: 'Odometer Aktual',
      value: car?.mileage != null ? `${car.mileage.toLocaleString('id-ID')} km (Asli)` : '34.200 km (Asli)',
      icon: Gauge,
    },
    {
      label: 'Kapasitas Mesin',
      value: car?.engineCapacity || '2.393 cc 2GD-FTV Common Rail',
      icon: Fuel,
    },
    {
      label: 'Masa Berlaku Pajak',
      value: car?.taxStatus || 'Pajak Hidup s/d 11/2027',
      icon: ShieldCheck,
    },
    {
      label: 'Wilayah Registrasi',
      value: car?.plateNumber ? `${car.plateNumber} (Bogor)` : 'Plat F (Kota Bogor)',
      icon: MapPin,
    },
    {
      label: 'Riwayat Kepemilikan',
      value: car?.ownership || 'Tangan Pertama dari Baru',
      icon: UserCheck,
    },
    {
      label: 'Histori Perawatan',
      value: car?.serviceHistory || 'Service Rutin Bengkel Resmi',
      icon: Wrench,
    },
  ];

  return (
    <div className="border border-hairline bg-white p-5 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-hairline gap-2">
        <div>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-forest font-bold block">
            RINGKASAN CEPAT UNIT
          </span>
          <h3 className="font-heading text-base sm:text-lg font-bold text-charcoal">
            Spesifikasi Utama & Legalitas Berkas
          </h3>
        </div>
        <span className="font-mono text-xs text-forest bg-sage-light px-2.5 py-1 border border-sage-border font-semibold self-start sm:self-auto">
          100% Terverifikasi Fisik
        </span>
      </div>

      {/* Grid Responsif: 2 Kolom di Layar Sempit, 4 Kolom Proporsional di Layar Lebar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-1">
        {specs.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-3.5 sm:p-4 bg-alabaster border border-hairline flex flex-col justify-between space-y-2 min-h-[82px]"
            >
              {/* Baris Atas: Ikon + Label Mono Tipis */}
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono text-muted tracking-wider uppercase">
                <Icon className="h-3.5 w-3.5 text-sage shrink-0" />
                <span className="leading-tight">{item.label}</span>
              </div>

              {/* Baris Bawah: Nilai Data Tebal Outfit dengan Pembungkus Teks Alami Tanpa Elipsis */}
              <p className="font-heading text-xs sm:text-sm font-bold text-charcoal leading-snug break-words">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
