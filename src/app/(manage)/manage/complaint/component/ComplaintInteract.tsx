"use client";
import { manageArticleStatus } from "@/libs/actions/article/article";
import {
  confirmComplaint,
  deleteComplaint,
} from "@/libs/actions/complaint/complaint";
import { createNewNotification } from "@/libs/actions/notification/notification";
import { complaintProps } from "@/types/complaint/complaint";
import { Modal, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";

type complaintInteractProps = {
  complaint: complaintProps;
  articleTitle: string;
  userId: string;
};

const ComplaintInteract: React.FC<complaintInteractProps> = ({
  complaint,
  articleTitle,
  userId,
}) => {
  const [modComment, setModComment] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [openedComplaint, { open: openComplaint, close: closeComplaint }] =
    useDisclosure(false);
  const handleComplaint = async () => {
    const error = await confirmComplaint(complaint.complaint_id, modComment);
    if (error) return console.log(error);
    const errorArticle = await manageArticleStatus(
      complaint.article_id,
      "complaint"
    );
    if (errorArticle) return console.log(error);
    closeComplaint();
    notifications.show({
      title: "Complaint Status has changed",
      message:
        "The complaint has been complainted to author. This page will reload in 5 second.",
      onClose: () => {
        document.location.reload();
      },
    });
    await createNewNotification(
      `your article has been suspended`,
      "report",
      `your article ${articleTitle} has been suspended for these reason from moderator "${modComment}"`,
      userId
    );
  };
  const handleDeleteComplaint = async () => {
    const error = await deleteComplaint(complaint.complaint_id);
    if (error) return console.log(error);
    close();
    notifications.show({
      title: "Complaint Status has changed",
      message:
        "The complaint has been deleted. This page will reload in 5 second.",
      onClose: () => {
        document.location.reload();
      },
    });
  };
  return (
    <>
      <Modal
        opened={openedComplaint}
        onClose={closeComplaint}
        size={600}
        withCloseButton={false}
        centered
      >
        <form
          className="flex flex-col items-center justify-center space-y-4 px-9 py-3"
          onSubmit={handleComplaint}
        >
          <h1 className="uppercase text-xl font-semibold">complaint article</h1>
          <span className="text-base-content">
            Please provide a reason for the reported complaint against the
            article
          </span>
          <Textarea
            className="w-full"
            minRows={4}
            autosize
            placeholder="give author a reason"
            onChange={(e) => setModComment(e.currentTarget.value)}
            required
          />
          <div className="flex items-center justify-center space-x-4">
            <button
              type="reset"
              className="btn"
              onClick={() => closeComplaint()}
            >
              CANCEL
            </button>
            <button type="submit" className="btn bg-orange-500 text-white">
              SENT
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        opened={opened}
        onClose={close}
        size={600}
        withCloseButton={false}
        centered
      >
        <div className="flex items-center justify-center flex-col space-y-4 px-9 py-3">
          <h1 className="uppercase text-xl font-semibold">complaint article</h1>
          <span className="text-base-content text-center">
            Report articles or content that you find inappropriate, offensive,
            or in violation of the platforms policies. If upon review, you
            disagree with the complaint against the article, you can dismiss the
            reported complaint
          </span>
          <div className="flex items-center justify-center space-x-4">
            <button className="btn" onClick={handleDeleteComplaint}>
              DELETE
            </button>
            <button
              className="btn bg-orange-500 text-white"
              onClick={() => {
                close();
                openComplaint();
              }}
            >
              COMPLAINT
            </button>
          </div>
        </div>
      </Modal>
      {complaint.complaint_status !== "complaint" && (
        <div className="flex justify-end items-center space-x-4">
          {complaint.complaint_status !== "delete" && (
            <button className="btn" onClick={open}>
              DELETE
            </button>
          )}

          <button className="btn bg-orange-500 text-white" onClick={open}>
            COMPLAINT
          </button>
        </div>
      )}
    </>
  );
};

export default ComplaintInteract;