import React from 'react';
import { LiveStatusBar } from '../components/contact/LiveStatusBar';
import { SalesAdvisorCards } from '../components/contact/SalesAdvisorCards';
import { InteractiveMapFacade } from '../components/contact/InteractiveMapFacade';
import { RouteGuideTabs } from '../components/contact/RouteGuideTabs';
import { TestDriveBookingForm } from '../components/contact/TestDriveBookingForm';
import { VisitFAQ } from '../components/contact/VisitFAQ';

export const ContactPage: React.FC = () => {
  return (
    <div className="space-y-0">
      <LiveStatusBar />
      <SalesAdvisorCards />
      <InteractiveMapFacade />
      <RouteGuideTabs />
      <TestDriveBookingForm />
      <VisitFAQ />
    </div>
  );
};
