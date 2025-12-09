import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { PageTransition } from "@/components/page-transition"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "YanYuCloud³ DeekStack Platform | 万象归元于云枢，深栈智启新纪元",
  description:
    "YanYuCloud³ DeekStack Platform - 基于智谱AI的全栈智能服务平台，提供天气查询、IP查询、汇率转换等多种API服务",
  keywords: "YanYuCloud³, DeekStack Platform, 智谱AI, 全栈开发, API服务, 天气查询, IP查询, 汇率转换",
  authors: [{ name: "YanYuCloud³ DeekStack Team" }],
  creator: "YanYuCloud³ DeekStack Platform",
  publisher: "YanYuCloud³ DeekStack Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://yy.0379.pro"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "YanYuCloud³ DeekStack Platform | 万象归元于云枢，深栈智启新纪元",
    description: "基于智谱AI的全栈智能服务平台",
    url: "https://yy.0379.pro",
    siteName: "YanYuCloud³ DeekStack Platform",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YanYuCloud³ DeekStack Platform | 万象归元于云枢，深栈智启新纪元",
    description: "基于智谱AI的全栈智能服务平台",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#1e40af" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PageTransition>{children}</PageTransition>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
