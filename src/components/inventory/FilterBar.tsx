import React from 'react';
import { Search, RotateCcw, Shuffle } from 'lucide-react';
import { Button } from '../ui/button';
import { BudgetSlider } from './BudgetSlider';
import { useShowroomStore } from '../../store/useShowroomStore';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  statusFilter: string;
  setStatusFilter: (st: string) => void;
  transmissionFilter: string;
  setTransmissionFilter: (tr: string) => void;
  maxBudget: number;
  setMaxBudget: (b: number) => void;
  onReset: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  transmissionFilter,
  setTransmissionFilter,
  maxBudget,
  setMaxBudget,
  onReset,
}) => {
  const { cars, setCarStatus, addToast } = useShowroomStore();

  const handleDemoCycle = () => {
    if (cars.length === 0) return;
    const target = cars[0];
    const sequence: ('Tersedia' | 'Terpesan' | 'Terjual')[] = ['Tersedia', 'Terpesan', 'Terjual'];
    const next = sequence[(sequence.indexOf(target.status) + 1) % sequence.length];
    setCarStatus(target.id, next);
    addToast('Demo State Diperbarui', `Status ${target.title} diubah menjadi "${next}".`);
  };

  const statusList = ['Semua', 'Tersedia', 'Terpesan', 'Terjual'];
  const transList = ['Semua', 'Otomatis', 'Manual'];

  return (
    <div className="sticky top-20 sm:top-24 z-30 isolate border border-hairline bg-white p-4 sm:p-5 shadow-sm space-y-4">
      {/* Baris Atas: Input Pencarian & Tombol Aksi */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-7 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari merek, tipe mobil, atau plat F Bogor..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-hairline bg-alabaster focus:outline-none focus:border-forest text-charcoal font-body"
          />
        </div>

        <div className="md:col-span-5 flex flex-wrap items-center justify-end gap-2">
          <Button variant="secondary" size="sm" onClick={handleDemoCycle} title="Ubah status unit pertama langsung di tempat">
            <Shuffle className="h-3.5 w-3.5" />
            <span>Demo Switcher</span>
          </Button>
          <Button variant="outline" size="sm" onClick={onReset} title="Kembalikan semua filter ke awal">
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </Button>
        </div>
      </div>

      {/* Baris Bawah: Filter Status, Transmisi, dan Slider Anggaran */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-3.5 border-t border-hairline items-center">
        {/* Status Unit Selector */}
        <div className="lg:col-span-4 space-y-1.5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted font-bold block">
            Status Unit
          </span>
          <div className="flex flex-wrap gap-1.5">
            {statusList.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs font-mono border transition-colors ${
                  statusFilter === st
                    ? 'bg-forest text-white border-forest font-bold'
                    : 'bg-alabaster text-charcoal border-hairline hover:border-muted'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Transmisi Selector */}
        <div className="lg:col-span-3 space-y-1.5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted font-bold block">
            Transmisi
          </span>
          <div className="flex flex-wrap gap-1.5">
            {transList.map((tr) => (
              <button
                key={tr}
                type="button"
                onClick={() => setTransmissionFilter(tr)}
                className={`px-3 py-1.5 text-xs font-mono border transition-colors ${
                  transmissionFilter === tr
                    ? 'bg-forest text-white border-forest font-bold'
                    : 'bg-alabaster text-charcoal border-hairline hover:border-muted'
                }`}
              >
                {tr}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Slider */}
        <div className="lg:col-span-5">
          <BudgetSlider value={maxBudget} onChange={setMaxBudget} />
        </div>
      </div>
    </div>
  );
};
