import React from "react";
const populararticleslist = [
  {
    id: 1,
    title: "Ultimate ChatGPT cheatsheet for UX UI Designers: No Bullshit",
    description:
      "AI won’t replace designers, but designers who use AI will replace those who don’t. Similar to how....",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Heather McLeod in Human Parts",
  },
  {
    id: 2,
    title: "Ultimate ChatGPT cheatsheet for UX UI Designers: No Bullshit",
    description:
      "AI won’t replace designers, but designers who use AI will replace those who don’t. Similar to how....",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Heather McLeod in Human Parts",
  },
  {
    id: 3,
    title: "Ultimate ChatGPT cheatsheet for UX UI Designers: No Bullshit",
    description:
      "AI won’t replace designers, but designers who use AI will replace those who don’t. Similar to how....",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Heather McLeod in Human Parts",
  },
];
const NpruAarticles = () => {
  return (
    <div className="bg-red text-center py-10 sm:py-16">
      <div className="flex flex-col justify-center items-center text-white space-y-2 sm:space-y-5">
        <h2 className="uppercase text-xl sm:text-4xl font-semibold">
          Technology articles By NPRU
        </h2>
        <p className="w-full sm:w-1/2 text-sm px-8 sm:text-md sm:px-0">
          Articles about technology and IT that come from authors from Nakhon
          Pathom Rajabhat University that will be useful for you
        </p>
      </div>
      <div className="flex justify-center mt-6 sm:mt-8">
        <div className="flex flex-col md:flex-row space-y-5 sm:space-y-0">
          {populararticleslist.map((populararticles) => {
            return (
              <div className="flex justify-center items-center mx-2 cursor-pointer">
                <div className="card card-compact w-64 sm:w-72 h-64 sm:h-72  bg-base-100 shadow-xl ">
                  <figure>
                    <img
                      src={populararticles.image}
                      alt="Shoes"
                      className="w-full object-cover"
                    />
                  </figure>
                  <div className="card-body ">
                    <h2 className="card-title text-lg line-clamp-2">{populararticles.title}</h2>
                    <p className="line-clamp-2">
                      {populararticles.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default NpruAarticles;
