import React, { useEffect } from 'react';
import { useShowroomStore } from '../../store/useShowroomStore';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toasts, removeToast } = useShowroomStore();

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      removeToast(toasts[0].id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toasts, removeToast]);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => {
        const icon =
          toast.type === 'warning' ? (
            <AlertTriangle className="h-5 w-5 text-[#B45309] shrink-0" />
          ) : toast.type === 'info' ? (
            <Info className="h-5 w-5 text-forest shrink-0" />
          ) : (
            <CheckCircle2 className="h-5 w-5 text-forest shrink-0" />
          );

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 border border-hairline bg-canvas p-4 shadow-xl transition-all duration-200"
          >
            {icon}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-charcoal">{toast.title}</p>
              <p className="text-xs text-muted mt-0.5 leading-relaxed">{toast.description}</p>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-muted hover:text-charcoal p-1 border border-transparent hover:border-hairline"
              aria-label="Tutup notifikasi"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
