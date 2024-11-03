import { ethers } from "ethers";
import { SetStateAction, useEffect, useState } from "react";
import contractABI from "@/hardhat/artifacts/contracts/BlogCert.sol/BlogCertificate.json";
import { certificateData } from "@/types/article/article";
import { RPC_URLS } from "../../context/Certificate";
import { useSearchParams } from "next/navigation";

const UseCertificateData = (
  certificateId: string,
  provider: string,
  setProvider: React.Dispatch<SetStateAction<string>>
) => {
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
      return "Invalid certificate ID";
    }
    return "An unexpected error occurred.";
  };

  const searchParams = useSearchParams();
  const search = searchParams.get("chain");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    switch (search) {
      case "avax":
        setProvider(RPC_URLS.avalanche);
        setCertData({
          tokenId: "",
          ownerAddress: "",
          ipfsUrl: "",
          timestamp: 0,
        });
        setError(null);
        break;
      case "polygon":
        setProvider(RPC_URLS.polygon);
        setCertData({
          tokenId: "",
          ownerAddress: "",
          ipfsUrl: "",
          timestamp: 0,
        });
        setError(null);
        break;
      default:
        setProvider(RPC_URLS.sepolia);
        setCertData({
          tokenId: "",
          ownerAddress: "",
          ipfsUrl: "",
          timestamp: 0,
        });
        setError(null);
        break;
    }
  }, [search]);

  useEffect(() => {
    if (!provider) return;
    setError(null);
    setCertData({
      tokenId: "",
      ownerAddress: "",
      ipfsUrl: "",
      timestamp: 0,
    });
    const rpcProvider = new ethers.JsonRpcProvider(provider);
    const contract = new ethers.Contract(
      contractAddress,
      contractABI.abi,
      rpcProvider
    );
    const getCertData = async () => {
      try {
        setIsLoading(true);
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
        setError(null);
      } catch (error: any) {
        setCertData({
          tokenId: "",
          ownerAddress: "",
          ipfsUrl: "",
          timestamp: 0,
        });
        setOwnerOfToken("");
        setError(handleError(error));
      }
    };

    getCertData();
  }, [provider, certificateId]);
  console.log(certData, ownerOfToken, error);

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
