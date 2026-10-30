import React, { useState } from 'react';
import { Search, RotateCcw, Shuffle, Sparkles, SlidersHorizontal } from 'lucide-react';
import { SegmentedPillControl } from './SegmentedPillControl';
import { TactileBudgetSlider } from './TactileBudgetSlider';
import { MobileFilterDrawer } from './MobileFilterDrawer';
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

export const CockpitCommandBar: React.FC<CockpitCommandBarProps> = (props) => {
  const { searchQuery, setSearchQuery, statusFilter, setStatusFilter, transmissionFilter, setTransmissionFilter, maxBudget, setMaxBudget, onReset, unitCount } = props;
  const { cars, setCarStatus, addToast } = useShowroomStore();
  const { scrollDirection, isAtTop } = useScrollDirection();
  const [isRotating, setIsRotating] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const isNavbarVisible = isAtTop || scrollDirection === 'up';

  const handleDemoCycle = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 500);
    if (cars.length === 0) return;
    const target = cars[0];
    const seq: ('Tersedia' | 'Terpesan' | 'Terjual')[] = ['Tersedia', 'Terpesan', 'Terjual'];
    const next = seq[(seq.indexOf(target.status) + 1) % seq.length];
    setCarStatus(target.id, next);
    addToast('Demo State Diperbarui', `Status ${target.title} diubah menjadi "${next}".`);
  };

  const statusOptions = ['Semua', 'Tersedia', 'Terpesan', 'Terjual'];
  const transOptions = ['Semua', 'Otomatis', 'Manual'];
  const count = unitCount ?? cars.length;
  const isFilterActive = statusFilter !== 'Semua' || transmissionFilter !== 'Semua' || maxBudget < 800000000;

  return (
    <>
      <div style={{ position: 'sticky', top: isNavbarVisible && !isAtTop ? '72px' : '0px' }} className="sticky z-30 w-full bg-white border-b border-hairline shadow-sm transition-[top] duration-300 ease-out select-none py-2.5 sm:py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          {/* Mobile: Search + Filter Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-forest pointer-events-none" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari mobil / plat Bogor..." className="w-full pl-9 pr-3 py-2 text-xs border border-hairline bg-alabaster focus:outline-none focus:border-forest text-charcoal font-body rounded-lg" />
            </div>
            <button type="button" onClick={() => setIsMobileFilterOpen(true)} className={`shrink-0 h-9 px-3 border rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm ${isFilterActive ? 'bg-forest text-white border-forest' : 'bg-canvas text-charcoal border-hairline hover:border-forest'}`}>
              <SlidersHorizontal className="h-3.5 w-3.5" /><span>Filter ({count})</span>
            </button>
          </div>

          {/* Desktop Search + Actions */}
          <div className="hidden lg:grid grid-cols-12 gap-2.5 items-center">
            <div className="col-span-8 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-forest pointer-events-none" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari tipe mobil, transmisi, atau plat nomor Bogor (contoh: Fortuner, Matic, F 1248)..." className="w-full pl-10 pr-36 py-2 text-sm border border-hairline bg-alabaster focus:outline-none focus:border-forest text-charcoal font-body rounded-lg" />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-sage-light border border-sage-border text-forest font-mono text-[10px] font-bold rounded"><Sparkles className="h-3 w-3" /><span>{count} READY</span></span>
              </div>
            </div>
            <div className="col-span-4 flex items-center justify-end gap-2">
              <button type="button" onClick={handleDemoCycle} className="px-3 py-2 bg-alabaster hover:bg-canvas border border-hairline hover:border-forest text-charcoal text-xs font-mono font-semibold rounded-lg flex items-center gap-1.5 active:scale-95 shadow-sm"><Shuffle className="h-3.5 w-3.5 text-forest" /><span>Demo</span></button>
              <button type="button" onClick={() => { setIsRotating(true); setTimeout(() => setIsRotating(false), 500); onReset(); }} className="px-3 py-2 bg-canvas border border-hairline hover:border-charcoal text-muted hover:text-charcoal text-xs font-mono font-semibold rounded-lg flex items-center gap-1.5 active:scale-95"><RotateCcw className={`h-3.5 w-3.5 ${isRotating ? 'animate-spin' : ''}`} /><span>Reset</span></button>
            </div>
          </div>

          {/* Desktop Filter Shelf */}
          <div className="hidden lg:grid grid-cols-12 gap-3.5 pt-2.5 border-t border-hairline items-end">
            <div className="col-span-4"><SegmentedPillControl label="Status Unit" options={statusOptions} selected={statusFilter} onChange={setStatusFilter} layoutGroupId="statusPill" /></div>
            <div className="col-span-3"><SegmentedPillControl label="Transmisi" options={transOptions} selected={transmissionFilter} onChange={setTransmissionFilter} layoutGroupId="transPill" /></div>
            <div className="col-span-5"><TactileBudgetSlider value={maxBudget} onChange={setMaxBudget} /></div>
          </div>
        </div>
      </div>

      <MobileFilterDrawer isOpen={isMobileFilterOpen} onClose={() => setIsMobileFilterOpen(false)} statusFilter={statusFilter} setStatusFilter={setStatusFilter} transmissionFilter={transmissionFilter} setTransmissionFilter={setTransmissionFilter} maxBudget={maxBudget} setMaxBudget={setMaxBudget} onReset={onReset} unitCount={count} />
    </>
  );
};
