"use client"

import type React from "react"
import { useEffect } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/contexts/language-context"
import { useLanguage } from "@/contexts/language-context"

const inter = Inter({ subsets: ["latin"] })

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Register service worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            console.log("ServiceWorker registration successful with scope: ", registration.scope)
          },
          (err) => {
            console.log("ServiceWorker registration failed: ", err)
          },
        )
      })
    }
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <LanguageProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

// Footer component with translation support
function Footer() {
  return (
    <LanguageProvider>
      <FooterContent />
    </LanguageProvider>
  )
}

function FooterContent() {
  const { t } = useLanguage()

  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {t("appName", "general")}. {t("allRightsReserved", "general")}.
        </p>
      </div>
    </footer>
  )
}
