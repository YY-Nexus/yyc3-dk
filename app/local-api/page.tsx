"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Textarea } from "@/components/ui/textarea"
import { PageLayout } from "@/components/page-layout"
import {
  Activity,
  TestTube,
  Download,
  Play,
  Square,
  RefreshCw,
  CheckCircle,
  XCircle,
  Brain,
  Server,
  Monitor,
  Search,
  ChevronDown,
  ChevronRight,
  Trash2,
  Settings,
  Filter,
  Wifi,
  WifiOff,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface OllamaModel {
  name: string
  tag: string
  series: string
  size: string
  description: string
  capabilities: string[]
  type: string[]
  contextLength: string
  requirements: {
    ram: string
    vram: string
    disk: string
  }
  downloaded: boolean
  running: boolean
  updateTime: string
}

interface OllamaServiceStatus {
  isRunning: boolean
  models: OllamaModel[]
  runningModels: string[]
  systemInfo?: {
    cpu: string
    memory: string
    gpu: string
    disk: string
  }
  apiEndpoint?: string
  apiKey?: string
  defaultOptions?: {
    temperature: number
    max_tokens: number
    top_p: number
  }
}

export default function LocalAPIPage() {
  const [serviceStatus, setServiceStatus] = useState<OllamaServiceStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSeries, setSelectedSeries] = useState<string>("all")
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [testPrompt, setTestPrompt] = useState("你好，请介绍一下你自己。")
  const [testResult, setTestResult] = useState("")
  const [isTesting, setIsTesting] = useState(false)
  const [expandedSeries, setExpandedSeries] = useState<Set<string>>(new Set())
  const [operatingModel, setOperatingModel] = useState<string>("")
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({})
  const [seriesDropdownOpen, setSeriesDropdownOpen] = useState(false)
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false)

  const seriesDropdownRef = useRef<HTMLDivElement>(null)
  const modelDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (seriesDropdownRef.current && !seriesDropdownRef.current.contains(event.target as Node)) {
        setSeriesDropdownOpen(false)
      }
      if (modelDropdownRef.current && !modelDropdownRef.current.contains(event.target as Node)) {
        setModelDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const fetchServiceStatus = async () => {
    try {
      const mockData: OllamaServiceStatus = {
        isRunning: true,
        models: [
          {
            name: "deepseek-r1",
            tag: "7b",
            series: "DeepSeek",
            size: "7B",
            description: "DeepSeek推理模型，具备强大的数学和代码能力",
            capabilities: ["数学推理", "代码生成", "逻辑分析", "问题解决"],
            type: ["推理", "代码"],
            contextLength: "32K",
            requirements: { ram: "8GB", vram: "6GB", disk: "4.1GB" },
            downloaded: true,
            running: true,
            updateTime: "2024-01-15",
          },
          {
            name: "gemma2",
            tag: "9b",
            series: "Gemma",
            size: "9B",
            description: "Google开源轻量级模型，效率与性能并重",
            capabilities: ["对话", "文本生成", "翻译", "摘要"],
            type: ["通用", "对话"],
            contextLength: "8K",
            requirements: { ram: "12GB", vram: "8GB", disk: "5.2GB" },
            downloaded: true,
            running: false,
            updateTime: "2024-01-10",
          },
          {
            name: "qwen2.5",
            tag: "14b",
            series: "Qwen",
            size: "14B",
            description: "阿里云通义千问2.5，中文理解能力出色",
            capabilities: ["中文对话", "多语言", "代码", "数学"],
            type: ["中文", "多语言"],
            contextLength: "32K",
            requirements: { ram: "16GB", vram: "12GB", disk: "8.1GB" },
            downloaded: false,
            running: false,
            updateTime: "2024-01-12",
          },
          {
            name: "llama2",
            tag: "7b",
            series: "Llama",
            size: "7B",
            description: "Meta开源大型语言模型，多语言能力优秀",
            capabilities: ["对话", "多语言", "文本生成", "知识问答"],
            type: ["通用", "多语言"],
            contextLength: "4K",
            requirements: { ram: "8GB", vram: "6GB", disk: "4.1GB" },
            downloaded: true,
            running: false,
            updateTime: "2024-01-05",
          },
          {
            name: "codellama",
            tag: "7b",
            series: "Llama",
            size: "7B",
            description: "专注于代码生成与理解的Llama变体",
            capabilities: ["代码生成", "代码补全", "代码解释", "编程问答"],
            type: ["代码", "编程"],
            contextLength: "16K",
            requirements: { ram: "8GB", vram: "6GB", disk: "4.1GB" },
            downloaded: false,
            running: false,
            updateTime: "2024-01-08",
          },
          {
            name: "claude-instant",
            tag: "1.3",
            series: "Claude",
            size: "12B",
            description: "AI21 Labs开发的高性能模型，适合长文本处理",
            capabilities: ["长文本处理", "摘要", "推理", "创作"],
            type: ["通用", "长文本"],
            contextLength: "100K",
            requirements: { ram: "16GB", vram: "10GB", disk: "7.2GB" },
            downloaded: false,
            running: false,
            updateTime: "2024-01-03",
          },
        ],
        runningModels: ["deepseek-r1:7b"],
        systemInfo: {
          cpu: "Intel i7-12700K (12核24线程)",
          memory: "32GB DDR4",
          gpu: "NVIDIA RTX 4090 (24GB)",
          disk: "2TB NVMe SSD",
        },
        apiEndpoint: "http://localhost:11434/api/generate",
        apiKey: "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        defaultOptions: {
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 0.9,
        },
      }

      setServiceStatus(mockData)
      if (mockData.models.length > 0 && !selectedModel) {
        const runningModel = mockData.models.find((m) => m.running)
        if (runningModel) {
          setSelectedModel(`${runningModel.name}:${runningModel.tag}`)
        }
      }
    } catch (error) {
      toast({
        title: "连接失败",
        description: "无法连接到本地模型服务",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleModelOperation = async (action: string, modelName: string, tag = "latest") => {
    const modelKey = `${modelName}:${tag}`
    setOperatingModel(modelKey)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "操作成功",
        description: `${action === "download" ? "下载" : action === "start" ? "启动" : "停止"}模型成功`,
      })

      if (action === "download") {
        simulateDownloadProgress(modelKey)
      }

      await fetchServiceStatus()
    } catch (error) {
      toast({
        title: "操作失败",
        description: "网络连接错误",
        variant: "destructive",
      })
    } finally {
      setOperatingModel("")
    }
  }

  const simulateDownloadProgress = (modelKey: string) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 10
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setTimeout(() => {
          setDownloadProgress((prev) => {
            const newProgress = { ...prev }
            delete newProgress[modelKey]
            return newProgress
          })
        }, 1000)
      }
      setDownloadProgress((prev) => ({
        ...prev,
        [modelKey]: progress,
      }))
    }, 500)
  }

  const testModel = async () => {
    if (!selectedModel || !testPrompt.trim()) {
      toast({
        title: "测试失败",
        description: "请选择模型并输入测试提示词",
        variant: "destructive",
        duration: 5000,
      })
      return
    }

    const [modelName, tag] = selectedModel.split(":")
    setIsTesting(true)
    setTestResult("正在生成回复...")

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      let modelSpecificReply = ""
      if (modelName.includes("deepseek")) {
        modelSpecificReply =
          "我是DeepSeek-r1模型，专注于数学推理和代码生成。我可以帮你解决复杂的数学问题，生成高质量的代码，以及进行各种逻辑分析任务。有什么我可以帮助你的吗？"
      } else if (modelName.includes("gemma")) {
        modelSpecificReply =
          "你好！我是Gemma2模型，一个轻量级的AI助手。我可以进行流畅的对话，生成文本内容，进行翻译和摘要等任务。请问有什么我可以为你做的？"
      } else if (modelName.includes("qwen")) {
        modelSpecificReply =
          "你好！我是通义千问2.5模型，专门优化了中文理解和生成能力。我可以处理多种任务，包括中文对话、多语言交互、代码生成和数学推理。请问需要什么帮助？"
      } else {
        modelSpecificReply =
          "你好！我是一个AI助手，可以帮助你回答问题、进行对话、协助编程、文本处理等多种任务。我会尽力为你提供准确、有用的信息和建议。有什么我可以帮助你的吗？"
      }

      setTestResult(`模型 ${selectedModel} 的回复：\n\n${modelSpecificReply}`)
    } catch (error) {
      setTestResult("测试失败: 网络连接错误")
    } finally {
      setIsTesting(false)
    }
  }

  const toggleSeries = (series: string) => {
    setExpandedSeries((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(series)) {
        newSet.delete(series)
      } else {
        newSet.add(series)
      }
      return newSet
    })
  }

  const getFilteredModels = () => {
    if (!serviceStatus) return []

    let filtered = serviceStatus.models

    if (selectedSeries !== "all") {
      filtered = filtered.filter((m) => m.series === selectedSeries)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query) ||
          m.capabilities.some((cap) => cap.toLowerCase().includes(query)),
      )
    }

    return filtered
  }

  const getModelsBySeries = () => {
    const filtered = getFilteredModels()
    const grouped: Record<string, OllamaModel[]> = {}

    filtered.forEach((model) => {
      if (!grouped[model.series]) {
        grouped[model.series] = []
      }
      grouped[model.series].push(model)
    })

    return grouped
  }

  const getStatusIcon = (model: OllamaModel) => {
    if (operatingModel === `${model.name}:${model.tag}`) {
      return <RefreshCw className="w-4 h-4 text-yellow-400 animate-spin" />
    }
    if (model.running) {
      return <CheckCircle className="w-4 h-4 text-green-400" />
    }
    if (model.downloaded) {
      return <Square className="w-4 h-4 text-blue-400" />
    }
    return <XCircle className="w-4 h-4 text-gray-400" />
  }

  const getStatusText = (model: OllamaModel) => {
    if (operatingModel === `${model.name}:${model.tag}`) {
      return "操作中..."
    }
    if (model.running) {
      return "运行中"
    }
    if (model.downloaded) {
      return "已下载"
    }
    return "未下载"
  }

  const getSeriesStats = () => {
    if (!serviceStatus) return []

    const series = Array.from(new Set(serviceStatus.models.map((m) => m.series)))
    return series.map((s) => {
      const models = serviceStatus.models.filter((m) => m.series === s)
      return {
        name: s,
        total: models.length,
        downloaded: models.filter((m) => m.downloaded).length,
        running: models.filter((m) => m.running).length,
      }
    })
  }

  const handleSeriesSelect = (series: string) => {
    setSelectedSeries(series)
    setSeriesDropdownOpen(false)
  }

  const handleModelSelect = (modelKey: string) => {
    setSelectedModel(modelKey)
    setModelDropdownOpen(false)
  }

  useEffect(() => {
    fetchServiceStatus()
    const interval = setInterval(fetchServiceStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <PageLayout title="🖥️ 本地大模型API管理" description="加载中...">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-400" />
          <span className="ml-2 text-white">正在加载服务状态...</span>
        </div>
      </PageLayout>
    )
  }

  const modelsBySeries = getModelsBySeries()
  const seriesStats = getSeriesStats()

  return (
    <PageLayout
      title="🖥️ 本地大模型API管理"
      description="基于Ollama的本地AI模型管理平台，支持自动发现、一键部署、混合推理"
    >
      <div className="mb-8">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {serviceStatus?.isRunning ? (
                    <Wifi className="w-5 h-5 text-green-400" />
                  ) : (
                    <WifiOff className="w-5 h-5 text-red-400" />
                  )}
                  <span className="text-white font-medium">
                    Ollama服务: {serviceStatus?.isRunning ? "在线" : "离线"}
                  </span>
                </div>
                <Badge
                  className={serviceStatus?.isRunning ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}
                >
                  {serviceStatus?.isRunning ? "正常运行" : "服务未启动"}
                </Badge>
              </div>
              <Button
                onClick={fetchServiceStatus}
                size="sm"
                className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                刷新状态
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {serviceStatus?.isRunning && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">运行模型</p>
                  <p className="text-2xl font-bold text-green-400">{serviceStatus.runningModels.length}</p>
                </div>
                <Brain className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">已下载模型</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {serviceStatus.models.filter((m) => m.downloaded).length}
                  </p>
                </div>
                <Download className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">模型系列</p>
                  <p className="text-2xl font-bold text-purple-400">{seriesStats.length}</p>
                </div>
                <Server className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">总模型数</p>
                  <p className="text-2xl font-bold text-cyan-400">{serviceStatus.models.length}</p>
                </div>
                <Activity className="w-8 h-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/20 backdrop-blur-sm mb-8">
          <TabsTrigger value="models" className="data-[state=active]:bg-white/30 text-white">
            <Brain className="w-4 h-4 mr-2" />
            模型管理
          </TabsTrigger>
          <TabsTrigger value="testing" className="data-[state=active]:bg-white/30 text-white">
            <TestTube className="w-4 h-4 mr-2" />
            模型测试
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-white/30 text-white">
            <Monitor className="w-4 h-4 mr-2" />
            系统信息
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-white/30 text-white">
            <Settings className="w-4 h-4 mr-2" />
            API配置
          </TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-white">搜索模型</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                    <Input
                      placeholder="搜索模型名称、描述或功能..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                </div>
                <div className="space-y-2 relative" ref={seriesDropdownRef}>
                  <Label className="text-white">筛选系列</Label>
                  <Button
                    variant="outline"
                    onClick={() => setSeriesDropdownOpen(!seriesDropdownOpen)}
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 justify-between"
                  >
                    <div className="flex items-center">
                      <Filter className="w-4 h-4 mr-2" />
                      {selectedSeries === "all" ? "所有系列" : selectedSeries}
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${seriesDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </Button>

                  {seriesDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-[9999] py-2 max-h-64 overflow-y-auto">
                      <button
                        onClick={() => handleSeriesSelect("all")}
                        className={`w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors ${
                          selectedSeries === "all" ? "bg-white/20" : ""
                        }`}
                      >
                        所有系列
                      </button>
                      {seriesStats.map((series) => (
                        <button
                          key={series.name}
                          onClick={() => handleSeriesSelect(series.name)}
                          className={`w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors ${
                            selectedSeries === series.name ? "bg-white/20" : ""
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{series.name}</span>
                            <div className="flex space-x-2">
                              <Badge className="bg-blue-500/20 text-blue-300 text-xs">{series.total}个</Badge>
                              <Badge className="bg-green-500/20 text-green-300 text-xs">
                                {series.downloaded}已下载
                              </Badge>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {Object.entries(modelsBySeries).map(([series, models]) => (
              <Card key={series} className="bg-white/10 backdrop-blur-md border-white/20">
                <Collapsible open={expandedSeries.has(series)} onOpenChange={() => toggleSeries(series)}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {expandedSeries.has(series) ? (
                            <ChevronDown className="w-5 h-5 text-white" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-white" />
                          )}
                          <CardTitle className="text-white text-lg">{series} 系列</CardTitle>
                          <Badge className="bg-blue-500/20 text-blue-300">{models.length} 个模型</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-500/20 text-green-300">
                            {models.filter((m) => m.downloaded).length} 已下载
                          </Badge>
                          <Badge className="bg-purple-500/20 text-purple-300">
                            {models.filter((m) => m.running).length} 运行中
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0 px-6 pb-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {models.map((model) => {
                          const modelKey = `${model.name}:${model.tag}`
                          const isDownloading = downloadProgress[modelKey] !== undefined

                          return (
                            <Card key={modelKey} className="bg-white/5 border-white/10">
                              <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    {getStatusIcon(model)}
                                    <CardTitle className="text-white text-sm">
                                      {model.name}:{model.tag}
                                    </CardTitle>
                                  </div>
                                  <Badge className="text-xs">{getStatusText(model)}</Badge>
                                </div>
                                <p className="text-white/70 text-xs">{model.description}</p>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                <div className="grid grid-cols-3 gap-2 text-xs">
                                  <div className="bg-white/5 p-2 rounded">
                                    <div className="text-white/70">大小</div>
                                    <div className="text-white">{model.size}</div>
                                  </div>
                                  <div className="bg-white/5 p-2 rounded">
                                    <div className="text-white/70">上下文</div>
                                    <div className="text-white">{model.contextLength}</div>
                                  </div>
                                  <div className="bg-white/5 p-2 rounded">
                                    <div className="text-white/70">类型</div>
                                    <div className="text-white">{model.type.join(", ")}</div>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label className="text-white text-xs">功能特性</Label>
                                  <div className="flex flex-wrap gap-1">
                                    {model.capabilities.slice(0, 3).map((capability) => (
                                      <Badge
                                        key={capability}
                                        className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs"
                                      >
                                        {capability}
                                      </Badge>
                                    ))}
                                    {model.capabilities.length > 3 && (
                                      <Badge className="bg-gray-500/20 text-gray-300 text-xs">
                                        +{model.capabilities.length - 3}
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label className="text-white text-xs">系统要求</Label>
                                  <div className="grid grid-cols-3 gap-1 text-xs">
                                    <div className="bg-white/5 p-1 rounded text-center">
                                      <div className="text-white/70">RAM</div>
                                      <div className="text-white">{model.requirements.ram}</div>
                                    </div>
                                    <div className="bg-white/5 p-1 rounded text-center">
                                      <div className="text-white/70">VRAM</div>
                                      <div className="text-white">{model.requirements.vram}</div>
                                    </div>
                                    <div className="bg-white/5 p-1 rounded text-center">
                                      <div className="text-white/70">磁盘</div>
                                      <div className="text-white">{model.requirements.disk}</div>
                                    </div>
                                  </div>
                                </div>

                                {isDownloading && (
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                      <span className="text-white/70">下载进度</span>
                                      <span className="text-white">{downloadProgress[modelKey]?.toFixed(1)}%</span>
                                    </div>
                                    <Progress value={downloadProgress[modelKey]} className="h-2" />
                                  </div>
                                )}

                                <div className="flex items-center justify-between pt-2">
                                  <div className="flex space-x-1">
                                    {!model.downloaded ? (
                                      <Button
                                        onClick={() => handleModelOperation("download", model.name, model.tag)}
                                        disabled={operatingModel === modelKey || isDownloading}
                                        size="sm"
                                        className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-500/30 text-xs px-2 py-1"
                                      >
                                        <Download className="w-3 h-3 mr-1" />
                                        {isDownloading ? "下载中" : "下载"}
                                      </Button>
                                    ) : (
                                      <>
                                        {!model.running ? (
                                          <Button
                                            onClick={() => handleModelOperation("start", model.name, model.tag)}
                                            disabled={operatingModel === modelKey}
                                            size="sm"
                                            className="bg-green-500/20 hover:bg-green-500/30 text-green-300 border-green-500/30 text-xs px-2 py-1"
                                          >
                                            <Play className="w-3 h-3 mr-1" />
                                            启动
                                          </Button>
                                        ) : (
                                          <Button
                                            onClick={() => handleModelOperation("stop", model.name, model.tag)}
                                            disabled={operatingModel === modelKey}
                                            size="sm"
                                            className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-500/30 text-xs px-2 py-1"
                                          >
                                            <Square className="w-3 h-3 mr-1" />
                                            停止
                                          </Button>
                                        )}
                                        <Button
                                          onClick={() => handleModelOperation("delete", model.name, model.tag)}
                                          disabled={operatingModel === modelKey || model.running}
                                          size="sm"
                                          className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-500/30 text-xs px-2 py-1"
                                        >
                                          <Trash2 className="w-3 h-3 mr-1" />
                                          删除
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                  <div className="text-xs text-white/50">{model.updateTime}</div>
                                </div>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="testing" className="space-y-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TestTube className="w-5 h-5 mr-2" />
                模型功能测试
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-white">选择测试模型</Label>
                <div className="relative" ref={modelDropdownRef}>
                  <Button
                    variant="outline"
                    onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 justify-between"
                  >
                    {selectedModel || "选择一个已下载的模型"}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${modelDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </Button>

                  {modelDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-[9999] py-2 max-h-64 overflow-y-auto">
                      {serviceStatus?.models
                        .filter((m) => m.downloaded)
                        .map((model) => {
                          const modelKey = `${model.name}:${model.tag}`
                          return (
                            <button
                              key={modelKey}
                              onClick={() => handleModelSelect(modelKey)}
                              className={`w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors ${
                                selectedModel === modelKey ? "bg-white/20" : ""
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span>{modelKey}</span>
                                <Badge
                                  className={
                                    model.running ? "bg-green-500/20 text-green-300" : "bg-gray-500/20 text-gray-400"
                                  }
                                >
                                  {model.running ? "运行中" : "已停止"}
                                </Badge>
                              </div>
                            </button>
                          )
                        })}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">测试提示词</Label>
                <Textarea
                  value={testPrompt}
                  onChange={(e) => setTestPrompt(e.target.value)}
                  placeholder="输入测试提示词..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  rows={3}
                />
              </div>

              <Button
                onClick={testModel}
                disabled={isTesting || !selectedModel}
                className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-500/30"
              >
                <TestTube className="w-4 h-4 mr-2" />
                {isTesting ? "测试中..." : "开始测试"}
              </Button>

              {testResult && (
                <div className="space-y-2">
                  <Label className="text-white">测试结果</Label>
                  <div className="bg-white/5 border border-white/10 rounded p-4 max-h-64 overflow-y-auto">
                    <pre className="text-white/90 whitespace-pre-wrap text-sm">{testResult}</pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Monitor className="w-5 h-5 mr-2" />
                系统硬件信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {serviceStatus?.systemInfo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                      <span className="text-white/80">处理器</span>
                      <span className="text-white">{serviceStatus.systemInfo.cpu}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                      <span className="text-white/80">内存</span>
                      <span className="text-white">{serviceStatus.systemInfo.memory}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                      <span className="text-white/80">显卡</span>
                      <span className="text-white">{serviceStatus.systemInfo.gpu}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                      <span className="text-white/80">存储</span>
                      <span className="text-white">{serviceStatus.systemInfo.disk}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                服务统计
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {seriesStats.map((series) => (
                  <div key={series.name} className="bg-white/5 p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">{series.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/70">总数</span>
                        <span className="text-white">{series.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">已下载</span>
                        <span className="text-green-300">{series.downloaded}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">运行中</span>
                        <span className="text-purple-300">{series.running}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                API配置信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {serviceStatus && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-white">API端点</Label>
                      <div className="bg-white/5 border border-white/10 rounded p-3">
                        <code className="text-green-300 text-sm">{serviceStatus.apiEndpoint}</code>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">API密钥</Label>
                      <div className="bg-white/5 border border-white/10 rounded p-3">
                        <code className="text-blue-300 text-sm">{serviceStatus.apiKey}</code>
                      </div>
                    </div>
                  </div>

                  {serviceStatus.defaultOptions && (
                    <div className="space-y-2">
                      <Label className="text-white">默认参数配置</Label>
                      <div className="bg-white/5 border border-white/10 rounded p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/70">Temperature:</span>
                            <span className="text-white">{serviceStatus.defaultOptions.temperature}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Max Tokens:</span>
                            <span className="text-white">{serviceStatus.defaultOptions.max_tokens}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Top P:</span>
                            <span className="text-white">{serviceStatus.defaultOptions.top_p}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="text-white">使用示例</Label>
                    <div className="bg-slate-800/50 border border-white/10 rounded p-4">
                      <pre className="text-green-300 text-xs overflow-x-auto">
                        {`curl -X POST ${serviceStatus.apiEndpoint} \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${serviceStatus.apiKey}" \\
  -d '{
    "model": "deepseek-r1:7b",
    "prompt": "你好，请介绍一下你自己。",
    "stream": false
  }'`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
