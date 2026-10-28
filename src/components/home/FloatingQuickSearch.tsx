import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';
import { Button } from '../ui/button';
import { Dropdown, DropdownOption } from '../ui/dropdown';

export const FloatingQuickSearch: React.FC = () => {
  const { setFilterBudget, setFilterTransmission, setActiveTab } = useShowroomStore();
  const [budget, setBudget] = useState<number>(800000000);
  const [transmission, setTransmission] = useState<string>('Semua');

  const budgetOptions: DropdownOption[] = [
    { value: 800000000, label: 'Semua Anggaran (s/d Rp 800 Jt)' },
    { value: 550000000, label: 'Maksimal Rp 550 Juta' },
    { value: 450000000, label: 'Maksimal Rp 450 Juta' },
    { value: 380000000, label: 'Maksimal Rp 380 Juta' },
    { value: 250000000, label: 'Maksimal Rp 250 Juta' },
  ];

  const transmissionOptions: DropdownOption[] = [
    { value: 'Semua', label: 'Semua Tipe Transmisi' },
    { value: 'Otomatis', label: 'Otomatis / Matic' },
    { value: 'Manual', label: 'Manual' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterBudget(budget);
    setFilterTransmission(transmission);
    setActiveTab('inventory');
  };

  return (
    <div className="relative -mt-6 sm:-mt-8 z-20 mx-auto max-w-5xl px-4 sm:px-6">
      <form
        onSubmit={handleSearch}
        className="border border-hairline bg-canvas p-4 sm:p-5 shadow-xl grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-end"
      >
        <div className="sm:col-span-5">
          <Dropdown
            label="Pagu Maksimal Anggaran"
            options={budgetOptions}
            value={budget}
            onChange={(val) => setBudget(Number(val))}
          />
        </div>

        <div className="sm:col-span-4">
          <Dropdown
            label="Pilihan Transmisi"
            options={transmissionOptions}
            value={transmission}
            onChange={(val) => setTransmission(String(val))}
          />
        </div>

        <div className="sm:col-span-3">
          <Button type="submit" variant="primary" size="md" fullWidth className="h-10 sm:h-11">
            <Search className="h-3.5 w-3.5" />
            <span>Cari Unit</span>
            <ArrowRight className="h-3.5 w-3.5 ml-0.5" />
          </Button>
        </div>
      </form>
    </div>
  );
};
