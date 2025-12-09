"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Trash2 } from "lucide-react"
import { PageLayout } from "@/components/page-layout"
import { fetchCurrency } from "@/lib/api-services"

export default function CurrencyPage() {
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("CNY")
  const [currencyAmount, setCurrencyAmount] = useState(100)
  const [currencyResult, setCurrencyResult] = useState("")
  const [isCurrencyLoading, setIsCurrencyLoading] = useState(false)

  const handleCurrencyQuery = async () => {
    if (currencyAmount <= 0) {
      setCurrencyResult("❌ 请输入有效的金额")
      return
    }

    setIsCurrencyLoading(true)
    const result = await fetchCurrency(fromCurrency, toCurrency, currencyAmount)

    if (result.success) {
      setCurrencyResult(result.data)
    } else {
      setCurrencyResult(`❌ ${result.error}`)
    }

    setIsCurrencyLoading(false)
  }

  return (
    <PageLayout title="💱 实时汇率转换服务" description="获取实时汇率数据，支持全球主要货币之间的转换计算">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            汇率转换
          </CardTitle>
          <CardDescription className="text-white/80">选择货币类型和金额进行实时汇率转换</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">源货币</Label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20 text-white">
                      <SelectItem value="USD">美元 (USD)</SelectItem>
                      <SelectItem value="CNY">人民币 (CNY)</SelectItem>
                      <SelectItem value="EUR">欧元 (EUR)</SelectItem>
                      <SelectItem value="JPY">日元 (JPY)</SelectItem>
                      <SelectItem value="GBP">英镑 (GBP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-white">目标货币</Label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20 text-white">
                      <SelectItem value="CNY">人民币 (CNY)</SelectItem>
                      <SelectItem value="USD">美元 (USD)</SelectItem>
                      <SelectItem value="EUR">欧元 (EUR)</SelectItem>
                      <SelectItem value="JPY">日元 (JPY)</SelectItem>
                      <SelectItem value="GBP">英镑 (GBP)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="currency-amount" className="text-white">
                  转换金额
                </Label>
                <Input
                  id="currency-amount"
                  type="number"
                  placeholder="输入要转换的金额"
                  value={currencyAmount}
                  onChange={(e) => setCurrencyAmount(Number(e.target.value))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleCurrencyQuery}
                  disabled={isCurrencyLoading}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                >
                  {isCurrencyLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      转换中...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      转换汇率
                    </>
                  )}
                </Button>
                <Button
                  onClick={() => setCurrencyResult("")}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label className="text-white">转换结果</Label>
              <Card className="bg-white/5 border-white/10 mt-2">
                <CardContent className="p-4">
                  <div className="text-white/90 whitespace-pre-wrap min-h-[300px] max-h-[400px] overflow-y-auto">
                    {currencyResult || "等待转换..."}
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
