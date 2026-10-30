import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarClock, X, Check } from 'lucide-react';
import { useShowroomStore } from '../../store/useShowroomStore';
import { Button } from '../ui/button';
import { Dropdown, DropdownOption } from '../ui/dropdown';

const TIME_OPTIONS: DropdownOption[] = [
  { value: '09:00', label: '09:00 WIB (Pagi)' },
  { value: '11:00', label: '11:00 WIB (Siang)' },
  { value: '14:00', label: '14:00 WIB (Siang)' },
  { value: '16:00', label: '16:00 WIB (Sore)' },
];

export const TestDriveBookingModal: React.FC = () => {
  const { isBookingModalOpen, bookingCarTitle, setBookingModalOpen, addToast } = useShowroomStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [car, setCar] = useState(bookingCarTitle || 'Toyota Fortuner VRZ 2021');
  const [date, setDate] = useState('2026-10-30');
  const [time, setTime] = useState('10:00');

  if (!isBookingModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Halo admin labsite showroom Bogor, reservasi VIP Test Drive:\n- Nama: ${name}\n- Kontak: ${phone}\n- Unit: ${car}\n- Tanggal: ${date} (${time} WIB)`;
    addToast('Jadwal Reservasi Dibuat', `Pengajuan test drive untuk ${car} dialihkan ke WhatsApp sales.`);
    setBookingModalOpen(false);
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-charcoal/70" onClick={() => setBookingModalOpen(false)} />
        <motion.div
          initial={{ y: '100%', opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          drag="y"
          dragConstraints={{ top: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => { if (info.offset.y > 100) setBookingModalOpen(false); }}
          style={{ paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
          className="relative z-10 w-full max-w-md border-t sm:border border-hairline bg-canvas p-5 sm:p-7 shadow-2xl space-y-4 rounded-t-2xl sm:rounded-none max-h-[92vh] overflow-y-auto"
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-1.5 sm:hidden" />
          <div className="flex items-start justify-between pb-2.5 border-b border-hairline">
            <div>
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-forest" />
                <h3 className="font-heading text-lg font-bold text-charcoal">Reservasi Test Drive</h3>
              </div>
              <p className="font-body text-xs text-muted mt-0.5">Showroom Baranangsiang Bogor</p>
            </div>
            <button type="button" onClick={() => setBookingModalOpen(false)} className="p-1.5 border border-hairline bg-alabaster rounded-full text-charcoal active:scale-90">
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 font-body text-xs">
            <div>
              <label className="font-mono text-[10px] uppercase text-muted block mb-1">Nama Lengkap</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Contoh: Budi Santoso" className="w-full p-2.5 border border-hairline bg-alabaster focus:outline-none focus:border-forest text-charcoal rounded-lg" />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase text-muted block mb-1">Nomor WhatsApp</label>
              <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0812xxxxxxx" className="w-full p-2.5 border border-hairline bg-alabaster focus:outline-none focus:border-forest text-charcoal font-mono rounded-lg" />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase text-muted block mb-1">Unit Kendaraan Pilihan</label>
              <input type="text" required value={car} onChange={(e) => setCar(e.target.value)} className="w-full p-2.5 border border-hairline bg-alabaster focus:outline-none focus:border-forest text-charcoal rounded-lg" />
            </div>
            <div className="grid grid-cols-2 gap-3 items-end">
              <div>
                <label className="font-mono text-[10px] uppercase text-muted block mb-1">Tanggal</label>
                <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2.5 border border-hairline bg-alabaster focus:outline-none focus:border-forest text-charcoal font-mono rounded-lg" />
              </div>
              <Dropdown label="Pukul (WIB)" options={TIME_OPTIONS} value={time} onChange={(val) => setTime(String(val))} />
            </div>
            <div className="pt-2">
              <Button type="submit" variant="primary" size="md" fullWidth className="py-3">
                <Check className="h-4 w-4" /><span>Konfirmasi ke WhatsApp Sales</span>
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
