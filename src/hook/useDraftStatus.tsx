"use client";
import { useState, useEffect } from "react";

const useDraftStatus = () => {
  const [savedStatus, setSavedStatus] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSavedStatus(false);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array to run only once

  const saveDraft = (content: any) => {
    setSavedStatus(true);
  };

  return { savedStatus, saveDraft };
};

export default useDraftStatus;
