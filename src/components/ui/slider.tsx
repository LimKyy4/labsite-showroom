import React from 'react';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  formatValue?: (val: number) => string;
  label?: string;
}

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 10000000,
  value,
  onChange,
  formatValue = (v) => `${v.toLocaleString('id-ID')}`,
  label,
}) => {
  return (
    <div className="w-full space-y-2">
      {label && (
        <div className="flex justify-between items-center text-xs font-medium">
          <span className="text-muted uppercase tracking-wider">{label}</span>
          <span className="text-forest font-bold font-mono">{formatValue(value)}</span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-hairline appearance-none cursor-pointer accent-forest focus:outline-none"
      />
      <div className="flex justify-between text-[11px] text-muted font-mono">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
};
