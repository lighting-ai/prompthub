import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cloud, Download, Upload, History, Shield, RefreshCw } from "lucide-react"

export default function CloudPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Cloud className="h-6 w-6" />
          Cloud Sync
        </h1>
        <p className="text-muted-foreground">Manage your cloud synchronization</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sync Status</CardTitle>
            <CardDescription>Current synchronization status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Last synced:</span>
              <span className="text-sm">5 minutes ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Sync status:</span>
              <span className="text-sm text-green-500 flex items-center gap-1">
                <RefreshCw className="h-3 w-3" />
                Up to date
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Encryption:</span>
              <span className="text-sm flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Enabled
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Cloud storage:</span>
                <span className="text-sm">128 MB / 1 GB</span>
              </div>
              <Progress value={12} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="gap-2">
              <History className="h-4 w-4" />
              Sync History
            </Button>
            <Button className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Sync Now
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backup & Restore</CardTitle>
            <CardDescription>Manage your cloud backups</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Available Backups</h3>
              <div className="rounded-md border">
                <div className="flex items-center justify-between p-3 border-b">
                  <div>
                    <p className="text-sm font-medium">Daily Backup</p>
                    <p className="text-xs text-muted-foreground">Today, 09:15 AM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border-b">
                  <div>
                    <p className="text-sm font-medium">Weekly Backup</p>
                    <p className="text-xs text-muted-foreground">Monday, 10:30 AM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3">
                  <div>
                    <p className="text-sm font-medium">Monthly Backup</p>
                    <p className="text-xs text-muted-foreground">April 1, 12:00 PM</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Backup
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Create Backup
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="devices" className="space-y-4">
          <TabsList>
            <TabsTrigger value="devices">Connected Devices</TabsTrigger>
            <TabsTrigger value="activity">Sync Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle>Connected Devices</CardTitle>
                <CardDescription>Devices that are syncing with your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="flex items-center justify-between p-3 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
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
                          className="h-4 w-4 text-blue-600 dark:text-blue-300"
                        >
                          <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
                          <path d="M12 18h.01"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">iPhone 13 Pro</p>
                        <p className="text-xs text-muted-foreground">Last active: Just now</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500 text-white">Current</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border-b">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
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
                          className="h-4 w-4 text-purple-600 dark:text-purple-300"
                        >
                          <rect width="18" height="12" x="3" y="4" rx="2" ry="2"></rect>
                          <line x1="2" x2="22" y1="20" y2="20"></line>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">MacBook Pro</p>
                        <p className="text-xs text-muted-foreground">Last active: 2 hours ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
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
                          className="h-4 w-4 text-orange-600 dark:text-orange-300"
                        >
                          <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
                          <line x1="4" x2="20" y1="8" y2="8"></line>
                          <line x1="4" x2="20" y1="16" y2="16"></line>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">iPad Air</p>
                        <p className="text-xs text-muted-foreground">Last active: Yesterday</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Add New Device
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Sync Activity</CardTitle>
                <CardDescription>Recent synchronization activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <RefreshCw className="h-5 w-5" />
                        </div>
                        <div className="h-full w-px bg-border"></div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Sync completed</p>
                        <p className="text-sm text-muted-foreground">
                          {i === 1
                            ? "5 minutes ago"
                            : i === 2
                              ? "2 hours ago"
                              : i === 3
                                ? "Yesterday"
                                : i === 4
                                  ? "2 days ago"
                                  : "1 week ago"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {`${Math.floor(Math.random() * 10) + 1} prompts synced from ${i % 2 === 0 ? "MacBook Pro" : "iPhone 13 Pro"}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
