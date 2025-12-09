"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Newspaper, Search, RefreshCw, ExternalLink, Clock, TrendingUp } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { fetchNews } from "@/lib/api-services"

interface NewsItem {
  title: string
  description: string
  url: string
  publishedAt: string
  source: string
  category: string
}

export default function NewsPage() {
  const [newsData, setNewsData] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [category, setCategory] = useState("general")
  const [country, setCountry] = useState("cn")
  const [error, setError] = useState("")

  const loadNews = async () => {
    setIsLoading(true)
    setError("")

    try {
      const result = await fetchNews(category, country, searchQuery)
      if (result.success && result.data) {
        setNewsData(result.data)
      } else {
        // 模拟新闻数据
        const mockNews: NewsItem[] = [
          {
            title: "人工智能技术在医疗领域的最新突破",
            description: "最新研究显示，AI技术在疾病诊断和治疗方案制定方面取得了重大进展，准确率提升至95%以上。",
            url: "https://example.com/ai-medical-breakthrough",
            publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            source: "科技日报",
            category: "technology",
          },
          {
            title: "全球气候变化应对措施取得新进展",
            description: "联合国气候变化大会达成新的减排协议，各国承诺在2030年前实现碳排放减少50%的目标。",
            url: "https://example.com/climate-change-progress",
            publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            source: "环球时报",
            category: "environment",
          },
          {
            title: "新能源汽车市场持续快速增长",
            description: "2024年第三季度新能源汽车销量同比增长45%，市场渗透率首次突破30%大关。",
            url: "https://example.com/ev-market-growth",
            publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            source: "财经网",
            category: "business",
          },
          {
            title: "量子计算技术实现重大突破",
            description: "中科院量子计算实验室成功实现1000量子比特的稳定操控，为量子计算商业化应用奠定基础。",
            url: "https://example.com/quantum-computing-breakthrough",
            publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
            source: "中国科学报",
            category: "technology",
          },
          {
            title: "教育数字化转型加速推进",
            description: "全国超过90%的学校已完成数字化教学设备升级，在线教育平台用户数突破5亿人次。",
            url: "https://example.com/education-digital-transformation",
            publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
            source: "教育部官网",
            category: "education",
          },
          {
            title: "5G网络建设进入新阶段",
            description: "全国5G基站数量突破300万个，5G用户数超过6亿，网络覆盖率达到85%以上。",
            url: "https://example.com/5g-network-expansion",
            publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
            source: "通信世界",
            category: "technology",
          },
        ]

        // 根据搜索查询过滤
        let filteredNews = mockNews
        if (searchQuery.trim()) {
          filteredNews = mockNews.filter(
            (item) =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        }

        // 根据分类过滤
        if (category !== "general") {
          filteredNews = filteredNews.filter((item) => item.category === category)
        }

        setNewsData(filteredNews)
      }
    } catch (err) {
      setError("获取新闻数据失败，请稍后重试")
      console.error("News fetch error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadNews()
  }, [])

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const publishTime = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - publishTime.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "刚刚"
    if (diffInHours < 24) return `${diffInHours}小时前`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}天前`
    return publishTime.toLocaleDateString("zh-CN")
  }

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      technology: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      business: "bg-green-500/20 text-green-300 border-green-500/30",
      environment: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      education: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      health: "bg-red-500/20 text-red-300 border-red-500/30",
      sports: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    }
    return colors[cat] || "bg-gray-500/20 text-gray-300 border-gray-500/30"
  }

  const getCategoryName = (cat: string) => {
    const names: Record<string, string> = {
      technology: "科技",
      business: "财经",
      environment: "环境",
      education: "教育",
      health: "健康",
      sports: "体育",
    }
    return names[cat] || "其他"
  }

  return (
    <PageLayout title="📰 智能新闻聚合" description="实时获取全球新闻资讯，支持分类筛选和智能搜索">
      <div className="space-y-6">
        {/* 搜索和筛选区域 */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Newspaper className="w-5 h-5 mr-2" />
              新闻搜索与筛选
            </CardTitle>
            <CardDescription className="text-white/80">搜索感兴趣的新闻内容，支持分类和地区筛选</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-white">搜索关键词</Label>
                <Input
                  placeholder="输入关键词搜索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
              <div>
                <Label className="text-white">新闻分类</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20 text-white">
                    <SelectItem value="general">全部分类</SelectItem>
                    <SelectItem value="technology">科技</SelectItem>
                    <SelectItem value="business">财经</SelectItem>
                    <SelectItem value="health">健康</SelectItem>
                    <SelectItem value="sports">体育</SelectItem>
                    <SelectItem value="entertainment">娱乐</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-white">地区</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20 text-white">
                    <SelectItem value="cn">中国</SelectItem>
                    <SelectItem value="us">美国</SelectItem>
                    <SelectItem value="uk">英国</SelectItem>
                    <SelectItem value="jp">日本</SelectItem>
                    <SelectItem value="kr">韩国</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <div className="flex gap-2 w-full">
                  <Button
                    onClick={loadNews}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        搜索中...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        搜索
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 错误提示 */}
        {error && (
          <Card className="bg-red-500/10 border-red-500/30">
            <CardContent className="p-4">
              <p className="text-red-300">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* 新闻列表 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {newsData.length > 0 ? (
            newsData.map((news, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-white text-lg leading-tight mb-2">{news.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <Badge className={getCategoryColor(news.category)}>{getCategoryName(news.category)}</Badge>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatTimeAgo(news.publishedAt)}
                        </span>
                        <span>•</span>
                        <span>{news.source}</span>
                      </div>
                    </div>
                    <TrendingUp className="w-5 h-5 text-white/40 flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-white/80 mb-4 leading-relaxed">{news.description}</CardDescription>
                  <Button
                    onClick={() => window.open(news.url, "_blank")}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-full"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    阅读全文
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : !isLoading ? (
            <div className="col-span-full">
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-8 text-center">
                  <Newspaper className="w-16 h-16 mx-auto mb-4 text-white/30" />
                  <p className="text-white/60 text-lg">暂无相关新闻</p>
                  <p className="text-white/40 text-sm mt-2">尝试调整搜索条件或刷新页面</p>
                </CardContent>
              </Card>
            </div>
          ) : (
            // 加载骨架屏
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <div className="space-y-3">
                    <div className="h-6 bg-white/20 rounded animate-pulse"></div>
                    <div className="flex gap-2">
                      <div className="h-5 w-16 bg-white/20 rounded animate-pulse"></div>
                      <div className="h-5 w-20 bg-white/20 rounded animate-pulse"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-white/20 rounded animate-pulse"></div>
                    <div className="h-4 bg-white/20 rounded animate-pulse w-3/4"></div>
                    <div className="h-10 bg-white/20 rounded animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* 统计信息 */}
        {newsData.length > 0 && (
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-white/70">
                <span>共找到 {newsData.length} 条新闻</span>
                <span>最后更新: {new Date().toLocaleString("zh-CN")}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  )
}
