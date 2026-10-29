import React from 'react';
import { Fuel, Route, UserCheck, ShieldAlert, Award, PhoneCall } from 'lucide-react';

const PROTOCOLS = [
  {
    icon: Fuel,
    title: '100% Bahan Bakar Ditanggung',
    desc: 'Tangki terisi bahan bakar beroktan tinggi (Ron 92/Cetane 51) tanpa pungutan biaya operasional sepeserpun.',
  },
  {
    icon: Route,
    title: 'Rute Uji Dinamis & Fleksibel',
    desc: 'Bebas menentukan jalur: akselerasi lurus Tol Jagorawi atau kontur tanjakan dan manuver Baranangsiang.',
  },
  {
    icon: UserCheck,
    title: 'Didampingi Master Inspector',
    desc: 'Insinyur teknis tersertifikasi mendampingi di kabin dengan alat scanner live OBD-2 untuk membaca ECU.',
  },
  {
    icon: ShieldAlert,
    title: 'Zero Obligation Guarantee',
    desc: 'Murni pengujian kualitas teknis kendaraan tanpa tekanan transaksi jual-beli dan tanpa ikatan komitmen.',
  },
];

export const TestDriveProtocolSLA: React.FC = () => {
  return (
    <div className="border border-hairline bg-alabaster p-6 sm:p-7 flex flex-col justify-between space-y-6 select-none shadow-sm">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-hairline">
          <div className="space-y-0.5">
            <div className="font-mono text-[10px] text-forest font-bold uppercase tracking-wider">
              ENTERPRISE DISPATCH SLA
            </div>
            <h4 className="font-heading text-sm font-bold text-charcoal">STANDAR PROTOKOL UJI KENDARA</h4>
          </div>
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* 4 Protocol Points */}
        <div className="space-y-3.5">
          {PROTOCOLS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="bg-canvas border border-hairline p-3 space-y-1">
                <div className="flex items-center gap-2 text-forest">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="font-heading text-xs font-bold text-charcoal">{p.title}</span>
                </div>
                <p className="font-body text-[11px] text-muted leading-relaxed pl-6">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Assurance Card & Hotdesk */}
      <div className="pt-3 border-t border-hairline space-y-3">
        <div className="bg-forest text-white p-3 space-y-1">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-sage-light font-bold uppercase">
            <Award className="h-3.5 w-3.5 text-emerald-400" />
            <span>STANDARISASI SAFETY LABSITE</span>
          </div>
          <p className="font-body text-[11px] text-sage-light/90 leading-tight">
            Setiap unit telah melalui disinfeksi interior, pengecekan tekanan angin ban, dan kalibrasi sistem rem sebelum kunci diserahkan ke tangan Anda.
          </p>
        </div>

        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-muted">Butuh Penjadwalan Khusus?</span>
          <a
            href="tel:+6281234567890"
            className="text-forest font-bold hover:underline flex items-center gap-1"
          >
            <PhoneCall className="h-3 w-3" />
            <span>Hotline 24/7</span>
          </a>
        </div>
      </div>
    </div>
  );
};
