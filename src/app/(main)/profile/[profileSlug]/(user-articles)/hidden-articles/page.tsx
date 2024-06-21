import React from "react";
import { Metadata } from "next";
import HiddenArticles from "./component/HiddenArticles";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Hidden articles`,
    description: "TechVibe Hidden articles",
  };
}

const page = () => {
  return (
    <div>
      <HiddenArticles />
    </div>
  );
};

export default page;
