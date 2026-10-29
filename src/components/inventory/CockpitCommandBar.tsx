import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, Shuffle, Sparkles } from 'lucide-react';
import { SegmentedPillControl } from './SegmentedPillControl';
import { TactileBudgetSlider } from './TactileBudgetSlider';
import { useShowroomStore } from '../../store/useShowroomStore';
import { useScrollDirection } from '../../hooks/useScrollDirection';

interface CockpitCommandBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  statusFilter: string;
  setStatusFilter: (st: string) => void;
  transmissionFilter: string;
  setTransmissionFilter: (tr: string) => void;
  maxBudget: number;
  setMaxBudget: (b: number) => void;
  onReset: () => void;
  unitCount?: number;
}

export const CockpitCommandBar: React.FC<CockpitCommandBarProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  transmissionFilter,
  setTransmissionFilter,
  maxBudget,
  setMaxBudget,
  onReset,
  unitCount,
}) => {
  const { cars, setCarStatus, addToast } = useShowroomStore();
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [isRotating, setIsRotating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isNavbarVisible = isAtTop || scrollDirection === 'up';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 140);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDemoCycle = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
    if (cars.length === 0) return;
    const target = cars[0];
    const sequence: ('Tersedia' | 'Terpesan' | 'Terjual')[] = ['Tersedia', 'Terpesan', 'Terjual'];
    const next = sequence[(sequence.indexOf(target.status) + 1) % sequence.length];
    setCarStatus(target.id, next);
    addToast('Demo State Diperbarui', `Status ${target.title} diubah menjadi "${next}".`);
  };

  const statusOptions = ['Semua', 'Tersedia', 'Terpesan', 'Terjual'];
  const transOptions = ['Semua', 'Otomatis', 'Manual'];
  const displayedCount = unitCount ?? cars.length;

  return (
    <div
      style={{
        position: 'sticky',
        top: isNavbarVisible && !isAtTop ? '72px' : '0px',
      }}
      className={`sticky z-30 w-full bg-white border-b border-hairline shadow-sm transition-[top,padding] duration-300 ease-out select-none ${
        isScrolled ? 'py-2.5 sm:py-3' : 'py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        {/* Modul 1: Search Input Cerdas & Live Tag Counter & Aksi */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
          <div className="md:col-span-8 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-forest pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tipe mobil, transmisi, atau plat nomor Bogor (contoh: Fortuner, Matic, F 1248)..."
              className="w-full pl-10 pr-36 py-2 text-xs sm:text-sm border border-hairline bg-alabaster focus:outline-none focus:border-forest text-charcoal font-body rounded-lg transition-colors"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-sage-light border border-sage-border text-forest font-mono text-[10px] font-bold rounded">
                <Sparkles className="h-3 w-3" />
                <span>{displayedCount} UNIT READY</span>
              </span>
            </div>
          </div>

          {/* Modul 4: Control Actions & Demo Switcher */}
          <div className="md:col-span-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleDemoCycle}
              className="flex-1 sm:flex-none px-3 py-2 bg-alabaster hover:bg-canvas border border-hairline hover:border-forest text-charcoal text-xs font-mono font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
              title="Siklus status unit pertama (Tersedia -> Terpesan -> Terjual)"
            >
              <Shuffle className="h-3.5 w-3.5 text-forest" />
              <span>Demo Switcher</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRotating(true);
                setTimeout(() => setIsRotating(false), 500);
                onReset();
              }}
              className="px-3 py-2 bg-canvas border border-hairline hover:border-charcoal text-muted hover:text-charcoal text-xs font-mono font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all active:scale-95"
              title="Kembalikan semua filter ke posisi semula"
            >
              <RotateCcw className={`h-3.5 w-3.5 ${isRotating ? 'animate-spin' : ''}`} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Modul 2 & 3: Segmented Pill Controller & Tactile Budget Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 pt-2.5 border-t border-hairline items-end">
          <div className="lg:col-span-4">
            <SegmentedPillControl
              label="Status Unit Showroom"
              options={statusOptions}
              selected={statusFilter}
              onChange={setStatusFilter}
              layoutGroupId="statusPill"
            />
          </div>

          <div className="lg:col-span-3">
            <SegmentedPillControl
              label="Tipe Transmisi"
              options={transOptions}
              selected={transmissionFilter}
              onChange={setTransmissionFilter}
              layoutGroupId="transPill"
            />
          </div>

          <div className="lg:col-span-5">
            <TactileBudgetSlider value={maxBudget} onChange={setMaxBudget} />
          </div>
        </div>
      </div>
    </div>
  );
};
