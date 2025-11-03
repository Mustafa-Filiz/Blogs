"use client";

import React from "react";
import type { Comment as CommentType, User } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { LikeButton } from "@/components/like-button";
import { formatDate } from "@/lib/utils";

export default function CommentItem({
  comment,
  currentUser,
  onOptimisticLike,
}: {
  comment: CommentType;
  currentUser: User | null;
  onOptimisticLike: (targetId: number, type: "post" | "comment") => void;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="font-semibold">
              {comment.User?.name || "Unknown"}
            </div>
            <div className="text-sm text-muted-foreground">
              {formatDate(comment.createdAt)}
            </div>
          </div>
          <LikeButton
            targetId={comment.id}
            type="comment"
            likes={comment.Likes}
            currentUserId={currentUser?.id || null}
            onOptimisticUpdate={onOptimisticLike}
          />
        </div>
        <p className="whitespace-pre-wrap">{comment.content}</p>
      </CardContent>
    </Card>
  );
}
