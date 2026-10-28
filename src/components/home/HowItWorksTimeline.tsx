import React, { useState } from 'react';
import { Search, CalendarClock, HandCoins, Truck, Check, Clock, FileText } from 'lucide-react';

export const HowItWorksTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Penelusuran Stok & Verifikasi Riwayat',
      subtitle: 'Tahap Identifikasi',
      duration: '15 Menit',
      docName: 'Lembar Laporan 160 Titik & Cek Fisik Samsat',
      description: 'Pilih kendaraan impian di katalog online kami. Akses lembar laporan inspeksi 160 titik dan histori servis secara transparan tanpa syarat.',
      details: ['Laporan digital 160 titik terverifikasi', 'Transparansi odometer asli tanpa putar', 'Verifikasi berkas Samsat Polda Jabar'],
      icon: Search,
    },
    {
      step: '02',
      title: 'Penjadwalan Inspeksi & Test Drive',
      subtitle: 'Pengujian Fisik',
      duration: '45 Menit',
      docName: 'Formulir Uji Jalan & Hasil Scanner OBD-2',
      description: 'Kunjungi showroom di Baranangsiang Bogor. Rasakan performa langsung di jalur tanjakan & jalan lingkar Bogor didampingi tim teknis.',
      details: ['Rute uji jalan realistis tanjakan Bogor', 'Fasilitas scanner OBD-2 mandiri', 'Bebas bawa inspektor eksternal'],
      icon: CalendarClock,
    },
    {
      step: '03',
      title: 'Kesepakatan Transaksi & Pembayaran',
      subtitle: 'Pilihan Finansial',
      duration: '1 Hari Kerja',
      docName: 'Kuitansi Resmi & Surat Akad Pembiayaan',
      description: 'Tersedia opsi pembayaran tunai transparan atau fasilitas kredit via rekanan perbankan & leasing syariah/konvensional approval 1 hari kerja.',
      details: ['Bebas biaya tersembunyi', 'Simulasi cicilan bunga kompetitif', 'Bantuan proses appraisal trade-in'],
      icon: HandCoins,
    },
    {
      step: '04',
      title: 'Pengantaran Unit & Sertifikat Garansi',
      subtitle: 'Serah Terima Resmi',
      duration: 'Hari yang Sama',
      docName: 'Buku Polis Garansi 365 Hari & BPKB/STNK Asli',
      description: 'Mobil diantar dengan towing khusus atau diserahterimakan langsung di showroom beserta buku garansi mesin 1 tahun & kelengkapan dokumen.',
      details: ['Buku polis garansi 365 hari', 'Kunci cadangan & faktur lengkap', 'Layanan towing antar ke rumah se-Bogor'],
      icon: Truck,
    },
  ];

  return (
    <section aria-label="Alur Pembelian Aman" className="bg-canvas border-b border-hairline py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
            INTERACTIVE STEP SCRUBBER
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal tracking-tight">
            4 Langkah Mudah Memiliki Mobil Bergaransi.
          </h2>
          <p className="font-body text-sm text-muted">
            Transparansi proses pembelian aman, terproteksi hukum, dan bebas birokrasi berbelit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`text-left p-5 border transition-all ${
                  isActive
                    ? 'border-forest bg-forest text-white shadow-sm'
                    : 'border-hairline bg-alabaster hover:border-muted text-charcoal'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-hairline/20">
                  <div className="flex items-center gap-1.5">
                    <Icon className="h-4 w-4" />
                    <span className={`font-mono text-xs font-bold ${isActive ? 'text-sage-light' : 'text-forest'}`}>
                      FASE {item.step}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[10px]">
                    <Clock className="h-3 w-3" />
                    <span>{item.duration}</span>
                  </div>
                </div>
                <h3 className={`font-heading text-sm font-bold mt-3 leading-tight ${isActive ? 'text-white' : 'text-charcoal'}`}>
                  {item.title}
                </h3>
              </button>
            );
          })}
        </div>

        <div className="border border-hairline bg-alabaster p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-forest bg-sage-light px-2.5 py-1 border border-sage-border">
                FASE {steps[activeStep].step}: {steps[activeStep].subtitle}
              </span>
              <span className="font-mono text-xs text-muted flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-forest" />
                Durasi: {steps[activeStep].duration}
              </span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-charcoal">
              {steps[activeStep].title}
            </h3>
            <p className="font-body text-sm text-muted leading-relaxed">
              {steps[activeStep].description}
            </p>
            <div className="p-3 bg-canvas border border-hairline flex items-center gap-2 text-xs font-mono text-charcoal">
              <FileText className="h-4 w-4 text-forest shrink-0" />
              <span>Dokumen Serah Terima: <strong>{steps[activeStep].docName}</strong></span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-canvas border border-hairline p-5 space-y-2.5">
            <span className="font-mono text-xs font-bold text-charcoal block pb-2 border-b border-hairline uppercase">
              Jaminan Pelayanan di Pos Ini:
            </span>
            {steps[activeStep].details.map((detail, dIdx) => (
              <div key={dIdx} className="flex items-center gap-2 text-xs font-body text-charcoal">
                <span className="flex h-4 w-4 items-center justify-center bg-forest text-white shrink-0">
                  <Check className="h-3 w-3" />
                </span>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
