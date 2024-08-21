import { manageArticleStatus } from "@/libs/actions/article/article";
import { createNewNotification } from "@/libs/actions/notification/notification";
import { Modal } from "@mantine/core";
import React, { useState } from "react";

type drawerProps = {
  opened: any;
  close: any;
  articleId: string;
  articleTitle: string;
  userId: string;
};

const DrawerApproveBtn: React.FC<drawerProps> = ({
  opened,
  close,
  articleId,
  articleTitle,
  userId,
}) => {
  const [isApprove, setIsApprove] = useState(false);
  const handleOnApprove = async () => {
    try {
      setIsApprove(true);
      await manageArticleStatus(articleId, "public");
      await createNewNotification(
        `your article has been approved!!`,
        "publish",
        `your article ${articleTitle} has been publish to world wide you can checkout your article now!`,
        userId,
        articleTitle
      );
      window.location.reload();
      setIsApprove(false);
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      withCloseButton={false}
      size={600}
    >
      <div className="flex flex-col space-y-5 justify-center items-center p-5  text-center">
        <h1 className="text-2xl font-semibold uppercase">approve article</h1>
        <span className="text-base-content">
          Approving an article for publication means the content will be made
          available to a wide audience. If you choose not to approve an article,
          you can cancel the approval process and provide a reason for your
          decision.
        </span>
        <div className="flex items-center space-x-3 justify-center">
          <button id="btn-cancel-approve" className="btn" onClick={close}>
            CANCEL
          </button>
          <button
            id="btn-confirm-approve"
            className={`btn ${
              isApprove ? "bg-green-400" : "bg-green-500"
            } text-white hover:bg-green-400`}
            onClick={handleOnApprove}
          >
            {isApprove ? "Approving..." : "Approve"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DrawerApproveBtn;
