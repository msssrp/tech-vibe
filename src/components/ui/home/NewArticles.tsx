import Image from "next/image";
import React from "react";

const articleslist = [
  {
    id: 1,
    title: "maintain security",
    description:
      "AI won’t replace designers, but designers who use AI will replace those who don’t. Similar to how calculators . Similar to how calculators were once thought to replace who don’t. Similar to how calculators were once thought to replace........",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Heather McLeod in Human Parts",
  },
  {
    id: 2,
    title: "maintain security",
    description:
      "AI won’t replace designers, but designers who use AI will replace those who don’t. Similar to how calculators . Similar to how calculators were once thought to replace who don’t. Similar to how calculators were once thought to replace........",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Heather McLeod in Human Parts",
  },
  {
    id: 3,
    title: "maintain security",
    description:
      "AI won’t replace designers, but designers who use AI will replace those who don’t. Similar to how calculators . Similar to how calculators were once thought to replace who don’t. Similar to how calculators were once thought to replace........",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Heather McLeod in Human Parts",
  },
  {
    id: 4,
    title: "maintain security",
    description:
      "AI won’t replace designers, but designers who use AI will replace those who don’t. Similar to how calculators . Similar to how calculators were once thought to replace who don’t. Similar to how calculators were once thought to replace........",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Heather McLeod in Human Parts",
  },
];

const NewArticles = () => {
  return (
    <div className="container mx-auto">
      <div className="py-10">
        <div className="sm:ml-5 lg:ml-20 ">
          <h2 className="text-3xl sm:text-4xl text-center sm:text-left">
            New articles
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 px-6 sm:px-16 md:px-20 lg:px-44">
          {articleslist.map((articleslist) => {
            return (
              <div key={articleslist.id}>
                <h2 className="card-title font-normal line-clamp-1 pr-6 mb-2 sm:md-6">
                  {articleslist.title}
                </h2>
                <div className="card card-side bg-base-100 drop-shadow-sm border rounded-md">
                  <figure className="h-44 sm:h-40 md:h-56 w-96 ">
                    <Image
                      src={articleslist.image}
                      alt={articleslist.title}
                      width={300}
                      height={200}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </figure>
                  <div className="text-sm py-2 px-2 md:px-3 lg:px-4 xl:px-6 w-96 md:w-4/5 flex justify-center items-center">
                    <p className="text-center line-clamp-6">
                      {articleslist.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewArticles;
