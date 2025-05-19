"use client";

import { useState, useEffect } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

import { LocationAdress } from "@/components/LocationAdress";
import { LocationFarmer } from "@/components/auth/locationFarmer";
import { useLanguage } from "@/contexts/language-context";

import { useSearchParams } from "next/navigation";
export default function RegisterPage() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [userType, setSelectedUserType] = useState("agent");
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    toast({
      title: "Registration successful",
      description: "Your account has been created. You can now log in.",
    });

    // Redirect to login page after registration
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };
  // Read URL param on component mount
  useEffect(() => {
    const selectedUser = searchParams.get("selectedUser");
    if (selectedUser) {
      setSelectedUserType(selectedUser); // Update state if URL has `?option=...`
    }
  }, [searchParams]);

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[500px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {t("registerTitle", "auth")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("registerSubtitle", "auth")}
          </p>
        </div>

        <Tabs defaultValue="register" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>

          <TabsContent value="register">
            <Card>
              {/* <CardHeader>
                <CardTitle>{t("accountReg", "auth")}</CardTitle>
                <CardDescription>{t("accountRegSub", "auth")}</CardDescription>
              </CardHeader> */}
              <CardContent className="space-y-4">
                <div className="flex flex-col justify-center items-center space-y-2 justify-center">
                  <Label>{t("accountType", "auth")}</Label>
                  <RadioGroup
                    defaultValue="agent"
                    value={userType}
                    onValueChange={setSelectedUserType}
                    className="flex space-x-2 justify-center items-center"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="farmer" id="farmer" />
                      <Label htmlFor="farmer" className="cursor-pointer">
                        {t("farmer", "auth")}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="agent" id="agent" />
                      <Label htmlFor="agent" className="cursor-pointer">
                        {t("agent", "auth")}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="name">{t("fullName", "auth")}</Label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">{t("passWord", "auth")}</Label>
                  <Input id="password" type="password" />
                </div>

                {userType === "farmer" && (
                  <div className="grid gap-2">
                    <Label htmlFor="farm-name">{t("farmName", "auth")}</Label>
                    <Input id="farm-name" placeholder="Enter your farm name" />
                  </div>
                )}

                {userType === "agent" && (
                  <div className="grid gap-2">
                    <Label htmlFor="company-name">
                      {t("companyName", "auth")}
                    </Label>
                    <Input
                      id="company-name"
                      placeholder="Enter your company name"
                    />
                  </div>
                )}
                {userType === "farmer" && (
                  <div className="grid gap-2">
                    <div className="grid gap-2">
                      <Label htmlFor="location">{t("location", "auth")}</Label>
                      <LocationFarmer />
                    </div>
                  </div>
                )}
                {userType === "agent" && (
                  <div className="grid gap-2">
                    <Label htmlFor="location">{t("location", "auth")}</Label>
                    <LocationAdress />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleRegister}
                >
                  {t("createAccount", "auth")}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="m@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" type="password" />
                </div>
                <div className="text-sm text-right">
                  <Link
                    href="/forgot-password"
                    className="text-green-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Login
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </div>
  );
}
