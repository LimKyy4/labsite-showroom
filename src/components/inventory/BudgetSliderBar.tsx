import React from 'react';

interface BudgetSliderBarProps {
  value: number;
  onChange: (val: number) => void;
}

export const BudgetSliderBar: React.FC<BudgetSliderBarProps> = ({ value, onChange }) => {
  const formatJuta = (num: number) => `Rp ${(num / 1000000).toFixed(0)} Juta`;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs">
        <span className="font-mono text-[10px] text-muted uppercase tracking-wider font-bold">
          Batas Pagu Anggaran
        </span>
        <span className="font-mono font-bold text-forest bg-sage-light px-2.5 py-0.5 border border-sage-border text-xs">
          Maks: {formatJuta(value)}
        </span>
      </div>
      <input
        type="range"
        min={100000000}
        max={800000000}
        step={20000000}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-hairline appearance-none cursor-pointer accent-forest focus:outline-none"
      />
      <div className="flex justify-between text-[10px] font-mono text-muted">
        <span>Rp 100 Jt</span>
        <span>Rp 800 Jt</span>
      </div>
    </div>
  );
};
