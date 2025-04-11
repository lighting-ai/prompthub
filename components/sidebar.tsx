"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Home,
  FolderTree,
  Tag,
  Star,
  Settings,
  Cloud,
  Plus,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  FolderPlus,
  Pencil,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { FolderManagementDialog } from "@/components/folder-management-dialog"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  submenu?: NavItem[]
  expanded?: boolean
  id?: string | number
}

export default function Sidebar() {
  const pathname = usePathname()

  // Mock folders data
  const initialFolders = [
    {
      id: "code",
      title: "Code Prompts",
      href: "/dashboard/folders/code",
      icon: <div className="h-1 w-1 rounded-full bg-current" />,
    },
    {
      id: "writing",
      title: "Writing Prompts",
      href: "/dashboard/folders/writing",
      icon: <div className="h-1 w-1 rounded-full bg-current" />,
    },
    {
      id: "image",
      title: "Image Prompts",
      href: "/dashboard/folders/image",
      icon: <div className="h-1 w-1 rounded-full bg-current" />,
    },
  ]

  const [folders, setFolders] = useState(initialFolders)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const [navItems, setNavItems] = useState<NavItem[]>([
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-4 w-4" />,
    },
    {
      title: "Folders",
      href: "/dashboard/folders",
      icon: <FolderTree className="h-4 w-4" />,
      expanded: true,
      submenu: folders,
    },
    {
      title: "Tags",
      href: "/dashboard/tags",
      icon: <Tag className="h-4 w-4" />,
    },
    {
      title: "Favorites",
      href: "/dashboard/favorites",
      icon: <Star className="h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-4 w-4" />,
    },
    {
      title: "Cloud Sync",
      href: "/dashboard/cloud",
      icon: <Cloud className="h-4 w-4" />,
    },
  ])

  // Animation for sidebar items on initial load
  const [animationDelay, setAnimationDelay] = useState(true)

  useEffect(() => {
    // Set a small delay to allow the sidebar to render before starting animations
    const timer = setTimeout(() => {
      setAnimationDelay(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const toggleSubmenu = (index: number) => {
    setNavItems((prev) => prev.map((item, i) => (i === index ? { ...item, expanded: !item.expanded } : item)))
  }

  const handleCreateFolder = (folder: { name: string; description?: string }) => {
    const id = folder.name.toLowerCase().replace(/\s+/g, "-")
    const newFolder = {
      id,
      title: folder.name,
      href: `/dashboard/folders/${id}`,
      icon: <div className="h-1 w-1 rounded-full bg-current" />,
    }

    setFolders([...folders, newFolder])

    // Update the navItems with the new folder
    setNavItems((prev) => {
      const newItems = [...prev]
      const foldersIndex = newItems.findIndex((item) => item.title === "Folders")
      if (foldersIndex !== -1 && newItems[foldersIndex].submenu) {
        newItems[foldersIndex].submenu = [...folders, newFolder]
      }
      return newItems
    })
  }

  const handleRenameFolder = (id: string | number, name: string) => {
    const updatedFolders = folders.map((folder) => {
      if (folder.id === id) {
        return {
          ...folder,
          title: name,
          href: `/dashboard/folders/${typeof id === "string" ? id : id.toString()}`,
        }
      }
      return folder
    })

    setFolders(updatedFolders)

    // Update the navItems with the renamed folder
    setNavItems((prev) => {
      const newItems = [...prev]
      const foldersIndex = newItems.findIndex((item) => item.title === "Folders")
      if (foldersIndex !== -1 && newItems[foldersIndex].submenu) {
        newItems[foldersIndex].submenu = updatedFolders
      }
      return newItems
    })
  }

  const handleDeleteFolder = (id: string | number) => {
    const updatedFolders = folders.filter((folder) => folder.id !== id)

    setFolders(updatedFolders)

    // Update the navItems without the deleted folder
    setNavItems((prev) => {
      const newItems = [...prev]
      const foldersIndex = newItems.findIndex((item) => item.title === "Folders")
      if (foldersIndex !== -1 && newItems[foldersIndex].submenu) {
        newItems[foldersIndex].submenu = updatedFolders
      }
      return newItems
    })
  }

  return (
    <div className="hidden border-r bg-background md:block md:w-64">
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 transition-transform group-hover:scale-110"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="transition-colors group-hover:text-primary">PromptHub</span>
        </Link>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="flex flex-col gap-2 p-4">
          <Link href="/dashboard/prompts/new">
            <Button variant="outline" className="w-full justify-start gap-2 button-hover-effect">
              <Plus className="h-4 w-4" />
              New Prompt
            </Button>
          </Link>
          <nav className="grid gap-1 pt-2">
            {navItems.map((item, index) => (
              <div
                key={item.title}
                className={`${animationDelay ? "" : "slide-in"}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.submenu ? (
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start gap-2 sidebar-item",
                          item.expanded && "bg-muted",
                          (pathname === item.href || pathname.startsWith(`${item.href}/`)) && "bg-muted font-medium",
                          hoveredItem === item.title && "bg-muted/70",
                        )}
                        onClick={() => toggleSubmenu(index)}
                        onMouseEnter={() => setHoveredItem(item.title)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <span className={`transition-transform ${hoveredItem === item.title ? "scale-110" : ""}`}>
                          {item.icon}
                        </span>
                        <span className="flex-1 text-left">{item.title}</span>
                        {item.expanded ? (
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${hoveredItem === item.title ? "rotate-180" : ""}`}
                          />
                        ) : (
                          <ChevronRight
                            className={`h-4 w-4 transition-transform ${hoveredItem === item.title ? "translate-x-1" : ""}`}
                          />
                        )}
                      </Button>
                      {item.title === "Folders" && (
                        <FolderManagementDialog
                          folders={folders.map((f) => ({ id: f.id, name: f.title, description: "" }))}
                          onCreateFolder={handleCreateFolder}
                          onRenameFolder={handleRenameFolder}
                          onDeleteFolder={handleDeleteFolder}
                          trigger={
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 icon-hover tooltip"
                              data-tooltip="Manage Folders"
                            >
                              <FolderPlus className="h-4 w-4" />
                              <span className="sr-only">Manage Folders</span>
                            </Button>
                          }
                        />
                      )}
                    </div>
                    {item.submenu && item.expanded && (
                      <div className="ml-4 grid gap-1">
                        {item.submenu.map((subitem) => (
                          <div key={subitem.title} className="flex items-center group">
                            <Link href={subitem.href} passHref className="flex-1">
                              <Button
                                variant="ghost"
                                className={cn(
                                  "w-full justify-start gap-2 sidebar-item",
                                  (pathname === subitem.href || pathname.startsWith(`${subitem.href}/`)) &&
                                    "bg-muted font-medium",
                                  hoveredItem === subitem.title && "bg-muted/70",
                                )}
                                onMouseEnter={() => setHoveredItem(subitem.title)}
                                onMouseLeave={() => setHoveredItem(null)}
                                asChild
                              >
                                <div>
                                  <span
                                    className={`transition-transform ${hoveredItem === subitem.title ? "scale-110" : ""}`}
                                  >
                                    {subitem.icon}
                                  </span>
                                  <span>{subitem.title}</span>
                                </div>
                              </Button>
                            </Link>
                            {item.title === "Folders" && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Folder Actions</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => {
                                      // Open rename dialog for this folder
                                      const folder = folders.find((f) => f.id === subitem.id)
                                      if (folder) {
                                        // This would typically open a dialog to rename
                                        const newName = prompt("Enter new folder name:", folder.title)
                                        if (newName) {
                                          handleRenameFolder(folder.id, newName)
                                        }
                                      }
                                    }}
                                  >
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Rename
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-600 cursor-pointer"
                                    onClick={() => {
                                      // Confirm and delete this folder
                                      if (confirm(`Are you sure you want to delete "${subitem.title}"?`)) {
                                        handleDeleteFolder(subitem.id as string)
                                      }
                                    }}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={item.href} passHref>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-2 sidebar-item",
                        (pathname === item.href || pathname.startsWith(`${item.href}/`)) && "bg-muted font-medium",
                        hoveredItem === item.title && "bg-muted/70",
                      )}
                      onMouseEnter={() => setHoveredItem(item.title)}
                      onMouseLeave={() => setHoveredItem(null)}
                      asChild
                    >
                      <div>
                        <span className={`transition-transform ${hoveredItem === item.title ? "scale-110" : ""}`}>
                          {item.icon}
                        </span>
                        <span>{item.title}</span>
                      </div>
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </ScrollArea>
    </div>
  )
}
