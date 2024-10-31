"use client"

import { Send } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function SupportFeedbackForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [isOpen, setIsOpen] = useState(false)
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      
      const data = {
        name,
        email,
        message
      }
  
      try {
        const response = await fetch('https://prod-03.northcentralus.logic.azure.com:443/workflows/00a98c881b3e4a198bfc7195c1c728e3/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=B8_EOr6TCTzR-Ljn1fI3jaXIjmfGNzrusHEAiafLknY', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
  
        if (!response.ok) {
          throw new Error('Error al enviar el formulario')
        }
  
        console.log('Formulario enviado con éxito:', data)
  
        // Limpiar el formulario después del envío
        setName('')
        setEmail('')
        setMessage('')
        setIsOpen(false) // Cerrar el diálogo después de enviar
  
      } catch (error) {
        console.error('Error:', error)
      }
    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className='mt-auto'>
            <Send size={16} className="mr-2" /> Soporte y Feedback
            </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Soporte y Feedback</DialogTitle>
          <DialogDescription>Envíanos tus comentarios o solicita ayuda</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje aquí"
              required
            />
          </div>
          <Button type="submit" className="w-full">Enviar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}