import PowerBIReport from "@/components/PowerBIReports"
import { AppSidebar } from "@/components/app-sidebar"
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
      <SidebarInset>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          <PowerBIReport embedUrl="https://app.powerbi.com/view?r=eyJrIjoiNGI4NTUyMzItN2M1ZC00N2FlLWExY2ItMDQ1OGUxNjQyZjQ3IiwidCI6ImM5ZDNmZGJkLTQ1ZjItNDY5ZS1hNGZhLTIwMGMyNGQ5N2Y0NSIsImMiOjR9"></PowerBIReport>
      </SidebarInset>
    </SidebarProvider>
  )
}
