import PowerBIReport from "@/components/PowerBIReports"
import { AppSidebar } from "@/components/app-sidebar"
import { V0Chat } from "@/components/v0-chat"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
        <SidebarInset>
          <SidebarTrigger className="-ml-1" />
            <V0Chat />
      </SidebarInset>
    </SidebarProvider>
  )
}
