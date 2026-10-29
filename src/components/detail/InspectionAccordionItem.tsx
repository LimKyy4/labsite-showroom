import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ChevronDown, CheckCircle2, MessageSquare } from 'lucide-react';

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
  carTitle?: string;
}

export const InspectionAccordionItem: React.FC<InspectionAccordionItemProps> = ({
  section,
  isOpen,
  onToggle,
  carTitle = 'Unit Showroom',
}) => {
  const handleAskTechnician = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Halo Teknisi Showroom Bogor by labsite.id, saya ingin bertanya mengenai hasil inspeksi ${section.title} untuk unit ${carTitle}.`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  return (
    <div
      className={`border transition-all duration-200 ${
        isOpen ? 'border-forest bg-alabaster shadow-sm' : 'border-hairline bg-white hover:border-muted'
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
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-mono text-xs text-forest bg-sage-light px-2 py-0.5 border border-sage-border font-bold">
                Skor: {section.score}
              </span>
            </div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="shrink-0 ml-2"
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
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-hairline bg-white"
          >
            <div className="p-4 space-y-3">
              <div className="space-y-2">
                {section.details.map((detail, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.04, ease: 'easeOut' }}
                    className="flex items-start gap-2.5 text-xs font-body text-charcoal"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-forest shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{detail}</span>
                  </motion.div>
                ))}
              </div>

              {/* Tombol Aksi Mikro Teknisi WhatsApp */}
              <div className="pt-2 border-t border-hairline flex justify-end">
                <button
                  type="button"
                  onClick={handleAskTechnician}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-alabaster hover:bg-forest text-charcoal hover:text-white border border-hairline hover:border-forest font-mono text-[11px] font-semibold transition-all shadow-sm"
                  title="Konsultasi langsung via WhatsApp dengan teknisi inspeksi"
                >
                  <MessageSquare className="h-3 w-3 text-forest group-hover:text-white" />
                  <span>Tanyakan Bagian Ini ke Teknisi</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
