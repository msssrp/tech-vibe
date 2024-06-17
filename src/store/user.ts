import { Loading, userProps } from "@/types/user/user";
import { create } from "zustand";
import { userAction } from "./store-type/user-store";

const initialState: userProps = {
  user_id: "",
  user_email: "",
  user_fullname: "",
  user_provider: "",
  user_profile: "",
  user_verify: false,
  created_at: "",
  updated_at: "",
};

export const useUserStore = create<userProps & Loading & userAction>((set) => ({
  ...initialState,
  isLoading: true,
  updateLoading: (status) =>
    set((state) => ({ isLoading: (state.isLoading = status) })),
  updateUserState: (updateUser) =>
    set((state) => ({ ...state, ...updateUser })),
}));
