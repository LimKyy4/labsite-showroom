import React from 'react';
import { motion } from 'framer-motion';
import { pageContainerVariants, pageItemVariants } from '../utils/motionVariants';
import { BrandStorySection } from '../components/about/BrandStorySection';
import { PartnerTickerBar } from '../components/about/PartnerTickerBar';
import { GuaranteePillarsGrid } from '../components/about/GuaranteePillarsGrid';
import { ScrollDrivenTimeline } from '../components/about/ScrollDrivenTimeline';
import { WarrantyClaimAccordion } from '../components/about/WarrantyClaimAccordion';

export const AboutPage: React.FC = () => {
  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      style={{ position: 'relative' }}
      className="relative space-y-0 pb-16"
    >
      <motion.div variants={pageItemVariants}>
        <BrandStorySection />
      </motion.div>
      <motion.div variants={pageItemVariants}>
        <PartnerTickerBar />
      </motion.div>
      <motion.div variants={pageItemVariants}>
        <GuaranteePillarsGrid />
      </motion.div>
      <motion.div variants={pageItemVariants}>
        <ScrollDrivenTimeline />
      </motion.div>
      <motion.div variants={pageItemVariants}>
        <WarrantyClaimAccordion />
      </motion.div>
    </motion.div>
  );
};
