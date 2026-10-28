import React, { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';

interface CreditSimulatorProps {
  carPrice?: number;
}

export const CreditSimulator: React.FC<CreditSimulatorProps> = ({ carPrice = 300000000 }) => {
  const [dpPercent, setDpPercent] = useState<number>(30);
  const [tenorMonths, setTenorMonths] = useState<number>(36);

  const safePrice = carPrice > 0 ? carPrice : 300000000;
  const tenorOptions = [12, 24, 36, 48, 60];

  const calculation = useMemo(() => {
    const dpAmount = Math.round((safePrice * dpPercent) / 100);
    const loanPrincipal = safePrice - dpAmount;
    const annualRate = 0.07;
    const years = tenorMonths / 12;
    const totalInterest = loanPrincipal * annualRate * years;
    const totalLoan = loanPrincipal + totalInterest;
    const monthlyInstallment = Math.round(totalLoan / tenorMonths);

    return { dpAmount, loanPrincipal, monthlyInstallment };
  }, [safePrice, dpPercent, tenorMonths]);

  const formatRupiah = (num: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);

  return (
    <div className="border border-hairline bg-white p-5 sm:p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-hairline">
        <div className="flex items-center gap-2">
          <Calculator className="h-4 w-4 text-forest" />
          <h3 className="font-heading text-base font-bold text-charcoal">
            Simulasi Kredit & Angsuran
          </h3>
        </div>
        <span className="font-mono text-[11px] text-muted">Bunga Flat 7% p.a.</span>
      </div>

      {/* Slider DP */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-muted uppercase tracking-wider">Uang Muka ({dpPercent}%)</span>
          <span className="font-bold text-forest">{formatRupiah(calculation.dpAmount)}</span>
        </div>
        <input
          type="range"
          min={20}
          max={50}
          step={5}
          value={dpPercent}
          onChange={(e) => setDpPercent(Number(e.target.value))}
          className="w-full h-1.5 bg-hairline appearance-none cursor-pointer accent-forest focus:outline-none"
        />
        <div className="flex justify-between text-[10px] font-mono text-muted">
          <span>Min. 20%</span>
          <span>Maks. 50%</span>
        </div>
      </div>

      {/* Pilihan Tenor */}
      <div className="space-y-1.5">
        <span className="font-mono text-[11px] text-muted uppercase tracking-wider block">Jangka Waktu (Tenor)</span>
        <div className="grid grid-cols-5 gap-1.5">
          {tenorOptions.map((months) => (
            <button
              key={months}
              type="button"
              onClick={() => setTenorMonths(months)}
              className={`py-1.5 text-xs font-mono border transition-colors ${
                tenorMonths === months
                  ? 'bg-forest text-white border-forest font-bold'
                  : 'bg-alabaster text-charcoal border-hairline hover:border-muted'
              }`}
            >
              {months / 12} Thn
            </button>
          ))}
        </div>
      </div>

      {/* Box Estimasi Angsuran */}
      <div className="border border-hairline bg-alabaster p-4 space-y-2.5">
        <div className="flex justify-between items-baseline">
          <span className="font-mono text-[11px] text-muted uppercase">Angsuran per Bulan:</span>
          <span className="font-mono text-[10px] text-forest font-semibold">Tenor {tenorMonths} Bln</span>
        </div>
        <div className="font-heading text-2xl font-bold text-forest">
          {formatRupiah(calculation.monthlyInstallment)}
        </div>
        <div className="pt-2 border-t border-hairline/70 space-y-1 text-xs font-mono text-muted">
          <div className="flex justify-between">
            <span>Pokok Pinjaman:</span>
            <span className="text-charcoal font-semibold">{formatRupiah(calculation.loanPrincipal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Mitra Rekanan:</span>
            <span className="text-forest font-semibold">BCA Finance / MUF / BSI OTO</span>
          </div>
        </div>
      </div>
    </div>
  );
};
