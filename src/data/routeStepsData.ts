import { LucideIcon, Compass, Car, Navigation, MapPin } from 'lucide-react';

export interface RouteStep {
  num: string;
  title: string;
  desc: string;
  landmark: string;
  distance: string;
  progressPercent: number;
  icon: LucideIcon;
}

export const ROUTE_STEPS: RouteStep[] = [
  {
    num: '01',
    title: 'Exit Tol Baranangsiang (KM 40)',
    desc: 'Setelah gardu tol Jagorawi arah Bogor, ikuti plang penunjuk arah pusat kota menuju lingkar Baranangsiang.',
    landmark: 'Gardu Tol Baranangsiang',
    distance: '0 Meter',
    progressPercent: 12,
    icon: Navigation,
  },
  {
    num: '02',
    title: 'Ambil Jalur Kanan Tugu Kujang',
    desc: 'Di bundaran lampu merah Baranangsiang, ambil lajur kanan menyusuri Jalan Raya Pajajaran utama.',
    landmark: 'Tugu Kujang Ikonik Bogor',
    distance: '300 Meter',
    progressPercent: 38,
    icon: Compass,
  },
  {
    num: '03',
    title: 'Melewati Kawasan Botani Square',
    desc: 'Lurus sekitar 500 meter melewati pintu barat Botani Square dan halte biskita tanpa perlu belok.',
    landmark: 'Botani Square Mall & Halte Biskita',
    distance: '800 Meter',
    progressPercent: 70,
    icon: Car,
  },
  {
    num: '04',
    title: 'Tiba di Showroom labsite.id No. 88',
    desc: 'Gedung showroom berada di sisi kiri jalan dengan totem plang hijau tua dan area parkir towing luas.',
    landmark: 'Samping Bank Mandiri Pajajaran',
    distance: '1.2 Kilometer Total',
    progressPercent: 100,
    icon: MapPin,
  },
];
