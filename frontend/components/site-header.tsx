import { NavUser } from '@/components/nav-user'
import { fetchWithCookies } from '@/lib/api-utils'
import Link from 'next/link'
import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { User } from '@/lib/types'

export async function SiteHeader() {
  const response = await fetchWithCookies('/user/me')
  const data = await response.json()
  const user = data.data.user as User

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <h1 className="text-4xl font-bold items-center flex-1">
          <Link href="/blogs">
            Blogs.
          </Link>
        </h1>
        <div className="flex-1 text-center">
          <Button asChild size="lg">
            <Link href="/blogs/write">
              <Pencil className="mr-2 h-4 w-4" />
              Write Post
            </Link>
          </Button>
        </div>
        <div className="flex-1 flex justify-end">
          <NavUser user={user} />
        </div>

      </div>
    </header>
  )
}
