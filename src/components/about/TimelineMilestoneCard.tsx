import React from 'react';
import { ChevronDown, Check, FileText } from 'lucide-react';
import { InspectionStage } from '../../data/inspectionJourneyData';

interface TimelineMilestoneCardProps {
  stage: InspectionStage;
  index: number;
  isSelected: boolean;
  isCompleted: boolean;
  onSelect: () => void;
  onOpenDossier: () => void;
  setRef: (el: HTMLDivElement | null) => void;
}

export const TimelineMilestoneCard: React.FC<TimelineMilestoneCardProps> = ({
  stage,
  index,
  isSelected,
  isCompleted,
  onSelect,
  onOpenDossier,
  setRef,
}) => {
  const Icon = stage.icon;
  const isEven = index % 2 === 0;

  return (
    <div
      ref={setRef}
      className={`relative group ${
        isEven ? 'md:w-[calc(50%-2rem)] md:mr-auto' : 'md:w-[calc(50%-2rem)] md:ml-auto'
      }`}
    >
      {/* Milestone Node (Left-Anchored on Mobile / Centered on Desktop) */}
      <button
        type="button"
        onClick={onSelect}
        className={`absolute -left-[35px] sm:-left-[43px] ${
          isEven
            ? 'md:-right-[2.5rem] md:left-auto'
            : 'md:-left-[2.5rem]'
        } top-0 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center font-mono text-xs font-bold transition-all duration-200 border rounded-none z-10 ${
          isSelected
            ? 'bg-forest text-white border-forest scale-110 shadow-md ring-4 ring-forest/15'
            : isCompleted
            ? 'bg-sage-light text-forest border-sage-border'
            : 'bg-canvas text-muted border-hairline hover:border-forest'
        }`}
        aria-label={`Pilih Milestone ${stage.num}`}
      >
        {stage.num}
      </button>

      {/* Milestone Card */}
      <div
        onClick={onOpenDossier}
        className={`cursor-pointer border p-4 sm:p-6 transition-all duration-200 select-none ${
          isSelected ? 'border-forest bg-alabaster shadow-sm' : 'border-hairline bg-canvas hover:border-muted'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 sm:pb-3 border-b border-hairline gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center bg-canvas border border-hairline text-forest shrink-0">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase text-forest font-bold block">
                FASE {stage.num} • {stage.sub}
              </span>
              <h3 className="font-heading text-sm sm:text-base lg:text-lg font-bold text-charcoal leading-snug">
                {stage.title}
              </h3>
            </div>
          </div>
          <span className="font-mono text-[11px] sm:text-xs text-forest flex items-center gap-1 self-start sm:self-auto font-bold shrink-0">
            <span>Dossier</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isSelected ? 'rotate-180' : ''}`} />
          </span>
        </div>

        <p className="font-body text-xs sm:text-sm text-muted leading-relaxed mt-2.5">
          {stage.desc}
        </p>

        {isSelected && (
          <div className="mt-3.5 pt-3 border-t border-hairline space-y-2 font-mono text-xs text-charcoal">
            <span className="font-bold text-forest block uppercase text-[10px]">
              Checklist Pengujian Riil di Pos Ini:
            </span>
            {stage.checklist.map((item, cIdx) => (
              <div key={cIdx} className="flex items-center gap-2">
                <span className="flex h-3.5 w-3.5 items-center justify-center bg-forest text-white shrink-0">
                  <Check className="h-2.5 w-2.5" />
                </span>
                <span className="font-body text-xs text-charcoal">{item}</span>
              </div>
            ))}
            <div className="pt-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDossier();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-forest text-white text-xs font-mono font-bold hover:bg-forest-light border border-forest transition-colors shadow-sm active:scale-95"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Lihat Lembar Uji Fisik Lengkap</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
