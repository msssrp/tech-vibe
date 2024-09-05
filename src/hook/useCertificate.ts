import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

import contractABI from "@/hardhat/artifacts/contracts/BlogReview.sol/BlogReview.json";
import { notifications } from "@mantine/notifications";
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
const useCertificate = () => {
  const [certificateData, setCertificateData] = useState<any[]>([]);
  const ethereum = typeof window !== "undefined" && window.ethereum;
  useEffect(() => {
    if (ethereum) {
      const getCert = async () => {
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
          const result = await contract.getAllCertificates();
          setCertificateData(result);
        } catch (error) {
          setCertificateData([]);
          notifications.show({
            autoClose: false,
            title: "Something went wrong",
            message:
              "Please check your MainNet connection Make sure you are connected to Sepolia Network and try again.",
            color: "orange",
          });
        }
      };
      getCert();
    }
  }, [ethereum]);

  const [certificateByName, setCertificateByName] = useState<string>("");

  const filterdCertificates = certificateData.filter((result) =>
    result[2].toLowerCase().includes(certificateByName.toLowerCase())
  );
  return {
    setCertificateByName,
    filterdCertificates,
    certificateByName,
    certificateData,
  };
};

export default useCertificate;
