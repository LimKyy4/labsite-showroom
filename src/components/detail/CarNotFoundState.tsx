import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';

export const CarNotFoundState: React.FC = () => {
  const { setActiveTab } = useShowroomStore();

  return (
    <div className="bg-alabaster min-h-[500px] flex items-center justify-center p-6">
      <div className="border border-hairline bg-canvas p-8 max-w-md w-full text-center space-y-4 shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center bg-sage-light text-forest border border-sage-border">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="font-heading text-xl font-bold text-charcoal">Unit Mobil Tidak Ditemukan</h2>
        <p className="font-body text-xs text-muted">
          Unit yang Anda cari mungkin telah terjual atau sedang dalam proses serah terima. Silakan cek inventaris unit aktif kami.
        </p>
        <button
          type="button"
          onClick={() => setActiveTab('inventory')}
          className="w-full py-2.5 px-4 bg-forest text-white font-mono text-xs font-bold hover:bg-forest-light transition-colors"
        >
          Kembali ke Katalog Unit
        </button>
      </div>
    </div>
  );
};
