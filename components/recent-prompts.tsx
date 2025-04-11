"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Share2, Code, FileText, Image } from "lucide-react"
import { useState } from "react"
import { getTagColor } from "@/utils/tag-colors"

export function RecentPrompts() {
  const recentPrompts = [
    {
      id: 1,
      title: "React Component Generator",
      description: "Generates React components with TypeScript and Tailwind CSS",
      type: "code",
      tags: ["react", "typescript", "tailwind"],
      lastEdited: "2 hours ago",
    },
    {
      id: 2,
      title: "Blog Post Outline",
      description: "Creates detailed blog post outlines with sections and key points",
      type: "text",
      tags: ["writing", "blog", "content"],
      lastEdited: "Yesterday",
    },
    {
      id: 3,
      title: "Product Image Generator",
      description: "Creates professional product images with customizable backgrounds",
      type: "image",
      tags: ["design", "product", "marketing"],
      lastEdited: "3 days ago",
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

  // State to track which card is being hovered
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 fade-in">
      {recentPrompts.map((prompt) => (
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
            <span className="text-xs text-muted-foreground">Edited {prompt.lastEdited}</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="icon-hover tooltip" data-tooltip="Add to favorites">
                <Star className="h-4 w-4" />
                <span className="sr-only">Favorite</span>
              </Button>
              <Button variant="ghost" size="icon" className="icon-hover tooltip" data-tooltip="Share prompt">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
