"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tag, Plus, MoreHorizontal, Search } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { getTagColor } from "@/utils/tag-colors"

export default function TagsPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const tags = [
    {
      id: 1,
      name: "react",
      description: "React.js framework and components",
      count: 15,
    },
    {
      id: 2,
      name: "typescript",
      description: "TypeScript language and type definitions",
      count: 12,
    },
    {
      id: 3,
      name: "tailwind",
      description: "Tailwind CSS styling and components",
      count: 10,
    },
    {
      id: 4,
      name: "api",
      description: "API design and implementation",
      count: 8,
    },
    {
      id: 5,
      name: "database",
      description: "Database design and queries",
      count: 7,
    },
    {
      id: 6,
      name: "testing",
      description: "Testing frameworks and methodologies",
      count: 6,
    },
    {
      id: 7,
      name: "design",
      description: "UI/UX design principles",
      count: 9,
    },
    {
      id: 8,
      name: "marketing",
      description: "Marketing content and strategies",
      count: 5,
    },
  ]

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Tag className="h-6 w-6" />
            Tags
          </h1>
          <p className="text-muted-foreground">Organize your prompts with tags</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="gap-2 button-hover-effect">
            <Plus className="h-4 w-4" />
            New Tag
          </Button>
          <Button variant="outline" className="gap-2">
            Manage Tags
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search tags..." className="pl-10 max-w-md" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 fade-in">
        {tags.map((tag) => (
          <Card
            key={tag.id}
            className={`card-hover-effect ${hoveredCard === tag.id ? "ring-1 ring-primary/20" : ""}`}
            onMouseEnter={() => setHoveredCard(tag.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-md flex items-center justify-center ${getTagColor(tag.name)}`}>
                    <Tag className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-lg">#{tag.name}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="icon-hover">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer">Rename</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Change Color</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">Merge Tags</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-red-600">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>{tag.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{tag.count} prompts</p>
            </CardContent>
            <CardFooter>
              <Link href={`/dashboard/tags/${tag.name}`} className="w-full">
                <Button variant="outline" className="w-full">
                  View Prompts
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}

        <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-center">
              <Button variant="ghost" className="h-20 w-full flex flex-col gap-2">
                <Plus className="h-8 w-8 text-muted-foreground" />
                <span className="font-normal text-muted-foreground">Create New Tag</span>
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
