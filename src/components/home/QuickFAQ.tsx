import React from 'react';
import { MOCK_FAQS } from '../../data/mockFaq';
import { Accordion, AccordionItemData } from '../ui/accordion';
import { HelpCircle, ArrowUpRight } from 'lucide-react';

export const QuickFAQ: React.FC = () => {
  const accordionItems: AccordionItemData[] = MOCK_FAQS.map((faq) => ({
    id: faq.id,
    title: faq.question,
    subtitle: faq.category,
    content: (
      <div className="space-y-3 pt-1">
        <p className="font-body text-sm sm:text-base text-muted leading-relaxed">
          {faq.answer}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-hairline/60 text-xs font-mono">
          <span className="text-sage font-semibold">• Standarisasi Mutu Showroom Bogor</span>
          <a
            href="https://wa.me/6281234567890?text=Halo%20admin%20labsite,%20saya%20ingin%20konsultasi%20mengenai%20garansi%20showroom."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-forest hover:underline font-bold"
          >
            <span>Konsultasi Teknis Terkait</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    ),
  }));

  return (
    <section id="faq" aria-label="Tanya Jawab Seputar Showroom" className="bg-canvas border-b border-hairline py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 border border-hairline bg-alabaster px-3 py-1">
            <HelpCircle className="h-3.5 w-3.5 text-forest" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-forest">
              INFORMASI & TRANSPARANSI
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal tracking-tight">
            Tanya Jawab Esensial Sebelum Membeli.
          </h2>
          <p className="font-body text-xs sm:text-sm text-muted">
            Jawaban lugas mengenai standar kurasi, penanganan riwayat cuaca Bogor, hingga kepastian garansi purna jual.
          </p>
        </div>

        <Accordion items={accordionItems} defaultOpenId="faq-flood" />
      </div>
    </section>
  );
};
