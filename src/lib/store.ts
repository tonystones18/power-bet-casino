// Store for global casino state
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  bonusBalance?: number;
  vipLevel: string;
  loyaltyPoints?: number;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
}

interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  timestamp: number;
}

interface CasinoStore {
  // Auth
  user: User | null;
  isLoggedIn: boolean;
  showLoginModal: boolean;
  showRegisterModal: boolean;

  // UI
  sidebarOpen: boolean;
  notifications: Notification[];
  activeCategory: string;
  searchQuery: string;

  // Actions
  login: (user: User) => void;
  logout: () => void;
  updateBalance: (amount: number) => void;
  setShowLoginModal: (show: boolean) => void;
  setShowRegisterModal: (show: boolean) => void;
  toggleSidebar: () => void;
  addNotification: (
    message: string,
    type: Notification["type"]
  ) => void;
  removeNotification: (id: string) => void;
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useCasinoStore = create<CasinoStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      showLoginModal: false,
      showRegisterModal: false,
      sidebarOpen: false,
      notifications: [],
      activeCategory: "all",
      searchQuery: "",

      login: (user) => set({ user, isLoggedIn: true }),
      logout: () =>
        set({ user: null, isLoggedIn: false }),
      updateBalance: (newBalance) => {
        const user = get().user;
        if (user) {
          set({ user: { ...user, balance: newBalance } });
        }
      },
      setShowLoginModal: (show) =>
        set({ showLoginModal: show, showRegisterModal: false }),
      setShowRegisterModal: (show) =>
        set({ showRegisterModal: show, showLoginModal: false }),
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      addNotification: (message, type) => {
        const id = Math.random().toString(36).slice(2);
        set((state) => ({
          notifications: [
            ...state.notifications,
            { id, message, type, timestamp: Date.now() },
          ],
        }));
        setTimeout(() => get().removeNotification(id), 4000);
      },
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      setActiveCategory: (category) => set({ activeCategory: category }),
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: "powerbet-store",
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
