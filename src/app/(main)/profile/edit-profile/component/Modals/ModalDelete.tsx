import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { deleteUser } from "@/libs/actions/user/userClient";
import { updateArticleStatusOnDeleteUser } from "@/libs/actions/article/article";
import { notifications } from "@mantine/notifications";
import { SignOut } from "@/libs/actions/user/auth/auth";
import { useRouter } from "next/navigation";

type ModalDeleteProps = {
  userId: string;
};

const ModalDelete: React.FC<ModalDeleteProps> = ({ userId }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [confirmDelete, setConfirmDelete] = useState("");
  const router = useRouter();
  const handleConfirmDelete = async () => {
    close();
    await deleteUser(userId);
    await updateArticleStatusOnDeleteUser(userId);
    await SignOut();
    return notifications.show({
      title: "Account deleting...",
      message: "Your account will be delete soon",
      color: "red",
      autoClose: 5000,
      onClose: () => {
        router.push("/");
      },
    });
  };
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <div className="px-7 space-y-5 py-3">
          <h3 className="font-semibold text-lg text-center text-red uppercase">
            Delete account
          </h3>
          <p className="text-xs text-[#606060] font-medium text-wrap text-center ">
            We’re sorry to see you go. Once your account is deleted, all of your
            content still exists, including your profile, stories, publications,
            notes, and responses. Deleting your account will not delete any
            articles on the platform.
          </p>
          <p className="text-xs text-[#606060] font-medium pt-6">
            To confirm deletion, type “delete” below :
          </p>
          <label className="rounded-none border-b flex items-center">
            <input
              type="text"
              className="text-sm grow focus:outline-none "
              value={confirmDelete}
              onChange={(e) => setConfirmDelete(e.target.value)}
            />
          </label>
          <div className="modal-action flex justify-center items-center">
            <button
              onClick={close}
              className="btn btn-outline border-[#F1F1F1] w-28 hover:text-current hover:bg-inherit hover:border-[#F1F1F1]"
            >
              Close
            </button>
            <button
              className={`btn rounded-lg text-white w-28 border-none bg-red hover:bg-red hover:border-none`}
              disabled={confirmDelete === "delete" ? false : true}
              onClick={handleConfirmDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
      <button onClick={open} className="text-[#952124] font-medium">
        Delete account
      </button>
    </div>
  );
};

export default ModalDelete;
