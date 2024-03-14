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
const Write: React.FC<WriteProps> = ({ user, writeId }) => {
  const [article, setArticle] = useState<articleProps["article"]>({
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
      setArticle((prev) => ({ ...prev, article_cover: imageUrl }));
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
    const clean = Dompurify.sanitize(newContent);
    setArticle((prev) => ({ ...prev, article_content: clean }));
  };

  useEffect(() => {
    let saveTimeOut: NodeJS.Timeout;

    const saveArticle = async () => {
      const { article: articleData } = await getArticleById(writeId);

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
  ]);

  const notificationRef = useRef(false);
  useEffect(() => {
    if (notificationRef.current === false) {
      tipsNotification("Article tips");
      howtouseNotification("Article tips");
      return () => {
        notificationRef.current = true;
      };
    }
  }, []);
  console.log(tagValue);

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
                setArticle((prev) => ({
                  ...prev,
                  article_title: e.target.value,
                }))
              }
              placeholder="Title"
              className="textarea input-lg w-full h-auto  focus:outline-none focus:border-none overflow-hidden px-0 text-4xl font-semibold capitalize resize-none"
            />
            <textarea
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setArticle((prev) => ({
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
};

export default Write;
