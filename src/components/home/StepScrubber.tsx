import React, { useState } from 'react';
import { ScrubberDossierPanel, ScrubberPhaseData } from './ScrubberDossierPanel';

const SCRUBBER_DATA: ScrubberPhaseData[] = [
  {
    step: '01',
    duration: '15 Menit',
    title: 'Pilih Unit & Konsultasi Riwayat Servis',
    subtitle: 'Eksplorasi Transparan',
    description: 'Pilih mobil impian Anda melalui katalog online atau kunjungi showroom fisik kami di Jalan Raya Pajajaran Bogor. Tim advisor kami memaparkan rekam jejak servis ATPM dan estimasi simulasi kredit tanpa ada yang ditutup-tutupi.',
    checklist: [
      'Pemaparan buku servis asli & riwayat bengkel resmi',
      'Pengecekan tanggal pajak STNK dan status BPKB',
      'Simulasi hitungan cicilan leasing resmi rekanan',
    ],
    docStamp: 'STATUS: UNIT TERSEDIA & SIAP CEK',
    actionHint: 'Pemeriksaan awal dapat dilakukan via video call atau langsung di lokasi.',
  },
  {
    step: '02',
    duration: '45 Menit',
    title: 'Test Drive Jalur Bogor & Bedah 160 Titik',
    subtitle: 'Uji Jalan Nyata',
    description: 'Rasakan performa suspensi, transmisi, dan tarikan mesin langsung di jalur tanjakan dan lingkar Bogor. Dampingi inspektur kami saat membongkar karpet dasar dan memindai komputer OBD-2 mobil.',
    checklist: [
      'Test drive rute tanjakan Pajajaran & jalan lingkar',
      'Pemeriksaan fisik sasis bebas keropos & benturan',
      'Scanning scanner OBD-2 di depan calon pembeli',
    ],
    docStamp: 'HASIL: LOLOS INSPEKSI 160 TITIK',
    actionHint: 'Boleh mengajak montir kepercayaan atau inspektur independen pilihan Anda.',
  },
  {
    step: '03',
    duration: '1 Hari Kerja',
    title: 'Validasi Samsat & Akad Pembiayaan',
    subtitle: 'Legalitas Mutlak',
    description: 'Kami melakukan cek fisik gesek nomor rangka dan mesin bersama petugas Samsat Kota Bogor. Untuk pembelian kredit, proses approval leasing rekanan dibantu secara prioritas dalam 1x24 jam.',
    checklist: [
      'Cek fisik legalitas resmi Samsat Kota Bogor',
      'Penandatanganan klausul buyback 100% bermaterai',
      'Penyelesaian administrasi tunai / persetujuan leasing',
    ],
    docStamp: 'VALIDASI: SURAT SAMSAT SAH & BEBAS BLOKIR',
    actionHint: 'Seluruh berkas legal dijamin asli dan bebas masalah perdata.',
  },
  {
    step: '04',
    duration: 'Hari yang Sama',
    title: 'Serah Terima Mobil, Towing & Polis Garansi',
    subtitle: 'Siap Mengaspal',
    description: 'Mobil diserahkan dalam kondisi telah dicuci detailing luar dalam, oli mesin baru diganti, dan buku polis garansi 365 hari telah aktif di sistem. Unit dapat diantar gratis towing langsung ke garasi rumah Anda.',
    checklist: [
      'Penerbitan kartu garansi mesin & transmisi 1 tahun',
      'Pengantaran towing unit gratis ke seluruh area Jabodetabek',
      'Penyerahan kunci serep, buku manual & toolkit lengkap',
    ],
    docStamp: 'POLIS: AKTIF BERLAKU 365 HARI',
    actionHint: 'Layanan darurat towing 24 jam siap siaga selama masa garansi.',
  },
];

export const StepScrubber: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  return (
    <section className="py-16 sm:py-20 bg-canvas border-b border-hairline select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <div className="space-y-2 border-b border-hairline pb-6">
          <span className="text-[11px] font-mono tracking-widest text-forest uppercase font-bold">
            ALUR PEMBELIAN BEBAS CEMAS
          </span>
          <h2 className="font-heading text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold text-charcoal tracking-tight">
            4 LANGKAH MEMILIKI MOBIL SEKEN PRIMA.
          </h2>
        </div>

        {/* Progress Line */}
        <div className="relative w-full h-1 bg-hairline overflow-hidden -mb-3 sm:-mb-4">
          <div
            className="h-full bg-forest transition-all duration-300 ease-out"
            style={{ width: `${((activeStepIndex + 1) / SCRUBBER_DATA.length) * 100}%` }}
          />
        </div>

        {/* Touch-Snap Horizontal Carousel (Mobile) / 4-Col Grid (Desktop) */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 no-scrollbar md:grid md:grid-cols-4 md:gap-3">
          {SCRUBBER_DATA.map((item, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={`shrink-0 w-[78vw] sm:w-[260px] md:w-auto snap-center p-3.5 sm:p-4 text-left border transition-all duration-150 flex flex-col justify-between min-h-[92px] active:scale-98 ${
                  isActive
                    ? 'bg-forest text-white border-forest shadow-md'
                    : 'bg-alabaster text-charcoal border-hairline hover:border-forest'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono text-xs font-bold tracking-wider">
                    FASE {item.step}
                  </span>
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 font-semibold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-sage-light text-forest'
                    }`}
                  >
                    {item.duration}
                  </span>
                </div>
                <p className="font-heading text-xs sm:text-sm font-semibold truncate mt-2">
                  {item.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* Scrubber Dossier Panel */}
        <ScrubberDossierPanel data={SCRUBBER_DATA[activeStepIndex]} />
      </div>
    </section>
  );
};
