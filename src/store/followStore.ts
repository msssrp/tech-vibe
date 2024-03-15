import { create } from "zustand";

type FollowStore = {
  isFollowingUser: boolean;
  setIsFollowingUser: (value: boolean) => void;
};

export const useFollowStore = create<FollowStore>((set) => ({
  isFollowingUser: false,
  setIsFollowingUser: (value) => set({ isFollowingUser: value }),
}));
