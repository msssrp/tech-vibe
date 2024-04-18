import { newComment } from "@/libs/actions/comment/comment";
import createSupabaseClient from "@/libs/supabase/client";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const useDrawerComment = (article_id: string) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [showInput, setShowInput] = useState(false);
  const [newCommentValue, setNewCommentValue] = useState("");
  const [newReply, setNewReply] = useState("");
  const [replyingTo, setReplyingTo] = useState<any>(null);
  const handleReply = (commentId: string) => {
    // If the same comment is clicked again, hide the reply input
    if (replyingTo === commentId) {
      setShowInput(false);
      setReplyingTo(null);
    } else {
      setShowInput(true); // Show the reply input
      setReplyingTo(commentId); // Set the comment being replied to
    }
  };
  const supabase = createSupabaseClient();
  const router = useRouter();
  useEffect(() => {
    const channel = supabase
      .channel("realtime comment")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comment",
          filter: `article_id=eq.${article_id}`,
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router, article_id]);

  const handleOnKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    reply: boolean,
    userId: string,
    commentParentId?: string
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedCommentValue = newCommentValue.trim();
      if (trimmedCommentValue !== "") {
        if (!reply) {
          await newComment(article_id, newCommentValue, userId);
          setNewCommentValue("");
        }
      } else {
        await newComment(article_id, newReply, userId, commentParentId);
        setNewReply("");
      }
    }
  };
  return {
    open,
    opened,
    close,
    handleReply,
    handleOnKeyDown,
    showInput,
    replyingTo,
    newComment,
    newCommentValue,
    setNewReply,
    setNewCommentValue,
    newReply,
  };
};

export default useDrawerComment;
