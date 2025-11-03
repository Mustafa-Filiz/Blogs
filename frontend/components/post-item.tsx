import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Post } from '@/lib/types'
import { formatDate } from '@/lib/utils'

type Props = {
  post: Post
}

function PostItem({ post }: Props) {
  return (
    <Card key={post.id} className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow">
      <Link href={`/blogs/${post.id}`}>
        <CardHeader>
          <CardTitle className="text-2xl line-clamp-2">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="grow">
          <p className="text-muted-foreground line-clamp-8">
            {post.content}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-start gap-2 border-t pt-4">
          <div className="text-sm text-muted-foreground">
            <span>{post.User?.name || 'Unknown'}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}

export default PostItem