import { SalesAdvisor, FaqItem } from '../types/showroom';

export const SALES_ADVISORS: SalesAdvisor[] = [
  {
    name: 'Dimas Pratama',
    role: 'Senior Sales Advisor & Vehicle Consultant',
    phone: '081234567890',
    experience: '8 Tahun Melayani Konsumen Wilayah Bogor',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Rian Hidayat',
    role: 'Financial & Trade-In Specialist',
    phone: '081398765432',
    experience: '6 Tahun Ahli Pembiayaan Multifinance & Syariah',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Siti Rahmawati',
    role: 'Customer Care & Warranty Coordinator',
    phone: '082155667788',
    experience: '5 Tahun Pendampingan Klaim & Cek Fisik Samsat',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  }
];

export const PARTNERS = [
  { name: 'BCA Finance', type: 'Mitra Pembiayaan Utama' },
  { name: 'Mandiri Utama Finance', type: 'Rekanan Kredit Bank Mandiri' },
  { name: 'Adira Finance', type: 'Pembiayaan Resmi Otomotif' },
  { name: 'CIMB Niaga Auto Finance', type: 'Solusi Pembiayaan Syariah & Konvensional' },
  { name: 'BSI OTO Syariah', type: 'Akad Murabahah Bebas Riba' }
];

export const WARRANTY_FAQS: FaqItem[] = [
  {
    id: 'w-1',
    category: 'Syarat Klaim',
    question: 'Bagaimana prosedur klaim garansi mesin jika terjadi kendala di jalan?',
    answer: 'Cukup hubungi hotline darurat labsite.id Bogor. Tim derek towing rekanan akan menjemput kendaraan Anda menuju bengkel resmi rekanan di Bogor tanpa pungutan biaya darurat awal.'
  },
  {
    id: 'w-2',
    category: 'Cakupan Komponen',
    question: 'Apakah garansi transmisi mencakup perbaikan gearbox matic dan modul TCM?',
    answer: 'Ya, seluruh gir internal, solenoid valve, torque converter, dan komputer transmisi (TCM) terproteksi penuh dalam skema Polis Garansi 365 Hari.'
  },
  {
    id: 'w-3',
    category: 'Jaminan Bebas Banjir',
    question: 'Bagaimana perlindungan jika terbukti ada bekas rendaman banjir yang luput?',
    answer: 'Kami memberikan jaminan 100% uang kembali (Buyback Guarantee) secara tertulis di atas meterai jika kendaraan terbukti pernah mengalami banjir atau insiden tabrakan besar.'
  }
];

export const VISIT_FAQS: FaqItem[] = [
  {
    id: 'v-1',
    category: 'Fasilitas Showroom',
    question: 'Apakah boleh membawa teknisi mekanik independen dari luar saat kunjungan?',
    answer: 'Sangat dipersilakan. Kami menyediakan area pit-stop, car lift hidrolik, dan sumber listrik untuk scanner diagnosa OBD pihak ketiga.'
  },
  {
    id: 'v-2',
    category: 'Rute Test Drive',
    question: 'Seperti apa rute pengujian jalan (Test Drive) yang disediakan?',
    answer: 'Rute meliputi jalan tol Jagorawi arah Baranangsiang dan kontur tanjakan Pajajaran untuk membuktikan performa akselerasi, suspensi, dan kekedapan kabin.'
  }
];
