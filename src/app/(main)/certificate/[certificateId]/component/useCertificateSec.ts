import { ethers } from "ethers";
import { useEffect, useState } from "react";
import contractABI from "@/hardhat/artifacts/contracts/BlogCert.sol/BlogCertificate.json";
import { certificateData, ipfsData } from "@/types/article/article";
import { useRouter } from "next/router";
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

const UseCertificateData = (certificateId: string, ethereum: any) => {
  const [certData, setCertData] = useState<certificateData>({
    tokenId: "",
    ownerAddress: "",
    ipfsUrl: "",
    timestamp: 0,
  });
  const [ownerOfToken, setOwnerOfToken] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const handleError = (error: any): string => {
    if (error.code === "BAD_DATA") {
      return "Please verify mainnet connection.";
    } else if (error.code === "CALL_EXCEPTION") {
      window.location.href = "/certificate";
      return "Redirecting...";
    }
    return "An unexpected error occurred.";
  };
  useEffect(() => {
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
        const tokenOwner = await contract.ownerOf(certificateId);

        setCertData({
          tokenId: result[0],
          ownerAddress: result[1],
          ipfsUrl: result[2],
          timestamp: result[3],
        });
        setOwnerOfToken(tokenOwner);
        setCurrentUrl(window.location.href);
      } catch (error: any) {
        setError(handleError(error));
      }
    };

    if (ethereum && certificateId) {
      getCertData();
    }
  }, [ethereum, certificateId]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!error && certData) setIsLoading(false);
  }, [certData, error]);
  return {
    setIsLoading,
    isLoading,
    contractAddress,
    certData,
    ownerOfToken,
    error,
    currentUrl,
  };
};

export default UseCertificateData;
