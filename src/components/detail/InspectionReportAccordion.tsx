import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { InspectionBreakdown } from '../../types/showroom';
import { InspectionAccordionItem } from './InspectionAccordionItem';

export const DEFAULT_INSPECTION_BREAKDOWN: InspectionBreakdown = {
  engineScore: '98/100 (Kompresi Padat, Kering Tanpa Rembes Oli)',
  transmissionScore: '96/100 (Perpindahan Halus, Torsi Responsif)',
  chassisScore: '100/100 (Pilar A-B-C Utuh Pabrik, Bebas Benturan)',
  electricalScore: '97/100 (ECU & Sistem Kelistrikan Normal)',
  interiorScore: '95/100 (Jok Kulit Segar, Karpet Kering Bebas Banjir)',
  floodFreeConfirmed: true,
  accidentFreeConfirmed: true,
};

interface InspectionReportAccordionProps {
  breakdown?: Partial<InspectionBreakdown> | null;
}

export const InspectionReportAccordion: React.FC<InspectionReportAccordionProps> = ({ breakdown }) => {
  const [openSection, setOpenSection] = useState<string | null>('engine');

  const safeData: InspectionBreakdown = {
    ...DEFAULT_INSPECTION_BREAKDOWN,
    ...(breakdown || {}),
  };

  const sections = [
    {
      id: 'engine',
      title: 'Performa Mesin & Sistem Transmisi',
      score: safeData.engineScore || DEFAULT_INSPECTION_BREAKDOWN.engineScore,
      details: [
        'Kompresi silinder stabil 185-190 PSI, bebas knocking atau bunyi ketukan',
        'Blok mesin & girboks kering, bebas rembesan oli maupun cairan pendingin',
        'Transmisi matic responsif tanpa slip atau jeda perpindahan gigi maju-mundur',
      ],
    },
    {
      id: 'chassis',
      title: 'Integritas Struktur Sasis & Rangka Utama',
      score: safeData.chassisScore || DEFAULT_INSPECTION_BREAKDOWN.chassisScore,
      details: [
        'Pilar A, B, C dan apron depan utuh dengan titik las pabrik original',
        'Sasis bebas bekas benturan, deformasi, maupun proses penarikan ulang',
        'Garis nat kap mesin, pintu, dan bagasi belakang simetris presisi',
      ],
    },
    {
      id: 'electrical',
      title: 'Kelistrikan, ECU, & Uji Bebas Genangan Air',
      score: safeData.electricalScore || DEFAULT_INSPECTION_BREAKDOWN.electricalScore,
      details: [
        'Soket kelistrikan di bawah dasbor bersih tanpa residu lumpur genangan Bogor',
        'Rel jok pengemudi dan karpet dasar kering bebas korosi rendaman air',
        'Komputer ECU terbebas dari kode kerusakan kelistrikan (DTC Clean)',
      ],
    },
  ];

  return (
    <div className="border border-hairline bg-white p-6 space-y-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-hairline">
        <div>
          <h3 className="font-heading text-lg font-bold text-charcoal">
            Laporan Digital Inspeksi 160 Titik
          </h3>
          <p className="font-body text-xs text-muted">
            Pengujian independen bersertifikasi sebelum unit masuk lantai pamer showroom Bogor.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {safeData.floodFreeConfirmed && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-sage-light border border-sage-border text-forest font-mono text-xs font-bold">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Bebas Banjir</span>
            </div>
          )}
          {safeData.accidentFreeConfirmed && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-sage-light border border-sage-border text-forest font-mono text-xs font-bold">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Bebas Tabrak</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {sections.map((sec) => (
          <InspectionAccordionItem
            key={sec.id}
            section={sec}
            isOpen={openSection === sec.id}
            onToggle={() => setOpenSection(openSection === sec.id ? null : sec.id)}
          />
        ))}
      </div>
    </div>
  );
};
