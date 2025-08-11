import { create } from 'zustand';

// import { persist } from 'zustand/middleware';

interface State {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useAppStore = create<State>(
  // persist(
  (set, get) => ({
    sidebarOpen: false,
    toggleSidebar: () => {
      set({ sidebarOpen: !get().sidebarOpen });
    },
  }),
  // {
  //   name: 'app-storage',
  // },
  // ),
);
