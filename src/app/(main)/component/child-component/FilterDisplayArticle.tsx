"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

type filterDisplayArticleProps = {
  tags: {
    tag_name: string;
  }[];
};

const FilterDisplayArticle: React.FC<filterDisplayArticleProps> = ({
  tags,
}) => {
  const [initTag, setInitTag] =
    useState<filterDisplayArticleProps["tags"]>(tags);
  const [selectTag, setSelectTag] =
    useState<filterDisplayArticleProps["tags"]>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tagOnParams = searchParams.get("tag");
  const params = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    if (tagOnParams) {
      const splitTag = tagOnParams.split("-");
      const tagArray: { tag_name: string }[] = splitTag.map((tag) => ({
        tag_name: tag,
      }));
      setSelectTag(tagArray);
      splitTag.map((tag) => {
        setInitTag((prevTag) => prevTag.filter((t) => t.tag_name !== tag));
      });
    }
  }, []);

  useEffect(() => {
    if (selectTag?.length === 0) {
      params.delete("tag");
      router.push(pathname + "?" + params.toString());
    }
  }, [selectTag, setSelectTag]);

  const handleSelectTag = useCallback(
    (tag: string) => {
      setSelectTag((prevTag) => [...(prevTag || []), { tag_name: tag }]);
      if (tagOnParams) {
        const joinTag = tagOnParams + "-" + tag;
        params.set("tag", joinTag);
        setInitTag((prevInitTag) =>
          prevInitTag.filter((t) => t.tag_name !== tag)
        );
        return params.toString();
      }
      params.set("tag", tag);
      setInitTag((prevInitTag) =>
        prevInitTag.filter((t) => t.tag_name !== tag)
      );
      return params.toString();
    },
    [searchParams]
  );

  const handleRemoveTag = useCallback(
    (tag: string) => {
      setInitTag((prevTag) => [...(prevTag || []), { tag_name: tag }]);
      if (tagOnParams) {
        const splitTag = tagOnParams.split("-");
        const filterParams = splitTag.filter((param) => param !== tag);
        const updateParams = filterParams.join("-");
        params.set("tag", updateParams);
        setSelectTag((prevTag) => prevTag?.filter((t) => t.tag_name !== tag));
        return params.toString();
      }
    },
    [searchParams]
  );

  const handleClickFollowing = useCallback(() => {
    params.set("article", "following");
    return params.toString();
  }, [searchParams]);

  const handleClickAllArticle = () => {
    params.delete("article");
    return router.push(pathname + "?" + params.toString());
  };
  return (
    <div className="flex items-center space-x-2 border-b px-2 sticky top-0 bg-base-100 z-10">
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-circle btn-ghost hover:bg-white "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.0}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-3 shadow bg-base-100 rounded-box w-96 flex flex-row"
        >
          {initTag.map((tag, index) => (
            <button
              key={index}
              className={`btn btn-sm rounded-full badge bg-[#F2F2F2] text-[15px] mx-1 my-0.5`}
              onClick={() => {
                router.push(pathname + "?" + handleSelectTag(tag.tag_name));
              }}
            >
              <p>{tag.tag_name}</p>
            </button>
          ))}
        </ul>
      </div>
      <div className="flex items-center border-r h-9">
        <div className="topic">
          <button
            className="btn btn-ghost w-28 px-2 text-md hover:bg-white text-[#606060] hover:text-black"
            onClick={() => handleClickAllArticle()}
          >
            All articles
          </button>
        </div>
        <div className="topic">
          <button
            className="btn btn-ghost px-2 hover:bg-white text-md text-[#606060] hover:text-black"
            onClick={() => router.push(pathname + "?" + handleClickFollowing())}
          >
            Following
          </button>
        </div>
      </div>

      <div className="selected-tag   line-clamp-1">
        {selectTag &&
          selectTag.map((tag, index) => (
            <button
              key={index}
              className={`btn btn-xs rounded-full badge bg-[#F2F2F2] text-black text-[13px] mr-1`}
              onClick={() => {
                router.push(pathname + "?" + handleRemoveTag(tag.tag_name));
              }}
            >
              <p>{tag.tag_name}</p>
            </button>
          ))}
      </div>
    </div>
  );
};

export default FilterDisplayArticle;
