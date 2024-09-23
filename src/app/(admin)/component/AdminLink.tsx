"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineManageAccounts } from "react-icons/md";
import { GiFox } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import { PiCertificateLight } from "react-icons/pi";
const links = [
  {
    link: "/admin-dashboard",
    label: "Manage account",
    icon: <MdOutlineManageAccounts size={25} />,
    textColor: "text-white",
  },
  {
    link: "/admin-dashboard/setting",
    label: "Settings",
    icon: <IoSettingsOutline size={25} />,
    textColor: "text-white",
  },
  {
    link: "/admin-dashboard/web3",
    label: "Web3 setting",
    icon: <GiFox size={25} />,
    textColor: "text-white",
  },
  {
    link: "/admin-dashboard/certificates",
    label: "Certificates",
    icon: <PiCertificateLight size={25} />,
    textColor: "text-white",
  },
  {
    link: "",
    label: "Log out",
    icon: <IoIosLogOut size={25} color="red" />,
    textColor: "text-[#F50403]",
  },
];
const AdminLink = () => {
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
      }}
    >
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

export default AdminLink;
