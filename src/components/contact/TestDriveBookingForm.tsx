import React from 'react';
import { TestDriveBookingConsole } from './TestDriveBookingConsole';
import { TestDriveProtocolSLA } from './TestDriveProtocolSLA';
import { CarFront } from 'lucide-react';

export const TestDriveBookingForm: React.FC = () => {
  return (
    <section
      aria-label="Terminal Reservasi Uji Kendara VIP"
      className="bg-canvas border-b border-hairline py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-alabaster border border-hairline text-forest font-mono text-xs font-bold uppercase tracking-wider">
              <CarFront className="h-3.5 w-3.5" />
              <span>ZONA 04 • VIP TEST DRIVE DISPATCH TERMINAL</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
              RESERVASI UJI KENDARA PROTOKOL VIP.
            </h2>
            <p className="font-body text-sm text-muted max-w-2xl">
              Pilih unit mobil impian dan jadwal kunjungan Anda. Fasilitas car-lift mandiri, scanner OBD-2 live, dan bensin 100% ditanggung showroom tanpa komitmen jual-beli.
            </p>
          </div>
        </div>

        {/* 12-Column Balanced Dispatch Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7">
            <TestDriveBookingConsole />
          </div>
          <div className="lg:col-span-5 flex flex-col">
            <TestDriveProtocolSLA />
          </div>
        </div>
      </div>
    </section>
  );
};
