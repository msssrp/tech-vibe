"use client";
import TinyEditor from "./TinyEditor";
import WriteNavbar from "@/components/main/WriteNavbar";
import { WriteProps, articleProps } from "@/types/article/article";
import { TagsInput } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import useWrite from "@/hook/useWrite";
const Write: React.FC<WriteProps> = ({ user, writeId }) => {
  const {
    isDesktop,
    article,
    tagValue,
    setArticle,
    editorRef,
    handlerEditorChange,
    handlerImageUpload,
    setTagValue,
  } = useWrite(writeId, user);

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
