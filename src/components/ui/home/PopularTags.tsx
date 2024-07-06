import getAllTags from "@/libs/actions/tag/tag";
import Image from "next/image";
import Link from "next/link";
import React from "react";


const PopularTags = async () => {
  const tags = await getAllTags()
  const sliceTags = tags.slice(0, 6);
  return (
    <div className="bg-[#F1F1F1]">
      <div className="container mx-auto ">
        <div className="mt-6 sm:mt-10 py-10 sm:py-14">
          <div className="sm:ml-5 lg:ml-20">
            <h2 className="text-3xl sm:text-4xl text-center sm:text-left ">
              Popular Tags
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 md:px-20 lg:px-44 xl:px-60">
            {sliceTags.map((tag) => {
              return (
                <Link href="/SignIn"
                  key={tag.tag_name}
                  className="card bg-base-100 h-40 sm:h-48 drop-shadow-sm border rounded-md flex justify-center items-center cursor-pointer">
                  {/* <figure className="w-14 h-14">
                    <Image
                      height={56}
                      width={56}
                      src=""
                      alt="tag"
                    />
                  </figure> */}
                  <div className="">
                    <p className="text-center uppercase px-2">
                      {tag.tag_name}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularTags;
