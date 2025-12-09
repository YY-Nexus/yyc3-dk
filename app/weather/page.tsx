"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Cloud, Trash2 } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { fetchWeather } from "@/lib/api-services"

export default function WeatherPage() {
  const [weatherCity, setWeatherCity] = useState("")
  const [weatherResult, setWeatherResult] = useState("")
  const [isWeatherLoading, setIsWeatherLoading] = useState(false)

  const handleWeatherQuery = async () => {
    if (!weatherCity.trim()) {
      setWeatherResult("❌ 请输入城市名称")
      return
    }

    setIsWeatherLoading(true)
    const result = await fetchWeather(weatherCity)

    if (result.success) {
      setWeatherResult(result.data)
    } else {
      setWeatherResult(`❌ ${result.error}`)
    }

    setIsWeatherLoading(false)
  }

  return (
    <PageLayout title="🌤️ 实时天气查询服务" description="获取全球城市的实时天气信息，包括温度、湿度、风速等详细数据">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Cloud className="w-5 h-5 mr-2" />
            天气查询
          </CardTitle>
          <CardDescription className="text-white/80">输入城市名称获取实时天气信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="weather-city" className="text-white">
                  城市名称
                </Label>
                <Input
                  id="weather-city"
                  placeholder="输入城市名称，如：北京、上海、New York..."
                  value={weatherCity}
                  onChange={(e) => setWeatherCity(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  onKeyPress={(e) => e.key === "Enter" && handleWeatherQuery()}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleWeatherQuery}
                  disabled={isWeatherLoading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white"
                >
                  {isWeatherLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      查询中...
                    </>
                  ) : (
                    <>
                      <Cloud className="w-4 h-4 mr-2" />
                      查询天气
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => setWeatherResult("")}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-white">天气信息</Label>
              <Card className="bg-white/5 border-white/10 mt-2">
                <CardContent className="p-4">
                  <div className="text-white/90 whitespace-pre-wrap min-h-[300px] max-h-[400px] overflow-y-auto">
                    {weatherResult || "等待查询..."}
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
