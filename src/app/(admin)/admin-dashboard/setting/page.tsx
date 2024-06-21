import React from "react";
import SettingTab from "../../component/SettingTab";
import Image from "next/image";
import { BiCarousel } from "react-icons/bi";
const page = () => {
  return (
    <div className="flex flex-col space-y-4">
      {/*Tabs*/}
      <div className="flex flex-col">
        <SettingTab />
        <div className="min-h-screen bg-[#F4F2FB] p-14">
          <div className="flex items-start space-x-7">
            <div className="bg-white basis-1/4 h-96 rounded-lg flex items-center justify-center">
              <Image
                src={
                  "https://cqphjwakpkovcvrouaoz.supabase.co/storage/v1/object/public/Images/Logo/techvibe-logo.png"
                }
                width={550}
                height={550}
                alt="Tech Vibe"
                className="h-2/3 w-3/5"
              />
            </div>
            <div className="basis-2/3 bg-white h-52 flex items-center justify-center rounded-lg">
              <Image
                src={
                  "https://lordicon.com/icons/wired/gradient/1385-page-view-carousel.svg"
                }
                width={200}
                height={200}
                alt="carousel view"
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
