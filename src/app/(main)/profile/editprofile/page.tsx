import React from "react";
import { Metadata } from "next";
import EditProfile from "./component/EditProfile";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Edit`,
    description: "TechVibe edit profile",
  };
}

const page = async () => {
  return (
    <div>
      <EditProfile />
    </div>
  );
};

export default page;
