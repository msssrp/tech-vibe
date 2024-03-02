"use client";
import { SignOut } from "@/libs/actions/user/auth/auth";
import { useRouter } from "next/navigation";
import React from "react";

const LogOut = () => {
  const router = useRouter();
  const handlerSignOut = async () => {
    await SignOut();
    router.push("/");
    router.refresh();
  };
  return (
    <span className="text-red" onClick={handlerSignOut}>
      Log out
    </span>
  );
};

export default LogOut;
