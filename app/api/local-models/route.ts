import { type NextRequest, NextResponse } from "next/server"
import { ollamaService } from "@/lib/ollama-service"

// 获取模型列表和服务状态
export async function GET() {
  try {
    const status = await ollamaService.getServiceStatus()
    return NextResponse.json({
      success: true,
      data: status,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "获取服务状态失败",
      },
      { status: 500 },
    )
  }
}

// 模型操作
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, modelName, tag = "latest", ...params } = body

    switch (action) {
      case "download":
        await ollamaService.downloadModel(modelName, tag)
        return NextResponse.json({
          success: true,
          message: "模型下载开始",
        })

      case "delete":
        await ollamaService.deleteModel(modelName, tag)
        return NextResponse.json({
          success: true,
          message: "模型删除成功",
        })

      case "start":
        await ollamaService.startModel(modelName, tag)
        return NextResponse.json({
          success: true,
          message: "模型启动成功",
        })

      case "stop":
        await ollamaService.stopModel(modelName, tag)
        return NextResponse.json({
          success: true,
          message: "模型停止成功",
        })

      case "generate":
        const response = await ollamaService.generateText(`${modelName}:${tag}`, params.prompt, params.options)
        return NextResponse.json({
          success: true,
          data: response,
        })

      case "chat":
        const chatResponse = await ollamaService.chat(`${modelName}:${tag}`, params.messages)
        return NextResponse.json({
          success: true,
          data: chatResponse,
        })

      case "search":
        const searchResults = ollamaService.searchModels(params.query)
        return NextResponse.json({
          success: true,
          data: searchResults,
        })

      case "recommend":
        const recommendations = ollamaService.getRecommendedModels(params.useCase)
        return NextResponse.json({
          success: true,
          data: recommendations,
        })

      case "compatibility":
        const model = ollamaService.getModelInfo(modelName, tag)
        if (!model) {
          return NextResponse.json(
            {
              success: false,
              error: "模型不存在",
            },
            { status: 404 },
          )
        }

        const compatibility = ollamaService.checkSystemCompatibility(model)
        return NextResponse.json({
          success: true,
          data: compatibility,
        })

      default:
        return NextResponse.json(
          {
            success: false,
            error: "不支持的操作",
          },
          { status: 400 },
        )
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "操作失败",
      },
      { status: 500 },
    )
  }
}
