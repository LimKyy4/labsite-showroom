import React from 'react';
import { Cpu, Activity, Compass, Gauge, CheckCircle2 } from 'lucide-react';
import { TechnicalSpecs } from '../../types/showroom';
import { DEFAULT_TECHNICAL_SPECS } from '../../data/technicalSpecsData';

interface AppleInsetGroupedSpecsProps {
  specs?: TechnicalSpecs | null;
}

interface SpecItem {
  label: string;
  value: string;
  highlight?: boolean;
}

const InsetCell: React.FC<SpecItem> = ({ label, value, highlight }) => (
  <div className="py-2.5 px-4 border-b border-hairline last:border-b-0 flex flex-col justify-center bg-white hover:bg-alabaster/60 transition-colors">
    <span className="font-mono text-[10px] text-sage uppercase tracking-wider font-bold block">
      {label}
    </span>
    <span
      className={`text-xs sm:text-[14px] font-semibold pt-0.5 leading-snug break-words ${
        highlight ? 'text-forest font-bold' : 'text-charcoal'
      }`}
    >
      {value}
    </span>
  </div>
);

export const AppleInsetGroupedSpecs: React.FC<AppleInsetGroupedSpecsProps> = ({ specs }) => {
  const safeSpecs: TechnicalSpecs = {
    engine: { ...DEFAULT_TECHNICAL_SPECS.engine, ...(specs?.engine || {}) },
    chassis: { ...DEFAULT_TECHNICAL_SPECS.chassis, ...(specs?.chassis || {}) },
    dimensions: { ...DEFAULT_TECHNICAL_SPECS.dimensions, ...(specs?.dimensions || {}) },
    odometer: { ...DEFAULT_TECHNICAL_SPECS.odometer, ...(specs?.odometer || {}) },
  };

  const groups = [
    {
      title: 'Performa Mesin & Girboks',
      icon: Cpu,
      items: [
        { label: 'Kapasitas Mesin', value: safeSpecs.engine.displacement },
        { label: 'Bahan Bakar', value: safeSpecs.engine.fuelType },
        { label: 'Tenaga Maksimum', value: safeSpecs.engine.maxPower },
        { label: 'Sistem Transmisi', value: safeSpecs.engine.transmissionType },
        { label: 'Status Girboks', value: safeSpecs.engine.gearboxStatus, highlight: true },
      ],
    },
    {
      title: 'Sasis & Suspensi',
      icon: Activity,
      items: [
        { label: 'Suspensi Depan', value: safeSpecs.chassis.frontSuspension },
        { label: 'Suspensi Belakang', value: safeSpecs.chassis.rearSuspension },
        { label: 'Sistem Pengereman', value: safeSpecs.chassis.brakeSystem },
        { label: 'Kondisi Tapak Ban', value: safeSpecs.chassis.tireCondition, highlight: true },
      ],
    },
    {
      title: 'Dimensi & Ruang Kabin',
      icon: Compass,
      items: [
        { label: 'Volume Tangki BBM', value: safeSpecs.dimensions.fuelTank },
        { label: 'Ground Clearance', value: safeSpecs.dimensions.groundClearance, highlight: true },
        { label: 'Kapasitas Duduk', value: safeSpecs.dimensions.seatingRows },
        { label: 'Kapasitas Ruang Bagasi', value: safeSpecs.dimensions.bootCapacity },
      ],
    },
    {
      title: 'Rekam Jejak Odometer',
      icon: Gauge,
      items: [
        { label: 'Odometer Riil Terverifikasi', value: safeSpecs.odometer.verifiedMileage },
        { label: 'Histori Perawatan', value: safeSpecs.odometer.serviceRecord },
        { label: 'Keabsahan Kilometer', value: safeSpecs.odometer.odometerAuthenticity, highlight: true },
      ],
    },
  ];

  return (
    <div className="border border-hairline bg-canvas p-4 sm:p-6 space-y-5 select-none shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-hairline gap-2">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
            SPESIFIKASI TEKNIS INSET GROUPED
          </span>
          <h3 className="font-heading text-base sm:text-lg font-bold text-charcoal">
            Daftar Komprehensif Arsitektur Mekanikal
          </h3>
        </div>
        <span className="font-mono text-[11px] sm:text-xs text-forest bg-sage-light px-2.5 py-1 border border-sage-border font-semibold self-start sm:self-auto flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Lolos Standar ATPM</span>
        </span>
      </div>

      {/* Apple Inset Grouped Containers in Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {groups.map((group, idx) => {
          const Icon = group.icon;
          return (
            <div key={idx} className="space-y-1.5 flex flex-col">
              <div className="flex items-center gap-1.5 px-1 text-charcoal">
                <Icon className="h-4 w-4 text-forest" />
                <h4 className="font-heading text-xs sm:text-sm font-bold uppercase tracking-tight">
                  {group.title}
                </h4>
              </div>
              <div className="rounded-xl border border-hairline overflow-hidden bg-alabaster shadow-sm flex-1">
                {group.items.map((item, itemIdx) => (
                  <InsetCell
                    key={itemIdx}
                    label={item.label}
                    value={item.value}
                    highlight={item.highlight}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
