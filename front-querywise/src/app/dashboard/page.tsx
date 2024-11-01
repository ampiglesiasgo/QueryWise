"use client";

import PowerBIReport from "@/components/PowerBIReports"
import { AppSidebar } from "@/components/app-sidebar"
import { PantallaDeCarga } from "@/components/pantalla-de-carga"
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
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const loadingTime = 5000; // Tiempo de carga en milisegundos

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push("/");
    } else if (status === 'authenticated') {
      // Si ya está autenticado, se espera el tiempo de carga antes de mostrar el contenido
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, loadingTime);

      return () => clearTimeout(timer); // Limpia el temporizador al desmontar
    }
  }, [status, router, loadingTime]);

  // Renderiza el componente de carga personalizado
  if (isLoading || status === "loading") return <PantallaDeCarga />;
  return (
    <SidebarProvider>
      <SidebarInset>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          <PowerBIReport embedUrl="https://app.powerbi.com/view?r=eyJrIjoiNGI4NTUyMzItN2M1ZC00N2FlLWExY2ItMDQ1OGUxNjQyZjQ3IiwidCI6ImM5ZDNmZGJkLTQ1ZjItNDY5ZS1hNGZhLTIwMGMyNGQ5N2Y0NSIsImMiOjR9"></PowerBIReport>
      </SidebarInset>
    </SidebarProvider>
  )
}
