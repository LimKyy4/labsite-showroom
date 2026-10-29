import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { InspectionBreakdown } from '../../types/showroom';
import { InspectionAccordionItem } from './InspectionAccordionItem';

export const DEFAULT_INSPECTION_BREAKDOWN: InspectionBreakdown = {
  engineScore: '99/100 (Kompresi Padat, Kering Tanpa Rembes)',
  transmissionScore: '98/100 (Perpindahan Halus, Torsi Responsif)',
  chassisScore: '100/100 (Pilar A-B-C Utuh, Bebas Tabrak)',
  electricalScore: '98/100 (Sensor ECU Normal, Soket Kering)',
  interiorScore: '96/100 (Karpet Kering Bebas Banjir)',
  floodFreeConfirmed: true,
  accidentFreeConfirmed: true,
};

interface InspectionReportAccordionProps {
  breakdown?: Partial<InspectionBreakdown> | null;
  carTitle?: string;
}

export const InspectionReportAccordion: React.FC<InspectionReportAccordionProps> = ({
  breakdown,
  carTitle = 'Toyota Fortuner VRZ',
}) => {
  const [openSection, setOpenSection] = useState<string | null>('engine');

  const safeData: InspectionBreakdown = {
    ...DEFAULT_INSPECTION_BREAKDOWN,
    ...(breakdown || {}),
  };

  const sections = [
    {
      id: 'engine',
      title: 'Ruang Bakar, Kompresi Mesin & Transmisi',
      score: '99/100',
      details: [
        'Kompresi ruang bakar silinder stabil 185-190 PSI, bebas knocking atau bunyi ketukan',
        'Blok mesin & girboks kering, bebas rembesan oli maupun cairan pendingin',
        'Transmisi matic responsif tanpa slip atau jeda perpindahan gigi maju-mundur',
      ],
    },
    {
      id: 'chassis',
      title: 'Integritas Struktur Sasis & Rangka Utama',
      score: '100/100',
      details: [
        'Pilar A, B, C dan apron depan utuh dengan titik las pabrik original',
        'Sasis bebas bekas benturan, deformasi, maupun proses penarikan ulang',
        'Garis nat kap mesin, pintu samping, dan bagasi belakang simetris presisi',
      ],
    },
    {
      id: 'electrical',
      title: 'Sensor ECU, Kelistrikan & Uji Genangan Banjir',
      score: '98/100',
      details: [
        'Kolong karpet dasar dan rel jok kering, bebas residu lumpur genangan banjir Bogor',
        'Soket sensor ECU di bawah dasbor bersih tanpa korosi rendaman air',
        'Komputer ECU terbebas dari kode kerusakan kelistrikan (DTC Clean)',
      ],
    },
  ];

  return (
    <div className="border border-hairline bg-canvas p-6 space-y-5 shadow-sm select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-hairline">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
            MODUL CHECKLIST 160 TITIK
          </span>
          <h3 className="font-heading text-lg font-bold text-charcoal">
            Hasil Uji Kelayakan & Skor Verifikasi
          </h3>
        </div>

        {/* Skor Kelayakan Terintegrasi */}
        <div className="flex flex-wrap items-center gap-2">
          {safeData.floodFreeConfirmed && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-sage-light border-2 border-forest text-forest font-mono text-xs font-bold shadow-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-forest" />
              <span>Bebas Banjir</span>
            </div>
          )}
          {safeData.accidentFreeConfirmed && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-sage-light border-2 border-forest text-forest font-mono text-xs font-bold shadow-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-forest" />
              <span>Bebas Tabrak</span>
            </div>
          )}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {sections.map((sec) => (
          <InspectionAccordionItem
            key={sec.id}
            section={sec}
            isOpen={openSection === sec.id}
            onToggle={() => setOpenSection(openSection === sec.id ? null : sec.id)}
            carTitle={carTitle}
          />
        ))}
      </div>
    </div>
  );
};
