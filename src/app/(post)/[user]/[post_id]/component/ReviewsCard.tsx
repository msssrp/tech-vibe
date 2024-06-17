import React from "react";
import { Avatar, Rating as RatingComp, Tooltip } from "@mantine/core";
import ImageGallery from "react-image-gallery";
import Image from "next/image";
import useReviewCard from "@/hook/useReviewCard";
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
  const {
    convertRating,
    convertedTime,
    handleImageClick,
    selectedImageIndex,
    images,
  } = useReviewCard(Timestamp, Rating, IpfsHash);

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
            <Tooltip key={index} label="click image again to close gallery">
              <div
                className="w-[220px] h-[150px] mt-4 cursor-pointer"
                key={index}
                onClick={() => handleImageClick(index)}>
                <Image
                  width={220}
                  height={150}
                  alt="web3-picture"
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
