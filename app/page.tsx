"use client"

import { PageLayout } from "@/components/page-layout"
import { LogoShowcase } from "@/components/logo-showcase"
import { ResponsiveHero } from "@/components/responsive-hero"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, Zap, Brain, Settings, Server, ArrowRight, Star, Users, Clock, Shield } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

const features = [
  {
    title: "云端API服务",
    description: "集成多种第三方API，提供天气、新闻、汇率等实时数据服务",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    services: ["天气查询", "新闻资讯", "IP信息", "汇率查询"],
    href: "/weather",
  },
  {
    title: "AI智能处理",
    description: "基于先进AI模型，提供图像、视频、文本等多媒体内容处理",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    services: ["图像识别", "视频分析", "文本处理", "代码生成"],
    href: "/image",
  },
  {
    title: "本地模型管理",
    description: "支持本地大语言模型部署，提供私有化AI服务解决方案",
    icon: Server,
    color: "from-green-500 to-emerald-500",
    services: ["模型下载", "服务管理", "性能监控", "API接口"],
    href: "/local-api",
  },
  {
    title: "系统管理",
    description: "完善的系统监控、用户反馈和帮助文档管理功能",
    icon: Settings,
    color: "from-orange-500 to-red-500",
    services: ["统计分析", "用户反馈", "帮助文档", "系统设置"],
    href: "/stats",
  },
]

const statsData = [
  { label: "API调用次数", value: "1,234,567", icon: Zap },
  { label: "注册用户", value: "12,345", icon: Users },
  { label: "服务正常运行时间", value: "99.9%", icon: Clock },
  { label: "数据安全等级", value: "AAA", icon: Shield },
]

const recentUpdates = [
  {
    title: "DeepSeek-R1 模型上线",
    description: "新增DeepSeek推理模型，数学和代码能力显著提升",
    time: "2024-01-15",
    type: "新功能",
  },
  {
    title: "API性能优化",
    description: "优化了天气和新闻API的响应速度，提升用户体验",
    time: "2024-01-12",
    type: "优化",
  },
  {
    title: "界面UI升级",
    description: "全新的响应式设计，支持更好的移动端体验",
    time: "2024-01-10",
    type: "更新",
  },
]

export default function HomePage() {
  const [stats, setStats] = useState({
    cloudApiCalls: 8567,
    localApiCalls: 23456,
    uptime: 99.9,
    totalOperations: 156789,
    videoGenerated: 2345,
    codeGenerated: 8901,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setStats((prev) => ({
        cloudApiCalls: Math.min(prev.cloudApiCalls + Math.floor(Math.random() * 10), 50000),
        localApiCalls: Math.min(prev.localApiCalls + Math.floor(Math.random() * 20), 100000),
        uptime: Math.min(prev.uptime + Math.random() * 0.01, 99.99),
        totalOperations: prev.totalOperations + Math.floor(Math.random() * 15),
        videoGenerated: prev.videoGenerated + Math.floor(Math.random() * 3),
        codeGenerated: prev.codeGenerated + Math.floor(Math.random() * 5),
      }))
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const handleCloudApiClick = () => {
    window.location.href = "/cloud-api"
  }

  const handleLocalApiClick = () => {
    window.location.href = "/local-api"
  }

  return (
    <PageLayout>
      <div className="space-y-16">
        <section className="relative">
          <ResponsiveHero stats={stats} onCloudApiClick={handleCloudApiClick} onLocalApiClick={handleLocalApiClick} />
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">品牌展示</h2>
              <p className="text-xl text-slate-300">体验我们的动态Logo设计</p>
            </div>
            <LogoShowcase />
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 text-center">
                  <CardContent className="p-6">
                    <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-slate-300">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">核心功能</h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                YanYuCloud³ DeekStack Platform 提供全方位的AI服务解决方案
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color}`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                        <CardDescription className="text-slate-300 mt-2">{feature.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {feature.services.map((service, serviceIndex) => (
                        <Badge
                          key={serviceIndex}
                          className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                    <Link href={feature.href}>
                      <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 group-hover:bg-white/40 transition-all">
                        立即体验
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">最新动态</h2>
              <p className="text-xl text-slate-300">了解平台最新功能和优化</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {recentUpdates.map((update, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{update.title}</h3>
                          <Badge
                            className={`${
                              update.type === "新功能"
                                ? "bg-green-500/20 text-green-300"
                                : update.type === "优化"
                                  ? "bg-blue-500/20 text-blue-300"
                                  : "bg-purple-500/20 text-purple-300"
                            }`}
                          >
                            {update.type}
                          </Badge>
                        </div>
                        <p className="text-slate-300">{update.description}</p>
                      </div>
                      <div className="text-sm text-slate-400 ml-4">{update.time}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md border-white/20">
              <CardContent className="p-12 text-center">
                <Star className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">开始您的AI之旅</h2>
                <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                  立即体验YanYuCloud³ DeekStack Platform的强大功能，开启智能化工作流程
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/weather">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                      开始使用
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 px-8 bg-transparent"
                    >
                      了解更多
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
