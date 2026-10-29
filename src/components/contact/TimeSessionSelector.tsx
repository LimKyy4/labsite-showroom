import React from 'react';

export interface TimeSession {
  id: string;
  time: string;
  label: string;
  highlight: string;
}

export const TIME_SESSIONS: TimeSession[] = [
  { id: 'pagi', time: '09.00 - 11.30 WIB', label: 'Sesi Pagi', highlight: 'Lalu Lintas Lengang' },
  { id: 'siang', time: '13.00 - 15.00 WIB', label: 'Sesi Siang', highlight: 'Uji AC & Suhu Mesin' },
  { id: 'sore', time: '15.30 - 17.30 WIB', label: 'Sesi Sore', highlight: 'Uji Lampu & Kepadatan' },
];

interface TimeSessionSelectorProps {
  selectedSession: string;
  onSelectSession: (id: string) => void;
}

export const TimeSessionSelector: React.FC<TimeSessionSelectorProps> = ({
  selectedSession,
  onSelectSession,
}) => {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-wider text-muted block mb-1.5">
        Pilihan Sesi Waktu Test Drive *
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {TIME_SESSIONS.map((sess) => {
          const isSelected = selectedSession === sess.id;
          return (
            <button
              key={sess.id}
              type="button"
              onClick={() => onSelectSession(sess.id)}
              className={`p-2.5 text-left border transition-all ${
                isSelected
                  ? 'border-forest bg-forest text-white shadow-sm'
                  : 'border-hairline bg-alabaster text-charcoal hover:border-forest'
              }`}
            >
              <div className="font-heading text-xs font-bold">{sess.label}</div>
              <div className={`font-mono text-[10px] mt-0.5 ${isSelected ? 'text-sage-light' : 'text-muted'}`}>
                {sess.time}
              </div>
              <div
                className={`text-[9px] mt-1 italic ${
                  isSelected ? 'text-emerald-300' : 'text-forest font-semibold'
                }`}
              >
                {sess.highlight}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
