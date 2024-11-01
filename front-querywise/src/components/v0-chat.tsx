'use client';

import ReactMarkdown from 'react-markdown';
import { useState, useRef } from 'react';
import { Paperclip, ArrowUp, Plus, Database } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert } from "@/components/ui/alert";
import { AlertDialog } from '@radix-ui/react-alert-dialog';

export function V0Chat() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isDbDialogOpen, setIsDbDialogOpen] = useState(false);
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const [dbService, setDbService] = useState('');
  const [connectionString, setConnectionString] = useState('');
  const [fileSource, setFileSource] = useState('local');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [alert, setAlert] = useState({ visible: false, message: '', type: 'success' });


  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }]);
      setInput('');

      try {
        const response = await fetch('https://querywiseqa2.azurewebsites.net/api/querywisemanagerhttp?code=9Hq9KCHc7GuUFAS17XOjswIyqgBBrN3TdN3DdP3l9KWfAzFuzPxIhg%3D%3D', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ question: input })
        });

        if (!response.ok) throw new Error(`API responded with status ${response.status}`);

        const contentType = response.headers.get("content-type");
        const data = contentType && contentType.includes("application/json")
          ? await response.json()
          : await response.text();

        const messageContent = typeof data === 'string' ? data : data.result || "Respuesta no disponible";
        setMessages(prev => [...prev, { role: 'assistant', content: messageContent }]);

      } catch (error) {
        console.error("Error fetching response:", error);
        setMessages(prev => [...prev, { role: 'assistant', content: "En este momento tenemos problemas para procesar tu solicitud" }]);
      }
    }
  };

  const handleDbSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(`Connecting to ${dbService} with: ${connectionString}`);
    setIsDbDialogOpen(false);
  };
  
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setAlert({ visible: true, message: 'Please select a file to upload', type: 'error' });
      return;
  }

    const formData = new FormData();
      formData.append('file', selectedFile);

  
    try {
      const response = await fetch('https://uploadtoblobazfuncv1.azurewebsites.net/api/UploadToBlobAzureV1?', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error(`API responded with status ${response.status}`);

      const result = await response.text();
      console.log('File upload successful:', result);
      setAlert({ visible: true, message: 'File uploaded successfully', type: 'success' });
    } catch (error) {
      console.error("Error uploading file:", error);
      setAlert({ visible: true, message: 'Error uploading file', type: 'error' });
    } finally {
      setIsFileDialogOpen(false); // Cerrar el diálogo al completar la subida
    }
  };  

  return (
    <div className="flex flex-col h-screen bg-white text-black">

      {/* Main content */}
      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <>
              <h1 className="text-4xl font-bold text-center mt-20 mb-8">What can I help you ship?</h1>
              <div className="flex flex-wrap justify-center gap-2 text-sm">
                <Button variant="outline" className="rounded-full">See the best selling product ↗</Button>
                <Button variant="outline" className="rounded-full">See the year with the most sales ↗</Button>
                <Button variant="outline" className="rounded-full">View the latest highlights of the year ↗</Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${message.role === 'user' ? 'bg-teal-950 text-white' : 'bg-gray-200'}`}>
                    {message.role === 'assistant' ? (
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    ) : (
                      message.content
                    )}
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
            <Dialog open={isFileDialogOpen} onOpenChange={setIsFileDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload File</DialogTitle>
                </DialogHeader>
                <RadioGroup value={fileSource} onValueChange={setFileSource} className="grid grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem value="local" id="local" className="peer sr-only" />
                    <Label htmlFor="local" className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
                    <Paperclip className="mb-3 h-6 w-6" />
                        Local
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="gdrive" id="gdrive" className="peer sr-only" />
                    <Label htmlFor="gdrive" className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
                      <svg className="mb-3 h-6 w-6" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg"><path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/><path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/><path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/><path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/><path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/><path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/></svg>
                        Google Drive
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="onedrive" id="onedrive" className="peer sr-only" />
                    <Label htmlFor="onedrive" className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'>
                      <svg className="mb-3 h-6 w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21.608 12.015a3.658 3.658 0 0 0 -2.684-1.658 4.639 4.639 0 0 0 -8.023-3.358 5.006 5.006 0 0 0 -7.9 4.015 4.994 4.994 0 0 0 .9 9.986h15.1a3.992 3.992 0 0 0 2.607-7.985z" fill="#0364b8"/></svg>
                        OneDrive
                    </Label>
                  </div>
                </RadioGroup>
                {fileSource === 'local' && (
                  <div className="flex flex-col items-center justify-center pt-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <Button onClick={() => fileInputRef.current?.click()}>
                      Choose File
                    </Button>
                    {selectedFile && (
                      <p className="mt-2 text-sm text-gray-500">
                        Selected file: {selectedFile.name}
                      </p>
                    )}
                  </div>
                )}
                <Button onClick={handleFileUpload}>Upload</Button>
              </DialogContent>
            </Dialog>
            <Input
              type="text"
              placeholder="Ask me anything about your data loaded"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Dialog open={isDbDialogOpen} onOpenChange={setIsDbDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Database className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Database Connection</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleDbSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="db-service">Service</Label>
                      <Select value={dbService} onValueChange={setDbService}>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aws-rds">AWS RDS</SelectItem>
                          <SelectItem value="azure-sql">Azure SQL</SelectItem>
                          <SelectItem value="gcp-sql">GCP Cloud SQL</SelectItem>
                          <SelectItem value="mongodb-atlas">MongoDB Atlas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="connection-string">Connection String</Label>
                      <Input
                        id="connection-string"
                        value={connectionString}
                        onChange={(e) => setConnectionString(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <Button type="submit">Save Connection</Button>
                </form>
              </DialogContent>
            </Dialog>
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
  );
}
