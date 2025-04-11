"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Code, FileText, ImageIcon, Video, Music, ArrowRight, Check } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { useEffect, useRef } from "react"
import { ImageCarousel } from "@/components/image-carousel"
import { TestimonialCarousel } from "@/components/testimonial-carousel"

export default function LandingPage() {
  // References to section elements
  const featuresRef = useRef<HTMLElement>(null)
  const communityRef = useRef<HTMLElement>(null)
  const pricingRef = useRef<HTMLElement>(null)

  // Function to scroll to a section
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Handle hash changes for direct links
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash
      if (hash === "#features" && featuresRef.current) {
        featuresRef.current.scrollIntoView({ behavior: "smooth" })
      } else if (hash === "#community" && communityRef.current) {
        communityRef.current.scrollIntoView({ behavior: "smooth" })
      } else if (hash === "#pricing" && pricingRef.current) {
        pricingRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [])

  const featuredPrompts = [
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
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "code":
        return <Code className="h-4 w-4" />
      case "text":
        return <FileText className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "audio":
        return <Music className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>PromptHub</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection(featuresRef)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection(communityRef)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Community
            </button>
            <button
              onClick={() => scrollToSection(pricingRef)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Pricing
            </button>
          </nav>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Manage Your AI Prompts Like a Pro
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    PromptHub helps you organize, share, and optimize your AI prompts in one secure platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="gap-1 animate-pulse">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button size="lg" variant="outline">
                      Explore Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-3xl opacity-20"></div>
                <ImageCarousel
                  images={[
                    { src: "/images/dashboard-view.png", alt: "PromptHub Dashboard View" },
                    { src: "/images/prompt-editor.png", alt: "Prompt Editor Interface" },
                    { src: "/images/community-sharing.png", alt: "Community Sharing Features" },
                    { src: "/images/folder-organization.png", alt: "Folder Organization System" },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" ref={featuresRef} className="py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Powerful Features</h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Everything you need to manage your AI prompts effectively
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 border-transparent hover:border-primary/10">
                <CardHeader>
                  <div className="p-2 rounded-full bg-primary/10 w-fit">
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
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"></path>
                      <path d="M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"></path>
                      <path d="M4 12H2"></path>
                      <path d="M10 12H8"></path>
                      <path d="M16 12h-2"></path>
                      <path d="M22 12h-2"></path>
                    </svg>
                  </div>
                  <CardTitle className="mt-4">Local-First Security</CardTitle>
                  <CardDescription>
                    Keep your prompts secure with local storage and optional encrypted cloud backup
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>End-to-end encryption</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Automatic local backups</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Optional cloud sync</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 border-transparent hover:border-primary/10">
                <CardHeader>
                  <div className="p-2 rounded-full bg-primary/10 w-fit">
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
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M9 18V5l12-2v13"></path>
                      <circle cx="6" cy="18" r="3"></circle>
                      <circle cx="18" cy="16" r="3"></circle>
                    </svg>
                  </div>
                  <CardTitle className="mt-4">Smart Organization</CardTitle>
                  <CardDescription>Organize prompts with folders, tags, and intelligent categorization</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Folder-based management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Tag-based classification</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Output type categorization</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 border-transparent hover:border-primary/10">
                <CardHeader>
                  <div className="p-2 rounded-full bg-primary/10 w-fit">
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
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <CardTitle className="mt-4">Community Sharing</CardTitle>
                  <CardDescription>Share prompts with the community or keep them private</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Public or private sharing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Discover trending prompts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Follow creators you like</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 border-transparent hover:border-primary/10">
                <CardHeader>
                  <div className="p-2 rounded-full bg-primary/10 w-fit">
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
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                  </div>
                  <CardTitle className="mt-4">Markdown Editor</CardTitle>
                  <CardDescription>Create and edit prompts with a powerful Markdown editor</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Real-time preview</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Version history</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Syntax highlighting</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 border-transparent hover:border-primary/10">
                <CardHeader>
                  <div className="p-2 rounded-full bg-primary/10 w-fit">
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
                      className="h-5 w-5 text-primary"
                    >
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                      <path d="M5 3v4"></path>
                      <path d="M19 17v4"></path>
                      <path d="M3 5h4"></path>
                      <path d="M17 19h4"></path>
                    </svg>
                  </div>
                  <CardTitle className="mt-4">Favorites Collection</CardTitle>
                  <CardDescription>Save your favorite prompts for quick access</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>One-click favorites</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Organized favorites view</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Quick access to frequent prompts</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 border-transparent hover:border-primary/10">
                <CardHeader>
                  <div className="p-2 rounded-full bg-primary/10 w-fit">
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
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m2 12 5-3 2 6 5-5 2 4 6-4"></path>
                      <path d="M19 12v7"></path>
                      <path d="M12 19h7"></path>
                    </svg>
                  </div>
                  <CardTitle className="mt-4">Output Categorization</CardTitle>
                  <CardDescription>Categorize prompts by output type for better organization</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Code, text, image categorization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Video and audio support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Custom output types</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" ref={communityRef} className="py-16 md:py-20 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Community Highlights</h2>
              <p className="mt-4 text-muted-foreground md:text-xl">Discover trending prompts from our community</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredPrompts.map((prompt, index) => (
                <Card
                  key={prompt.id}
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 border-transparent hover:border-primary/10"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{prompt.title}</CardTitle>
                        <CardDescription className="mt-1">{prompt.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getTypeIcon(prompt.type)}
                        <span className="capitalize">{prompt.type}</span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {prompt.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="transition-all hover:scale-105">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 group">
                        <Avatar className="h-8 w-8 transition-transform group-hover:scale-110">
                          <AvatarImage src={prompt.author.avatar} alt={prompt.author.name} />
                          <AvatarFallback>{prompt.author.initials}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium group-hover:text-primary transition-colors">
                          {prompt.author.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 group">
                        <Star className="h-4 w-4 fill-current text-yellow-500 transition-transform group-hover:scale-125" />
                        <span className="text-sm group-hover:font-medium">{prompt.stars}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      variant="outline"
                      className="w-full transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      View Prompt
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/dashboard/community">
                <Button size="lg" className="transition-transform hover:translate-x-1 group">
                  Explore All Community Prompts
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" ref={pricingRef} className="py-16 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
              <p className="mt-4 text-muted-foreground md:text-xl">Choose the plan that's right for you</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
              <Card className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 border-transparent hover:border-primary/10">
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    $0
                    <span className="ml-1 text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                  <CardDescription className="mt-4">Perfect for getting started with prompt management</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Up to 50 prompts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Basic folder organization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Community access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Local storage only</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col border-primary relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  Popular
                </div>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    $9
                    <span className="ml-1 text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                  <CardDescription className="mt-4">For power users who need more storage and features</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Unlimited prompts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Advanced organization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Cloud sync with 5GB storage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Version history</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Private sharing</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Subscribe</Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 border-transparent hover:border-primary/10">
                <CardHeader>
                  <CardTitle>Team</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    $19
                    <span className="ml-1 text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                  <CardDescription className="mt-4">For teams that need to collaborate on prompts</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Everything in Pro</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Team workspaces</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Collaborative editing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>20GB cloud storage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Advanced analytics</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Contact Sales
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-20 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">What Our Users Say</h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Join thousands of satisfied users who are already using PromptHub
              </p>
            </div>

            <TestimonialCarousel
              testimonials={[
                {
                  content:
                    "PromptHub has completely transformed how I organize my AI prompts. The folder system and tagging features make it so easy to find exactly what I need.",
                  author: {
                    name: "Sarah Johnson",
                    title: "Content Creator",
                    avatar: "/placeholder.svg?height=48&width=48",
                    initials: "SJ",
                  },
                },
                {
                  content:
                    "As a developer, I need to keep track of hundreds of prompts for different projects. PromptHub's organization system has saved me countless hours of searching.",
                  author: {
                    name: "Michael Chen",
                    title: "Software Engineer",
                    avatar: "/placeholder.svg?height=48&width=48",
                    initials: "MC",
                  },
                },
                {
                  content:
                    "The community features are incredible. I've discovered so many useful prompts that have improved my workflow dramatically.",
                  author: {
                    name: "Alex Rivera",
                    title: "Digital Marketer",
                    avatar: "/placeholder.svg?height=48&width=48",
                    initials: "AR",
                  },
                },
              ]}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to Organize Your AI Prompts?
            </h2>
            <p className="mt-4 text-primary-foreground/80 md:text-xl max-w-2xl mx-auto">
              Join thousands of users who are already managing their prompts more effectively with PromptHub.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="gap-1 transition-transform hover:scale-105">
                  Get Started for Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <button
                onClick={() => scrollToSection(featuresRef)}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 h-11 px-8 transition-transform hover:scale-105"
              >
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 font-semibold mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>PromptHub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The ultimate platform for managing and sharing AI prompts.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection(featuresRef)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(pricingRef)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(communityRef)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Community
                  </button>
                </li>
                <li>
                  <Link href="/docs" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2023 PromptHub. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
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
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
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
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
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
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
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
                  className="h-5 w-5"
                >
                  <path d="M12 2a10 10 0 0 0-3.16 19.5c.5.08.66-.23.66-.5v-1.69C6.73 19.91 6.14 18 6.14 18A2.69 2.69 0 0 0 5 16.5c-.91-.62.07-.6.07-.6a2.1 2.1 0 0 1 1.53 1 2.15 2.15 0 0 0 2.91.83 2.16 2.16 0 0 1 .63-1.34c-2.22-.25-4.55-1.11-4.55-4.92a3.86 3.86 0 0 1 1-2.69 3.58 3.58 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64a3.86 3.86 0 0 1 1 2.69c0 3.83-2.34 4.66-4.57 4.91.36.31.67.91.67 1.85V21c0 .27.16.59.67.5A10 10 0 0 0 12 2z"></path>
                </svg>
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
