"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, Star, ThumbsUp, AlertCircle, Lightbulb } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { useToast } from "@/hooks/use-toast"

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState("suggestion")
  const [rating, setRating] = useState("5")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [features, setFeatures] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setFeatures([...features, feature])
    } else {
      setFeatures(features.filter((f) => f !== feature))
    }
  }

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast({
        title: "提交失败",
        description: "请填写反馈内容",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // 模拟提交延迟
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "反馈提交成功",
      description: "感谢您的宝贵意见，我们会认真考虑您的建议！",
    })

    // 重置表单
    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
    setFeatures([])
    setRating("5")
    setFeedbackType("suggestion")
    setIsSubmitting(false)
  }

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case "bug":
        return <AlertCircle className="w-4 h-4" />
      case "suggestion":
        return <Lightbulb className="w-4 h-4" />
      case "praise":
        return <ThumbsUp className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  const getFeedbackColor = (type: string) => {
    switch (type) {
      case "bug":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "suggestion":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "praise":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <PageLayout title="💬 用户反馈中心" description="您的意见对我们很重要，请分享您的使用体验和改进建议">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 反馈表单 */}
        <div className="lg:col-span-2">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                提交反馈
              </CardTitle>
              <CardDescription className="text-white/80">
                请详细描述您的问题、建议或意见，我们会认真对待每一条反馈
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 反馈类型 */}
              <div>
                <Label className="text-white mb-3 block">反馈类型</Label>
                <RadioGroup value={feedbackType} onValueChange={setFeedbackType} className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="suggestion" id="suggestion" />
                    <Label htmlFor="suggestion" className="text-white cursor-pointer">
                      功能建议
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bug" id="bug" />
                    <Label htmlFor="bug" className="text-white cursor-pointer">
                      问题反馈
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="praise" id="praise" />
                    <Label htmlFor="praise" className="text-white cursor-pointer">
                      表扬建议
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="text-white cursor-pointer">
                      其他
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* 满意度评分 */}
              <div>
                <Label className="text-white mb-3 block">整体满意度</Label>
                <RadioGroup value={rating} onValueChange={setRating} className="flex gap-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="flex items-center space-x-2">
                      <RadioGroupItem value={star.toString()} id={`star-${star}`} />
                      <Label htmlFor={`star-${star}`} className="text-white cursor-pointer flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {star}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* 联系信息 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-white">
                    姓名 (可选)
                  </Label>
                  <Input
                    id="name"
                    placeholder="请输入您的姓名"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">
                    邮箱 (可选)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="请输入您的邮箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
              </div>

              {/* 反馈主题 */}
              <div>
                <Label htmlFor="subject" className="text-white">
                  反馈主题
                </Label>
                <Input
                  id="subject"
                  placeholder="简要描述您的反馈主题"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>

              {/* 详细内容 */}
              <div>
                <Label htmlFor="message" className="text-white">
                  详细内容 *
                </Label>
                <Textarea
                  id="message"
                  placeholder="请详细描述您的问题、建议或意见..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  rows={6}
                />
              </div>

              {/* 功能使用情况 */}
              <div>
                <Label className="text-white mb-3 block">您使用过哪些功能？</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "智能对话",
                    "图文创作",
                    "视频生成",
                    "代码助理",
                    "天气查询",
                    "IP查询",
                    "汇率转换",
                    "新闻聚合",
                    "文本处理",
                  ].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={features.includes(feature)}
                        onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                      />
                      <Label htmlFor={feature} className="text-white text-sm cursor-pointer">
                        {feature}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 提交按钮 */}
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    提交中...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    提交反馈
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 侧边栏信息 */}
        <div className="space-y-6">
          {/* 反馈统计 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">反馈统计</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/80">本月反馈</span>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  {Math.floor(Math.random() * 50 + 120)} 条
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">已处理</span>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  {Math.floor(Math.random() * 30 + 95)}%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">平均响应</span>
                <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                  {Math.floor(Math.random() * 12 + 6)} 小时
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* 反馈类型说明 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">反馈类型说明</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Badge className={getFeedbackColor("suggestion")}>
                  {getFeedbackIcon("suggestion")}
                  <span className="ml-1">功能建议</span>
                </Badge>
                <span className="text-white/70 text-sm">新功能或改进建议</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={getFeedbackColor("bug")}>
                  {getFeedbackIcon("bug")}
                  <span className="ml-1">问题反馈</span>
                </Badge>
                <span className="text-white/70 text-sm">系统错误或使用问题</span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={getFeedbackColor("praise")}>
                  {getFeedbackIcon("praise")}
                  <span className="ml-1">表扬建议</span>
                </Badge>
                <span className="text-white/70 text-sm">使用体验好的地方</span>
              </div>
            </CardContent>
          </Card>

          {/* 联系方式 */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-lg">其他联系方式</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-white/80 text-sm">
              <div>
                <strong>邮箱：</strong>feedback@yy.0379.pro
              </div>
              <div>
                <strong>QQ群：</strong>123456789
              </div>
              <div>
                <strong>微信：</strong>YanYuCloud3
              </div>
              <div>
                <strong>工作时间：</strong>周一至周五 9:00-18:00
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
