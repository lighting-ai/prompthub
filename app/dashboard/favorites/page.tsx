"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Star, Code, FileText, Image, Trash2 } from "lucide-react"
import { getTagColor } from "@/utils/tag-colors"

export default function FavoritesPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)

  const favoritePrompts = [
    {
      id: 1,
      title: "React Component Generator",
      description: "Generates React components with TypeScript and Tailwind CSS",
      type: "code",
      tags: ["react", "typescript", "tailwind"],
      dateAdded: "2 days ago",
    },
    {
      id: 2,
      title: "Blog Post Outline",
      description: "Creates detailed blog post outlines with sections and key points",
      type: "text",
      tags: ["writing", "blog", "content"],
      dateAdded: "1 week ago",
    },
    {
      id: 3,
      title: "Product Image Generator",
      description: "Creates professional product images with customizable backgrounds",
      type: "image",
      tags: ["design", "product", "marketing"],
      dateAdded: "2 weeks ago",
    },
    {
      id: 4,
      title: "SEO Content Writer",
      description: "Generates SEO-optimized content with keyword analysis",
      type: "text",
      tags: ["seo", "marketing", "content"],
      dateAdded: "3 weeks ago",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "code":
        return <Code className="h-4 w-4" />
      case "text":
        return <FileText className="h-4 w-4" />
      case "image":
        return <Image className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Star className="h-6 w-6" />
            Favorites
          </h1>
          <p className="text-muted-foreground">Your favorite prompts collection</p>
        </div>
      </div>

      <div className="mb-6">
        <Input placeholder="Search favorites..." className="max-w-md" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 fade-in">
        {favoritePrompts.map((prompt) => (
          <Card
            key={prompt.id}
            className={`card-hover-effect ${hoveredCard === prompt.id ? "ring-1 ring-primary/20" : ""}`}
            onMouseEnter={() => setHoveredCard(prompt.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-base">{prompt.title}</CardTitle>
                <CardDescription className="text-sm">{prompt.description}</CardDescription>
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                {getTypeIcon(prompt.type)}
                <span className="capitalize">{prompt.type}</span>
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {prompt.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className={`text-xs tag-hover-effect ${getTagColor(tag)} ${hoveredTag === tag ? "ring-1 ring-white/20" : ""}`}
                    onMouseEnter={() => setHoveredTag(tag)}
                    onMouseLeave={() => setHoveredTag(null)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Added {prompt.dateAdded}</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="icon-hover tooltip" data-tooltip="Remove from favorites">
                  <Star className="h-4 w-4 fill-current text-yellow-500" />
                  <span className="sr-only">Remove from favorites</span>
                </Button>
                <Button variant="ghost" size="icon" className="icon-hover tooltip" data-tooltip="Delete">
                  <Trash2 className="h-4 w-4 text-red-500" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
