import { userAction } from "@/types/store/user-store";
import { userProps } from "@/types/user/user";
import { create } from "zustand";

export const useUserStore = create<userProps & userAction>((set) => ({
  firstName: "first",
  role: "first",
  changeName: (newName) => set(() => ({ firstName: newName })),
  changeRole: (newRole) => set(() => ({ role: newRole })),
}));
