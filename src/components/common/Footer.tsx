import React from 'react';
import { CarFront, MapPin, Clock, Phone, ShieldCheck, FileCheck } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';

export const Footer: React.FC = () => {
  const { setActiveTab } = useShowroomStore();

  return (
    <footer className="border-t border-hairline bg-alabaster text-charcoal">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-forest text-white">
                <CarFront className="h-5 w-5" />
              </div>
              <div>
                <span className="font-heading text-lg font-bold tracking-tight text-charcoal block">
                  SHOWROOM<span className="text-forest">.BOGOR</span>
                </span>
                <span className="text-[10px] tracking-wider font-mono text-muted uppercase">
                  by labsite.id
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted leading-relaxed font-body">
              Pusat kurasi kendaraan seken berkualitas tinggi wilayah Bogor. Setiap unit bergaransi mesin 1 tahun dan tersertifikasi lolos inspeksi 160 titik.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-wider text-forest font-bold">
              Jam Operasional
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-muted font-body">
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-forest shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal">Senin - Sabtu</p>
                  <p>08.00 - 18.00 WIB</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="h-4 w-4 text-forest shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal">Minggu & Libur Nasional</p>
                  <p>09.00 - 16.30 WIB (Dengan Janji Temu)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-wider text-forest font-bold">
              Alamat Showroom Bogor
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-muted font-body">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-forest shrink-0 mt-0.5" />
                <p>Jl. Pajajaran No. 88, Baranangsiang, Bogor Timur (5 Menit dari Gerbang Tol Baranangsiang)</p>
              </div>
              <div className="flex items-center gap-2 pt-1 font-mono">
                <Phone className="h-4 w-4 text-forest shrink-0" />
                <p>+62 812-3456-7890</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono tracking-wider text-forest font-bold">
              Standar Legalitas & Integritas
            </h4>
            <div className="space-y-2 text-xs text-muted">
              <div className="flex items-center gap-2 border border-hairline bg-canvas p-2.5">
                <ShieldCheck className="h-4 w-4 text-forest shrink-0" />
                <span className="font-medium text-charcoal font-body">Garansi Mesin & Transmisi 365 Hari</span>
              </div>
              <div className="flex items-center gap-2 border border-hairline bg-canvas p-2.5">
                <FileCheck className="h-4 w-4 text-forest shrink-0" />
                <span className="font-medium text-charcoal font-body">Cek Fisik Samsat Polda Jabar</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-hairline flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-4">
          <p className="font-body">&copy; {new Date().getFullYear()} labsite.id Showroom Bogor. Seluruh hak cipta dilindungi.</p>
          <div className="flex gap-4 font-mono text-[11px]">
            <button type="button" onClick={() => setActiveTab('about')} className="hover:text-forest">Ketentuan Garansi</button>
            <button type="button" onClick={() => setActiveTab('inventory')} className="hover:text-forest">Katalog Unit</button>
            <button type="button" onClick={() => setActiveTab('contact')} className="hover:text-forest">Navigasi Lokasi</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
