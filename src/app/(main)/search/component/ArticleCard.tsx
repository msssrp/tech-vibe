import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Article {
  article_id: number;
  article_title: string;
  article_description: string;
  article_cover: string;
}

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    
    <>
    <div key={article.article_id} className="w-80 h-[22rem] flex flex-col space-y-1 mt-4">
      <div className="h-40 w-full mb-3">
        <Image
          src={article.article_cover}
          alt="test"
          className="w-full h-full  rounded-t-xl"
          height={160}
          width={320}
        />
      </div>
      {/* <Link
        className="flex items-center space-x-2 px-2"
        href={`/profile/${user.user_id}`}
      >
        <Image
          loading="lazy"
          width={20}
          height={20}
          alt={"User"}
          src={user.user_profile}
          className="w-5 h-5 rounded-full"
        />
        <h3 className="text-xs">{user.user_fullname}</h3>
        {userRole &&
          userRole.some((user) => user.user_role_name === "npru") && (
            <FaCircleCheck color="#952124" size={9} />
          )}
      </Link> */}
      <div className="px-2 w-full h-auto">
        <Link
          className="text-xl font-semibold line-clamp-2"
          href=""
        >
          {article.article_title}
        </Link>
      </div>
      <div className="px-2 h-10">
        <span className="text-[#606060] text-xs line-clamp-2">
          {article.article_description}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center">
          <div className="space-x-1 h-8 overflow-hidden w-full">
            {/* {tags &&
              tags.tag_name.map((tag: any, index: number) => {
                return (
                  <button
                    key={index}
                    className={`btn btn-sm badge bg-[#F2F2F2] rounded-full `}
                  >
                    <p className="font-thin">{tag}</p>
                  </button>
                );
              })} */}
          </div>
        </div>  
      </div>
    </div>
    </>
  );
};

export default ArticleCard;