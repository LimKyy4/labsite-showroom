import React, { useState, useMemo } from 'react';
import { Calculator, CheckCircle2 } from 'lucide-react';

interface CreditCalculatorProps {
  carPrice?: number;
}

export const CreditCalculator: React.FC<CreditCalculatorProps> = ({ carPrice = 300000000 }) => {
  const [dpPercent, setDpPercent] = useState<number>(30);
  const [tenorMonths, setTenorMonths] = useState<number>(36);

  const safePrice = carPrice > 0 ? carPrice : 300000000;
  const tenorOptions = [12, 24, 36, 48, 60];
  const leasingPartners = ['BCA Finance', 'Adira Finance', 'Mandiri Utama Finance (MUF)', 'BSI OTO Syariah'];

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
    <div className="border border-hairline bg-canvas p-5 sm:p-6 space-y-4 shadow-sm select-none">
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
          <span className="font-bold text-forest bg-sage-light px-2 py-0.5 border border-sage-border">
            {formatRupiah(calculation.dpAmount)}
          </span>
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
                  ? 'bg-forest text-white border-forest font-bold shadow-sm'
                  : 'bg-alabaster text-charcoal border-hairline hover:border-muted'
              }`}
            >
              {months / 12} Thn
            </button>
          ))}
        </div>
      </div>

      {/* Estimasi Angsuran Bulanan */}
      <div className="border border-hairline bg-alabaster p-4 space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="font-mono text-[11px] text-muted uppercase">Estimasi Angsuran:</span>
          <span className="font-mono text-[10px] text-forest font-semibold">Tenor {tenorMonths} Bulan</span>
        </div>
        <div className="font-heading text-2xl font-bold text-forest">
          {formatRupiah(calculation.monthlyInstallment)} <span className="text-xs font-mono font-normal text-muted">/ bulan</span>
        </div>
        <div className="pt-2 border-t border-hairline text-xs font-mono text-muted flex justify-between">
          <span>Pokok Pembiayaan:</span>
          <span className="text-charcoal font-semibold">{formatRupiah(calculation.loanPrincipal)}</span>
        </div>
      </div>

      {/* Rekanan Leasing Resmi */}
      <div className="pt-2 border-t border-hairline space-y-2">
        <span className="text-[10px] font-mono text-muted uppercase tracking-wider block font-bold">
          Mitra Pembiayaan Resmi:
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {leasingPartners.map((partner, i) => (
            <div key={i} className="px-2 py-1 bg-alabaster border border-hairline font-mono text-[10px] font-semibold text-charcoal flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-forest shrink-0" />
              <span className="truncate">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
