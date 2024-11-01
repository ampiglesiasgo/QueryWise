'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { PantallaDeCarga } from "@/components/pantalla-de-carga";
import { EnhancedFaqSection } from "@/components/enhanced-faq-section";

export default function Page() {
    // const { data: session, status } = useSession();
    // const router = useRouter();
    // const [isLoading, setIsLoading] = useState(true);
    // const loadingTime = 5000; // Tiempo de carga en milisegundos

    // useEffect(() => {
    //   if (status === 'unauthenticated') {
    //     router.push("/");
    //   } else if (status === 'authenticated') {
    //     // Si ya está autenticado, se espera el tiempo de carga antes de mostrar el contenido
    //     const timer = setTimeout(() => {
    //       setIsLoading(false);
    //     }, loadingTime);

    //     return () => clearTimeout(timer); // Limpia el temporizador al desmontar
    //   }
    // }, [status, router, loadingTime]);

    // Renderiza el componente de carga personalizado
    // if (isLoading || status === "loading") return <PantallaDeCarga />;

    return (
        <SidebarProvider>
            <SidebarInset>
                <EnhancedFaqSection />
            </SidebarInset>
        </SidebarProvider>
    );
}
