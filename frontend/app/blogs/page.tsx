import type { Post } from '@/lib/types'
import { getAllPostsServer } from '@/lib/postsApi'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Pencil } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
//
// export const iframeHeight = '800px'
//
// export const description = 'A sidebar with a header and a search form.'

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function Page() {
  let posts: Post[] = []
  let error: string | null = null

  try {
    posts = await getAllPostsServer()
  } catch (err) {
    error =
      err instanceof Error
        ? err.message
        : 'An error occurred while fetching posts'
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
                    <span>{post.User?.name || 'Unknown'}</span>
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
    </>
  )
}
