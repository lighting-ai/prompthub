"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MarkdownDisplay } from "@/components/markdown-editor"
import { ArrowLeft, Star, Share2, Copy, Code, FileText, Image, Video, Music } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { getTagColor } from "@/utils/tag-colors"

export default function CommunityPromptDetailPage({ params }: { params: { id: string } }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const { toast } = useToast()

  // Mock data for the prompt
  const prompt = {
    id: params.id,
    title: "React Component Generator",
    content: `# React Component Generator

Create a React functional component with TypeScript and Tailwind CSS styling.

## Parameters:
- **componentName**: The name of the component (PascalCase)
- **props**: List of props with their types
- **description**: Brief description of what the component does
- **styling**: Specific Tailwind classes to include

## Example Usage:
componentName: UserProfile
props: 
- user: { name: string; email: string; avatar: string; }
- isVerified: boolean
- onUpdate: (user: User) => void
description: A profile card that displays user information with verification badge
styling: rounded-lg shadow-md hover:shadow-lg transition-all

## Output Format:
\`\`\`tsx
import React from 'react';

interface UserProps {
// Generated props interface
}

export const UserProfile: React.FC<UserProps> = ({ user, isVerified, onUpdate }) => {
return (
  <div className="rounded-lg shadow-md hover:shadow-lg transition-all">
    {/* Component JSX */}
  </div>
);
};
\`\`\``,
    type: "code",
    tags: ["react", "typescript", "tailwind", "component"],
    author: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
    dateCreated: "April 2, 2023",
    lastEdited: "2 days ago",
    usageCount: 42,
  }

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

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt.content)
    toast({
      title: "Copied to clipboard",
      description: "The prompt has been copied to your clipboard.",
    })
  }

  const handleUsePrompt = () => {
    // In a real app, this would add the prompt to the user's collection
    toast({
      title: "Prompt added to your collection",
      description: "You can now find this prompt in your dashboard.",
    })
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite
        ? "The prompt has been removed from your favorites."
        : "The prompt has been added to your favorites.",
    })
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link
          href="/community"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Community
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{prompt.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant="outline" className="flex items-center gap-1">
                {getTypeIcon(prompt.type)}
                <span className="capitalize">{prompt.type}</span>
              </Badge>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={prompt.author.avatar} alt={prompt.author.name} />
                  <AvatarFallback>{prompt.author.initials}</AvatarFallback>
                </Avatar>
                <span>{prompt.author.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">Created: {prompt.dateCreated}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleToggleFavorite}>
              <Star className={`h-4 w-4 ${isFavorite ? "fill-yellow-500 text-yellow-500" : ""}`} />
              <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
            <Button variant="outline" size="icon" onClick={handleCopyPrompt}>
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="raw">Raw</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-6">
                  <div className="prose dark:prose-invert max-w-none">
                    {/* Replace MarkdownPreview with MarkdownDisplay */}
                    <MarkdownDisplay content={prompt.content} />
                  </div>
                </TabsContent>
                <TabsContent value="raw" className="mt-6">
                  <pre className="bg-muted p-4 rounded-md overflow-auto text-sm font-mono">{prompt.content}</pre>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {prompt.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className={getTagColor(tag)}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Details</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Created</dt>
                    <dd>{prompt.dateCreated}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Last edited</dt>
                    <dd>{prompt.lastEdited}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Usage count</dt>
                    <dd>{prompt.usageCount} times</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Actions</h3>
                <div className="space-y-2">
                  <Button className="w-full" onClick={handleUsePrompt}>
                    Use This Prompt
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleCopyPrompt}>
                    Copy to Clipboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
