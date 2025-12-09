"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, Activity } from "lucide-react"

interface APIStatus {
  cloud: boolean
  local: boolean
  lastCheck: Date
}

export function APIStatusIndicator() {
  const [status, setStatus] = useState<APIStatus>({
    cloud: true,
    local: false,
    lastCheck: new Date(),
  })

  useEffect(() => {
    const checkStatus = () => {
      setStatus({
        cloud: Math.random() > 0.1,
        local: Math.random() > 0.3,
        lastCheck: new Date(),
      })
    }

    checkStatus()
    const interval = setInterval(checkStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center space-x-2">
      <Badge className={`${status.cloud ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"} border-0`}>
        {status.cloud ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
        云端API
      </Badge>

      <Badge className={`${status.local ? "bg-blue-500/20 text-blue-300" : "bg-gray-500/20 text-gray-300"} border-0`}>
        <Activity className="w-3 h-3 mr-1" />
        本地API
      </Badge>
    </div>
  )
}
