import React from 'react';
import { BrandStorySection } from '../components/about/BrandStorySection';
import { PartnerTickerBar } from '../components/about/PartnerTickerBar';
import { GuaranteePillarsGrid } from '../components/about/GuaranteePillarsGrid';
import { ScrollDrivenTimeline } from '../components/about/ScrollDrivenTimeline';
import { WarrantyClaimAccordion } from '../components/about/WarrantyClaimAccordion';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-0">
      <BrandStorySection />
      <PartnerTickerBar />
      <GuaranteePillarsGrid />
      <ScrollDrivenTimeline />
      <WarrantyClaimAccordion />
    </div>
  );
};
