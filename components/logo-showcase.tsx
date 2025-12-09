"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnimatedLogo } from "./animated-logo"
import { Palette, Sparkles, Zap } from "lucide-react"

export function LogoShowcase() {
  const [selectedSize, setSelectedSize] = useState<"sm" | "md" | "lg">("md")
  const [showText, setShowText] = useState(true)

  const sizes = [
    { value: "sm" as const, label: "小", description: "32px" },
    { value: "md" as const, label: "中", description: "40px" },
    { value: "lg" as const, label: "大", description: "48px" },
  ]

  return (
    <div className="space-y-8">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <AnimatedLogo size={selectedSize} />
            </div>

            <div className="space-y-4">
              <div className="flex justify-center space-x-2">
                {sizes.map((size) => (
                  <Button
                    key={size.value}
                    variant={selectedSize === size.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size.value)}
                    className={`${
                      selectedSize === size.value
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-white/10 hover:bg-white/20 text-white border-white/30"
                    }`}
                  >
                    {size.label} ({size.description})
                  </Button>
                ))}
              </div>

              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowText(!showText)}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30"
                >
                  <Palette className="w-4 h-4 mr-2" />
                  {showText ? "隐藏文字" : "显示文字"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-6 text-center">
            <Sparkles className="w-8 h-8 text-blue-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">动态效果</h3>
            <p className="text-white/70 text-sm">
              Logo具有自动播放的动画效果，每8秒循环一次，包含旋转、缩放和光晕效果。
            </p>
            <Badge className="mt-3 bg-blue-500/20 text-blue-300">自动动画</Badge>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-6 text-center">
            <Zap className="w-8 h-8 text-purple-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">交互响应</h3>
            <p className="text-white/70 text-sm">支持鼠标悬停和点击交互，点击Logo可触发页面跳转动画效果。</p>
            <Badge className="mt-3 bg-purple-500/20 text-purple-300">交互式</Badge>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-6 text-center">
            <Palette className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">多种尺寸</h3>
            <p className="text-white/70 text-sm">提供小、中、大三种尺寸规格，适配不同使用场景和设备屏幕。</p>
            <Badge className="mt-3 bg-cyan-500/20 text-cyan-300">响应式</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
