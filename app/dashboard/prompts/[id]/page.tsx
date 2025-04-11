"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MarkdownEditor, MarkdownDisplay } from "@/components/markdown-editor"
import { ArrowLeft, Trash2, Copy, Share2, X, Plus, Code, FileText, Image, Video, Music } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { getTagColor } from "@/utils/tag-colors"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { MarkdownPreview } from "@/components/markdown-preview"

export default function PromptEditPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("edit")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Mock data for existing tags with colors
  const existingTags = [
    { name: "react", color: "bg-blue-500 text-white" },
    { name: "typescript", color: "bg-blue-700 text-white" },
    { name: "javascript", color: "bg-yellow-500 text-black" },
    { name: "nextjs", color: "bg-black text-white" },
    { name: "tailwind", color: "bg-cyan-500 text-white" },
    { name: "css", color: "bg-purple-500 text-white" },
    { name: "html", color: "bg-orange-500 text-white" },
    { name: "api", color: "bg-green-500 text-white" },
    { name: "database", color: "bg-red-500 text-white" },
    { name: "sql", color: "bg-blue-400 text-white" },
    { name: "mongodb", color: "bg-green-600 text-white" },
    { name: "nodejs", color: "bg-green-700 text-white" },
    { name: "express", color: "bg-gray-700 text-white" },
    { name: "frontend", color: "bg-pink-500 text-white" },
    { name: "backend", color: "bg-indigo-500 text-white" },
    { name: "fullstack", color: "bg-purple-600 text-white" },
    { name: "component", color: "bg-blue-600 text-white" },
  ]

  // Mock data for folders
  const mockFolders = [
    { id: "code", name: "Code Prompts", description: "Programming and development prompts" },
    { id: "writing", name: "Writing Prompts", description: "Content creation prompts" },
    { id: "image", name: "Image Prompts", description: "Image generation prompts" },
  ]

  // Mock prompt data
  const [promptData, setPromptData] = useState({
    id: params.id,
    title: "React Component Generator",
    description: "Generates React components with TypeScript and Tailwind CSS",
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
    folder: "code",
    dateCreated: "April 2, 2023",
    lastEdited: "2 days ago",
    usageCount: 42,
  })

  const [currentTag, setCurrentTag] = useState("")
  const [tagSearchOpen, setTagSearchOpen] = useState(false)

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

  const handleAddTag = (tag: string) => {
    if (tag && !promptData.tags.includes(tag)) {
      setPromptData({
        ...promptData,
        tags: [...promptData.tags, tag],
      })
      setCurrentTag("")
      setTagSearchOpen(false)
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setPromptData({
      ...promptData,
      tags: promptData.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag(currentTag)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Prompt saved",
      description: "Your prompt has been saved successfully.",
    })

    setIsSaving(false)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Prompt deleted",
      description: "Your prompt has been deleted successfully.",
    })

    // In a real app, this would redirect to the dashboard
    window.location.href = "/dashboard"
  }

  const handleDuplicate = () => {
    toast({
      title: "Prompt duplicated",
      description: "A copy of this prompt has been created.",
    })
  }

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {isEditing ? (
            <div className="w-full">
              <Input
                value={promptData.title}
                onChange={(e) => setPromptData({ ...promptData, title: e.target.value })}
                className="text-xl font-bold h-12 text-2xl"
                placeholder="Enter prompt title"
              />
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                {promptData.title}
                <Badge variant="outline" className="ml-2 flex items-center gap-1">
                  {getTypeIcon(promptData.type)}
                  <span className="capitalize">{promptData.type}</span>
                </Badge>
              </h1>
              <p className="text-muted-foreground mt-1">{promptData.description}</p>
            </div>
          )}

          <div className="flex gap-2 shrink-0">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="icon" onClick={handleDuplicate}>
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Duplicate</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
                <Button variant="default" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
                <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your prompt.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
        </div>
      </div>

      {isEditing ? (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={promptData.description}
                onChange={(e) => setPromptData({ ...promptData, description: e.target.value })}
                placeholder="Brief description of what this prompt does"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Prompt Content</Label>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="edit" className="mt-2">
                  <MarkdownEditor
                    value={promptData.content}
                    onChange={(value) => setPromptData({ ...promptData, content: value })}
                    height={400}
                    preview="edit"
                  />
                </TabsContent>
                <TabsContent value="preview" className="mt-2">
                  <div className="border rounded-md min-h-[400px] p-4 bg-background overflow-auto">
                    <MarkdownDisplay content={promptData.content} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="folder">Folder</Label>
                  <Select
                    value={promptData.folder}
                    onValueChange={(value) => setPromptData({ ...promptData, folder: value })}
                  >
                    <SelectTrigger id="folder">
                      <SelectValue placeholder="Select folder" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockFolders.map((folder) => (
                        <SelectItem key={folder.id} value={folder.id.toString()}>
                          {folder.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Output Type</Label>
                  <RadioGroup
                    value={promptData.type}
                    onValueChange={(value) => setPromptData({ ...promptData, type: value })}
                    className="flex flex-wrap gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="text" id="text" />
                      <Label htmlFor="text" className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        Text
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="code" id="code" />
                      <Label htmlFor="code" className="flex items-center gap-1">
                        <Code className="h-4 w-4" />
                        Code
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="image" id="image" />
                      <Label htmlFor="image" className="flex items-center gap-1">
                        <Image className="h-4 w-4" />
                        Image
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="video" id="video" />
                      <Label htmlFor="video" className="flex items-center gap-1">
                        <Video className="h-4 w-4" />
                        Video
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="audio" id="audio" />
                      <Label htmlFor="audio" className="flex items-center gap-1">
                        <Music className="h-4 w-4" />
                        Audio
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <Popover open={tagSearchOpen} onOpenChange={setTagSearchOpen}>
                    <PopoverTrigger asChild>
                      <div className="relative">
                        <Input
                          placeholder="Search or create tags"
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          onKeyDown={handleKeyDown}
                          onClick={() => setTagSearchOpen(true)}
                          className="pr-10"
                        />
                        {currentTag && (
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAddTag(currentTag)
                            }}
                          >
                            <span className="sr-only">Add tag</span>
                            <Plus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[calc(100%-2rem)]" align="start" side="bottom" sideOffset={5}>
                      <Command>
                        <CommandInput placeholder="Search tags..." value={currentTag} onValueChange={setCurrentTag} />
                        <CommandList>
                          <CommandEmpty>
                            {currentTag ? (
                              <CommandItem
                                value={currentTag}
                                onSelect={() => handleAddTag(currentTag)}
                                className="flex items-center justify-between"
                              >
                                <span>Create "{currentTag}"</span>
                                <Badge variant="outline" className="ml-2">
                                  New
                                </Badge>
                              </CommandItem>
                            ) : (
                              <p className="p-2 text-sm text-muted-foreground">No tags found</p>
                            )}
                          </CommandEmpty>
                          <CommandGroup>
                            {existingTags
                              .filter(
                                (tag) =>
                                  tag.name.includes(currentTag.toLowerCase()) && !promptData.tags.includes(tag.name),
                              )
                              .slice(0, 10)
                              .map((tag) => (
                                <CommandItem
                                  key={tag.name}
                                  value={tag.name}
                                  onSelect={() => handleAddTag(tag.name)}
                                  className="flex items-center justify-between"
                                >
                                  <span>{tag.name}</span>
                                  <div className={`h-3 w-3 rounded-full ${tag.color.split(" ")[0]}`} />
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {promptData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {promptData.tags.map((tag) => {
                        const tagColor = existingTags.find((t) => t.name === tag)?.color || "bg-gray-500 text-white"
                        return (
                          <Badge key={tag} className={`flex items-center gap-1 ${tagColor}`}>
                            {tag}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4 p-0 hover:bg-transparent hover:text-current opacity-70 hover:opacity-100"
                              onClick={() => handleRemoveTag(tag)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Remove {tag}</span>
                            </Button>
                          </Badge>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Prompt Details</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Created</dt>
                      <dd>{promptData.dateCreated}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Last edited</dt>
                      <dd>{promptData.lastEdited}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Usage count</dt>
                      <dd>{promptData.usageCount} times</dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
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
                      <MarkdownPreview content={promptData.content} />
                    </div>
                  </TabsContent>
                  <TabsContent value="raw" className="mt-6">
                    <pre className="bg-muted p-4 rounded-md overflow-auto text-sm font-mono">{promptData.content}</pre>
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
                    {promptData.tags.map((tag) => (
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
                      <dt className="text-muted-foreground">Folder</dt>
                      <dd>{mockFolders.find((f) => f.id === promptData.folder)?.name || "None"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Created</dt>
                      <dd>{promptData.dateCreated}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Last edited</dt>
                      <dd>{promptData.lastEdited}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Usage count</dt>
                      <dd>{promptData.usageCount} times</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Actions</h3>
                  <div className="space-y-2">
                    <Button
                      className="w-full"
                      onClick={() => {
                        navigator.clipboard.writeText(promptData.content)
                        toast({
                          title: "Copied to clipboard",
                          description: "The prompt has been copied to your clipboard.",
                        })
                      }}
                    >
                      Copy to Clipboard
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleDuplicate}>
                      Duplicate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
