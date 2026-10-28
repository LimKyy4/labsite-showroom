import React from 'react';
import { Award, ShieldCheck, Users, Star } from 'lucide-react';

export const BrandStory: React.FC = () => {
  const metrics = [
    { value: '450+', label: 'Unit Terjual di Bogor', icon: Award },
    { value: '99.4%', label: 'Indeks Kepuasan Konsumen', icon: ShieldCheck },
    { value: '4.9/5.0', label: 'Rating Google Review', icon: Star },
    { value: '12 Orang', label: 'Teknisi Inspeksi Berlisensi', icon: Users },
  ];

  return (
    <section aria-label="Profil dan Cerita Brand Showroom" className="bg-canvas border-b border-hairline py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
              DEDIKASI KUALITAS OTOMOTIF BOGOR
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal leading-[1.15]">
              Standar Kejujuran & Keamanan Beli Mobil Bekas di Kota Hujan.
            </h1>
            <p className="font-body text-sm sm:text-base text-muted leading-relaxed">
              Didirikan dengan prinsip transparansi penuh, labsite.id Showroom hadir untuk menghapus stigma keraguan konsumen mobil bekas. Kami paham betul tantangan geografis Bogor—dari risiko kelembaban ekstrem hingga genangan air. Setiap mobil kami pastikan melewati 160 titik uji fisik sebelum diizinkan menyentuh lantai pamer.
            </p>
            <div className="border-l-2 border-forest pl-4 py-1 italic font-body text-sm text-charcoal bg-alabaster p-3">
              "Kami menolak lebih dari 70% mobil yang ditawarkan karena tidak memenuhi batas toleransi integritas sasis dan kelistrikan kami."
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {metrics.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div key={idx} className="border border-hairline bg-alabaster p-5 space-y-2">
                  <Icon className="h-5 w-5 text-forest" />
                  <span className="font-heading text-2xl sm:text-3xl font-bold text-charcoal block">
                    {m.value}
                  </span>
                  <span className="font-body text-xs text-muted block leading-snug">
                    {m.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
