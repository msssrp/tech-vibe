import { getArticleTags } from "@/libs/actions/tag/tag";
import { articleProps } from "@/types/article/article";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ApproveBtn from "./ApproveBtn";
import { getUser } from "@/libs/actions/user/user";
import { text } from "stream/consumers";

type ArticleApproveCardProps = {
  article: articleProps;
};

const ArticleApproveCard: React.FC<ArticleApproveCardProps> = async ({
  article,
}) => {
  const user = await getUser(article.user_id);
  if (!user) return;

  const usernameWithHyphen = user.user_fullname.replace(/ /g, "-");
  const articleTitleWithHypen = article.article_title
    .replace(/ /g, "-")
    .replace(/\//g, "&");
  const articleFirstId = article.article_id.split("-")[0];
  const articleTitleWithId = articleTitleWithHypen + "-" + articleFirstId;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
    const formattedTime = date.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${formattedDate} ${formattedTime}`;
  };

  const getStatusClassAndText = (status: string) => {
    if (status === "pending")
      return { className: "text-[#F8C04A]", text: "In progress" };
    if (status === "public")
      return { className: "text-[#5AAB56]", text: "Approve" };
    if (status === "reject")
      return { className: "text-[#E0524C] ", text: "Disapprove" };
    return { className: "", text: status };
  };

  const { className, text } = getStatusClassAndText(
    article.article_status ?? ""
  );

  return (
    <tr>
      <td className="w-16"></td>
      <td>
        <div className="flex items-center gap-3 text-start line-clamp-2">
          <div className="avatar">
            <div className="w-28 h-20 rounded-xl">
              <img src={article.article_cover} alt="" />
            </div>
          </div>
          <Link
            id="title-manage-article"
            href={`/${usernameWithHyphen}/${articleTitleWithId}`}
            className="font-medium line-clamp-2"
          >
            {article.article_title}
          </Link>
        </div>
      </td>
      <td>
        <Link href={`/profile/${user.user_id}`}>{user.user_fullname}</Link>
      </td>
      <td>{article.created_at ? formatDate(article.created_at) : "N/A"}</td>
      {/* <td
        id="status-article"
        className={`capitalize font-semibold ${className}`}
      >
        {text}
      </td> */}
      <td>
        {article && article.article_status !== "public" && (
          <ApproveBtn
            articleId={article.article_id}
            articleTitle={article.article_title}
            userId={user.user_id}
          />
        )}
      </td>
    </tr>
  );
};

export default ArticleApproveCard;
