"use client";
import {
  deleteAdminRole,
  deleteModeratorRole,
  deleteNpruRole,
  insertAdminRole,
  insertModeratorRole,
  insertNpruRole,
} from "@/libs/actions/user/user_role";
import { updateFullname } from "@/libs/actions/user/userClient";
import { userRoleProps } from "@/types/user/user_role";
import { Input, Modal, Switch } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import React, { useState } from "react";
import { PiNotePencilDuotone } from "react-icons/pi";
const IMAGE_PATH = process.env.NEXT_PUBLIC_IMAGE_PATH as string;
type userCardProps = {
  userId: string;
  userFullname: string;
  userProfile: string | undefined;
  userEmail: string;
  userRoles: userRoleProps[];
};

const UserInteract: React.FC<userCardProps> = ({
  userId,
  userFullname,
  userProfile,
  userEmail,
  userRoles,
}) => {
  const [userFullName, setUserFullName] = useState(userFullname);
  const [opened, { open, close }] = useDisclosure(false);
  const handleUpdateAdmin = async () => {
    if (
      userRoles &&
      userRoles.some((user) => user.user_role_name === "admin")
    ) {
      await deleteAdminRole(userId);
      notifications.show({
        title: "update status",
        message: `deleted "${userFullname}" on admin role successfully`,
        color: "red",
      });
    } else {
      await insertAdminRole(userId);
      notifications.show({
        title: "update status",
        message: `updated "${userFullname}" to admin role successfully`,
        color: "green",
      });
    }
  };
  const handleUpdateModerator = async () => {
    if (
      userRoles &&
      userRoles.some((user) => user.user_role_name === "moderator")
    ) {
      await deleteModeratorRole(userId);
      notifications.show({
        title: "update status",
        message: `deleted "${userFullname}" on moderator role successfully`,
        color: "red",
      });
    } else {
      await insertModeratorRole(userId);
      notifications.show({
        title: "update status",
        message: `updated "${userFullname}" to moderator role successfully`,
        color: "green",
      });
    }
  };
  const handleUpdateNpru = async () => {
    if (userRoles && userRoles.some((user) => user.user_role_name === "npru")) {
      await deleteNpruRole(userId);
      notifications.show({
        title: "update status",
        message: `deleted "${userFullname}" on npru role successfully`,
        color: "red",
      });
    } else {
      await insertNpruRole(userId);
      notifications.show({
        title: "update status",
        message: `updated "${userFullname}" to npru role successfully`,
        color: "green",
      });
    }
  };
  const handleUpdateUserName = async () => {
    await updateFullname(userFullName, userId);
    close();
    return notifications.show({
      title: "update status",
      message: `updated "${userFullname}" to ${userFullName} successfully`,
      color: "green",
    });
  };
  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="uppercase text-xl font-semibold">edit user</div>
          <div className="w-20 h-20">
            <Image
              src={
                userProfile
                  ? userProfile
                  : `${IMAGE_PATH}Logo/default_user_profile`
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
                  size="xs"
                  value={userFullName}
                  onChange={(e) => setUserFullName(e.target.value)}
                  variant="unstyled"
                />
                <div className="absolute right-1.5 top-1.5 cursor-pointer">
                  <PiNotePencilDuotone
                    color="gray"
                    size={20}
                    onClick={handleUpdateUserName}
                  />
                </div>
              </div>
            </Input.Wrapper>
            <Input.Wrapper label="Email">
              <Input disabled size="xs" value={userEmail} variant="unstyled" />
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
      <button className="btn btn-sm bg-orange-500 text-white" onClick={open}>
        Manage
      </button>
    </>
  );
};

export default UserInteract;
