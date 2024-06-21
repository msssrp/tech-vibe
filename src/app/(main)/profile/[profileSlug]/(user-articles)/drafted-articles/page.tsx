import React from "react";
import { Metadata } from "next";
import DraftedArticles from "./component/DraftedArticles";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Drafted articles`,
    description: "TechVibe Drafted articles",
  };
}

const page = () => {
  return (
    <div>
      <DraftedArticles />
    </div>
  );
};

export default page;
