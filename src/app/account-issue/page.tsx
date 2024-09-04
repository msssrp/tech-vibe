import Image from "next/image";
import React from "react";
import GobackBtn from "./component/GobackBtn";
import getUserSession from "@/libs/actions/user/auth/getSession";
import { redirect } from "next/navigation";
import { getUserActive } from "@/libs/actions/user/user";

const page = async () => {
  const { data } = await getUserSession();
  if (!data.user) return redirect("/");
  const userActiveStatus = await getUserActive(data.user.id);
  if (userActiveStatus && userActiveStatus.user_status === "active")
    return redirect("/");
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-800 font-bold text-2xl">
                Looks like you're account have been deleted
              </h1>
              <p className="my-2 text-gray-800">
                If you want to recovery your account, please contact our support
                at <b>admin.techvibe@gmail.com</b>
              </p>
              <GobackBtn />
            </div>
          </div>
          <div>
            <Image
              src="https://i.ibb.co/G9DC8S0/404-2.png"
              alt="404"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
      <div>
        <Image
          src="https://i.ibb.co/ck1SGFJ/Group.png"
          alt="404"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default page;
