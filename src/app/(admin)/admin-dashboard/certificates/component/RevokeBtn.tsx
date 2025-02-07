import { ethers } from "ethers";
import React from "react";
import contractABI from "@/hardhat/artifacts/contracts/BlogCert.sol/BlogCertificate.json";
import { notifications } from "@mantine/notifications";
import { columnDefProps } from "@/types/article/article";
import { RPC_URLS } from "@/app/(main)/certificate/context/Certificate";
type RevokeBtnProps = {
  tokenId: number;
  setData: React.Dispatch<React.SetStateAction<columnDefProps[] | undefined>>;
  provider: string;
};

const RevokeBtn: React.FC<RevokeBtnProps> = ({
  tokenId,
  setData,
  provider,
}) => {
  const [isClicked, setIsClicked] = React.useState(false);
  const getContractAddress = () => {
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
  const revokeCertificate = async () => {
    try {
      setIsClicked(true);
      const ethereum = typeof window !== "undefined" && window.ethereum;
      if (ethereum) {
        const contractAddress = getContractAddress();
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
        try {
          await contract.revokeCertificate(tokenId);
          setData((prevData) =>
            prevData ? prevData.filter((item) => item.tokenId !== tokenId) : []
          );
        } catch (error: any) {
          console.log(error);
          if (error.code === "ACTION_REJECTED") {
            return notifications.show({
              title: "Rejected",
              message: `Transaction rejected by user`,
              color: "green",
            });
          }
          return notifications.show({
            title: "Something went wrong",
            message: `You are not the owner of this token`,
            color: "red",
          });
        } finally {
          setIsClicked(false);
        }
      }
    } catch (error) {
      console.log(error);

      notifications.show({
        title: "Something went wrong",
        message:
          "Please check your mainnet connection. Make sure you are connected to Rei chain Network and try again.",
        color: "orange",
      });
    } finally {
      setIsClicked(false);
    }
  };
  return (
    <button
      className="btn btn-sm bg-red text-white"
      onClick={() => revokeCertificate()}
      disabled={isClicked}
    >
      Revoke
    </button>
  );
};

export default RevokeBtn;
