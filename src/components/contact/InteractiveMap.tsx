import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

export const InteractiveMap: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState(0);

  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80',
      caption: 'Fasad Depan & Gerbang Utama Showroom Jl. Pajajaran No. 88',
    },
    {
      url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=80',
      caption: 'Area Parkir Luas Tamu & Lantai Inspeksi Mandiri',
    },
  ];

  const openGoogleMaps = () => {
    window.open(
      'https://maps.google.com/?q=Jl.+Pajajaran+No.+88,+Baranangsiang,+Bogor+Timur',
      '_blank'
    );
  };

  return (
    <section aria-label="Peta Interaktif & Fasad Showroom" className="bg-alabaster border-b border-hairline py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
              LOKASI FISIK SHOWROOM
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
              Akses Strategis di Jantung Kota Bogor.
            </h2>
            <p className="font-body text-sm text-muted">
              Jl. Pajajaran No. 88, Baranangsiang, Bogor Timur (Hanya 5 menit dari Exit Gerbang Tol Jagorawi).
            </p>
          </div>
          <Button variant="primary" size="md" onClick={openGoogleMaps}>
            <Navigation className="h-4 w-4" />
            <span>Buka di Google Maps</span>
            <ExternalLink className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Visual Map Mockup Card */}
          <div className="lg:col-span-7 border border-hairline bg-canvas p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-forest" />
                <span className="font-heading text-base font-bold text-charcoal">Peta Koordinat & Titik Kumpul</span>
              </div>
              <span className="font-mono text-xs text-forest bg-sage-light px-2 py-0.5 border border-sage-border font-bold">
                Lat: -6.6022, Long: 106.8122
              </span>
            </div>

            <div className="relative aspect-[16/9] w-full bg-[#EBF2EE] border border-sage-border flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
              <div className="relative z-10 space-y-2 max-w-sm">
                <div className="inline-flex h-12 w-12 items-center justify-center bg-forest text-white shadow-lg">
                  <MapPin className="h-6 w-6" />
                </div>
                <h4 className="font-heading text-base font-bold text-charcoal">
                  labsite.id Showroom Bogor Timur
                </h4>
                <p className="font-body text-xs text-muted">
                  Jl. Pajajaran No. 88 (Samping Bank Mandiri Baranangsiang, Seberang Rute Botani Square)
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={openGoogleMaps}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-forest text-white font-mono text-xs font-semibold hover:bg-forest-light"
                  >
                    <span>Navigasi Jalur Cepat</span>
                    <Navigation className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Facade & Entrance Photo Carousel */}
          <div className="lg:col-span-5 border border-hairline bg-canvas p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-hairline mb-4">
                <h4 className="font-heading text-base font-bold text-charcoal">Fasad & Area Parkir</h4>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setActivePhoto((prev) => (prev - 1 + photos.length) % photos.length)}
                    className="p-1 border border-hairline bg-alabaster hover:bg-forest hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePhoto((prev) => (prev + 1) % photos.length)}
                    className="p-1 border border-hairline bg-alabaster hover:bg-forest hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden border border-hairline bg-hairline mb-3">
                <img
                  src={photos[activePhoto].url}
                  alt={photos[activePhoto].caption}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="font-body text-xs text-muted leading-relaxed">
                {photos[activePhoto].caption}
              </p>
            </div>

            <div className="pt-4 border-t border-hairline text-xs font-mono text-muted flex justify-between">
              <span>Kapasitas Parkir: 25 Kendaraan</span>
              <span className="text-forest font-bold">Aman & Terpantau CCTV 24 Jam</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
