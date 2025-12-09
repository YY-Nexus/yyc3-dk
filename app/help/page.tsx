"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  HelpCircle,
  Search,
  MessageSquare,
  Palette,
  Video,
  Code,
  Settings,
  BookOpen,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  ExternalLink,
} from "lucide-react"
import { PageLayout } from "@/components/page-layout"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqData = [
    {
      category: "general",
      title: "常见问题",
      icon: <HelpCircle className="w-5 h-5" />,
      items: [
        {
          question: "什么是 YYC³ Deekstack？",
          answer:
            "YYC³ Deekstack 是基于智谱AI技术栈构建的全能创作平台，集成了智能对话、图文创作、视频生成、代码助理等多种AI功能，为用户提供一站式的AI创作体验。",
        },
        {
          question: "平台支持哪些AI模型？",
          answer:
            "平台集成了智谱AI的多个先进模型：GLM-4用于智能对话，CogView-3用于图像生成，CogVideoX用于视频创作，CodeGeeX4用于代码生成等，确保各项功能的专业性和准确性。",
        },
        {
          question: "如何开始使用平台功能？",
          answer:
            "您可以直接访问各个功能页面开始使用。每个功能都有详细的操作指引，无需注册即可体验基础功能。对于高级功能，建议查看相应的使用教程。",
        },
        {
          question: "平台是否免费使用？",
          answer:
            "平台提供免费的基础功能体验，包括智能对话、图片生成等。部分高级功能可能需要付费使用，具体收费标准请查看价格页面。",
        },
      ],
    },
    {
      category: "chat",
      title: "智能对话",
      icon: <MessageSquare className="w-5 h-5" />,
      items: [
        {
          question: "智能对话支持哪些功能？",
          answer:
            "智能对话基于GLM-4模型，支持多轮对话、知识问答、文本创作、代码解释、数学计算等多种功能。可以像与真人对话一样自然交流。",
        },
        {
          question: "如何获得更好的对话效果？",
          answer:
            "建议提供清晰具体的问题描述，可以包含上下文信息。对于专业问题，可以指定领域或要求特定格式的回答。避免过于模糊或歧义的表达。",
        },
        {
          question: "对话是否有长度限制？",
          answer:
            "单次对话输入建议控制在2000字符以内，对话历史会保持上下文连贯性。长对话可能会影响响应速度，建议适时开启新对话。",
        },
      ],
    },
    {
      category: "image",
      title: "图文创作",
      icon: <Palette className="w-5 h-5" />,
      items: [
        {
          question: "支持哪些图片生成功能？",
          answer:
            "支持文生图、图生图、智能抠图、图片修复等功能。可以生成各种风格的图片，包括写实、动漫、油画、水彩等艺术风格。",
        },
        {
          question: "如何提高图片生成质量？",
          answer:
            "提供详细的描述信息，包括主体、背景、风格、色彩等要素。使用具体的形容词和专业术语。可以参考优秀的提示词模板。",
        },
        {
          question: "生成的图片可以商用吗？",
          answer:
            "生成的图片版权归用户所有，可以用于个人和商业用途。但请确保不侵犯他人版权，避免生成包含明确版权标识的内容。",
        },
      ],
    },
    {
      category: "video",
      title: "视频生成",
      icon: <Video className="w-5 h-5" />,
      items: [
        {
          question: "视频生成支持哪些模式？",
          answer:
            "支持文生视频、图生视频和视频编辑三种模式。可以根据文字描述生成视频，或基于图片创建动态视频，还可以对现有视频进行编辑处理。",
        },
        {
          question: "视频生成需要多长时间？",
          answer:
            "视频生成时间取决于视频长度和质量设置。通常3-10秒的短视频需要5-15分钟生成时间。建议在生成过程中保持页面打开。",
        },
        {
          question: "支持哪些视频格式和分辨率？",
          answer:
            "支持MP4、AVI、MOV等主流格式，分辨率可选择480P、720P、1080P等。建议根据用途选择合适的分辨率，高分辨率会增加生成时间。",
        },
      ],
    },
    {
      category: "code",
      title: "代码助理",
      icon: <Code className="w-5 h-5" />,
      items: [
        {
          question: "代码助理支持哪些编程语言？",
          answer:
            "支持Python、JavaScript、TypeScript、Java、C++、Go、Rust等主流编程语言。可以进行代码生成、审查、修复和补全等操作。",
        },
        {
          question: "如何获得高质量的代码生成？",
          answer: "提供清晰的功能需求描述，包括输入输出格式、业务逻辑、性能要求等。可以指定编程语言、框架和编码规范。",
        },
        {
          question: "生成的代码是否可以直接使用？",
          answer:
            "生成的代码经过语法检查，大部分情况下可以直接运行。但建议进行测试和优化，特别是涉及业务逻辑和安全性的代码。",
        },
      ],
    },
  ]

  const tutorials = [
    {
      title: "快速入门指南",
      description: "5分钟了解平台核心功能",
      icon: <BookOpen className="w-5 h-5" />,
      color: "from-blue-500 to-cyan-500",
      steps: ["访问功能页面", "输入需求描述", "选择参数设置", "获取AI结果"],
    },
    {
      title: "智能对话技巧",
      description: "如何与AI进行高效对话",
      icon: <MessageSquare className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500",
      steps: ["明确问题目标", "提供上下文", "使用具体描述", "迭代优化问题"],
    },
    {
      title: "图片创作指南",
      description: "掌握AI图片生成技巧",
      icon: <Palette className="w-5 h-5" />,
      color: "from-pink-500 to-rose-500",
      steps: ["描述主体内容", "指定艺术风格", "设置图片参数", "优化提示词"],
    },
    {
      title: "代码生成最佳实践",
      description: "提高代码生成质量的方法",
      icon: <Code className="w-5 h-5" />,
      color: "from-purple-500 to-violet-500",
      steps: ["明确功能需求", "指定技术栈", "描述接口规范", "添加测试用例"],
    },
  ]

  const filteredFAQ = faqData
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          searchQuery === "" ||
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.items.length > 0)

  return (
    <PageLayout title="❓ 帮助中心" description="获取使用指南、常见问题解答和技术支持">
      <div className="space-y-6">
        {/* 搜索区域 */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Search className="w-5 h-5 mr-2" />
              搜索帮助内容
            </CardTitle>
            <CardDescription className="text-white/80">输入关键词快速找到您需要的帮助信息</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <Input
                placeholder="搜索问题、功能或关键词..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/20 backdrop-blur-sm">
            <TabsTrigger value="faq" className="data-[state=active]:bg-white/30 text-white">
              <HelpCircle className="w-4 h-4 mr-2" />
              常见问题
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="data-[state=active]:bg-white/30 text-white">
              <BookOpen className="w-4 h-4 mr-2" />
              使用教程
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-white/30 text-white">
              <Settings className="w-4 h-4 mr-2" />
              技术支持
            </TabsTrigger>
          </TabsList>

          {/* 常见问题 */}
          <TabsContent value="faq" className="space-y-6">
            {filteredFAQ.length > 0 ? (
              filteredFAQ.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="bg-white/10 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      {category.icon}
                      <span className="ml-2">{category.title}</span>
                      <Badge className="ml-2 bg-white/20 text-white">{category.items.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.items.map((item, itemIndex) => (
                        <AccordionItem key={itemIndex} value={`${categoryIndex}-${itemIndex}`}>
                          <AccordionTrigger className="text-white hover:text-white/80">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-white/80 leading-relaxed">{item.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-8 text-center">
                  <AlertCircle className="w-16 h-16 mx-auto mb-4 text-white/30" />
                  <p className="text-white/60 text-lg">未找到相关问题</p>
                  <p className="text-white/40 text-sm mt-2">尝试使用不同的关键词搜索</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* 使用教程 */}
          <TabsContent value="tutorials" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutorials.map((tutorial, index) => (
                <Card
                  key={index}
                  className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${tutorial.color}`}>{tutorial.icon}</div>
                      <div>
                        <CardTitle className="text-white text-lg">{tutorial.title}</CardTitle>
                        <CardDescription className="text-white/70">{tutorial.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tutorial.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-semibold">
                            {stepIndex + 1}
                          </div>
                          <span className="text-white/80">{step}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4 bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      查看详细教程
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 技术支持 */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    获取帮助
                  </CardTitle>
                  <CardDescription className="text-white/80">多种方式获取技术支持</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-blue-500/20 border-blue-500/30 text-blue-300 hover:bg-blue-500/30">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    在线客服
                  </Button>
                  <Button className="w-full bg-green-500/20 border-green-500/30 text-green-300 hover:bg-green-500/30">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    提交工单
                  </Button>
                  <Button className="w-full bg-purple-500/20 border-purple-500/30 text-purple-300 hover:bg-purple-500/30">
                    <BookOpen className="w-4 h-4 mr-2" />
                    查看文档
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    服务状态
                  </CardTitle>
                  <CardDescription className="text-white/80">实时监控各项服务状态</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">智能对话服务</span>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">正常</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">图片生成服务</span>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">正常</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">视频生成服务</span>
                    <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">维护中</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80">代码助理服务</span>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">正常</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 text-center">
                <h3 className="text-white font-semibold mb-2">联系信息</h3>
                <div className="text-white/70 space-y-1">
                  <p>技术支持邮箱: support@yy.0379.pro</p>
                  <p>服务时间: 周一至周五 9:00-18:00</p>
                  <p>响应时间: 通常在24小时内回复</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
