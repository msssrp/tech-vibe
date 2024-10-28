import { Eip1193Provider, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import contractABI from "@/hardhat/artifacts/contracts/BlogCert.sol/BlogCertificate.json";
interface EthereumProvider extends Eip1193Provider {
  on: (event: string, callback: (chainId: string) => void) => void;
  removeListener: (event: string, callback: (chainId: string) => void) => void;
}
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
const useCertificate = () => {
  const [certificateData, setCertificateData] = useState<any[]>([]);
  const ethereum = (typeof window !== "undefined" &&
    window.ethereum) as EthereumProvider;
  useEffect(() => {
    const getCert = async () => {
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
          const result = await contract.getAllCertificates();
          setCertificateData(result);
        } catch (error) {
          setCertificateData([]);
          notifications.show({
            title: "Something went wrong",
            message:
              "Please check your mainnet connection. Make sure you are connected to Rei chain Network and try again.",
            color: "orange",
          });
        }
      }
    };

    getCert();

    const handleChainChanged = () => {
      getCert();
    };

    if (ethereum) {
      ethereum.on("chainChanged", handleChainChanged);
    }

    return () => {
      if (ethereum) {
        ethereum.removeListener("chainChanged", handleChainChanged);
      }
    };
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
