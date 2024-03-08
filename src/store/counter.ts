import { create } from "zustand";
import { CounterActions, CounterState } from "./store-type/counter-type";

export const useCounterStore = create<CounterState & CounterActions>((set) => ({
  count: 0,
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
  decreaseCount: () => set((state) => ({ count: state.count - 1 })),
}));
