import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { updateUserSocialGithub } from "@/libs/actions/user/user_social";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

type modalGithubProps = {
  userId: string;
  githubLink: string;
};

const ModalGithub: React.FC<modalGithubProps> = ({ userId, githubLink }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [newGithubLink, setNewGithubLink] = useState("");
  const [errorText, setErrorText] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!newGithubLink)
        return setErrorText("Please provide a new github link.");
      const error = await updateUserSocialGithub(newGithubLink, userId);
      if (error.error) return setErrorText(error.error);

      close();
      notifications.show({
        title: "update status",
        message: `updated ${newGithubLink} to new github link!!`,
        onClose: () => {
          document.location.reload();
        },
      });
    } catch (error) {
      return console.log(error);
    }
  };
  const handleClose = () => {
    close();
    setNewGithubLink("");
  };
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size="auto"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}>
        <form className="px-7 space-y-5 py-3" onSubmit={handleSubmit}>
          <h3 className="font-semibold text-lg text-center uppercase">
            Github link
          </h3>
          <label className="rounded-none border-b flex items-center">
            <input
              type="text"
              placeholder={githubLink}
              className="grow focus:outline-none "
              onChange={(e) => {
                setNewGithubLink(e.target.value);
                setErrorText("");
              }}
            />
          </label>
          {errorText && <p className="text-sm italic text-red">{errorText}</p>}
          <p className="text-xs text-[#C8C2C2] font-medium">
            Appears on your Profile page, as your byline, and in your responses.
          </p>
          <div className="modal-action">
            <button
              onClick={handleClose}
              className="btn btn-outline border-[#F1F1F1] w-28 hover:text-current hover:bg-inherit hover:border-[#F1F1F1]"
              type="reset">
              Close
            </button>
            <button
              className="btn rounded-lg text-white w-28 border-none bg-[#4ECB71] hover:bg-[#4ECB71] hover:border-none"
              type="submit">
              Save
            </button>
          </div>
        </form>
      </Modal>
      <button
        onClick={open}
        className="btn btn-ghost btn-circle hover:bg-inherit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#C8C2C2"
          className="size-6">
          <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
      </button>
    </div>
  );
};

export default ModalGithub;
