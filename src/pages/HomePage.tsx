import React from 'react';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { FloatingQuickSearch } from '../components/home/FloatingQuickSearch';
import { RunningTicker } from '../components/common/RunningTicker';
import { ValueProposition } from '../components/home/ValueProposition';
import { HowItWorksTimeline } from '../components/home/HowItWorksTimeline';
import { FeaturedCarsPreview } from '../components/home/FeaturedCarsPreview';
import { QuickPeekModal } from '../components/home/QuickPeekModal';
import { QuickFAQ } from '../components/home/QuickFAQ';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      <HeroCarousel />
      <FloatingQuickSearch />
      <div className="pt-10">
        <RunningTicker />
      </div>
      <ValueProposition />
      <HowItWorksTimeline />
      <FeaturedCarsPreview />
      <QuickFAQ />
      <QuickPeekModal />
    </div>
  );
};
