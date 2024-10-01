"use client";
import {
  handlerFacebook,
  handlerGithub,
  handlerGoogle,
} from "@/libs/actions/user/auth/auth";
import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ImGithub } from "react-icons/im";
import { GiFox } from "react-icons/gi";
import { Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ethers } from "ethers";
import { notifications } from "@mantine/notifications";
const OauthButton = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [loginState, setLoginState] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");
  const [walletAddrValue, setWalletAddrValue] = useState("");
  const [nonceValue, setNonceValue] = useState("");
  const handleGoogleSignUp = async () => {
    await handlerGoogle();
  };
  const handlerGithubSignUp = async () => {
    await handlerGithub();
  };
  const handleFacebookSignUp = async () => {
    await handlerFacebook();
  };
  const handlerWeb3 = async () => {
    open();
    setLoginState("Connecting to your wallet...");

    if (!window.ethereum) {
      return setLoginState("Not Found MetaMask wallet... Please Install it");
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const walletAddr = await provider._getAddress(signer);

      setLoginState("Generating nonce...");
      const response = await fetch("/auth/nonce", {
        method: "POST",
        body: JSON.stringify({
          walletAddr,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const { nonce } = await response.json();
      const signature = await signer.signMessage(nonce);
      setLoginState("Verify signature...");
      const responseWallet = await fetch("/auth/wallet", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          walletAddr,
          nonce,
          signature,
        }),
      });
      const walletData = await responseWallet.json();

      setLoginState("Login...");
      setShowEmailInput(true);
      setNonceValue(walletData.nonce);
      setWalletAddrValue(walletData.walletAddr);
    } catch (error: any) {
      if (error) {
        if (error.reason === "rejected") {
          close();
          setShowEmailInput(false);
        }
      }
    }
  };

  const handleLoginWeb3 = async (
    nonce: string,
    walletAddr: string,
    email: string
  ) => {
    const loginResponse = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        nonce: nonce,
        walletAddr: walletAddr,
        email,
      }),
    });
    const data = await loginResponse.json();
    return data;
  };

  const handleSubmit = async () => {
    const resp = await handleLoginWeb3(nonceValue, walletAddrValue, email);
    setShowEmailInput(false);
    if (resp.error) {
      setLoginState(resp.error);
      return notifications.show({
        title: "Something went wrong",
        autoClose: false,
        message: resp.error,
        color: "red",
        onClose: () => {
          close();
          setEmail("");
        },
      });
    }
    setLoginState(resp.success);
    return notifications.show({
      title: "Success",
      message: resp.success,
      color: "green",
      onClose: () => {
        document.location.reload();
      },
    });
  };
  return (
    <>
      <button
        id="signin-google"
        onClick={handleGoogleSignUp}
        className="w-3/4 h-14 border flex justify-center items-center bg-[#F1F1F1] rounded-lg mb-3"
      >
        <div className="w-1/3 flex items-center justify-center">
          <FcGoogle className="w-8 h-8" />
        </div>
        <div className="flex items-center justify-start w-2/3">
          <span>Sign in with Google</span>
        </div>
      </button>

      <button
        onClick={handlerGithubSignUp}
        className="w-3/4 h-14 border flex justify-center items-center bg-[#F1F1F1] rounded-lg mb-3"
      >
        <div className="w-1/3 flex items-center justify-center">
          <ImGithub className="w-8 h-8" />
        </div>
        <div className="flex items-center justify-start w-2/3">
          <span>Sign in with Github</span>
        </div>
      </button>

      <button
        className="w-3/4 h-14 border flex justify-center items-center bg-[#F1F1F1] rounded-lg mb-3"
        onClick={handleFacebookSignUp}
      >
        <div className="w-1/3 flex items-center justify-center">
          <FaFacebook className="w-8 h-8" />
        </div>
        <div className="flex items-center justify-start w-2/3 ">
          <span>Sign in with Facebook</span>
        </div>
      </button>
      <div className="my-5">
        <h1>Or sign in with your wallet</h1>
      </div>
      <button
        onClick={handlerWeb3}
        className="w-3/4 h-14 border flex justify-center items-center bg-[#F1F1F1] rounded-lg mb-3 cursor-pointer"
      >
        <div className="w-1/3 flex items-center justify-center">
          <GiFox className="w-8 h-8" />
        </div>
        <div className="flex items-center justify-start w-2/3 ">
          <span>Sign in with Web3</span>
        </div>
      </button>
      <Modal
        opened={opened}
        onClose={close}
        title={loginState}
        withCloseButton={false}
      >
        {showEmailInput ? (
          <div className="flex items-center justify-center flex-col space-y-3">
            <p className="text-sm">
              If this is the first time login with this wallet please insert an
              email for login next time.
            </p>
            <TextInput
              label="Email"
              placeholder="please insert an email for sign in"
              type="email"
              size="sm"
              onChange={(e) => setEmail(e.target.value)}
              className="w-3/4"
            />
            <button
              className="px-2.5 py-1.5 bg-green-500 hover:bg-green-400 text-white rounded-xl"
              onClick={handleSubmit}
            >
              Confirm
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </>
  );
};

export default OauthButton;
