"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { AnimatedLogo } from "./animated-logo"
import { APIStatusIndicator } from "./api-status-indicator"
import { Menu, X, Home, Cloud, Server, BarChart3, MessageSquare, HelpCircle, Info } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
  { name: "首页", href: "/", icon: Home },
  { name: "天气查询", href: "/weather", icon: Cloud },
  { name: "本地API", href: "/local-api", icon: Server },
  { name: "数据统计", href: "/stats", icon: BarChart3 },
  { name: "用户反馈", href: "/feedback", icon: MessageSquare },
  { name: "帮助文档", href: "/help", icon: HelpCircle },
  { name: "关于我们", href: "/about", icon: Info },
]

export function ResponsiveHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 animate-pulse"></div>
              <div className="hidden md:block">
                <div className="h-6 w-32 bg-white/20 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="h-8 w-24 bg-white/20 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-slate-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3">
              <AnimatedLogo size="md" />
              <div className="hidden md:block">
                <div className="text-white font-bold text-lg">YanYuCloud³</div>
                <div className="text-white/70 text-xs">DeekStack Platform</div>
              </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <APIStatusIndicator />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden text-white hover:bg-white/20">
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-slate-900/95 backdrop-blur-md border-white/20">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-3 pb-4 border-b border-white/20">
                    <AnimatedLogo size="sm" />
                    <div>
                      <div className="text-white font-bold">YanYuCloud³</div>
                      <div className="text-white/70 text-xs">DeekStack Platform</div>
                    </div>
                  </div>

                  {navigationItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                          isActive ? "bg-white/20 text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  })}

                  <div className="pt-4 border-t border-white/20">
                    <APIStatusIndicator />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
