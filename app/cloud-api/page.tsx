"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PageLayout } from "@/components/page-layout"
import {
  Server,
  Settings,
  TestTube,
  Globe,
  Zap,
  CheckCircle,
  XCircle,
  AlertCircle,
  Brain,
  MessageSquare,
  Code,
  ImageIcon,
  Video,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface APIProvider {
  id: string
  name: string
  description: string
  baseUrl: string
  apiKey: string
  enabled: boolean
  status: "online" | "offline" | "testing"
  models: string[]
  pricing: string
  features: string[]
}

interface TestResult {
  provider: string
  model: string
  success: boolean
  responseTime: number
  response: string
  error?: string
}

export default function CloudAPIPage() {
  const [providers, setProviders] = useState<APIProvider[]>([
    {
      id: "zhipu",
      name: "智谱AI (GLM)",
      description: "智谱AI提供的GLM系列大语言模型",
      baseUrl: "https://open.bigmodel.cn/api/paas/v4/",
      apiKey: "",
      enabled: true,
      status: "online",
      models: ["glm-4", "glm-4-0520", "glm-4-long", "glm-4-air", "glm-4-airx", "glm-4-flash"],
      pricing: "¥0.1/1K tokens",
      features: ["文本生成", "代码生成", "多轮对话", "长文本理解"],
    },
    {
      id: "openai",
      name: "OpenAI GPT",
      description: "OpenAI提供的GPT系列模型",
      baseUrl: "https://api.openai.com/v1/",
      apiKey: "",
      enabled: false,
      status: "offline",
      models: ["gpt-4", "gpt-4-turbo", "gpt-3.5-turbo", "gpt-4o", "gpt-4o-mini"],
      pricing: "$0.03/1K tokens",
      features: ["文本生成", "代码生成", "图像理解", "函数调用"],
    },
    {
      id: "anthropic",
      name: "Anthropic Claude",
      description: "Anthropic提供的Claude系列模型",
      baseUrl: "https://api.anthropic.com/v1/",
      apiKey: "",
      enabled: false,
      status: "offline",
      models: ["claude-3-opus", "claude-3-sonnet", "claude-3-haiku", "claude-3-5-sonnet"],
      pricing: "$0.015/1K tokens",
      features: ["文本生成", "代码分析", "长文本处理", "安全对话"],
    },
    {
      id: "baidu",
      name: "百度文心一言",
      description: "百度提供的文心大模型",
      baseUrl: "https://aip.baidubce.com/rpc/2.0/",
      apiKey: "",
      enabled: false,
      status: "offline",
      models: ["ernie-4.0", "ernie-3.5", "ernie-turbo", "ernie-speed"],
      pricing: "¥0.12/1K tokens",
      features: ["中文优化", "文本生成", "知识问答", "创意写作"],
    },
    {
      id: "alibaba",
      name: "阿里通义千问",
      description: "阿里云提供的通义千问大模型",
      baseUrl: "https://dashscope.aliyuncs.com/api/v1/",
      apiKey: "",
      enabled: false,
      status: "offline",
      models: ["qwen-turbo", "qwen-plus", "qwen-max", "qwen-max-longcontext"],
      pricing: "¥0.08/1K tokens",
      features: ["多语言支持", "代码生成", "数学推理", "创意写作"],
    },
  ])

  const [selectedProvider, setSelectedProvider] = useState<string>("zhipu")
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isTestingAll, setIsTestingAll] = useState(false)
  const [stats, setStats] = useState({
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    avgResponseTime: 0,
    activeProviders: 1,
  })

  // 模拟统计数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 10),
        successfulRequests: prev.successfulRequests + Math.floor(Math.random() * 9),
        failedRequests: prev.failedRequests + Math.floor(Math.random() * 1),
        avgResponseTime: Math.max(50, prev.avgResponseTime + (Math.random() - 0.5) * 20),
        activeProviders: providers.filter((p) => p.enabled).length,
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [providers])

  const updateProvider = (id: string, updates: Partial<APIProvider>) => {
    setProviders((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const testProvider = async (providerId: string, model: string) => {
    const provider = providers.find((p) => p.id === providerId)
    if (!provider || !provider.apiKey) {
      toast({
        title: "测试失败",
        description: "请先配置API密钥",
        variant: "destructive",
      })
      return
    }

    updateProvider(providerId, { status: "testing" })

    const startTime = Date.now()

    // 模拟API测试
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    const responseTime = Date.now() - startTime
    const success = Math.random() > 0.1 // 90% 成功率

    const result: TestResult = {
      provider: provider.name,
      model,
      success,
      responseTime,
      response: success ? `测试成功！模型 ${model} 响应正常。这是一个测试回复，用于验证API连接和模型功能。` : "",
      error: success ? undefined : "连接超时或API密钥无效",
    }

    setTestResults((prev) => [result, ...prev.slice(0, 9)])
    updateProvider(providerId, { status: success ? "online" : "offline" })

    toast({
      title: success ? "测试成功" : "测试失败",
      description: success ? `${provider.name} 模型 ${model} 测试通过，响应时间 ${responseTime}ms` : result.error,
      variant: success ? "default" : "destructive",
    })
  }

  const testAllProviders = async () => {
    setIsTestingAll(true)
    const enabledProviders = providers.filter((p) => p.enabled && p.apiKey)

    for (const provider of enabledProviders) {
      if (provider.models.length > 0) {
        await testProvider(provider.id, provider.models[0])
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    }

    setIsTestingAll(false)
    toast({
      title: "批量测试完成",
      description: `已测试 ${enabledProviders.length} 个API提供商`,
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "offline":
        return <XCircle className="w-4 h-4 text-red-400" />
      case "testing":
        return <AlertCircle className="w-4 h-4 text-yellow-400 animate-pulse" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "在线"
      case "offline":
        return "离线"
      case "testing":
        return "测试中"
      default:
        return "未知"
    }
  }

  return (
    <PageLayout title="☁️ 统一大模型API配置" description="配置和管理多个AI服务提供商的API接口，实现统一调用和负载均衡">
      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">总请求数</p>
                <p className="text-2xl font-bold text-blue-400">{stats.totalRequests.toLocaleString()}</p>
              </div>
              <Server className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">成功请求</p>
                <p className="text-2xl font-bold text-green-400">{stats.successfulRequests.toLocaleString()}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">失败请求</p>
                <p className="text-2xl font-bold text-red-400">{stats.failedRequests.toLocaleString()}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">平均响应时间</p>
                <p className="text-2xl font-bold text-purple-400">{stats.avgResponseTime.toFixed(0)}ms</p>
              </div>
              <Zap className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">活跃提供商</p>
                <p className="text-2xl font-bold text-cyan-400">{stats.activeProviders}</p>
              </div>
              <Globe className="w-8 h-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="providers" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/20 backdrop-blur-sm">
          <TabsTrigger value="providers" className="data-[state=active]:bg-white/30 text-white">
            <Settings className="w-4 h-4 mr-2" />
            API提供商
          </TabsTrigger>
          <TabsTrigger value="testing" className="data-[state=active]:bg-white/30 text-white">
            <TestTube className="w-4 h-4 mr-2" />
            功能测试
          </TabsTrigger>
          <TabsTrigger value="usage" className="data-[state=active]:bg-white/30 text-white">
            <Brain className="w-4 h-4 mr-2" />
            使用统计
          </TabsTrigger>
        </TabsList>

        {/* API提供商配置 */}
        <TabsContent value="providers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {providers.map((provider) => (
              <Card key={provider.id} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center">
                      {getStatusIcon(provider.status)}
                      <span className="ml-2">{provider.name}</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant={provider.enabled ? "default" : "secondary"}>
                        {provider.enabled ? "已启用" : "已禁用"}
                      </Badge>
                      <Badge variant="outline" className="text-white border-white/30">
                        {getStatusText(provider.status)}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm">{provider.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`enable-${provider.id}`} className="text-white">
                      启用此提供商
                    </Label>
                    <Switch
                      id={`enable-${provider.id}`}
                      checked={provider.enabled}
                      onCheckedChange={(checked) => updateProvider(provider.id, { enabled: checked })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`apikey-${provider.id}`} className="text-white">
                      API密钥
                    </Label>
                    <Input
                      id={`apikey-${provider.id}`}
                      type="password"
                      placeholder="请输入API密钥"
                      value={provider.apiKey}
                      onChange={(e) => updateProvider(provider.id, { apiKey: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`baseurl-${provider.id}`} className="text-white">
                      API基础URL
                    </Label>
                    <Input
                      id={`baseurl-${provider.id}`}
                      placeholder="API基础URL"
                      value={provider.baseUrl}
                      onChange={(e) => updateProvider(provider.id, { baseUrl: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">支持的模型</Label>
                    <div className="flex flex-wrap gap-2">
                      {provider.models.map((model) => (
                        <Badge key={model} variant="outline" className="text-white border-white/30">
                          {model}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">功能特性</Label>
                    <div className="flex flex-wrap gap-2">
                      {provider.features.map((feature) => (
                        <Badge key={feature} className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-white/70 text-sm">定价: {provider.pricing}</span>
                    <Button
                      onClick={() => provider.models.length > 0 && testProvider(provider.id, provider.models[0])}
                      disabled={!provider.enabled || !provider.apiKey || provider.status === "testing"}
                      size="sm"
                      className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-500/30"
                    >
                      <TestTube className="w-4 h-4 mr-2" />
                      {provider.status === "testing" ? "测试中..." : "测试连接"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 功能测试 */}
        <TabsContent value="testing" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TestTube className="w-5 h-5 mr-2" />
                API功能测试
              </CardTitle>
              <p className="text-white/70">测试各个API提供商的连接状态和响应性能</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Label className="text-white">选择提供商</Label>
                  <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                    <SelectTrigger className="w-64 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      {providers
                        .filter((p) => p.enabled)
                        .map((provider) => (
                          <SelectItem key={provider.id} value={provider.id} className="text-white">
                            {provider.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-x-2">
                  <Button
                    onClick={() => {
                      const provider = providers.find((p) => p.id === selectedProvider)
                      if (provider && provider.models.length > 0) {
                        testProvider(selectedProvider, provider.models[0])
                      }
                    }}
                    disabled={isTestingAll}
                    className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-500/30"
                  >
                    <TestTube className="w-4 h-4 mr-2" />
                    测试选中
                  </Button>
                  <Button
                    onClick={testAllProviders}
                    disabled={isTestingAll}
                    className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border-green-500/30"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    {isTestingAll ? "测试中..." : "批量测试"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 测试结果 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">测试结果</CardTitle>
            </CardHeader>
            <CardContent>
              {testResults.length === 0 ? (
                <div className="text-center py-8">
                  <TestTube className="w-12 h-12 text-white/30 mx-auto mb-4" />
                  <p className="text-white/70">暂无测试结果，请先进行API测试</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {testResults.map((result, index) => (
                    <Card key={index} className="bg-white/5 border-white/10">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {result.success ? (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400" />
                            )}
                            <span className="text-white font-medium">{result.provider}</span>
                            <Badge variant="outline" className="text-white border-white/30">
                              {result.model}
                            </Badge>
                          </div>
                          <Badge
                            className={result.success ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}
                          >
                            {result.responseTime}ms
                          </Badge>
                        </div>
                        {result.success ? (
                          <p className="text-white/80 text-sm">{result.response}</p>
                        ) : (
                          <p className="text-red-300 text-sm">{result.error}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 使用统计 */}
        <TabsContent value="usage" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  文本生成统计
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">总请求数</span>
                  <Badge className="bg-blue-500/20 text-blue-300">
                    {Math.floor(stats.totalRequests * 0.4).toLocaleString()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">成功率</span>
                  <Badge className="bg-green-500/20 text-green-300">
                    {((stats.successfulRequests / Math.max(stats.totalRequests, 1)) * 100).toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">平均Token数</span>
                  <Badge className="bg-purple-500/20 text-purple-300">1,247</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  代码生成统计
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">总请求数</span>
                  <Badge className="bg-blue-500/20 text-blue-300">
                    {Math.floor(stats.totalRequests * 0.3).toLocaleString()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">成功率</span>
                  <Badge className="bg-green-500/20 text-green-300">
                    {((stats.successfulRequests / Math.max(stats.totalRequests, 1)) * 100 - 2).toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">平均代码行数</span>
                  <Badge className="bg-purple-500/20 text-purple-300">156</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2" />
                  图像处理统计
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">总请求数</span>
                  <Badge className="bg-blue-500/20 text-blue-300">
                    {Math.floor(stats.totalRequests * 0.2).toLocaleString()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">成功率</span>
                  <Badge className="bg-green-500/20 text-green-300">
                    {((stats.successfulRequests / Math.max(stats.totalRequests, 1)) * 100 - 1).toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">平均处理时间</span>
                  <Badge className="bg-purple-500/20 text-purple-300">3.2s</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Video className="w-5 h-5 mr-2" />
                  视频生成统计
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">总请求数</span>
                  <Badge className="bg-blue-500/20 text-blue-300">
                    {Math.floor(stats.totalRequests * 0.1).toLocaleString()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">成功率</span>
                  <Badge className="bg-green-500/20 text-green-300">
                    {((stats.successfulRequests / Math.max(stats.totalRequests, 1)) * 100 - 5).toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">平均生成时间</span>
                  <Badge className="bg-purple-500/20 text-purple-300">45s</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* API使用趋势 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white">API使用趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Brain className="w-12 h-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/70">趋势图表功能开发中...</p>
                <p className="text-white/50 text-sm mt-2">将显示各API提供商的使用情况和性能对比</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
