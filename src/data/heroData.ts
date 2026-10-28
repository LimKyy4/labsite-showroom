export interface HeroSlide {
  id: string;
  tagline: string;
  headline: string;
  description: string;
  badge: string;
  features: string[];
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    tagline: 'STANDAR KURASI TERTINGGI BOGOR',
    headline: 'Mobil Seken Berkualitas Dengan Garansi Resmi 1 Tahun.',
    description: 'Bebaskan kekhawatiran membeli mobil bekas di Bogor. Setiap unit telah melalui inspeksi komprehensif 160 titik dengan sertifikat jaminan bebas banjir dan tabrakan fatal.',
    badge: 'GARANSI MESIN 365 HARI',
    features: ['Bebas Banjir & Rangka Presisi', 'Odometer Asli Terverifikasi', 'Garansi Mesin & Transmisi'],
  },
  {
    id: 'slide-2',
    tagline: 'TRANSPARANSI DOKUMEN 100%',
    headline: 'Validitas Legalitas Terjamin Cek Fisik Samsat Polda Jabar.',
    description: 'Keabsahan BPKB, STNK, dan Faktur terverifikasi tervalidasi langsung di instansi resmi. Siap balik nama tanpa kendala berkas hukum maupun tilang elektronik.',
    badge: 'LEGALITAS RESMI BOGOR',
    features: ['Cek Samsat Polda Terbuka', 'Faktur & Riwayat Servis Jelas', 'Bantuan Balik Nama Cepat'],
  },
  {
    id: 'slide-3',
    tagline: 'INSPEKSI INDEPENDEN DI TEMPAT',
    headline: 'Bebas Membawa Mekanik Mandiri Sebelum Transaksi.',
    description: 'Kami menyediakan pit-stop dan fasilitas scanner obd-2 mandiri di showroom untuk uji kelayakan langsung bersama teknisi kepercayaan Anda.',
    badge: 'UJI KELAYAKAN TERBUKA',
    features: ['Uji Jalan Rute Tanjakan Bogor', 'Scan Komputer ECU Terbuka', 'Test Drive Sepuasnya'],
  },
];
