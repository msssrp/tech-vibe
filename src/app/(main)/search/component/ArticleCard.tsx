"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { articleProps } from "@/types/article/article";

type ArticleCardProps = {
  article: articleProps;
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="flex justify-center items-center text-center">
      <p className="text-2xl">{article.article_title}</p>
    </div>
 
  );
};

export default ArticleCard;
