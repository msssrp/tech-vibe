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
          <div className="w-full pl-16">
            <textarea
              placeholder="Title"
              className="textarea input-lg w-full h-auto  focus:outline-none focus:border-none overflow-hidden px-0 text-4xl font-semibold capitalize resize-none"
            ></textarea>
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
