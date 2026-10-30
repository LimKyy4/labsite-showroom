import React, { useState } from 'react';
import { ArrowUpRight, Share2, Check, Clock, Mountain, AlertCircle } from 'lucide-react';
import { RouteStep } from '../../data/routeStepsData';

interface RouteStepDetailProps {
  step: RouteStep;
  onOpenNavigation: (app: 'google' | 'waze') => void;
}

export const RouteStepDetail: React.FC<RouteStepDetailProps> = ({ step, onOpenNavigation }) => {
  const [copied, setCopied] = useState(false);

  const handleShareToPhone = () => {
    const mapsUrl = 'https://maps.google.com/?q=Jl.+Pajajaran+No.+88,+Baranangsiang,+Bogor+Timur';
    navigator.clipboard.writeText(mapsUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="border border-hairline bg-alabaster p-4 sm:p-7 space-y-5 sm:space-y-6 shadow-sm select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
        {/* Landmark Physical Photo */}
        <div className="lg:col-span-4 relative aspect-[16/10] overflow-hidden border border-hairline bg-charcoal">
          <img
            src={step.photoUrl}
            alt={step.landmark}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-charcoal/90 text-white font-mono text-[9px] px-2 py-0.5 border border-hairline/20 uppercase">
            PATOKAN FISIK #{step.num}
          </div>
          <div className="absolute bottom-2 left-2 right-2 bg-forest/90 text-white font-mono text-[10px] px-2 py-1 flex items-center justify-between">
            <span className="truncate">{step.landmark}</span>
            <span className="shrink-0">{step.elevation}</span>
          </div>
        </div>

        {/* Dossier Information */}
        <div className="lg:col-span-8 space-y-3 sm:space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-forest bg-sage-light px-2.5 py-0.5 border border-sage-border font-bold">
              WAYPOINT {step.num} DARI 04
            </span>
            <span className="font-mono text-xs text-charcoal bg-canvas px-2.5 py-0.5 border border-hairline font-semibold">
              Jarak: {step.distance}
            </span>
            <span className="font-mono text-xs text-muted flex items-center gap-1">
              <Mountain className="h-3 w-3 text-forest" />
              <span>{step.elevation}</span>
            </span>
          </div>

          <div>
            <h3 className="font-heading text-lg sm:text-2xl font-bold text-charcoal leading-snug">{step.title}</h3>
            <p className="font-body text-xs sm:text-sm text-muted leading-relaxed mt-1">{step.desc}</p>
          </div>

          {/* Travel Time & Traffic Tip Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
            <div className="bg-canvas border border-hairline p-2.5 flex items-center gap-2.5">
              <Clock className="h-4 w-4 text-forest shrink-0" />
              <div className="text-xs">
                <div className="font-heading font-bold text-charcoal">Estimasi Durasi Tempuh</div>
                <div className="font-mono text-[10px] sm:text-[11px] text-muted">Lancar: {step.travelTimeNormal} • Ramai: {step.travelTimePeak}</div>
              </div>
            </div>
            <div className="bg-canvas border border-hairline p-2.5 flex items-start sm:items-center gap-2.5">
              <AlertCircle className="h-4 w-4 text-forest shrink-0 mt-0.5 sm:mt-0" />
              <div className="text-xs">
                <div className="font-heading font-bold text-charcoal">Panduan Lajur Rekomendasi</div>
                <div className="font-body text-[11px] text-muted leading-snug">{step.trafficTip}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Command Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 sm:pt-4 border-t border-hairline">
        <div className="text-xs font-mono text-muted flex items-center gap-2 self-start sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Rute terverifikasi tim patroli showroom Bogor</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleShareToPhone}
            className="flex-1 sm:flex-none px-3.5 py-2.5 bg-canvas text-charcoal font-mono text-xs font-bold hover:border-forest border border-hairline transition-colors flex items-center justify-center gap-1.5 active:scale-95"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5 text-forest" />}
            <span>{copied ? 'Tersalin' : 'Kirim ke Ponsel'}</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenNavigation('google')}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-forest text-white font-mono text-xs font-bold hover:bg-forest-light border border-forest transition-colors flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
          >
            <span>Buka Google Maps</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
