'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Check, ChevronDown, Menu, Moon, Search, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command'

export default function DocumentationPage() {
  const { setTheme, theme } = useTheme()
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  const navItems = [
    { title: 'Getting Started', href: '#getstarted' },
    { title: 'MPV', href: '#mvp' },
    { title: 'Diagrama', href: '#design' },
    { title: 'Stack', href: '#stack' },
  ]

  const sidebarItems = [
    {
      section: 'Getting Started',
      items: ['Introduction', 'Installation', 'Usage'],
    },
    {
      section: 'Components',
      items: ['Button', 'Input', 'Card', 'Dialog'],
    },
    {
      section: 'Hooks',
      items: ['useTheme', 'useToast', 'useMediaQuery'],
    },
    {
      section: 'Utilities',
      items: ['cn', 'formatDate', 'createContext'],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">QueryDocs</span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <nav className="flex flex-col space-y-3">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="px-2 py-1 text-lg font-medium"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 px-0">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="container flex-1 md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 px-4 md:px-8 py-6 md:py-10">
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid-cols-[1fr_300px] max-w-3xl mx-auto">
          <div className="mx-auto w-full space-y-8">
            <div className="space-y-2">
              <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">QueryWise Documentation</h1>
              <p className="text-lg text-muted-foreground">
              Plataforma de Consulta de Datos con Procesamiento Natural y Visualización de Consumo Integrado.
              </p>
            </div>
            <div className="mt-12 space-y-12">
              <section id='getstarted' className="space-y-6">
                <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Getting Started</h2>
                <p className="text-muted-foreground">
                  El objetivo principal es desarrollar una aplicación web con Backend aprovisionado desde azure, con autenticación mediante Microsoft, 
                  que permita a los usuarios acceder a datos cargados en formato Excel, procesarlos mediante inteligencia artificial y realizar consultas en lenguaje natural. 
                  Esta plataforma se implementará como una solución altamente escalable, utilizando la infraestructura de Azure y componentes de Microsoft para crear un sistema robusto 
                  que facilite la interpretación de grandes volúmenes de datos. La solución está diseñada para optimizar la gestión administrativa y el control de consumo de recursos 
                  en empresas, ofreciendo herramientas avanzadas y eficientes para la toma de decisiones. QueryWise proporciona herramientas avanzadas y eficientes para la toma de decisiones.
                </p>
                <p className='text-muted-foreground'>QueryWise proporciona herramientas avanzadas y eficientes para la toma de decisiones.</p>
                {/* <pre className="bg-muted p-4 rounded-md overflow-x-auto"><code>npm install acme-ui</code></pre> */}
              </section>
              <section className="space-y-6">
                <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">Problemática que Resuelve el Proyecto</h2>
                <p className="text-muted-foreground">En muchas empresas, especialmente en pequeñas y medianas (pymes), la gestión de información crítica se sigue realizando en formatos tradicionales como Excel. Excel presenta importantes limitaciones al trabajar con grandes volúmenes de datos y carece de herramientas de análisis avanzado que permitan visualizar patrones, tendencias y métricas en tiempo real.</p>
                <div className="space-y-4">
                  <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">Principales Problemas</h3>
                  <ul>
                    <li className='text-muted-foreground'>Dificultad para analizar grandes volúmenes de datos</li>
                    <li className='text-muted-foreground'>Limitación para consultas avanzadas en lenguaje natural</li>
                    <li className='text-muted-foreground'>Falta de supervisión en tiempo real del Consumo de recursos</li>
                    <li className='text-muted-foreground'>Accesibilidad limitada a herramientas de análisis avanzado</li>
                  </ul>
                </div>
              </section>
              <section className="space-y-6">
                <h2 id='mvp' className="scroll-m-20 text-2xl font-semibold tracking-tight">MVP (Producto Mínimo Viable)</h2>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Inicio de sesión con cuentas de Microsoft.</li>
                  <li>Subida y validación de archivos Excel.</li>
                  <li>Limpieza y estructuración básica de datos.</li>
                  <li>Guardar los datos en Base de datos</li>
                  <li>Función de consulta en lenguaje natural.</li>
                  <li>Visualización del consumo mediante Power BI.</li>
                </ol>
              </section>
              <section className="space-y-6">
                <h2 id='stack' className="scroll-m-20 text-2xl font-semibold tracking-tight">Tecnologías y Servicios Utilizados</h2>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li> <span className='font-bold'>Frontend</span> - React, NextJs</li>
                  <li> <span className='font-bold'>Visualizacion de Costos</span> - Power BI embebido, Azure Cost Management</li>
                  <li> <span className='font-bold'>Procesamiento de Datos</span> - Azure Data Factory, Azure Blob Storage</li>
                  <li> <span className='font-bold'>Almacenamiento y Consulta de Datos</span> - Cosmos DB, Microsoft SQL</li>
                  <li> <span className='font-bold'>Autenticación y Seguridad</span> - Microsoft Entra, Azure Managed Identity, Next-Auth</li>
                  <li> <span className='font-bold'>Inteligencia Artificial y Procesamiento Natural</span> - Azure Open AI, Microsoft AI Services</li>
                </ol>
              </section>
              <section className="space-y-6">
                <h2 id='design' className="scroll-m-20 text-2xl font-semibold tracking-tight">Infraestructura</h2>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li> <span className='font-bold'>Diagrama general de la arquitectura</span></li>
                </ol>
              </section>
            </div>
          </div>
        </main>
      </div>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-8">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a href="#" className="font-medium underline underline-offset-4">
              QueryWise DevTeam
            </a>
            . The source code is available on{" "}
            <a href="" className="font-medium underline underline-offset-4">
              GitHub
            </a>
            .
          </p>
        </div>
      </footer>
      {isSearchOpen && (
        <Command className="fixed inset-0 z-50 h-full w-full bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto max-w-2xl">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search Emoji</CommandItem>
                <CommandItem>Calculator</CommandItem>
              </CommandGroup>
            </CommandList>
          </div>
        </Command>
      )}
    </div>
  )
}