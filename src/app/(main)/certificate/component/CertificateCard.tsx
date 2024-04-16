import { Card, Image, Text } from "@mantine/core";
import { create } from "ipfs-http-client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type certificateProps = {
  tokenId: string;
  ownerAddress: string;
  ownerName: string;
  certificateTitle: string;
  certificateImageHash: string;
};

const CertificateCard: React.FC<certificateProps> = ({
  tokenId,
  ownerAddress,
  ownerName,
  certificateTitle,
  certificateImageHash,
}) => {
  return (
    <Card
      shadow="sm"
      padding="sm"
      component="a"
      className="w-96 h-[300px] mt-4 mr-10">
      <Card.Section>
        <Image
          src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${certificateImageHash}`}
          fit="fill"
          h={220}
          alt="No way!"
        />
      </Card.Section>
      <div className="flex flex-col items-start">
        <Text fw={500} size="lg" mt="md">
          {ownerName}
        </Text>

        <Link href={`/certificate/${tokenId}`} className="text-blue-500">
          More
        </Link>
      </div>
    </Card>
  );
};

export default CertificateCard;
