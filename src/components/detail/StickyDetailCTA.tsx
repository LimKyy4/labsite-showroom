import React from 'react';
import { PhoneCall, CalendarClock, Download, Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import { CarUnit } from '../../types/showroom';
import { useShowroomStore } from '../../store/useShowroomStore';

interface StickyDetailCTAProps {
  car?: Partial<CarUnit> | null;
}

export const StickyDetailCTA: React.FC<StickyDetailCTAProps> = ({ car }) => {
  const { addToast, setBookingModalOpen } = useShowroomStore();
  const isSold = car?.status === 'Terjual';
  const carTitle = car?.title || 'Unit Mobil Bekas Bergaransi';
  const carPrice = car?.price || 300000000;
  const plateNumber = car?.plateNumber || 'Plat F Bogor';

  const formatRupiah = (num: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  const handleWhatsApp = () => {
    const text = `Halo admin labsite showroom, saya ingin konsultasi unit ${carTitle} (${plateNumber}) seharga ${formatRupiah(carPrice)}. Mohon info ketersediaan unit.`;
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDownloadReport = () => {
    addToast('Laporan 160 Titik Siap', `Dokumen inspeksi digital resmi untuk ${carTitle} berhasil diproses.`);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).finally(() => {
      addToast('Tautan Disalin', `Tautan spesifikasi ${carTitle} telah disalin ke clipboard.`);
    });
  };

  return (
    <div className="border border-hairline bg-white p-6 space-y-5 shadow-sm">
      {/* Baris Harga & Aksi Dokumen Proporsional */}
      <div className="space-y-3 pb-4 border-b border-hairline">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-xs text-muted uppercase tracking-wider block">Harga Tunai OTR Bogor</span>
          <span className="font-mono text-[11px] text-forest bg-sage-light px-2 py-0.5 border border-sage-border font-bold">
            Nego di Tempat
          </span>
        </div>
        <div className="font-heading text-3xl sm:text-4xl font-bold text-forest leading-none">
          {formatRupiah(carPrice)}
        </div>

        {/* Tombol Unduh Laporan Satu Baris Sejajar dengan Tombol Share */}
        <div className="flex items-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={handleDownloadReport}
            className="flex-1 min-w-0 h-11 px-3 sm:px-4 inline-flex items-center justify-center gap-2 text-xs font-mono font-semibold text-charcoal bg-white border border-hairline hover:bg-alabaster hover:border-forest hover:text-forest transition-colors"
            title="Unduh laporan inspeksi lengkap 160 titik"
          >
            <Download className="h-4 w-4 text-forest shrink-0" />
            <span className="truncate">Unduh Laporan 160 Titik</span>
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="h-11 w-11 flex items-center justify-center bg-white border border-hairline hover:bg-alabaster hover:border-forest text-charcoal hover:text-forest transition-colors shrink-0"
            title="Bagikan unit ini"
            aria-label="Bagikan unit ini"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Aksi Konversi Cepat */}
      <div className="space-y-2.5">
        <Button
          variant="primary"
          size="lg"
          onClick={handleWhatsApp}
          disabled={isSold}
          fullWidth
        >
          <PhoneCall className="h-4 w-4" />
          <span>{isSold ? 'Unit Telah Terjual' : 'Hubungi Sales via WhatsApp'}</span>
        </Button>

        <Button
          variant="secondary"
          size="lg"
          onClick={() => setBookingModalOpen(true, carTitle)}
          disabled={isSold}
          fullWidth
        >
          <CalendarClock className="h-4 w-4 text-forest" />
          <span>Jadwalkan Test Drive di Bogor</span>
        </Button>
      </div>
    </div>
  );
};
