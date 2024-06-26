"use client";
import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { carouselProps } from "@/types/setting/setting";

const imagesPath = process.env.NEXT_PUBLIC_IMAGES_PATH as string;
type carouselCompProps = {
  WebCarousels: carouselProps[] | null;
};

const Carousel: React.FC<carouselCompProps> = ({ WebCarousels }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 3000, align: "end", watchDrag: false },
    [Autoplay({ delay: 4500 })]
  );
  const [emblaRef_2, emblaApi_2] = useEmblaCarousel(
    {
      direction: "rtl",
      loop: true,
      duration: 3000,
      align: "center",
      watchDrag: false,
    },
    [Autoplay({ delay: 4500 })]
  );

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes());
    }
  }, [emblaApi, emblaApi_2]);

  const firstCarousel = WebCarousels && WebCarousels.slice(0, 8);
  const secondCarousel = WebCarousels && WebCarousels.slice(9, 16);
  return (
    <div className="space-y-4 mt-16">
      {/* Carousel_1 */}
      <div className="embla" dir="ltr">
        <div className="emble__viweport" ref={emblaRef}>
          <div className="embla__container">
            {firstCarousel &&
              firstCarousel.map((articleslist) => {
                return (
                  <div className="embla__slide px-2 h-52" key={articleslist.id}>
                    <div className="h-52 w-full object-cover">
                      <Image
                        height={200}
                        width={300}
                        src={imagesPath + articleslist.carousel_url}
                        alt={"Tech vibe carousel"}
                        className="h-full w-full rounded-3xl object-cover"
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* Carousel_2 */}
      <div className="embla" dir="rtl">
        <div className="emble__viweport" ref={emblaRef_2}>
          <div className="embla__container ">
            {secondCarousel &&
              secondCarousel.map((articleslist) => {
                return (
                  <div className="embla__slide px-2 h-52" key={articleslist.id}>
                    <div className="h-52 w-full object-cover">
                      <Image
                        height={200}
                        width={300}
                        src={imagesPath + articleslist.carousel_url}
                        alt={"Tech vibe carousel"}
                        className="h-full w-full rounded-3xl object-cover"
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
