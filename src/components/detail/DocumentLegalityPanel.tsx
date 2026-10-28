import React, { useState } from 'react';
import { Download, Eye, Award } from 'lucide-react';
import { LegalitySheet, CarUnit } from '../../types/showroom';
import { DEFAULT_LEGALITY_SHEET } from '../../data/technicalSpecsData';
import { useShowroomStore } from '../../store/useShowroomStore';
import { Button } from '../ui/button';
import { DigitalCertificateModal } from './DigitalCertificateModal';

interface DocumentLegalityPanelProps {
  car: CarUnit;
  legality?: LegalitySheet | null;
}

export const DocumentLegalityPanel: React.FC<DocumentLegalityPanelProps> = ({ car, legality }) => {
  const [certModalOpen, setCertModalOpen] = useState(false);
  const { addToast } = useShowroomStore();

  const safeLegality: LegalitySheet = {
    ...DEFAULT_LEGALITY_SHEET,
    ...(legality || car.legalitySheet || {}),
  };

  const handleDownload = () => {
    addToast('Lembar Validasi Diproses', `Berkas cek fisik Samsat & keabsahan BPKB ${car.title} telah siap dibuka.`);
  };

  return (
    <div className="border border-hairline bg-canvas p-6 sm:p-7 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-hairline gap-3">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
            VERIFIKASI FISIK & SAMSAT BOGOR
          </span>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-charcoal">
            Lembar Keabsahan Legalitas Dokumen
          </h3>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setCertModalOpen(true)}>
            <Eye className="h-3.5 w-3.5 text-forest" />
            <span>Intip Sertifikat Digital</span>
          </Button>
          <Button variant="secondary" size="sm" onClick={handleDownload}>
            <Download className="h-3.5 w-3.5" />
            <span>Unduh Berkas</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        <div className="p-4 bg-alabaster border border-hairline space-y-1.5">
          <span className="text-muted block text-[11px] uppercase">1. BPKB & Faktur Asli:</span>
          <p className="font-bold text-charcoal">{safeLegality.bpkbInvoiceStatus}</p>
        </div>

        <div className="p-4 bg-alabaster border border-hairline space-y-1.5">
          <span className="text-muted block text-[11px] uppercase">2. Pajak STNK & Masa Berlaku Kaleng:</span>
          <p className="font-bold text-charcoal">{safeLegality.stnkTaxValidity}</p>
        </div>

        <div className="p-4 bg-alabaster border border-hairline space-y-1.5">
          <span className="text-muted block text-[11px] uppercase">3. Wilayah Registrasi Wilayah:</span>
          <p className="font-bold text-forest">{car.plateNumber} ({safeLegality.registrationArea})</p>
        </div>

        <div className="p-4 bg-alabaster border border-hairline space-y-1.5">
          <span className="text-muted block text-[11px] uppercase">4. Hasil Cek Fisik Samsat Polda Jabar:</span>
          <p className="font-bold text-charcoal">{safeLegality.samsatPhysicalCheck}</p>
        </div>
      </div>

      {/* 100% Buyback Guarantee Banner */}
      <div className="p-4 bg-sage-light border border-sage-border flex items-start gap-3">
        <Award className="h-5 w-5 text-forest shrink-0 mt-0.5" />
        <div className="font-body text-xs text-charcoal space-y-0.5">
          <p className="font-heading font-bold text-forest text-sm">Klausul Jaminan Buyback Dokumen 100%</p>
          <p className="text-muted leading-relaxed">
            {safeLegality.buybackGuaranteeClause}. Menjamin ketenangan kepemilikan tanpa risiko sengketa perdata, blokir tilang elektronik ETLE, maupun cacat administratif di Samsat.
          </p>
        </div>
      </div>

      <DigitalCertificateModal car={car} isOpen={certModalOpen} onClose={() => setCertModalOpen(false)} />
    </div>
  );
};
