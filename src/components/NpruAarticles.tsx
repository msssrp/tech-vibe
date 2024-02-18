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
    <div className="bg-red text-center py-10 sm:py-16 ">
      <div className="flex flex-col justify-center items-center text-white space-y-2 sm:space-y-5">
        <h2 className="uppercase text-xl sm:text-4xl font-semibold ">
          Technology articles By NPRU
        </h2>
        <p className="w-full text-sm px-5 sm:px-16 sm:text-base ">
          Articles about technology and IT that come from authors from Nakhon
          Pathom Rajabhat University that will be useful for you
        </p>
      </div>
      <div className="flex justify-center mt-6 sm:mt-8 ">
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:mx-5 gap-2 space-y-5 sm:space-y-0">
          {populararticleslist.map((populararticles) => {
            return (
              <div key={populararticles.id} className="flex justify-center items-center mx-2 cursor-pointer ">
                <div className="card card-compact w-64 bg-base-100 shadow-xl ">
                  <figure>
                    <img
                      src={populararticles.image}
                      alt=""
                      className=""
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="text-lg font-semibold line-clamp-2">{populararticles.title}</h2>
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
    </div>
  );
};

export default NpruAarticles;
