import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Campaign } from "@/lib/type";

interface InitialState {
  email: string | null;
  projectName: string | null;
  projectId: string | null;
  campaign: Campaign | null;
  setEmail: (email: string | null) => void;
  setProjectName: (name: string | null) => void;
  setProjectId: (id: string | null) => void;
  setCampaign: (campaign: Campaign | null) => void;
  clearEmail: () => void;
}

export const useEmailStore = create<InitialState>()(
  persist(
    (set, get) => ({
      email: null,
      projectName: null,
      projectId: null,
      campaign: null,
      setEmail: (email) => set(() => ({ email })),
      setProjectName: (projectName) => set(() => ({ projectName })),
      setProjectId: (projectId) => set(() => ({ projectId })),
      setCampaign: (campaign) => set(() => ({ campaign })),
      clearEmail: () =>
        set(() => ({
          email: null,
          projectName: null,
          projectId: null,
        })),
    }),
    {
      name: "email-storage",
    },
  ),
);
