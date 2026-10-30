import React from 'react';
import { motion } from 'framer-motion';
import { AdvisorConciergeBadge, AdvisorData } from './AdvisorConciergeBadge';
import { ShieldCheck } from 'lucide-react';

const EXECUTIVE_ADVISORS: AdvisorData[] = [
  {
    name: 'Dimas Arya Pratama, S.T.',
    role: 'Senior Client Advisor & Valuation Specialist',
    license: 'REG-ADV/BGR-01 • 8 Thn Pengalaman Wilayah Bogor & Jabodetabek',
    phone: '+62 812-3456-7891',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    skills: ['Konsultasi Mesin Diesel/Bensin', 'Valuasi Akurat Trade-In', 'Pendampingan Uji Tanjakan'],
  },
  {
    name: 'Ratna Wulandari, S.E.',
    role: 'Lead Corporate Finance & Trade-In Appraiser',
    license: 'REG-ADV/BGR-02 • 7 Thn Spesialisasi Kredit & Konsumen',
    phone: '+62 812-3456-7892',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    skills: ['Simulasi 5 Leasing Rekanan', 'Negosiasi Syariah/Konvensional', 'Persetujuan 1 Hari Kerja'],
  },
  {
    name: 'Fajar Nugraha, S.Kom.',
    role: 'Head of Vehicle Certification & Samsat Liaison',
    license: 'REG-ADV/BGR-03 • 9 Thn Kemitraan Samsat Pajajaran & Polda',
    phone: '+62 812-3456-7893',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    skills: ['Cek Fisik No. Rangka/Mesin', 'Verifikasi Bebas Kasus ETLE', 'Balik Nama & Mutasi Plat F'],
  },
];

export const SalesAdvisorCards: React.FC = () => {
  return (
    <section aria-label="Executive Sales Concierge & Advisory Deck" className="bg-canvas border-b border-hairline py-16 sm:py-24 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-3xl space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
              EXECUTIVE SALES CONCIERGE & ADVISORY DECK
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
              PENASIHAT OTOMOTIF VIP BERLISENSI RESMI.
            </h2>
            <p className="font-body text-xs sm:text-sm text-muted">
              Layanan konsultasi privat satu pintu untuk spesifikasi teknis, estimasi tukar tambah, simulasi pembiayaan, dan legalitas Samsat.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sage-light border border-sage-border text-forest font-mono text-xs font-bold shrink-0">
            <ShieldCheck className="h-4 w-4" />
            <span>STANDAR AKREDITASI PENJUALAN</span>
          </div>
        </div>

        {/* 3-Column Executive Concierge Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXECUTIVE_ADVISORS.map((advisor, idx) => (
            <motion.div
              key={advisor.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
              className="flex flex-col"
            >
              <AdvisorConciergeBadge advisor={advisor} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
