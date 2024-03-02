"use client";
import { updateFullname } from "@/libs/actions/user/user";
import {
  getUserSocial,
  insertUserSocial,
  updateUserSocial,
} from "@/libs/actions/user/user_social";
import { userProps } from "@/types/user/user";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DiGithubBadge } from "react-icons/di";
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

type Inputs = {
  fullname: string;
  github: string;
  facebook: string;
  twitter: string;
};
const VerifyInput: React.FC<userProps> = ({
  user_email,
  user_fullname,
  user_id,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<Inputs>();

  console.log(user_id);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(!isLoading);
    const updateError = await updateFullname(data.fullname, user_id);
    if (updateError.error) {
      return console.log("error from update name ", updateError.error);
    }

    const resp = await getUserSocial(user_id);

    if (resp.user_social) {
      const { error } = await updateUserSocial(
        data.facebook,
        data.github,
        data.twitter,
        user_id
      );
      if (error) {
        return console.log("error from update", error);
      }
      router.push("/");
      router.refresh();
    } else {
      const { error } = await insertUserSocial(
        data.facebook,
        data.github,
        data.twitter,
        user_id
      );
      if (error) {
        return console.log("error from insert", error);
      }
      router.push("/");
      router.refresh();
    }
  };
  return (
    <form className="w-full max-w-lg mt-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col justify-center items-center border-b ">
        <label className="text-[#747475] text-sm">Your Full name</label>
        <input
          type="text"
          defaultValue={user_fullname}
          {...register("fullname")}
          className="bg-white font-medium py-1 pl-1 w-full focus:outline-none focus:border-none"
        />
      </div>
      <div className="flex flex-col justify-center items-center mt-5 ">
        <label className="text-[#747475] text-sm">Your email</label>
        <span className="font-medium mt-3">{user_email}</span>
        <label className="text-[#747475] text-sm mt-5">
          Add your social media (optional)
        </label>
      </div>
      <div className="flex w-full mt-4">
        <DiGithubBadge size={50} className="mr-4" />
        <input
          type="text"
          placeholder="Github link"
          {...register("github")}
          className="bg-white border-b font-medium py-1 pl-1 w-full focus:outline-none "
        />
      </div>
      <div className="flex w-full mt-4">
        <FaFacebook size={50} className="mr-4" />
        <input
          type="text"
          placeholder="Github facebook"
          {...register("facebook")}
          className="bg-white border-b font-medium py-1 pl-1 w-full focus:outline-none "
        />
      </div>
      <div className="flex w-full mt-4">
        <RiTwitterXLine size={50} className="mr-4" />
        <input
          type="text"
          placeholder="Github twitter"
          {...register("twitter")}
          className="bg-white border-b font-medium py-1 pl-1 w-full focus:outline-none "
        />
      </div>
      <div className="flex justify-center items-center w-full">
        <button
          className={`py-1.5 px-4 bg-[#258816] rounded-3xl text-white mt-4 hover:bg-[#1D720C] ${
            isLoading && "bg-[#1D720C]"
          }`}>
          {isLoading ? "Creating account..." : "Create account"}
        </button>
      </div>
    </form>
  );
};

export default VerifyInput;
