import React from 'react';
import { PhoneCall, Copy, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useShowroomToast } from '../../hooks/useShowroomToast';
import { useTiltEffect } from '../../hooks/useTiltEffect';

export interface AdvisorData {
  name: string;
  role: string;
  license: string;
  phone: string;
  avatar: string;
  skills: string[];
}

export const AdvisorConciergeBadge: React.FC<{ advisor: AdvisorData }> = ({ advisor }) => {
  const { showToast } = useShowroomToast();
  const { ref, style, sheenPos, onMouseMove, onMouseLeave } = useTiltEffect({ maxTilt: 6, scale: 1.012 });

  const copyContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(`${advisor.name} - ${advisor.role} (${advisor.phone})`);
    showToast('Kontak Resmi Disalin', 'Kontak Penasihat Showroom Disalin ke Clipboard.', 'success');
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Halo ${advisor.name} (${advisor.role}), saya ingin konsultasi privat unit mobil seken di Showroom Bogor.`
    );
    window.open(`https://wa.me/62${advisor.phone.replace(/[^0-9]/g, '').substring(1)}?text=${text}`, '_blank');
  };

  return (
    <article
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative border border-hairline bg-canvas p-5 sm:p-6 flex flex-col justify-between hover:border-sage transition-all duration-300 shadow-sm select-none overflow-hidden"
    >
      {/* Specular Sheen Tracker */}
      <div
        style={{
          left: `${sheenPos.x}%`,
          top: `${sheenPos.y}%`,
          opacity: sheenPos.opacity * 0.12,
          transform: 'translate(-50%, -50%)',
        }}
        className="absolute w-44 h-44 bg-white rounded-full pointer-events-none blur-lg z-20"
      />

      <div className="space-y-4 relative z-10">
        {/* Profile Header */}
        <div className="flex items-start gap-3 sm:gap-3.5">
          <div className="relative shrink-0">
            <img src={advisor.avatar} alt={advisor.name} className="h-14 w-14 sm:h-16 sm:w-16 object-cover border border-hairline" />
            <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-400/20" />
          </div>

          <div className="space-y-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-sage-light border border-sage-border text-forest font-mono text-[9px] font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-forest animate-pulse" />
              <span>ONLINE • RESPON &lt; 5 MENIT</span>
            </div>
            <h3 className="font-heading text-sm sm:text-base font-bold text-charcoal leading-snug truncate">
              {advisor.name}
            </h3>
            <p className="font-mono text-xs text-forest font-semibold leading-tight">
              {advisor.role}
            </p>
          </div>
        </div>

        {/* License & Experience */}
        <div className="p-2.5 bg-alabaster border border-hairline space-y-1">
          <div className="flex items-center gap-1.5 text-muted font-mono text-[10px]">
            <ShieldCheck className="h-3 w-3 text-forest shrink-0" />
            <span className="font-bold text-charcoal">{advisor.license}</span>
          </div>
        </div>

        {/* Scope Pills */}
        <div className="space-y-1.5">
          <span className="font-mono text-[9px] uppercase tracking-wider text-muted font-bold block">
            SPESIALISASI LAYANAN:
          </span>
          <div className="flex flex-wrap gap-1">
            {advisor.skills.map((skill, idx) => (
              <span key={idx} className="px-2 py-0.5 bg-alabaster border border-hairline text-charcoal font-mono text-[10px] flex items-center gap-1">
                <CheckCircle2 className="h-2.5 w-2.5 text-forest" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Dual Tactile Interaction Bar with Min-H-48px for thumb */}
      <div className="mt-5 pt-3.5 border-t border-hairline space-y-2.5 relative z-10">
        <div className="flex items-center justify-between font-mono text-xs text-muted">
          <span className="font-semibold text-charcoal">{advisor.phone}</span>
          <button
            type="button"
            onClick={copyContact}
            className="inline-flex items-center gap-1 text-forest hover:text-charcoal px-2.5 py-1.5 bg-alabaster border border-hairline text-[11px] font-bold transition-colors active:scale-95"
            title="Salin Kontak"
          >
            <Copy className="h-3 w-3" />
            <span>Salin</span>
          </button>
        </div>

        <button
          type="button"
          onClick={openWhatsApp}
          className="w-full min-h-[48px] py-3 px-3 bg-forest text-white font-mono text-xs font-bold hover:bg-forest-light border border-forest transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
        >
          <PhoneCall className="h-4 w-4" />
          <span>Konsultasi Privat WhatsApp</span>
        </button>
      </div>
    </article>
  );
};
