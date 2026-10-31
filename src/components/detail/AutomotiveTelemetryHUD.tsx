import React from 'react';
import { Cpu, Gauge, Fuel, ShieldCheck, MapPin, Disc, CheckCircle2, Award } from 'lucide-react';
import { CarUnit } from '../../types/showroom';
import { RollingCounter } from '../common/RollingCounter';

interface AutomotiveTelemetryHUDProps {
  car?: Partial<CarUnit> | null;
}

export const AutomotiveTelemetryHUD: React.FC<AutomotiveTelemetryHUDProps> = ({ car }) => {
  const mileageNum = car?.mileage ?? 34200;
  const tireConditionPercent = 88;

  return (
    <div className="border border-hairline bg-canvas p-4 sm:p-6 space-y-6 select-none shadow-sm overflow-visible">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-hairline gap-2">
        <div>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-forest font-bold block">
            AUTOMOTIVE TELEMETRY HUD
          </span>
          <h3 className="font-heading text-base sm:text-lg font-bold text-charcoal">
            Integrated Vehicle Telemetry Cluster
          </h3>
        </div>
        <span className="font-mono text-[11px] sm:text-xs text-forest bg-sage-light px-2.5 py-1 border border-sage-border font-semibold self-start sm:self-auto flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Telemetri Terverifikasi</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 overflow-visible">
        {/* Cluster 1: Mesin & Tenaga */}
        <div className="pt-6 p-4 sm:p-5 bg-alabaster border border-hairline space-y-3 shadow-sm overflow-visible">
          <div className="flex items-center justify-between pb-2 border-b border-hairline text-charcoal">
            <div className="flex items-center gap-1.5">
              <Cpu className="h-4 w-4 text-forest" />
              <h4 className="font-heading text-xs font-bold uppercase tracking-tight">Identitas Mesin</h4>
            </div>
            <Fuel className="h-3.5 w-3.5 text-muted" />
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-sage font-bold uppercase block tracking-wider">KAPASITAS</span>
              <p className="font-mono font-bold text-charcoal text-[13px] leading-snug break-words">{car?.engineCapacity || '2.393 cc 2GD'}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-sage font-bold uppercase block tracking-wider">TENAGA MAKS</span>
              <p className="font-mono font-bold text-charcoal text-[13px] leading-snug">149.6 PS @ 3.400</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-sage font-bold uppercase block tracking-wider">BAHAN BAKAR</span>
              <p className="font-mono font-semibold text-charcoal text-[12px] leading-snug">Diesel Dex</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-sage font-bold uppercase block tracking-wider">KOMPRESI</span>
              <p className="font-mono font-bold text-forest text-[12px] leading-snug">98% Segel Pabrik</p>
            </div>
          </div>
        </div>

        {/* Cluster 2: Sasis & Rem */}
        <div className="pt-6 p-4 sm:p-5 bg-alabaster border border-hairline space-y-3 shadow-sm overflow-visible">
          <div className="flex items-center justify-between pb-2 border-b border-hairline text-charcoal">
            <div className="flex items-center gap-1.5">
              <Disc className="h-4 w-4 text-forest" />
              <h4 className="font-heading text-xs font-bold uppercase tracking-tight">Kaki-Kaki & Transmisi</h4>
            </div>
            <span className="font-mono text-[9px] text-forest font-bold bg-sage-light px-1.5 py-0.5 border border-sage-border">ABS + EBD</span>
          </div>
          <div className="space-y-3 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-sage font-bold uppercase block tracking-wider">TRANSMISI</span>
              <p className="font-mono font-bold text-charcoal text-[13px] leading-snug break-words">{car?.transmission || 'Otomatis 6-Speed Sport'}</p>
            </div>
            <div className="space-y-1.5 pt-1 border-t border-hairline">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-sage font-bold uppercase tracking-wider">KETEBALAN BAN</span>
                <RollingCounter value={tireConditionPercent} suffix="% Tapak" className="font-bold text-forest" />
              </div>
              <div className="w-full h-1.5 bg-hairline overflow-hidden">
                <div className="h-full bg-forest" style={{ width: `${tireConditionPercent}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Cluster 3: Samsat & Legalitas */}
        <div className="pt-6 p-4 sm:p-5 bg-alabaster border border-hairline space-y-3 shadow-sm overflow-visible">
          <div className="flex items-center justify-between pb-2 border-b border-hairline text-charcoal">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-forest" />
              <h4 className="font-heading text-xs font-bold uppercase tracking-tight">Legalitas Samsat</h4>
            </div>
            <MapPin className="h-3.5 w-3.5 text-forest" />
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-sage font-bold uppercase block tracking-wider">REGISTRASI</span>
              <p className="font-mono font-bold text-forest text-[13px] leading-snug">{car?.plateNumber || 'Plat F'} (Bogor)</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-sage font-bold uppercase block tracking-wider">PAJAK STNK</span>
              <p className="font-mono font-bold text-charcoal text-[13px] leading-snug">{car?.taxStatus || 'Aktif'}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-sage font-bold uppercase block tracking-wider">KEPEMILIKAN</span>
              <p className="font-mono font-semibold text-charcoal text-[12px] leading-snug">{car?.ownership || 'Tangan 1'}</p>
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-sage font-bold uppercase block tracking-wider">CEK FISIK</span>
              <p className="font-mono font-bold text-forest text-[12px] leading-snug">Polda Lolos</p>
            </div>
          </div>
        </div>

        {/* Cluster 4: Odometer Asli */}
        <div className="pt-6 p-4 sm:p-5 bg-alabaster border border-hairline space-y-3 shadow-sm overflow-visible">
          <div className="flex items-center justify-between pb-2 border-b border-hairline text-charcoal">
            <div className="flex items-center gap-1.5">
              <Gauge className="h-4 w-4 text-forest" />
              <h4 className="font-heading text-xs font-bold uppercase tracking-tight">Odometer Riil</h4>
            </div>
            <Award className="h-3.5 w-3.5 text-forest" />
          </div>
          <div className="space-y-2">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-sage font-bold uppercase block tracking-wider">JARAK TEMPUH AKTUAL</span>
              <RollingCounter value={mileageNum} suffix=" KM" className="font-mono text-base sm:text-lg font-bold text-forest" />
            </div>
            <p className="text-[11px] font-mono text-muted leading-relaxed border-t border-hairline pt-2">
              ECU &amp; Odometer asli pabrik. Garansi buyback 100% jika terbukti manipulasi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
