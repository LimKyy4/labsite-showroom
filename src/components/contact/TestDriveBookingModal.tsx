import React, { useState } from 'react';
import { CalendarClock, X, Check } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';
import { Button } from '../ui/button';
import { Dropdown, DropdownOption } from '../ui/dropdown';

export const TestDriveBookingModal: React.FC = () => {
  const { isBookingModalOpen, bookingCarTitle, setBookingModalOpen, addToast } = useShowroomStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [car, setCar] = useState(bookingCarTitle || 'Toyota Fortuner VRZ 2021');
  const [date, setDate] = useState('2026-10-30');
  const [time, setTime] = useState('10:00');

  const timeOptions: DropdownOption[] = [
    { value: '09:00', label: '09:00 WIB (Pagi)' },
    { value: '11:00', label: '11:00 WIB (Siang)' },
    { value: '14:00', label: '14:00 WIB (Siang)' },
    { value: '16:00', label: '16:00 WIB (Sore)' },
  ];

  if (!isBookingModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Halo admin labsite showroom Bogor, saya ingin reservasi jadwal Test Drive:\n- Nama: ${name}\n- No. Kontak: ${phone}\n- Unit Pilihan: ${car}\n- Rencana Tanggal: ${date}\n- Jam: ${time} WIB\nMohon siapkan unit dan teknisi pendamping. Terima kasih.`;

    addToast('Jadwal Reservasi Dibuat', `Pengajuan test drive untuk ${car} dialihkan ke WhatsApp sales.`);
    setBookingModalOpen(false);
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-charcoal/60 backdrop-blur-none"
        onClick={() => setBookingModalOpen(false)}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md border border-hairline bg-canvas p-6 sm:p-7 shadow-2xl space-y-4">
        <div className="flex items-start justify-between pb-3 border-b border-hairline">
          <div>
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-forest" />
              <h3 className="font-heading text-lg font-bold text-charcoal">
                Reservasi Kunjungan & Test Drive
              </h3>
            </div>
            <p className="font-body text-xs text-muted mt-0.5">
              Showroom labsite.id Baranangsiang Kota Bogor
            </p>
          </div>
          <button
            type="button"
            onClick={() => setBookingModalOpen(false)}
            className="p-1 border border-hairline hover:bg-alabaster"
          >
            <X className="h-4 w-4 text-charcoal" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 font-body text-xs">
          <div>
            <label className="font-mono uppercase tracking-wider text-muted block mb-1">Nama Lengkap</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Budi Santoso"
              className="w-full p-2.5 border border-hairline bg-alabaster focus:outline-none focus:border-forest text-charcoal"
            />
          </div>

          <div>
            <label className="font-mono uppercase tracking-wider text-muted block mb-1">Nomor WhatsApp</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0812xxxxxxx"
              className="w-full p-2.5 border border-hairline bg-alabaster focus:outline-none focus:border-forest text-charcoal font-mono"
            />
          </div>

          <div>
            <label className="font-mono uppercase tracking-wider text-muted block mb-1">Unit Kendaraan Pilihan</label>
            <input
              type="text"
              required
              value={car}
              onChange={(e) => setCar(e.target.value)}
              placeholder="Nama mobil yang ingin diuji..."
              className="w-full p-2.5 border border-hairline bg-alabaster focus:outline-none focus:border-forest text-charcoal"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 items-end">
            <div>
              <label className="font-mono uppercase tracking-wider text-muted block mb-1.5">Tanggal Kunjungan</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 border border-hairline bg-alabaster focus:outline-none focus:border-forest text-charcoal font-mono"
              />
            </div>
            <div>
              <Dropdown
                label="Pukul (WIB)"
                options={timeOptions}
                value={time}
                onChange={(val) => setTime(String(val))}
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" fullWidth>
              <Check className="h-4 w-4" />
              <span>Konfirmasi & Kirim ke WhatsApp Sales</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
