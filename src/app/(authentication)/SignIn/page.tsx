import React from "react";
import { Metadata } from "next";
import Link from "next/link";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sign In",
    description: "Sign In to our website",
  };
}
const page = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center -mt-24">
      <div className="flex flex-col justify-center items-center p-6 lg:w-1/2 xl:w-1/3">
        <h1 className="text-3xl mb-8">Welcome back</h1>
        <div className="flex flex-col justify-center items-center w-full">
          <div className=" w-3/4 h-14 border flex bg-[#F1F1F1] rounded-lg mb-3">
            <div className="w-1/3 flex items-center justify-center">
              <img
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt=""
                className="w-10 h-10"
              />
            </div>
            <div className="flex items-center justify-start w-2/3">
              <span>Sign in with Google</span>
            </div>
          </div>

          <div className="w-3/4 h-14 flex bg-[#F1F1F1] rounded-lg mb-3">
            <div className="w-1/3 flex items-center justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt=""
                className="w-8 h-8"
              />
            </div>
            <div className="flex items-center justify-start w-2/3">
              <span>Sign in with Github</span>
            </div>
          </div>

          <div className="w-3/4 h-14 flex bg-[#F1F1F1] rounded-lg mb-3">
            <div className="w-1/3 flex items-center justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/480px-Facebook_Logo_%282019%29.png"
                alt=""
                className="w-8 h-8"
              />
            </div>
            <div className="flex items-center justify-start w-2/3 ">
              <span>Sign in with Facebook</span>
            </div>
          </div>

          <div className="w-5/6 text-center mt-6">
            <span className="text-sm">
              Click “Sign In” to agree to Medium’s{" "}
              <Link href="/tos" className="underline">
                Terms of Service
              </Link>{" "}
              and acknowledge that Medium’s{" "}
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
