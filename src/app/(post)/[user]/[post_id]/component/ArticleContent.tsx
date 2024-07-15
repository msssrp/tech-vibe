import React from "react";

import "../post.css";
type articleContentProps = {
  article: string;
};

const ArticleContent: React.FC<articleContentProps> = ({ article }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: article,
      }}
      className="pt-7"
    />
  );
};

export default ArticleContent;
