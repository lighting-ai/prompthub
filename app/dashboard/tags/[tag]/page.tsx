"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tag, ArrowLeft, Search, Code, FileText, Image } from "lucide-react"
import Link from "next/link"
import { getTagColor } from "@/utils/tag-colors"

export default function TagDetailPage({ params }: { params: { tag: string } }) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)

  // Mock data for prompts with this tag
  const tagPrompts = [
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
      title: "API Endpoint Creator",
      description: "Creates RESTful API endpoints with documentation",
      type: "code",
      tags: ["api", "rest", "backend", params.tag],
      lastEdited: "Yesterday",
    },
    {
      id: 3,
      title: "Database Schema Designer",
      description: "Designs database schemas with relationships",
      type: "code",
      tags: ["database", "schema", "sql", params.tag],
      lastEdited: "3 days ago",
    },
    {
      id: 4,
      title: "Unit Test Generator",
      description: "Generates unit tests for JavaScript/TypeScript code",
      type: "code",
      tags: ["testing", "jest", "typescript", params.tag],
      lastEdited: "1 week ago",
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
      <div className="mb-6">
        <Link
          href="/dashboard/tags"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tags
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-md flex items-center justify-center ${getTagColor(params.tag)}`}>
              <Tag className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">#{params.tag}</h1>
              <p className="text-muted-foreground">Prompts tagged with #{params.tag}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder={`Search in #${params.tag}...`} className="pl-10 max-w-md" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 fade-in">
        {tagPrompts.map((prompt) => (
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
              <Button variant="ghost" size="sm" className="icon-hover">
                Open
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
