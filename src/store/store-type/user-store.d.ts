import { userProps } from "../../types/user/user";

export type userAction = {
  updateUserState: (userProps: Partial<userProps>) => void;
  updateLoading: (status: boolean) => void;
};
