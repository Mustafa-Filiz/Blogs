import type { Post } from "@/lib/types";
import { getAllPostsServer } from "@/lib/postsApi";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import PostItem from "@/components/post-item";

export default async function Page() {
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    posts = await getAllPostsServer();
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : "An error occurred while fetching posts";
  }

  return (
    <>
      {error ? (
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-destructive">Error: {error}</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-6">
            No blogs found. Be the first to create one!
          </p>
          <Button asChild size="lg">
            <Link href="/blogs/write">
              <Pencil className="mr-2 h-4 w-4" />
              Write the First Post
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
