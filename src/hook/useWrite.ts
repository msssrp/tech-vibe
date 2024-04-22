import {
  articleNotification,
  howtouseNotification,
  tipsNotification,
} from "@/components/ui/notifications/notification";
import {
  getArticleById,
  newArticle,
  updateArticleById,
  uploadImage,
} from "@/libs/actions/article/article";
import { articleProps } from "@/types/article/article";
import { userProps } from "@/types/user/user";
import DOMPurify from "dompurify";
import React, { useEffect, useRef, useState } from "react";

const useWrite = (writeId: string, user: userProps) => {
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
    const cleanHtml = DOMPurify.sanitize(newContent);
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
  return {
    isDesktop,
    article,
    tagValue,
    setArticle,
    editorRef,
    handlerEditorChange,
    handlerImageUpload,
    setTagValue,
  };
};

export default useWrite;