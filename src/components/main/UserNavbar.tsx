"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NotiTabs from "../ui/notifications/NotiTabs";
import { getUser } from "@/libs/actions/user/user";
import { useUserStore } from "@/store/user";
import ProfileLoading from "../ui/ProfileLoading";
import NameLoading from "../ui/NameLoading";
import { ScrollArea } from "@mantine/core";
import { v4 as uuid } from "uuid";
import LogOut from "../ui/LogOut";
import getUserSession from "@/libs/actions/user/auth/getSession";
import Image from "next/image";
import ProfileItems from "../ui/ProfileItems";
import { notificationProps } from "@/types/notification/notification";
import createSupabaseClient from "@/libs/supabase/client";

type userNavbarProps = {
  notification: notificationProps[];
};

const UserNavbar: React.FC<userNavbarProps> = ({ notification }) => {
  const [uid, setUid] = useState("");
  const {
    updateUserState,
    updateLoading,
    user_fullname,
    user_profile,
    isLoading,
    user_id,
  } = useUserStore();
  const [notificationData, setNotificationData] =
    useState<notificationProps[]>(notification);
  const [userId, setUserId] = useState("");
  const supabase = createSupabaseClient();

  useEffect(() => {
    const getUserFromSupabase = async () => {
      const { data } = await getUserSession();
      if (data.user?.id) {
        const userData = await getUser(data.user?.id);
        updateUserState(userData);
        updateLoading(false);
        setUserId(data.user.id);
      }
    };
    setUid(uuid());
    getUserFromSupabase();
  }, [updateLoading, updateUserState]);

  supabase
    .channel("notification-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "notification" },
      (payload: any) => {
        setNotificationData((prevData) => {
          if (userId !== payload.new.user_id) return prevData;
          const index =
            Array.isArray(prevData) &&
            prevData.findIndex(
              (item) => item.notification_id === payload.new.notification_id
            );
          //-1 in array is not found
          if (index === -1) {
            return [...prevData, payload.new];
          } else {
            return (
              prevData &&
              prevData.map((item, i) => {
                if (i === index) {
                  return payload.new;
                }
                return item;
              })
            );
          }
        });
      }
    )
    .subscribe();
  return (
    <div className="navbar h-2 bg-base-100 border-b">
      <div className="flex-1">
        <Link href={"/"}>
          <button>
            <Image
              src="https://cqphjwakpkovcvrouaoz.supabase.co/storage/v1/object/public/Images/Logo/Screenshot%20from%202024-02-13%2016-07-12.png"
              width={40}
              alt="TechVibe"
              height={35}
              className="lg:ml-3 mr-2 lg:mr-5"
            />
          </button>
        </Link>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input h-10 rounded-xl input-bordered w-20 md:w-56 bg-[#F5F4F5] border-none"
          />
        </div>
      </div>
      <div className="flex-none lg:mr-3">
        <Link
          href={`/write/[uid]/[user_id]`}
          as={`/write/${uid}/${user_id}`}
          className="mr-4 flex items-center space-x-2.5">
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
          <span className="uppercase text-[#616160] text-xs">write</span>
        </Link>
        <div className="dropdown dropdown-end">
          <div className="mr-4 relative" tabIndex={0} role="button">
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
            {Array.isArray(notificationData) &&
              notificationData.some(
                (notification) => notification.notification_status === "unread"
              ) && (
                <>
                  <span className="absolute top-0 right-0 inline-flex rounded-full h-2.5 w-2.5 bg-red"></span>
                </>
              )}

            <div
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-72 lg:w-80 overflow-auto relative h-screen"
              tabIndex={0}
              style={{ maxHeight: "calc(100vh - 4rem)" }}>
              <ScrollArea type="auto" scrollbarSize={8} offsetScrollbars>
                <div className="p-2">
                  <span className="text-lg">Notifications</span>
                  <NotiTabs notification={notificationData} userId={user_id} />
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar">
            <div className="w-9 rounded-full">
              {isLoading ? (
                <ProfileLoading />
              ) : (
                <Image
                  alt="Tech vibe user profile"
                  src={user_profile ? user_profile : ""}
                  height={30}
                  width={30}
                  className="w-full"
                />
              )}
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-64">
            <div className="border-b flex justify-stretch items-center">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className=" w-9 rounded-full">
                  {isLoading ? (
                    <ProfileLoading />
                  ) : (
                    <Image
                      alt="Tech vibe user profile"
                      src={user_profile ? user_profile : ""}
                      height={40}
                      width={40}
                      className="w-full"
                    />
                  )}
                </div>
              </div>
              <div className="ml-2">
                {isLoading ? <NameLoading /> : <span>{user_fullname}</span>}
              </div>
            </div>
            <ProfileItems user_id={user_id} />
            <div className="border-t mt-4">
              <div className="flex mt-3 space-x-2 items-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#952124"
                  className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
                <LogOut />
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
