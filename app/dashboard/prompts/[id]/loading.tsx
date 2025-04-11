import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function PromptDetailLoading() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Skeleton className="h-5 w-32 mb-4" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <div className="flex items-center gap-3 mt-2">
              <Skeleton className="h-6 w-24" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          <div className="flex gap-2">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-9 w-9" />
              ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-10 w-full mb-6" />
              <Skeleton className="h-[400px] w-full" />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <Skeleton className="h-6 w-16 mb-2" />
                <div className="flex flex-wrap gap-2">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-6 w-16" />
                    ))}
                </div>
              </div>

              <div>
                <Skeleton className="h-6 w-24 mb-2" />
                <dl className="space-y-2">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
                </dl>
              </div>

              <div>
                <Skeleton className="h-6 w-24 mb-2" />
                <div className="space-y-2">
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
