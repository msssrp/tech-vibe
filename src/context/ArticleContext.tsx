import {
  getAllArticleOnClient,
  getNpruArticleOnClient,
} from "@/libs/actions/article/article";
import { articleProps } from "@/types/article/article";
import { createContext, useEffect, useState } from "react";

export const ArticleContext = createContext<{
  articles: articleProps[];
  npruArticle: articleProps[];
  isLoading: boolean;
}>({ articles: [], npruArticle: [], isLoading: true });

export const ArticleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [articles, setArticle] = useState<articleProps[]>([]);
  const [npruArticle, setNpruArticle] = useState<articleProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getArticles = async () => {
      const articles = await getAllArticleOnClient();
      const npruArticle = await getNpruArticleOnClient();
      setArticle(articles);
      setNpruArticle(npruArticle);
      setIsLoading(false);
    };
    getArticles();
  }, []);
  return (
    <ArticleContext.Provider value={{ articles, npruArticle, isLoading }}>
      {children}
    </ArticleContext.Provider>
  );
};
