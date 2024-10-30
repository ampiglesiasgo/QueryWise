'use client'

import { useState } from 'react'
import { Paperclip, ArrowUp, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function V0Chat() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
  const [input, setInput] = useState('')

  const handleSendMessage = async () => {
    if (input.trim()) {
      // Añade el mensaje del usuario
      setMessages([...messages, { role: 'user', content: input }])
      
      // Resetea el input
      setInput('')

      try {
        // Envía la petición a la API
        const response = await fetch('https://querywiseqa2.azurewebsites.net/api/querywisemanagerhttp?code=9Hq9KCHc7GuUFAS17XOjswIyqgBBrN3TdN3DdP3l9KWfAzFuzPxIhg%3D%3D', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ question: input })
        })

        // Obtén la respuesta de la API
        const data = await response.json()

        // Añade la respuesta de la API a los mensajes
        setMessages(prev => [...prev, { role: 'assistant', content: data.result }])
      } catch (error) {
        console.error("Error fetching response:", error)
        setMessages(prev => [...prev, { role: 'assistant', content: "En este momento tenemos problemas para procesar tu solicitud" }])
      }
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white text-black">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b">
        <div className="text-2xl font-bold">QueryWise AI Chat</div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <>
              <h1 className="text-4xl font-bold text-center mt-20 mb-8">What can I help you ship?</h1>
              <div className="flex flex-wrap justify-center gap-2 text-sm">
                <Button variant="outline" className="rounded-full">View top sales articles ↗</Button>
                <Button variant="outline" className="rounded-full">How can I see the most sales on January? ↗</Button>
                <Button variant="outline" className="rounded-full">A function to join data ↗</Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${message.role === 'user' ? 'bg-teal-950 text-white' : 'bg-zinc-300'}`}>
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer with input */}
      <footer className="p-4 border-t">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              type="text"
              placeholder="Ask me anything about your data loaded" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button variant="outline" size="icon">
              <Plus className="h-4 w-4" />
              <span className="sr-only">New project</span>
            </Button>
            <Button onClick={handleSendMessage} size="icon">
              <ArrowUp className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
