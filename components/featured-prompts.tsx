"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Code, FileText, Image, Video, Music } from "lucide-react"
import { useState } from "react"
import { getTagColor } from "@/utils/tag-colors"

export function FeaturedPrompts() {
  const featuredPrompts = [
    {
      id: 1,
      title: "Advanced SEO Content Generator",
      description: "Creates SEO-optimized content with keyword analysis",
      type: "text",
      tags: ["seo", "marketing", "content"],
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SJ",
      },
      stars: 245,
    },
    {
      id: 2,
      title: "3D Product Visualizer",
      description: "Generates 3D product visualizations from text descriptions",
      type: "image",
      tags: ["3d", "product", "design"],
      author: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MC",
      },
      stars: 189,
    },
    {
      id: 3,
      title: "Full-Stack App Scaffolding",
      description: "Creates complete application structure with API endpoints",
      type: "code",
      tags: ["fullstack", "api", "nextjs"],
      author: {
        name: "Alex Rivera",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AR",
      },
      stars: 312,
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
      case "video":
        return <Video className="h-4 w-4" />
      case "audio":
        return <Music className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  // State to track which card is being hovered
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 fade-in">
      {featuredPrompts.map((prompt) => (
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
            <div className="flex items-center gap-2 group">
              <Avatar className="h-6 w-6 transition-transform group-hover:scale-110">
                <AvatarImage src={prompt.author.avatar} alt={prompt.author.name} />
                <AvatarFallback>{prompt.author.initials}</AvatarFallback>
              </Avatar>
              <span className="text-xs group-hover:text-foreground transition-colors">{prompt.author.name}</span>
            </div>
            <div className="flex items-center gap-1 group">
              <Star className="h-3 w-3 fill-current text-yellow-500 transition-transform group-hover:scale-125" />
              <span className="text-xs group-hover:font-medium transition-all">{prompt.stars}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
