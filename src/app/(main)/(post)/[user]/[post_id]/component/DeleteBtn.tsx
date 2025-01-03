"use client";
import { deleteArticle } from "@/libs/actions/article/article";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import React from "react";

type DeleteBtnProps = {
  articleId: string;
  articleTitle: string;
};

const DeleteBtn: React.FC<DeleteBtnProps> = ({ articleTitle, articleId }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  const handleDelete = async () => {
    await deleteArticle(articleId);
    close();
    return notifications.show({
      title: "Article deleted",
      message: `Article ${articleTitle} has been deleted`,
      color: "red",
      onClose: () => {
        router.push("/");
      },
    });
  };
  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <h1 className="text-xl font-semibold">
            Delete {articleTitle} article?
          </h1>
          <span className="italic text-base">
            This article will be removed after click the confirm button
          </span>
          <div className="space-x-4">
            <button className="btn btn-md bg-white text-black w-24" onClick={close}>
              Cancel
            </button>
            <button
              className="btn btn-md bg-red text-white w-24"
              onClick={handleDelete}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
      <svg
        id="delete-btn"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="currentColor"
        className="size-5 cursor-pointer"
        onClick={open}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
    </>
  );
};

export default DeleteBtn;
