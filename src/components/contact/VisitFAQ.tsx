import React from 'react';
import { Accordion, AccordionItemData } from '../ui/accordion';
import { Shield, Wrench, CreditCard, Video, Award } from 'lucide-react';

const VISIT_PROTOCOLS: AccordionItemData[] = [
  {
    id: 'prot-1',
    subtitle: 'FASILITAS & TRANSPARANSI TEKNIS',
    title: 'Kebijakan Akses Mekanik Pihak Ketiga & Pemakaian Car-Lift',
    content: (
      <div className="space-y-2.5 pt-1 font-body text-xs sm:text-sm text-muted leading-relaxed">
        <p>
          Showroom kami menjunjung tinggi transparansi tanpa kompromi. Calon pembeli dipersilakan membawa mekanik kepercayaan pribadi, teknisi independen (seperti inspektor OtoSpector), atau montir langganan.
        </p>
        <p>
          Kami menyediakan fasilitas pit stop gratis dengan 2 unit hydraulic car-lift 4-ton, lampu inspeksi kolong sasis, serta sumber daya listrik untuk scanner OBD-2 eksternal guna memverifikasi kondisi real tanpa rekayasa.
        </p>
        <div className="flex items-center gap-2 pt-1 font-mono text-xs text-forest font-bold">
          <Wrench className="h-3.5 w-3.5" />
          <span>Fasilitas Car-Lift Siap Pakai Tanpa Biaya Tambahan</span>
        </div>
      </div>
    ),
  },
  {
    id: 'prot-2',
    subtitle: 'KEPATUHAN LEGALITAS & SAFETY',
    title: 'Persyaratan Dokumen SIM A untuk Sesi VIP Test Drive',
    content: (
      <div className="space-y-2.5 pt-1 font-body text-xs sm:text-sm text-muted leading-relaxed">
        <p>
          Untuk perlindungan asuransi comprehensive dan keselamatan bersama selama uji kemudi di jalan raya maupun jalan tol, pengendara wajib menunjukkan SIM A yang masih berlaku kepada Concierge sebelum penyerahan kunci.
        </p>
        <p>
          Master Inspector kami akan mendampingi di kursi penumpang depan guna membantu orientasi fitur kendaraan, pemantauan instrumen live, serta memastikan rute pengetesan aman dan optimal.
        </p>
        <div className="flex items-center gap-2 pt-1 font-mono text-xs text-forest font-bold">
          <Shield className="h-3.5 w-3.5" />
          <span>Proteksi Polis Asuransi All-Risk Aktif Selama Sesi Uji Kendara</span>
        </div>
      </div>
    ),
  },
  {
    id: 'prot-3',
    subtitle: 'LAYANAN NASIONAL JARAK JAUH',
    title: 'Protokol Virtual HD Video Call Inspection bagi Pembeli Luar Kota',
    content: (
      <div className="space-y-2.5 pt-1 font-body text-xs sm:text-sm text-muted leading-relaxed">
        <p>
          Bagi calon pembeli dari luar wilayah Jabodetabek, kami menyediakan layanan sesi inspeksi virtual interaktif via WhatsApp Video Call atau Zoom High-Definition (1080p).
        </p>
        <p>
          Inspektor kami akan memperlihatkan seluruh detail fisik: ketebalan cat bodi dengan coating gauge, kesesuaian nomor mesin & rangka, kondisi interior dan aroma kabin, start mesin dingin (cold start), hingga live test drive kamera kabin.
        </p>
        <div className="flex items-center gap-2 pt-1 font-mono text-xs text-forest font-bold">
          <Video className="h-3.5 w-3.5" />
          <span>Pengiriman Aman ke Seluruh Kota via Single Towing Tertutup</span>
        </div>
      </div>
    ),
  },
  {
    id: 'prot-4',
    subtitle: 'TATA KELOLA KEUANGAN PERUSAHAAN',
    title: 'Regulasi Pembayaran Rekening Giro Korporat & Zero Cash Policy',
    content: (
      <div className="space-y-2.5 pt-1 font-body text-xs sm:text-sm text-muted leading-relaxed">
        <p>
          Demi menjamin integritas finansial dan keamanan 100% dana nasabah, showroom menerapkan *Zero Cash Policy*. Kami tidak pernah menerima setoran tunai fisik di kasir showroom untuk transaksi kendaraan.
        </p>
        <p>
          Seluruh pembayaran tanda jadi (booking fee) maupun pelunasan wajib ditransfer ke Rekening Giro Perusahaan resmi atas nama PT Labsite Otomotif Indonesia (Bank Mandiri / BCA). Setiap transaksi disertai invoice bermeterai elektronik Peruri.
        </p>
        <div className="flex items-center gap-2 pt-1 font-mono text-xs text-forest font-bold">
          <CreditCard className="h-3.5 w-3.5" />
          <span>Rekening Resmi Terdaftar di Sistem Pembayaran Bank Nasional</span>
        </div>
      </div>
    ),
  },
];

export const VisitFAQ: React.FC = () => {
  return (
    <section
      aria-label="Tata Kelola Fasilitas & Protokol Kunjungan"
      className="bg-alabaster border-b border-hairline py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white border border-hairline text-forest font-mono text-xs font-bold uppercase tracking-wider">
            <Award className="h-3.5 w-3.5" />
            <span>ZONA 05 • CORPORATE FACILITY GOVERNANCE</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
            PROTOKOL STANDAR KUNJUNGAN FISIK.
          </h2>
          <p className="font-body text-sm text-muted">
            Transparansi operasional, kepatuhan keselamatan berkendara, serta regulasi finansial perbankan di showroom labsite.id Bogor.
          </p>
        </div>

        <div className="border border-hairline bg-canvas p-4 sm:p-6 shadow-sm">
          <Accordion items={VISIT_PROTOCOLS} defaultOpenId="prot-1" />
        </div>
      </div>
    </section>
  );
};
