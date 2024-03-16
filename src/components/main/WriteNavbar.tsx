"use clinet";
import { profileItems } from "../ui/Items";
import Link from "next/link";
import { ScrollArea } from "@mantine/core";
import NotiTabs from "../ui/notifications/NotiTabs";
import LogOut from "../ui/LogOut";
import { userWriteProps } from "@/types/user/user";
import { articleProps } from "@/types/article/article";
import { updateArticleById } from "@/libs/actions/article/article";
import { useRouter } from "next/navigation";
import {
  articleNotification,
  rejectPublish,
} from "../ui/notifications/notification";
import { newTag } from "@/libs/actions/tag/tag";
import Image from "next/image";

const WriteNavbar: React.FC<userWriteProps & articleProps> = ({
  user,
  writeId,
  article,
  tagValue,
}) => {
  const router = useRouter();

  const handlerOnClick = async () => {
    if (
      !article.article_title ||
      !article.article_content ||
      !article.article_description ||
      !article.article_cover ||
      tagValue.length === 0
    ) {
      return rejectPublish("Error");
    }
    const updateArticle = { ...article, article_status: "pending" };
    await updateArticleById(writeId, updateArticle);
    articleNotification("Article Status", "publish", { router: router });
    await newTag(article.article_id, { tag_name: tagValue });
  };

  return (
    <nav className="border-b">
      <div className="navbar bg-base-100  container mx-auto">
        <div className="flex-1">
          <Link href={"/"}>
            <button type="button">
              <Image
                src="https://cqphjwakpkovcvrouaoz.supabase.co/storage/v1/object/public/Images/Logo/Screenshot%20from%202024-02-13%2016-07-12.png"
                width={50}
                height={50}
                alt="TechVibe"
                className="lg:ml-3 mr-2 lg:mr-5"
              />
            </button>
          </Link>
        </div>
        <div className="flex-none space-x-5">
          <div className="">
            <button
              onClick={handlerOnClick}
              className=" bg-green-600 py-1.5 px-4 rounded-full text-white">
              Publish
            </button>
          </div>
          <div className="dropdown dropdown-end">
            <div className="" tabIndex={0} role="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#9A9A9B"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                />
              </svg>
              <div
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-72 lg:w-80 overflow-auto relative h-screen"
                tabIndex={0}
                style={{ maxHeight: "calc(100vh - 4rem)" }}>
                <ScrollArea type="auto" scrollbarSize={8} offsetScrollbars>
                  <div className="p-2">
                    <span className="text-lg">Notifications</span>
                    <NotiTabs />
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  width={52}
                  height={52}
                  alt="Tech vibe user profile"
                  src={
                    user.user_profile
                      ? user.user_profile
                      : "https://cqphjwakpkovcvrouaoz.supabase.co/storage/v1/object/public/Images/Logo/Screenshot%20from%202024-02-13%2016-07-12.png"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <div className="border-b flex justify-stretch items-center">
                <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className=" w-9 rounded-full">
                    <Image
                      height={40}
                      width={40}
                      className="w-full"
                      alt="Tech vibe user profile"
                      src={
                        user.user_profile
                          ? user.user_profile
                          : "https://cqphjwakpkovcvrouaoz.supabase.co/storage/v1/object/public/Images/Logo/Screenshot%20from%202024-02-13%2016-07-12.png"
                      }
                    />
                  </div>
                </div>
                <div className="ml-2">
                  <span>{user.user_fullname}</span>
                </div>
              </div>
              {profileItems}
              <li className="border-t mt-2">
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#952124"
                    className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                  </svg>
                  <LogOut />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default WriteNavbar;
