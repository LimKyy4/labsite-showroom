import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight, HelpCircle } from 'lucide-react';
import { MOCK_FAQS } from '../../data/mockFaq';

export const QuickFAQAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-flood');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="bg-canvas border-b border-hairline py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 border border-hairline bg-alabaster px-3 py-1">
            <HelpCircle className="h-3.5 w-3.5 text-forest" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-forest">
              INFORMASI & TRANSPARANSI
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
              <div key={faq.id} className="border border-hairline bg-alabaster overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 transition-colors hover:bg-canvas"
                >
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] uppercase text-forest font-bold tracking-wider block">
                      {faq.category}
                    </span>
                    <h3 className="font-heading text-sm sm:text-base font-bold text-charcoal">
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`p-1 border border-hairline bg-canvas transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 border-forest' : ''}`}>
                    <ChevronDown className="h-4 w-4 text-forest" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 space-y-3 border-t border-hairline bg-canvas">
                    <p className="font-body text-xs sm:text-sm text-muted leading-relaxed">
                      {faq.answer}
                    </p>
                    <div className="pt-2 border-t border-hairline flex items-center justify-between text-xs font-mono">
                      <span className="text-sage font-medium">Standarisasi Mutu Showroom Bogor</span>
                      <a
                        href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo labsite.id, saya ingin bertanya lebih lanjut terkait: ${faq.question}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-forest hover:underline font-bold"
                      >
                        <span>Konsultasi Sales</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
