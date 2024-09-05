import { getReadlists, newReadlists } from "@/libs/actions/readlists/readlists";
import {
  deleteSavedArticle,
  getSavedArticle,
  saveArticle,
} from "@/libs/actions/savedArticle/savedArticle";
import { readlistsProps } from "@/types/readlists/readlists";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { ethers } from "ethers";
import React, { useState } from "react";

import contractABI from "@/hardhat/artifacts/contracts/BlogReview.sol/BlogReview.json";
import { UploadedFile } from "@/types/article/article";
import { notifications } from "@mantine/notifications";
import { FileWithPath } from "@mantine/dropzone";
const useInteractBtn = (user_id: string | undefined, article_id: string) => {
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
  const ethereum = typeof window !== "undefined" && window.ethereum;
  const currentPath = typeof window !== "undefined" && window.location.href;
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

  const handleOnReadListOpen = async () => {
    if (user_id) {
      open();
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
        setSavedInReadlists(savedLists);
      }
    }
  };

  const handleOnOpenReview = async () => {
    if (user_id) {
      openReview();
      if (ethereum) {
        const getReviews = async () => {
          try {
            const accounts = await ethereum.request({
              method: "eth_requestAccounts",
            });
            const from = accounts[0];
            const provider = new ethers.BrowserProvider(ethereum);
            const runner = await provider.getSigner(from);
            const contract = new ethers.Contract(
              contractAddress,
              contractABI.abi,
              runner
            );
            const result = await contract.getAllReviews(article_id);
            setReviewsData(result);
          } catch (error) {
            setReviewsData([]);
            notifications.show({
              autoClose: false,
              title: "Something went wrong",
              message:
                "Please check your MainNet connection Make sure you are connected to Sepolia Network and try again.",
              color: "orange",
            });
          }
        };
        if (window.ethereum) setIsWalletFound(true);
        getReviews();
      }
    }
  };

  const handleCreateReadlist = async (userid: string) => {
    if (user_id) {
      await newReadlists(userid, inputValue);
      const data = await getReadlists(user_id);
      setReadlists(data);
      setInputValue("");
      setCreateInputOpen(false);
    }
  };

  const handleSaveArticleOnReadlist = async (
    user_id: string,
    readlists_id: string
  ) => {
    await saveArticle(article_id, user_id, readlists_id);
  };

  const handleDeleteSaveArticleOnReadlist = async (readlists_id: string) => {
    await deleteSavedArticle(readlists_id, article_id);
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
      if (ethereum) {
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

        if (hashImage.length > 0) {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          const from = accounts[0];
          const provider = new ethers.BrowserProvider(ethereum);
          const runner = await provider.getSigner(from);
          const contract = new ethers.Contract(
            contractAddress,
            contractABI.abi,
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
          closeDrawer();
        }
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

  const [openedReport, { open: openReport, close: closeReport }] =
    useDisclosure(false);

  return {
    openedReport,
    openReport,
    closeReport,
    open,
    close,
    reviewDesc,
    readlists,
    reviewRate,
    reviewsData,
    openDrawer,
    openReview,
    openedDrawer,
    clipboard,
    closeDrawer,
    contractABI,
    opened,
    openedReviews,
    closeReview,
    savedInReadlists,
    handleCreateReadlist,
    handleDeleteSaveArticleOnReadlist,
    handleDrop,
    handleRemove,
    handleSaveArticleOnReadlist,
    handleUpLoad,
    handlerReviewPost,
    createInputOpen,
    setInputValue,
    inputValue,
    setCreateInputOpen,
    currentHost,
    isWalletFound,
    ethereum,
    setReviewDesc,
    setReviewRate,
    uploadedFiles,
    isSubmit,
    currentPath,
    handleOnReadListOpen,
    handleOnOpenReview,
    setSavedInReadlists,
  };
};

export default useInteractBtn;
