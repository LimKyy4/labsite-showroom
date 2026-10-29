import React from 'react';
import { ShieldCheck, Cpu, FileCheck, CheckCircle2 } from 'lucide-react';
import { BentoBlueprintCard } from './BentoBlueprintCard';

export const ValueBentoGrid: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-alabaster border-b border-hairline">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-hairline pb-6">
          <div className="space-y-2">
            <span className="text-[11px] font-mono tracking-widest text-forest uppercase font-bold">
              STANDAR KURASI ARSITEKTURAL
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal tracking-tight">
              PROTOKOL INTEGRITAS KENDARAAN.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-muted font-body max-w-md leading-relaxed">
            Eliminasi risiko mobil bekas dengan transparansi teknis total, pengujian sensor digital, dan jaminan buyback berkekuatan hukum.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Kartu 01: 2/3 Lebar (Garansi Mesin & Transmisi 1 Tahun) */}
          <BentoBlueprintCard
            className="md:col-span-8 min-h-[300px]"
            badge="PILAR UTAMA • 365 HARI"
            title="Garansi Mesin & Girboks Transmisi 1 Tahun Penuh"
            description="Perlindungan penuh seluruh komponen mekanikal internal mesin, transmisi otomatis, torque converter, dan sistem pendingin radiator tanpa batasan kilometer mendadak."
            icon={ShieldCheck}
            blueprintType="transmission"
            items={[
              'Silinder Blok & Piston Head',
              'Valve & Camshaft Assembly',
              'Girboks Otomatis & Valve Body',
              'Water Pump & Radiator Core',
            ]}
          />

          {/* Kartu 02: 1/3 Lebar (Uji 160 Titik Bebas Banjir Bogor) */}
          <BentoBlueprintCard
            className="md:col-span-4 min-h-[300px]"
            badge="BEBAS BANJIR BOGOR"
            title="Inspeksi 160 Titik Deteksi Banjir"
            description="Bongkar karpet dasar, endoskopi celah sasis, dan pengujian kelembaban sensor kabin untuk jaminan mutlak unit bebas genangan air Sungai Cisadane / Katulampa."
            icon={Cpu}
            blueprintType="flood_sensor"
          />

          {/* Kartu 03: 1/3 Lebar (Legalitas Samsat Bogor) */}
          <BentoBlueprintCard
            className="md:col-span-4 min-h-[280px]"
            badge="LEGALITAS SAMSAT"
            title="BPKB & Cek Fisik Polda Jabar Sah"
            description="Nomor rangka dan nomor mesin dicek fisik langsung di Samsat Kota Bogor. Faktur ATPM lengkap, bebas sengketa perdata, dan bebas status blokir ETLE."
            icon={FileCheck}
            blueprintType="samsat_stamp"
          />

          {/* Kartu 04: 2/3 Lebar (Garansi Buyback & Odometer Asli) */}
          <BentoBlueprintCard
            className="md:col-span-8 min-h-[280px]"
            badge="KLAUSUL BUYBACK 100%"
            title="Jaminan Uang Kembali 100% Tanpa Potongan"
            description="Apabila ditemukan bekas tabrakan struktur sasis utama atau odometer terbukti bekas putaran manual, showroom labsite.id membeli kembali mobil Anda dengan pengembalian dana tunai 100% tertulis di atas meterai resmi."
            icon={CheckCircle2}
            blueprintType="buyback"
            items={[
              'Histori Servis Bengkel Resmi Tervalidasi',
              'Klausul Buyback Bermaterai Sah',
              'Inspeksi Independen Dipersilakan',
              'Bebas Biaya Pengurusan Balik Nama Tahap 1',
            ]}
          />
        </div>
      </div>
    </section>
  );
};
