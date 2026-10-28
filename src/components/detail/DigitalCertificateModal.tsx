import React from 'react';
import { X, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { CarUnit } from '../../types/showroom';

interface DigitalCertificateModalProps {
  car: CarUnit;
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalCertificateModal: React.FC<DigitalCertificateModalProps> = ({
  car,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-none" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-lg border border-hairline bg-canvas p-6 sm:p-7 shadow-2xl space-y-5">
        <div className="flex items-start justify-between pb-3 border-b border-hairline">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-forest" />
              <h3 className="font-heading text-lg font-bold text-charcoal">
                Sertifikat Digital Uji Kelayakan 160 Titik
              </h3>
            </div>
            <p className="font-mono text-xs text-muted mt-0.5">
              Nomor Registrasi: CERT-BOGOR-{car.id.toUpperCase().substring(0, 14)}
            </p>
          </div>
          <button type="button" onClick={onClose} className="p-1 border border-hairline hover:bg-alabaster">
            <X className="h-4 w-4 text-charcoal" />
          </button>
        </div>

        <div className="border border-hairline bg-alabaster p-4 space-y-3 font-mono text-xs">
          <div className="flex justify-between border-b border-hairline pb-2">
            <span className="text-muted">Unit Kendaraan:</span>
            <strong className="text-charcoal">{car.title}</strong>
          </div>
          <div className="flex justify-between border-b border-hairline pb-2">
            <span className="text-muted">Nomor Polisi:</span>
            <strong className="text-forest">{car.plateNumber}</strong>
          </div>
          <div className="flex justify-between border-b border-hairline pb-2">
            <span className="text-muted">Status Validasi Samsat:</span>
            <strong className="text-forest">Lolos Cek Fisik Polda Jabar</strong>
          </div>
          <div className="flex justify-between border-b border-hairline pb-2">
            <span className="text-muted">Jaminan Rendaman Air:</span>
            <strong className="text-forest">100% Bebas Banjir Bogor</strong>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-muted">Masa Perlindungan:</span>
            <strong className="text-forest">365 Hari Polis Mekanikal Mesin</strong>
          </div>
        </div>

        <div className="p-3 bg-sage-light border border-sage-border flex items-center gap-2 text-xs font-mono text-forest font-bold">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Sertifikat Resmi Bergaransi Buyback 100% labsite.id Showroom</span>
        </div>

        <div className="pt-2">
          <Button variant="primary" size="md" fullWidth onClick={onClose}>
            <FileCheck className="h-4 w-4" />
            <span>Tutup Sertifikat Digital</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
