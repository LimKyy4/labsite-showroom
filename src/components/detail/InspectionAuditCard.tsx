import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export interface AuditSection {
  title: string;
  score: string;
  detail: string;
}

export const AUDIT_SECTIONS: AuditSection[] = [
  {
    title: '1. Ruang Bakar & Kompresi Mesin',
    score: '99/100',
    detail: 'Kompresi stabil 188-192 PSI, emisi Euro-4 lolos, mesin kering tanpa rembes oli.',
  },
  {
    title: '2. Struktur Sasis & Bodi',
    score: '100/100',
    detail: 'Ketebalan cat 105-112 µm, bebas bekas dempul, apron dan pilar sasis utuh simetris.',
  },
  {
    title: '3. Sistem Sensor & Kelistrikan',
    score: '98/100',
    detail: 'Scanner OBD-2 nol fault codes, soket ECU kering, lantai kabin bebas lumpur banjir Bogor.',
  },
  {
    title: '4. Kaki-Kaki, Rem & Kemudi',
    score: '97/100',
    detail: 'Kampas rem 90% tebal, tapak ban 88% rata, bushing dan shockbreaker empuk tanpa bunyi.',
  },
];

interface InspectionAuditCardProps {
  section: AuditSection;
  index: number;
}

export const InspectionAuditCard: React.FC<InspectionAuditCardProps> = ({ section, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.2 }}
      className="p-3 bg-alabaster border border-hairline rounded-lg space-y-1"
    >
      <div className="flex items-center justify-between">
        <h4 className="font-heading text-xs font-bold text-charcoal">{section.title}</h4>
        <span className="font-mono text-[10px] font-bold text-forest bg-sage-light px-2 py-0.5 border border-sage-border rounded">
          {section.score}
        </span>
      </div>
      <div className="flex items-start gap-1.5 text-xs text-muted font-body">
        <CheckCircle2 className="h-3.5 w-3.5 text-forest shrink-0 mt-0.5" />
        <p>{section.detail}</p>
      </div>
    </motion.div>
  );
};
