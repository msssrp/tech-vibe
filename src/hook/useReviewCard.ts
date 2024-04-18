import React, { useState } from "react";

const useReviewCard = (
  Timestamp: bigint,
  Rating: bigint,
  IpfsHash: string[]
) => {
  const covertBigInt = Number(Timestamp);
  const date = new Date(covertBigInt * 1000);
  const convertRating = Number(Rating);
  const convertedTime = date.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "UTC",
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const images = IpfsHash.map((value) => ({
    original: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${value}`,
    thumbnail: `${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${value}`,
  }));

  const handleImageClick = (index: number) => {
    if (selectedImageIndex === index) {
      setSelectedImageIndex(null);
    } else {
      setSelectedImageIndex(index);
    }
  };
  return {
    convertedTime,
    convertRating,
    handleImageClick,
    selectedImageIndex,
    images,
  };
};

export default useReviewCard;
