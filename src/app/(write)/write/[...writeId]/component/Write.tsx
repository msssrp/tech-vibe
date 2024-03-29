"use client";
import TinyEditor from "./TinyEditor";
import WriteNavbar from "@/components/main/WriteNavbar";
import { WriteProps, articleProps } from "@/types/article/article";
import { useEffect, useRef, useState } from "react";
import { TagsInput } from "@mantine/core";
import {
  getArticleById,
  newArticle,
  updateArticleById,
  uploadImage,
} from "@/libs/actions/article/article";
import {
  articleNotification,
  howtouseNotification,
  tipsNotification,
} from "@/components/ui/notifications/notification";
import * as Dompurify from "dompurify";
import Link from "next/link";
import Image from "next/image";
const Write: React.FC<WriteProps> = ({ user, writeId }) => {
  const [article, setArticle] = useState<articleProps>({
    article_id: writeId,
    article_content: "",
    article_cover: "",
    article_description: "",
    article_title: "",
    user_id: user.user_id,
  });
  const [navStatus, setNavStatus] = useState("");
  const [tagValue, setTagValue] = useState<string[]>([]);
  const hasCoverImageBeenSet = useRef(false);
  const handleSetCoverImage = (imageUrl: string) => {
    if (!hasCoverImageBeenSet.current) {
      setArticle((prev: any) => ({ ...prev, article_cover: imageUrl }));
      hasCoverImageBeenSet.current = true;
    }
  };
  const handlerImageUpload: any = (blobInfo: any, success: any) => {
    return new Promise(async (resolve, reject) => {
      const file = blobInfo.blob();
      const uploadData = await uploadImage(writeId, file);
      if (uploadData.imagePath) {
        const imageUrl = uploadData.imagePath;
        success(imageUrl);
        handleSetCoverImage(
          `https://cqphjwakpkovcvrouaoz.supabase.co/storage/v1/object/public/Images/${imageUrl}`
        );
        resolve(
          `https://cqphjwakpkovcvrouaoz.supabase.co/storage/v1/object/public/Images/${imageUrl}`
        );
      }
    });
  };

  const editorRef = useRef<any>(null);

  const handlerEditorChange = (newContent: string, editor: any) => {
    const cleanHtml = Dompurify.sanitize(newContent);
    setArticle((prev: any) => ({ ...prev, article_content: cleanHtml }));
  };

  useEffect(() => {
    let saveTimeOut: NodeJS.Timeout;

    const saveArticle = async () => {
      const articleData = await getArticleById(writeId);

      if (articleData && articleData.article_status !== "pending") {
        await updateArticleById(writeId, article);
        articleNotification("Article Status", "draft", {
          articleName: article.article_title,
        });
        setNavStatus("saved");
      } else {
        await newArticle(article);
        articleNotification("Article Status", "saved");
        setNavStatus("saved");
      }
    };

    const handleChanges = () => {
      clearTimeout(saveTimeOut);

      if (
        article.article_content ||
        article.article_title ||
        article.article_description ||
        article.article_cover
      ) {
        saveTimeOut = setTimeout(saveArticle, 5000);
        setNavStatus("saving");
      }
    };

    handleChanges();

    return () => {
      clearTimeout(saveTimeOut);
      setNavStatus("saving");
    };
  }, [
    article.article_content,
    article.article_title,
    article.article_description,
    article.article_cover,
    article,
    writeId,
  ]);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1300);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const notificationRef = useRef(false);
  useEffect(() => {
    if (isDesktop) {
      if (notificationRef.current === false) {
        tipsNotification("Article tips");
        howtouseNotification("Article tips");
        return () => {
          notificationRef.current = true;
        };
      }
    }
  }, [isDesktop]);

  if (isDesktop) {
    return (
      <div>
        <WriteNavbar
          user={user}
          writeId={writeId}
          article={article}
          tagValue={tagValue}
        />
        <div className="container mx-auto px-32 py-10">
          <div className="flex items-center justify-center mt-10 divide-x">
            <div className="w-full pl-4 border-b">
              <textarea
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setArticle((prev: any) => ({
                    ...prev,
                    article_title: e.target.value,
                  }))
                }
                placeholder="Title"
                className="textarea p-9 input-lg w-full h-auto  focus:outline-none focus:border-none overflow-hidden px-0 text-3xl font-semibold capitalize resize-none"
              />
              <textarea
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setArticle((prev: any) => ({
                    ...prev,
                    article_description: e.target.value,
                  }))
                }
                placeholder="description"
                className="textarea input-sm w-full h-auto  focus:outline-none focus:border-none overflow-hidden px-0 text-xl font-light capitalize resize-none pt-5"
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="container mx-auto px-32 border-none outline-none overflow-auto min-h-96">
            <TinyEditor
              editorRef={editorRef}
              handlerEditorChange={handlerEditorChange}
              handlerImageUpload={handlerImageUpload}
            />{" "}
          </div>
          <div className="container mx-auto px-32 border-none outline-none overflow-auto min-h-96">
            <TagsInput
              className="w-1/3 "
              label="Press Enter to submit a tag"
              clearable
              placeholder="Enter tag"
              value={tagValue}
              onChange={setTagValue}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-8">
      <Link href={"/"} className="w-16 h-16">
        <Image
          width={60}
          height={60}
          src="https://cqphjwakpkovcvrouaoz.supabase.co/storage/v1/object/public/Images/Logo/Screenshot%20from%202024-02-13%2016-07-12.png"
          alt="Tech-Vibe"
          quality={100}
          className="w-full h-auto bg-cover"
        />
      </Link>
      <span>
        This page available only in desktop mode please switch to desktop mode
      </span>
    </div>
  );
};

export default Write;
