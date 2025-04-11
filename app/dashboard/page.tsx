"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { PromptCard } from "@/components/prompt-card"
import { CreatePromptButton } from "@/components/create-prompt-button"
import { StatsCards } from "@/components/stats-cards"
import { Search, Filter, SortDesc, Grid, List, Tag } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [filterType, setFilterType] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Mock data for prompts
  const allPrompts = [
    {
      id: 1,
      title: "React Component Generator",
      description: "Generates React components with TypeScript and Tailwind CSS",
      type: "code",
      tags: ["react", "typescript", "tailwind"],
      lastEdited: "2 hours ago",
      isFavorite: true,
    },
    {
      id: 2,
      title: "Blog Post Outline",
      description: "Creates detailed blog post outlines with sections and key points",
      type: "text",
      tags: ["writing", "blog", "content"],
      lastEdited: "Yesterday",
      isFavorite: true,
    },
    {
      id: 3,
      title: "Product Image Generator",
      description: "Creates professional product images with customizable backgrounds",
      type: "image",
      tags: ["design", "product", "marketing"],
      lastEdited: "3 days ago",
      isFavorite: false,
    },
    {
      id: 4,
      title: "API Endpoint Creator",
      description: "Creates RESTful API endpoints with documentation",
      type: "code",
      tags: ["api", "rest", "backend"],
      lastEdited: "1 week ago",
      isFavorite: false,
    },
    {
      id: 5,
      title: "Database Schema Designer",
      description: "Designs database schemas with relationships",
      type: "code",
      tags: ["database", "schema", "sql"],
      lastEdited: "2 weeks ago",
      isFavorite: false,
    },
    {
      id: 6,
      title: "SEO Content Writer",
      description: "Generates SEO-optimized content with keyword analysis",
      type: "text",
      tags: ["seo", "marketing", "content"],
      lastEdited: "3 weeks ago",
      isFavorite: true,
    },
    {
      id: 7,
      title: "UI Component Library",
      description: "Generates a complete UI component library with design system",
      type: "code",
      tags: ["ui", "design-system", "react"],
      lastEdited: "1 month ago",
      isFavorite: false,
    },
    {
      id: 8,
      title: "Marketing Email Template",
      description: "Creates professional marketing email templates with sections",
      type: "text",
      tags: ["email", "marketing", "template"],
      lastEdited: "1 month ago",
      isFavorite: true,
    },
    {
      id: 9,
      title: "Logo Generator",
      description: "Creates professional logo designs with customization options",
      type: "image",
      tags: ["logo", "branding", "design"],
      lastEdited: "2 months ago",
      isFavorite: false,
    },
    {
      id: 10,
      title: "Social Media Post Generator",
      description: "Creates engaging social media posts with hashtags",
      type: "text",
      tags: ["social", "marketing", "content"],
      lastEdited: "2 months ago",
      isFavorite: false,
    },
  ]

  // Filter prompts based on search query, type filter, and current tab
  const filterPrompts = (prompts: typeof allPrompts, tab: string) => {
    return prompts
      .filter((prompt) => {
        // Filter by search query
        if (
          searchQuery &&
          !prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !prompt.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        ) {
          return false
        }

        // Filter by type
        if (filterType !== "all" && prompt.type !== filterType) {
          return false
        }

        // Filter by tab
        if (tab === "favorites" && !prompt.isFavorite) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        // Sort by selected option
        if (sortBy === "recent") {
          // This is a mock, in a real app we'd compare actual dates
          return a.id < b.id ? 1 : -1
        } else if (sortBy === "oldest") {
          return a.id > b.id ? 1 : -1
        } else if (sortBy === "alphabetical") {
          return a.title.localeCompare(b.title)
        }
        return 0
      })
  }

  // Get filtered prompts for each tab
  const allFilteredPrompts = filterPrompts(allPrompts, "all")
  const favoritePrompts = filterPrompts(allPrompts, "favorites")

  // Pagination
  const paginatePrompts = (prompts: typeof allPrompts) => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return prompts.slice(startIndex, endIndex)
  }

  // Get paginated prompts
  const paginatedAllPrompts = paginatePrompts(allFilteredPrompts)
  const paginatedFavoritePrompts = paginatePrompts(favoritePrompts)

  // Calculate total pages
  const totalAllPages = Math.ceil(allFilteredPrompts.length / itemsPerPage)
  const totalFavoritePages = Math.ceil(favoritePrompts.length / itemsPerPage)

  // Get unique tags for filter options
  const uniqueTags = Array.from(new Set(allPrompts.flatMap((prompt) => prompt.tags)))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <CreatePromptButton />
      </div>

      <StatsCards />

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-1">
              <span>All Prompts</span>
              <Badge variant="secondary" className="ml-1">
                {allFilteredPrompts.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-1">
              <span>Favorites</span>
              <Badge variant="secondary" className="ml-1">
                {favoritePrompts.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search prompts..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1) // Reset to first page on search
                }}
              />
            </div>

            <Select
              value={filterType}
              onValueChange={(value) => {
                setFilterType(value)
                setCurrentPage(1) // Reset to first page on filter change
              }}
            >
              <SelectTrigger className="w-[130px]">
                <Filter className="h-4 w-4 mr-2" />
                <span>{filterType === "all" ? "All Types" : filterType}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="code">Code</SelectItem>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="image">Image</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={sortBy}
              onValueChange={(value) => {
                setSortBy(value)
                setCurrentPage(1) // Reset to first page on sort change
              }}
            >
              <SelectTrigger className="w-[130px]">
                <SortDesc className="h-4 w-4 mr-2" />
                <span>Sort</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="alphabetical">A-Z</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-md overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="rounded-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          {allFilteredPrompts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No prompts found. Try adjusting your filters or create a new prompt.
              </p>
            </div>
          ) : (
            <>
              <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-3"}>
                {paginatedAllPrompts.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} viewMode={viewMode} />
                ))}
              </div>

              {/* Pagination */}
              {totalAllPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage > 1) setCurrentPage(currentPage - 1)
                        }}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalAllPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setCurrentPage(page)
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage < totalAllPages) setCurrentPage(currentPage + 1)
                        }}
                        className={currentPage >= totalAllPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          {favoritePrompts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No favorite prompts found. Mark prompts as favorites to see them here.
              </p>
            </div>
          ) : (
            <>
              <div className={viewMode === "grid" ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-3"}>
                {paginatedFavoritePrompts.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} viewMode={viewMode} />
                ))}
              </div>

              {/* Pagination */}
              {totalFavoritePages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage > 1) setCurrentPage(currentPage - 1)
                        }}
                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalFavoritePages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setCurrentPage(page)
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage < totalFavoritePages) setCurrentPage(currentPage + 1)
                        }}
                        className={currentPage >= totalFavoritePages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>

      {uniqueTags.length > 0 && (
        <Card className="mt-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              Popular Tags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {uniqueTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => {
                    setSearchQuery(tag)
                    setCurrentPage(1) // Reset to first page when clicking a tag
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
