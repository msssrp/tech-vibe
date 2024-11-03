import { ethers } from "ethers";
import { SetStateAction, useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import contractABI from "@/hardhat/artifacts/contracts/BlogCert.sol/BlogCertificate.json";
import { RPC_URLS } from "@/app/(main)/certificate/context/Certificate";
import { useSearchParams } from "next/navigation";

const useCertificate = (
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
  const [certificateData, setCertificateData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const contractAddress = getContractAddress(provider);
  const searchParams = useSearchParams();
  const search = searchParams.get("chain");

  useEffect(() => {
    switch (search) {
      case "avax":
        setProvider(RPC_URLS.avalanche);
        setCertificateData([]);
        break;
      case "polygon":
        setProvider(RPC_URLS.polygon);
        setCertificateData([]);
        break;
      default:
        setProvider(RPC_URLS.sepolia);
        setCertificateData([]);
        break;
    }
  }, [search]);

  useEffect(() => {
    if (!provider) return;
    const rpcProvider = new ethers.JsonRpcProvider(provider);
    const contract = new ethers.Contract(
      contractAddress,
      contractABI.abi,
      rpcProvider
    );
    const getCert = async () => {
      setIsLoading(true);
      try {
        const result = await contract.getAllCertificates();
        setCertificateData(result);
      } catch (error) {
        console.log(error);

        setCertificateData([]);
        notifications.show({
          title: "Certificate",
          message:
            "There is no certificate available on this chain, please switch to another chain",
          color: "orange",
        });
      } finally {
        setIsLoading(false);
      }
    };

    getCert();
  }, [provider]);

  const [certificateByName, setCertificateByName] = useState<string>("");

  const filterdCertificates = certificateData.filter((result) =>
    result[1].toLowerCase().includes(certificateByName.toLowerCase())
  );
  return {
    setCertificateByName,
    filterdCertificates,
    certificateByName,
    certificateData,
    isLoading,
  };
};

export default useCertificate;
