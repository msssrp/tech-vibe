import { CounterActions, CounterState } from "@/types/store/counter-type";
import { create } from "zustand";

export const useCounterStore = create<CounterState & CounterActions>((set) => ({
  count: 0,
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
  decreaseCount: () => set((state) => ({ count: state.count - 1 })),
}));
