"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Activity, Server, Cpu, HardDrive, Wifi, Zap, BarChart3, PieChart, LineChart } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table"
import { Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from "@/components/ui/stat"

interface SystemStats {
  cpuUsage: number
  memoryUsage: number
  diskUsage: number
  networkSpeed: number
  uptime: number
  activeUsers: number
  totalRequests: number
  errorRate: number
  responseTime: number
  concurrentConnections: number
  throughput: number
  latency: number
}

interface ServiceStats {
  weather: { requests: number; success: number }
  ip: { requests: number; success: number }
  currency: { requests: number; success: number }
  ai: { requests: number; success: number }
  image: { requests: number; success: number }
  video: { requests: number; success: number }
  code: { requests: number; success: number }
  text: { requests: number; success: number }
}

interface HistoricalData {
  cpu: number[]
  memory: number[]
  disk: number[]
  timeLabels: string[]
}

export default function StatsPage() {
  const [systemStats, setSystemStats] = useState<SystemStats>({
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    networkSpeed: 0,
    uptime: 0,
    activeUsers: 0,
    totalRequests: 0,
    errorRate: 0,
    responseTime: 0,
    concurrentConnections: 0,
    throughput: 0,
    latency: 0,
  })

  const [serviceStats, setServiceStats] = useState<ServiceStats>({
    weather: { requests: 0, success: 0 },
    ip: { requests: 0, success: 0 },
    currency: { requests: 0, success: 0 },
    ai: { requests: 0, success: 0 },
    image: { requests: 0, success: 0 },
    video: { requests: 0, success: 0 },
    code: { requests: 0, success: 0 },
    text: { requests: 0, success: 0 },
  })

  const [historicalData, setHistoricalData] = useState<HistoricalData>({
    cpu: [],
    memory: [],
    disk: [],
    timeLabels: [],
  })

  // 模拟实时数据更新
  useEffect(() => {
    const updateStats = () => {
      // 更新系统统计数据
      setSystemStats((prev) => ({
        cpuUsage: Math.min(Math.max(prev.cpuUsage + (Math.random() - 0.5) * 10, 5), 100),
        memoryUsage: Math.min(Math.max(prev.memoryUsage + (Math.random() - 0.5) * 5, 10), 100),
        diskUsage: Math.min(Math.max(prev.diskUsage + (Math.random() - 0.3) * 0.5, 20), 95),
        networkSpeed: Math.max(Math.random() * 150, 10),
        uptime: Math.min(prev.uptime + 0.001, 100),
        activeUsers: Math.max(prev.activeUsers + Math.floor((Math.random() - 0.5) * 10), 0),
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 20),
        errorRate: Math.max(Math.min(prev.errorRate + (Math.random() - 0.5) * 0.2, 3), 0),
        responseTime: Math.max(Math.min(prev.responseTime + (Math.random() - 0.5) * 20, 200), 50),
        concurrentConnections: Math.max(prev.concurrentConnections + Math.floor((Math.random() - 0.5) * 5), 10),
        throughput: Math.max(Math.min(prev.throughput + (Math.random() - 0.5) * 15, 200), 50),
        latency: Math.max(Math.min(prev.latency + (Math.random() - 0.5) * 5, 100), 10),
      }))

      // 更新服务统计数据
      setServiceStats((prev) => ({
        weather: {
          requests: prev.weather.requests + Math.floor(Math.random() * 5),
          success: prev.weather.success + Math.floor(Math.random() * 4.5),
        },
        ip: {
          requests: prev.ip.requests + Math.floor(Math.random() * 3),
          success: prev.ip.success + Math.floor(Math.random() * 2.8),
        },
        currency: {
          requests: prev.currency.requests + Math.floor(Math.random() * 4),
          success: prev.currency.success + Math.floor(Math.random() * 3.8),
        },
        ai: {
          requests: prev.ai.requests + Math.floor(Math.random() * 15),
          success: prev.ai.success + Math.floor(Math.random() * 14),
        },
        image: {
          requests: prev.image.requests + Math.floor(Math.random() * 8),
          success: prev.image.success + Math.floor(Math.random() * 7.5),
        },
        video: {
          requests: prev.video.requests + Math.floor(Math.random() * 5),
          success: prev.video.success + Math.floor(Math.random() * 4.6),
        },
        code: {
          requests: prev.code.requests + Math.floor(Math.random() * 10),
          success: prev.code.success + Math.floor(Math.random() * 9.2),
        },
        text: {
          requests: prev.text.requests + Math.floor(Math.random() * 12),
          success: prev.text.success + Math.floor(Math.random() * 11),
        },
      }))

      // 更新历史数据
      setHistoricalData((prev) => {
        const now = new Date()
        const timeLabel =
          now.getHours().toString().padStart(2, "0") +
          ":" +
          now.getMinutes().toString().padStart(2, "0") +
          ":" +
          now.getSeconds().toString().padStart(2, "0")

        // 保持最新10个数据点
        const newCpu = [...prev.cpu.slice(-9), systemStats.cpuUsage]
        const newMemory = [...prev.memory.slice(-9), systemStats.memoryUsage]
        const newDisk = [...prev.disk.slice(-9), systemStats.diskUsage]
        const newTimeLabels = [...prev.timeLabels.slice(-9), timeLabel]

        return {
          cpu: newCpu,
          memory: newMemory,
          disk: newDisk,
          timeLabels: newTimeLabels,
        }
      })
    }

    // 初始化数据
    setSystemStats({
      cpuUsage: Math.random() * 40 + 20,
      memoryUsage: Math.random() * 50 + 30,
      diskUsage: Math.random() * 30 + 20,
      networkSpeed: Math.random() * 80 + 20,
      uptime: 99.5 + Math.random() * 0.4,
      activeUsers: Math.floor(Math.random() * 100 + 50),
      totalRequests: Math.floor(Math.random() * 10000 + 5000),
      errorRate: Math.random() * 1 + 0.5,
      responseTime: Math.random() * 100 + 50,
      concurrentConnections: Math.floor(Math.random() * 50 + 20),
      throughput: Math.random() * 100 + 50,
      latency: Math.random() * 50 + 20,
    })

    setServiceStats({
      weather: { requests: Math.floor(Math.random() * 500 + 200), success: Math.floor(Math.random() * 480 + 190) },
      ip: { requests: Math.floor(Math.random() * 300 + 150), success: Math.floor(Math.random() * 290 + 140) },
      currency: { requests: Math.floor(Math.random() * 200 + 100), success: Math.floor(Math.random() * 190 + 95) },
      ai: { requests: Math.floor(Math.random() * 800 + 400), success: Math.floor(Math.random() * 760 + 380) },
      image: { requests: Math.floor(Math.random() * 600 + 300), success: Math.floor(Math.random() * 570 + 285) },
      video: { requests: Math.floor(Math.random() * 400 + 200), success: Math.floor(Math.random() * 380 + 190) },
      code: { requests: Math.floor(Math.random() * 350 + 175), success: Math.floor(Math.random() * 330 + 165) },
      text: { requests: Math.floor(Math.random() * 450 + 225), success: Math.floor(Math.random() * 430 + 215) },
    })

    // 初始历史数据
    const now = new Date()
    const timeLabels = Array.from({ length: 10 }, (_, i) => {
      const t = new Date(now.getTime() - i * 2000)
      return (
        t.getHours().toString().padStart(2, "0") +
        ":" +
        t.getMinutes().toString().padStart(2, "0") +
        ":" +
        t.getSeconds().toString().padStart(2, "0")
      )
    }).reverse()

    setHistoricalData({
      cpu: Array(10)
        .fill(0)
        .map(() => Math.random() * 40 + 20),
      memory: Array(10)
        .fill(0)
        .map(() => Math.random() * 50 + 30),
      disk: Array(10)
        .fill(0)
        .map(() => Math.random() * 30 + 20),
      timeLabels: timeLabels,
    })

    // 每2秒更新一次数据
    const interval = setInterval(updateStats, 2000)
    return () => clearInterval(interval)
  }, [systemStats.cpuUsage, systemStats.memoryUsage, systemStats.diskUsage])

  // 获取状态颜色类
  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return "text-green-400"
    if (value <= thresholds.warning) return "text-yellow-400"
    return "text-red-400"
  }

  // 计算成功率
  const calculateSuccessRate = (success: number, total: number) => {
    return total > 0 ? ((success / total) * 100).toFixed(1) : "0.0"
  }

  // 简化的图表组件（不使用Chart.js）
  const SimpleChart = ({ data, type = "line" }: { data: number[]; type?: "line" | "bar" }) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    return (
      <div className="h-[200px] flex items-end justify-between gap-1 p-4">
        {data.map((value, index) => {
          const height = ((value - min) / range) * 160 + 20
          return (
            <div
              key={index}
              className="bg-blue-500/70 rounded-t flex-1 transition-all duration-300"
              style={{ height: `${height}px` }}
              title={`${value.toFixed(1)}`}
            />
          )
        })}
      </div>
    )
  }

  return (
    <PageLayout title="📊 系统监控与数据统计" description="实时监控系统状态和服务使用情况，提供详细的数据分析">
      <Tabs defaultValue="system" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/20 backdrop-blur-sm">
          <TabsTrigger value="system" className="data-[state=active]:bg-white/30 text-white">
            <Server className="w-4 h-4 mr-2" />
            系统监控
          </TabsTrigger>
          <TabsTrigger value="services" className="data-[state=active]:bg-white/30 text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            服务统计
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-white/30 text-white">
            <PieChart className="w-4 h-4 mr-2" />
            数据分析
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-white/30 text-white">
            <LineChart className="w-4 h-4 mr-2" />
            性能报告
          </TabsTrigger>
        </TabsList>

        {/* 系统监控 */}
        <TabsContent value="system" className="space-y-6">
          {/* 系统概览 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">CPU使用率</p>
                    <p
                      className={`text-2xl font-bold ${getStatusColor(systemStats.cpuUsage, { good: 50, warning: 80 })}`}
                    >
                      {systemStats.cpuUsage.toFixed(1)}%
                    </p>
                  </div>
                  <Cpu className="w-8 h-8 text-blue-400" />
                </div>
                <Progress value={systemStats.cpuUsage} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">内存使用率</p>
                    <p
                      className={`text-2xl font-bold ${getStatusColor(systemStats.memoryUsage, { good: 60, warning: 85 })}`}
                    >
                      {systemStats.memoryUsage.toFixed(1)}%
                    </p>
                  </div>
                  <Activity className="w-8 h-8 text-green-400" />
                </div>
                <Progress value={systemStats.memoryUsage} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">磁盘使用率</p>
                    <p
                      className={`text-2xl font-bold ${getStatusColor(systemStats.diskUsage, { good: 70, warning: 90 })}`}
                    >
                      {systemStats.diskUsage.toFixed(1)}%
                    </p>
                  </div>
                  <HardDrive className="w-8 h-8 text-purple-400" />
                </div>
                <Progress value={systemStats.diskUsage} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm">网络速度</p>
                    <p className="text-2xl font-bold text-cyan-400">{systemStats.networkSpeed.toFixed(1)} MB/s</p>
                  </div>
                  <Wifi className="w-8 h-8 text-cyan-400" />
                </div>
                <Progress value={(systemStats.networkSpeed / 150) * 100} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* 系统状态详情 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  系统状态
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">系统运行时间</span>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    {systemStats.uptime.toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">在线用户数</span>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    {systemStats.activeUsers} 人
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">总请求数</span>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {systemStats.totalRequests.toLocaleString()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">错误率</span>
                  <Badge
                    className={`${systemStats.errorRate < 1 ? "bg-green-500/20 text-green-300 border-green-500/30" : "bg-red-500/20 text-red-300 border-red-500/30"}`}
                  >
                    {systemStats.errorRate.toFixed(2)}%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  性能指标
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">平均响应时间</span>
                  <Badge
                    className={`${getStatusColor(systemStats.responseTime, { good: 100, warning: 150 })} bg-white/10 border-white/20`}
                  >
                    {systemStats.responseTime.toFixed(0)} ms
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">并发连接数</span>
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                    {systemStats.concurrentConnections} 个
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">吞吐量</span>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {systemStats.throughput.toFixed(1)} 请求/秒
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">平均延迟</span>
                  <Badge
                    className={`${getStatusColor(systemStats.latency, { good: 30, warning: 60 })} bg-white/10 border-white/20`}
                  >
                    {systemStats.latency.toFixed(1)} ms
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 系统资源使用趋势图表 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <LineChart className="w-5 h-5 mr-2" />
                系统资源使用趋势
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-white/80 text-sm mb-2">CPU使用率</h4>
                  <SimpleChart data={historicalData.cpu} />
                </div>
                <div>
                  <h4 className="text-white/80 text-sm mb-2">内存使用率</h4>
                  <SimpleChart data={historicalData.memory} />
                </div>
                <div>
                  <h4 className="text-white/80 text-sm mb-2">磁盘使用率</h4>
                  <SimpleChart data={historicalData.disk} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 服务统计 */}
        <TabsContent value="services" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                服务使用情况
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white">服务名称</TableHead>
                    <TableHead className="text-white text-right">请求次数</TableHead>
                    <TableHead className="text-white text-right">成功次数</TableHead>
                    <TableHead className="text-white text-right">成功率</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(serviceStats).map(([service, stats]) => (
                    <TableRow key={service}>
                      <TableCell className="text-white/80 capitalize">{service}</TableCell>
                      <TableCell className="text-white text-right">{stats.requests.toLocaleString()}</TableCell>
                      <TableCell className="text-white text-right">{stats.success.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          className={`${getStatusColor(Number.parseFloat(calculateSuccessRate(stats.success, stats.requests)), { good: 95, warning: 90 })} bg-white/10 border-white/20`}
                        >
                          {calculateSuccessRate(stats.success, stats.requests)}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 数据分析 */}
        <TabsContent value="analytics" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <PieChart className="w-5 h-5 mr-2" />
                用户行为分析
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-4">
                    <Stat>
                      <StatLabel className="text-white/80">日均活跃用户</StatLabel>
                      <StatNumber className="text-blue-400 text-2xl">
                        {Math.floor(systemStats.activeUsers * 1.2).toLocaleString()}
                      </StatNumber>
                      <StatHelpText className="text-white/60">
                        <StatArrow type="increase" className="text-green-400" />
                        12.5% 高于上月
                      </StatHelpText>
                    </Stat>
                  </CardContent>
                </Card>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-4">
                    <Stat>
                      <StatLabel className="text-white/80">平均请求数/用户</StatLabel>
                      <StatNumber className="text-purple-400 text-2xl">
                        {Math.floor(systemStats.totalRequests / systemStats.activeUsers).toLocaleString()}
                      </StatNumber>
                      <StatHelpText className="text-white/60">
                        <StatArrow type="increase" className="text-green-400" />
                        5.3% 高于上月
                      </StatHelpText>
                    </Stat>
                  </CardContent>
                </Card>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-4">
                    <Stat>
                      <StatLabel className="text-white/80">高峰时段请求</StatLabel>
                      <StatNumber className="text-yellow-400 text-2xl">
                        {Math.floor(systemStats.totalRequests * 0.15).toLocaleString()}
                      </StatNumber>
                      <StatHelpText className="text-white/60">通常在 10:00-12:00</StatHelpText>
                    </Stat>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 性能报告 */}
        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <LineChart className="w-5 h-5 mr-2" />
                系统性能概览
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-4">
                    <Stat>
                      <StatLabel className="text-white/80">CPU平均使用率</StatLabel>
                      <StatNumber className={getStatusColor(systemStats.cpuUsage, { good: 50, warning: 80 })}>
                        {systemStats.cpuUsage.toFixed(1)}%
                      </StatNumber>
                      <StatHelpText className="text-white/60">基准值: 低于 70%</StatHelpText>
                    </Stat>
                  </CardContent>
                </Card>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-4">
                    <Stat>
                      <StatLabel className="text-white/80">内存平均使用率</StatLabel>
                      <StatNumber className={getStatusColor(systemStats.memoryUsage, { good: 60, warning: 85 })}>
                        {systemStats.memoryUsage.toFixed(1)}%
                      </StatNumber>
                      <StatHelpText className="text-white/60">基准值: 低于 80%</StatHelpText>
                    </Stat>
                  </CardContent>
                </Card>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-4">
                    <Stat>
                      <StatLabel className="text-white/80">平均响应时间</StatLabel>
                      <StatNumber className={getStatusColor(systemStats.responseTime, { good: 100, warning: 150 })}>
                        {systemStats.responseTime.toFixed(0)} ms
                      </StatNumber>
                      <StatHelpText className="text-white/60">基准值: 低于 200ms</StatHelpText>
                    </Stat>
                  </CardContent>
                </Card>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardContent className="p-4">
                    <Stat>
                      <StatLabel className="text-white/80">系统可用性</StatLabel>
                      <StatNumber className="text-green-400">{systemStats.uptime.toFixed(2)}%</StatNumber>
                      <StatHelpText className="text-white/60">基准值: 99.5%+</StatHelpText>
                    </Stat>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* 性能优化建议 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                性能优化建议
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                      <svg className="w-5 h-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-green-400 font-medium">系统资源充足</h3>
                      <div className="mt-2 text-sm text-white/80">
                        <p>CPU、内存和磁盘使用率均处于正常水平，系统运行稳定。</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                      <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-yellow-400 font-medium">服务优化建议</h3>
                      <div className="mt-2 text-sm text-white/80">
                        <p>AI服务和文本服务的请求量较大，可以考虑对这两个服务进行性能优化。</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                      <svg className="w-5 h-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-blue-400 font-medium">用户增长预测</h3>
                      <div className="mt-2 text-sm text-white/80">
                        <p>根据当前用户增长趋势，建议提前规划系统扩容，以应对未来流量增长。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
