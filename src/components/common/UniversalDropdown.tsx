import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  count?: number;
}

interface UniversalDropdownProps {
  label?: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  className?: string;
}

export const UniversalDropdown: React.FC<UniversalDropdownProps> = ({
  label,
  value,
  options,
  onChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className={`relative inline-block text-left ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-[11px] font-mono text-muted uppercase tracking-wider mb-1">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 bg-canvas border border-hairline px-3 py-2 text-xs font-mono text-charcoal hover:border-forest transition-colors"
        aria-expanded={isOpen}
      >
        <span className="truncate">{selectedOption?.label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-forest' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-full min-w-[160px] bg-canvas border border-hairline shadow-lg z-50 py-1 max-h-60 overflow-y-auto">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-mono text-left transition-colors ${
                  isSelected
                    ? 'bg-sage-light text-forest font-semibold'
                    : 'text-charcoal hover:bg-alabaster'
                }`}
              >
                <span className="truncate">{option.label}</span>
                {option.count !== undefined && (
                  <span className="text-[10px] text-muted ml-2">({option.count})</span>
                )}
                {isSelected && <Check className="h-3.5 w-3.5 text-forest ml-2 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
