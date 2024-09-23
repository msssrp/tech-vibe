import { ethers } from "ethers";
import React from "react";
import contractABI from "@/hardhat/artifacts/contracts/BlogReviewCert.sol/BlogReview.json";
import { notifications } from "@mantine/notifications";
import { columnDefProps } from "@/types/article/article";
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
type RevokeBtnProps = {
  tokenId: number;
  setData: React.Dispatch<React.SetStateAction<columnDefProps[] | undefined>>;
};

const RevokeBtn: React.FC<RevokeBtnProps> = ({ tokenId, setData }) => {
  const revokeCertificate = async () => {
    try {
      const ethereum = typeof window !== "undefined" && window.ethereum;
      if (ethereum) {
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
        }
      }
    } catch (error) {
      notifications.show({
        title: "Something went wrong",
        message:
          "Please check your mainnet connection. Make sure you are connected to Rei chain Network and try again.",
        color: "orange",
      });
    }
  };
  return (
    <button
      className="btn btn-sm bg-red text-white"
      onClick={() => revokeCertificate()}
    >
      Revoke
    </button>
  );
};

export default RevokeBtn;
