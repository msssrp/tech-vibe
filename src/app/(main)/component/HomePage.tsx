import Carousel from "@/components/Carousel";
import NewArticles from "@/components/NewArticles";
import NpruAarticles from "@/components/NpruAarticles";
import PopularArticles from "@/components/PopularArticles";
import PopularTags from "@/components/PopularTags";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <div className="container mx-auto my-8 ">
        <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 ">
          <h2 className="text-5xl sm:text-6xl">Stay curious</h2>
          <p className="text-lg w-80 sm:w-96">
            Discover stories, thinking, and expertise from writers on any topic
          </p>
          <button className="btn bg-red text-white rounded-none uppercase px-5">
            Start Reading
          </button>
        </div>
      </div>
      <Carousel />
      <PopularArticles />
      <NpruAarticles />
      <NewArticles />
      <PopularTags />
    </div>
  );
};

export default HomePage;
