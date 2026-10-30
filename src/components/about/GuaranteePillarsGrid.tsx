import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Cog, Waves, FileCheck, RefreshCw, Award } from 'lucide-react';
import { PillarMatrixCard } from './PillarMatrixCard';

export const GuaranteePillarsGrid: React.FC = () => {
  const pillars = [
    {
      num: '01',
      regCode: 'REG-QA/BGR-01',
      title: 'Garansi Mekanikal Mesin 365 Hari',
      desc: 'Proteksi komprehensif tanpa kompromi terhadap kerusakan mekanis internal ruang bakar selama 1 tahun penuh kalender.',
      scope: 'Silinder Blok, Poros Engkol, Pompa Oli, Katup & Camshaft',
      icon: Shield,
    },
    {
      num: '02',
      regCode: 'REG-QA/BGR-02',
      title: 'Garansi Modul Transmisi & TCM',
      desc: 'Perlindungan girboks otomatis maupun manual terhadap malafungsi hidrolik, slip gigi, dan kerusakan modul elektronik TCM.',
      scope: 'Girboks Matic/Manual, Torque Converter, Valve Body & TCM',
      icon: Cog,
    },
    {
      num: '03',
      regCode: 'REG-QA/BGR-03',
      title: 'Sertifikasi Anti-Banjir Cisadane',
      desc: 'Pemeriksaan endoskopi kolong sasis dan soket kelistrikan ECU bebas dari residu lumpur luapan sungai atau genangan Bogor.',
      scope: 'Endoskopi Rongga Sasis, Karpet Kering & Soket ECU Bebas Korosi',
      icon: Waves,
    },
    {
      num: '04',
      regCode: 'REG-QA/BGR-04',
      title: 'Keabsahan Fisik Samsat & Polda Jabar',
      desc: 'Uji fisik keaslian nomor rangka dan nomor mesin langsung di Samsat Kota Bogor. Terbebas dari blokir perdata maupun tilang ETLE.',
      scope: 'BPKB Asli, Faktur ATPM, Cek Fisik Korlantas & Cek Blokir ETLE',
      icon: FileCheck,
    },
    {
      num: '05',
      regCode: 'REG-QA/BGR-05',
      title: 'Jaminan Buyback 100% Bermaterai',
      desc: 'Jaminan pengembalian dana tunai 100% tanpa potongan jika di kemudian hari ditemukan cacat struktural yang terlewat saat inspeksi.',
      scope: 'Klausul Hukum Bermaterai Sah, Uang Kembali Penuh Tanpa Pinalti',
      icon: RefreshCw,
    },
  ];

  return (
    <section aria-label="Matriks Perlindungan Hukum Garansi" className="bg-alabaster border-b border-hairline py-16 sm:py-24 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
              INSTITUTIONAL WARRANTY MATRIX
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
              5 PILAR TATA KELOLA RISIKO TANPA KOMPROMI.
            </h2>
            <p className="font-body text-xs sm:text-sm text-muted">
              Polis garansi tertulis bermaterai yang diserahterimakan bersama sertifikat keabsahan saat serah terima kendaraan.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-canvas border border-hairline text-forest font-mono text-xs font-bold shadow-sm">
            <Award className="h-4 w-4" />
            <span>STANDARISASI AKREDITASI REGIONAL</span>
          </div>
        </div>

        {/* 5-Column Responsive Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {pillars.map((p, idx) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex flex-col"
            >
              <PillarMatrixCard {...p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
