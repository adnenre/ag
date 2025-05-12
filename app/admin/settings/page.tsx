"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useLanguage } from "@/contexts/language-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HexColorPicker } from "react-colorful"

export default function AdminSettingsPage() {
  const { t } = useLanguage()
  const [appName, setAppName] = useState("AgriConnect")
  const [appNameColor, setAppNameColor] = useState("#22c55e") // Default green color
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

  const handleSaveAppSettings = () => {
    // In a real app, this would save to a database or config file
    toast({
      title: "Settings saved",
      description: "Application settings have been updated successfully.",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Admin Settings</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Settings</CardTitle>
              <CardDescription>Configure general application settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="app-name" className="text-right">
                  Application Name
                </Label>
                <div className="col-span-3">
                  <Input id="app-name" value={appName} onChange={(e) => setAppName(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="app-name-color" className="text-right">
                  App Name Color
                </Label>
                <div className="col-span-3 space-y-2">
                  <div className="flex items-center gap-4">
                    <div
                      className="h-10 w-10 cursor-pointer rounded-md border"
                      style={{ backgroundColor: appNameColor }}
                      onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                    />
                    <Input id="app-name-color" value={appNameColor} onChange={(e) => setAppNameColor(e.target.value)} />
                    <div className="text-2xl font-bold" style={{ color: appNameColor }}>
                      {appName}
                    </div>
                  </div>
                  {isColorPickerOpen && (
                    <div className="mt-2">
                      <HexColorPicker color={appNameColor} onChange={setAppNameColor} />
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="admin-email" className="text-right">
                  Admin Email
                </Label>
                <div className="col-span-3">
                  <Input id="admin-email" type="email" defaultValue="admin@agriconnect.com" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="support-email" className="text-right">
                  Support Email
                </Label>
                <div className="col-span-3">
                  <Input id="support-email" type="email" defaultValue="support@agriconnect.com" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button onClick={handleSaveAppSettings}>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="primary-color" className="text-right">
                  Primary Color
                </Label>
                <div className="col-span-3">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-md border" style={{ backgroundColor: "#22c55e" }} />
                    <Input id="primary-color" defaultValue="#22c55e" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="logo-upload" className="text-right">
                  Logo
                </Label>
                <div className="col-span-3">
                  <Input id="logo-upload" type="file" accept="image/*" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="favicon-upload" className="text-right">
                  Favicon
                </Label>
                <div className="col-span-3">
                  <Input id="favicon-upload" type="file" accept="image/*" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button>Save Appearance</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security settings for the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password-policy" className="text-right">
                  Password Policy
                </Label>
                <div className="col-span-3">
                  <Input
                    id="password-policy"
                    defaultValue="Strong (min. 8 chars, uppercase, lowercase, number, special char)"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="session-timeout" className="text-right">
                  Session Timeout
                </Label>
                <div className="col-span-3">
                  <Input id="session-timeout" type="number" defaultValue="30" />
                  <p className="text-sm text-muted-foreground mt-1">Minutes of inactivity before session expires</p>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="two-factor" className="text-right">
                  Two-Factor Authentication
                </Label>
                <div className="col-span-3">
                  <select
                    id="two-factor"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="optional">Optional</option>
                    <option value="required">Required for Admins</option>
                    <option value="all">Required for All Users</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button>Save Security Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  )
}
