"use client";
import { handlerGithub, handlerGoogle } from "@/libs/actions/user/auth/auth";
import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { Spotlight, spotlight, SpotlightActionData } from "@mantine/spotlight";
import { GiFox } from "react-icons/gi";
const OauthButton = () => {
  const actions: SpotlightActionData[] = [
    {
      id: "web3",
      label: "Sign in...",
      description: "Loading...",
    },
  ];
  const handleGoogleSignUp = async () => {
    await handlerGoogle();
  };
  const handlerGithubSignUp = async () => {
    await handlerGithub();
  };
  const handlerWeb3 = async () => {
    spotlight.open();
  };
  return (
    <>
      <button
        onClick={handleGoogleSignUp}
        className="w-3/4 h-14 border flex justify-center items-center bg-[#F1F1F1] rounded-lg mb-3">
        <div className="w-1/3 flex items-center justify-center">
          <FcGoogle className="w-8 h-8" />
        </div>
        <div className="flex items-center justify-start w-2/3">
          <span>Sign in with Google</span>
        </div>
      </button>

      <button
        onClick={handlerGithubSignUp}
        className="w-3/4 h-14 border flex justify-center items-center bg-[#F1F1F1] rounded-lg mb-3">
        <div className="w-1/3 flex items-center justify-center">
          <ImGithub className="w-8 h-8" />
        </div>
        <div className="flex items-center justify-start w-2/3">
          <span>Sign in with Github</span>
        </div>
      </button>

      <button
        className="w-3/4 h-14 border flex justify-center items-center bg-[#F1F1F1] rounded-lg mb-3 cursor-not-allowed"
        disabled>
        <div className="w-1/3 flex items-center justify-center">
          <FaFacebook className="w-8 h-8" />
        </div>
        <div className="flex items-center justify-start w-2/3 ">
          <span>Sign in with Facebook</span>
        </div>
      </button>

      <button
        onClick={handlerWeb3}
        className="w-3/4 h-14 border flex justify-center items-center bg-[#F1F1F1] rounded-lg mb-3 cursor-not-allowed"
        disabled>
        <div className="w-1/3 flex items-center justify-center">
          <GiFox className="w-8 h-8" />
        </div>
        <div className="flex items-center justify-start w-2/3 ">
          <span>Sign in with Web3</span>
        </div>
      </button>
      <Spotlight actions={actions}></Spotlight>
    </>
  );
};

export default OauthButton;
