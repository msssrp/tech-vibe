"use client";
import { notifications } from "@mantine/notifications";
import { ethers } from "ethers";
import React, { useState } from "react";
import contractABI from "@/hardhat/artifacts/contracts/BlogCert.sol/BlogCertificate.json";
import CertificateCard from "../component/CertificateCard";
import SwitchNet from "@/components/web3/SwitchNet";
import { Textarea } from "@mantine/core";
import { certificateData } from "@/types/article/article";
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
const Page = () => {
  const [certificateId, setCertificateId] = useState<string>("");
  const [certificateHash, setCertificateHash] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [certificateData, setCertificateData] = useState<certificateData>({
    tokenId: "",
    ownerAddress: "",
    ipfsUrl: "",
    timestamp: 0,
  });
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setCertificateData({
      tokenId: "",
      ownerAddress: "",
      ipfsUrl: "",
      timestamp: 0,
    });
    if (!certificateId || !certificateHash) {
      setError("Please fill all the fields");
      return;
    }
    setError("");
    const ethereum = typeof window !== "undefined" && window.ethereum;
    if (ethereum) {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const from = accounts[0];
        const provider = new ethers.BrowserProvider(ethereum);
        const runner = await provider.getSigner(from);
        const contract = new ethers.Contract(
          contractAddress,
          contractABI.abi,
          runner
        );
        const checkCertificate = await contract.verifyCertificate(
          certificateId,
          certificateHash
        );
        if (checkCertificate) {
          const result = await contract.getCertificate(certificateId);
          notifications.show({
            title: "Certificate Verified",
            message: "Certificate is valid",
            color: "green",
          });
          setCertificateData({
            tokenId: result[0],
            ownerAddress: result[1],
            ipfsUrl: result[2],
            timestamp: result[3],
          });
        } else {
          notifications.show({
            title: "Invalid Certificate",
            message: "Certificate is not valid",
            color: "red",
          });
        }
      } catch (error: any) {
        console.log(error);
        if (error.code === "BAD_DATA") {
          return setError("Please verify mainnet connection and try again.");
        } else if (
          error.code === "UNSUPPORTED_OPERATION" ||
          error.code === "INVALID_ARGUMENT"
        ) {
          return setError(
            "Please check all the information ownser address should be 0x 42 chars long and certificate id should be a number"
          );
        }
        notifications.show({
          title: "Something went wrong",
          message: error.message,
          color: "red",
        });
      }
    } else {
      notifications.show({
        title: "Something went wrong",
        message:
          "Please check your mainnet connection. Make sure you are connected to Rei chain Network and try again.",
        color: "orange",
      });
    }
  };

  return (
    <div className="w-full h-screen container mx-auto mt-5 flex flex-col space-y-5">
      <SwitchNet />
      <form
        className="flex flex-col items-center space-y-4"
        onSubmit={handleVerify}
      >
        <h1 className="text-3xl font-bold">Verify Certificate</h1>
        <div className="w-1/3 space-y-3 flex flex-col">
          <div className="w-full flex flex-col space-y-4">
            <Textarea
              autosize
              label="Certificate ID"
              className="w-full"
              onChange={(e) => {
                setCertificateId(e.target.value);
                return setError("");
              }}
            />
            <Textarea
              autosize
              label="Certificate Hash"
              className="w-full"
              onChange={(e) => {
                setCertificateHash(e.target.value);
                return setError("");
              }}
            />
          </div>
        </div>

        {error && <p className="text-red">{error}</p>}
        <button
          className="bg-blue-500 text-white rounded-md p-2 mt-4"
          type="submit"
        >
          Verify
        </button>
      </form>
      {certificateData.tokenId && (
        <div className="flex items-center justify-center">
          <CertificateCard
            tokenId={certificateData.tokenId}
            ipfsUrlHash={certificateData.ipfsUrl}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
