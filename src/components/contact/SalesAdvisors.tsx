import React from 'react';
import { PhoneCall, Copy } from 'lucide-react';
import { SALES_ADVISORS } from '../../data/mockData';
import { useShowroomStore } from '../../store/useShowroomStore';
import { Button } from '../ui/button';
import { useTiltEffect } from '../../hooks/useTiltEffect';
import { SalesAdvisor } from '../../types/showroom';

const AdvisorCard: React.FC<{ advisor: SalesAdvisor }> = ({ advisor }) => {
  const { addToast } = useShowroomStore();
  const { ref, style, onMouseMove, onMouseLeave } = useTiltEffect({ maxTilt: 5 });

  const copyPhone = () => {
    navigator.clipboard.writeText(advisor.phone).finally(() => {
      addToast('Nomor Disalin', `Nomor WhatsApp ${advisor.name} (${advisor.phone}) telah disalin.`);
    });
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(`Halo ${advisor.name}, saya ingin berkonsultasi mengenai unit mobil seken di Showroom Bogor.`);
    window.open(`https://wa.me/62${advisor.phone.substring(1)}?text=${text}`, '_blank');
  };

  return (
    <div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="border border-hairline bg-canvas p-5 flex flex-col justify-between hover:border-forest transition-colors duration-200"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <img
            src={advisor.avatar}
            alt={advisor.name}
            className="h-14 w-14 object-cover border border-hairline"
          />
          <div>
            <h4 className="font-heading text-base font-bold text-charcoal">{advisor.name}</h4>
            <span className="font-mono text-xs text-forest block">{advisor.role}</span>
          </div>
        </div>
        <div className="p-2.5 bg-alabaster border border-hairline text-xs font-body text-muted">
          {advisor.experience}
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-hairline space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-charcoal">
          <span>{advisor.phone}</span>
          <button
            type="button"
            onClick={copyPhone}
            className="flex items-center gap-1 text-forest hover:text-charcoal p-1"
            title="Salin nomor"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>Salin</span>
          </button>
        </div>
        <Button variant="primary" size="sm" fullWidth onClick={openWhatsApp}>
          <PhoneCall className="h-3.5 w-3.5" />
          <span>Chat WhatsApp</span>
        </Button>
      </div>
    </div>
  );
};

export const SalesAdvisors: React.FC = () => {
  return (
    <section aria-label="Tim Konsultan Penjualan" className="bg-canvas border-b border-hairline py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
            NARAHUBUNG LANGSUNG
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
            Konsultan Otomotif Siap Membantu.
          </h2>
          <p className="font-body text-sm text-muted">
            Konsultasi gratis mengenai spesifikasi mobil, simulasi kredit, atau estimasi nilai tukar tambah mobil lama Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SALES_ADVISORS.map((adv) => (
            <AdvisorCard key={adv.name} advisor={adv} />
          ))}
        </div>
      </div>
    </section>
  );
};
