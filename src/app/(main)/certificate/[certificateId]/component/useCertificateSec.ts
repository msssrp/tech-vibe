import { ethers } from "ethers";
import { useEffect, useState } from "react";
import contractABI from "@/hardhat/artifacts/contracts/BlogCert.sol/BlogCertificate.json";
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

const useCertificateData = (certificateId: string, ethereum: any) => {
  const [certData, setCertData] = useState([]);
  const [tokenUrl, setTokenUrl] = useState("");
  const [ownerOfToken, setOwnerOfToken] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const handleError = (error: any): string => {
    if (error.code === "BAD_DATA") {
      return "Please verify mainnet connection.";
    } else if (error.code === "CALL_EXCEPTION") {
      window.location.href = "/";
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
        const tokenURI = await contract.tokenURI(certificateId);
        const tokenOwner = await contract.ownerOf(certificateId);

        setCertData(result);
        setTokenUrl(tokenURI);
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
    if (!error && certData.length) setIsLoading(false);
  }, [certData, error]);
  return {
    isLoading,
    contractAddress,
    certData,
    tokenUrl,
    ownerOfToken,
    error,
    currentUrl,
  };
};

export default useCertificateData;
