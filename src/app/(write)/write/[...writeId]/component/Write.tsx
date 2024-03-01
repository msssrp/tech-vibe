"use client";
import React, { useState } from "react";
import TinyEditor from "./TinyEditor";
import WriteNavbar from "@/components/main/WriteNavbar";
import useDraftStatus from "@/hook/useDraftStatus";

type WriteProps = {
  user: {
    user_id?: string;
    user_email?: string;
    user_fullname?: string;
    user_profile?: string;
    user_provider?: string;
    created_at?: string;
    updated_at?: string;
    user_verify?: boolean;
  };
  writeId: string;
};

const Write: React.FC<WriteProps> = ({ user, writeId }) => {
  return (
    <div>
      <WriteNavbar user={user} />
      <div className="container mx-auto px-32 py-10">
        <div className="flex items-center justify-center mt-10 divide-x">
          <div className="pr-2">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={0.5}
                stroke="#9A9A9B"
                className="w-12 h-12">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
          <div className="w-full pl-4">
            <input
              type="text"
              placeholder="Title"
              className="input input-lg w-full focus:outline-none focus:border-none px-0 text-4xl font-semibold capitalize"
            />
          </div>
        </div>
        <div className="mt-8">
          <TinyEditor writeId={writeId} />
        </div>
      </div>
    </div>
  );
};

export default Write;
