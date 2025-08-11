import { Tier, User } from "@/lib/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  userTier: Tier | null;
  token: string | null;
  refreshToken: string | null;
  selectedTier: Tier | null;
  setAuth: (auth: any) => void;
  setUser: (user: Partial<User>) => void;
  setUserTier: (tier: Partial<Tier>) => void;
  setAccessToken: (accessToken: string | null) => void;
  setSelectedTier: (tier: Tier | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      userTier: null,
      token: null,
      refreshToken: null,
      selectedTier: null,
      setSelectedTier: (selectedTier) => set({ selectedTier }),
      setAccessToken: (token) => set(() => ({ token })),
      setUser: (user) =>
        set({
          user: { ...get().user, ...user } as User,
        }),
      setUserTier: (userTier) =>
        set({
          userTier: { ...get().userTier, ...userTier } as Tier,
        }),
      setAuth: (auth) =>
        set({
          user: auth.user,
          token: auth.token,
          refreshToken: auth.refreshToken,
        }),
      clearAuth: () =>
        set({
          user: null,
          token: null,
          refreshToken: null,
        }),
    }),
    {
      name: "gluon-auth-storage",
    },
  ),
);
