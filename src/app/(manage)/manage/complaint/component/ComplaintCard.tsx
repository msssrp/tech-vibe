import AllArticleCardClient from "@/components/main/AllArticleCardClient";
import { getArticleByIdOnServer } from "@/libs/actions/article/article";
import { complaintProps } from "@/types/complaint/complaint";
import { Textarea } from "@mantine/core";
import React from "react";
import Image from "next/image";
import { getUser } from "@/libs/actions/user/user";
import { getUserRoleOnServer } from "@/libs/actions/user/user_role";
import ComplaintInteract from "./ComplaintInteract";

type complaintCardProps = {
  complaint: complaintProps;
};

const ComplaintCard: React.FC<complaintCardProps> = async ({ complaint }) => {
  const article = await getArticleByIdOnServer(complaint.article_id);
  const user = await getUser(article.user_id);
  if (!user) return;
  const userThatComplaint = await getUser(complaint.user_id);
  if (!article || !userThatComplaint) return;
  const userRole = await getUserRoleOnServer(user.user_id);
  return (
    <>
      <div className="flex flex-col space-y-3 p-6 w-full lg:w-2/5 bg-white rounded-xl mr-5 mb-5">
        <div className="flex items-center space-x-3">
          <Image
            src={userThatComplaint.user_profile}
            alt="image"
            width={35}
            height={35}
            className="rounded-full"
          />
          <span>{userThatComplaint.user_fullname}</span>
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
            userRole={userRole}
          />
        </div>
        {complaint.complaint_status !== "complaint" && (
          <ComplaintInteract
            complaint={complaint}
            articleTitle={article.article_title}
            userId={user.user_id}
          />
        )}
      </div>
    </>
  );
};

export default ComplaintCard;
