import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { WarrantySLACommandBar } from './WarrantySLACommandBar';
import { WARRANTY_REGULATIONS } from '../../data/warrantyRegulationsData';

export const WarrantyClaimAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('reg-1');

  return (
    <section aria-label="Syarat dan Tata Kelola Klaim Garansi" className="bg-alabaster border-b border-hairline py-16 sm:py-24 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <WarrantySLACommandBar />

        <div className="space-y-4 pt-4">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
              REGULASI KLAIM &amp; PROTOKOL PENYELESAIAN
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-charcoal">
              Ketentuan Pelaksanaan Garansi Tertulis 365 Hari
            </h3>
          </div>

          <div className="space-y-3">
            {WARRANTY_REGULATIONS.map((reg) => {
              const isOpen = openId === reg.id;
              return (
                <div
                  key={reg.id}
                  className={`border transition-all duration-200 bg-white overflow-hidden ${
                    isOpen ? 'border-sage shadow-sm' : 'border-hairline hover:border-sage'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : reg.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 transition-colors"
                  >
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] uppercase text-forest font-bold tracking-wider block">
                        {reg.category}
                      </span>
                      <h4 className="font-heading text-sm sm:text-base font-bold text-charcoal">
                        {reg.title}
                      </h4>
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
                          className="p-4 sm:p-5 space-y-3"
                        >
                          <p className="font-body text-xs sm:text-sm text-muted leading-relaxed">
                            {reg.summary}
                          </p>
                          <div className="space-y-2 pt-1 font-mono text-xs">
                            {reg.procedure.map((step, sIdx) => (
                              <div key={sIdx} className="flex items-start gap-2 text-charcoal">
                                <ShieldCheck className="h-3.5 w-3.5 text-forest shrink-0 mt-0.5" />
                                <span>{step}</span>
                              </div>
                            ))}
                          </div>
                          <div className="pt-2 border-t border-hairline flex items-center justify-between text-xs font-mono">
                            <span className="text-muted">Klausul Sah Bermaterai</span>
                            <a
                              href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                                `Halo tim garansi labsite.id Bogor, saya ingin berkonsultasi mengenai: ${reg.title}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex items-center gap-1 text-forest hover:text-forest-light font-bold transition-colors"
                            >
                              <span>Konsultasi Hotline Klaim</span>
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
      </div>
    </section>
  );
};
