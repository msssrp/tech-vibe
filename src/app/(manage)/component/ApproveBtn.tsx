"use client";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import DrawerApproveBtn from "./DrawerApproveBtn";
import DrawerDisapproveBtn from "./DrawerDisapproveBtn";

type approveBtnProps = {
  articleId: string;
  articleTitle: string;
  userId: string;
};

const ApproveBtn: React.FC<approveBtnProps> = ({
  articleId,
  articleTitle,
  userId,
}) => {
  const [openedApprove, { open: openApprove, close: closeApprove }] =
    useDisclosure(false);

  const [openedDisApprove, { open: openDisApprove, close: closeDisApprove }] =
    useDisclosure(false);
  return (
    <div className="flex items-center space-x-3 mr-2 justify-end py-2">
      <button
        id="btn-disapprove"
        className="btn btn-md text-xs bg-red text-white"
        onClick={openDisApprove}
      >
        DISAPPROVE
      </button>
      <button
        id="btn-approve"
        className="btn bg-green-500 text-white text-xs hover:bg-green-400 btn-md"
        onClick={openApprove}
      >
        APPROVE
      </button>
      <DrawerApproveBtn
        opened={openedApprove}
        close={closeApprove}
        articleId={articleId}
        articleTitle={articleTitle}
        userId={userId}
      />
      <DrawerDisapproveBtn
        opened={openedDisApprove}
        close={closeDisApprove}
        articleId={articleId}
        articleTitle={articleTitle}
        userId={userId}
      />
    </div>
  );
};

export default ApproveBtn;