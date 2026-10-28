import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string | number;
  label: string;
  sublabel?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string | number;
  onChange: (val: any) => void;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder = 'Pilih Opsi...',
  fullWidth = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${fullWidth ? 'w-full' : 'inline-block'}`}>
      {label && (
        <span className="block font-mono text-[11px] uppercase tracking-wider text-muted font-semibold mb-1.5">
          {label}
        </span>
      )}

      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2.5 sm:p-3 text-xs sm:text-sm font-mono border border-hairline bg-canvas hover:border-muted focus:outline-none focus:ring-1 focus:ring-sage text-charcoal font-medium text-left transition-colors select-none"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-forest' : ''
          }`}
        />
      </button>

      {/* Popover Menu Panel */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute z-50 mt-1 w-full border border-hairline bg-canvas shadow-xl max-h-60 overflow-y-auto no-scrollbar animate-fadeIn"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs sm:text-sm font-mono text-left transition-colors border-b border-hairline/40 last:border-b-0 ${
                  isSelected
                    ? 'bg-sage-light text-forest font-bold'
                    : 'text-charcoal hover:bg-alabaster'
                }`}
              >
                <div>
                  <span className="block leading-tight">{opt.label}</span>
                  {opt.sublabel && (
                    <span className="block text-[10px] text-muted font-normal mt-0.5">
                      {opt.sublabel}
                    </span>
                  )}
                </div>
                {isSelected && <Check className="h-3.5 w-3.5 text-forest shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
