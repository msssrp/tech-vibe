import { getUser } from "@/libs/actions/user/user";
import { redirect } from "next/navigation";
import React from "react";
import VerifyInput from "./component/VerifyInput";

export default async function page({ params }: { params: { userId: string } }) {
  if (!params.userId) {
    redirect("/");
  }
  const userData = await getUser(params.userId);
  if (userData?.user_verify == true) {
    redirect("/");
  }

  return (
    <div className="w-full h-auto sm:h-auto flex flex-col justify-center items-center p-4 sm:p-0 mt-8">
      <div className="flex flex-col justify-center items-center max-w-md sm:max-w-lg text-center">
        <span className="font-medium text-3xl">Almost there!</span>
        <span className="mt-3">
          Finish creating your account for the full Medium experience.
        </span>
      </div>
      <VerifyInput
        user_email={userData?.user_email}
        user_fullname={userData?.user_fullname}
        user_id={userData?.user_id}
      />
    </div>
  );
}
