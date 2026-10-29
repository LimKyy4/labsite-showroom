import { useShowroomStore } from '../store/useShowroomStore';
import { ToastMessage } from '../types/showroom';

export function useShowroomToast() {
  const addToast = useShowroomStore((state) => state.addToast);
  const removeToast = useShowroomStore((state) => state.removeToast);
  const toasts = useShowroomStore((state) => state.toasts);

  const showToast = (
    title: string,
    description: string,
    type: ToastMessage['type'] = 'success'
  ) => {
    addToast(title, description, type);
  };

  return { showToast, removeToast, toasts };
}
