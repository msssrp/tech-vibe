import Link from "next/link";
import React from "react";
import { profileItems } from "../ui/Items";
import NotiTabs from "../ui/notifications/NotiTabs";
const UserNavbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <img
          src="https://cqphjwakpkovcvrouaoz.supabase.co/storage/v1/object/public/Images/Logo/Screenshot%20from%202024-02-13%2016-07-12.png"
          width={50}
          height={50}
          className="lg:ml-3 mr-2 lg:mr-5"
        />
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-20 md:w-72 bg-[#F5F4F5] border-none"
          />
        </div>
      </div>
      <div className="flex-none lg:mr-3">
        <Link href={"/write"} className="mr-4 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#C9C9C8"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          <span className="uppercase">write</span>
        </Link>
        <div className="dropdown dropdown-end">
          <div className="mr-4" tabIndex={0} role="button">
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
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-72 lg:w-80"
              tabIndex={0}>
              <div className="p-2">
                <span className="text-lg">Notifications</span>
                <NotiTabs />
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <div className="border-b flex justify-stretch items-center">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className=" w-9 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <div className="ml-2">
                <span>Heather McLeod</span>
              </div>
            </div>
            {profileItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
