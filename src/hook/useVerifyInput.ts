import {
  getUserSocial,
  insertUserSocial,
  updateUserSocial,
} from "@/libs/actions/user/user_social";
import { updateFullname } from "@/libs/actions/user/userClient";
import { Inputs } from "@/types/article/article";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const useVerifyInput = (user_id: string) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<Inputs>();

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

  return {
    handleSubmit,
    register,
    onSubmit,
    isLoading,
  };
};

export default useVerifyInput;
