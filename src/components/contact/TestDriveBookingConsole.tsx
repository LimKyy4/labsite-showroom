import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';
import { useShowroomToast } from '../../hooks/useShowroomToast';
import { TimeSessionSelector, TIME_SESSIONS } from './TimeSessionSelector';

export const TestDriveBookingConsole: React.FC = () => {
  const cars = useShowroomStore((state) => state.cars);
  const { showToast } = useShowroomToast();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCarId, setSelectedCarId] = useState(cars[0]?.id || '');
  const [selectedSession, setSelectedSession] = useState(TIME_SESSIONS[0].id);
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });

  const isPhoneValid = /^(\+62|62|08)[0-9]{8,12}$/.test(phone.trim());
  const isNameValid = name.trim().length >= 3;
  const isFormValid = isNameValid && isPhoneValid;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const chosenCar = cars.find((c) => c.id === selectedCarId) || cars[0];
    const sessionObj = TIME_SESSIONS.find((s) => s.id === selectedSession) || TIME_SESSIONS[0];
    const dateCode = date.replace(/-/g, '');
    const randCode = Math.floor(1000 + Math.random() * 9000);
    const regCode = `BOOKING-TD/BGR-${dateCode}-${randCode}`;

    const text = `Halo Concierge Showroom labsite Bogor,\n\nSaya ingin konfirmasi jadwal *VIP Test Drive*:\n- *Kode Registrasi:* ${regCode}\n- *Nama:* ${name.trim()}\n- *WhatsApp:* ${phone.trim()}\n- *Unit Armada:* ${chosenCar ? `${chosenCar.title} (${chosenCar.year})` : 'Unit Showroom'}\n- *Tanggal:* ${date}\n- *Sesi Waktu:* ${sessionObj.time} (${sessionObj.label})\n\nMohon siapkan unit steril dan master teknisi inspeksi. Terima kasih.`;

    showToast('Reservasi Terverifikasi', `Kode Tiket: ${regCode} dialihkan ke Concierge.`);
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <form onSubmit={handleBooking} className="border border-hairline bg-canvas p-6 sm:p-7 space-y-5 select-none shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-hairline">
        <div className="space-y-0.5">
          <div className="font-mono text-[10px] text-forest font-bold uppercase tracking-wider">DISPATCH TERMINAL</div>
          <h4 className="font-heading text-sm font-bold text-charcoal">RESERVASI UJI KENDARA VIP</h4>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-forest bg-sage-light px-2 py-0.5 border border-sage-border font-bold">
          <ShieldCheck className="h-3 w-3" />
          <span>GARANSI UNIT STERIL</span>
        </div>
      </div>

      <div className="space-y-4 text-xs font-body">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-muted block mb-1">
              Nama Lengkap Tamu *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Hendra Kusuma"
              className="w-full p-2 border border-hairline bg-alabaster focus:outline-none focus:border-forest text-charcoal text-xs"
            />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-muted block mb-1">
              WhatsApp Aktif *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0812xxxxxxxx"
              className="w-full p-2 border border-hairline bg-alabaster focus:outline-none focus:border-forest text-charcoal font-mono text-xs"
            />
          </div>
        </div>

        <div>
          <label className="font-mono text-[10px] uppercase tracking-wider text-muted block mb-1">
            Pilih Unit Armada Showroom *
          </label>
          <select
            value={selectedCarId}
            onChange={(e) => setSelectedCarId(e.target.value)}
            className="w-full p-2 border border-hairline bg-alabaster focus:outline-none focus:border-forest text-charcoal text-xs font-mono font-medium"
          >
            {cars.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.year}) • {c.transmission} • [{c.status}]
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-mono text-[10px] uppercase tracking-wider text-muted block mb-1">
            Rencana Tanggal Kunjungan *
          </label>
          <input
            type="date"
            required
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-hairline bg-alabaster focus:outline-none focus:border-forest text-charcoal font-mono text-xs"
          />
        </div>

        <TimeSessionSelector selectedSession={selectedSession} onSelectSession={setSelectedSession} />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-3 px-4 font-mono text-xs font-bold border transition-colors flex items-center justify-center gap-2 ${
            isFormValid
              ? 'bg-forest text-white hover:bg-forest-light border-forest shadow-sm'
              : 'bg-alabaster text-muted border-hairline cursor-not-allowed'
          }`}
        >
          {isFormValid ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <AlertCircle className="h-4 w-4" />}
          <span>{isFormValid ? 'Konfirmasi Tiket VIP Test Drive (WhatsApp)' : 'Lengkapi Nama & No. WhatsApp Valid'}</span>
          <Send className="h-3.5 w-3.5 ml-1" />
        </button>
      </div>
    </form>
  );
};
