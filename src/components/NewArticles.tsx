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

const NewArticles = () => {
  return (
    <div className="my-10">
      <div className="ml-24">
        <h2 className="text-4xl ">New articles</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-9 mx-10 px-60">
        {populararticleslist.map((populararticles) => {
          return (
            <div className="card card-side bg-base-100 shadow-xl border rounded-md">
              <figure className="w-1/2">
                <img
                  src={populararticles.image}
                  alt="Shoes"
                  className="w-72 object-cover"
                />
              </figure>
              <div className="card-body w-1/2">
                <p>{populararticles.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewArticles;
