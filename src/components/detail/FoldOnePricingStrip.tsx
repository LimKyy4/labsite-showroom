import React from 'react';
import { Download, Share2 } from 'lucide-react';
import { CarUnit } from '../../types/showroom';
import { useShowroomToast } from '../../hooks/useShowroomToast';

interface FoldOnePricingStripProps {
  car: CarUnit;
}

export const FoldOnePricingStrip: React.FC<FoldOnePricingStripProps> = ({ car }) => {
  const { showToast } = useShowroomToast();

  const carPrice = car?.price || 478000000;
  const formatRupiah = (num: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  const handleDownloadReport = () => {
    showToast('Lembar 160 Titik Diproses', `Dokumen inspeksi resmi untuk ${car.title} telah siap diunduh.`);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Tautan Disalin', `Spesifikasi ${car.title} siap dibagikan.`);
  };

  return (
    <div className="lg:hidden border border-hairline bg-canvas p-4 sm:p-5 space-y-3.5 shadow-sm select-none">
      <div className="space-y-1">
        <span className="font-mono text-[10px] sm:text-xs text-muted uppercase tracking-wider block">
          Harga Tunai OTR Bogor
        </span>
        <div className="font-heading text-2xl sm:text-3xl font-bold text-forest leading-none">
          {formatRupiah(carPrice)}
        </div>
        <p className="font-mono text-[11px] sm:text-xs text-muted pt-1">
          Mulai Rp 11,2 Jt / bln • DP 20% (Tenor hingga 5 Tahun)
        </p>
      </div>

      {/* Dual Horizontal Action Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t border-hairline">
        <button
          type="button"
          onClick={handleDownloadReport}
          className="flex-1 py-2.5 px-3 bg-canvas border border-hairline hover:bg-forest hover:text-white hover:border-forest text-charcoal font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm active:scale-95"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="truncate">Unduh Lembar 160 Titik</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="py-2.5 px-3 bg-canvas border border-hairline hover:bg-forest hover:text-white hover:border-forest text-charcoal font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm active:scale-95 shrink-0"
          title="Bagikan Unit"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span>Bagikan</span>
        </button>
      </div>
    </div>
  );
};
