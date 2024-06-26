import getUserSession from "@/libs/actions/user/auth/getSession";
import { getTotalUser, getUser } from "@/libs/actions/user/user";
import { getUserRoleOnServer } from "@/libs/actions/user/user_role";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

import { Metadata } from "next";
import AdminLink from "./component/AdminLink";
import AdminProfile from "./component/AdminProfile";
import { getWebLogoUrl } from "@/libs/actions/setting/webSetting";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Admin Dashboard",
    description: "admin dashboard",
  };
}
const imagesPath = process.env.NEXT_PUBLIC_IMAGES_PATH as string;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getUserSession();
  if (!data.user) return redirect("/SignIn");
  const userData = await getUser(data.user.id);
  const userRole = await getUserRoleOnServer(data.user.id);
  if (!userRole) return redirect("/");
  if (userRole.every((user) => user.user_role_name !== "admin"))
    return redirect("/");
  const totalUser = await getTotalUser();
  const webLogoUrl = await getWebLogoUrl();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="flex justify-start items-center drawer-button lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
          </svg>
        </label>
        <AdminProfile totalUser={totalUser} />
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex flex-col space-y-9 menu p-4 w-80 min-h-full bg-[#101629] text-base-content">
          <div className="flex justify-between items-center">
            <Link href={"/"}>
              <button>
                <Image
                  src={imagesPath + webLogoUrl}
                  width={40}
                  alt="TechVibe"
                  height={35}
                  className="lg:ml-3 mr-2 lg:mr-5"
                />
              </button>
            </Link>
            <div className="flex items-center space-x-3">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                  />
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/*profile*/}
          <div className="profile text-center space-y-4 w-full">
            <div className="avatar">
              <div className="w-28 rounded-full">
                <Image
                  width={120}
                  height={120}
                  src={userData ? userData.user_profile : ""}
                  alt={"User"}
                />
              </div>
            </div>

            <h2 className="text-xl text-white">{userData?.user_fullname}</h2>

            <h1 className="text-white">{userData.user_email}</h1>
            <div className="social flex justify-center items-center space-x-3">
              <Link href="">
                <FaGithub className="w-6 h-6" color="white" />
              </Link>
              <Link href="">
                <FaFacebook className="w-6 h-6 text-[#1877F2]" />
              </Link>
              <Link href="">
                <FaSquareXTwitter className="w-6 h-6" color="white" />
              </Link>
            </div>
          </div>
          {/*dashboard*/}
          <AdminLink />
        </div>
      </div>
    </div>
  );
}
