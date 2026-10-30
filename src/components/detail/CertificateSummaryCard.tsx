import React from 'react';
import { Award, CheckCircle2, ChevronRight, FileCheck, ShieldCheck } from 'lucide-react';

interface CertificateSummaryCardProps {
  onOpenDrawer: () => void;
  carTitle?: string;
}

export const CertificateSummaryCard: React.FC<CertificateSummaryCardProps> = ({
  onOpenDrawer,
  carTitle = 'Toyota Fortuner VRZ',
}) => {
  return (
    <div className="border border-hairline bg-canvas p-5 sm:p-7 space-y-5 select-none shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-hairline gap-2">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
            SERTIFIKAT KELAYAKAN INSPEKSI
          </span>
          <h3 className="font-heading text-base sm:text-lg font-bold text-charcoal">
            Ringkasan Verifikasi 160 Titik Standar labsite.id
          </h3>
        </div>
        <span className="font-mono text-[11px] sm:text-xs text-forest bg-sage-light px-2.5 py-1 border border-sage-border font-semibold self-start sm:self-auto flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Sertifikasi Lolos Penuh</span>
        </span>
      </div>

      {/* Main Score Hero */}
      <div className="border border-hairline bg-alabaster p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
        <div className="space-y-1.5">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-heading text-4xl sm:text-5xl font-bold text-forest">99</span>
            <span className="font-mono text-xl text-muted font-bold">/100</span>
          </div>
          <p className="font-heading text-sm font-bold text-charcoal">
            Skor Kelayakan Mekanikal & Sasis Utama
          </p>
          <p className="font-body text-xs text-muted max-w-sm">
            Unit {carTitle} telah melalui pengujian 160 pos kontrol menyeluruh oleh tim teknisi independen bersertifikat BNSP.
          </p>
        </div>

        {/* Dual Solid Badges */}
        <div className="flex flex-row sm:flex-col gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-sage-light border border-forest text-forest font-mono text-xs font-bold shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-forest shrink-0" />
            <span>Bebas Banjir Bogor</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-sage-light border border-forest text-forest font-mono text-xs font-bold shadow-sm">
            <CheckCircle2 className="h-3.5 w-3.5 text-forest shrink-0" />
            <span>Bebas Tabrak Sasis</span>
          </div>
        </div>
      </div>

      {/* Inspector Identification Strip */}
      <div className="p-3.5 bg-canvas border border-hairline flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-forest" />
          <span className="text-muted">Inspektor Resmi:</span>
          <span className="font-bold text-charcoal">Hendra Gunawan, S.T. (BNSP Lead Inspector)</span>
        </div>
        <span className="text-[10px] text-muted">ID: BGR-INSP-2026-904</span>
      </div>

      {/* Action CTA Button to Open Drawer */}
      <button
        type="button"
        onClick={onOpenDrawer}
        className="w-full py-3.5 px-4 bg-forest text-white font-mono text-xs font-bold hover:bg-forest-light border border-forest transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95"
      >
        <FileCheck className="h-4 w-4" />
        <span>Buka Buku Laporan 160 Titik Lengkap</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};
