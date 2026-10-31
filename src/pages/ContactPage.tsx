import React from 'react';
import { motion } from 'framer-motion';
import { pageContainerVariants, pageItemVariants } from '../utils/motionVariants';
import { LiveStatusBar } from '../components/contact/LiveStatusBar';
import { SalesAdvisorCards } from '../components/contact/SalesAdvisorCards';
import { InteractiveMapFacade } from '../components/contact/InteractiveMapFacade';
import { RouteGuideTabs } from '../components/contact/RouteGuideTabs';
import { TestDriveBookingForm } from '../components/contact/TestDriveBookingForm';
import { VisitFAQ } from '../components/contact/VisitFAQ';

export const ContactPage: React.FC = () => {
  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      style={{ position: 'relative' }}
      className="relative space-y-0 pb-16"
    >
      <motion.div variants={pageItemVariants}>
        <LiveStatusBar />
      </motion.div>
      <motion.div variants={pageItemVariants}>
        <SalesAdvisorCards />
      </motion.div>
      <motion.div variants={pageItemVariants}>
        <InteractiveMapFacade />
      </motion.div>
      <motion.div variants={pageItemVariants}>
        <RouteGuideTabs />
      </motion.div>
      <motion.div variants={pageItemVariants}>
        <TestDriveBookingForm />
      </motion.div>
      <motion.div variants={pageItemVariants}>
        <VisitFAQ />
      </motion.div>
    </motion.div>
  );
};
