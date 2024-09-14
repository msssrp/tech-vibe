import { manageArticleStatus } from "@/libs/actions/article/article";
import { createNewNotification } from "@/libs/actions/notification/notification";
import { Modal, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type drawerProps = {
  opened: boolean;
  close: () => void;
  articleId: string;
  articleTitle: string;
  userId: string;
};

const DrawerDisapproveBtn: React.FC<drawerProps> = ({
  opened,
  close,
  articleId,
  articleTitle,
  userId,
}) => {
  const [isDisApprove, setIsDisApprove] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const router = useRouter();

  const handleOnDisapprove = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rejectReason.trim() === "") {
      notifications.show({
        title: "Validation Error",
        message: "Please provide a reason before disapproving the article.",
        color: "yellow",
      });
      return;
    }
    try {
      setIsDisApprove(true);
      await manageArticleStatus(articleId, "reject");
      await createNewNotification(
        `your article has been disapproved`,
        "reject",
        `your article ${articleTitle} has been rejected. Here's the reason from the moderator: "${rejectReason}"`,
        userId
      );
      notifications.show({
        title: "Article Disapproved",
        message: `Article ${articleTitle} has been disapproved`,
        color: "red",
        onClose: () => router.push("/"),
      });
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
      <form
        className="flex flex-col space-y-5 justify-center items-center p-5 text-center"
        onSubmit={handleOnDisapprove}
      >
        <h1 className="text-2xl font-semibold uppercase">Disapprove article</h1>
        <span className="text-base-content">
          Please provide a reason for not approving the article.
        </span>
        <Textarea
          id="textarea-disapprove"
          size="sm"
          w={500}
          autosize
          placeholder="Give author a reason"
          minRows={4}
          onChange={(e) => setRejectReason(e.currentTarget.value)}
        />
        <div className="flex items-center space-x-3 justify-center">
          <button
            id="btn-cancel-disapprove"
            type="button"
            className="btn"
            onClick={close}
          >
            CANCEL
          </button>
          <button
            id="btn-confirm-disapprove"
            type="submit"
            className={`btn ${isDisApprove ? "bg-red" : "bg-red"} text-white hover:bg-red`}
          >
            {isDisApprove ? "Disapproving..." : "Disapprove"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DrawerDisapproveBtn;
