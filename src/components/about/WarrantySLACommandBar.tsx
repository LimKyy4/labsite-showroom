import React from 'react';
import { Clock, Wrench, ShieldCheck, Download } from 'lucide-react';
import { useShowroomToast } from '../../hooks/useShowroomToast';

export const WarrantySLACommandBar: React.FC = () => {
  const { showToast } = useShowroomToast();

  const handleDownloadPolicy = () => {
    showToast(
      'Draf Polis Garansi Resmi Diproses',
      'Salinan draf polis garansi mesin & transmisi 365 hari siap diunduh.',
      'success'
    );
  };

  const slaMetrics = [
    {
      time: '< 30 Menit',
      label: 'SLA Respon Darurat',
      desc: 'Layanan Derek (Towing) Siaga 24 Jam Wilayah Bogor Raya',
      icon: Clock,
    },
    {
      time: '1 Hari Kerja',
      label: 'SLA Taksasi Diagnostik',
      desc: 'Inspeksi Digital & Estimasi Perbaikan di Bengkel Pajajaran',
      icon: Wrench,
    },
    {
      time: '100% Orisinil',
      label: 'SLA Suku Cadang Resmi',
      desc: 'Penggantian Komponen Genuine Parts Pabrikan Tanpa Biaya',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="border border-hairline bg-canvas p-6 sm:p-7 space-y-6 shadow-sm select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-hairline gap-3">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
            SERVICE LEVEL AGREEMENT (SLA)
          </span>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-charcoal">
            Matriks Kecepatan Penanganan Klaim & Darurat
          </h3>
        </div>

        <button
          type="button"
          onClick={handleDownloadPolicy}
          className="inline-flex items-center gap-2 px-4 py-2 bg-forest text-white hover:bg-forest-light border border-forest font-mono text-xs font-bold transition-all shadow-sm self-start sm:self-auto"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Unduh Draf Polis Garansi (.PDF)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {slaMetrics.map((sla, idx) => {
          const Icon = sla.icon;
          return (
            <div key={idx} className="p-4 bg-alabaster border border-hairline space-y-2">
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-forest" />
                <span className="font-mono text-[10px] text-forest font-bold bg-sage-light px-2 py-0.5 border border-sage-border">
                  GUARANTEED SLA
                </span>
              </div>
              <span className="font-heading text-2xl font-bold text-charcoal block">
                {sla.time}
              </span>
              <p className="font-heading text-xs font-bold text-charcoal">
                {sla.label}
              </p>
              <p className="font-body text-xs text-muted leading-relaxed">
                {sla.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
