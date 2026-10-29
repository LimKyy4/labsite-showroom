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
    title: 'Forensic Audit Dokumen & Validasi Fisik Samsat Pajajaran',
    sub: 'Quality Gate 01 • Verifikasi Legalitas & Cek Fisik',
    desc: 'Audit forensik keabsahan BPKB, faktur ATPM, gesekan fisik nomor rangka & mesin di Samsat Kota Bogor untuk memastikan unit 100% bebas blokir perdata.',
    checklist: [
      'Pemeriksaan fisik nomor rangka & mesin Samsat Polda Jabar',
      'Pengecekan bebas sengketa perdata, fidusia & kasus ETLE',
      'Validasi riwayat servis ATPM & keaslian kilometer odometer',
    ],
    icon: FileCheck,
    certCode: 'GATE-01/SAMSAT-PJJ/2026',
    inspectorName: 'Bambang Hidayat, S.T. (Lead Legal Auditor)',
    deepParameters: [
      { label: 'Cek Fisik Gesek No. Rangka', value: 'Sesuai BPKB & Tembus Database Samsat Jabar', result: 'Valid 100%' },
      { label: 'Status Tilang Elektronik ETLE', value: 'Nihil Pelanggaran / Record Bersih Terverifikasi', result: 'Clear' },
      { label: 'Audit Leasing & Fidusia', value: 'Bebas Hak Tanggungan Finansial Pihak Ketiga', result: 'Bebas Hutang' },
      { label: 'Verifikasi Faktur Asli ATPM', value: 'Faktur Tangan Pertama Lengkap & Tervalidasi', result: 'Terverifikasi' },
    ],
  },
  {
    num: '02',
    title: 'Uji Spektrometri & 160 Titik Diagnostik Sensor Kompresi Ruang Bakar',
    sub: 'Quality Gate 02 • Audit Mekanikal & Struktur Anti-Banjir',
    desc: 'Pengujian kompresi per silinder, pemindaian sensor OBD-2, soket ECU, dan uji endoskopi karat karpet bawah untuk jaminan bebas banjir Bogor.',
    checklist: [
      'Kompresi silinder stabil 185-190 PSI & pemindaian scanner ECU OBD-2',
      'Integritas struktur pilar A-B-C utuh pabrik bebas benturan',
      'Bongkar karet karpet interior deteksi lumpur banjir Cisadane',
    ],
    icon: Cpu,
    certCode: 'GATE-02/MECH-160/440-QC',
    inspectorName: 'Hendra Wijaya (Master Inspector ASE)',
    deepParameters: [
      { label: 'Uji Ketebalan Cat Sasis', value: '95 - 110 Mikron Rata Cat Pabrikan', result: 'Original Cat' },
      { label: 'Kompresi Silinder 1-4', value: '188 - 191 PSI per Ruang Bakar', result: 'Kompresi Padat' },
      { label: 'Scanner Komputer OBD-II', value: '0 Trouble Code (DTC Clean)', result: 'Sistem Prima' },
      { label: 'Uji Kelembaban Karpet Dasar', value: '3% RH (Nihil Residu Lumpur Banjir)', result: 'Kering Total' },
    ],
  },
  {
    num: '03',
    title: 'Detailing Klinis, Dekontaminasi Kabin, & Kalibrasi Sasis Dinamis',
    sub: 'Quality Gate 03 • Higienitas Kabin & Kebugaran Komponen',
    desc: 'Dekontaminasi kabin dengan ozon, servis berkala penggantian pelumas sintetis baru, serta kalibrasi geometri suspensi dan sistem pengereman.',
    checklist: [
      'Penggantian oli mesin full synthetic & kuras cairan rem',
      'Detailing ruang mesin & dekontaminasi ozon interior antibakteri',
      'Pengecekan ketebalan tapak ban minimal 85% rata 4 roda',
    ],
    icon: Sparkles,
    certCode: 'GATE-03/CLINIC-BGR/302-EST',
    inspectorName: 'Rian Kurniawan (Master Detailer & Service)',
    deepParameters: [
      { label: 'Ketebalan Kampas Rem', value: '9.2 mm Depan / 8.8 mm Belakang', result: 'Prima (90%)' },
      { label: 'Oli Mesin & Filter Baru', value: 'Oli 5W-30 Full Synthetic Baru Diganti', result: 'Fresh Oil' },
      { label: 'Kedalaman Alur Tapak Ban', value: '7.8 mm Rata 4 Roda', result: 'Lolos 88%' },
      { label: 'Sanitasi Kabin Ozon 30 Menit', value: 'Dekontaminasi Bakteri & Jamur Saluran AC', result: 'Higienis' },
    ],
  },
  {
    num: '04',
    title: 'Real-World Elevation Test (Uji Tanjakan Puncak) & Penerbitan Sertifikat Garansi',
    sub: 'Quality Gate 04 • Pengujian Dinamis Nyata & Polis 365 Hari',
    desc: 'Pengujian akselerasi di rute tanjakan ekstrem Puncak/Bogor. Setelah lolos sempurna tanpa slip, diterbitkan polis garansi resmi 1 tahun.',
    checklist: [
      'Uji akselerasi tanjakan 18° & kestabilan suspensi di jalur bergelombang',
      'Pengujian transmisi matic tanpa hentakan atau jeda torsi',
      'Penerbitan barcode sertifikat garansi mesin 365 hari bermaterai',
    ],
    icon: ShieldCheck,
    certCode: 'GATE-04/ELEV-PNC/365-WTY',
    inspectorName: 'Drs. Ir. M. Taufik (Quality Director AIKI)',
    deepParameters: [
      { label: 'Uji Tanjakan Kemiringan 18°', value: 'Rute Pajajaran-Puncak Tanpa Slip Kopling', result: 'Lolos Sempurna' },
      { label: 'Kestabilan Suspensi & Sasis', value: 'Zero Bunyi Gludug di Jalan Bergelombang', result: 'Senyap Presisi' },
      { label: 'Responsivitas Rem Darurat', value: 'Jarak 35 Meter pada Kecepatan 80 km/jam', result: 'Presisi ABS' },
      { label: 'Barcode Polis Garansi 365 Hari', value: 'Tercatat di Database Penjaminan labsite.id', result: 'Aktif 1 Tahun' },
    ],
  },
];
