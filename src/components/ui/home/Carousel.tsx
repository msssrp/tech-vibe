"use client";
import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const articleslist = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1546074177-ffdda98d214f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1546422904-90eab23c3d7e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1570179538662-faa5e38e9d8f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1510137221422-879a9f7d2ba0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1573167101669-476636b96cea?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1573167101669-476636b96cea?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 3000, align: "end" },
    [Autoplay({ delay: 2500 })]
  );
  const [emblaRef_2, emblaApi_2] = useEmblaCarousel(
    { direction: "rtl", loop: true, duration: 3000, align: "center" },
    [Autoplay({ delay: 2500 })]
  );

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes());
    }
  }, [emblaApi, emblaApi_2]);

  return (
    <div className="space-y-4 mt-16">
      {/* Carousel_1 */}
      <div className="embla" dir="ltr">
        <div className="emble__viweport" ref={emblaRef}>
          <div className="embla__container">
            {articleslist.map((articleslist) => {
              return (
                <div className="embla__slide px-2 h-52" key={articleslist.id}>
                  <div className="h-52 w-full object-cover">
                    <Image
                      height={300}
                      width={300}
                      src={articleslist.image}
                      alt={articleslist.image}
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
            {articleslist.map((articleslist) => {
              return (
                <div className="embla__slide px-2 h-52" key={articleslist.id}>
                  <div className="h-52 w-full object-cover">
                    <Image
                      height={300}
                      width={300}
                      src={articleslist.image}
                      alt={articleslist.image}
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
