import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

const ModalDelete = () => {
  const [opened, { open, close }] = useDisclosure(false);
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
        <div className="px-7 space-y-5">
          <h3 className="font-semibold text-lg text-center text-red uppercase">
            Delete account
          </h3>
          <p className="text-xs text-[#606060] font-medium text-wrap text-center ">
            We’re sorry to see you go. Once your account is deleted, all of your
            content will be permanently gone, including your profile, stories,
            publications, notes, and responses. Deleting your Medium account
            will not delete any Stripe account you have connected to your Medium
            account.
          </p>
          <p className="text-xs text-[#606060] font-medium pt-6">
            To confirm deletion, type “delete” below :
          </p>
          <label className="rounded-none border-b flex items-center">
            <input
              type="text"
              className="grow focus:outline-none "
            />
          </label>
          <div className="modal-action flex justify-center items-center">
            <button
              onClick={close}
              className="btn btn-outline border-[#F1F1F1] w-28 hover:text-current hover:bg-inherit hover:border-[#F1F1F1]"
            >
              Close
            </button>
            <button className="btn rounded-lg text-white w-28 border-none bg-red hover:bg-red hover:border-none">
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
