import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function CreatePromptButton() {
  return (
    <Button asChild>
      <Link href="/dashboard/prompts/new">
        <Plus className="mr-2 h-4 w-4" /> New Prompt
      </Link>
    </Button>
  )
}
