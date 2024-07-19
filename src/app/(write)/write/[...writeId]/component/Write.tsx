"use client";
import TinyEditor from "./TinyEditor";
import WriteNavbar from "@/components/main/WriteNavbar";
import { WriteProps } from "@/types/article/article";
import { TagsInput, Textarea } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import useWrite from "@/hook/useWrite";
const Write: React.FC<WriteProps> = ({
  user,
  writeId,
  isEdit,
  articleData,
  articleTag,
  webLogoUrl,
}) => {
  const {
    isDesktop,
    article,
    tagValue,
    setArticle,
    editorRef,
    handlerEditorChange,
    handlerImageUpload,
    setTagValue,
    userRole,
  } = useWrite(writeId, user, articleData && articleData, articleTag);

  if (isDesktop) {
    return (
      <div>
        <WriteNavbar
          user={user}
          writeId={writeId}
          article={article}
          tagValue={tagValue}
          userRole={userRole}
          webLogoUrl={webLogoUrl}
        />
        <div className="container mx-auto px-32 pt-10">
          <div className="flex items-center justify-center mt-10 divide-x">
            <div className="w-full pl-4 border-b">
              <Textarea id="input-title"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setArticle((prev: any) => ({
                    ...prev,
                    article_title: e.target.value,
                  }))
                }
                value={article.article_title}
                placeholder={
                  isEdit && articleData && articleData.article_title
                    ? article.article_title
                    : "Title"
                }
                className="w-full h-auto focus:outline-none focus:border-none px-0 text-xl font-semibold capitalize"
                autosize
                minRows={1}
                variant="unstyled"
                size="xl"
              />
              <Textarea id="input-description"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setArticle((prev: any) => ({
                    ...prev,
                    article_description: e.target.value,
                  }))
                }
                value={
                  article.article_description && article.article_description
                }
                placeholder={
                  isEdit && articleData && articleData.article_description
                    ? article.article_description
                    : "description"
                }
                className="w-full focus:outline-none focus:border-none px-0 text-md font-light capitalize"
                minRows={1}
                variant="unstyled"
                size="md"
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="container mx-auto px-32 border-none outline-none overflow-auto min-h-96">
            {isEdit && articleData ? (
              <TinyEditor
                editorRef={editorRef}
                handlerEditorChange={handlerEditorChange}
                handlerImageUpload={handlerImageUpload}
                initData={
                  articleData &&
                  articleData.article_content &&
                  article.article_content
                }
              />
            ) : (
              <TinyEditor
                editorRef={editorRef}
                handlerEditorChange={handlerEditorChange}
                handlerImageUpload={handlerImageUpload}
              />
            )}{" "}
          </div>
          <div className="container mx-auto px-32 border-none outline-none overflow-auto min-h-96">
            <TagsInput id="input-tag"
              className="w-1/3 "
              label="Press Enter to submit a tag"
              clearable
              placeholder="enter tag"
              value={tagValue.length > 0 ? tagValue : []}
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
          src={webLogoUrl}
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
