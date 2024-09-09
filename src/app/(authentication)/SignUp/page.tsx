import OauthButton from "@/components/authentication/OauthButton";
import getUserSession from "@/libs/actions/user/auth/getSession";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sign up",
    description: "Sign up for write some article to our website",
  };
}
const page = async () => {
  const { data } = await getUserSession();
  if (data.user) {
    redirect("/");
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center -mt-16">
      <div className="flex flex-col justify-center items-center p-6 lg:w-1/2 xl:w-1/3">
        <h1 className="text-3xl mb-8">Join TechVibe</h1>
        <div className="flex flex-col justify-center items-center w-full">
          <OauthButton />

          <div className="w-3/4 text-center mt-7 mb-5">
            <span className="text-sm">
              Already have an account ?{" "}
              <Link
                href={"/SignIn"}
                className="text-[#952124] text-lg underline"
              >
                Sign In
              </Link>{" "}
            </span>
          </div>

          <div className="w-5/6 text-center mt-6">
            <span className="text-sm">
              Click “Sign up” to agree to TechVibe’s{" "}
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
