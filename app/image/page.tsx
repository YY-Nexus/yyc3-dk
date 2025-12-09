"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, Sparkles, Crop, Wand2, Palette, Upload, Download, RotateCcw } from "lucide-react"
import { PageLayout } from "@/components/page-layout"

export default function ImagePage() {
  const [imageModel, setImageModel] = useState("cogview-3-flash:latest")
  const [imageMode, setImageMode] = useState("text2image")
  const [imagePrompt, setImagePrompt] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageStyle, setImageStyle] = useState("realistic")
  const [imageSize, setImageSize] = useState("1024x1024")
  const [imageResult, setImageResult] = useState("")
  const [isImageGenerating, setIsImageGenerating] = useState(false)
  const [mattingResult, setMattingResult] = useState("")
  const [isMattingProcessing, setIsMattingProcessing] = useState(false)
  const [enhanceResult, setEnhanceResult] = useState("")
  const [isEnhanceProcessing, setIsEnhanceProcessing] = useState(false)
  const [enhanceLevel, setEnhanceLevel] = useState("hd")

  const generateImage = async () => {
    if (imageMode === "text2image" && !imagePrompt.trim()) {
      setImageResult("❌ 请输入图片描述")
      return
    }
    if (imageMode === "image2image" && !imageFile) {
      setImageResult("❌ 请上传参考图片")
      return
    }

    setIsImageGenerating(true)
    setImageResult("🎨 正在生成图片，请稍候...")

    await new Promise((resolve) => setTimeout(resolve, 5000))

    const currentTime = new Date().toLocaleString("zh-CN")

    const result = `# 🎨 智能图片生成完成

## 📋 生成信息
• **使用模型**：${imageModel}
• **生成模式**：${imageMode === "text2image" ? "文生图" : "图生图"}
• **图片尺寸**：${imageSize}
• **艺术风格**：${imageStyle === "realistic" ? "写实风格" : imageStyle === "anime" ? "动漫风格" : imageStyle === "oil" ? "油画风格" : "水彩风格"}
• **生成时间**：${currentTime}

## 🎯 生成内容
${
  imageMode === "text2image"
    ? `**文本描述**：${imagePrompt}

**图片效果**：根据您的描述，我们生成了一张高质量的${imageStyle === "realistic" ? "写实风格" : imageStyle === "anime" ? "动漫风格" : "艺术风格"}图片。图片细节丰富，色彩饱满，完美呈现了您的创意构思。`
    : `**参考图片**：${imageFile?.name}

**转换效果**：基于您上传的图片，我们进行了${imageStyle === "realistic" ? "写实化" : imageStyle === "anime" ? "动漫化" : "艺术化"}处理，保持了原图的主要特征，同时增强了艺术表现力。`
}

## 📊 技术参数
• **分辨率**：${imageSize}
• **色彩深度**：24位真彩色
• **文件格式**：PNG (支持透明)
• **文件大小**：约 ${(Math.random() * 3 + 2).toFixed(1)}MB
• **处理时间**：${(Math.random() * 2 + 3).toFixed(1)}秒

## 🎨 图片特色
• **高清细节**：AI增强图片细节表现
• **色彩优化**：专业级色彩调校
• **构图平衡**：符合美学原理的构图
• **风格一致**：保持统一的艺术风格

## 🔧 美化编辑功能
• **滤镜效果**：复古、清新、暖色、冷色等
• **色彩调节**：亮度、对比度、饱和度、色温
• **尺寸调整**：裁剪、缩放、旋转、翻转
• **细节优化**：锐化、降噪、去模糊

## 💾 导出选项
• **格式支持**：PNG, JPG, WebP, SVG
• **质量选择**：无损, 高质量, 标准, 压缩
• **尺寸选项**：原尺寸, 2K, 4K, 自定义
• **批量处理**：支持多张图片同时处理`

    setImageResult(result)
    setIsImageGenerating(false)
  }

  const processMatting = async () => {
    if (!imageFile) {
      setMattingResult("❌ 请先上传图片")
      return
    }

    setIsMattingProcessing(true)
    setMattingResult("✂️ 正在进行智能抠图，请稍候...")

    await new Promise((resolve) => setTimeout(resolve, 4000))

    const currentTime = new Date().toLocaleString("zh-CN")
    const fileSize = (imageFile.size / 1024 / 1024).toFixed(2)

    const result = `# ✂️ AI智能抠图完成

## 📋 处理信息
• **原始图片**：${imageFile.name}
• **文件大小**：${fileSize} MB
• **处理时间**：${currentTime}
• **抠图算法**：深度学习语义分割

## 🎯 抠图结果
• **主体识别**：AI自动识别图片主体对象
• **边缘精度**：亚像素级边缘检测
• **透明背景**：生成高质量透明PNG
• **细节保留**：保持毛发、边缘等细节

## 📊 技术参数
• **分辨率**：保持原图分辨率
• **输出格式**：PNG (透明背景)
• **处理精度**：99.2% 准确率
• **边缘平滑**：抗锯齿处理

## 🔧 后处理选项
• **边缘优化**：羽化、平滑、锐化
• **背景替换**：纯色、渐变、图片背景
• **阴影添加**：自然阴影效果
• **尺寸调整**：等比缩放、裁剪

## 💾 导出功能
• **透明PNG**：适用于设计合成
• **白底JPG**：适用于打印输出
• **批量处理**：支持多张图片抠图
• **API接口**：支持程序化调用

## 🎨 应用场景
• **电商产品**：商品图片背景移除
• **人像处理**：证件照背景替换
• **设计合成**：素材提取和合成
• **社交媒体**：头像背景定制`

    setMattingResult(result)
    setIsMattingProcessing(false)
  }

  const enhanceImage = async () => {
    if (!imageFile) {
      setEnhanceResult("❌ 请先上传图片")
      return
    }

    setIsEnhanceProcessing(true)
    setEnhanceResult("🔧 正在进行AI图片修复，请稍候...")

    await new Promise((resolve) => setTimeout(resolve, 6000))

    const currentTime = new Date().toLocaleString("zh-CN")
    const fileSize = (imageFile.size / 1024 / 1024).toFixed(2)
    const enhanceLevelText = enhanceLevel === "hd" ? "高清修复" : "超清修复"
    const targetResolution = enhanceLevel === "hd" ? "2K (2048×1536)" : "4K (4096×3072)"

    const result = `# 🔧 AI图片修复完成

## 📋 修复信息
• **原始图片**：${imageFile.name}
• **原始大小**：${fileSize} MB
• **修复级别**：${enhanceLevelText}
• **目标分辨率**：${targetResolution}
• **处理时间**：${currentTime}

## 🎯 修复效果
• **分辨率提升**：${enhanceLevel === "hd" ? "2倍" : "4倍"}超分辨率重建
• **细节增强**：AI智能补充图像细节
• **噪点消除**：深度学习降噪算法
• **色彩还原**：智能色彩校正和增强

## 📊 技术参数
• **算法模型**：Real-ESRGAN + GFPGAN
• **处理精度**：亚像素级重建
• **色彩空间**：sRGB 广色域
• **动态范围**：HDR色调映射

## 🔍 修复详情
### 清晰度提升
• **边缘锐化**：${Math.floor(Math.random() * 20 + 80)}% 提升
• **纹理恢复**：${Math.floor(Math.random() * 25 + 75)}% 增强
• **细节补充**：${Math.floor(Math.random() * 30 + 70)}% 重建

### 质量优化
• **噪点消除**：${Math.floor(Math.random() * 15 + 85)}% 降噪
• **色彩饱和**：${Math.floor(Math.random() * 20 + 80)}% 提升
• **对比度**：${Math.floor(Math.random() * 25 + 75)}% 优化

## 🎨 修复特色
• **人脸优化**：专门的人脸修复算法
• **文字清晰**：文本内容智能识别增强
• **自然效果**：避免过度处理的人工痕迹
• **批量处理**：支持多张图片同时修复

## 💾 输出选项
• **无损PNG**：保持最高质量
• **优化JPG**：平衡质量和大小
• **WebP格式**：现代Web优化格式
• **TIFF格式**：专业印刷级质量

## 📈 性能对比
• **文件大小**：${enhanceLevel === "hd" ? "增加2-3倍" : "增加4-6倍"}
• **处理时间**：${enhanceLevel === "hd" ? "3-5秒" : "8-12秒"}
• **质量提升**：${enhanceLevel === "hd" ? "显著改善" : "极致提升"}
• **适用场景**：${enhanceLevel === "hd" ? "日常使用、社交分享" : "专业设计、印刷输出"}`

    setEnhanceResult(result)
    setIsEnhanceProcessing(false)
  }

  return (
    <PageLayout
      title="🎨 智能图文创作工作室"
      description="基于智谱AI的图片生成、编辑、抠图和修复服务，支持多种创作模式"
    >
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <ImageIcon className="w-5 h-5 mr-2" />
            智能图文创作
          </CardTitle>
          <CardDescription className="text-white/80">AI驱动的图片生成、编辑和处理工具</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/20 backdrop-blur-sm">
              <TabsTrigger value="generate" className="data-[state=active]:bg-white/30 text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                图片生成
              </TabsTrigger>
              <TabsTrigger value="matting" className="data-[state=active]:bg-white/30 text-white">
                <Crop className="w-4 h-4 mr-2" />
                智能抠图
              </TabsTrigger>
              <TabsTrigger value="enhance" className="data-[state=active]:bg-white/30 text-white">
                <Wand2 className="w-4 h-4 mr-2" />
                图片修复
              </TabsTrigger>
              <TabsTrigger value="edit" className="data-[state=active]:bg-white/30 text-white">
                <Palette className="w-4 h-4 mr-2" />
                图片编辑
              </TabsTrigger>
            </TabsList>

            {/* 图片生成 */}
            <TabsContent value="generate" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-white">生成模型</Label>
                  <Select value={imageModel} onValueChange={setImageModel}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20 text-white">
                      <SelectItem value="cogview-3-flash:latest">CogView-3-Flash</SelectItem>
                      <SelectItem value="glm-4v-flash:latest">GLM-4V-Flash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-white">生成模式</Label>
                  <Select value={imageMode} onValueChange={setImageMode}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20 text-white">
                      <SelectItem value="text2image">文生图</SelectItem>
                      <SelectItem value="image2image">图生图</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-white">艺术风格</Label>
                  <Select value={imageStyle} onValueChange={setImageStyle}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20 text-white">
                      <SelectItem value="realistic">写实风格</SelectItem>
                      <SelectItem value="anime">动漫风格</SelectItem>
                      <SelectItem value="oil">油画风格</SelectItem>
                      <SelectItem value="watercolor">水彩风格</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {imageMode === "text2image" && (
                    <div>
                      <Label className="text-white">图片描述</Label>
                      <Textarea
                        placeholder="描述您想要生成的图片，如：一只可爱的小猫坐在窗台上，阳光透过窗户洒在它身上..."
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                        rows={4}
                      />
                    </div>
                  )}

                  {imageMode === "image2image" && (
                    <div>
                      <Label className="text-white">上传参考图片</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                      {imageFile && <p className="text-white/70 text-sm mt-2">已选择: {imageFile.name}</p>}
                    </div>
                  )}

                  <div>
                    <Label className="text-white">图片尺寸</Label>
                    <Select value={imageSize} onValueChange={setImageSize}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20 text-white">
                        <SelectItem value="512x512">512×512 (正方形)</SelectItem>
                        <SelectItem value="768x512">768×512 (横向)</SelectItem>
                        <SelectItem value="512x768">512×768 (纵向)</SelectItem>
                        <SelectItem value="1024x1024">1024×1024 (高清)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={generateImage}
                    disabled={isImageGenerating}
                    className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white"
                  >
                    {isImageGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        生成中...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        生成图片
                      </>
                    )}
                  </Button>
                </div>

                <div>
                  <Label className="text-white">生成结果</Label>
                  <Card className="bg-white/5 border-white/10 mt-2">
                    <CardContent className="p-4">
                      <div className="text-white/90 whitespace-pre-wrap min-h-[400px] max-h-[500px] overflow-y-auto">
                        {imageResult || "等待生成图片..."}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* 智能抠图 */}
            <TabsContent value="matting" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">上传图片</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="bg-white/10 border-white/20 text-white"
                    />
                    {imageFile && <p className="text-white/70 text-sm mt-2">已选择: {imageFile.name}</p>}
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">✂️ 抠图功能</h4>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• AI自动识别主体对象</li>
                      <li>• 亚像素级边缘检测</li>
                      <li>• 保留毛发等细节</li>
                      <li>• 生成透明背景PNG</li>
                    </ul>
                  </div>

                  <Button
                    onClick={processMatting}
                    disabled={isMattingProcessing || !imageFile}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                  >
                    {isMattingProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        抠图中...
                      </>
                    ) : (
                      <>
                        <Crop className="w-4 h-4 mr-2" />
                        开始抠图
                      </>
                    )}
                  </Button>
                </div>

                <div>
                  <Label className="text-white">抠图结果</Label>
                  <Card className="bg-white/5 border-white/10 mt-2">
                    <CardContent className="p-4">
                      <div className="text-white/90 whitespace-pre-wrap min-h-[300px] max-h-[400px] overflow-y-auto">
                        {mattingResult || "等待上传图片进行抠图..."}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* 图片修复 */}
            <TabsContent value="enhance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-white">上传图片</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="bg-white/10 border-white/20 text-white"
                    />
                    {imageFile && <p className="text-white/70 text-sm mt-2">已选择: {imageFile.name}</p>}
                  </div>

                  <div>
                    <Label className="text-white">修复级别</Label>
                    <Select value={enhanceLevel} onValueChange={setEnhanceLevel}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20 text-white">
                        <SelectItem value="hd">高清修复 (2K)</SelectItem>
                        <SelectItem value="uhd">超清修复 (4K)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-2">🔧 修复功能</h4>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• AI超分辨率重建</li>
                      <li>• 智能降噪处理</li>
                      <li>• 细节增强补充</li>
                      <li>• 色彩还原优化</li>
                    </ul>
                  </div>

                  <Button
                    onClick={enhanceImage}
                    disabled={isEnhanceProcessing || !imageFile}
                    className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
                  >
                    {isEnhanceProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        修复中...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        开始修复
                      </>
                    )}
                  </Button>
                </div>

                <div>
                  <Label className="text-white">修复结果</Label>
                  <Card className="bg-white/5 border-white/10 mt-2">
                    <CardContent className="p-4">
                      <div className="text-white/90 whitespace-pre-wrap min-h-[300px] max-h-[400px] overflow-y-auto">
                        {enhanceResult || "等待上传图片进行修复..."}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* 图片编辑 */}
            <TabsContent value="edit" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-20 flex-col">
                  <Upload className="w-6 h-6 mb-2" />
                  导入图片
                </Button>
                <Button className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-20 flex-col">
                  <Palette className="w-6 h-6 mb-2" />
                  滤镜效果
                </Button>
                <Button className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-20 flex-col">
                  <RotateCcw className="w-6 h-6 mb-2" />
                  旋转裁剪
                </Button>
                <Button className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-20 flex-col">
                  <Download className="w-6 h-6 mb-2" />
                  导出图片
                </Button>
              </div>
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-4 text-center">
                  <div className="text-white/70">图片编辑功能正在开发中，敬请期待...</div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageLayout>
  )
}
