import { Eip1193Provider, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import contractABI from "@/hardhat/artifacts/contracts/BlogCert.sol/BlogCertificate.json";
import { notifications } from "@mantine/notifications";
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
interface EthereumProvider extends Eip1193Provider {
  on: (event: string, callback: (chainId: string) => void) => void;
  removeListener: (event: string, callback: (chainId: string) => void) => void;
}
const useMyCertificate = () => {
  const [certificateData, setCertificateData] = useState<any[]>([]);
  const ethereum = (typeof window !== "undefined" &&
    window.ethereum) as EthereumProvider;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const getCert = async () => {
      if (ethereum) {
        setIsLoading(true);
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
          const result = await contract.getCertificatesByOwner(from);
          setCertificateData(result);
        } catch (error) {
          setCertificateData([]);
          notifications.show({
            title: "Something went wrong",
            message:
              "Please check your mainnet connection. Make sure you are connected to Rei chain Network and try again.",
            color: "orange",
          });
        } finally {
          setIsLoading(false);
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
  return { isLoading, certificateData };
};

export default useMyCertificate;
