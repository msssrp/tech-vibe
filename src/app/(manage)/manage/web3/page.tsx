"use client";
import {
  getCertificateUri,
  getUpvotesClient,
  updateCertificate,
  updateUpvotes,
} from "@/libs/actions/web3/web3";
import createSupabaseClient from "@/libs/supabase/client";
import { Indicator, Input } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const page = () => {
  const [certificateUri, setCertificateUri] = useState("");
  const [upvotes, setUpvotes] = useState<number>();
  const [newUpvotes, setNewUpvotes] = useState("");
  useEffect(() => {
    const getData = async () => {
      const certificate = await getCertificateUri();
      const upvote = await getUpvotesClient();
      setCertificateUri(certificate);
      setUpvotes(upvote);
    };
    getData();
  }, []);

  const handleFormUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const convertedNumber = Number(newUpvotes);
    const error = await updateUpvotes(convertedNumber);
    if (error) return console.log(error);
    notifications.show({
      title: "updated",
      message: "number of upvote has been updated",
    });
  };
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      const supabase = createSupabaseClient();
      const uuid = uuidv4();
      const { data, error } = await supabase.storage
        .from("Images")
        .upload(`web3/${uuid}`, file, {
          cacheControl: "3600",
          upsert: false,
        });
      if (error) return console.log(error.message);
      if (data.path) {
        const error = await updateCertificate(data.path);
        if (error) return console.log(error);
        notifications.show({
          title: "updated",
          message: "certificate template has been updated",
        });
      }
    }
  };

  const handleImageClick = () => {
    const fileInput = document.getElementById("imageInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="p-9 flex-col items-center">
      <div className="text-xl border-b py-3">Web3 setting</div>
      <div className="flex items-center justify-center">
        <form
          className="w-1/2 flex flex-col justify-start space-y-4"
          onSubmit={handleFormUpdate}>
          <div className="flex flex-col  space-y-1.5">
            <h1>Edit Certificate article on upvotes</h1>
            <Input
              variant="filled"
              placeholder={upvotes?.toString()}
              type="number"
              className="w-1/2"
              required
              onChange={(e) => setNewUpvotes(e.currentTarget.value)}
            />
            <span className="text-base-content text-xs">
              Number of upvotes that website will generate certificate for
              author default is: {upvotes}
            </span>
          </div>
          <button
            type="submit"
            className="btn w-24 h-10 bg-green-500 text-white">
            update
          </button>
        </form>
        <div
          className="flex flex-col space-y-4 cursor-pointer"
          onClick={handleImageClick}>
          <h1>Certificate template</h1>
          <Indicator inline label="Edit" size={25} position="bottom-start">
            <Image
              src={
                selectedImage ||
                `https://cqphjwakpkovcvrouaoz.supabase.co/storage/v1/object/public/Images/${certificateUri}`
              }
              alt=""
              height={200}
              width={400}
            />
          </Indicator>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
