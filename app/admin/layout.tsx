"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  ShoppingBasket,
  FileText,
  Settings,
  LogOut,
  Map,
  Layers,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const adminNavbarItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/users", icon: Users, label: "Users" },
    {
      href: "/admin/products",
      icon: ShoppingBasket,
      label: "Products",
    },
    {
      href: "/admin/official-prices",
      icon: FileText,
      label: "Official Prices",
    },
    {
      href: "/admin/traffic-map",
      icon: Map,
      label: "Traffic Map",
    },
    { href: "/admin/modules", icon: Layers, label: "Modules" },
    {
      href: "/admin/settings",
      icon: Settings,
      label: "Settings",
    },
  ];
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div
        className={`hidden fixed h-full flex-col bg-gray-900 text-white transition-all duration-300 md:flex ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-800 px-6">
          {sidebarOpen ? (
            <Link
              href="/admin"
              className="flex items-center gap-2 font-semibold"
            >
              <span className="text-xl text-green-400">AgriConnect</span>
              <span className="rounded bg-green-600 px-1.5 py-0.5 text-xs font-medium">
                Admin
              </span>
            </Link>
          ) : (
            <div className="flex justify-center w-full">
              <span className="text-xl text-green-400">AC</span>
            </div>
          )}
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-4 text-sm font-medium">
            {adminNavbarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  pathname === item.href
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button
            variant="destructive"
            className={`flex items-center justify-center ${
              sidebarOpen ? "w-full" : "px-3"
            }`}
            onClick={logout}
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
            {sidebarOpen && <span className="ml-2">Sign Out</span>}
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Overlay background */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleMobileMenu}
          />
          {/* Sidebar content */}
          <div className="fixed left-0 top-0 h-full w-full bg-gray-900 text-white shadow-lg">
            <div className="flex h-16 items-center justify-between border-b border-gray-800 px-6">
              <Link
                href="/admin"
                className="flex items-center gap-2 font-semibold"
              >
                <span className="text-xl text-green-400">AgriConnect</span>
                <span className="rounded bg-green-600 px-1.5 py-0.5 text-xs font-medium">
                  Admin
                </span>
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="md:hidden text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-auto py-4">
              <nav className="grid items-start px-4 text-sm font-medium">
                {adminNavbarItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex justify-center items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                      pathname === item.href
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="mt-auto p-4">
              <Button
                variant="destructive"
                className="flex w-full items-center justify-center"
                onClick={() => {
                  logout();
                  toggleMobileMenu();
                }}
              >
                <LogOut className="h-4 w-4" />
                <span className="ml-2">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`flex flex-1 flex-col ${
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6 transition-all">
          {/* Mobile menu button - shown only on small screens */}
          <button
            onClick={toggleMobileMenu}
            className="rounded-md p-1 text-gray-700 hover:bg-gray-100 hover:text-gray-900 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop sidebar toggle - shown only on medium screens and up */}
          <button
            onClick={toggleSidebar}
            className="hidden rounded-md p-1 text-gray-700 hover:bg-gray-100 hover:text-gray-900 md:block"
          >
            {sidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <Link href="/admin">
            <span className="text-xl font-semibold text-green-600">
              AgriConnect Admin
            </span>
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto ">{children}</main>
      </div>
    </div>
  );
}
