"use client"

import { Badge } from "@/components/ui/badge"
import { AnimatedLogo } from "./animated-logo"
import { Heart, Github, Mail, Globe } from "lucide-react"
import Link from "next/link"

export function ResponsiveFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/20 bg-slate-900/50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <AnimatedLogo size="sm" />
              <div>
                <div className="text-white font-bold">YanYuCloud³</div>
                <div className="text-white/70 text-xs">DeekStack Platform</div>
              </div>
            </div>
            <p className="text-white/70 text-sm">万象归元于云枢，深栈智启新纪元。基于AI的全栈智能服务平台。</p>
            <div className="flex items-center space-x-2">
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                <Heart className="w-3 h-3 mr-1" />
                开源项目
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold">核心服务</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/weather" className="text-white/70 hover:text-white transition-colors">
                  天气查询
                </Link>
              </li>
              <li>
                <Link href="/local-api" className="text-white/70 hover:text-white transition-colors">
                  本地大模型
                </Link>
              </li>
              <li>
                <Link href="/image" className="text-white/70 hover:text-white transition-colors">
                  图文创作
                </Link>
              </li>
              <li>
                <Link href="/video" className="text-white/70 hover:text-white transition-colors">
                  智能视频
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold">平台信息</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-white/70 hover:text-white transition-colors">
                  帮助文档
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-white/70 hover:text-white transition-colors">
                  用户反馈
                </Link>
              </li>
              <li>
                <Link href="/stats" className="text-white/70 hover:text-white transition-colors">
                  数据统计
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold">联系我们</h3>
            <div className="flex flex-col space-y-3">
              <a
                href="https://github.com"
                className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
              </a>
              <a
                href="mailto:contact@yanyucloud.com"
                className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">联系邮箱</span>
              </a>
              <a
                href="https://yy.0379.pro"
                className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">官方网站</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/70 text-sm">© {currentYear} YanYuCloud³ DeekStack Platform. All rights reserved.</p>
          <p className="text-white/50 text-xs mt-2">Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
