import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserRole =
  | "admin"
  | "pharmacist"
  | "billing"
  | "distributor"
  | "manager"
  | "guest";

type Theme = "light" | "dark" | "system";

interface AppState {
  userRole: UserRole;
  theme: Theme;
  sidebarCollapsed: boolean;
  setUserRole: (role: UserRole) => void;
  setTheme: (theme: Theme) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      userRole: "guest",
      theme: "light",
      sidebarCollapsed: false,

      setUserRole: (role) => set({ userRole: role }),
      setTheme: (theme) => set({ theme }),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    }),
    {
      name: "medlink-app-store",
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    },
  ),
);
