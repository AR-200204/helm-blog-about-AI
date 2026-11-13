import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Step } from "@/lib/blocks";

export type Pace = "child" | "standard";

export type Concern = "dependence" | "truth" | "work" | "privacy" | "children";

export type WebDraft = { html: string; css: string };

type State = {
  hydrated: boolean;
  pace: Pace;
  setPace: (pace: Pace) => void;
  completed: Record<string, number>;
  xp: number;
  streak: number;
  lastDay: string | null;
  markComplete: (id: string) => void;
  codeDrafts: Record<string, string>;
  webDrafts: Record<string, WebDraft>;
  blockDrafts: Record<string, Step[]>;
  setCodeDraft: (id: string, code: string) => void;
  setWebDraft: (id: string, draft: WebDraft) => void;
  setBlockDraft: (id: string, steps: Step[]) => void;
  clearDraft: (id: string) => void;
  reads: Record<string, number>;
  markRead: (slug: string) => void;
  weights: Record<Concern, number>;
  setWeight: (key: Concern, value: number) => void;
};

function dayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function prevDay(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  const date = new Date(y ?? 2026, (m ?? 1) - 1, d ?? 1);
  date.setDate(date.getDate() - 1);
  return dayKey(date);
}

export const useProgress = create<State>()(
  persist(
    (set) => ({
      hydrated: false,
      pace: "standard",
      setPace: (pace) => set({ pace }),
      completed: {},
      xp: 0,
      streak: 0,
      lastDay: null,
      codeDrafts: {},
      webDrafts: {},
      blockDrafts: {},
      markComplete: (id) =>
        set((state) => {
          if (state.completed[id]) return state;
          const today = dayKey();
          let streak = 1;
          if (state.lastDay === today) streak = Math.max(1, state.streak);
          else if (state.lastDay && state.lastDay === prevDay(today)) streak = state.streak + 1;
          return {
            completed: { ...state.completed, [id]: Date.now() },
            xp: state.xp + 15,
            streak,
            lastDay: today,
          };
        }),
      setCodeDraft: (id, code) =>
        set((state) => ({ codeDrafts: { ...state.codeDrafts, [id]: code } })),
      setWebDraft: (id, draft) =>
        set((state) => ({ webDrafts: { ...state.webDrafts, [id]: draft } })),
      setBlockDraft: (id, steps) =>
        set((state) => ({ blockDrafts: { ...state.blockDrafts, [id]: steps } })),
      clearDraft: (id) =>
        set((state) => {
          const codeDrafts = { ...state.codeDrafts };
          const webDrafts = { ...state.webDrafts };
          const blockDrafts = { ...state.blockDrafts };
          delete codeDrafts[id];
          delete webDrafts[id];
          delete blockDrafts[id];
          return { codeDrafts, webDrafts, blockDrafts };
        }),
      reads: {},
      markRead: (slug) =>
        set((state) =>
          state.reads[slug] ? state : { reads: { ...state.reads, [slug]: Date.now() } },
        ),
      weights: { dependence: 60, truth: 60, work: 60, privacy: 60, children: 60 },
      setWeight: (key, value) =>
        set((state) => ({ weights: { ...state.weights, [key]: value } })),
    }),
    {
      name: "primer-progress",
      skipHydration: true,
      partialize: (state) => ({
        pace: state.pace,
        completed: state.completed,
        xp: state.xp,
        streak: state.streak,
        lastDay: state.lastDay,
        codeDrafts: state.codeDrafts,
        webDrafts: state.webDrafts,
        blockDrafts: state.blockDrafts,
        reads: state.reads,
        weights: state.weights,
      }),
    },
  ),
);

export function useHydrated() {
  return useProgress((state) => state.hydrated);
}
