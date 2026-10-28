import React from 'react';
import { X, ShieldCheck, ArrowRight, PhoneCall } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';
import { Button } from '../ui/button';
import { CarStatusBadge } from '../common/CarStatusBadge';

export const QuickPeekModal: React.FC = () => {
  const { quickPeekCar, setQuickPeekCar, setSelectedCarId, setActiveTab } = useShowroomStore();

  if (!quickPeekCar) return null;

  const handleOpenDetail = () => {
    setSelectedCarId(quickPeekCar.id);
    setActiveTab('detail');
    setQuickPeekCar(null);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Halo admin, saya tertarik dengan unit ${quickPeekCar.title} (${quickPeekCar.plateNumber}).`);
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  const formatRupiah = (num: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-charcoal/60"
        onClick={() => setQuickPeekCar(null)}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-lg border border-hairline bg-canvas p-6 shadow-2xl space-y-4">
        <div className="flex items-start justify-between pb-3 border-b border-hairline">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
              INTIP CEPAT UNIT TERPILIH
            </span>
            <h3 className="font-heading text-lg font-bold text-charcoal">{quickPeekCar.title}</h3>
          </div>
          <button
            type="button"
            onClick={() => setQuickPeekCar(null)}
            className="p-1 border border-hairline hover:bg-alabaster"
          >
            <X className="h-4 w-4 text-charcoal" />
          </button>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden bg-hairline border border-hairline">
          <img src={quickPeekCar.images[0]} alt={quickPeekCar.title} className="h-full w-full object-cover" />
          <div className="absolute top-3 left-3">
            <CarStatusBadge status={quickPeekCar.status} />
          </div>
        </div>

        <div className="bg-alabaster border border-hairline p-3.5 space-y-2 font-mono text-xs text-charcoal">
          <div className="flex justify-between border-b border-hairline pb-1.5">
            <span className="text-muted">Skor Mesin:</span>
            <span className="font-bold text-forest">{quickPeekCar.inspectionBreakdown?.engineScore || '98/100'}</span>
          </div>
          <div className="flex justify-between border-b border-hairline pb-1.5">
            <span className="text-muted">Struktur Sasis:</span>
            <span className="font-bold text-forest">{quickPeekCar.inspectionBreakdown?.chassisScore || '100/100'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-forest font-bold pt-1">
            <ShieldCheck className="h-4 w-4" />
            <span>Garansi Mesin & Transmisi 365 Hari Aktif</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="font-mono text-[10px] text-muted block uppercase">Harga OTR Bogor</span>
            <span className="font-heading text-xl font-bold text-forest">{formatRupiah(quickPeekCar.price)}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleOpenDetail}>
              <span>Halaman Detail</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
            <Button variant="primary" size="sm" onClick={handleWhatsApp}>
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Chat WA</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
