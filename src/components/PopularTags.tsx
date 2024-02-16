import React from "react";
const tags = [
  {
    tags_id: "1",
    tags_name: "maintain security",
    tags_icon: "/images/home/tags/verified.png",
  },
  {
    tags_id: "2",
    tags_name: "database",
    tags_icon: "/images/home/tags/database.png",
  },
  {
    tags_id: "3",
    tags_name: "cloud",
    tags_icon: "/images/home/tags/computer.png",
  },
  {
    tags_id: "4",
    tags_name: "UX / UI",
    tags_icon: "/images/home/tags/ui.png",
  },
  {
    tags_id: "5",
    tags_name: "cloud",
    tags_icon: "/images/home/tags/computer.png",
  },
  {
    tags_id: "6",
    tags_name: "Development",
    tags_icon: "/images/home/tags/coding.png",
  },
];

const PopularTags = () => {
  return (
    <div className="my-12 bg-[#F1F1F1]">
      <div className="ml-24">
        <h2 className="text-4xl pt-11">Popular Tags</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-9 mx-10 px-60">
        {tags.map((tag) => {
          return (
            <div className="card bg-base-100 h-56 shadow-xl border rounded-md flex justify-center items-center">
              <figure>
                  <img
                    src={tag.tags_icon}
                    alt="tag"
                    className="w-14 h-14"
                  />
                </figure>
              <div className="mt-4">
                <p className="text-center uppercase ">{tag.tags_name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularTags;
