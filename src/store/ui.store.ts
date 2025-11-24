import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ModalState {
  isOpen: boolean;
  modalId: string | null;
}

interface DrawerState {
  isOpen: boolean;
  drawerId: string | null;
}

interface UIState {
  modals: Record<string, ModalState>;
  drawers: Record<string, DrawerState>;
  filters: Record<string, any>;
  sidebarOpen: boolean;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  openDrawer: (drawerId: string) => void;
  closeDrawer: (drawerId: string) => void;
  setFilters: (filters: Record<string, any>) => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      modals: {},
      drawers: {},
      filters: {},
      sidebarOpen: false,
      openModal: (modalId) =>
        set((state) => ({
          modals: {
            ...state.modals,
            [modalId]: { isOpen: true, modalId },
          },
        })),
      closeModal: (modalId) =>
        set((state) => ({
          modals: {
            ...state.modals,
            [modalId]: { isOpen: false, modalId: null },
          },
        })),
      openDrawer: (drawerId) =>
        set((state) => ({
          drawers: {
            ...state.drawers,
            [drawerId]: { isOpen: true, drawerId },
          },
        })),
      closeDrawer: (drawerId) =>
        set((state) => ({
          drawers: {
            ...state.drawers,
            [drawerId]: { isOpen: false, drawerId: null },
          },
        })),
      setFilters: (filters) => set({ filters }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        filters: state.filters,
        sidebarOpen: state.sidebarOpen,
      }),
    },
  ),
);

