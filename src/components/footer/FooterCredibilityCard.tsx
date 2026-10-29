import React from 'react';
import { Clock, MapPin, CheckCircle2, Award } from 'lucide-react';

export const FooterCredibilityCard: React.FC = () => {
  return (
    <div className="border border-hairline bg-canvas p-5 space-y-4 shadow-sm">
      <div className="flex items-center justify-between pb-2.5 border-b border-hairline">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted font-bold">
          Kantor & Showroom Fisik
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-forest font-bold">
          <CheckCircle2 className="h-3 w-3" />
          <span>Fisik Terverifikasi</span>
        </span>
      </div>

      {/* Jam Operasional */}
      <div className="space-y-2 text-xs font-body">
        <div className="flex items-start gap-2.5">
          <Clock className="h-4 w-4 text-forest shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-charcoal">Senin – Sabtu</p>
            <p className="text-muted font-mono text-[11px]">08.00 – 18.00 WIB</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5 pt-1 border-t border-hairline/60">
          <Clock className="h-4 w-4 text-sage shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-charcoal">Minggu & Libur Nasional</p>
            <p className="text-muted font-mono text-[11px]">09.00 – 16.30 WIB (Dengan Janji Temu)</p>
          </div>
        </div>
      </div>

      {/* Alamat Fisik */}
      <div className="flex items-start gap-2.5 pt-2 border-t border-hairline text-xs font-body">
        <MapPin className="h-4 w-4 text-forest shrink-0 mt-0.5" />
        <p className="text-muted">
          Jl. Pajajaran No. 88, Baranangsiang, Bogor Timur (5 Menit dari Gerbang Tol Jagorawi).
        </p>
      </div>

      {/* Digital Flat Stamp Samsat */}
      <div className="pt-2">
        <div className="p-2.5 bg-sage-light border-2 border-forest text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-forest">
            <Award className="h-4 w-4" />
            <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
              CAP VERIFIKASI RESMI
            </span>
          </div>
          <p className="font-heading text-xs font-bold text-forest tracking-tight leading-none">
            TERVALIDASI CEK FISIK SAMSAT KOTA BOGOR
          </p>
          <span className="font-mono text-[9px] text-muted block">
            No. Reg Jabar: BGR-2026-PHYS-88
          </span>
        </div>
      </div>
    </div>
  );
};
