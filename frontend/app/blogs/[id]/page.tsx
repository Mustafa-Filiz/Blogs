"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { postsApi } from "@/lib/postsApi";
import { commentsApi } from "@/lib/commentsApi";
import { likesApi } from "@/lib/likesApi";
import { authApi } from "@/lib/authApi";
import type { Post, Comment, User, Like } from "@/lib/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Send, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function LikeButton({
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

export default function PostDetailPage() {
  const params = useParams();
  const postId = Number(params.id);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentContent, setCommentContent] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Optimistic state management
  const [optimisticPost, setOptimisticPost] = useState<Post | null>(post);
  const [optimisticComments, setOptimisticComments] = useState<Comment[]>(comments);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [postResponse, commentsResponse, userResponse] = await Promise.all([
          postsApi.getPost(postId),
          commentsApi.getCommentsByPost(postId).catch(() => ({ data: [] })),
          authApi.getCurrentUser().catch(() => ({ data: { user: null } })),
        ]);

        if (postResponse.data) {
          setPost(postResponse.data);
          setOptimisticPost(postResponse.data);
        } else {
          setError(postResponse.message || "Failed to load post");
        }

        if (commentsResponse.data) {
          setComments(commentsResponse.data);
          setOptimisticComments(commentsResponse.data);
        } else {
          setComments([]);
          setOptimisticComments([]);
        }

        if (userResponse.data?.user) {
          setCurrentUser(userResponse.data.user);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [postId, setOptimisticPost, setOptimisticComments]);

  const handleOptimisticLikeUpdate = (
    targetId: number,
    type: "post" | "comment"
  ) => {
    if (type === "post" && optimisticPost) {
      const currentLikes = optimisticPost.Likes || [];
      const isLiked = currentLikes.some(
        (like) => like.userId === currentUser?.id
      );

      const updatedLikes = isLiked
        ? currentLikes.filter((like) => like.userId !== currentUser?.id)
        : [
            ...currentLikes,
            { id: Date.now(), userId: currentUser!.id } as Like,
          ];

      setOptimisticPost({
        ...optimisticPost,
        Likes: updatedLikes,
      });
    } else if (type === "comment") {
      const updatedComments = optimisticComments.map((comment) => {
        if (comment.id === targetId) {
          const currentLikes = comment.Likes || [];
          const isLiked = currentLikes.some(
            (like) => like.userId === currentUser?.id
          );

          const updatedLikes = isLiked
            ? currentLikes.filter((like) => like.userId !== currentUser?.id)
            : [
                ...(comment.Likes || []),
                { id: Date.now(), userId: currentUser!.id } as Like,
              ];

          return {
            ...comment,
            Likes: updatedLikes,
          };
        }
        return comment;
      });

      setOptimisticComments(updatedComments);
    }
  };

  const handleSubmitComment = async () => {
    if (!commentContent.trim() || !currentUser) return;

    setIsSubmittingComment(true);
    const tempComment: Comment = {
      id: Date.now(),
      content: commentContent,
      postId,
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      User: currentUser,
      Likes: [],
    };

    // Optimistic update
    setOptimisticComments([tempComment, ...optimisticComments]);
    setCommentContent("");

    try {
      const response = await commentsApi.createComment(postId, commentContent);
      if (response.data) {
        // Reload comments to get the real comment from server
        const commentsResponse = await commentsApi.getCommentsByPost(postId);
        if (commentsResponse.data) {
          setComments(commentsResponse.data);
          setOptimisticComments(commentsResponse.data);
        }
      }
    } catch (error) {
      // Revert optimistic update
      setOptimisticComments(comments);
      console.error("Failed to create comment:", error);
      alert("Failed to create comment. Please try again.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !optimisticPost) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertDescription>
            {error || "Post not found"}
          </AlertDescription>
        </Alert>
        <Button asChild className="mt-4">
          <Link href="/blogs">Back to Blogs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button asChild variant="outline" className="mb-6">
        <Link href="/blogs">← Back to Blogs</Link>
      </Button>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">{optimisticPost.title}</CardTitle>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold">By: </span>
              <span>{optimisticPost.User?.name || "Unknown"}</span>
              <span className="ml-4">
                {formatDate(optimisticPost.createdAt)}
              </span>
            </div>
            <LikeButton
              targetId={optimisticPost.id}
              type="post"
              likes={optimisticPost.Likes}
              currentUserId={currentUser?.id || null}
              onOptimisticUpdate={handleOptimisticLikeUpdate}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none whitespace-pre-wrap">
            {optimisticPost.content}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Comments</h2>

        {currentUser ? (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Textarea
                  placeholder="Write a comment..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleSubmitComment}
                    disabled={!commentContent.trim() || isSubmittingComment}
                  >
                    {isSubmittingComment ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Post Comment
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Alert>
            <AlertDescription>
              <Link href="/login" className="underline">
                Log in
              </Link>{" "}
              to post comments
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {optimisticComments.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            optimisticComments.map((comment) => (
              <Card key={comment.id}>
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
                      onOptimisticUpdate={handleOptimisticLikeUpdate}
                    />
                  </div>
                  <p className="whitespace-pre-wrap">{comment.content}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

