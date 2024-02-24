"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { SignOut } from "@/libs/actions/auth";
const UserPage = () => {
  const router = useRouter();
  const handlerSignOut = async () => {
    await SignOut();
    router.push("/");
    router.refresh();
  };
  return (
    <div>
      UserPage
      <br />
      <button onClick={handlerSignOut}>Sign Out</button>
    </div>
  );
};

export default UserPage;
