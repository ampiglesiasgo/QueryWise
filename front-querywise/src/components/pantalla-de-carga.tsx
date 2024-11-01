'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function PantallaDeCarga() {
  const [mensaje, setMensaje] = useState('Cargando')
  const mensajes = ['Cargando', 'Autenticando', 'Validando sesión']
  const [indice, setIndice] = useState(0)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prevIndice) => (prevIndice + 1) % mensajes.length)
    }, 2000)

    return () => clearInterval(intervalo)
  }, [])

  useEffect(() => {
    setMensaje(mensajes[indice])
  }, [indice])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[300px]">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium text-center animate-pulse">
            {mensaje}...
          </p>
        </CardContent>
      </Card>
    </div>
  )
}