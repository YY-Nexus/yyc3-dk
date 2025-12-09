"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  Zap,
  Shield,
  Globe,
  Users,
  Award,
  Heart,
  Github,
  Mail,
  ExternalLink,
  Star,
  TrendingUp,
  Code,
  Palette,
  Video,
  MessageSquare,
} from "lucide-react"
import { PageLayout } from "@/components/page-layout"

export default function AboutPage() {
  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "智能对话",
      description: "基于智谱AI GLM-4模型的多轮对话系统，支持上下文理解和知识问答",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "图文创作",
      description: "AI图片生成、智能抠图、图片修复等全方位图像处理服务",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "视频生成",
      description: "文生视频、图生视频等智能视频创作工具，支持多种风格和效果",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "代码助理",
      description: "CodeGeeX驱动的代码生成、审查、修复和补全服务",
      color: "from-green-500 to-emerald-500",
    },
  ]

  const stats = [
    { label: "AI模型", value: "10+", icon: <Sparkles className="w-5 h-5" /> },
    { label: "功能模块", value: "20+", icon: <Zap className="w-5 h-5" /> },
    { label: "用户体验", value: "99%", icon: <Heart className="w-5 h-5" /> },
    { label: "响应速度", value: "<2s", icon: <TrendingUp className="w-5 h-5" /> },
  ]

  const technologies = [
    { name: "智谱AI GLM-4", category: "对话模型", color: "bg-blue-500/20 text-blue-300" },
    { name: "CogView-3", category: "图像生成", color: "bg-pink-500/20 text-pink-300" },
    { name: "CogVideoX", category: "视频生成", color: "bg-purple-500/20 text-purple-300" },
    { name: "CodeGeeX4", category: "代码生成", color: "bg-green-500/20 text-green-300" },
    { name: "Next.js 14", category: "前端框架", color: "bg-gray-500/20 text-gray-300" },
    { name: "TypeScript", category: "开发语言", color: "bg-blue-500/20 text-blue-300" },
    { name: "Tailwind CSS", category: "样式框架", color: "bg-cyan-500/20 text-cyan-300" },
    { name: "Vercel", category: "部署平台", color: "bg-black/20 text-white" },
  ]

  return (
    <PageLayout
      title="🌟 关于 YYC³ Deekstack"
      description="基于智谱AI技术栈的全能创作平台，为您提供智能对话、图文创作、视频生成等服务"
    >
      <div className="space-y-8">
        {/* 平台介绍 */}
        <Card className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border-white/20">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl text-white mb-2">YYC³ Deekstack</CardTitle>
            <CardDescription className="text-xl text-white/80 max-w-2xl mx-auto">
              基于智谱AI技术栈构建的全能创作平台，集成多种AI模型，为用户提供智能化的内容创作体验
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-2 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 核心功能 */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">🚀 核心功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color}`}>{feature.icon}</div>
                    <div>
                      <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/80 leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 技术栈 */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              技术栈
            </CardTitle>
            <CardDescription className="text-white/80">采用业界领先的AI模型和现代化开发技术</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {technologies.map((tech, index) => (
                <div key={index} className="text-center">
                  <Badge className={`${tech.color} border-0 mb-1`}>{tech.name}</Badge>
                  <div className="text-xs text-white/60">{tech.category}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 平台特色 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <Globe className="w-8 h-8 text-blue-400 mb-2" />
              <CardTitle className="text-white">全球化服务</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/80">
                支持多语言、多地区的AI服务，为全球用户提供本地化体验
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <Users className="w-8 h-8 text-green-400 mb-2" />
              <CardTitle className="text-white">用户友好</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/80">
                简洁直观的界面设计，零学习成本，让每个人都能轻松使用AI工具
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <Award className="w-8 h-8 text-yellow-400 mb-2" />
              <CardTitle className="text-white">专业品质</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/80">
                基于智谱AI最新模型，提供企业级的AI服务质量和稳定性保障
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* 开发团队 */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Heart className="w-5 h-5 mr-2" />
              开发团队
            </CardTitle>
            <CardDescription className="text-white/80">致力于为用户提供最优质的AI创作体验</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-white/90">
                <p className="mb-2">YanYu Cloud³ 开发团队</p>
                <p className="text-sm text-white/70">专注于AI技术应用与用户体验优化</p>
              </div>
              <div className="flex justify-center gap-4">
                <Button className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Mail className="w-4 h-4 mr-2" />
                  联系我们
                </Button>
                <Button className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  官方网站
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 版本信息 */}
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between text-white/70 text-sm">
              <div className="flex items-center gap-4">
                <span>版本: v2.1.0</span>
                <span>•</span>
                <span>构建时间: {new Date().toLocaleDateString("zh-CN")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>感谢您的使用</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  )
}
