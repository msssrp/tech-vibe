import Link from "next/link";
import React from "react";
import { navItem } from "../ui/Items";
import Image from "next/image";
const Navbar = () => {
  return (
    <nav className="fixed  top-0 w-screen z-50 bg-white">
      <div className="flex justify-between items-center w-full uppercase h-20 ">
        <div className="flex">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <div
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 flex flex-col space-y-4">
              {navItem}
            </div>
          </div>
          <Link href={"/"}>
            <button type="button">
              <Image
                src="https://cqphjwakpkovcvrouaoz.supabase.co/storage/v1/object/public/Images/Logo/Screenshot%20from%202024-02-13%2016-07-12.png"
                alt="TechVibe"
                width={50}
                height={50}
                className="lg:ml-5"
              />
            </button>
          </Link>
          <div className="hidden lg:flex">
            <div className="menu menu-horizontal px-1 flex items-center space-x-6 ml-4">
              {navItem}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-full">
          <button className="h-full flex justify-center items-center mr-7">
            <Link
              href={"/SignIn"}
              className="bg-white text-[13px] lg:text-lg h-full w-full flex justify-center items-center">
              Login
            </Link>
          </button>
          <button className="bg-[#952124] h-full  flex justify-center items-center">
            <Link
              href={"/SignUp"}
              className=" text-white pl-7 pr-7 text-[13px] lg:text-lg w-full h-full flex justify-center items-center">
              get started
            </Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
