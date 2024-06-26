import Carousel from "@/components/ui/home/Carousel";
import NewArticles from "@/components/ui/home/NewArticles";
import PopularArticles from "@/components/ui/home/PopularArticles";
import NpruAarticles from "@/components/ui/home/NpruAarticles";
import PopularTags from "@/components/ui/home/PopularTags";
import React from "react";
import HomepageTitle from "@/components/ui/home/HomepageTitle";
import { getArticles } from "@/libs/actions/article/article";
import { getCarousel } from "@/libs/actions/setting/webSetting";

const HomePage = async () => {
  const articles = await getArticles();
  const carousels = await getCarousel();
  return (
    <div>
      <HomepageTitle />
      <Carousel WebCarousels={carousels} />
      <PopularArticles />
      <NpruAarticles />
      <NewArticles />
      <PopularTags />
    </div>
  );
};

export default HomePage;
