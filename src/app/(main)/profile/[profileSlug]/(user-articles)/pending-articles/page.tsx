import React from "react";
import { Metadata } from "next";
import PendingArticles from "./component/PendingArticles";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Pending articles`,
    description: "TechVibe Pending articles",
  };
}

const page = () => {
  return (
    <div>
      <PendingArticles />
    </div>
  );
};

export default page;
