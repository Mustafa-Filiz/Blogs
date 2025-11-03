import { NextRequest, NextResponse } from 'next/server'
import { User } from '@/lib/types'
import { serverAuthApi } from '@/lib/authApi'

export async function proxy(request: NextRequest) {
  const cookie = request.cookies.get('blogsAppToken')

  if (!cookie) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const response = await serverAuthApi.getCurrentUser()
  const user = response?.data?.user as User


  if (!user) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/blogs/:path*'],
}