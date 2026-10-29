import React, { useState } from 'react';
import { Download, Eye, Award, ShieldCheck } from 'lucide-react';
import { LegalitySheet, CarUnit } from '../../types/showroom';
import { DEFAULT_LEGALITY_SHEET } from '../../data/technicalSpecsData';
import { useShowroomToast } from '../../hooks/useShowroomToast';
import { useTiltEffect } from '../../hooks/useTiltEffect';
import { DigitalCertificateModal } from './DigitalCertificateModal';

interface SamsatLegalityPanelProps {
  car: CarUnit;
  legality?: LegalitySheet | null;
}

export const SamsatLegalityPanel: React.FC<SamsatLegalityPanelProps> = ({ car, legality }) => {
  const [certModalOpen, setCertModalOpen] = useState(false);
  const { showToast } = useShowroomToast();
  const { ref: tiltRef, style: tiltStyle, onMouseMove, onMouseLeave } = useTiltEffect({ maxTilt: 5, scale: 1.01 });

  const safeLegality: LegalitySheet = {
    ...DEFAULT_LEGALITY_SHEET,
    ...(legality || car.legalitySheet || {}),
  };

  const handleDownload = () => {
    showToast('Lembar Validasi Diproses', `Berkas cek fisik Samsat & BPKB ${car.title} telah siap diunduh.`);
  };

  return (
    <div className="border border-hairline bg-canvas p-6 sm:p-7 space-y-6 select-none shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-hairline gap-3">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
            DOSSIER LEGALITAS SAMSAT BOGOR
          </span>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-charcoal">
            Lembar Keabsahan Dokumen & Verifikasi Polda Jabar
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCertModalOpen(true)}
            className="px-3 py-1.5 bg-canvas border border-hairline hover:border-forest text-xs font-mono font-semibold text-charcoal flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Eye className="h-3.5 w-3.5 text-forest" />
            <span>Sertifikat Digital</span>
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="px-3 py-1.5 bg-alabaster border border-hairline hover:border-muted text-xs font-mono font-semibold text-charcoal flex items-center gap-1.5 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Unduh Berkas</span>
          </button>
        </div>
      </div>

      {/* Blueprint Grid Structure Key-Value */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        <div className="p-4 bg-alabaster border border-hairline space-y-1">
          <span className="text-muted block text-[10px] uppercase">1. BPKB & FAKTUR ORIGINAL:</span>
          <p className="font-bold text-charcoal text-sm">{safeLegality.bpkbInvoiceStatus}</p>
        </div>
        <div className="p-4 bg-alabaster border border-hairline space-y-1">
          <span className="text-muted block text-[10px] uppercase">2. PAJAK STNK & MASA BERLAKU:</span>
          <p className="font-bold text-charcoal text-sm">{safeLegality.stnkTaxValidity}</p>
        </div>
        <div className="p-4 bg-alabaster border border-hairline space-y-1">
          <span className="text-muted block text-[10px] uppercase">3. WILAYAH REGISTRASI SAMSAT:</span>
          <p className="font-bold text-forest text-sm">{car.plateNumber} ({safeLegality.registrationArea})</p>
        </div>
        <div className="p-4 bg-alabaster border border-hairline space-y-1">
          <span className="text-muted block text-[10px] uppercase">4. HASIL CEK FISIK KORLANTAS:</span>
          <p className="font-bold text-charcoal text-sm">{safeLegality.samsatPhysicalCheck}</p>
        </div>
      </div>

      {/* Cap Stempel Flat Digital Samsat */}
      <div className="p-3 bg-sage-light border-2 border-forest text-center space-y-1">
        <div className="flex items-center justify-center gap-2 text-forest">
          <ShieldCheck className="h-4 w-4" />
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
            STEMPEL RESMI VERIFIKASI SAMSAT PAJAJARAN
          </span>
        </div>
        <p className="font-heading text-sm font-bold text-forest tracking-wider uppercase">
          TERVERIFIKASI FISIK POLDA JABAR & SAMSAT PAJAJARAN
        </p>
        <span className="font-mono text-[9px] text-muted block">
          Nomor Dokumen: POLDA-JBR/BGR/2026/SEC-8891 • Bebas Blokir ETLE & Sengketa
        </span>
      </div>

      {/* 3D Tilt Buyback Guarantee Card */}
      <div
        ref={tiltRef}
        style={tiltStyle}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="p-4 bg-canvas border-2 border-forest flex items-start gap-3 shadow-md transition-shadow"
      >
        <Award className="h-6 w-6 text-forest shrink-0 mt-0.5" />
        <div className="font-body text-xs text-charcoal space-y-1">
          <div className="flex items-center gap-2">
            <p className="font-heading font-bold text-forest text-sm">
              Jaminan Buyback 100% Bermaterai Resmi
            </p>
            <span className="px-2 py-0.5 bg-forest text-white font-mono text-[9px] font-bold">KLAUSUL HUKUM</span>
          </div>
          <p className="text-muted leading-relaxed">
            {safeLegality.buybackGuaranteeClause}. Garansi pengembalian dana 100% jika terbukti ada cacat administrasi, nomor rangka tidak sesuai, atau sengketa leasing masa lalu.
          </p>
        </div>
      </div>

      <DigitalCertificateModal car={car} isOpen={certModalOpen} onClose={() => setCertModalOpen(false)} />
    </div>
  );
};
