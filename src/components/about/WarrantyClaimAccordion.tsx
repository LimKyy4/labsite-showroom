import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { WarrantySLACommandBar } from './WarrantySLACommandBar';

interface ClaimRegulationItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  procedure: string[];
}

export const WarrantyClaimAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('reg-1');

  const regulations: ClaimRegulationItem[] = [
    {
      id: 'reg-1',
      category: 'PROTOKOL DARURAT JALAN RAYA',
      title: 'Prosedur Resmi Penanganan Kendala Mekanikal di Jalan',
      summary: 'Langkah taktis penanganan darurat 24 jam untuk menjamin keselamatan pengendara dan validitas klaim.',
      procedure: [
        'Hubungi Hotline Call Center Darurat Showroom Bogor (0812-3456-7890) yang siaga 24 jam.',
        'Unit towing resmi diterbangkan ke lokasi dalam waktu maksimal 30 menit wilayah Bogor Raya.',
        'Penerbitan Berita Acara Kerusakan (BAK) dan rujukan langsung ke bengkel resmi Pajajaran.',
      ],
    },
    {
      id: 'reg-2',
      category: 'STANDARISASI BATAS TOLERANSI KOMPONEN',
      title: 'Batas Toleransi Komponen Aus vs Kerusakan Internal Mesin',
      summary: 'Klausul pemisahan transparan antara komponen aus wajar pemakaian dan kerusakan struktural internal yang dijamin penuh.',
      procedure: [
        'Kerusakan internal blok silinder, camshaft, girboks, dan radiator ditanggung 100% tanpa biaya jasa/part.',
        'Komponen aus periodik (ban, kampas rem, bilah wiper) mengacu pada laporan inspeksi 160 titik awal.',
        'Penggantian wajib menggunakan suku cadang genuine orisinil pabrikan tanpa pemotongan kualitas.',
      ],
    },
    {
      id: 'reg-3',
      category: 'JAMINAN HUKUM & INTEGRITAS',
      title: 'Mekanisme Buyback Tunai 100% jika Terjadi Mal-Inspeksi',
      summary: 'Klausul hukum bermaterai sah untuk perlindungan hak konsumen jika terbukti ada kelalaian inspeksi fatal pada sasis.',
      procedure: [
        'Pengajuan klaim buyback disertai bukti audit dari bengkel resmi ATPM atau pihak independen berlisensi.',
        'Pemeriksaan bersama tim inspektur labsite.id dalam 1x24 jam kerja.',
        'Pencairan dana pengembalian 100% tunai tanpa potongan administrasi dalam 3x24 jam kerja.',
      ],
    },
  ];

  return (
    <section aria-label="Syarat dan Tata Kelola Klaim Garansi" className="bg-alabaster border-b border-hairline py-16 sm:py-24 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Quality SLA Command Bar */}
        <WarrantySLACommandBar />

        {/* Accordion Regulasi Klaim */}
        <div className="space-y-4 pt-4">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
              REGULASI KLAIM & PROTOKOL PENYELESAIAN
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-charcoal">
              Ketentuan Pelaksanaan Garansi Tertulis 365 Hari
            </h3>
          </div>

          <div className="space-y-3">
            {regulations.map((reg) => {
              const isOpen = openId === reg.id;
              return (
                <div key={reg.id} className="border border-hairline bg-canvas overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : reg.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 transition-colors hover:bg-alabaster"
                  >
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] uppercase text-forest font-bold tracking-wider block">
                        {reg.category}
                      </span>
                      <h4 className="font-heading text-sm sm:text-base font-bold text-charcoal">
                        {reg.title}
                      </h4>
                    </div>
                    <div className={`p-1 border border-hairline bg-alabaster transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 border-forest' : ''}`}>
                      <ChevronDown className="h-4 w-4 text-forest" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                        className="overflow-hidden border-t border-hairline bg-alabaster"
                      >
                        <div className="p-5 space-y-3">
                          <p className="font-body text-xs sm:text-sm text-muted leading-relaxed">
                            {reg.summary}
                          </p>
                          <div className="space-y-2 pt-1 font-mono text-xs">
                            {reg.procedure.map((step, sIdx) => (
                              <div key={sIdx} className="flex items-start gap-2 text-charcoal">
                                <ShieldCheck className="h-3.5 w-3.5 text-forest shrink-0 mt-0.5" />
                                <span>{step}</span>
                              </div>
                            ))}
                          </div>
                          <div className="pt-2 border-t border-hairline flex items-center justify-between text-xs font-mono">
                            <span className="text-muted">Klausul Sah Bermaterai</span>
                            <a
                              href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo tim garansi labsite.id Bogor, saya ingin konsultasi klaim: ${reg.title}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-forest hover:underline font-bold"
                            >
                              <span>Konsultasi Hotline Klaim</span>
                              <ArrowUpRight className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
