import React from 'react';
import { AutomotiveTelemetryHUD } from './AutomotiveTelemetryHUD';
import { CarUnit } from '../../types/showroom';

interface QuickSpecsGridProps {
  car?: Partial<CarUnit> | null;
}

export const QuickSpecsGrid: React.FC<QuickSpecsGridProps> = (props) => {
  return <AutomotiveTelemetryHUD {...props} />;
};
