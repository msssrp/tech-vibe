"use client";
import React, { useEffect, useState } from "react";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { Checkbox, Input, Modal } from "@mantine/core";
import { readlistsProps } from "@/types/readlists/readlists";
import { getReadlists, newReadlists } from "@/libs/actions/readlists/readlists";
import {
  deleteSavedArticle,
  getSavedArticle,
  saveArticle,
} from "@/libs/actions/savedArticle/savedArticle";

type interactProps = {
  user_id: string | undefined;
  article_id: string;
};

const InteractBtn: React.FC<interactProps> = ({ user_id, article_id }) => {
  const [createInputOpen, setCreateInputOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [readlists, setReadlists] = useState<readlistsProps[] | null>([]);
  const [triggerReFetch, setTriggerReFetch] = useState(0);
  const [savedInReadlists, setSavedInReadlists] = useState<string[]>([]);
  const currentUrl = typeof window !== "undefined" && window.location.href;
  const clipboard = useClipboard();
  const [opened, { open, close }] = useDisclosure(false);
  useEffect(() => {
    if (user_id) {
      const getReadlistsOnUser = async () => {
        const data = await getReadlists(user_id);
        setReadlists(data);

        const savedLists: string[] = [];
        if (data) {
          for (const readlist of data) {
            const { count } = await getSavedArticle(
              readlist.readlists_id,
              article_id
            );
            if (count && count > 0) {
              savedLists.push(readlist.readlists_id);
            }
          }
        }
        setSavedInReadlists(savedLists);
      };

      getReadlistsOnUser();
    }
  }, [triggerReFetch, user_id, article_id]);
  console.log(readlists);
  const handleCreateReadlist = async (userid: string) => {
    await newReadlists(userid, inputValue);
    setTriggerReFetch(triggerReFetch + 1);
    setInputValue("");
  };

  const handleSaveArticleOnReadlist = async (
    user_id: string,
    readlists_id: string
  ) => {
    await saveArticle(article_id, user_id, readlists_id);

    setTriggerReFetch(triggerReFetch + 1);
  };

  const handleDeleteSaveArticleOnReadlist = async (readlists_id: string) => {
    await deleteSavedArticle(readlists_id, article_id);
    setTriggerReFetch(triggerReFetch + 1);
  };
  return (
    <>
      <button onClick={open}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#FED556"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
          />
        </svg>
      </button>
      <Modal
        opened={opened}
        onClose={close}
        title={`${user_id ? "save the article to" : "SignIn to save this!!"}`}
        centered
        radius={"md"}
        size={230}>
        {user_id ? (
          <>
            <div className="flex flex-col space-y-3 px-1.5">
              {readlists && readlists.length > 0 ? (
                readlists.map((readlist) => (
                  <div
                    key={readlist.readlists_id}
                    className="flex space-x-3 items-center">
                    <Checkbox
                      checked={savedInReadlists.includes(readlist.readlists_id)}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.checked) {
                          handleSaveArticleOnReadlist(
                            user_id,
                            readlist.readlists_id
                          );
                        } else {
                          handleDeleteSaveArticleOnReadlist(
                            readlist.readlists_id
                          );
                        }
                      }}
                      label={readlist.readlists_name}
                    />
                  </div>
                ))
              ) : (
                <span className="text-[13px] text-[#B1B1B0]">
                  You dont have any readlists go create one!
                </span>
              )}
            </div>

            <div className="flex space-x-3 mt-5 mb-3 px-1.5">
              {createInputOpen ? (
                <div className="flex flex-col justify-items-center">
                  <div className="flex flex-col">
                    <Input.Wrapper label="Name">
                      <Input
                        maxLength={100}
                        variant="unstyled"
                        placeholder="Enter readlist title..."
                        className="border-b"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => setInputValue(event.target.value)}
                        value={inputValue}
                      />
                    </Input.Wrapper>
                    <span className="text-xs ml-auto text-[#ADB5BD] mt-2">
                      {inputValue ? inputValue.length : 0}/100
                    </span>
                  </div>
                  <button
                    className="ml-auto mt-6"
                    onClick={() => handleCreateReadlist(user_id)}>
                    create
                  </button>
                </div>
              ) : (
                <button
                  className="flex space-x-3"
                  onClick={() => setCreateInputOpen(!createInputOpen)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <span>Create new readlist</span>
                </button>
              )}
            </div>
          </>
        ) : (
          <button className="w-full btn btn-ghost">
            <span className="text-center">Sign In</span>
          </button>
        )}
      </Modal>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#699DF6"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
          />
        </svg>
      </button>
      <div className="dropdown dropdown-bottom dropdown-end">
        <button tabIndex={0} role="button">
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
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </button>
        <div
          tabIndex={0}
          className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-lg w-40 flex flex-col space-y-3">
          <button
            className="cursor-pointer flex space-x-2"
            onClick={() => clipboard.copy(currentUrl)}>
            {clipboard.copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                />
              </svg>
            )}

            <span>{clipboard.copied ? "Copied Link" : "Copy Link"}</span>
          </button>
          <button className="cursor-pointer flex space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
              />
            </svg>
            <span>report this story</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default InteractBtn;
