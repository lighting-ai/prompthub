"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Pencil, Trash2, FolderPlus } from "lucide-react"

type Folder = {
  id: string | number
  name: string
  description?: string
}

interface FolderManagementDialogProps {
  folders: Folder[]
  onCreateFolder?: (folder: Omit<Folder, "id">) => void
  onRenameFolder?: (id: string | number, name: string, description?: string) => void
  onDeleteFolder?: (id: string | number) => void
  trigger?: React.ReactNode
}

export function FolderManagementDialog({
  folders,
  onCreateFolder,
  onRenameFolder,
  onDeleteFolder,
  trigger,
}: FolderManagementDialogProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("create")
  const [newFolderName, setNewFolderName] = useState("")
  const [newFolderDescription, setNewFolderDescription] = useState("")
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null)
  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")

  const handleCreateFolder = () => {
    if (newFolderName.trim() && onCreateFolder) {
      onCreateFolder({
        name: newFolderName,
        description: newFolderDescription,
      })
      setNewFolderName("")
      setNewFolderDescription("")
      setOpen(false)
    }
  }

  const handleSelectFolder = (folder: Folder) => {
    setSelectedFolder(folder)
    setEditName(folder.name)
    setEditDescription(folder.description || "")
  }

  const handleRenameFolder = () => {
    if (selectedFolder && editName.trim() && onRenameFolder) {
      onRenameFolder(selectedFolder.id, editName, editDescription)
      setSelectedFolder(null)
      setEditName("")
      setEditDescription("")
      setOpen(false)
    }
  }

  const handleDeleteFolder = () => {
    if (selectedFolder && onDeleteFolder) {
      onDeleteFolder(selectedFolder.id)
      setSelectedFolder(null)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-1">
            <FolderPlus className="h-4 w-4" />
            <span>Manage Folders</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Folder Management</DialogTitle>
          <DialogDescription>Create, rename, or delete folders to organize your prompts.</DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="create">Create</TabsTrigger>
            <TabsTrigger value="rename">Rename</TabsTrigger>
            <TabsTrigger value="delete">Delete</TabsTrigger>
          </TabsList>
          <TabsContent value="create" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="new-folder-name">Folder Name</Label>
              <Input
                id="new-folder-name"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Enter folder name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-folder-description">Description (optional)</Label>
              <Input
                id="new-folder-description"
                value={newFolderDescription}
                onChange={(e) => setNewFolderDescription(e.target.value)}
                placeholder="Enter folder description"
              />
            </div>
            <Button onClick={handleCreateFolder} className="w-full gap-1" disabled={!newFolderName.trim()}>
              <Plus className="h-4 w-4" />
              Create Folder
            </Button>
          </TabsContent>
          <TabsContent value="rename" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select Folder</Label>
              <div className="grid gap-2 max-h-[200px] overflow-y-auto">
                {folders.map((folder) => (
                  <Button
                    key={folder.id}
                    variant={selectedFolder?.id === folder.id ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => handleSelectFolder(folder)}
                  >
                    {folder.name}
                  </Button>
                ))}
              </div>
            </div>
            {selectedFolder && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="edit-folder-name">New Name</Label>
                  <Input
                    id="edit-folder-name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Enter new folder name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-folder-description">New Description (optional)</Label>
                  <Input
                    id="edit-folder-description"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Enter new folder description"
                  />
                </div>
                <Button onClick={handleRenameFolder} className="w-full gap-1" disabled={!editName.trim()}>
                  <Pencil className="h-4 w-4" />
                  Rename Folder
                </Button>
              </>
            )}
          </TabsContent>
          <TabsContent value="delete" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select Folder to Delete</Label>
              <div className="grid gap-2 max-h-[200px] overflow-y-auto">
                {folders.map((folder) => (
                  <Button
                    key={folder.id}
                    variant={selectedFolder?.id === folder.id ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => handleSelectFolder(folder)}
                  >
                    {folder.name}
                  </Button>
                ))}
              </div>
            </div>
            {selectedFolder && (
              <Button variant="destructive" onClick={handleDeleteFolder} className="w-full gap-1">
                <Trash2 className="h-4 w-4" />
                Delete "{selectedFolder.name}"
              </Button>
            )}
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
