import React from 'react';
import { ShieldCheck, FileCheck2, Award, Wrench } from 'lucide-react';
import { useTiltEffect } from '../../hooks/useTiltEffect';

const BentoCard: React.FC<{
  num: string;
  badge: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  isWide?: boolean;
}> = ({ num, badge, title, desc, icon: Icon, isWide = false }) => {
  const { ref, style, onMouseMove, onMouseLeave } = useTiltEffect({ maxTilt: 5 });

  return (
    <div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`border border-hairline bg-canvas p-6 sm:p-7 flex flex-col justify-between hover:border-forest transition-colors duration-200 ${
        isWide ? 'lg:col-span-2 bg-[#F8FAF9]' : 'lg:col-span-1'
      }`}
    >
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-hairline">
          <div className="flex h-11 w-11 items-center justify-center border border-hairline bg-canvas text-forest">
            <Icon className="h-5 w-5" />
          </div>
          <span className="font-mono text-sm font-bold text-muted">{num}</span>
        </div>

        <div className="mt-5 space-y-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-sage font-bold block">
            {badge}
          </span>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-charcoal tracking-tight">
            {title}
          </h3>
          <p className="font-body text-xs sm:text-sm text-muted leading-relaxed">
            {desc}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-3 border-t border-hairline flex items-center justify-between text-xs font-mono text-muted">
        <span>STANDAR RESMI BOGOR</span>
        <span className="h-1.5 w-1.5 bg-forest" />
      </div>
    </div>
  );
};

export const ValueProposition: React.FC = () => {
  return (
    <section id="tentang" aria-label="Keunggulan Showroom" className="bg-alabaster border-b border-hairline py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-forest font-bold block">
            BENTO GRID ARSITEKTURAL
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal tracking-tight">
            Standar Kurasi Tanpa Kompromi di Kota Hujan.
          </h2>
          <p className="font-body text-sm text-muted">
            Setiap unit mobil melewati filter berlapis untuk memastikan nol cacat struktural dan kenyamanan berkendara jangka panjang.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <BentoCard
            num="01"
            badge="PROTEKSI UTAMA 365 HARI"
            title="Jaminan Garansi Mesin & Transmisi 1 Tahun"
            desc="Perlindungan komponen internal mekanikal silinder mesin, girboks matic, dan modul transmisi dengan jaringan bengkel rekanan resmi terdekat di area Bogor."
            icon={ShieldCheck}
            isWide={true}
          />
          <BentoCard
            num="02"
            badge="LEGALITAS POLDA JABAR"
            title="Transparansi Dokumen Resmi"
            desc="Keabsahan BPKB, STNK, dan faktur pembelian divalidasi langsung di Samsat Kota Bogor. Bebas sengketa hukum dan tilang ETLE."
            icon={FileCheck2}
          />
          <BentoCard
            num="03"
            badge="UJI 160 TITIK KETAT"
            title="Sertifikasi Bebas Banjir & Tabrakan"
            desc="Struktur sasis presisi, pilar pabrik utuh tanpa las potong, dan verifikasi anti rendaman air genangan Bogor pada kabel ECU."
            icon={Award}
          />
          <BentoCard
            num="04"
            badge="PIT-STOP MANDIRI"
            title="Fasilitas Inspeksi di Tempat"
            desc="Dipersilakan membawa mekanik kepercayaan mandiri atau jasa inspeksi pihak ketiga. Kami sediakan car-lift dan scanner OBD-2."
            icon={Wrench}
            isWide={true}
          />
        </div>
      </div>
    </section>
  );
};
