import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FolderTree, Plus, MoreHorizontal, Folder } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function FoldersPage() {
  const folders = [
    {
      id: 1,
      name: "Code Prompts",
      description: "Prompts for generating code and programming solutions",
      count: 12,
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Writing Prompts",
      description: "Prompts for content creation and copywriting",
      count: 8,
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Image Prompts",
      description: "Prompts for generating images and visual content",
      count: 5,
      color: "bg-purple-500",
    },
    {
      id: 4,
      name: "Video Prompts",
      description: "Prompts for video content creation",
      count: 3,
      color: "bg-red-500",
    },
    {
      id: 5,
      name: "Audio Prompts",
      description: "Prompts for generating audio content",
      count: 2,
      color: "bg-yellow-500",
    },
  ]

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FolderTree className="h-6 w-6" />
            Folders
          </h1>
          <p className="text-muted-foreground">Organize your prompts into folders</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Folder
          </Button>
          <Button variant="outline" className="gap-2">
            Import Folders
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Input placeholder="Search folders..." className="max-w-md" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-center">
              <Button variant="ghost" className="h-20 w-full flex flex-col gap-2">
                <Plus className="h-8 w-8 text-muted-foreground" />
                <span className="font-normal text-muted-foreground">Create New Folder</span>
              </Button>
            </div>
          </CardHeader>
        </Card>
        {folders.map((folder) => (
          <Card key={folder.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-md ${folder.color} flex items-center justify-center`}>
                    <Folder className="h-4 w-4 text-white" />
                  </div>
                  <CardTitle>{folder.name}</CardTitle>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                    <DropdownMenuItem>Move</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>{folder.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{folder.count} prompts</p>
            </CardContent>
            <CardFooter>
              <Link href={`/dashboard/folders/${folder.id}`} className="w-full">
                <Button variant="outline" className="w-full">
                  Open Folder
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
