import React from "react";
import Profile from "../component/Profile";
import getUserSession from "@/libs/actions/user/auth/getSession";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getUserSession();
  if (!data.user) redirect("/");
  return (
    <div className="container mx-auto px-44">
      <div className="flex divide-x h-auto relative">
        {/* left */}
        <div className="w-2/3 py-10">
          {children}
        </div>
        {/* Right */}
        <Profile userId={data.user.id} sessionUserId={data.user.id} />
      </div>
    </div>
  );
}
