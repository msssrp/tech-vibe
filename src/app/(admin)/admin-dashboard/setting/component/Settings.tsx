"use client";
import {
  removePreviousLogo,
  updateWebLogoUrl,
  uploadNewLogo,
} from "@/libs/actions/setting/webSetting";
import { carouselProps } from "@/types/setting/setting";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { PiNotePencilDuotone } from "react-icons/pi";
import CarouselSettingCard from "./child-component/CarouselSettingCard";
type settingsProps = {
  webLogoUrl: string;
  carousels: carouselProps[] | null;
};

const imagesPath = process.env.NEXT_PUBLIC_IMAGES_PATH as string;

const Settings: React.FC<settingsProps> = ({ webLogoUrl, carousels }) => {
  const [logoOpened, { open: logoOpen, close: logoClose }] =
    useDisclosure(false);
  const [carouselOpened, { open: carouselOpen, close: carouselClose }] =
    useDisclosure(false);
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

  const handleLogoUpload = async () => {
    if (selectedFile) {
      const logoPath = await uploadNewLogo(selectedFile);
      console.log(selectedFile.type);

      if (logoPath) {
        await updateWebLogoUrl(logoPath);
        await removePreviousLogo(webLogoUrl);
        logoClose();
        notifications.show({
          title: "updated",
          message: "Web Logo has been updated",
          onClose: () => {
            document.location.reload();
          },
        });
      }
    }
  };
  return (
    <>
      <Modal
        opened={carouselOpened}
        onClose={carouselClose}
        withCloseButton={false}
        centered
        size={1600}
      >
        <div className="flex flex-col items-center justify-center space-y-5">
          <div className="uppercase font-semibold text-xl">
            <h1>change carousel</h1>
          </div>
          <div className="text-sm text-[#606060]">
            <span>Do you want to change the Carousel image?</span>
          </div>
          <div className="flex flex-wrap items-center justify-center">
            {carousels &&
              carousels.map((carousel) => (
                <CarouselSettingCard
                  carouselUrl={carousel.carousel_url}
                  carouselId={carousel.id}
                  key={carousel.id}
                />
              ))}
          </div>
          <div className="flex items-center justify-center uppercase space-x-4">
            <button
              className="btn w-36 bg-white text-gray-500"
              onClick={carouselClose}
            >
              close
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        opened={logoOpened}
        onClose={logoClose}
        withCloseButton={false}
        centered
      >
        <div className="flex flex-col justify-center items-center space-y-3">
          <div className="uppercase font-semibold">
            <h1>change logo</h1>
          </div>
          <div className="text-[#606060] text-sm">
            <span>Do you want to change the logo image?</span>
          </div>
          <div
            className="w-[150px] h-[150px] rounded-full border flex items-center justify-center relative cursor-pointer"
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
                height={100}
                width={100}
              />
            ) : (
              <Image
                src={imagesPath + webLogoUrl}
                alt="Tech vibe Logo"
                height={100}
                width={100}
              />
            )}

            <div className="absolute bottom-0 right-5">
              <PiNotePencilDuotone color="gray" size={20} />
            </div>
          </div>
          <div className="flex items-center justify-center uppercase space-x-4">
            <button
              className="btn w-24 bg-white text-gray-500"
              onClick={logoClose}
            >
              cancel
            </button>
            <button
              className="btn w-24 bg-green-400 text-white"
              onClick={handleLogoUpload}
            >
              change
            </button>
          </div>
        </div>
      </Modal>

      <div className="bg-white basis-1/4 h-96 rounded-lg flex items-center justify-center">
        <Image
          src={imagesPath + webLogoUrl}
          width={550}
          height={550}
          alt="Tech Vibe"
          className="h-2/3 w-3/5 cursor-pointer"
          onClick={logoOpen}
        />
      </div>
      <div
        className="basis-2/3 bg-white h-52 flex flex-col items-center justify-center rounded-lg cursor-pointer"
        onClick={carouselOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={0.6}
          stroke="currentColor"
          className="size-28"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
          />
        </svg>
        <div>Carousel</div>
      </div>
    </>
  );
};

export default Settings;
