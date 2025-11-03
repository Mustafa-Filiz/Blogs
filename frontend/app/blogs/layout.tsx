import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { SiteHeader } from '@/components/site-header'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="flex flex-col gap-4 md:grid-cols-3">
                {children}
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}