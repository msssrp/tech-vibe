"use client";
import {
  deleteReadlists,
  updateReadlistName,
} from "@/libs/actions/readlists/readlists";
import { Input, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";
import { IoIosMore } from "react-icons/io";

type libraryDropDownProps = {
  readlistId: string;
  readlistName: string;
};

const LibraryDropdown: React.FC<libraryDropDownProps> = ({
  readlistName,
  readlistId,
}) => {
  const [newReadlistName, setNewReadlistName] = useState("");
  const [errorText, setErrorText] = useState("");
  const [editOpened, { open: editOpen, close: editClose }] =
    useDisclosure(false);
  const [removeListOpened, { open: removeListOpen, close: removeListClose }] =
    useDisclosure(false);

  const handleDeleteReadlists = async () => {
    await deleteReadlists(readlistId);
    removeListClose();
    notifications.show({
      title: "Deleted !!",
      message: `Your "${readlistName}" has been deleted`,
      onClose: () => {
        document.location.reload();
      },
    });
  };

  const handleUpdateReadlist = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newReadlistName) return setErrorText("Please provide a new name");
    await updateReadlistName(readlistId, newReadlistName);
    editClose();
    notifications.show({
      title: "Updated !!",
      message: `Your "${readlistName}" has been updated to "${newReadlistName}"`,
      onClose: () => {
        document.location.reload();
      },
    });
  };
  return (
    <>
      <Modal
        opened={editOpened}
        onClose={editClose}
        centered
        withCloseButton={false}
        title={`Insert new name for this read list "${readlistName}"`}
      >
        <form
          className="flex flex-col items-center space-y-4"
          onSubmit={handleUpdateReadlist}
        >
          <Input
            placeholder={readlistName}
            className="w-2/3"
            onChange={(e) => {
              setNewReadlistName(e.target.value);
              setErrorText("");
            }}
          />
          <div className="flex items-center justify-center">
            <button className="btn mr-7" onClick={editClose} type="reset">
              cancel
            </button>
            <button className="btn bg-green-400 text-white" type="submit">
              update
            </button>
          </div>
          {errorText && <p className="text-red text-sm italic">{errorText}</p>}
        </form>
      </Modal>
      <Modal
        opened={removeListOpened}
        onClose={removeListClose}
        centered
        withCloseButton={false}
        title={`Do you really want to delete this "${readlistName}" read list?`}
      >
        <div className="flex items-center justify-center">
          <button className="btn mr-7" onClick={removeListClose}>
            cancel
          </button>
          <button
            className="btn bg-red text-white"
            onClick={handleDeleteReadlists}
          >
            confirm
          </button>
        </div>
      </Modal>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="m-1">
          <IoIosMore />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-md z-[1] w-32 p-2 shadow flex items-center justify-center"
        >
          <li>
            <button className="w-28 flex justify-center" onClick={editOpen}>Edit list</button>
          </li>
          <li>
            <button className="w-28 text-red flex justify-center" onClick={removeListOpen}>
              Remove list
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default LibraryDropdown;
