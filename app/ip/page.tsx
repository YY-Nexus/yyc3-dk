"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Activity, Trash2 } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { fetchIPInfo } from "@/lib/api-services"

export default function IPPage() {
  const [ipAddress, setIpAddress] = useState("")
  const [ipResult, setIpResult] = useState("")
  const [isIpLoading, setIsIpLoading] = useState(false)

  const handleIPQuery = async () => {
    if (!ipAddress.trim()) {
      setIpResult("❌ 请输入IP地址")
      return
    }

    setIsIpLoading(true)
    const result = await fetchIPInfo(ipAddress)

    if (result.success) {
      setIpResult(result.data)
    } else {
      setIpResult(`❌ ${result.error}`)
    }

    setIsIpLoading(false)
  }

  return (
    <PageLayout title="🌐 IP地址查询服务" description="查询IP地址的地理位置、运营商、网络信息等详细数据">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            IP地址查询
          </CardTitle>
          <CardDescription className="text-white/80">输入IP地址获取详细的网络信息</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="ip-address" className="text-white">
                  IP地址
                </Label>
                <Input
                  id="ip-address"
                  placeholder="输入IP地址，如：8.8.8.8 或 114.114.114.114"
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  onKeyPress={(e) => e.key === "Enter" && handleIPQuery()}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleIPQuery}
                  disabled={isIpLoading}
                  className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white"
                >
                  {isIpLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      查询中...
                    </>
                  ) : (
                    <>
                      <Activity className="w-4 h-4 mr-2" />
                      查询IP
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => setIpResult("")}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-white">IP信息</Label>
              <Card className="bg-white/5 border-white/10 mt-2">
                <CardContent className="p-4">
                  <div className="text-white/90 whitespace-pre-wrap min-h-[300px] max-h-[400px] overflow-y-auto">
                    {ipResult || "等待查询..."}
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
