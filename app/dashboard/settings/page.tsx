import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your application preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="sync">Cloud Sync</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your general application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-save">Auto-save prompts</Label>
                  <Switch id="auto-save" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Automatically save prompts as you type</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="confirm-delete">Confirm before deleting</Label>
                  <Switch id="confirm-delete" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Show confirmation dialog before deleting prompts</p>
              </div>

              <div className="space-y-2">
                <Label>Default editor font size</Label>
                <Slider defaultValue={[14]} max={24} min={10} step={1} />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">10px</span>
                  <span className="text-sm text-muted-foreground">24px</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-folder">Default folder for new prompts</Label>
                <Select defaultValue="none">
                  <SelectTrigger id="default-folder">
                    <SelectValue placeholder="Select folder" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No folder</SelectItem>
                    <SelectItem value="code">Code Prompts</SelectItem>
                    <SelectItem value="writing">Writing Prompts</SelectItem>
                    <SelectItem value="image">Image Prompts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="display-name">Display Name</Label>
                <Input id="display-name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value="********" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Update Account</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="storage">
          <Card>
            <CardHeader>
              <CardTitle>Storage Settings</CardTitle>
              <CardDescription>Manage your local storage settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Storage Usage</Label>
                <div className="h-4 w-full rounded-full bg-secondary">
                  <div className="h-4 w-1/4 rounded-full bg-primary"></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>128 MB used</span>
                  <span>5 GB total</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="local-backup">Automatic local backup</Label>
                  <Switch id="local-backup" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Automatically backup your prompts to local storage</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backup-location">Backup Location</Label>
                <Input id="backup-location" defaultValue="C:\Users\Documents\PromptHub\Backups" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backup-frequency">Backup Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="backup-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="destructive">Clear All Local Data</Button>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="sync">
          <Card>
            <CardHeader>
              <CardTitle>Cloud Sync Settings</CardTitle>
              <CardDescription>Manage your cloud synchronization settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-sync">Enable Cloud Sync</Label>
                  <Switch id="enable-sync" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Synchronize your prompts across devices</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sync-on-change">Sync on change</Label>
                  <Switch id="sync-on-change" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Automatically sync when prompts are created or modified</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sync-frequency">Sync Frequency</Label>
                <Select defaultValue="realtime">
                  <SelectTrigger id="sync-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="manual">Manual only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="encrypt-sync">Encrypt synced data</Label>
                  <Switch id="encrypt-sync" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">
                  End-to-end encrypt your data before syncing to the cloud
                </p>
              </div>

              <Button>Sync Now</Button>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset Sync</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="justify-start">
                    <span className="mr-2 h-4 w-4 rounded-full bg-background border"></span>
                    Light
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <span className="mr-2 h-4 w-4 rounded-full bg-black"></span>
                    Dark
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <span className="mr-2 h-4 w-4 rounded-full bg-background border border-black/20 dark:border-white/20"></span>
                    System
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Font Size</Label>
                <Slider defaultValue={[16]} max={24} min={12} step={1} />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Small</span>
                  <span className="text-sm text-muted-foreground">Large</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accent-color">Accent Color</Label>
                <Select defaultValue="blue">
                  <SelectTrigger id="accent-color">
                    <SelectValue placeholder="Select accent color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="animations">Enable animations</Label>
                  <Switch id="animations" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Show animations throughout the interface</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
