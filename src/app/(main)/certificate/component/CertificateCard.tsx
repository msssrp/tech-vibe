import { ipfsData } from "@/types/article/article";
import { Card, Image, Text } from "@mantine/core";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type certificateProps = {
  tokenId: string;
  ipfsUrlHash: string;
};

const CertificateCard: React.FC<certificateProps> = ({
  tokenId,
  ipfsUrlHash,
}) => {
  const [certificateHashData, setCertificateHashData] = useState<ipfsData>({
    author: "",
    blogName: "",
    description: "",
    image: "",
    name: "",
    title: ""
  })
  useEffect(() => {
    const getIPFSData = async () => {
      const ipfsUrl = ipfsUrlHash

      const cid = ipfsUrl.replace("ipfs://", "")
      const IPFSURI = `https://ipfs.io/ipfs/${cid}`
      const result = await fetch(IPFSURI)
      if (!result.ok) return console.log(result.status)
      const data = await result.json() as ipfsData
      const imageCid = data.image.replace("ipfs://", "")
      setCertificateHashData({
        author: data.author,
        blogName: data.blogName,
        description: data.description,
        image: imageCid,
        name: data.name,
        title: data.title
      })
    }
    getIPFSData()
  }, [])

  return (
    <Card
      shadow="sm"
      padding="sm"
      component="a"
      className="w-96 h-[300px] mt-4 mr-10">
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

        <Link href={`/certificate/${tokenId}`} className="text-blue-500">
          More
        </Link>
      </div>
    </Card>
  );
};

export default CertificateCard;
