import { getPopularArticles } from "@/libs/actions/article/article";
import Image from "next/image";
import React from "react";


const PopularArticles:React.FC = async ({}) => {
  const popularArticles = await getPopularArticles(4);
  // const [itemsPerPage, setItemsPerPage] = useState(4);
  // const [currentPage, setCurrentPage] = useState(1);

  // const totalPages = Math.ceil(articles.length / itemsPerPage);

  // const sliceArticles = () => {
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = Math.min(startIndex + itemsPerPage, articles.length);
  //   return articles.slice(startIndex, endIndex);
  // };

  return (
    <div className="container mx-auto">
      <div className="sm:mt-8 py-10">
        <div className="sm:ml-5 lg:ml-20">
          <h2 className="text-3xl sm:text-4xl text-center sm:text-left">
            Popular articles
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6 sm:px-12 lg:px-40 xl:px-72 drop-shadow-md">
          {popularArticles &&
            popularArticles.map((articleslist) => {
              return (
                <div
                  key={articleslist.article_id}
                  className="flex justify-center cursor-pointer"
                >
                  <div className="card card-compact w-80 sm:w-[30rem] h-96 bg-base-100 drop-shadow-sm rounded-t-[50px] rounded-md border">
                    <figure className="w-full">
                      <Image
                        width={520}
                        height={520}
                        src={articleslist.article_cover}
                        alt="Article"
                        className="object-cover"
                      />
                    </figure>
                    <div className="card-body">
                      <span className="space-x-1 line-clamp-1">
                        <div
                          className={`badge bg-[#F2F2F2] text-[15px] py-3`}
                        ></div>
                      </span>
                      <h2 className="card-title">{articleslist.article_title}</h2>
                      <p className="line-clamp-2">{articleslist.article_description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="avatar items-center">
                          <div className="w-8 rounded-full">
                            <Image
                              width={32}
                              height={32}
                              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                              alt="Author"
                            />
                          </div>
                          <p className="ml-2">{}</p>
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

        <div className="text-center mt-8">
          {/* {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`mr-2 w-12 h-[5px] rounded-full ${
                index + 1 === currentPage ? "bg-red" : "bg-[#C8C2C2]"
              }`}
              onClick={() => setCurrentPage(index + 1)}></button>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default PopularArticles;
