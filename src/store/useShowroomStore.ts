import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CarUnit, CarStatus, ActiveTab, ToastMessage } from '../types/showroom';
import { INITIAL_CARS } from '../data/mockCars';

interface ShowroomState {
  cars: CarUnit[];
  selectedCarId: string | null;
  activeTab: ActiveTab;
  toasts: ToastMessage[];
  isBookingModalOpen: boolean;
  bookingCarTitle: string;
  quickPeekCar: CarUnit | null;
  filterBudget: number;
  filterTransmission: string;
  setSelectedCarId: (id: string | null) => void;
  setActiveTab: (tab: ActiveTab) => void;
  setCarStatus: (id: string, status: CarStatus) => void;
  resetInventory: () => void;
  addToast: (title: string, description: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  setBookingModalOpen: (open: boolean, carTitle?: string) => void;
  setQuickPeekCar: (car: CarUnit | null) => void;
  setFilterBudget: (b: number) => void;
  setFilterTransmission: (t: string) => void;
}

export const useShowroomStore = create<ShowroomState>()(
  persist(
    (set) => ({
      cars: INITIAL_CARS,
      selectedCarId: null,
      activeTab: 'home',
      toasts: [],
      isBookingModalOpen: false,
      bookingCarTitle: '',
      quickPeekCar: null,
      filterBudget: 800000000,
      filterTransmission: 'Semua',

      setSelectedCarId: (id) => set({ selectedCarId: id }),
      setActiveTab: (tab) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        set({ activeTab: tab });
      },
      setCarStatus: (id, status) =>
        set((state) => ({
          cars: state.cars.map((c) => (c.id === id ? { ...c, status } : c)),
        })),
      resetInventory: () => set(() => ({ cars: INITIAL_CARS })),
      addToast: (title, description, type = 'success') =>
        set((state) => {
          const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
          return { toasts: [...state.toasts, { id, title, description, type }] };
        }),
      removeToast: (id) =>
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
      setBookingModalOpen: (open, carTitle = '') =>
        set({ isBookingModalOpen: open, bookingCarTitle: carTitle }),
      setQuickPeekCar: (car) => set({ quickPeekCar: car }),
      setFilterBudget: (b) => set({ filterBudget: b }),
      setFilterTransmission: (t) => set({ filterTransmission: t }),
    }),
    {
      name: 'labsite_showroom_inventory',
      version: 3,
      migrate: (persisted: any) => {
        if (!persisted || !Array.isArray(persisted.cars)) return { cars: INITIAL_CARS };
        return persisted;
      },
      merge: (persistedState: any, currentState: ShowroomState) => {
        const persistedCars = (persistedState as { cars?: CarUnit[] })?.cars;
        if (!Array.isArray(persistedCars) || persistedCars.length === 0) {
          return { ...currentState, cars: INITIAL_CARS };
        }
        const mergedCars = INITIAL_CARS.map((initialCar) => {
          const saved = persistedCars.find((p) => p.id === initialCar.id);
          if (!saved) return initialCar;
          return {
            ...initialCar,
            status: saved.status || initialCar.status,
            inspectionBreakdown: {
              ...initialCar.inspectionBreakdown,
              ...(saved.inspectionBreakdown || {}),
            },
          };
        });
        return { ...currentState, cars: mergedCars };
      },
      partialize: (state) => ({ cars: state.cars }),
    }
  )
);
