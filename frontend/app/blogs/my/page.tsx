import React from 'react'
import { serverAuthApi } from '@/lib/authApi'
import { User } from '@/lib/types'
import { getMyPostServer } from '@/lib/postsApi'
import PostItem from '@/components/post-item'

export default async function Page() {
  const response = await serverAuthApi.getCurrentUser()
  const user = response?.data?.user as User

  const userPosts = await getMyPostServer(user.id)
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {userPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}