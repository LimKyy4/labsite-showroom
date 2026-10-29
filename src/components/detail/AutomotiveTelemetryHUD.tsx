import React from 'react';
import { Cpu, Gauge, Fuel, ShieldCheck, MapPin, Disc, CheckCircle2, Award } from 'lucide-react';
import { CarUnit } from '../../types/showroom';

interface AutomotiveTelemetryHUDProps {
  car?: Partial<CarUnit> | null;
}

export const AutomotiveTelemetryHUD: React.FC<AutomotiveTelemetryHUDProps> = ({ car }) => {
  const mileageNum = car?.mileage ?? 34200;
  const tireConditionPercent = 88; // Default 88% Tapak Tebal

  return (
    <div className="border border-hairline bg-canvas p-5 sm:p-6 space-y-5 select-none shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-hairline gap-2">
        <div>
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-forest font-bold block">
            AUTOMOTIVE TELEMETRY HUD
          </span>
          <h3 className="font-heading text-base sm:text-lg font-bold text-charcoal">
            Integrated Vehicle Telemetry Cluster
          </h3>
        </div>
        <span className="font-mono text-xs text-forest bg-sage-light px-2.5 py-1 border border-sage-border font-semibold self-start sm:self-auto flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span>Telemetri Aktif Terverifikasi</span>
        </span>
      </div>

      {/* 4 Integrated Clusters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cluster 1: Identitas Mesin & Bahan Bakar */}
        <div className="p-4 bg-alabaster border border-hairline space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-hairline text-charcoal">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-forest" />
              <h4 className="font-heading text-xs font-bold uppercase tracking-wider">Identitas Mesin & Bahan Bakar</h4>
            </div>
            <Fuel className="h-3.5 w-3.5 text-muted" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] font-mono text-muted block">KAPASITAS MESIN</span>
              <p className="font-mono font-bold text-charcoal">{car?.engineCapacity || '2.393 cc 2GD-FTV'}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-muted block">TENAGA MAKSIMUM</span>
              <p className="font-mono font-bold text-charcoal">149.6 PS @ 3.400 RPM</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-muted block">JENIS BAHAN BAKAR</span>
              <p className="font-mono font-semibold text-charcoal">Diesel / Pertamina Dex</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-muted block">STATUS KOMPRESI</span>
              <p className="font-mono font-bold text-forest">98% Segel Pabrik</p>
            </div>
          </div>
        </div>

        {/* Cluster 2: Kaki-Kaki & Pengereman */}
        <div className="p-4 bg-alabaster border border-hairline space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-hairline text-charcoal">
            <div className="flex items-center gap-2">
              <Disc className="h-4 w-4 text-forest" />
              <h4 className="font-heading text-xs font-bold uppercase tracking-wider">Kaki-Kaki & Pengereman</h4>
            </div>
            <span className="font-mono text-[10px] text-forest font-bold">ABS + EBD + BA</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center font-mono">
              <span className="text-[10px] text-muted">TRANSMISI AKTIF</span>
              <span className="font-bold text-charcoal">{car?.transmission || 'Otomatis 6-Speed'}</span>
            </div>
            {/* Visual Bar Ketebalan Tapak Ban */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-muted">KETABALAN TAPAK BAN</span>
                <span className="font-bold text-forest">{tireConditionPercent}% Tapak Tebal</span>
              </div>
              <div className="w-full h-2 bg-hairline rounded-none overflow-hidden">
                <div className="h-full bg-forest" style={{ width: `${tireConditionPercent}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Cluster 3: Legalitas & Pajak Bogor */}
        <div className="p-4 bg-alabaster border border-hairline space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-hairline text-charcoal">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-forest" />
              <h4 className="font-heading text-xs font-bold uppercase tracking-wider">Legalitas & Pajak Bogor</h4>
            </div>
            <MapPin className="h-3.5 w-3.5 text-forest" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] font-mono text-muted block">WILAYAH REGISTRASI</span>
              <p className="font-mono font-bold text-forest">{car?.plateNumber || 'F 1888 PA'} (Bogor)</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-muted block">MASA PAJAK STNK</span>
              <p className="font-mono font-bold text-charcoal">{car?.taxStatus || 'Hidup s/d 11/2027'}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-muted block">KEPEMILIKAN</span>
              <p className="font-mono font-semibold text-charcoal">{car?.ownership || 'Tangan Pertama'}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-muted block">CEK FISIK SAMSAT</span>
              <p className="font-mono font-bold text-forest">Polda Jabar Lolos</p>
            </div>
          </div>
        </div>

        {/* Cluster 4: Verifikasi Odometer */}
        <div className="p-4 bg-alabaster border border-hairline space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-hairline text-charcoal">
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-forest" />
              <h4 className="font-heading text-xs font-bold uppercase tracking-wider">Verifikasi Odometer Riil</h4>
            </div>
            <Award className="h-3.5 w-3.5 text-forest" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] font-mono text-muted">JARAK TEMPUH AKTUAL</span>
              <span className="font-mono text-lg font-bold text-forest">
                {mileageNum.toLocaleString('id-ID')} KM
              </span>
            </div>
            <p className="text-[11px] font-mono text-muted leading-tight border-t border-hairline pt-2">
              Segel ECU & Odometer utuh. Garansi uang kembali 100% jika ditemukan manipulasi putaran odometer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
