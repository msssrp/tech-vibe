import { ethers } from "ethers";
import { toBlob } from "html-to-image";

import contractABI from "@/hardhat/artifacts/contracts/Certificate.sol/Certificate.json";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateArticleClaimCertificate } from "@/libs/actions/article/article";
const useCertificateGen = (articleName: string, userFullName: string) => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
  const [loadingState, setLoadingState] = useState("Accept");
  const router = useRouter();
  const onButtonClick = async () => {
    const contentHtml = document.getElementById("content");
    if (contentHtml) {
      toBlob(contentHtml).then(async function (blob) {
        if (blob) {
          setLoadingState("generate certificate...");
          const fileBuffer = await blob.arrayBuffer();
          const formData = new FormData();
          formData.append("file", new Blob([fileBuffer]));
          const uploadResponse = await fetch(
            `https://api.pinata.cloud/pinning/pinFileToIPFS`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
              },
              body: formData,
            }
          );
          setLoadingState("upload certificate...");
          const uploadData = await uploadResponse.json();

          if (uploadData.IpfsHash) {
            try {
              setLoadingState("working at smartcontract...");
              const ethereum = window.ethereum;
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
              setLoadingState("almost done...");

              // Upload metadata to Pinata
              const metadata = {
                name: `Certificate's ${articleName}`,
                title: "Certificate of Merit for Engaging Content",
                blogName: articleName,
                author: userFullName,
                description: `Certificate for 100 ups on ${articleName} blog`,
                image: `ipfs://${uploadData.IpfsHash}`,
              };
              const metadataBuffer = Buffer.from(JSON.stringify(metadata));
              const metadataFormData = new FormData();
              metadataFormData.append("file", new Blob([metadataBuffer]));
              const metadataUploadResponse = await fetch(
                "https://api.pinata.cloud/pinning/pinFileToIPFS",
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
                  },
                  body: metadataFormData,
                }
              );
              const metadataUploadData = await metadataUploadResponse.json();

              setLoadingState("mint certificate...");

              // Interacting with the smart contract
              const tx = await contract.mintCertificate(
                from,
                `ipfs://${metadataUploadData.IpfsHash}`
              );

              await tx.wait();
              console.log("Transaction hash:", tx.hash);
              setLoadingState("success!!");
              await updateArticleClaimCertificate(articleName);
              notifications.show({
                title: "Success!",
                message: "Your certificate has been accepted!",
              });
              router.push("/certificate");
            } catch (error: any) {
              if (error.code === 4001) {
                // User rejected the transaction
                console.log("User rejected the transaction.");
                notifications.show({
                  title: "Transaction Rejected",
                  message: "You have rejected the certificate minting process.",
                  color: "red",
                });
                setLoadingState("Transaction rejected by user");
              } else {
                console.log("An error occurred:", error);
                setLoadingState("An error occurred. Please try again.");
              }
            }
          }
        } else {
          console.log("no blob");
        }
      });
    }
  };

  return {
    onButtonClick,
    loadingState,
  };
};

export default useCertificateGen;
