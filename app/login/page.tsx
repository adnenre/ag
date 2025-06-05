"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useAuth } from "@/contexts/AuthContext";

// Dummy user data
const users = [
  {
    username: "farmer1",
    password: "password",
    role: "farmer",
    name: "John Farmer",
  },
  {
    username: "farmer2",
    password: "password",
    role: "farmer",
    name: "Sarah Green",
  },
  {
    username: "agent1",
    password: "password",
    role: "agent",
    name: "Mike Agent",
  },
  {
    username: "agent2",
    password: "password",
    role: "agent",
    name: "Lisa Market",
  },
  {
    username: "admin@gmail.com",
    password: "admin123",
    role: "admin",
    name: "Admin",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      // No need to handle redirects here as they're handled in the auth provider
    } catch (error) {
      // Error is already handled in the auth provider
      console.error("Sign in error in component:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {t("loginTitle", "auth")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("loginSubtitle", "auth")}
          </p>
        </div>

        <Card>
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle>{t("login", "general")}</CardTitle>
              <CardDescription>
                {t("noAccount", "auth")}{" "}
                <Link
                  href="/register"
                  className="text-green-600 hover:underline"
                >
                  {t("registerHere", "auth")}
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="username">{t("name", "general")}</Label>
                <Input
                  id="email"
                  placeholder={t("emailPlaceholder", "auth")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword
                        ? t("hidePassword", "general")
                        : t("showPassword", "general")}
                    </span>
                  </Button>
                </div>
              </div>

              <div className="text-sm text-right">
                <Link
                  href="/forgot-password"
                  className="text-green-600 hover:underline"
                >
                  {t("forgotPassword", "general")}
                </Link>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? t("loggingIn", "auth") : t("loginButton", "auth")}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="px-8 text-center text-sm text-muted-foreground">
          {/* <p>{t("demoAccounts", "auth")}</p>
          <p className="mt-1">
            <span className="font-semibold">{t("farmer", "auth")}:</span>{" "}
            farmer1 / password
          </p>
          <p>
            <span className="font-semibold">{t("agent", "auth")}:</span> agent1
            / password
          </p> */}
          {/* <p>
            <span className="font-semibold">{t("admin", "auth")}:</span> admin / admin
          </p> */}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
