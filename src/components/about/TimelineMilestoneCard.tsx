import React from 'react';
import { ChevronDown, Check, FileText } from 'lucide-react';
import { InspectionStage } from '../../data/inspectionJourneyData';

interface TimelineMilestoneCardProps {
  stage: InspectionStage;
  isSelected: boolean;
  isCompleted: boolean;
  onSelect: () => void;
  onOpenDossier: () => void;
  setRef: (el: HTMLDivElement | null) => void;
}

export const TimelineMilestoneCard: React.FC<TimelineMilestoneCardProps> = ({
  stage,
  isSelected,
  isCompleted,
  onSelect,
  onOpenDossier,
  setRef,
}) => {
  const Icon = stage.icon;

  return (
    <div ref={setRef} className="relative group">
      {/* Milestone Node */}
      <button
        type="button"
        onClick={onSelect}
        className={`absolute -left-[35px] sm:-left-[43px] top-0 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center font-mono text-xs font-bold transition-all duration-200 border ${
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
        className={`cursor-pointer border p-5 sm:p-6 transition-all duration-200 ${
          isSelected ? 'border-forest bg-alabaster shadow-sm' : 'border-hairline bg-canvas hover:border-muted'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-hairline gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center bg-canvas border border-hairline text-forest">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-forest font-bold block">
                FASE {stage.num} • {stage.sub}
              </span>
              <h3 className="font-heading text-base sm:text-lg font-bold text-charcoal">
                {stage.title}
              </h3>
            </div>
          </div>
          <span className="font-mono text-xs text-forest flex items-center gap-1 self-start sm:self-auto font-bold">
            <span>Buka Dossier Teknis</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isSelected ? 'rotate-180' : ''}`} />
          </span>
        </div>

        <p className="font-body text-xs sm:text-sm text-muted leading-relaxed mt-3">
          {stage.desc}
        </p>

        {isSelected && (
          <div className="mt-4 pt-3.5 border-t border-hairline space-y-2.5 font-mono text-xs text-charcoal">
            <span className="font-bold text-forest block uppercase text-[11px]">
              Checklist Pengujian Riil di Pos Ini:
            </span>
            {stage.checklist.map((item, cIdx) => (
              <div key={cIdx} className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center bg-forest text-white shrink-0">
                  <Check className="h-3 w-3" />
                </span>
                <span className="font-body text-xs">{item}</span>
              </div>
            ))}
            <div className="pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDossier();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-forest text-white text-xs font-mono font-bold hover:bg-forest-light border border-forest transition-colors shadow-sm"
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
