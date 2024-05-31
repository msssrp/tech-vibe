"use client";
import AllArticleCardClient from "@/components/main/AllArticleCardClient";
import {
  getArticleById,
  manageArticleStatus,
} from "@/libs/actions/article/article";
import {
  confirmComplaint,
  deleteComplaint,
} from "@/libs/actions/complaint/complaint";
import { getUserFromClient } from "@/libs/actions/user/userClient";
import { articleProps } from "@/types/article/article";
import { complaintProps } from "@/types/complaint/complaint";
import { userProps } from "@/types/user/user";
import { Avatar, Modal, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { createNewNotification } from "../../../../../libs/actions/notification/notification";
import Image from "next/image";

type complaintCardProps = {
  complaint: complaintProps;
};

const ComplaintCard: React.FC<complaintCardProps> = ({ complaint }) => {
  const [user, setUser] = useState<userProps>();
  const [userComplaint, setUserComplaint] = useState<userProps>();
  const [article, setArticle] = useState<articleProps>();
  const [modComment, setModComment] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [openedComplaint, { open: openComplaint, close: closeComplaint }] =
    useDisclosure(false);
  useEffect(() => {
    const fetchData = async () => {
      const article = await getArticleById(complaint.article_id);
      if (article) {
        const user = await getUserFromClient(article.user_id);
        setArticle(article);
        setUser(user);
        return;
      }
      return;
    };
    const getUserComplaint = async () => {
      const user = await getUserFromClient(complaint.user_id);
      setUserComplaint(user);
    };
    fetchData();
    getUserComplaint();
  }, [complaint]);
  const handleDeleteComplaint = async () => {
    const error = await deleteComplaint(complaint.complaint_id);
    if (error) return console.log(error);
    close();
    notifications.show({
      title: "Complaint Status has changed",
      message:
        "The complaint has been deleted. This page will reload in 5 second.",
    });
    setInterval(() => {
      window.location.reload();
    }, 5000);
  };

  if (!user) return;
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
    });
    await createNewNotification(
      `your article has been suspended`,
      "report",
      `your article ${article?.article_title} has been suspended for these reason from moderator "${modComment}"`,
      user.user_id
    );
    setInterval(() => {
      window.location.reload();
    }, 5000);
  };
  if (article === undefined || !userComplaint) return;

  return (
    <>
      <Modal
        opened={openedComplaint}
        onClose={closeComplaint}
        size={600}
        withCloseButton={false}
        centered>
        <form
          className="flex flex-col items-center justify-center space-y-4 px-9 py-3"
          onSubmit={handleComplaint}>
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
              onClick={() => closeComplaint()}>
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
        centered>
        <div className="flex items-center justify-center flex-col space-y-4 px-9 py-3">
          <h1 className="uppercase text-xl font-semibold">complaint article</h1>
          <span className="text-base-content text-center">
            Report articles or content that you find inappropriate, offensive,
            or in violation of the platform's policies. If upon review, you
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
              }}>
              COMPLAINT
            </button>
          </div>
        </div>
      </Modal>
      <div className="flex flex-col space-y-3 p-6 w-full lg:w-2/5 bg-white rounded-xl mr-5 mb-5">
        <div className="flex items-center space-x-3">
          <Image
            src={userComplaint.user_profile}
            alt="image"
            width={35}
            height={35}
            className="rounded-full"
          />
          <span>{userComplaint.user_fullname}</span>
        </div>

        <Textarea
          readOnly={true}
          minRows={4}
          autosize
          className="w-full"
          value={complaint.complaint_description}
          disabled
        />

        <div className="p-2">
          <AllArticleCardClient
            user={user}
            article={article}
            articleId={article.article_id}
          />
        </div>
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
      </div>
    </>
  );
};

export default ComplaintCard;
