import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { EnhancedNavigation } from "@/components/enhanced-navigation"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BookBridge - Share Books, Build Community",
  description:
    "Connect with fellow book lovers, share your favorite reads, and discover new stories in your local community.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <EnhancedNavigation />
          <main className="min-h-screen bg-gray-50">{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
