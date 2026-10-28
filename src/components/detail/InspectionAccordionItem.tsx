import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ChevronDown, CheckCircle2 } from 'lucide-react';

interface SectionData {
  id: string;
  title: string;
  score: string;
  details: string[];
}

interface InspectionAccordionItemProps {
  section: SectionData;
  isOpen: boolean;
  onToggle: () => void;
}

export const InspectionAccordionItem: React.FC<InspectionAccordionItemProps> = ({
  section,
  isOpen,
  onToggle,
}) => {
  return (
    <div
      className={`border transition-all duration-200 ${
        isOpen ? 'border-sage bg-alabaster shadow-sm' : 'border-hairline bg-white hover:border-muted'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 items-center justify-center border ${
              isOpen ? 'bg-forest text-white border-forest' : 'bg-alabaster text-forest border-hairline'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <span className="font-heading text-sm font-bold text-charcoal block">
              {section.title}
            </span>
            <span className="font-mono text-xs text-muted">Hasil Audit: {section.score}</span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-charcoal" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-hairline bg-white"
          >
            <div className="p-4 space-y-2.5">
              {section.details.map((detail, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.08 }}
                  className="flex items-start gap-2.5 text-xs font-body text-charcoal"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-forest shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{detail}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
