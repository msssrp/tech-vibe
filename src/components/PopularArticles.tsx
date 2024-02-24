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
  {
    id: 4,
    title: "Ultimate ChatGPT cheatsheet for UX UI Designers: No Bullshit",
    description:
      "AI won’t replace designers, but designers who use AI will replace those who don’t. Similar to how....",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Heather McLeod in Human Parts",
  },
];

const tags = [
  { id: 1, text: "database", color: "bg-pink-300" },
  { id: 2, text: "UX/UI", color: "bg-yellow-400" },
  { id: 3, text: "Tester", color: "bg-blue-400" },
  { id: 4, text: "Development", color: "bg-green-400" },
];

const PopularArticles = () => {
  return (
    <div className="container mx-auto">
      <div className="my-6 sm:my-10 py-10 sm:py-14">
        <div className="sm:ml-5 lg:ml-20 ">
          <h2 className="text-3xl sm:text-4xl text-center sm:text-left ">
            Popular articles
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6 sm:px-12 lg:px-40 xl:px-72 drop-shadow-md">
          {populararticleslist.map((populararticles) => {
            return (
              <div
                key={populararticles.id}
                className="flex justify-center cursor-pointer "
              >
                <div className="card card-compact w-80 sm:w-[30rem] h-96 bg-base-100 drop-shadow-sm rounded-t-[50px] rounded-md border">
                  <figure>
                    <img
                      src={populararticles.image}
                      alt="Shoes"
                      className="w-full object-cover"
                    />
                  </figure>
                  <div className="card-body ">
                    <span className="space-x-1 line-clamp-1">
                      {tags.map((badge) => (
                        <div
                          key={badge.id}
                          className={`badge ${badge.color} text-white py-3`}
                        >
                          {badge.text}
                        </div>
                      ))}
                    </span>
                    <h2 className="card-title">{populararticles.title}</h2>
                    <p className="line-clamp-2">
                      {populararticles.description}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="avatar items-center ">
                        <div className="w-8 rounded-full">
                          <img
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            alt="Author"
                          />
                        </div>
                        <p className="ml-2">{populararticles.author}</p>
                      </div>
                      <a className="cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-6 h-6 stroke-blue-500"
                        >
                          <path d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                      </a>
                    </div>
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

export default PopularArticles;
