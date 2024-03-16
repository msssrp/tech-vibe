import React from 'react'
import UserNavbar from "@/components/main/UserNavbar";
import { Metadata } from "next";
import Profile from './component/Profile';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Profile",
    description: "Profile",
  };
}

const page = () => {
  return (
    <div>
      <UserNavbar/>
      <Profile />
    </div>
  )
}

export default page;
