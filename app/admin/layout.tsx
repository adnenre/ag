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
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
export default function AdminLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuth();
  return (
    <div className="flex min-h-screen">
      {/* Admin Sidebar */}
      <div className="hidden w-64 flex-col bg-gray-900 text-white md:flex">
        <div className="flex h-16 items-center border-b border-gray-800 px-6">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <span className="text-xl text-green-400">AgriConnect</span>
            <span className="rounded bg-green-600 px-1.5 py-0.5 text-xs font-medium">
              Admin
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:text-white"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:text-white"
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:text-white"
            >
              <ShoppingBasket className="h-4 w-4" />
              Products
            </Link>
            <Link
              href="/admin/official-prices"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:text-white"
            >
              <FileText className="h-4 w-4" />
              Official Prices
            </Link>
            <Link
              href="/admin/traffic-map"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:text-white"
            >
              <Map className="h-4 w-4" />
              Traffic Map
            </Link>
            <Link
              href="/admin/modules"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:text-white"
            >
              <Layers className="h-4 w-4" />
              Modules
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-300 transition-all hover:text-white"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button variant="destructive" className="w-full" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Link href="/admin" className="md:hidden">
            <span className="text-xl font-semibold text-green-600">
              AgriConnect Admin
            </span>
          </Link>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
