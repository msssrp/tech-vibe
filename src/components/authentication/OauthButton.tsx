"use client";
import React from "react";
import { handlerGithub, handlerGoogle } from "@/libs/actions/auth/auth";
const OauthButton = () => {
  const handleGoogleSignUp = async () => {
    await handlerGoogle();
  };
  const handlerGithubSignUp = async () => {
    await handlerGithub();
  };
  return (
    <>
      <button
        onClick={handleGoogleSignUp}
        className="w-3/4 h-14 border flex justify-center items-center bg-[#F1F1F1] rounded-lg mb-3">
        <div className="w-1/3 flex items-center justify-center">
          <img
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            alt=""
            className="w-10 h-10"
          />
        </div>
        <div className="flex items-center justify-start w-2/3">
          <span>Sign in with Google</span>
        </div>
      </button>

      <button
        onClick={handlerGithubSignUp}
        className="w-3/4 h-14 border flex justify-center items-center bg-[#F1F1F1] rounded-lg mb-3">
        <div className="w-1/3 flex items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt=""
            className="w-8 h-8"
          />
        </div>
        <div className="flex items-center justify-start w-2/3">
          <span>Sign in with Github</span>
        </div>
      </button>

      <button
        className="w-3/4 h-14 border flex justify-center items-center bg-[#F1F1F1] rounded-lg mb-3 cursor-not-allowed"
        disabled>
        <div className="w-1/3 flex items-center justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/480px-Facebook_Logo_%282019%29.png"
            alt=""
            className="w-8 h-8"
          />
        </div>
        <div className="flex items-center justify-start w-2/3 ">
          <span>Sign in with Facebook</span>
        </div>
      </button>
    </>
  );
};

export default OauthButton;
