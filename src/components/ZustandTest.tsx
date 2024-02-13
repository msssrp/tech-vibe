"use client";
import { useUserStore } from "@/store/user";
import React, { useEffect, useState } from "react";

const Test = () => {
  const [userName, setUserName] = useState<string>("first");
  useEffect(() => {
    const sub = useUserStore.subscribe((state) => {
      setUserName(state.firstName);
    });
    return sub;
  }, [userName]);
  console.log("change");

  return <div>{userName}</div>;
};

export default Test;
