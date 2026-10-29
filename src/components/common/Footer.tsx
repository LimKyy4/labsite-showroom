import React from 'react';
import { FooterBrandAnchor } from '../footer/FooterBrandAnchor';
import { FooterDirectoryGrid } from '../footer/FooterDirectoryGrid';
import { FooterCredibilityCard } from '../footer/FooterCredibilityCard';
import { FooterBottomBar } from '../footer/FooterBottomBar';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-hairline bg-alabaster text-charcoal select-none">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid: Brand Anchor + 3 Column Directory + Credibility Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Zona 1: Brand Anchor & Live Telemetry (col 4) */}
          <div className="lg:col-span-4">
            <FooterBrandAnchor />
          </div>

          {/* Zona 2: Direktori Cepat & Peta Rute Singkat (col 5) */}
          <div className="lg:col-span-5">
            <FooterDirectoryGrid />
          </div>

          {/* Zona 3: Lencana Kredibilitas Fisik & Jam Kerja (col 3) */}
          <div className="lg:col-span-3">
            <FooterCredibilityCard />
          </div>
        </div>

        {/* Zona 4: Bottom Utility Bar */}
        <FooterBottomBar />
      </div>
    </footer>
  );
};
