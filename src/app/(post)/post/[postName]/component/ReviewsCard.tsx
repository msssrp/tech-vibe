import React, { useEffect, useState } from "react";
import { Avatar, Rating as RatingComp, Tooltip } from "@mantine/core";
import ImageGallery from "react-image-gallery";
type reviewProps = {
  ReviewId: string;
  Timestamp: bigint;
  Reviewer: string;
  Title: string;
  Rating: bigint;
  IpfsHash: string[];
};

const ReviewsCard: React.FC<reviewProps> = ({
  ReviewId,
  Timestamp,
  Reviewer,
  Title,
  Rating,
  IpfsHash,
}) => {
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
  const [imageSrc, setImagesSrc] = useState<string[]>();
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
  return (
    <div className="h-auto flex flex-col space-y-4 py-6 border-t">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          <Avatar radius={"xl"} />
          <span>{Reviewer}</span>
        </div>
        <div className="flex items-center space-x-3">
          <div>{convertedTime}</div>
          <RatingComp value={convertRating} readOnly />
        </div>
      </div>

      <div className="p-5 outline-1 bg-[#F7F8F9]">
        <span className="text-black">{Title}</span>
      </div>

      <div className="flex items-center justify-center flex-wrap space-x-3">
        {IpfsHash &&
          IpfsHash.map((result, index) => (
            <Tooltip label="click image again to close gallery">
              <div
                className="w-[220px] h-[150px] mt-4 cursor-pointer"
                key={index}
                onClick={() => handleImageClick(index)}>
                <img
                  src={`${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${result}`}
                  className="w-full h-full"
                />
              </div>
            </Tooltip>
          ))}
      </div>
      {selectedImageIndex !== null && images && (
        <ImageGallery
          items={images}
          showFullscreenButton={false}
          showPlayButton={false}
          showThumbnails={false}
          startIndex={selectedImageIndex}
        />
      )}
    </div>
  );
};

export default ReviewsCard;
