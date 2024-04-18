"use client";
import React from "react";
import { Drawer } from "@mantine/core";
import { DrawerCommentProps } from "@/types/article/article";
import CommentUser from "./CommentUser";
import Link from "next/link";
import useDrawerComment from "@/hook/useDrawerComment";
const DrawerComment: React.FC<DrawerCommentProps> = ({
  comment,
  article_id,
  user_id,
}) => {
  const {
    open,
    opened,
    handleOnKeyDown,
    handleReply,
    showInput,
    replyingTo,
    newCommentValue,
    setNewCommentValue,
    setNewReply,
    newReply,
    close,
  } = useDrawerComment(article_id);
  return (
    <div className="flex items-center">
      <div className="flex items-center space-x-2">
        <button onClick={open}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#616160"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
            />
          </svg>
        </button>
        <p className="text-[#616160]">{comment ? comment.length : 0}</p>
      </div>

      <Drawer opened={opened} onClose={close} position="right" title="Comment">
        {comment ? (
          comment.length > 0 && (
            <div className="p-5 w-full h-full flex flex-col space-y-4">
              {comment
                .filter((comment) => !comment.commentParent_id) // Filter out parent comments
                .sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                )
                .map((parentComment) => (
                  <div
                    key={parentComment.comment_id}
                    className="border-b pt-5 pb-5">
                    <div className="flex items-center space-x-3">
                      <CommentUser
                        user_id={parentComment.user_id}
                        timeStamp={parentComment.created_at}
                      />
                    </div>
                    <div>
                      <div className="flex space-x-2 mt-3">
                        <span>
                          {parentComment.comment_content}{" "}
                          {user_id && (
                            <button
                              onClick={() =>
                                handleReply(parentComment.comment_id)
                              }
                              className="underline text-blue-300">
                              reply
                            </button>
                          )}
                        </span>
                      </div>
                      {user_id &&
                        showInput &&
                        replyingTo === parentComment.comment_id && (
                          <input
                            type="text"
                            placeholder="Reply a comment"
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                            onKeyDown={(e) =>
                              handleOnKeyDown(
                                e,
                                true,
                                user_id,
                                parentComment.comment_id
                              )
                            }
                            className="border p-2 mt-2 w-full rounded-xl focus:outline-blue-100"
                          />
                        )}
                    </div>
                    {/* Render child comments */}
                    {comment
                      .filter(
                        (comment) =>
                          comment.commentParent_id === parentComment.comment_id
                      )
                      .map((childComment) => (
                        <div
                          key={childComment.comment_id}
                          className="pl-6 pt-3 ml-2 mt-2 border-l-2">
                          {" "}
                          <div className="flex items-center space-x-3">
                            <CommentUser
                              user_id={childComment.user_id}
                              timeStamp={childComment.created_at}
                            />
                          </div>
                          <div>
                            <div className="flex space-x-2 mt-3">
                              <span>{childComment.comment_content}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          )
        ) : (
          <div>Loading</div>
        )}
        {user_id ? (
          <div className="mt-4">
            <input
              type="text"
              value={newCommentValue}
              onChange={(e) => setNewCommentValue(e.target.value)}
              onKeyDown={(e) => handleOnKeyDown(e, false, user_id)}
              placeholder="Add a new comment"
              className="border p-2 mt-2 w-full rounded-xl focus:outline-blue-100"
            />
          </div>
        ) : (
          <Link href={"/SignIn"} className="w-full bg-red btn">
            <span className="text-center text-white">Login</span>
          </Link>
        )}
      </Drawer>
    </div>
  );
};

export default DrawerComment;
