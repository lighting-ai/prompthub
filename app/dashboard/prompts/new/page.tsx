"use client"

import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { MarkdownEditor, MarkdownDisplay } from "@/components/markdown-editor"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

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
]

// Mock data for folders
const mockFolders = [
  { id: "code", name: "Code Prompts", description: "Programming and development prompts" },
  { id: "writing", name: "Writing Prompts", description: "Content creation prompts" },
  { id: "image", name: "Image Prompts", description: "Image generation prompts" },
]

export default function NewPromptPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [outputType, setOutputType] = useState("text")
  const [folder, setFolder] = useState("")
  const [activeTab, setActiveTab] = useState("edit")
  const [folders] = useState(mockFolders)
  const [tagSearchOpen, setTagSearchOpen] = useState(false)

  const getTagColor = (tagName: string) => {
    const tag = existingTags.find((t) => t.name === tagName)
    return tag ? tag.color : "bg-gray-500 text-white" // Default color for new tags
  }

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setCurrentTag("")
      setTagSearchOpen(false)
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag(currentTag)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create New Prompt</h1>
        <p className="text-muted-foreground">Create and save a new AI prompt to your collection</p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-3">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Enter prompt title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="folder">Folder</Label>
            <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
              <Link href="/dashboard/folders">
                <span>Manage Folders</span>
              </Link>
            </Button>
          </div>
          <Select value={folder} onValueChange={setFolder}>
            <SelectTrigger>
              <SelectValue placeholder="Select folder" />
            </SelectTrigger>
            <SelectContent>
              {folders.map((f) => (
                <SelectItem key={f.id} value={f.id.toString()}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-3">
          <Label>Output Type</Label>
          <RadioGroup value={outputType} onValueChange={setOutputType} className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="text" id="text" />
              <Label htmlFor="text">Text</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="code" id="code" />
              <Label htmlFor="code">Code</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="image" id="image" />
              <Label htmlFor="image">Image</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="video" id="video" />
              <Label htmlFor="video">Video</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="audio" id="audio" />
              <Label htmlFor="audio">Audio</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid gap-3">
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
                    <X className="h-4 w-4" />
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
                      .filter((tag) => tag.name.includes(currentTag.toLowerCase()) && !tags.includes(tag.name))
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

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => {
                const tagColor = getTagColor(tag)
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

        <div className="grid gap-3">
          <Label htmlFor="content">Prompt Content</Label>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="edit" className="mt-2">
              <MarkdownEditor value={content} onChange={setContent} height={400} preview="edit" />
            </TabsContent>
            <TabsContent value="preview" className="mt-2">
              <div className="border rounded-md min-h-[400px] p-4 bg-background overflow-auto">
                <MarkdownDisplay content={content} />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" asChild>
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <Button>Save Prompt</Button>
        </div>
      </div>
    </div>
  )
}
