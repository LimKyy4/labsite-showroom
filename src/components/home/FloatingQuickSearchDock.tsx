import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';

export const FloatingQuickSearchDock: React.FC = () => {
  const { setFilterBudget, setFilterTransmission, setActiveTab } = useShowroomStore();
  const [budget, setBudget] = useState<number>(800000000);
  const [transmission, setTransmission] = useState<string>('Semua');

  const budgetOptions = [
    { value: 800000000, label: 'Pagu s/d Rp 800 Juta' },
    { value: 550000000, label: 'Maks Rp 550 Juta' },
    { value: 450000000, label: 'Maks Rp 450 Juta' },
    { value: 350000000, label: 'Maks Rp 350 Juta' },
    { value: 250000000, label: 'Maks Rp 250 Juta' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterBudget(budget);
    setFilterTransmission(transmission);
    setActiveTab('inventory');
  };

  return (
    <div className="relative -mt-6 sm:-mt-8 z-20 mx-auto max-w-5xl px-4 sm:px-6 select-none">
      <form
        onSubmit={handleSearch}
        className="border border-hairline bg-white p-3.5 sm:p-4 shadow-xl rounded-xl grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
      >
        {/* Budget Select */}
        <div className="sm:col-span-5 space-y-1">
          <label className="font-mono text-[10px] text-muted uppercase tracking-wider block font-bold">
            Pagu Maksimal Anggaran
          </label>
          <div className="relative">
            <select
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full h-10 px-3 bg-alabaster border border-hairline rounded-lg text-xs font-mono font-semibold text-charcoal focus:outline-none focus:border-forest cursor-pointer"
            >
              {budgetOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Transmission Select */}
        <div className="sm:col-span-4 space-y-1">
          <label className="font-mono text-[10px] text-muted uppercase tracking-wider block font-bold">
            Tipe Transmisi
          </label>
          <div className="relative">
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              className="w-full h-10 px-3 bg-alabaster border border-hairline rounded-lg text-xs font-mono font-semibold text-charcoal focus:outline-none focus:border-forest cursor-pointer"
            >
              <option value="Semua">Semua Transmisi (A/T & M/T)</option>
              <option value="Otomatis">Otomatis / Matic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
        </div>

        {/* Submit Action */}
        <div className="sm:col-span-3 sm:pt-4">
          <button
            type="submit"
            className="w-full h-10 px-4 bg-forest text-white hover:bg-forest-light border border-forest rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Cari Unit</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
