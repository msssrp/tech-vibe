"use client";
import ManageArticle from "@/components/svg/ManageArticle";
import Link from "next/link";
import React, { useState } from "react";
import { GoReport } from "react-icons/go";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";
import { GiFox } from "react-icons/gi";
const links = [
  {
    link: "/manage",
    label: "Manage articles",
    icon: <ManageArticle />,
    textColor: "text-white",
  },
  {
    link: "/manage/complaint",
    label: "Complaint",
    icon: <GoReport size={25} />,
    textColor: "text-white",
  },
  {
    link: "",
    label: "Log out",
    icon: <IoIosLogOut size={25} color="red" />,
    textColor: "text-[#F50403]",
  },
];
const DashboardLink = () => {
  const [isActive, setIsActive] = useState("Manage articles");
  const link = links.map((item, index) => (
    <Link
      key={index}
      href={item.link}
      className={`btn border-none flex items-center justify-start hover:bg-base-content ${
        item.textColor
      } ${item.label === isActive ? "bg-base-content" : "bg-transparent"}`}
      onClick={() => {
        setIsActive(item.label);
      }}>
      {item.icon}
      {item.label}
    </Link>
  ));
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-[#7D88E9]">DASHBOARDS</h1>
      {link}
    </div>
  );
};

export default DashboardLink;
