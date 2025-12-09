"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Video, Play, Trash2, Zap, Upload, Scissors, Palette, Download } from "lucide-react"
import { PageLayout } from "@/components/page-layout"

export default function VideoPage() {
  const [videoModel, setVideoModel] = useState("cogvideox-5b:latest")
  const [videoMode, setVideoMode] = useState("text2video")
  const [videoPrompt, setVideoPrompt] = useState("")
  const [videoImage, setVideoImage] = useState<File | null>(null)
  const [videoDuration, setVideoDuration] = useState([5])
  const [videoQuality, setVideoQuality] = useState("high")
  const [videoResult, setVideoResult] = useState("")
  const [isVideoGenerating, setIsVideoGenerating] = useState(false)

  const generateVideo = async () => {
    if (videoMode === "text2video" && !videoPrompt.trim()) {
      setVideoResult("❌ 请输入视频描述")
      return
    }
    if (videoMode === "image2video" && !videoImage) {
      setVideoResult("❌ 请上传参考图片")
      return
    }

    setIsVideoGenerating(true)
    setVideoResult("🎬 正在生成视频，请稍候...")

    // 模拟视频生成延迟
    await new Promise((resolve) => setTimeout(resolve, 8000))

    const currentTime = new Date().toLocaleString("zh-CN")
    const duration = videoDuration[0]

    const result = `# 🎬 智能视频生成完成

## 📋 生成信息
• **使用模型**：${videoModel}
• **生成模式**：${videoMode === "text2video" ? "文生视频" : "图生视频"}
• **视频时长**：${duration}秒
• **视频质量**：${videoQuality === "high" ? "高清" : videoQuality === "medium" ? "标清" : "快速"}
• **生成时间**：${currentTime}

## 🎯 生成内容
${
  videoMode === "text2video"
    ? `**文本描述**：${videoPrompt}

**视频场景**：根据您的描述，我们生成了一个${duration}秒的高质量视频，包含丰富的视觉效果和流畅的动画转场。视频内容完美契合您的创意需求。`
    : `**参考图片**：${videoImage?.name}

**视频效果**：基于您上传的图片，我们生成了一个${duration}秒的动态视频，保持了原图的风格特色，并添加了自然的动画效果。`
}

## 📊 技术参数
• **分辨率**：1920×1080 (Full HD)
• **帧率**：30 FPS
• **编码格式**：H.264
• **文件大小**：约 ${(duration * 2.5).toFixed(1)}MB
• **处理时间**：${(Math.random() * 3 + 5).toFixed(1)}秒

## 🎨 视频特色
• **智能构图**：AI自动优化画面构图
• **流畅动画**：自然的物体运动和转场
• **色彩调和**：专业级色彩校正
• **音效同步**：可选背景音乐匹配

## 💾 导出选项
• **格式支持**：MP4, AVI, MOV, WebM
• **质量选择**：4K, 1080P, 720P, 480P
• **压缩选项**：无损, 高质量, 标准, 快速

## 🔧 后期编辑
• **剪辑功能**：支持视频裁剪、拼接
• **特效添加**：滤镜、转场、字幕
• **音频处理**：背景音乐、音效、配音
• **批量处理**：支持多个视频同时处理`

    setVideoResult(result)
    setIsVideoGenerating(false)
  }

  return (
    <PageLayout
      title="🎬 智能视频生成工作室"
      description="基于智谱AI大模型的视频生成服务，支持文生视频、图生视频、视频剪辑等功能"
    >
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Video className="w-5 h-5 mr-2" />
            智能视频生成
          </CardTitle>
          <CardDescription className="text-white/80">使用AI技术生成高质量视频内容</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 模型选择和模式选择 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-white">视频生成模型</Label>
              <Select value={videoModel} onValueChange={setVideoModel}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20 text-white">
                  <SelectItem value="cogvideox-5b:latest">CogVideoX-5B (高质量)</SelectItem>
                  <SelectItem value="cogvideox-flash:latest">CogVideoX-Flash (快速)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white">生成模式</Label>
              <Select value={videoMode} onValueChange={setVideoMode}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20 text-white">
                  <SelectItem value="text2video">文生视频</SelectItem>
                  <SelectItem value="image2video">图生视频</SelectItem>
                  <SelectItem value="edit">视频剪辑</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white">视频质量</Label>
              <Select value={videoQuality} onValueChange={setVideoQuality}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20 text-white">
                  <SelectItem value="high">高清 (1080p)</SelectItem>
                  <SelectItem value="medium">标清 (720p)</SelectItem>
                  <SelectItem value="fast">快速 (480p)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 视频参数设置 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white">视频时长: {videoDuration[0]}秒</Label>
              <Slider
                value={videoDuration}
                onValueChange={setVideoDuration}
                max={30}
                min={3}
                step={1}
                className="mt-2"
              />
            </div>
            <div className="flex items-end">
              <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-purple-300/30">
                <Zap className="w-3 h-3 mr-1" />
                智谱AI驱动
              </Badge>
            </div>
          </div>

          {/* 输入区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {videoMode === "text2video" && (
                <div>
                  <Label className="text-white">视频描述</Label>
                  <Textarea
                    placeholder="描述您想要生成的视频内容，如：一只可爱的小猫在花园里玩耍，阳光明媚，画面温馨..."
                    value={videoPrompt}
                    onChange={(e) => setVideoPrompt(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    rows={4}
                  />
                </div>
              )}

              {videoMode === "image2video" && (
                <div>
                  <Label className="text-white">上传参考图片</Label>
                  <div className="mt-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setVideoImage(e.target.files?.[0] || null)}
                      className="bg-white/10 border-white/20 text-white"
                    />
                    {videoImage && <p className="text-white/70 text-sm mt-2">已选择: {videoImage.name}</p>}
                  </div>
                </div>
              )}

              {videoMode === "edit" && (
                <div>
                  <Label className="text-white">视频编辑功能</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Upload className="w-4 h-4 mr-2" />
                      导入视频
                    </Button>
                    <Button className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Scissors className="w-4 h-4 mr-2" />
                      剪辑工具
                    </Button>
                    <Button className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Palette className="w-4 h-4 mr-2" />
                      特效滤镜
                    </Button>
                    <Button className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Download className="w-4 h-4 mr-2" />
                      导出视频
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={generateVideo}
                  disabled={isVideoGenerating}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
                >
                  {isVideoGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      生成中...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      生成视频
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => setVideoResult("")}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-white">生成结果</Label>
              <Card className="bg-white/5 border-white/10 mt-2">
                <CardContent className="p-4">
                  <div className="text-white/90 whitespace-pre-wrap min-h-[400px] max-h-[500px] overflow-y-auto">
                    {videoResult || "等待生成视频..."}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
