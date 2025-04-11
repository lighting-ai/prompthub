"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Share2, Copy, Pencil, Code, FileText, Image, MoreHorizontal, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getTagColor } from "@/utils/tag-colors"
import Link from "next/link"

interface Prompt {
  id: number
  title: string
  description: string
  type: string
  tags: string[]
  lastEdited: string
  isFavorite: boolean
}

interface PromptCardProps {
  prompt: Prompt
  viewMode: "grid" | "list"
}

export function PromptCard({ prompt, viewMode }: PromptCardProps) {
  const [isFavorite, setIsFavorite] = useState(prompt.isFavorite)
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)

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

  if (viewMode === "list") {
    return (
      <div className="flex items-center border rounded-lg p-3 hover:bg-muted/30 transition-colors">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              {getTypeIcon(prompt.type)}
              <span className="capitalize">{prompt.type}</span>
            </Badge>
            <h3 className="font-medium truncate">{prompt.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{prompt.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex flex-wrap gap-1">
              {prompt.tags.map((tag) => (
                <Badge
                  key={tag}
                  className={`text-xs ${getTagColor(tag)} ${hoveredTag === tag ? "ring-1 ring-white/20" : ""}`}
                  onMouseEnter={() => setHoveredTag(tag)}
                  onMouseLeave={() => setHoveredTag(null)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-auto">Edited {prompt.lastEdited}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 ml-4">
          <Button variant="ghost" size="icon" onClick={() => setIsFavorite(!isFavorite)} className="h-8 w-8">
            <Star className={`h-4 w-4 ${isFavorite ? "fill-yellow-500 text-yellow-500" : ""}`} />
            <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <Link href={`/dashboard/prompts/${prompt.id}`}>
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{prompt.title}</CardTitle>
            <CardDescription className="text-sm line-clamp-2">{prompt.description}</CardDescription>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            {getTypeIcon(prompt.type)}
            <span className="capitalize">{prompt.type}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {prompt.tags.map((tag) => (
            <Badge
              key={tag}
              className={`text-xs ${getTagColor(tag)} ${hoveredTag === tag ? "ring-1 ring-white/20" : ""}`}
              onMouseEnter={() => setHoveredTag(tag)}
              onMouseLeave={() => setHoveredTag(null)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-0">
        <span className="text-xs text-muted-foreground">Edited {prompt.lastEdited}</span>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => setIsFavorite(!isFavorite)} className="h-8 w-8">
            <Star className={`h-4 w-4 ${isFavorite ? "fill-yellow-500 text-yellow-500" : ""}`} />
            <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
          <Button variant="ghost" size="icon" asChild className="h-8 w-8">
            <Link href={`/dashboard/prompts/${prompt.id}`}>
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  )
}
