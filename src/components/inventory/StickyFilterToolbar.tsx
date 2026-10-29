import React from 'react';
import { CockpitCommandBar } from './CockpitCommandBar';

interface StickyFilterToolbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  statusFilter: string;
  setStatusFilter: (st: string) => void;
  transmissionFilter: string;
  setTransmissionFilter: (tr: string) => void;
  maxBudget: number;
  setMaxBudget: (b: number) => void;
  onReset: () => void;
  unitCount?: number;
}

export const StickyFilterToolbar: React.FC<StickyFilterToolbarProps> = (props) => {
  return <CockpitCommandBar {...props} />;
};
