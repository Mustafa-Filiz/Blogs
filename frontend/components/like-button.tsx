"use client";

import { useState } from "react";
import { likesApi } from "@/lib/likesApi";
import type { Like } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Heart } from "lucide-react";

export function LikeButton({
  targetId,
  type,
  likes,
  currentUserId,
  onOptimisticUpdate,
}: {
  targetId: number;
  type: "post" | "comment";
  likes: Like[] | undefined;
  currentUserId: number | null;
  onOptimisticUpdate: (targetId: number, type: "post" | "comment") => void;
}) {
  const [isLiking, setIsLiking] = useState(false);
  const isLiked = currentUserId
    ? likes?.some((like) => like.userId === currentUserId)
    : false;
  const likeCount = likes?.length || 0;

  const handleLike = async () => {
    if (!currentUserId) return;

    setIsLiking(true);
    const wasLiked = isLiked;

    // Optimistic update
    onOptimisticUpdate(targetId, type);

    try {
      if (type === "post") {
        if (wasLiked) {
          await likesApi.unlikePost(targetId);
        } else {
          await likesApi.likePost(targetId);
        }
      } else {
        if (wasLiked) {
          await likesApi.unlikeComment(targetId);
        } else {
          await likesApi.likeComment(targetId);
        }
      }
    } catch (error) {
      // Revert optimistic update on error
      onOptimisticUpdate(targetId, type);
      console.error("Failed to toggle like:", error);
    } finally {
      setIsLiking(false);
    }
  };

  if (type === "post") {
    return (
      <Button
        variant={isLiked ? "default" : "outline"}
        size="sm"
        onClick={handleLike}
        disabled={isLiking || !currentUserId}
        className="gap-2"
      >
        {isLiking ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
        )}
        <span>{likeCount}</span>
      </Button>
    );
  }

  return (
    <Button
      variant={isLiked ? "default" : "ghost"}
      size="sm"
      onClick={handleLike}
      disabled={isLiking || !currentUserId}
      className="gap-1"
    >
      {isLiking ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <Heart className={`h-3 w-3 ${isLiked ? "fill-current" : ""}`} />
      )}
      <span className="text-xs">{likeCount}</span>
    </Button>
  );
}
