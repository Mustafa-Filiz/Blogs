'use client'

import { BookA, ChevronsUpDown, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { User } from '@/lib/types'
import { takeInitials } from '@/lib/utils'
import { authApi } from '@/lib/authApi'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ProfileDialog } from '@/components/profile-modal'

type Props = {
  user?: User
}

export function NavUser({ user }: Props) {
  if (!user) return

  const router = useRouter()
  const handleLogout = () => {
    authApi.logout()
    router.push('/')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-auto">
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarFallback className="rounded-lg">{takeInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate text-xs">{user.email}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="rounded-lg">{takeInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <ProfileDialog />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/blogs/my">
              <BookA />
              My Posts
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/*<DropdownMenuGroup>*/}
        {/*  <DropdownMenuItem>*/}
        {/*    <BadgeCheck />*/}
        {/*    Account*/}
        {/*  </DropdownMenuItem>*/}
        {/*  <DropdownMenuItem>*/}
        {/*    <CreditCard />*/}
        {/*    Billing*/}
        {/*  </DropdownMenuItem>*/}
        {/*  <DropdownMenuItem>*/}
        {/*    <Bell />*/}
        {/*    Notifications*/}
        {/*  </DropdownMenuItem>*/}
        {/*</DropdownMenuGroup>*/}
        {/*<DropdownMenuSeparator />*/}
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
