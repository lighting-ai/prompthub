import { Skeleton } from "@/components/ui/skeleton"

export default function NewPromptLoading() {
  return (
    <div className="container mx-auto max-w-4xl py-6">
      <div className="mb-6">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="space-y-6">
        <div className="grid gap-3">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="grid gap-3">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="grid gap-3">
          <Skeleton className="h-5 w-24" />
          <div className="flex flex-wrap gap-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
          </div>
        </div>

        <div className="grid gap-3">
          <Skeleton className="h-5 w-16" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>

        <div className="grid gap-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-10 w-full mb-2" />
          <Skeleton className="h-[300px] w-full" />
        </div>

        <div className="flex justify-end gap-3">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  )
}
