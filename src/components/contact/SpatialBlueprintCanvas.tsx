import React from 'react';
import { Navigation, ExternalLink, MapPin } from 'lucide-react';

export const SpatialBlueprintCanvas: React.FC = () => {
  const openGoogleMaps = () => {
    window.open('https://maps.google.com/?q=Jl.+Pajajaran+No.+88,+Baranangsiang,+Bogor+Timur', '_blank');
  };

  const openWaze = () => {
    window.open('https://waze.com/ul?q=Jl.+Pajajaran+No.+88+Bogor', '_blank');
  };

  return (
    <div className="border border-hairline bg-canvas p-6 space-y-4 shadow-sm select-none">
      {/* CAD Map Header & HUD Coordinate Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-hairline gap-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-forest" />
          <span className="font-heading text-sm font-bold text-charcoal">
            SPATIAL CAD BLUEPRINT MAP
          </span>
        </div>
        <div className="font-mono text-[10px] text-forest bg-sage-light px-2.5 py-1 border border-sage-border font-bold">
          LAT: -6.6022 | LONG: 106.8122 • ELEV: +260M ASL (BEBAS BANJIR)
        </div>
      </div>

      {/* Blueprint Canvas Vector Stage */}
      <div className="relative aspect-[16/10] w-full bg-[#19201D] border border-hairline overflow-hidden p-4">
        {/* CAD Grid Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cadGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#4D7260" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cadGrid)" />
        </svg>

        {/* Vector Arterial Roads & Annotations */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 375">
          {/* Tol Jagorawi Entry Line */}
          <line x1="30" y1="340" x2="220" y2="200" stroke="#64748B" strokeWidth="6" strokeDasharray="8 4" />
          <text x="40" y="325" fill="#EBF2EE" fontSize="10" fontFamily="monospace" fontWeight="bold">TOL JAGORAWI (KM 40)</text>

          {/* Bundaran Tugu Kujang */}
          <circle cx="230" cy="190" r="24" stroke="#4D7260" strokeWidth="2" fill="none" />
          <text x="180" y="235" fill="#94A3B8" fontSize="9" fontFamily="monospace">TUGU KUJANG</text>

          {/* Jl. Raya Pajajaran Main Arterial */}
          <line x1="240" y1="175" x2="520" y2="80" stroke="#183B2B" strokeWidth="12" />
          <line x1="240" y1="175" x2="520" y2="80" stroke="#EBF2EE" strokeWidth="1" strokeDasharray="6 6" />
          <text x="320" y="115" fill="#EBF2EE" fontSize="10" fontFamily="monospace" fontWeight="bold">JL. RAYA PAJAJARAN</text>

          {/* 5-Min Radius Access Circle */}
          <circle cx="430" cy="110" r="85" stroke="#4D7260" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.4" />
          <text x="360" y="45" fill="#4D7260" fontSize="9" fontFamily="monospace">5 MENIT RADIUS TOL</text>

          {/* Showroom Anchor Point with Multi-Ring Pulse */}
          <circle cx="430" cy="110" r="16" fill="#183B2B" opacity="0.4" className="animate-ping" />
          <circle cx="430" cy="110" r="8" fill="#183B2B" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="430" cy="110" r="2.5" fill="#34D399" />
          <text x="445" y="105" fill="#FFFFFF" fontSize="11" fontFamily="sans-serif" fontWeight="bold">SHOWROOM No. 88</text>
          <text x="445" y="120" fill="#34D399" fontSize="9" fontFamily="monospace">BOGOR TIMUR</text>
        </svg>

        {/* Floating Blueprint HUD Overlay Card */}
        <div className="absolute bottom-3 left-3 bg-[#183B2B]/95 border border-sage-border p-3 space-y-1 text-white max-w-xs shadow-lg">
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-400 font-bold uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>KORIDOR PAJAJARAN TIMUR</span>
          </div>
          <h4 className="font-heading text-xs font-bold leading-tight">
            labsite.id Showroom Flagship
          </h4>
          <p className="font-body text-[10px] text-sage-light/80 leading-tight">
            Samping Bank Mandiri Pajajaran, 5 menit dari Exit Gerbang Tol Jagorawi.
          </p>
        </div>
      </div>

      {/* Dual Tactile Navigation Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          type="button"
          onClick={openGoogleMaps}
          className="py-2.5 px-3 bg-forest text-white font-mono text-xs font-bold hover:bg-forest-light border border-forest transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Navigation className="h-3.5 w-3.5" />
          <span>Buka Google Maps</span>
          <ExternalLink className="h-3 w-3" />
        </button>
        <button
          type="button"
          onClick={openWaze}
          className="py-2.5 px-3 bg-canvas text-charcoal font-mono text-xs font-bold hover:border-forest border border-hairline transition-colors flex items-center justify-center gap-2"
        >
          <Navigation className="h-3.5 w-3.5 text-forest" />
          <span>Navigasi via Waze</span>
        </button>
      </div>
    </div>
  );
};
