import NpruVerify from "@/components/ui/NpruVerify";
import {
  deleteAdminRole,
  deleteModeratorRole,
  deleteNpruRole,
  getUserRole,
  insertAdminRole,
  insertModeratorRole,
  insertNpruRole,
} from "@/libs/actions/user/user_role";
import { userProps } from "@/types/user/user";
import { Input, Modal, Switch } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { PiNotePencilDuotone } from "react-icons/pi";
type userCardProps = {
  userRole: string;
  user: userProps;
};

type userRole = {
  user_role_name: string;
};

const UserCard: React.FC<userCardProps> = ({ userRole, user }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [userRoles, setUserRoles] = useState<userRole[]>();
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const handleUpdateAdmin = async () => {
    if (
      userRoles &&
      userRoles.some((user) => user.user_role_name === "admin")
    ) {
      await deleteAdminRole(user.user_id);
      notifications.show({
        title: "update status",
        message: `deleted "${user.user_fullname}" on admin role successfully`,
        color: "red",
      });
    } else {
      await insertAdminRole(user.user_id);
      notifications.show({
        title: "update status",
        message: `updated "${user.user_fullname}" to admin role successfully`,
        color: "green",
      });
    }
    setFetchTrigger(!fetchTrigger);
  };
  const handleUpdateModerator = async () => {
    if (
      userRoles &&
      userRoles.some((user) => user.user_role_name === "moderator")
    ) {
      await deleteModeratorRole(user.user_id);
      notifications.show({
        title: "update status",
        message: `deleted "${user.user_fullname}" on moderator role successfully`,
        color: "red",
      });
    } else {
      await insertModeratorRole(user.user_id);
      notifications.show({
        title: "update status",
        message: `updated "${user.user_fullname}" to moderator role successfully`,
        color: "green",
      });
    }
    setFetchTrigger(!fetchTrigger);
  };
  const handleUpdateNpru = async () => {
    if (userRoles && userRoles.some((user) => user.user_role_name === "npru")) {
      await deleteNpruRole(user.user_id);
      notifications.show({
        title: "update status",
        message: `deleted "${user.user_fullname}" on npru role successfully`,
        color: "red",
      });
    } else {
      await insertNpruRole(user.user_id);
      notifications.show({
        title: "update status",
        message: `updated "${user.user_fullname}" to npru role successfully`,
        color: "green",
      });
    }
    setFetchTrigger(!fetchTrigger);
  };
  useEffect(() => {
    const fetchUserRole = async () => {
      const userRole = await getUserRole(user.user_id);
      if (userRole) setUserRoles(userRole);
    };
    fetchUserRole();
  }, [user, fetchTrigger]);

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="uppercase text-xl font-semibold">edit user</div>
          <div className="w-20 h-20">
            <Image
              src={
                user.user_profile
                  ? user.user_profile
                  : "https://cqphjwakpkovcvrouaoz.supabase.co/storage/v1/object/public/Images/Logo/default-user-profile.png"
              }
              alt="TechVibe user"
              height={80}
              width={80}
              className="rounded-full"
            />
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Input.Wrapper label="Username">
              <div className="relative">
                <Input
                  disabled
                  size="xs"
                  value={user.user_fullname}
                  variant="unstyled"
                />
                <div className="absolute right-1.5 top-1.5 cursor-pointer">
                  <PiNotePencilDuotone color="gray" size={20} />
                </div>
              </div>
            </Input.Wrapper>
            <Input.Wrapper label="Email">
              <Input
                disabled
                size="xs"
                value={user.user_email}
                variant="unstyled"
              />
            </Input.Wrapper>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              defaultChecked={
                userRoles &&
                userRoles.some((user) => user.user_role_name === "npru")
              }
              label={"npru"}
              onClick={handleUpdateNpru}
            />
            <Switch
              defaultChecked={
                userRoles &&
                userRoles.some((user) => user.user_role_name === "moderator")
              }
              label={"moderator"}
              onClick={handleUpdateModerator}
            />
            <Switch
              defaultChecked={
                userRoles &&
                userRoles.some((user) => user.user_role_name === "admin")
              }
              label={"admin"}
              onClick={handleUpdateAdmin}
            />
          </div>
          <button className="btn bg-white text-gray-500 w-28" onClick={close}>
            Close
          </button>
        </div>
      </Modal>
      <div
        className="w-96 p-4 mr-5 mb-5 flex space-x-6 items-center bg-white cursor-pointer"
        onClick={open}
      >
        <Image
          src={
            user.user_profile
              ? user.user_profile
              : "https://cqphjwakpkovcvrouaoz.supabase.co/storage/v1/object/public/Images/Logo/default-user-profile.png"
          }
          alt={"TechVibe user"}
          height={70}
          width={70}
          className="rounded-full"
        />
        <div className="flex flex-col space-y-2 items-start">
          <div className="flex items-center space-x-2">
            <h1 className="font-medium">{user.user_fullname}</h1>
            {userRole === "npru" && <NpruVerify />}
          </div>
          <span className="text-base">{user.user_email}</span>
          <h1 className="text-xl font-medium">{userRole}</h1>
        </div>
      </div>
    </>
  );
};

export default UserCard;
