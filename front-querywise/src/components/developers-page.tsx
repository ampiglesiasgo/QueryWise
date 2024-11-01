'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

const developers = [
  {
    name: "Amparo Iglesias",
    role: "Lead Developer",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Full-stack developer with 8 years of experience. Passionate about clean code and user-centric design.",
    github: "https://github.com/alicej",
    linkedin: "https://linkedin.com/in/alicej",
    twitter: "https://twitter.com/alicej",
    email: "alice@example.com"
  },
  {
    name: "Ana Romero",
    role: "UI/UX Designer",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Creative designer with a keen eye for detail. Loves crafting beautiful and intuitive user interfaces.",
    github: "https://github.com/bobs",
    linkedin: "https://linkedin.com/in/bobs",
    twitter: "https://twitter.com/bobs",
    email: "bob@example.com"
  },
  {
    name: "Gabriela Moya",
    role: "Backend Engineer",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Database expert and performance optimizer. Always looking for ways to make systems more efficient.",
    github: "https://github.com/charlied",
    linkedin: "https://linkedin.com/in/charlied",
    twitter: "https://twitter.com/charlied",
    email: "charlie@example.com"
  },
  {
    name: "Luis Ramos",
    role: "Backend Developer Azure AI Engineer",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "JavaScript enthusiast and React expert. Passionate about creating delightful user experiences.",
    github: "",
    linkedin: "",
    twitter: "",
    email: "",
  },
]

export function DevelopersPageComponent() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-12">Team Developers in QueryWise Project</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-6">
        {developers.map((dev) => (
          <Card key={dev.name} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={dev.avatar} alt={dev.name} />
                  <AvatarFallback>{dev.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{dev.name}</CardTitle>
                  <CardDescription>{dev.role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{dev.bio}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="icon" asChild>
                <a href={dev.github} target="_blank" rel="noopener noreferrer" aria-label={`${dev.name}'s GitHub`}>
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${dev.name}'s LinkedIn`}>
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href={dev.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${dev.name}'s Twitter`}>
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href={`mailto:${dev.email}`} aria-label={`Email ${dev.name}`}>
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}