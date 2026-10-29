import React from 'react';
import { HeroStage } from '../components/home/HeroStage';
import { RunningTicker } from '../components/common/RunningTicker';
import { ValueBentoGrid } from '../components/home/ValueBentoGrid';
import { StepScrubber } from '../components/home/StepScrubber';
import { FeaturedCarsSection } from '../components/home/FeaturedCarsSection';
import { QuickFAQAccordion } from '../components/home/QuickFAQAccordion';
import { QuickPeekModal } from '../components/home/QuickPeekModal';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      <HeroStage />
      <RunningTicker />
      <ValueBentoGrid />
      <StepScrubber />
      <FeaturedCarsSection />
      <QuickFAQAccordion />
      <QuickPeekModal />
    </div>
  );
};
