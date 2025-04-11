"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Share2, Star, Code, FileText, Image, Video, Music, Search, TrendingUp, Filter, SortDesc } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { getTagColor } from "@/utils/tag-colors"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Link from "next/link"

export default function CommunityPage() {
  // Get search params if any
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialTab = searchParams.get("tab") || "trending"
  const initialType = searchParams.get("type") || "all"
  const initialPage = Number.parseInt(searchParams.get("page") || "1", 10)

  // State for filters and pagination
  const [activeTab, setActiveTab] = useState(initialTab)
  const [outputType, setOutputType] = useState(initialType)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(5) // Mock total pages

  // State for hover effects
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)
  const [hoveredUser, setHoveredUser] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    params.set("tab", activeTab)
    if (outputType !== "all") params.set("type", outputType)
    if (currentPage > 1) params.set("page", currentPage.toString())

    router.push(`/community?${params.toString()}`, { scroll: false })
  }, [activeTab, outputType, currentPage, router])

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [activeTab, outputType, currentPage])

  const trendingPrompts = [
    {
      id: 1,
      title: "AI Interview Preparation",
      description: "Comprehensive interview preparation with custom questions and feedback",
      type: "text",
      tags: ["interview", "career", "coaching"],
      author: {
        name: "Career Coach AI",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "CC",
      },
      stars: 1245,
      shares: 342,
    },
    {
      id: 2,
      title: "Photorealistic Product Renders",
      description: "Generate studio-quality product images from simple descriptions",
      type: "image",
      tags: ["product", "marketing", "ecommerce"],
      author: {
        name: "Design Studio Pro",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DS",
      },
      stars: 987,
      shares: 256,
    },
    {
      id: 3,
      title: "Full-Stack Web App Generator",
      description: "Generate complete web applications with frontend, backend, and database",
      type: "code",
      tags: ["webdev", "fullstack", "generator"],
      author: {
        name: "DevOps Master",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DM",
      },
      stars: 1876,
      shares: 543,
    },
    {
      id: 4,
      title: "Video Script Generator",
      description: "Creates engaging video scripts with hooks and storytelling elements",
      type: "text",
      tags: ["video", "content", "marketing"],
      author: {
        name: "Video Creator",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "VC",
      },
      stars: 756,
      shares: 189,
    },
    {
      id: 5,
      title: "AI Music Composer",
      description: "Generates musical compositions in various styles and genres",
      type: "audio",
      tags: ["music", "creative", "audio"],
      author: {
        name: "Music Maestro",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MM",
      },
      stars: 1432,
      shares: 321,
    },
    {
      id: 6,
      title: "Database Schema Designer",
      description: "Creates optimized database schemas with relationships and indexes",
      type: "code",
      tags: ["database", "sql", "backend"],
      author: {
        name: "DB Expert",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DE",
      },
      stars: 892,
      shares: 178,
    },
  ]

  // Filter prompts based on output type
  const filteredPrompts =
    outputType === "all" ? trendingPrompts : trendingPrompts.filter((prompt) => prompt.type === outputType)

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

  // Trending tags with hover state
  const trendingTags = [
    { name: "webdev", count: 324 },
    { name: "marketing", count: 256 },
    { name: "design", count: 198 },
    { name: "writing", count: 187 },
    { name: "productivity", count: 165 },
    { name: "coding", count: 142 },
    { name: "business", count: 128 },
    { name: "education", count: 112 },
  ]

  // Top contributors with hover state
  const topContributors = [
    { id: 1, name: "User 1", prompts: "90+ prompts", avatar: "/placeholder.svg?height=32&width=32", initials: "U1" },
    { id: 2, name: "User 2", prompts: "80+ prompts", avatar: "/placeholder.svg?height=32&width=32", initials: "U2" },
    { id: 3, name: "User 3", prompts: "70+ prompts", avatar: "/placeholder.svg?height=32&width=32", initials: "U3" },
    { id: 4, name: "User 4", prompts: "60+ prompts", avatar: "/placeholder.svg?height=32&width=32", initials: "U4" },
    { id: 5, name: "User 5", prompts: "50+ prompts", avatar: "/placeholder.svg?height=32&width=32", initials: "U5" },
  ]

  // Output type options
  const outputTypes = [
    { value: "all", label: "All Types" },
    { value: "text", label: "Text", icon: <FileText className="h-4 w-4 mr-2" /> },
    { value: "code", label: "Code", icon: <Code className="h-4 w-4 mr-2" /> },
    { value: "image", label: "Image", icon: <Image className="h-4 w-4 mr-2" /> },
    { value: "audio", label: "Audio", icon: <Music className="h-4 w-4 mr-2" /> },
    { value: "video", label: "Video", icon: <Video className="h-4 w-4 mr-2" /> },
  ]

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Share2 className="h-6 w-6" />
            Community
          </h1>
          <p className="text-muted-foreground">Discover and share prompts with the community</p>
        </div>
        <Button className="button-hover-effect">
          <Share2 className="mr-2 h-4 w-4" />
          Share a Prompt
        </Button>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full md:w-3/4">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search community prompts..."
                className="pl-10 transition-all focus:ring-2 focus:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={outputType} onValueChange={setOutputType}>
                <SelectTrigger className="w-[140px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    {outputTypes.find((t) => t.value === outputType)?.icon}
                    <span>{outputTypes.find((t) => t.value === outputType)?.label}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {outputTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center">
                        {type.icon}
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[130px]">
                  <SortDesc className="h-4 w-4 mr-2" />
                  <span>Sort By</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="trending" className="relative overflow-hidden">
                Trending
                <span
                  className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
                  style={{ width: activeTab === "trending" ? "100%" : "0%" }}
                ></span>
              </TabsTrigger>
              <TabsTrigger value="recent" className="relative overflow-hidden">
                Recent
                <span
                  className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
                  style={{ width: activeTab === "recent" ? "100%" : "0%" }}
                ></span>
              </TabsTrigger>
              <TabsTrigger value="popular" className="relative overflow-hidden">
                Most Popular
                <span
                  className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
                  style={{ width: activeTab === "popular" ? "100%" : "0%" }}
                ></span>
              </TabsTrigger>
              <TabsTrigger value="following" className="relative overflow-hidden">
                Following
                <span
                  className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
                  style={{ width: activeTab === "following" ? "100%" : "0%" }}
                ></span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="trending" className="space-y-4 fade-in">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {isLoading
                  ? // Loading skeleton cards
                    Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <Card key={`skeleton-${i}`} className="animate-pulse">
                          <CardHeader className="flex flex-row items-start justify-between space-y-0">
                            <div className="w-3/4">
                              <div className="h-5 bg-muted rounded mb-2"></div>
                              <div className="h-4 bg-muted rounded w-5/6"></div>
                            </div>
                            <div className="h-6 w-16 bg-muted rounded"></div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              <div className="h-5 w-16 bg-muted rounded"></div>
                              <div className="h-5 w-20 bg-muted rounded"></div>
                              <div className="h-5 w-14 bg-muted rounded"></div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 bg-muted rounded-full"></div>
                              <div className="h-4 w-24 bg-muted rounded"></div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="h-4 w-10 bg-muted rounded"></div>
                              <div className="h-4 w-10 bg-muted rounded"></div>
                            </div>
                          </CardFooter>
                        </Card>
                      ))
                  : // Actual content
                    filteredPrompts.map((prompt) => (
                      <Link href={`/community/prompts/${prompt.id}`} key={prompt.id}>
                        <Card
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
                              <span className="text-xs group-hover:text-foreground transition-colors">
                                {prompt.author.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 group">
                                <Star className="h-3 w-3 text-yellow-500 fill-current transition-transform group-hover:scale-125" />
                                <span className="text-xs group-hover:font-medium transition-all">{prompt.stars}</span>
                              </div>
                              <div className="flex items-center gap-1 group">
                                <Share2 className="h-3 w-3 text-muted-foreground transition-transform group-hover:scale-125" />
                                <span className="text-xs group-hover:font-medium transition-all">{prompt.shares}</span>
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))}
              </div>

              {/* Pagination */}
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

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                      }}
                      className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </TabsContent>
            <TabsContent value="recent">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading recent prompts...</p>
              </div>
            </TabsContent>
            <TabsContent value="popular">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading popular prompts...</p>
              </div>
            </TabsContent>
            <TabsContent value="following">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading prompts from people you follow...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-full md:w-1/4 space-y-4 fade-in" style={{ animationDelay: "200ms" }}>
          {/* 移除重复的输出类型过滤器，保留标签和贡献者部分 */}
          <Card className="card-hover-effect">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Trending Tags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <Badge
                    key={tag.name}
                    className={`tag-hover-effect tooltip ${getTagColor(tag.name)} ${hoveredTag === tag.name ? "ring-1 ring-white/20" : ""}`}
                    data-tooltip={`${tag.count} prompts`}
                    onMouseEnter={() => setHoveredTag(tag.name)}
                    onMouseLeave={() => setHoveredTag(null)}
                  >
                    #{tag.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover-effect">
            <CardHeader>
              <CardTitle className="text-lg">Top Contributors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topContributors.map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center justify-between user-card-hover rounded-md p-2 ${hoveredUser === user.id ? "bg-muted/50" : ""}`}
                  onMouseEnter={() => setHoveredUser(user.id)}
                  onMouseLeave={() => setHoveredUser(null)}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className={`h-8 w-8 transition-transform ${hoveredUser === user.id ? "scale-110" : ""}`}>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.prompts}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`transition-all ${hoveredUser === user.id ? "bg-primary/10" : ""}`}
                  >
                    Follow
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
