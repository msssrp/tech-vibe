import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

import contractABI from "@/hardhat/artifacts/contracts/BlogCert.sol/BlogCertificate.json";
import { useClipboard } from "@mantine/hooks";
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
const useCertificateSection = (certificateId: string) => {
  const [certData, setCertData] = useState([]);
  const [tokenUrl, setTokenUrl] = useState("");
  const [ownerOfToken, setOwnerOfToken] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const ethereum = typeof window !== "undefined" && window.ethereum;
  useEffect(() => {
    if (ethereum) {
      const getCertData = async () => {
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
          const result = await contract.getCertificate(certificateId);
          const tokenurl = await contract.tokenURI(certificateId);
          const tokenOwner = await contract.ownerOf(certificateId);
          setCertData(result);
          setTokenUrl(tokenurl);
          setOwnerOfToken(tokenOwner);
          setCurrentUrl(window.location.href);
          setIsLoading(false);
        } catch (error: any) {
          console.log(error.code);
          if (error.code === "BAD_DATA") {
            return setError("Please verify mainnet connection");
          }
        }
      };
      getCertData();
    }
  }, [ethereum, certificateId]);
  const gateway_url = process.env.NEXT_PUBLIC_GATEWAY_URL as string;
  const dateInt = Number(certData[6]);
  const certDate = new Date(dateInt * 1000);
  const yearCert = certDate.getUTCFullYear().toString();
  const fullDate = `${certDate.getUTCFullYear()}-${
    certDate.getUTCMonth() + 1
  }-${certDate.getUTCDate()}`;
  const clipboard = useClipboard({ timeout: 2000 });
  return {
    tokenUrl,
    ownerOfToken,
    currentUrl,
    isLoading,
    gateway_url,
    yearCert,
    fullDate,
    clipboard,
    certData,
    contractAddress,
    error,
  };
};

export default useCertificateSection;
