import React from 'react';
import { WARRANTY_FAQS } from '../../data/mockData';
import { Accordion, AccordionItemData } from '../ui/accordion';
import { HelpCircle } from 'lucide-react';

export const WarrantyFAQ: React.FC = () => {
  const items: AccordionItemData[] = WARRANTY_FAQS.map((faq) => ({
    id: faq.id,
    title: faq.question,
    subtitle: faq.category,
    content: (
      <div className="space-y-2 pt-1 font-body text-sm text-muted leading-relaxed">
        <p>{faq.answer}</p>
        <div className="flex items-center gap-2 pt-2 text-xs font-mono text-sage font-semibold">
          <span className="h-1.5 w-1.5 bg-forest"></span>
          <span>Klausul Standar Showroom Bogor</span>
        </div>
      </div>
    ),
  }));

  return (
    <section aria-label="Syarat dan Prosedur Garansi" className="bg-canvas py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 border border-hairline bg-alabaster px-3 py-1">
            <HelpCircle className="h-3.5 w-3.5 text-forest" />
            <span className="font-mono text-xs font-bold text-forest uppercase tracking-wider">
              INFORMASI KLAIM & POLIS
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-charcoal">
            Pertanyaan Seputar Layanan Garansi.
          </h2>
          <p className="font-body text-xs sm:text-sm text-muted">
            Transparansi mengenai batas pertanggungan dan prosedur jika unit mengalami kendala mekanikal.
          </p>
        </div>

        <Accordion items={items} defaultOpenId="w-1" />
      </div>
    </section>
  );
};
