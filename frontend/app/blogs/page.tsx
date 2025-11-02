import { getAllPostsServer } from "@/lib/postsApi";
import type { Post } from "@/lib/types";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogsPage() {
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
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-4xl font-bold">All Blogs</h1>
        <Button asChild size="lg">
          <Link href="/write">
            <Pencil className="mr-2 h-4 w-4" />
            Write a Post
          </Link>
        </Button>
      </div>

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
            <Link href="/write">
              <Pencil className="mr-2 h-4 w-4" />
              Write the First Post
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow">
              <Link href={`/blogs/${post.id}`}>
                <CardHeader>
                  <CardTitle className="text-2xl line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grow">
                  <p className="text-muted-foreground line-clamp-4">
                    {post.content}
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-2 border-t pt-4">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold">Writer: </span>
                    <span>{post.User?.name || "Unknown"}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold">Date: </span>
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
