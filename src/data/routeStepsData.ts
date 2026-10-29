import { LucideIcon, Compass, Car, Navigation, MapPin } from 'lucide-react';

export interface RouteStep {
  num: string;
  title: string;
  desc: string;
  landmark: string;
  distance: string;
  progressPercent: number;
  icon: LucideIcon;
  photoUrl: string;
  travelTimeNormal: string;
  travelTimePeak: string;
  elevation: string;
  trafficTip: string;
}

export const ROUTE_STEPS: RouteStep[] = [
  {
    num: '01',
    title: 'Exit Tol Baranangsiang (KM 40)',
    desc: 'Setelah gardu tol Jagorawi KM 40 arah Bogor Kota, ikuti plang penunjuk arah pusat kota lingkar Baranangsiang.',
    landmark: 'Gerbang Tol Baranangsiang',
    distance: '0 Meter (Titik Start)',
    progressPercent: 12,
    icon: Navigation,
    photoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    travelTimeNormal: '1 Menit',
    travelTimePeak: '2 Menit',
    elevation: '+248M ASL',
    trafficTip: 'Ambil lajur kanan setelah gardu tol untuk kemudahan manuver menuju bundaran.',
  },
  {
    num: '02',
    title: 'Bundaran Ikonik Tugu Kujang',
    desc: 'Di simpang bundaran berlampu merah Baranangsiang, arahkan kemudi ke kanan menyusuri Jl. Raya Pajajaran utama.',
    landmark: 'Tugu Kujang Pajajaran',
    distance: '350 Meter',
    progressPercent: 38,
    icon: Compass,
    photoUrl: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=800&q=80',
    travelTimeNormal: '2 Menit',
    travelTimePeak: '3 Menit',
    elevation: '+254M ASL',
    trafficTip: 'Posisikan kendaraan di lajur tengah agar terbebas dari antrian putar balik.',
  },
  {
    num: '03',
    title: 'Koridor Depan Botani Square',
    desc: 'Lurus melintasi gerbang barat Mall Botani Square dan halte Biskita Bogor tanpa perlu belok ke jalan arteri samping.',
    landmark: 'Botani Square & Halte Biskita',
    distance: '750 Meter',
    progressPercent: 70,
    icon: Car,
    photoUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    travelTimeNormal: '3 Menit',
    travelTimePeak: '5 Menit',
    elevation: '+258M ASL',
    trafficTip: 'Jalur lurus lebar 3 lajur aspal mulus, bebas hambatan rel kereta api.',
  },
  {
    num: '04',
    title: 'Showroom labsite.id No. 88',
    desc: 'Showroom berada di sisi kiri jalan bertanda totem hijau tua, persis di samping Bank Mandiri Baranangsiang.',
    landmark: 'Samping Bank Mandiri Pajajaran',
    distance: '1.2 KM (5 Menit)',
    progressPercent: 100,
    icon: MapPin,
    photoUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
    travelTimeNormal: '5 Menit',
    travelTimePeak: '7 Menit',
    elevation: '+260M ASL (Area Bebas Banjir)',
    trafficTip: 'Tersedia valet dan juru parkir dedicated yang siap menyambut di paddock depan.',
  },
];
