import React from 'react';
import { Cpu, Gauge, Fuel, ShieldCheck, MapPin, Disc, CheckCircle2, Award } from 'lucide-react';
import { CarUnit } from '../../types/showroom';
import { RollingCounter } from '../common/RollingCounter';

interface TouchSnapTelemetryRailProps {
  car?: Partial<CarUnit> | null;
}

export const TouchSnapTelemetryRail: React.FC<TouchSnapTelemetryRailProps> = ({ car }) => {
  const mileageNum = car?.mileage ?? 34200;
  const tireConditionPercent = 88;

  return (
    <div className="border border-hairline bg-canvas p-4 sm:p-6 space-y-4 select-none shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-hairline gap-2">
        <div>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-forest font-bold block">
            TELEMETRI KOKPIT TERPADU
          </span>
          <h3 className="font-heading text-base sm:text-lg font-bold text-charcoal">
            Status Vital & Indikator Komponen Aktual
          </h3>
        </div>
        <span className="font-mono text-[11px] sm:text-xs text-forest bg-sage-light px-2.5 py-1 border border-sage-border font-semibold self-start sm:self-auto flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Telemetri Terverifikasi</span>
        </span>
      </div>

      {/* Horizontal Touch-Snap Rail (Mobile) & Flat Grid (Desktop) */}
      <div className="flex overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 gap-3 sm:gap-4 no-scrollbar pb-1">
        {/* Cluster 1: Mesin & Tenaga */}
        <div className="snap-center shrink-0 w-[85%] sm:w-auto p-4 bg-alabaster border border-hairline space-y-2.5">
          <div className="flex items-center justify-between pb-1.5 border-b border-hairline text-charcoal">
            <div className="flex items-center gap-1.5">
              <Cpu className="h-4 w-4 text-forest" />
              <h4 className="font-heading text-xs font-bold uppercase">Identitas Mesin</h4>
            </div>
            <Fuel className="h-3.5 w-3.5 text-muted" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[9px] font-mono text-muted uppercase block">Kapasitas</span>
              <p className="font-mono font-bold text-charcoal text-[11px]">{car?.engineCapacity || '2.393 cc 2GD'}</p>
            </div>
            <div>
              <span className="text-[9px] font-mono text-muted uppercase block">Tenaga</span>
              <p className="font-mono font-bold text-charcoal text-[11px]">149.6 PS @ 3.400</p>
            </div>
            <div>
              <span className="text-[9px] font-mono text-muted uppercase block">Bahan Bakar</span>
              <p className="font-mono font-semibold text-charcoal text-[11px]">Diesel Dex</p>
            </div>
            <div>
              <span className="text-[9px] font-mono text-muted uppercase block">Kompresi</span>
              <p className="font-mono font-bold text-forest text-[11px]">98% Segel Pabrik</p>
            </div>
          </div>
        </div>

        {/* Cluster 2: Sasis & Rem */}
        <div className="snap-center shrink-0 w-[85%] sm:w-auto p-4 bg-alabaster border border-hairline space-y-2.5">
          <div className="flex items-center justify-between pb-1.5 border-b border-hairline text-charcoal">
            <div className="flex items-center gap-1.5">
              <Disc className="h-4 w-4 text-forest" />
              <h4 className="font-heading text-xs font-bold uppercase">Kaki-Kaki & Rem</h4>
            </div>
            <span className="font-mono text-[9px] text-forest font-bold">ABS + EBD</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center font-mono">
              <span className="text-[10px] text-muted uppercase">Transmisi</span>
              <span className="font-bold text-charcoal text-[11px]">{car?.transmission || 'Otomatis'}</span>
            </div>
            <div className="space-y-1 pt-0.5">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-muted uppercase">Ketebalan Ban</span>
                <RollingCounter value={tireConditionPercent} suffix="% Tapak" className="font-bold text-forest" />
              </div>
              <div className="w-full h-1.5 bg-hairline overflow-hidden">
                <div className="h-full bg-forest" style={{ width: `${tireConditionPercent}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Cluster 3: Samsat & Legalitas */}
        <div className="snap-center shrink-0 w-[85%] sm:w-auto p-4 bg-alabaster border border-hairline space-y-2.5">
          <div className="flex items-center justify-between pb-1.5 border-b border-hairline text-charcoal">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-forest" />
              <h4 className="font-heading text-xs font-bold uppercase">Legalitas Samsat</h4>
            </div>
            <MapPin className="h-3.5 w-3.5 text-forest" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[9px] font-mono text-muted uppercase block">Registrasi</span>
              <p className="font-mono font-bold text-forest text-[11px]">{car?.plateNumber || 'Plat F'} (Bogor)</p>
            </div>
            <div>
              <span className="text-[9px] font-mono text-muted uppercase block">Pajak STNK</span>
              <p className="font-mono font-bold text-charcoal text-[11px]">{car?.taxStatus || 'Aktif'}</p>
            </div>
            <div>
              <span className="text-[9px] font-mono text-muted uppercase block">Kepemilikan</span>
              <p className="font-mono font-semibold text-charcoal text-[11px]">{car?.ownership || 'Tangan 1'}</p>
            </div>
            <div>
              <span className="text-[9px] font-mono text-muted uppercase block">Cek Fisik</span>
              <p className="font-mono font-bold text-forest text-[11px]">Polda Lolos</p>
            </div>
          </div>
        </div>

        {/* Cluster 4: Odometer Asli */}
        <div className="snap-center shrink-0 w-[85%] sm:w-auto p-4 bg-alabaster border border-hairline space-y-2.5">
          <div className="flex items-center justify-between pb-1.5 border-b border-hairline text-charcoal">
            <div className="flex items-center gap-1.5">
              <Gauge className="h-4 w-4 text-forest" />
              <h4 className="font-heading text-xs font-bold uppercase">Odometer Riil</h4>
            </div>
            <Award className="h-3.5 w-3.5 text-forest" />
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] font-mono text-muted uppercase">Jarak Tempuh</span>
              <RollingCounter value={mileageNum} suffix=" KM" className="font-mono text-base sm:text-lg font-bold text-forest" />
            </div>
            <p className="text-[10px] font-mono text-muted leading-tight border-t border-hairline pt-1.5">
              ECU & Odometer asli pabrik. Garansi buyback 100% jika terbukti manipulasi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
