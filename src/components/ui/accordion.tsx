import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemData {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  allowMultiple = false,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="divide-y divide-hairline border-y border-hairline bg-canvas">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="transition-colors duration-150">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-forest"
              aria-expanded={isOpen}
            >
              <div className="pr-4">
                {item.subtitle && (
                  <span className="block text-xs uppercase tracking-wider text-sage font-semibold mb-1">
                    {item.subtitle}
                  </span>
                )}
                <h3 className="text-base sm:text-lg font-semibold tracking-tight text-charcoal">
                  {item.title}
                </h3>
              </div>
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center border border-hairline transition-transform duration-200 ${
                  isOpen ? 'rotate-180 bg-forest text-white border-forest' : 'bg-alabaster text-charcoal'
                }`}
              >
                <ChevronDown className="h-4 w-4" />
              </div>
            </button>
            {isOpen && (
              <div className="pb-5 pt-1 text-sm sm:text-base leading-relaxed text-muted animate-fadeIn">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
