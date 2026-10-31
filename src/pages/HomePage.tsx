import React from 'react';
import { motion } from 'framer-motion';
import { pageContainerVariants, pageItemVariants, heroScaleVariants } from '../utils/motionVariants';
import { HeroStage } from '../components/home/HeroStage';
import { RunningTicker } from '../components/common/RunningTicker';
import { ValueBentoGrid } from '../components/home/ValueBentoGrid';
import { StepScrubber } from '../components/home/StepScrubber';
import { FeaturedCarsSection } from '../components/home/FeaturedCarsSection';
import { QuickFAQAccordion } from '../components/home/QuickFAQAccordion';
import { QuickPeekModal } from '../components/home/QuickPeekModal';

export const HomePage: React.FC = () => {
  return (
    <motion.div
      variants={pageContainerVariants}
      initial="hidden"
      animate="visible"
      style={{ position: 'relative' }}
      className="relative space-y-0 pb-12 sm:pb-16"
    >
      <motion.div variants={heroScaleVariants}>
        <HeroStage />
      </motion.div>
      <motion.div variants={pageItemVariants}>
        <RunningTicker />
      </motion.div>
      <motion.div variants={pageItemVariants}>
        <ValueBentoGrid />
      </motion.div>
      <motion.div variants={pageItemVariants}>
        <StepScrubber />
      </motion.div>
      <motion.div variants={pageItemVariants}>
        <FeaturedCarsSection />
      </motion.div>
      <motion.div variants={pageItemVariants}>
        <QuickFAQAccordion />
      </motion.div>
      <QuickPeekModal />
    </motion.div>
  );
};
