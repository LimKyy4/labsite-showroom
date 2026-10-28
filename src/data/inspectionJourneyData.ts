import { LucideIcon, FileCheck, Cpu, Sparkles, ShieldCheck } from 'lucide-react';

export interface DeepParameter {
  label: string;
  value: string;
  result: string;
}

export interface InspectionStage {
  num: string;
  title: string;
  sub: string;
  desc: string;
  checklist: string[];
  icon: LucideIcon;
  certCode: string;
  inspectorName: string;
  deepParameters: DeepParameter[];
}

export const INSPECTION_STAGES: InspectionStage[] = [
  {
    num: '01',
    title: 'Audit Legalitas Samsat Polda Jabar',
    sub: 'Pos Validasi Berkas Asli',
    desc: 'Pengecekan keabsahan BPKB, faktur ATPM, gesekan fisik nomor rangka & mesin di Samsat Kota Bogor untuk memastikan unit bebas blokir perdata.',
    checklist: [
      'Verifikasi nomor rangka & mesin Polda Jabar',
      'Pengecekan bebas sengketa perdata & fidusia',
      'Validasi riwayat servis ATPM & keaslian kilometer',
    ],
    icon: FileCheck,
    certCode: 'REG-JBR/2026/089-SAMSAT',
    inspectorName: 'Bambang Hidayat, S.T. (Lead Legal Auditor)',
    deepParameters: [
      { label: 'Cek Fisik Gesek No. Rangka', value: 'Sesuai BPKB & Tembus Database Samsat', result: 'Valid 100%' },
      { label: 'Status Tilang Elektronik ETLE', value: 'Nihil Pelanggaran / Record Bersih', result: 'Clear' },
      { label: 'Audit Leasing & Fidusia', value: 'Bebas Hak Tanggungan Finansial', result: 'Bebas Hutang' },
      { label: 'Verifikasi Faktur Asli ATPM', value: 'Faktur Tangan Pertama Lengkap', result: 'Terverifikasi' },
    ],
  },
  {
    num: '02',
    title: 'Uji 160 Titik & Sasis Bebas Banjir Bogor',
    sub: 'Pos Integritas Mekanikal & Struktur',
    desc: 'Pemeriksaan kompresi silinder, sensor OBD-2, soket ECU, dan uji karat karpet bawah untuk jaminan 100% bebas genangan air Bogor.',
    checklist: [
      'Kompresi silinder & scanning error code ECU',
      'Pilar A-B-C utuh pabrik bebas benturan',
      'Bongkar karet karpet interior deteksi lumpur banjir',
    ],
    icon: Cpu,
    certCode: 'QC-160/BGR/440-STRUCTURE',
    inspectorName: 'Hendra Wijaya (Senior Master Technician)',
    deepParameters: [
      { label: 'Uji Ketebalan Cat Sasis', value: '95 - 110 Mikron Rata Pabrikan', result: 'Original Cat' },
      { label: 'Kompresi Silinder 1-4', value: '185 - 190 PSI per Ruang Bakar', result: 'Sangat Padat' },
      { label: 'Scanner Komputer OBD-II', value: '0 Trouble Code (DTC Bersih)', result: 'Sistem Prima' },
      { label: 'Uji Kelembaban Karpet Dasar', value: '3% RH (Nihil Residu Lumpur Banjir)', result: 'Kering Total' },
    ],
  },
  {
    num: '03',
    title: 'Detailing & Peremajaan Komponen Aus',
    sub: 'Pos Estetika & Kebugaran Komponen',
    desc: 'Pembersihan ruang mesin, poles cat pelindung, servis berkala penggantian oli mesin dan filter, serta kalibrasi sistem pengereman.',
    checklist: [
      'Ganti oli mesin & kuras minyak rem',
      'Detailing ruang mesin & dekontaminasi interior',
      'Pengecekan ketebalan tapak ban minimal 80%',
    ],
    icon: Sparkles,
    certCode: 'EST-BGR/302-RECONDITION',
    inspectorName: 'Rian Kurniawan (Master Detailer & Service)',
    deepParameters: [
      { label: 'Ketebalan Kampas Rem', value: '9.2 mm Depan / 8.8 mm Belakang', result: 'Prima (90%)' },
      { label: 'Oli Mesin & Filter Baru', value: 'Oli 5W-30 Full Synthetic Baru', result: 'Ganti Baru' },
      { label: 'Kedalaman Alur Tapak Ban', value: '7.5 mm Rata 4 Roda', result: 'Lolos 85%' },
      { label: 'Sanitasi Kabin Ozon 30 Menit', value: 'Dekontaminasi Bakteri & Jamur AC', result: 'Higienis' },
    ],
  },
  {
    num: '04',
    title: 'Uji Jalan Tanjakan & Sertifikasi Garansi',
    sub: 'Pos Pengujian Jalan Nyata & Polis 365 Hari',
    desc: 'Test drive di rute tanjakan Pajajaran dan jalur lingkar Bogor. Setelah lolos sempurna, diterbitkan buku polis garansi resmi 1 tahun.',
    checklist: [
      'Uji akselerasi tanjakan & kestabilan kaki-kaki',
      'Pengujian transmisi matic tanpa hentakan',
      'Penerbitan barcode sertifikat garansi mesin 365 hari',
    ],
    icon: ShieldCheck,
    certCode: 'CERT-PNC/365-WARRANTY',
    inspectorName: 'Drs. Ir. M. Taufik (Quality Director)',
    deepParameters: [
      { label: 'Uji Tanjakan Kemiringan 18°', value: 'Jalur Pajajaran Tanpa Slip Kopling', result: 'Lolos Sempurna' },
      { label: 'Kestabilan Kaki-Kaki Depan', value: 'Zero Bunyi Gludug di Jalan Bergelombang', result: 'Senyap' },
      { label: 'Responsivitas Rem Darurat', value: 'Jarak 36 Meter pada Kecepatan 80 km/jam', result: 'Presisi ABS' },
      { label: 'Barcode Polis Garansi 365 Hari', value: 'Tercatat di Database Pusat labsite.id', result: 'Aktif 1 Tahun' },
    ],
  },
];
