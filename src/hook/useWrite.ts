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
import { getUserRole } from "@/libs/actions/user/user_role";
import { articleProps } from "@/types/article/article";
import { userProps } from "@/types/user/user";
import DOMPurify from "dompurify";
import React, { useEffect, useRef, useState } from "react";
const IMAGE_PATH = process.env.NEXT_PUBLIC_IMAGES_PATH as string;
const useWrite = (
  writeId: string,
  user: userProps,
  articleData?: articleProps,
  articleTag?: any
) => {
  const [article, setArticle] = useState<articleProps>({
    article_id: writeId,
    article_content: "",
    article_cover: "",
    article_description: "",
    article_title: "",
    user_id: user.user_id,
    article_claim: false,
  });
  const [navStatus, setNavStatus] = useState("");
  const [tagValue, setTagValue] = useState<string[]>([]);
  const hasCoverImageBeenSet = useRef(false);
  const [userRole, setUserRole] = useState<
    { user_role_name: string }[] | null
  >();
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
        handleSetCoverImage(`${IMAGE_PATH}${imageUrl}`);
        resolve(`${IMAGE_PATH}${imageUrl}`);
        console.log(IMAGE_PATH, imageUrl);
      }
    });
  };

  const editorRef = useRef<any>(null);

  const handlerEditorChange = (newContent: string, editor: any) => {
    const cleanHtml = DOMPurify.sanitize(newContent);
    setArticle((prev: any) => ({ ...prev, article_content: cleanHtml }));
  };

  useEffect(() => {
    if (articleData) setArticle(articleData);
    if (articleTag && articleTag.length > 0) return setTagValue(articleTag);
    console.log(tagValue);
  }, [articleData]);

  useEffect(() => {
    let saveTimeOut: NodeJS.Timeout;

    const saveArticle = async () => {
      const articleData = await getArticleById(writeId);
      if (articleData) {
        await updateArticleById(writeId, article, "draft");
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
  //const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const getUserRoleClient = async () => {
      const userRole = await getUserRole(user.user_id);
      setUserRole(userRole);
    };
    getUserRoleClient();
    /*const handleResize = async () => {
      setIsDesktop(window.innerWidth > 1300);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);*/
  }, [user.user_id]);

  const notificationRef = useRef(false);
  useEffect(() => {
    //if (isDesktop) {
    if (notificationRef.current === false) {
      tipsNotification("Article tips");
      howtouseNotification("Article tips");
      return () => {
        notificationRef.current = true;
      };
    }
    //}
  }, []);
  return {
    //isDesktop,
    article,
    tagValue,
    setArticle,
    editorRef,
    handlerEditorChange,
    handlerImageUpload,
    setTagValue,
    userRole,
  };
};

export default useWrite;
