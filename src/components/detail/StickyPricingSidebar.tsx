import React from 'react';
import { PhoneCall, CalendarClock, Download, Share2 } from 'lucide-react';
import { CarUnit } from '../../types/showroom';
import { CarStatusBadge } from '../common/CarStatusBadge';
import { CreditCalculator } from './CreditCalculator';
import { useShowroomStore } from '../../store/useShowroomStore';
import { useShowroomToast } from '../../hooks/useShowroomToast';
import { useTiltEffect } from '../../hooks/useTiltEffect';

interface StickyPricingSidebarProps {
  car?: Partial<CarUnit> | null;
}

export const StickyPricingSidebar: React.FC<StickyPricingSidebarProps> = ({ car }) => {
  const { setBookingModalOpen } = useShowroomStore();
  const { showToast } = useShowroomToast();
  const { ref: priceRef, style: priceStyle, onMouseMove, onMouseLeave } = useTiltEffect({ maxTilt: 4, scale: 1.01 });

  const isSold = car?.status === 'Terjual';
  const carTitle = car?.title || 'Unit Mobil Bekas Bergaransi';
  const carPrice = car?.price || 300000000;
  const plateNumber = car?.plateNumber || 'Plat F Bogor';
  const carStatus = car?.status || 'Tersedia';

  const formatRupiah = (num: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Halo labsite.id Bogor, saya ingin konsultasi unit ${carTitle} (${plateNumber}) seharga ${formatRupiah(carPrice)}.`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  const handleDownloadReport = () => {
    showToast('Laporan 160 Titik Siap', `Dokumen inspeksi digital resmi untuk ${carTitle} berhasil diproses.`);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Tautan Disalin', `Tautan spesifikasi ${carTitle} telah disalin ke clipboard.`);
  };

  return (
    <aside className="sticky top-20 sm:top-24 space-y-4 select-none">
      {/* 3D Subtle Tilt Price & Action Box */}
      <div
        ref={priceRef}
        style={priceStyle}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="border border-hairline bg-canvas p-6 space-y-5 shadow-sm transition-shadow"
      >
        <div className="space-y-3 pb-4 border-b border-hairline">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted uppercase tracking-wider block">Harga Tunai OTR Bogor</span>
            <CarStatusBadge status={carStatus} size="sm" />
          </div>
          <div className="font-heading text-3xl sm:text-4xl font-bold text-forest leading-none">
            {formatRupiah(carPrice)}
          </div>

          {/* Unduh & Bagikan */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleDownloadReport}
              className="flex-1 h-10 px-3 inline-flex items-center justify-center gap-2 text-xs font-mono font-semibold text-charcoal bg-canvas border border-hairline hover:bg-forest hover:text-white hover:border-forest transition-colors shadow-sm whitespace-nowrap"
              title="Unduh laporan inspeksi lengkap 160 titik"
            >
              <Download className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">Unduh Laporan 160 Titik</span>
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="h-10 w-10 flex items-center justify-center bg-canvas border border-hairline hover:bg-forest hover:text-white text-charcoal transition-colors shrink-0 shadow-sm"
              title="Bagikan unit ini"
            >
              <Share2 className="h-4 w-4 shrink-0" />
            </button>
          </div>
        </div>

        {/* Tombol Konversi WhatsApp & Test Drive */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleWhatsApp}
            disabled={isSold}
            className="w-full py-3.5 px-4 bg-forest text-white font-mono text-xs font-bold hover:bg-forest-light border border-forest transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
          >
            <PhoneCall className="h-4 w-4" />
            <span>{isSold ? 'Unit Telah Terjual' : 'Hubungi Sales via WhatsApp'}</span>
          </button>

          <button
            type="button"
            onClick={() => setBookingModalOpen(true, carTitle)}
            disabled={isSold}
            className="w-full py-3 px-4 bg-alabaster text-charcoal font-mono text-xs font-bold hover:bg-canvas border border-hairline hover:border-forest transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <CalendarClock className="h-4 w-4 text-forest" />
            <span>Jadwalkan Test Drive di Bogor</span>
          </button>
        </div>
      </div>

      {/* Credit Simulator Module */}
      <CreditCalculator carPrice={carPrice} />
    </aside>
  );
};
