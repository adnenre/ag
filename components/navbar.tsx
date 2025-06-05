"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  UserCircle,
  Menu,
  Shield,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useLanguage } from "@/contexts/language-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useAuth } from "@/contexts/AuthContext"; // Import the auth context
export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();

  const { isAuthenticated, user, logout } = useAuth();
  // Mock authentication state - in a real app, this would come from your auth provider

  const [userRole, setUserRole] = useState(""); // or "agent" or "admin"

  // Check if we're in the admin section
  const isAdminSection = pathname?.startsWith("/admin");

  // Check if we're on the login or register page
  const isAuthPage = pathname === "/login" || pathname === "/register";

  // Don't show navbar on auth pages
  if (isAuthPage) {
    return null;
  }

  // Don't show regular navbar in admin section
  if (isAdminSection) {
    return null;
  }

  const routes = [
    {
      href: "/",
      label: t("home", "navigation"),
      active: pathname === "/",
      show: true,
    },
    {
      href: "/about",
      label: t("about", "navigation"),
      active: pathname === "/about",
      show: true,
    },
    {
      href: "/dashboard",
      label: t("dashboard", "navigation"),
      active: pathname === "/dashboard",
      show: isAuthenticated,
    },
    {
      href: "/requests",
      label: t("requests", "navigation"),
      active: pathname === "/requests",
      show: isAuthenticated,
    },
    {
      href: "/inventory",
      label: t("inventory", "navigation"),
      active: pathname === "/inventory",
      // Only show for farmers
      show: isAuthenticated,
    },
  ];

  const filteredRoutes = routes.filter((route) => route.show === true);

  const handleLogout = () => {
    toast({
      title: t("success", "general"),
      description: t("logout", "general"),
    });
    logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl text-green-600">
              {t("appName", "general")}
            </span>
            <span className="text-sm text-green-600">v0.3 </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {filteredRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => console.log("test")}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  route.active ? "text-foreground" : "text-foreground/60"
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-10" />
              <span className="sr-only">{t("menu", "general")}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetHeader>
              <SheetTitle>
                <SheetClose asChild>
                  <Link href="/" className="flex items-center space-x-2">
                    <span className="font-bold text-xl text-green-600">
                      {t("appName", "general")}
                    </span>
                  </Link>
                </SheetClose>
              </SheetTitle>
            </SheetHeader>

            <nav className="mt-6 flex flex-col space-y-4">
              {filteredRoutes.map((route) => (
                <SheetClose asChild key={route.href}>
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "text-foreground/60 transition-colors hover:text-foreground/80",
                      route.active && "text-foreground"
                    )}
                  >
                    {route.label}
                  </Link>
                </SheetClose>
              ))}
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="flex items-center text-foreground/60 transition-colors hover:text-foreground/80 mt-4"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("logout", "navigation")}
                </button>
              )}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link
              href="/"
              className="mr-6 flex items-center space-x-2 md:hidden"
            >
              <span className="font-bold text-xl text-green-600">
                {t("appName", "general")}
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <UserCircle className="h-6 w-6" />
                    <span className="sr-only">{t("account", "general")}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {t("account", "general")}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">{t("profile", "navigation")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">{t("settings", "navigation")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/subscription">
                      {t("subscription", "navigation")}
                    </Link>
                  </DropdownMenuItem>
                  {userRole === "admin" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center">
                          <Shield className="mr-2 h-4 w-4" />
                          {t("admin", "navigation")}
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("logout", "navigation")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">
                    <LogIn className="h-5 w-5 md:hidden" />
                    <span className="hidden md:inline">
                      {t("login", "navigation")}
                    </span>
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/register">
                    {" "}
                    <UserPlus className="h-5 w-5 md:hidden" />
                    <span className="hidden md:inline">
                      {t("register", "navigation")}
                    </span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </header>
  );
}
