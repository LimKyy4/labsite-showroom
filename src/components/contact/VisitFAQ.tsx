import React from 'react';
import { VISIT_FAQS } from '../../data/mockData';
import { Accordion, AccordionItemData } from '../ui/accordion';
import { HelpCircle } from 'lucide-react';

export const VisitFAQ: React.FC = () => {
  const items: AccordionItemData[] = VISIT_FAQS.map((faq) => ({
    id: faq.id,
    title: faq.question,
    subtitle: faq.category,
    content: (
      <div className="space-y-2 pt-1 font-body text-sm text-muted leading-relaxed">
        <p>{faq.answer}</p>
        <div className="flex items-center gap-2 pt-2 text-xs font-mono text-sage font-semibold">
          <span className="h-1.5 w-1.5 bg-forest"></span>
          <span>Protokol Kunjungan Showroom Bogor</span>
        </div>
      </div>
    ),
  }));

  return (
    <section aria-label="Panduan Kunjungan Showroom" className="bg-canvas pt-16 sm:pt-20 lg:pt-24 pb-24 sm:pb-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 border border-hairline bg-alabaster px-3 py-1">
            <HelpCircle className="h-3.5 w-3.5 text-forest" />
            <span className="font-mono text-xs font-bold text-forest uppercase tracking-wider">
              PANDUAN KUNJUNGAN
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-charcoal">
            Informasi Seputar Kunjungan Fisik.
          </h2>
          <p className="font-body text-xs sm:text-sm text-muted">
            Hal-hal yang perlu Anda ketahui sebelum datang ke showroom kami di Jalan Pajajaran Bogor.
          </p>
        </div>

        <Accordion items={items} defaultOpenId="v-1" />
      </div>
    </section>
  );
};
