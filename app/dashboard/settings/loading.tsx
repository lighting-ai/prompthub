import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function SettingsLoading() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-48" />
      </div>

      <Skeleton className="h-10 w-full max-w-md mb-4" />

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32 mb-1" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-10" />
                </div>
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          <Skeleton className="h-9 w-32" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-9 w-32" />
        </CardFooter>
      </Card>
    </div>
  )
}
