import {
  removePreviousCarousel,
  updateWebCarouselUrl,
  uploadNewCarousel,
} from "@/libs/actions/setting/webSetting";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { PiNotePencilDuotone } from "react-icons/pi";
type carouselSettingProps = {
  carouselUrl: string;
  carouselId: string;
};
const imagesPath = process.env.NEXT_PUBLIC_IMAGES_PATH as string;
const CarouselSettingCard: React.FC<carouselSettingProps> = ({
  carouselUrl,
  carouselId,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelImage = () => {
    close();
    setSelectedImage(null);
  };

  const handleCarouselUpload = async () => {
    if (selectedFile) {
      const carouselPath = await uploadNewCarousel(selectedFile);

      if (carouselPath) {
        await updateWebCarouselUrl(carouselPath, carouselId);
        await removePreviousCarousel(carouselUrl);
        close();
        notifications.show({
          title: "updated",
          message: "Web carousel has been updated",
        });
      }
    }
  };

  const imageUrl = imagesPath + carouselUrl;
  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="uppercase text-xl font-semibold">
            <h1>change carousel</h1>
          </div>
          <div className="text-[#606060] text-sm">
            <span>Do you want to change the Carousel image?</span>
          </div>
          <div
            className="h-36 w-60 relative cursor-pointer"
            onClick={handleImageClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {selectedImage ? (
              <Image
                src={selectedImage as string}
                alt="Selected Image"
                height={240}
                width={128}
                className="w-full h-full rounded-xl"
              />
            ) : (
              <Image
                src={imageUrl}
                alt="Tech vibe carousel"
                width={240}
                height={128}
                className="w-full h-full rounded-xl"
              />
            )}
            <div className="absolute bottom-0 right-0">
              <PiNotePencilDuotone color="white" size={25} />
            </div>
          </div>
          <div className="flex items-center justify-center uppercase space-x-4">
            <button
              className="btn w-24 bg-white text-gray-500"
              onClick={handleCancelImage}
            >
              cancel
            </button>
            <button
              className="btn w-24 bg-green-400 text-white"
              onClick={handleCarouselUpload}
            >
              change
            </button>
          </div>
        </div>
      </Modal>
      <div
        className="h-24 w-44 relative mr-3 mb-3 cursor-pointer"
        onClick={open}
      >
        {selectedImage ? (
          <Image
            src={selectedImage as string}
            alt="Selected Image"
            height={240}
            width={128}
            className="w-full h-full rounded-xl"
          />
        ) : (
          <Image
            src={imageUrl}
            alt="Tech vibe carousel"
            width={240}
            height={128}
            className="w-full h-full rounded-xl"
          />
        )}

        <div className="absolute bottom-0 right-0">
          <PiNotePencilDuotone color="white" size={25} />
        </div>
      </div>
    </>
  );
};

export default CarouselSettingCard;
