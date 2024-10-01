"use client";
import { SignOut } from "@/libs/actions/user/auth/auth";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import React from "react";

const GobackBtn = () => {
  const router = useRouter();
  const handleGoBack = async () => {
    notifications.show({
      title: "Sign out",
      message: "Signing out you will be redirected to the home page",
      color: "orange",
    });
    await SignOut();
    router.push("/");
  };
  return (
    <button
      onClick={handleGoBack}
      className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
    >
      Go back home
    </button>
  );
};

export default GobackBtn;
