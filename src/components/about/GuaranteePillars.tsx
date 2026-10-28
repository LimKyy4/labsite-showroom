import React from 'react';
import { Shield, Cog, Waves, FileCheck, RefreshCw } from 'lucide-react';
import { useTiltEffect } from '../../hooks/useTiltEffect';

const PillarCard: React.FC<{
  num: string;
  title: string;
  desc: string;
  icon: React.ElementType;
}> = ({ num, title, desc, icon: Icon }) => {
  const { ref, style, onMouseMove, onMouseLeave } = useTiltEffect({ maxTilt: 6 });

  return (
    <div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="border border-hairline bg-canvas p-6 flex flex-col justify-between hover:border-forest transition-colors duration-200"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-hairline">
          <div className="flex h-10 w-10 items-center justify-center bg-alabaster border border-hairline text-forest">
            <Icon className="h-5 w-5" />
          </div>
          <span className="font-mono text-sm font-bold text-muted">{num}</span>
        </div>
        <h3 className="font-heading text-base font-bold text-charcoal">{title}</h3>
        <p className="font-body text-xs text-muted leading-relaxed">{desc}</p>
      </div>
      <div className="mt-4 pt-3 border-t border-hairline text-[11px] font-mono text-forest font-semibold">
        Klausul Tertulis Resmi
      </div>
    </div>
  );
};

export const GuaranteePillars: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Garansi Mesin 365 Hari',
      desc: 'Perlindungan blok silinder, camshaft, crankshaft, dan oil pump dengan cover pergantian part di bengkel rekanan resmi.',
      icon: Shield,
    },
    {
      num: '02',
      title: 'Garansi Transmisi Otomatis',
      desc: 'Proteksi gir internal, valve body, torque converter, dan TCM transmisi otomatis terhadap gejala slip atau delay.',
      icon: Cog,
    },
    {
      num: '03',
      title: 'Jaminan Bebas Rendaman Banjir',
      desc: 'Sertifikasi uji endapan lumpur mikro pilar interior dan soket ECU anti-karat khas genangan air wilayah Bogor.',
      icon: Waves,
    },
    {
      num: '04',
      title: 'Keaslian BPKB & Cek Fisik Samsat',
      desc: 'Pengecekan keabsahan berkas langsung di Samsat Kota Bogor / Polda Jabar. Bebas tilang ETLE dan blokir perdata.',
      icon: FileCheck,
    },
    {
      num: '05',
      title: 'Jaminan Buyback 100%',
      desc: 'Uang kembali utuh tanpa potongan jika di kemudian hari ditemukan bukti kelalaian inspeksi fatal pada struktur sasis.',
      icon: RefreshCw,
    },
  ];

  return (
    <section aria-label="Pilar Perlindungan Garansi" className="bg-alabaster border-b border-hairline py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
            KOMITMEN PERLINDUNGAN KONSUMEN
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
            5 Pilar Garansi Tanpa Kompromi.
          </h2>
          <p className="font-body text-sm text-muted">
            Polis garansi tertulis yang diserahterimakan bersama dokumen unit saat serah terima kendaraan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {pillars.map((p) => (
            <PillarCard key={p.num} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
};
