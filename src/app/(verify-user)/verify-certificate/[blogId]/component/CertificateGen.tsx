"use client";
import React from "react";
import { toBlob } from "html-to-image";
import { ethers } from "ethers";

import contractABI from "@/reviewAbi.json";
import { Notifications, notifications } from "@mantine/notifications";
import Image from "next/image";
type certiProps = {
  userFullName: string;
  articleName: string;
};

const CertificateGen: React.FC<certiProps> = ({
  userFullName,
  articleName,
}) => {
  const hostName = typeof window !== "undefined" && window.location.origin;

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
  const onButtonClick = async () => {
    const contentHtml = document.getElementById("content");
    if (contentHtml) {
      toBlob(contentHtml).then(async function (blob) {
        if (blob) {
          const fileBuffer = await blob.arrayBuffer();
          const formData = new FormData();
          formData.append("file", new Blob([fileBuffer]));
          const uploadResponse = await fetch(
            `https://api.pinata.cloud/pinning/pinFileToIPFS`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
              },
              body: formData,
            }
          );
          const uploadData = await uploadResponse.json();

          if (uploadData.IpfsHash) {
            const ethereum = window.ethereum;
            const accounts = await ethereum.request({
              method: "eth_requestAccounts",
            });
            const from = accounts[0];
            const provider = new ethers.BrowserProvider(ethereum);
            const runner = await provider.getSigner(from);
            const contract = new ethers.Contract(
              contractAddress,
              contractABI,
              runner
            );

            // Upload metadata to Pinata
            const metadata = {
              name: `Certificate's ${articleName}`,
              description: `Certificate for 100 ups on ${articleName} blog`,
              image: `ipfs://${uploadData.IpfsHash}`,
            };
            const metadataBuffer = Buffer.from(JSON.stringify(metadata));
            const metadataFormData = new FormData();
            metadataFormData.append("file", new Blob([metadataBuffer]));
            const metadataUploadResponse = await fetch(
              "https://api.pinata.cloud/pinning/pinFileToIPFS",
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
                },
                body: metadataFormData,
              }
            );
            const metadataUploadData = await metadataUploadResponse.json();
            console.log(
              "Metadata uploaded to Pinata:",
              metadataUploadData.IpfsHash
            );

            const tx = await contract.mintCertificate(
              from,
              userFullName,
              "100 ups certificate",
              uploadData.IpfsHash,
              `ipfs://${metadataUploadData.IpfsHash}`,
              articleName
            );
            await tx.wait();
            console.log("Transaction hash:", tx.hash);

            notifications.show({
              title: "Success!",
              message: "Your certificate has been accepted!",
            });
          }
        } else {
          console.log("no blob");
        }
      });
    }
  };
  return (
    <>
      <Notifications />
      <div className="container mx-auto flex flex-col items-center justify-center space-y-7 mt-6">
        <div className="flex flex-col space-y-3 items-center">
          <span className="text-xl font-semibold">Congratulation 🎉🎉</span>
          <p className="font-semibold">{userFullName}</p>
          <span>youre blog</span>
          <span className="italic">{articleName}</span>
          <span>
            has reach 100 Ups heres is youre certificate by us click accept to
            get this certificate !!
          </span>
        </div>
        <div className="w-[560px] h-[400px] relative" id="content">
          <Image
            width={560}
            height={400}
            src={`${hostName}/images/certificateTechVibe.png`}
            alt="TechVibe-Certificate-Themeplate"
            className="w-full h-full"
          />
          <div className="absolute top-0 left-0 h-full w-full box-border">
            <h1 className="font-semibold text-xl mt-[103px] ml-[85px]">
              Creative of Author
            </h1>
            <p className="text-md font-semibold mt-[50px] ml-[60px]">
              {userFullName}
            </p>
          </div>
        </div>
        <button className="btn bg-green-500 text-white" onClick={onButtonClick}>
          Accept
        </button>
      </div>
    </>
  );
};

export default CertificateGen;
