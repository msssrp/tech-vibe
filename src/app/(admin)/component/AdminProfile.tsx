import getUserSession from "@/libs/actions/user/auth/getSession";
import { getUser } from "@/libs/actions/user/user";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

type adminProps = {
  totalUser: number | null;
};

const AdminProfile: React.FC<adminProps> = async ({ totalUser }) => {
  const user = await getUserSession();
  if (!user.data.user) return redirect("/");
  const userData = await getUser(user.data.user.id);

  return (
    <div className="flex items-center space-x-5 p-9">
      <div className="avatar">
        <div className="w-20 rounded-full">
          <Image
            width={120}
            height={120}
            src={userData ? userData.user_profile : ""}
            alt={"User"}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <h1 className="lg:text-2xl font-semibold">
          Welcome back, {userData.user_fullname}
        </h1>
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 hidden lg:block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>

          <span className="text-base-content">
            You have {totalUser} users to manage
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
