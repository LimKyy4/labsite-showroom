import React from 'react';
import { BrandStory } from '../components/about/BrandStory';
import { PartnerTicker } from '../components/about/PartnerTicker';
import { GuaranteePillars } from '../components/about/GuaranteePillars';
import { InspectionJourney } from '../components/about/InspectionJourney';
import { WarrantyFAQ } from '../components/about/WarrantyFAQ';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-0">
      <BrandStory />
      <PartnerTicker />
      <GuaranteePillars />
      <InspectionJourney />
      <WarrantyFAQ />
    </div>
  );
};
