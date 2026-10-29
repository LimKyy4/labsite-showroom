import React from 'react';
import { Cpu, Gauge, Compass, Activity, CheckCircle2 } from 'lucide-react';
import { TechnicalSpecs } from '../../types/showroom';
import { DEFAULT_TECHNICAL_SPECS } from '../../data/technicalSpecsData';

interface TechnicalSpecsBentoProps {
  specs?: TechnicalSpecs | null;
}

interface SpecRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

const SpecRow: React.FC<SpecRowProps> = ({ label, value, highlight }) => (
  <div className="grid grid-cols-12 gap-2 py-2 border-b border-hairline/70 last:border-b-0 items-baseline">
    <span className="col-span-5 sm:col-span-4 text-muted font-mono text-[11px] leading-tight">
      {label}
    </span>
    <span
      className={`col-span-7 sm:col-span-8 font-medium text-xs leading-snug break-words ${
        highlight ? 'text-forest font-bold' : 'text-charcoal'
      }`}
    >
      {value}
    </span>
  </div>
);

export const TechnicalSpecsBento: React.FC<TechnicalSpecsBentoProps> = ({ specs }) => {
  const safeSpecs: TechnicalSpecs = {
    engine: { ...DEFAULT_TECHNICAL_SPECS.engine, ...(specs?.engine || {}) },
    chassis: { ...DEFAULT_TECHNICAL_SPECS.chassis, ...(specs?.chassis || {}) },
    dimensions: { ...DEFAULT_TECHNICAL_SPECS.dimensions, ...(specs?.dimensions || {}) },
    odometer: { ...DEFAULT_TECHNICAL_SPECS.odometer, ...(specs?.odometer || {}) },
  };

  return (
    <div className="border border-hairline bg-white p-6 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-hairline gap-3">
        <div className="space-y-1 min-w-0">
          <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
            MODUL TEKNIS ARSITEKTURAL
          </span>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-charcoal leading-tight">
            Spesifikasi Lengkap & Kondisi Komponen Aktual
          </h3>
        </div>
        <div className="shrink-0 self-start sm:self-end">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-forest bg-sage-light px-2.5 py-1 border border-sage-border font-semibold whitespace-nowrap">
            <CheckCircle2 className="h-3.5 w-3.5 text-forest" />
            <span>Terverifikasi Bengkel Resmi</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
        {/* Modul 1: Performa Mesin & Girboks */}
        <div className="border border-hairline bg-alabaster p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 pb-2.5 border-b border-hairline text-charcoal font-bold">
            <Cpu className="h-4 w-4 text-forest shrink-0" />
            <h4 className="font-heading text-sm font-bold">1. Performa Mesin & Girboks</h4>
          </div>
          <div>
            <SpecRow label="Kapasitas Mesin" value={safeSpecs.engine.displacement} />
            <SpecRow label="Bahan Bakar" value={safeSpecs.engine.fuelType} />
            <SpecRow label="Tenaga Maksimum" value={safeSpecs.engine.maxPower} />
            <SpecRow label="Transmisi" value={safeSpecs.engine.transmissionType} />
            <SpecRow label="Status Girboks" value={safeSpecs.engine.gearboxStatus} highlight />
          </div>
        </div>

        {/* Modul 2: Sasis, Suspensi & Pengereman */}
        <div className="border border-hairline bg-alabaster p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 pb-2.5 border-b border-hairline text-charcoal font-bold">
            <Activity className="h-4 w-4 text-forest shrink-0" />
            <h4 className="font-heading text-sm font-bold">2. Sasis, Suspensi & Pengereman</h4>
          </div>
          <div>
            <SpecRow label="Suspensi Depan" value={safeSpecs.chassis.frontSuspension} />
            <SpecRow label="Suspensi Belakang" value={safeSpecs.chassis.rearSuspension} />
            <SpecRow label="Sistem Rem" value={safeSpecs.chassis.brakeSystem} />
            <SpecRow label="Kondisi Tapak Ban" value={safeSpecs.chassis.tireCondition} highlight />
          </div>
        </div>

        {/* Modul 3: Dimensi & Ruang Kabin */}
        <div className="border border-hairline bg-alabaster p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 pb-2.5 border-b border-hairline text-charcoal font-bold">
            <Compass className="h-4 w-4 text-forest shrink-0" />
            <h4 className="font-heading text-sm font-bold">3. Dimensi & Ruang Kabin</h4>
          </div>
          <div>
            <SpecRow label="Tangki BBM" value={safeSpecs.dimensions.fuelTank} />
            <SpecRow label="Ground Clearance" value={safeSpecs.dimensions.groundClearance} />
            <SpecRow label="Kapasitas Duduk" value={safeSpecs.dimensions.seatingRows} />
            <SpecRow label="Kapasitas Bagasi" value={safeSpecs.dimensions.bootCapacity} />
          </div>
        </div>

        {/* Modul 4: Rekam Jejak Odometer */}
        <div className="border border-hairline bg-alabaster p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 pb-2.5 border-b border-hairline text-charcoal font-bold">
            <Gauge className="h-4 w-4 text-forest shrink-0" />
            <h4 className="font-heading text-sm font-bold">4. Rekam Jejak Odometer</h4>
          </div>
          <div>
            <SpecRow label="Odometer Riil" value={safeSpecs.odometer.verifiedMileage} />
            <SpecRow label="Histori Servis" value={safeSpecs.odometer.serviceRecord} />
            <div className="flex items-center gap-2 text-forest font-bold pt-3">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span className="text-xs leading-snug">{safeSpecs.odometer.odometerAuthenticity}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
