import React from 'react';
import { CarStatus } from '../../types/showroom';

interface CarStatusBadgeProps {
  status: CarStatus;
  size?: 'sm' | 'md';
}

export const CarStatusBadge: React.FC<CarStatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStyles = () => {
    switch (status) {
      case 'Tersedia':
        return 'bg-[#EBF2EE] text-[#183B2B] border-[#C8DCD0]';
      case 'Terpesan':
        return 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]';
      case 'Terjual':
        return 'bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]';
      default:
        return 'bg-alabaster text-charcoal border-hairline';
    }
  };

  const sizeStyles = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1 font-semibold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 border font-mono uppercase tracking-wider ${getStyles()} ${sizeStyles}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-none ${
          status === 'Tersedia'
            ? 'bg-[#183B2B]'
            : status === 'Terpesan'
            ? 'bg-[#B45309]'
            : 'bg-[#6B7280]'
        }`}
      />
      {status}
    </span>
  );
};
