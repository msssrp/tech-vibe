"use client";
import React, { useEffect, useState } from "react";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import contractABI from "@/reviewAbi.json";
import {
  Checkbox,
  Drawer,
  Group,
  Input,
  Loader,
  Modal,
  Rating,
  Text,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { readlistsProps } from "@/types/readlists/readlists";
import { getReadlists, newReadlists } from "@/libs/actions/readlists/readlists";
import {
  deleteSavedArticle,
  getSavedArticle,
  saveArticle,
} from "@/libs/actions/savedArticle/savedArticle";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import {
  IconBookUpload,
  IconPhoto,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { File } from "buffer";
import { Notifications, notifications } from "@mantine/notifications";
import ReviewsCard from "./ReviewsCard";
import { ethers } from "ethers";

type interactProps = {
  user_id: string | undefined;
  article_id: string;
  url_title: string;
};

interface UploadedFile extends File {
  preview: string;
}

const InteractBtn: React.FC<interactProps> = ({
  user_id,
  article_id,
  url_title,
}) => {
  const [createInputOpen, setCreateInputOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [readlists, setReadlists] = useState<readlistsProps[] | null>([]);
  const [triggerReFetch, setTriggerReFetch] = useState(0);
  const [savedInReadlists, setSavedInReadlists] = useState<string[]>([]);
  const currentHost = typeof window !== "undefined" && window.location.hostname;
  const clipboard = useClipboard();
  const [opened, { open, close }] = useDisclosure(false);
  const [isWalletFound, setIsWalletFound] = useState(false);
  const [reviewsData, setReviewsData] = useState<any[]>();
  const ethereum = window.ethereum;

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
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
      const getReviews = async () => {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const from = accounts[0];
        const provider = new ethers.BrowserProvider(ethereum);
        const runner = await provider.getSigner(from);
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          runner
        );
        const result = await contract.getAllReviews(article_id);
        setReviewsData(result);
      };
      if (window.ethereum) setIsWalletFound(true);
      getReadlistsOnUser();
      getReviews();
    }
  }, [triggerReFetch, user_id, article_id]);

  const handleCreateReadlist = async (userid: string) => {
    await newReadlists(userid, inputValue);
    setTriggerReFetch(triggerReFetch + 1);
    setInputValue("");
    setCreateInputOpen(false);
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

  const [openedDrawer, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const handlerReviewPost = () => {
    openDrawer();
  };

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [reviewDesc, setReviewDesc] = useState("");
  const [reviewRate, setReviewRate] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const handleUpLoad = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsSubmit(true);

      const hashPromises = uploadedFiles.map(async (file) => {
        const fileBuffer = await file.arrayBuffer();
        const formData = new FormData();
        formData.append("file", new Blob([fileBuffer]));
        const uploadResponse = await fetch(
          `https://api.pinata.cloud/pinning/pinFileToIPFS`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
            },
            body: formData,
          }
        );
        const result = await uploadResponse.json();
        return result.IpfsHash;
      });

      const hashImage = await Promise.all(hashPromises);
      console.log(hashImage);

      if (hashImage.length > 0) {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const from = accounts[0];
        const provider = new ethers.BrowserProvider(ethereum);
        const runner = await provider.getSigner(from);
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          runner
        );
        const tx = await contract.addReview(
          article_id,
          reviewDesc,
          reviewRate,
          hashImage
        );
        await tx.wait();

        setIsSubmit(false);
        notifications.show({
          title: "reviewed !",
          message: "You're review has been published",
        });
      }
    } catch (error) {
      console.log(error);
      setIsSubmit(false);
    }
  };

  const handleDrop = (files: FileWithPath[]) => {
    const newUploadedFiles = files.map((file) => {
      const blob = file as Blob;
      return Object.assign(blob, {
        preview: URL.createObjectURL(blob),
      }) as UploadedFile;
    });

    setUploadedFiles([...uploadedFiles, ...newUploadedFiles]);
  };

  const handleRemove = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  const [openedReviews, { open: openReview, close: closeReview }] =
    useDisclosure(false);

  return (
    <>
      <Notifications />
      <Modal
        opened={openedReviews}
        onClose={closeReview}
        title="Reviews from public"
        size={1200}
        withCloseButton={false}>
        {reviewsData && reviewsData.length > 0 ? (
          reviewsData.map((review, index) => (
            <ReviewsCard
              key={index}
              ReviewId={review[0]}
              Timestamp={review[1]}
              Reviewer={review[2]}
              Rating={review[4]}
              Title={review[3]}
              IpfsHash={review[5]}
            />
          ))
        ) : (
          <div>no review on this blog</div>
        )}
      </Modal>
      <button onClick={openReview}>
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
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
          />
        </svg>
      </button>
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
          className="p-2 shadow menu dropdown-content z-50 bg-base-100 rounded-lg w-40 flex flex-col space-y-3">
          <button
            className="cursor-pointer flex space-x-2"
            onClick={() =>
              clipboard.copy(`${currentHost}:3000/post/${url_title}`)
            }>
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
          <button
            className="cursor-pointer flex space-x-2"
            onClick={handlerReviewPost}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
            <span>review this blog</span>
          </button>
        </div>
      </div>
      <Drawer
        opened={openedDrawer}
        onClose={closeDrawer}
        title="Review this blog">
        {isWalletFound ? (
          <form
            className="flex flex-col space-y-5 mt-6"
            onSubmit={handleUpLoad}>
            <div className="flex flex-col items-center justify-center space-y-4">
              <span>Rate this blog</span>
              <Rating value={reviewRate} onChange={setReviewRate} size={"xl"} />
            </div>
            <Textarea
              label="Review description"
              placeholder="input you're review description"
              autosize
              minRows={3}
              value={reviewDesc}
              onChange={(event) => setReviewDesc(event.target.value)}
            />
            <div className="flex space-x-4 flex-wrap ">
              {uploadedFiles.map((file, index) => (
                <Tooltip key={index} label="click to delete" color="red">
                  <div
                    key={index}
                    className="relative cursor-pointer mt-4"
                    onClick={() => handleRemove(index)}>
                    <img
                      src={file.preview}
                      alt={`Uploaded ${index}`}
                      style={{ width: 80, height: 80 }}
                    />
                  </div>
                </Tooltip>
              ))}
            </div>
            <Dropzone
              onDrop={(files) => handleDrop(files)}
              onReject={(files) => console.log("rejected files", files)}
              maxSize={5 * 1024 ** 2}>
              <Group
                justify="center"
                gap="md"
                mih={200}
                style={{ pointerEvents: "none" }}>
                <Dropzone.Accept>
                  <IconUpload
                    style={{
                      width: 80,
                      height: 80,
                      color: "var(--mantine-color-blue-6)",
                    }}
                    stroke={1}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{
                      width: 80,
                      height: 80,
                      color: "var(--mantine-color-red-6)",
                    }}
                    stroke={1}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto
                    style={{
                      width: 80,
                      height: 80,
                      color: "var(--mantine-color-dimmed)",
                    }}
                    stroke={1}
                  />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not
                    exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
            <button
              type="submit"
              className="btn flex items-center justify-center bg-blue-500 hover:bg-blue-400 p-2 rounded-md text-white">
              {isSubmit ? (
                <>
                  <span>Submitting...</span>
                  <Loader color="red" size={"sm"} />
                </>
              ) : (
                <>
                  <span>Submit</span>
                  <IconBookUpload />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-center">
            <span>Metamask not found please install</span>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default InteractBtn;
