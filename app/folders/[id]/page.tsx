import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Code,
  FileText,
  Image,
  MoreHorizontal,
  Plus,
  Search,
  SortAsc,
  SortDesc,
  Grid,
  List,
} from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function FolderDetailPage({ params }: { params: { id: string } }) {
  // Mock data for the folder
  const folderData = {
    id: params.id,
    name:
      params.id === "code"
        ? "Code Prompts"
        : params.id === "writing"
          ? "Writing Prompts"
          : params.id === "image"
            ? "Image Prompts"
            : "Custom Folder",
    description: "Collection of prompts for generating code and programming solutions",
    color:
      params.id === "code"
        ? "bg-blue-500"
        : params.id === "writing"
          ? "bg-green-500"
          : params.id === "image"
            ? "bg-purple-500"
            : "bg-orange-500",
  }

  // Mock data for prompts in this folder
  const folderPrompts = [
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
      tags: ["api", "rest", "backend"],
      lastEdited: "Yesterday",
    },
    {
      id: 3,
      title: "Database Schema Designer",
      description: "Designs database schemas with relationships",
      type: "code",
      tags: ["database", "schema", "sql"],
      lastEdited: "3 days ago",
    },
    {
      id: 4,
      title: "Unit Test Generator",
      description: "Generates unit tests for JavaScript/TypeScript code",
      type: "code",
      tags: ["testing", "jest", "typescript"],
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
          href="/folders"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Folders
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-md ${folderData.color} flex items-center justify-center`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white"
              >
                <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{folderData.name}</h1>
              <p className="text-muted-foreground">{folderData.description}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Prompt
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Rename Folder</DropdownMenuItem>
                <DropdownMenuItem>Change Color</DropdownMenuItem>
                <DropdownMenuItem>Move Prompts</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Delete Folder</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search in this folder..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SortAsc className="h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <SortAsc className="mr-2 h-4 w-4" />
                Name (A-Z)
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SortDesc className="mr-2 h-4 w-4" />
                Name (Z-A)
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SortAsc className="mr-2 h-4 w-4" />
                Date (Newest)
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SortDesc className="mr-2 h-4 w-4" />
                Date (Oldest)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Tabs defaultValue="grid" className="hidden md:block">
            <TabsList>
              <TabsTrigger value="grid" className="px-3">
                <Grid className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list" className="px-3">
                <List className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {folderPrompts.map((prompt) => (
          <Card key={prompt.id}>
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
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Edited {prompt.lastEdited}</span>
              <Button variant="ghost" size="sm">
                Open
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
