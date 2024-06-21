import React from "react";
import { Metadata } from "next";
import PublishedArticles from "./component/PublishedArticles";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Published Articles`,
    description: "TechVibe Published Articles",
  };
}

const page = () => {
  return (
    <div>
      <PublishedArticles />
    </div>
  );
};

export default page;
