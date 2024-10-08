import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import OauthButton from "@/components/authentication/OauthButton";
import { redirect } from "next/navigation";
import getUserSession from "@/libs/actions/user/auth/getSession";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sign In",
    description: "Sign In to our website",
  };
}
const page = async () => {
  const { data } = await getUserSession();
  if (data.user) {
    redirect("/");
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center -mt-2">
      <div className="flex flex-col justify-center items-center p-6 lg:w-1/2 xl:w-1/3">
        <h1 className="text-3xl mt-12 sm:mt-0 mb-8">Welcome back</h1>
        <div className="flex flex-col justify-center items-center w-full">
          <OauthButton />

          <div className="w-5/6 text-center mt-6">
            <span className="text-sm">
              Click “Sign In” to agree to TechVibe’s{" "}
              <Link href="/tos" className="underline">
                Terms of Service
              </Link>{" "}
              and acknowledge that TechVibe’s{" "}
              <Link href="/privacy" className="underline">
                Privacy Policy
              </Link>{" "}
              applies to you.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
