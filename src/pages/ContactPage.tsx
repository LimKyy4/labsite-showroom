import React from 'react';
import { LiveStatusBar } from '../components/contact/LiveStatusBar';
import { SalesAdvisors } from '../components/contact/SalesAdvisors';
import { InteractiveMap } from '../components/contact/InteractiveMap';
import { RouteGuideTimeline } from '../components/contact/RouteGuideTimeline';
import { VisitFAQ } from '../components/contact/VisitFAQ';

export const ContactPage: React.FC = () => {
  return (
    <div className="space-y-0">
      <LiveStatusBar />
      <SalesAdvisors />
      <InteractiveMap />
      <RouteGuideTimeline />
      <VisitFAQ />
    </div>
  );
};
