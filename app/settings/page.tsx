"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useLanguage } from "@/contexts/language-context"
import type { Language } from "@/lib/translations"

export default function SettingsPage() {
  const { t, language, changeLanguage } = useLanguage()
  const [darkMode, setDarkMode] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)

  const handleSaveAppearance = () => {
    toast({
      title: t("success", "general"),
      description: t("appearanceDesc", "settings"),
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: t("success", "general"),
      description: t("notificationsDesc", "settings"),
    })
  }

  const handleSaveLanguage = () => {
    toast({
      title: t("success", "general"),
      description: t("languageRegionDesc", "settings"),
    })
  }

  const handleDeleteAccount = () => {
    toast({
      title: t("warning", "general"),
      description: t("deleteAccount", "settings"),
      variant: "destructive",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t("title", "settings")}</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t("appearance", "settings")}</CardTitle>
            <CardDescription>{t("appearanceDesc", "settings")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">{t("darkMode", "settings")}</Label>
                <p className="text-sm text-muted-foreground">{t("darkMode", "general")}</p>
              </div>
              <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="text-size">{t("textSize", "settings")}</Label>
              <Select defaultValue="medium">
                <SelectTrigger id="text-size">
                  <SelectValue placeholder={t("textSize", "settings")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">{t("small", "settings")}</SelectItem>
                  <SelectItem value="medium">{t("medium", "settings")}</SelectItem>
                  <SelectItem value="large">{t("large", "settings")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveAppearance} className="bg-green-600 hover:bg-green-700">
              {t("saveAppearance", "settings")}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("notifications", "settings")}</CardTitle>
            <CardDescription>{t("notificationsDesc", "settings")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">{t("emailNotifications", "settings")}</Label>
                <p className="text-sm text-muted-foreground">{t("emailNotificationsDesc", "settings")}</p>
              </div>
              <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notification-frequency">{t("notificationsDesc", "settings")}</Label>
              <Select defaultValue="daily">
                <SelectTrigger id="notification-frequency">
                  <SelectValue placeholder={t("notificationsDesc", "settings")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveNotifications} className="bg-green-600 hover:bg-green-700">
              {t("saveNotifications", "settings")}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("languageRegion", "settings")}</CardTitle>
            <CardDescription>{t("languageRegionDesc", "settings")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">{t("language", "settings")}</Label>
              <Select value={language} onValueChange={(value) => changeLanguage(value as Language)}>
                <SelectTrigger id="language">
                  <SelectValue placeholder={t("language", "settings")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">{t("region", "settings")}</Label>
              <Select defaultValue="us">
                <SelectTrigger id="region">
                  <SelectValue placeholder={t("region", "settings")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="eu">European Union</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveLanguage} className="bg-green-600 hover:bg-green-700">
              {t("saveLanguage", "settings")}
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>{t("accountSettings", "settings")}</CardTitle>
            <CardDescription>{t("accountSettingsDesc", "settings")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t("email", "general")}</Label>
                <Input id="email" defaultValue="john@farmexample.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">{t("name", "general")}</Label>
                <Input id="username" defaultValue="farmer1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">{t("timezone", "settings")}</Label>
              <Select defaultValue="america_chicago">
                <SelectTrigger id="timezone">
                  <SelectValue placeholder={t("timezone", "settings")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="america_new_york">America/New York (EST/EDT)</SelectItem>
                  <SelectItem value="america_chicago">America/Chicago (CST/CDT)</SelectItem>
                  <SelectItem value="america_denver">America/Denver (MST/MDT)</SelectItem>
                  <SelectItem value="america_los_angeles">America/Los Angeles (PST/PDT)</SelectItem>
                  <SelectItem value="europe_london">Europe/London (GMT/BST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleDeleteAccount} className="text-red-600 hover:text-red-700">
              {t("deleteAccount", "settings")}
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">{t("saveAccountSettings", "settings")}</Button>
          </CardFooter>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}
