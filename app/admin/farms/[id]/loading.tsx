import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function FarmDetailsLoading() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-24" />
      </div>

      <div className="flex items-center justify-between space-y-2">
        <Skeleton className="h-10 w-64" />
      </div>

      <div className="flex border-b space-x-2">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))}
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="flex items-center">
                    <Skeleton className="h-5 w-5 mr-2" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {Array(4)
                  .fill(null)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-16 w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-24" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Array(3)
                .fill(null)
                .map((_, i) => (
                  <Skeleton key={i} className="h-9 w-32" />
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
