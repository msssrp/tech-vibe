import {
  getAdminCount,
  getModeratorCount,
  getUsersCount,
} from "@/libs/actions/user/user_role";
import { createContext, useEffect, useState } from "react";

export const AdminUserContext = createContext<{
  userCount: number | null | undefined;
  moderatorCount: number | null | undefined;
  adminCount: number | null | undefined;
}>({
  userCount: 0,
  moderatorCount: 0,
  adminCount: 0,
});

export const AdminUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userCount, setUserCount] = useState<number | null | undefined>();
  const [moderatorCount, setModeratorCount] = useState<
    number | null | undefined
  >();
  const [adminCount, setAdminCount] = useState<number | null | undefined>();
  useEffect(() => {
    const fetCounts = async () => {
      const userRoleCount = await getUsersCount();
      const userModRoleCount = await getModeratorCount();
      const userAdminRoleCount = await getAdminCount();
      if (userRoleCount !== undefined) setUserCount(userRoleCount ?? 0);
      if (userModRoleCount !== undefined)
        setModeratorCount(userModRoleCount ?? 0);
      if (userAdminRoleCount !== undefined)
        setAdminCount(userAdminRoleCount ?? 0);
    };
    fetCounts();
  }, []);
  return (
    <AdminUserContext.Provider
      value={{
        userCount: userCount,
        moderatorCount: moderatorCount,
        adminCount: adminCount,
      }}
    >
      {children}
    </AdminUserContext.Provider>
  );
};
