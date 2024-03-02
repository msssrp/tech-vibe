import React from "react";

const HomepageTitle = () => {
  return (
    <div className="container mx-auto my-8 mt-28">
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
  );
};

export default HomepageTitle;
