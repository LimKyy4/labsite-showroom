import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowUpRight, HelpCircle } from 'lucide-react';
import { MOCK_FAQS } from '../../data/mockFaq';

export const QuickFAQAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-flood');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="bg-canvas border-b border-hairline py-16 sm:py-20 select-none">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 border border-hairline bg-alabaster px-3 py-1">
            <HelpCircle className="h-3.5 w-3.5 text-forest" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-forest">
              INFORMASI &amp; TRANSPARANSI
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-charcoal tracking-tight">
            TANYA JAWAB ESENSIAL SEBELUM MEMBELI.
          </h2>
          <p className="font-body text-xs sm:text-sm text-muted">
            Kepastian standar kurasi, penanganan riwayat cuaca Bogor, hingga garansi purna jual resmi.
          </p>
        </div>

        <div className="space-y-3">
          {MOCK_FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border transition-all duration-200 bg-white overflow-hidden ${
                  isOpen ? 'border-sage shadow-sm' : 'border-hairline hover:border-sage'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] uppercase text-forest font-bold tracking-wider block">
                      {faq.category}
                    </span>
                    <h3 className="font-heading text-sm sm:text-base font-bold text-charcoal">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center border transition-colors ${
                      isOpen ? 'bg-forest text-white border-forest' : 'bg-alabaster text-charcoal border-hairline'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden border-t border-hairline bg-white"
                    >
                      <motion.div
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.25, delay: 0.04 }}
                        className="px-4 sm:px-5 pb-5 pt-3 space-y-3"
                      >
                        <p className="font-body text-xs sm:text-sm text-muted leading-relaxed">
                          {faq.answer}
                        </p>
                        <div className="pt-2 border-t border-hairline flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                          <span className="text-sage font-medium">• Standarisasi Mutu Showroom Bogor</span>
                          <a
                            href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                              `Halo labsite.id, saya ingin berkonsultasi mengenai: ${faq.question}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1 text-forest hover:text-forest-light font-bold transition-colors"
                          >
                            <span>Konsultasi Sales</span>
                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
