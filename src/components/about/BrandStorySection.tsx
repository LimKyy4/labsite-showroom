import React from 'react';
import { Award, ShieldCheck, Users, Star, CheckCircle2, FileCheck } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  const kpiMetrics = [
    {
      value: '450+',
      label: 'Unit Tersertifikasi',
      sublabel: 'Tingkat Retensi Sasis Presisi 100%',
      auditTag: 'AUDIT FY-2026',
      icon: Award,
    },
    {
      value: '99.4%',
      label: 'Client Assurance Index',
      sublabel: 'Tervalidasi CSAT Regional Bogor',
      auditTag: 'INDEPENDENT CSAT',
      icon: ShieldCheck,
    },
    {
      value: '4.9/5.0',
      label: 'Skor Kredibilitas Publik',
      sublabel: 'Ulasan Terverifikasi Google Business',
      auditTag: 'GOOGLE VERIFIED',
      icon: Star,
    },
    {
      value: '12 Personel',
      label: 'Master Inspector Berlisensi',
      sublabel: 'Sertifikasi Resmi ASE & AIKI Indonesia',
      auditTag: 'LICENSED CORPS',
      icon: Users,
    },
  ];

  return (
    <section aria-label="Tata Kelola Mutu & Integritas Showroom" className="bg-canvas border-b border-hairline py-16 sm:py-24 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Institutional Assurance Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage-light border border-sage-border text-forest font-mono text-[11px] font-bold tracking-wider uppercase">
              <FileCheck className="h-3.5 w-3.5 text-forest" />
              <span>LEMBAGA PENJAMINAN MUTU & SERTIFIKASI OTOMOTIF • BOGOR REGIONAL</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-charcoal leading-[1.12]">
              STANDAR TATA KELOLA & INTEGRITAS KENDARAAN TERAKREDITASI.
            </h1>

            <p className="font-body text-sm sm:text-base text-muted leading-relaxed max-w-3xl">
              Platform inspeksi independen berstandar akreditasi korporat. Kami menerapkan protokol mitigasi risiko iklim mikro Bogor—dari ancaman korosi kelembaban tinggi hingga banjir lintasan Katulampa. Seluruh unit wajib melalui 160 pos verifikasi forensik sebelum diizinkan mengantongi sertifikat garansi resmi 365 hari.
            </p>
          </div>

          <div className="lg:col-span-4 p-5 bg-alabaster border border-hairline space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-forest font-bold block">
              KLAUSUL INTEGRITAS SELEKSI KETAT:
            </span>
            <p className="font-body text-xs text-charcoal leading-relaxed">
              "Kami menolak lebih dari 70% kendaraan yang diajukan setiap kuartal karena tidak memenuhi batas toleransi kompresi mesin, simetri pilar sasis pabrik, maupun keabsahan dokumen Korlantas."
            </p>
            <span className="font-mono text-[10px] text-muted block pt-1 border-t border-hairline">
              — Dewan Komite Kualitas & Standarisasi labsite.id
            </span>
          </div>
        </div>

        {/* Executive KPI Telemetry Strip (Integrated Single Console) */}
        <div className="border border-hairline bg-white shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-hairline">
            {kpiMetrics.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 bg-canvas hover:bg-alabaster transition-colors duration-200 flex flex-col justify-between space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center bg-alabaster border border-hairline text-forest group-hover:bg-forest group-hover:text-white transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-[9px] font-bold text-forest bg-sage-light px-2 py-0.5 border border-sage-border">
                      {kpi.auditTag}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="font-heading text-3xl sm:text-4xl font-bold text-charcoal block tracking-tight">
                      {kpi.value}
                    </span>
                    <h3 className="font-heading text-sm font-bold text-charcoal">
                      {kpi.label}
                    </h3>
                    <p className="font-body text-xs text-muted leading-snug">
                      {kpi.sublabel}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-hairline/60 flex items-center gap-1.5 text-[10px] font-mono text-forest font-semibold">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Audit Terverifikasi</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
