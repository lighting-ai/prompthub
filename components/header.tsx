"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Search, Settings, User, LogOut, Share2 } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [hasNotification, setHasNotification] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isCommunityPage = pathname?.includes("/community")

  // Add notification pulse effect randomly
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasNotification(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 transition-all duration-200 ${isScrolled ? "shadow-sm" : ""}`}
    >
      {isSearchOpen ? (
        <div className="flex flex-1 items-center">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            type="search"
            placeholder="Search prompts, tags, folders..."
            className="flex-1"
            autoFocus
            onBlur={() => setIsSearchOpen(false)}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-1 items-center gap-2 md:gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="icon-hover tooltip"
              data-tooltip="Search"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>

            <Link href="/community" passHref>
              <Button variant={isCommunityPage ? "default" : "ghost"} className="gap-2">
                <Share2 className="h-4 w-4" />
                Community
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className={`icon-hover tooltip relative ${hasNotification ? "text-primary" : ""}`}
              data-tooltip="Notifications"
              onClick={() => setHasNotification(false)}
            >
              <Bell className="h-4 w-4" />
              {hasNotification && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 pulse"></span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="outline" size="icon" className="icon-hover tooltip" data-tooltip="Settings">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full transition-transform hover:scale-105">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer transition-colors hover:bg-muted">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer transition-colors hover:bg-muted">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer transition-colors hover:bg-destructive/10 hover:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </header>
  )
}
