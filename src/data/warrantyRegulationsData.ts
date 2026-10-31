export interface ClaimRegulationItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  procedure: string[];
}

export const WARRANTY_REGULATIONS: ClaimRegulationItem[] = [
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
