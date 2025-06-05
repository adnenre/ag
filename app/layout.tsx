import type React from "react";
import ClientRootLayout from "./clientLayout";

// Export metadata function to be dynamic with language

export const viewport = {
  themeColor: "#22c55e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: "AgriConnect - Connecting Farmers and Markets",
  description:
    "Platform for farmers and regional market agents to exchange requests",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AgriConnect",
  },
  generator: "v0.dev",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientRootLayout>{children}</ClientRootLayout>;
}

import "./globals.css";
