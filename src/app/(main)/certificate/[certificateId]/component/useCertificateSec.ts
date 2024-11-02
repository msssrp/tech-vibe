import { ethers } from "ethers";
import { useEffect, useState } from "react";
import contractABI from "@/hardhat/artifacts/contracts/BlogCert.sol/BlogCertificate.json";
import { certificateData, ipfsData } from "@/types/article/article";
import { RPC_URLS } from "../../context/Certificate";

const UseCertificateData = (certificateId: string, provider: string) => {
  const rpcProvider = new ethers.JsonRpcProvider(provider);
  const getContractAddress = (provider: string) => {
    let contractAddress;

    switch (provider) {
      case RPC_URLS.polygon:
        contractAddress = process.env
          .NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS as string;
        break;
      case RPC_URLS.avalanche:
        contractAddress = process.env
          .NEXT_PUBLIC_AVAX_CONTRACT_ADDRESS as string;
        break;
      default:
        contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
    }

    return contractAddress;
  };
  const contractAddress = getContractAddress(provider);
  const contract = new ethers.Contract(
    contractAddress,
    contractABI.abi,
    rpcProvider
  );
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

    getCertData();
  }, [provider]);
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
