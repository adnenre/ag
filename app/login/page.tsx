"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Eye, EyeOff } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

// Dummy user data
const users = [
  { username: "farmer1", password: "password", role: "farmer", name: "John Farmer" },
  { username: "farmer2", password: "password", role: "farmer", name: "Sarah Green" },
  { username: "agent1", password: "password", role: "agent", name: "Mike Agent" },
  { username: "agent2", password: "password", role: "agent", name: "Lisa Market" },
  { username: "admin", password: "admin", role: "admin", name: "Admin User" },
]

export default function LoginPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const user = users.find((u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password)

      if (user) {
        toast({
          title: t("success", "general"),
          description: t("welcomeBack", "auth").replace("{name}", user.name),
        })

        // Redirect based on role
        if (user.role === "admin") {
          router.push("/admin/official-prices")
        } else {
          router.push("/dashboard")
        }
      } else {
        toast({
          title: t("error", "general"),
          description: t("invalidCredentials", "auth"),
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{t("loginTitle", "auth")}</h1>
          <p className="text-sm text-muted-foreground">{t("loginSubtitle", "auth")}</p>
        </div>

        <Card>
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle>{t("login", "general")}</CardTitle>
              <CardDescription>
                {t("noAccount", "auth")}{" "}
                <Link href="/register" className="text-green-600 hover:underline">
                  {t("registerHere", "auth")}
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="username">{t("name", "general")}</Label>
                <Input
                  id="username"
                  placeholder={t("emailPlaceholder", "auth")}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">{t("password", "general")}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("passwordPlaceholder", "auth")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">
                      {showPassword ? t("hidePassword", "general") : t("showPassword", "general")}
                    </span>
                  </Button>
                </div>
              </div>

              <div className="text-sm text-right">
                <Link href="/forgot-password" className="text-green-600 hover:underline">
                  {t("forgotPassword", "general")}
                </Link>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading ? t("loggingIn", "auth") : t("loginButton", "auth")}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="px-8 text-center text-sm text-muted-foreground">
          <p>{t("demoAccounts", "auth")}</p>
          <p className="mt-1">
            <span className="font-semibold">{t("farmer", "auth")}:</span> farmer1 / password
          </p>
          <p>
            <span className="font-semibold">{t("agent", "auth")}:</span> agent1 / password
          </p>
          <p>
            <span className="font-semibold">{t("admin", "auth")}:</span> admin / admin
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
