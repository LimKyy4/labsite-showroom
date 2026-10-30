import React, { useState, useEffect, useRef } from 'react';
import { INSPECTION_STAGES, InspectionStage } from '../../data/inspectionJourneyData';
import { TimelineMilestoneCard } from './TimelineMilestoneCard';
import { InspectionDossierModal } from './InspectionDossierModal';

export const ScrollDrivenTimeline: React.FC = () => {
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

      const startTrigger = viewportHeight * 0.7;
      const endTrigger = viewportHeight * 0.2;
      const totalDist = rect.height - (startTrigger - endTrigger);
      const currentDist = startTrigger - rect.top;
      const rawProgress = (currentDist / totalDist) * 100;
      setPathProgress(Math.max(12, Math.min(100, rawProgress)));

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
    <section aria-label="Alur Standarisasi Inspeksi" className="bg-canvas border-b border-hairline py-16 sm:py-24 select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <div className="max-w-3xl space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
            AUDITED QUALITY GATE PIPELINE • SCROLL-DRIVEN ARCHITECTURE
          </span>
          <h2 className="font-heading text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold text-charcoal tracking-tight">
            4 GERBANG MUTU VERIFIKASI SEBELUM KENDARAAN DISERAHTERIMAKAN.
          </h2>
          <p className="font-body text-xs sm:text-sm text-muted leading-relaxed">
            Transparansi alur audit industri forensik dari kedatangan unit, uji kompresi laboratorium, hingga penerbitan polis garansi resmi bermaterai.
          </p>
        </div>

        <div ref={containerRef} className="relative ml-6 sm:ml-8 md:ml-0 pl-6 sm:pl-8 md:pl-0 space-y-8 sm:space-y-12">
          {/* Track Line: Left on Mobile, Centered on Desktop */}
          <div className="absolute left-[-2px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-8 w-0.5 bg-hairline" />
          <div
            className="absolute left-[-2px] md:left-1/2 md:-translate-x-1/2 top-4 w-0.5 bg-forest transition-all duration-150 ease-out"
            style={{ height: `${pathProgress}%` }}
          />

          {INSPECTION_STAGES.map((stage, idx) => (
            <TimelineMilestoneCard
              key={stage.num}
              stage={stage}
              index={idx}
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

      <InspectionDossierModal
        isOpen={!!selectedDossier}
        stage={selectedDossier}
        onClose={() => setSelectedDossier(null)}
      />
    </section>
  );
};
