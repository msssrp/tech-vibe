"use client";
import TinyEditor from "./TinyEditor";
import WriteNavbar from "@/components/main/WriteNavbar";
import { WriteProps } from "@/types/article/article";
import { useEditorStore } from "@/store/article";

const Write: React.FC<WriteProps> = ({ user, writeId }) => {
  const { article, updateArticle } = useEditorStore((state) => ({
    updateArticle: state.updateArticle,
    article: state.article,
  }));

  const handlerOnchangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateArticle({ ...article, article_title: e.target.value });
  };
  const handlerOnchangeDesc = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateArticle({ ...article, article_description: e.target.value });
  };
  return (
    <div>
      <WriteNavbar user={user} />
      <div className="container mx-auto px-32 py-10">
        <div className="flex items-center justify-center mt-10 divide-x">
          <div className="w-full pl-4 border-b">
            <textarea
              onChange={(e) => handlerOnchangeTitle(e)}
              placeholder="Title"
              className="textarea input-lg w-full h-auto  focus:outline-none focus:border-none overflow-hidden px-0 text-4xl font-semibold capitalize resize-none"
            />
            <textarea
              onChange={(e) => handlerOnchangeDesc(e)}
              placeholder="description"
              className="textarea input-sm w-full h-auto  focus:outline-none focus:border-none overflow-hidden px-0 text-xl font-light capitalize resize-none"
            />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <TinyEditor
          writeId={writeId}
          title={article.article_title}
          description={article.article_description}
          user_id={user.user_id}
        />
      </div>
    </div>
  );
};

export default Write;
