import { ipfsData } from "@/types/article/article";
import { Card, Image, Text } from "@mantine/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RPC_URLS } from "../context/Certificate";

const gateway_url = process.env.NEXT_PUBLIC_GATEWAY_URL as string;
type certificateProps = {
  tokenId: string;
  ipfsUrlHash: string;
  provider: string;
};

const CertificateCard: React.FC<certificateProps> = ({
  tokenId,
  ipfsUrlHash,
  provider,
}) => {
  const [certificateHashData, setCertificateHashData] = useState<ipfsData>({
    author: "",
    blogName: "",
    description: "",
    image: "",
    name: "",
    title: "",
  });
  const [linkProvider, setLinkProvider] = useState<string>("");

  useEffect(() => {
    switch (provider) {
      case RPC_URLS.avalanche:
        setLinkProvider("avax");
        break;
      case RPC_URLS.polygon:
        setLinkProvider("polygon");
        break;
      default:
        setLinkProvider("sepolia");
        break;
    }
  }, [provider]);

  useEffect(() => {
    const getIPFSData = async () => {
      const ipfsUrl = ipfsUrlHash;
      const cid = ipfsUrl.replace("ipfs://", "");
      const IPFSURI = `${gateway_url}/ipfs/${cid}`;
      const result = await fetch(IPFSURI);
      if (!result.ok) return console.log(result);
      const data = (await result.json()) as ipfsData;
      const imageCid = data.image.replace("ipfs://", "");
      setCertificateHashData({
        author: data.author,
        blogName: data.blogName,
        description: data.description,
        image: imageCid,
        name: data.name,
        title: data.title,
      });
    };
    getIPFSData();
  }, [tokenId]);

  return (
    <Card
      shadow="sm"
      padding="sm"
      component="a"
      className="w-96 h-[300px] mt-4 mr-10"
    >
      <Card.Section>
        <Image
          src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${certificateHashData.image}`}
          fit="fill"
          h={220}
          alt="No way!"
        />
      </Card.Section>
      <div className="flex flex-col items-start">
        <Text fw={500} size="lg" mt="md">
          {certificateHashData.author}
        </Text>

        <Link
          href={`/certificate/${tokenId}?chain=${linkProvider}`}
          className="text-blue-500"
        >
          More
        </Link>
      </div>
    </Card>
  );
};

export default CertificateCard;
