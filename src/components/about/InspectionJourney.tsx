import React, { useState, useEffect, useRef } from 'react';
import { INSPECTION_STAGES, InspectionStage } from '../../data/inspectionJourneyData';
import { InspectionMilestoneItem } from './InspectionMilestoneItem';
import { InspectionDossierModal } from './InspectionDossierModal';

export const InspectionJourney: React.FC = () => {
  const [activeNode, setActiveNode] = useState(0);
  const [pathProgress, setPathProgress] = useState(15);
  const [selectedDossier, setSelectedDossier] = useState<InspectionStage | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Hitung persentase dinamis garis vertikal hijau
      const startTrigger = viewportHeight * 0.7;
      const endTrigger = viewportHeight * 0.2;
      const totalDist = rect.height - (startTrigger - endTrigger);
      const currentDist = startTrigger - rect.top;
      const rawProgress = (currentDist / totalDist) * 100;
      setPathProgress(Math.max(12, Math.min(100, rawProgress)));

      // Tentukan kartu tahap yang sedang di fokus viewport
      const focusPoint = viewportHeight * 0.45;
      stageRefs.current.forEach((el, idx) => {
        if (!el) return;
        const elRect = el.getBoundingClientRect();
        if (elRect.top <= focusPoint && elRect.bottom >= focusPoint) {
          setActiveNode(idx);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section aria-label="Alur Standarisasi Inspeksi" className="bg-canvas border-b border-hairline py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
            SCROLL-DRIVEN INSPECTION JOURNEY
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal tracking-tight">
            Standarisasi 4 Fase Sebelum Masuk Lantai Pamer.
          </h2>
          <p className="font-body text-sm text-muted">
            Transparansi alur seleksi ketat dari kedatangan unit hingga diterbitkannya polis garansi resmi.
          </p>
        </div>

        {/* Vertical Timeline with Scroll-Driven Path */}
        <div ref={containerRef} className="relative ml-4 sm:ml-6 md:ml-8 pl-6 sm:pl-8 space-y-10">
          <div className="absolute left-[-2px] top-4 bottom-8 w-0.5 bg-hairline" />
          <div
            className="absolute left-[-2px] top-4 w-0.5 bg-forest transition-all duration-150 ease-out"
            style={{ height: `${pathProgress}%` }}
          />

          {INSPECTION_STAGES.map((stage, idx) => (
            <InspectionMilestoneItem
              key={stage.num}
              stage={stage}
              isSelected={activeNode === idx}
              isCompleted={idx < activeNode}
              onSelect={() => setActiveNode(idx)}
              onOpenDossier={() => {
                setActiveNode(idx);
                setSelectedDossier(stage);
              }}
              setRef={(el) => (stageRefs.current[idx] = el)}
            />
          ))}
        </div>
      </div>

      {/* Floating Inspection Dossier Modal */}
      <InspectionDossierModal
        isOpen={!!selectedDossier}
        stage={selectedDossier}
        onClose={() => setSelectedDossier(null)}
      />
    </section>
  );
};
