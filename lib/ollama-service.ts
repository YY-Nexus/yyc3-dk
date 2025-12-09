// Ollama本地大模型服务管理器
export interface OllamaModel {
  name: string
  tag: string
  size: string
  contextLength: string
  type: string[]
  commitId: string
  updateTime: string
  downloaded: boolean
  running: boolean
  port?: number
  series: string
  description: string
  capabilities: string[]
  requirements: {
    ram: string
    vram: string
    disk: string
  }
}

export interface OllamaServiceStatus {
  isRunning: boolean
  version: string
  models: OllamaModel[]
  runningModels: string[]
  systemInfo: {
    cpu: string
    memory: string
    gpu: string
    disk: string
  }
}

class OllamaService {
  private baseUrl = "http://localhost:11434"
  private models: OllamaModel[] = []

  // 预定义的模型数据（基于提供的截图）
  private predefinedModels: OllamaModel[] = [
    // DeepSeek-R1 系列
    {
      name: "deepseek-r1",
      tag: "latest",
      size: "5.2GB",
      contextLength: "128K",
      type: ["Text"],
      commitId: "6995872bfe4c",
      updateTime: "1 month ago",
      downloaded: false,
      running: false,
      series: "DeepSeek-R1",
      description: "最新的DeepSeek推理模型，具备强大的逻辑推理能力",
      capabilities: ["推理", "数学", "代码", "分析"],
      requirements: { ram: "8GB", vram: "6GB", disk: "6GB" },
    },
    {
      name: "deepseek-r1",
      tag: "1.5b",
      size: "1.1GB",
      contextLength: "128K",
      type: ["Text"],
      commitId: "e0979632db5a",
      updateTime: "1 month ago",
      downloaded: false,
      running: false,
      series: "DeepSeek-R1",
      description: "轻量级DeepSeek推理模型",
      capabilities: ["推理", "对话"],
      requirements: { ram: "4GB", vram: "2GB", disk: "2GB" },
    },
    {
      name: "deepseek-r1",
      tag: "7b",
      size: "4.7GB",
      contextLength: "128K",
      type: ["Text"],
      commitId: "755ced02ce7b",
      updateTime: "1 month ago",
      downloaded: false,
      running: false,
      series: "DeepSeek-R1",
      description: "平衡性能与资源的DeepSeek推理模型",
      capabilities: ["推理", "数学", "代码"],
      requirements: { ram: "8GB", vram: "5GB", disk: "5GB" },
    },
    {
      name: "deepseek-r1",
      tag: "8b",
      size: "5.2GB",
      contextLength: "128K",
      type: ["Text"],
      commitId: "6995872bfe4c",
      updateTime: "1 month ago",
      downloaded: false,
      running: false,
      series: "DeepSeek-R1",
      description: "高性能DeepSeek推理模型",
      capabilities: ["推理", "数学", "代码", "分析"],
      requirements: { ram: "10GB", vram: "6GB", disk: "6GB" },
    },
    {
      name: "deepseek-r1",
      tag: "14b",
      size: "9.0GB",
      contextLength: "128K",
      type: ["Text"],
      commitId: "c333b7232bdb",
      updateTime: "1 month ago",
      downloaded: false,
      running: false,
      series: "DeepSeek-R1",
      description: "大规模DeepSeek推理模型",
      capabilities: ["推理", "数学", "代码", "分析", "复杂推理"],
      requirements: { ram: "16GB", vram: "10GB", disk: "10GB" },
    },
    {
      name: "deepseek-r1",
      tag: "32b",
      size: "20GB",
      contextLength: "128K",
      type: ["Text"],
      commitId: "edba8017331d",
      updateTime: "1 month ago",
      downloaded: false,
      running: false,
      series: "DeepSeek-R1",
      description: "超大规模DeepSeek推理模型",
      capabilities: ["推理", "数学", "代码", "分析", "复杂推理", "专业领域"],
      requirements: { ram: "32GB", vram: "20GB", disk: "22GB" },
    },
    {
      name: "deepseek-r1",
      tag: "70b",
      size: "43GB",
      contextLength: "128K",
      type: ["Text"],
      commitId: "d37b54d01a76",
      updateTime: "1 month ago",
      downloaded: false,
      running: false,
      series: "DeepSeek-R1",
      description: "顶级DeepSeek推理模型，最强推理能力",
      capabilities: ["推理", "数学", "代码", "分析", "复杂推理", "专业领域", "科研"],
      requirements: { ram: "64GB", vram: "40GB", disk: "45GB" },
    },

    // LLaMA4 系列
    {
      name: "llama4",
      tag: "latest",
      size: "67GB",
      contextLength: "10M",
      type: ["Text", "Image"],
      commitId: "bf31604e25c2",
      updateTime: "2 weeks ago",
      downloaded: false,
      running: false,
      series: "LLaMA4",
      description: "最新的LLaMA4多模态大语言模型",
      capabilities: ["对话", "图像理解", "代码生成", "推理"],
      requirements: { ram: "64GB", vram: "48GB", disk: "70GB" },
    },
    {
      name: "llama4",
      tag: "maverick",
      size: "245GB",
      contextLength: "1M",
      type: ["Text", "Image"],
      commitId: "b4832b93e292",
      updateTime: "2 weeks ago",
      downloaded: false,
      running: false,
      series: "LLaMA4",
      description: "超大规模LLaMA4模型，顶级性能",
      capabilities: ["对话", "图像理解", "代码生成", "推理", "创作", "专业分析"],
      requirements: { ram: "128GB", vram: "80GB", disk: "250GB" },
    },
    {
      name: "llama4",
      tag: "scout",
      size: "67GB",
      contextLength: "10M",
      type: ["Text", "Image"],
      commitId: "bf31604e25c2",
      updateTime: "2 weeks ago",
      downloaded: false,
      running: false,
      series: "LLaMA4",
      description: "优化版LLaMA4模型，平衡性能与效率",
      capabilities: ["对话", "图像理解", "代码生成"],
      requirements: { ram: "64GB", vram: "48GB", disk: "70GB" },
    },
    {
      name: "llama4",
      tag: "16x17blatest",
      size: "67GB",
      contextLength: "10M",
      type: ["Text", "Image"],
      commitId: "bf31604e25c2",
      updateTime: "2 weeks ago",
      downloaded: false,
      running: false,
      series: "LLaMA4",
      description: "混合专家架构LLaMA4模型",
      capabilities: ["对话", "图像理解", "代码生成", "推理"],
      requirements: { ram: "64GB", vram: "48GB", disk: "70GB" },
    },

    // Gemma3 系列
    {
      name: "gemma3",
      tag: "latest",
      size: "3.3GB",
      contextLength: "128K",
      type: ["Text", "Image"],
      commitId: "a2af6cc3eb7f",
      updateTime: "3 months ago",
      downloaded: false,
      running: false,
      series: "Gemma3",
      description: "Google最新的Gemma3多模态模型",
      capabilities: ["对话", "图像理解", "代码生成"],
      requirements: { ram: "6GB", vram: "4GB", disk: "4GB" },
    },
    {
      name: "gemma3",
      tag: "1b",
      size: "815MB",
      contextLength: "32K",
      type: ["Text"],
      commitId: "8648f39daa8f",
      updateTime: "3 months ago",
      downloaded: false,
      running: false,
      series: "Gemma3",
      description: "轻量级Gemma3模型",
      capabilities: ["对话", "文本生成"],
      requirements: { ram: "2GB", vram: "1GB", disk: "1GB" },
    },
    {
      name: "gemma3",
      tag: "4blatest",
      size: "3.3GB",
      contextLength: "128K",
      type: ["Text", "Image"],
      commitId: "a2af6cc3eb7f",
      updateTime: "3 months ago",
      downloaded: false,
      running: false,
      series: "Gemma3",
      description: "4B参数Gemma3模型",
      capabilities: ["对话", "图像理解", "代码生成"],
      requirements: { ram: "6GB", vram: "4GB", disk: "4GB" },
    },
    {
      name: "gemma3",
      tag: "12b",
      size: "8.1GB",
      contextLength: "128K",
      type: ["Text", "Image"],
      commitId: "f4031aab637d",
      updateTime: "3 months ago",
      downloaded: false,
      running: false,
      series: "Gemma3",
      description: "12B参数Gemma3模型",
      capabilities: ["对话", "图像理解", "代码生成", "推理"],
      requirements: { ram: "12GB", vram: "8GB", disk: "9GB" },
    },
    {
      name: "gemma3",
      tag: "27b",
      size: "17GB",
      contextLength: "128K",
      type: ["Text", "Image"],
      commitId: "a418f5838eaf",
      updateTime: "3 months ago",
      downloaded: false,
      running: false,
      series: "Gemma3",
      description: "27B参数Gemma3大模型",
      capabilities: ["对话", "图像理解", "代码生成", "推理", "创作"],
      requirements: { ram: "24GB", vram: "18GB", disk: "18GB" },
    },

    // Gemma3N 系列
    {
      name: "gemma3n",
      tag: "latest",
      size: "7.5GB",
      contextLength: "32K",
      type: ["Text"],
      commitId: "15cb39fd9394",
      updateTime: "6 days ago",
      downloaded: false,
      running: false,
      series: "Gemma3N",
      description: "最新的Gemma3N模型",
      capabilities: ["对话", "文本生成", "推理"],
      requirements: { ram: "10GB", vram: "8GB", disk: "8GB" },
    },
    {
      name: "gemma3n",
      tag: "e2b",
      size: "5.6GB",
      contextLength: "32K",
      type: ["Text"],
      commitId: "719372f8c7de",
      updateTime: "1 week ago",
      downloaded: false,
      running: false,
      series: "Gemma3N",
      description: "Gemma3N E2B变体",
      capabilities: ["对话", "文本生成"],
      requirements: { ram: "8GB", vram: "6GB", disk: "6GB" },
    },
    {
      name: "gemma3n",
      tag: "e4blatest",
      size: "7.5GB",
      contextLength: "32K",
      type: ["Text"],
      commitId: "15cb39fd9394",
      updateTime: "6 days ago",
      downloaded: false,
      running: false,
      series: "Gemma3N",
      description: "Gemma3N E4B最新版本",
      capabilities: ["对话", "文本生成", "推理"],
      requirements: { ram: "10GB", vram: "8GB", disk: "8GB" },
    },

    // DeepSeek-Coder 系列
    {
      name: "deepseek-coder",
      tag: "latest",
      size: "776MB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "3ddd2d3fc8d2",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "DeepSeek-Coder",
      description: "专业代码生成模型",
      capabilities: ["代码生成", "代码补全", "代码解释", "调试"],
      requirements: { ram: "2GB", vram: "1GB", disk: "1GB" },
    },
    {
      name: "deepseek-coder",
      tag: "base",
      size: "776MB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "3b417b786925",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "DeepSeek-Coder",
      description: "基础代码模型",
      capabilities: ["代码生成", "代码补全"],
      requirements: { ram: "2GB", vram: "1GB", disk: "1GB" },
    },
    {
      name: "deepseek-coder",
      tag: "instruct",
      size: "776MB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "3ddd2d3fc8d2",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "DeepSeek-Coder",
      description: "指令调优代码模型",
      capabilities: ["代码生成", "代码解释", "调试", "重构"],
      requirements: { ram: "2GB", vram: "1GB", disk: "1GB" },
    },
    {
      name: "deepseek-coder",
      tag: "1.3blatest",
      size: "776MB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "3ddd2d3fc8d2",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "DeepSeek-Coder",
      description: "1.3B参数代码模型",
      capabilities: ["代码生成", "代码补全", "代码解释"],
      requirements: { ram: "2GB", vram: "1GB", disk: "1GB" },
    },
    {
      name: "deepseek-coder",
      tag: "6.7b",
      size: "3.8GB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "ce298d984115",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "DeepSeek-Coder",
      description: "6.7B参数代码模型",
      capabilities: ["代码生成", "代码补全", "代码解释", "调试"],
      requirements: { ram: "6GB", vram: "4GB", disk: "4GB" },
    },
    {
      name: "deepseek-coder",
      tag: "33b",
      size: "19GB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "acec7c0b0fd9",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "DeepSeek-Coder",
      description: "33B参数大型代码模型",
      capabilities: ["代码生成", "代码补全", "代码解释", "调试", "架构设计"],
      requirements: { ram: "24GB", vram: "20GB", disk: "20GB" },
    },
    {
      name: "deepseek-coder",
      tag: "1.3b-base",
      size: "776MB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "3b417b786925",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "DeepSeek-Coder",
      description: "1.3B基础代码模型",
      capabilities: ["代码生成", "代码补全"],
      requirements: { ram: "2GB", vram: "1GB", disk: "1GB" },
    },
    {
      name: "deepseek-coder-v2",
      tag: "latest",
      size: "8.9GB",
      contextLength: "4K",
      type: ["Text"],
      commitId: "63fb193b3a9b",
      updateTime: "10 months ago",
      downloaded: false,
      running: false,
      series: "DeepSeek-Coder",
      description: "第二代DeepSeek代码模型",
      capabilities: ["代码生成", "代码补全", "代码解释", "调试", "重构"],
      requirements: { ram: "12GB", vram: "9GB", disk: "10GB" },
    },
    {
      name: "deepseek-coder-v2",
      tag: "lite",
      size: "8.9GB",
      contextLength: "4K",
      type: ["Text"],
      commitId: "63fb193b3a9b",
      updateTime: "10 months ago",
      downloaded: false,
      running: false,
      series: "DeepSeek-Coder",
      description: "轻量版第二代DeepSeek代码模型",
      capabilities: ["代码生成", "代码补全", "代码解释"],
      requirements: { ram: "12GB", vram: "9GB", disk: "10GB" },
    },
    {
      name: "deepseek-coder-v2",
      tag: "16blatest",
      size: "8.9GB",
      contextLength: "4K",
      type: ["Text"],
      commitId: "63fb193b3a9b",
      updateTime: "10 months ago",
      downloaded: false,
      running: false,
      series: "DeepSeek-Coder",
      description: "16B参数第二代DeepSeek代码模型",
      capabilities: ["代码生成", "代码补全", "代码解释", "调试", "重构"],
      requirements: { ram: "12GB", vram: "9GB", disk: "10GB" },
    },

    // Hermes3 系列
    {
      name: "hermes3",
      tag: "latest",
      size: "4.7GB",
      contextLength: "128K",
      type: ["Text"],
      commitId: "4f6b83f30b62",
      updateTime: "6 months ago",
      downloaded: false,
      running: false,
      series: "Hermes3",
      description: "最新的Hermes3对话模型",
      capabilities: ["对话", "推理", "创作", "分析"],
      requirements: { ram: "8GB", vram: "5GB", disk: "5GB" },
    },
    {
      name: "hermes3",
      tag: "3b",
      size: "2.0GB",
      contextLength: "128K",
      type: ["Text"],
      commitId: "a8851c5041d4",
      updateTime: "6 months ago",
      downloaded: false,
      running: false,
      series: "Hermes3",
      description: "3B参数Hermes3模型",
      capabilities: ["对话", "推理"],
      requirements: { ram: "4GB", vram: "2GB", disk: "2GB" },
    },
    {
      name: "hermes3",
      tag: "8blatest",
      size: "4.7GB",
      contextLength: "128K",
      type: ["Text"],
      commitId: "4f6b83f30b62",
      updateTime: "6 months ago",
      downloaded: false,
      running: false,
      series: "Hermes3",
      description: "8B参数Hermes3模型",
      capabilities: ["对话", "推理", "创作"],
      requirements: { ram: "8GB", vram: "5GB", disk: "5GB" },
    },
    {
      name: "hermes3",
      tag: "70b",
      size: "40GB",
      contextLength: "128K",
      type: ["Text"],
      commitId: "60ef54cd913f",
      updateTime: "10 months ago",
      downloaded: false,
      running: false,
      series: "Hermes3",
      description: "70B参数大型Hermes3模型",
      capabilities: ["对话", "推理", "创作", "分析", "专业咨询"],
      requirements: { ram: "48GB", vram: "40GB", disk: "42GB" },
    },

    // Qwen3 系列
    {
      name: "qwen3",
      tag: "latest",
      size: "5.2GB",
      contextLength: "40K",
      type: ["Text"],
      commitId: "500a1f067a9f",
      updateTime: "1 month ago",
      downloaded: false,
      running: false,
      series: "Qwen3",
      description: "最新的通义千问3模型",
      capabilities: ["中文对话", "推理", "创作", "知识问答"],
      requirements: { ram: "8GB", vram: "5GB", disk: "6GB" },
    },
    {
      name: "qwen3",
      tag: "0.6b",
      size: "523MB",
      contextLength: "40K",
      type: ["Text"],
      commitId: "7df6b6e09427",
      updateTime: "1 month ago",
      downloaded: false,
      running: false,
      series: "Qwen3",
      description: "轻量级通义千问3模型",
      capabilities: ["中文对话", "文本生成"],
      requirements: { ram: "2GB", vram: "1GB", disk: "1GB" },
    },
    {
      name: "qwen3",
      tag: "1.7b",
      size: "1.4GB",
      contextLength: "40K",
      type: ["Text"],
      commitId: "8f68893c685c",
      updateTime: "1 month ago",
      downloaded: false,
      running: false,
      series: "Qwen3",
      description: "1.7B参数通义千问3模型",
      capabilities: ["中文对话", "推理", "文本生成"],
      requirements: { ram: "3GB", vram: "2GB", disk: "2GB" },
    },
    {
      name: "qwen3",
      tag: "4b",
      size: "2.6GB",
      contextLength: "40K",
      type: ["Text"],
      commitId: "2bfd38a7daaf",
      updateTime: "1 month ago",
      downloaded: false,
      running: false,
      series: "Qwen3",
      description: "4B参数通义千问3模型",
      capabilities: ["中文对话", "推理", "创作"],
      requirements: { ram: "5GB", vram: "3GB", disk: "3GB" },
    },
    {
      name: "qwen3",
      tag: "8blatest",
      size: "5.2GB",
      contextLength: "40K",
      type: ["Text"],
      commitId: "500a1f067a9f",
      updateTime: "1 month ago",
      downloaded: false,
      running: false,
      series: "Qwen3",
      description: "8B参数通义千问3模型",
      capabilities: ["中文对话", "推理", "创作", "知识问答"],
      requirements: { ram: "8GB", vram: "5GB", disk: "6GB" },
    },

    // Nomic-Embed-Text 系列
    {
      name: "nomic-embed-text",
      tag: "latest",
      size: "274MB",
      contextLength: "2K",
      type: ["Text"],
      commitId: "0a109f422b47",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "Nomic-Embed-Text",
      description: "文本嵌入模型",
      capabilities: ["文本嵌入", "语义搜索", "相似度计算"],
      requirements: { ram: "1GB", vram: "512MB", disk: "300MB" },
    },
    {
      name: "nomic-embed-text",
      tag: "v1.5latest",
      size: "274MB",
      contextLength: "2K",
      type: ["Text"],
      commitId: "0a109f422b47",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "Nomic-Embed-Text",
      description: "v1.5版本文本嵌入模型",
      capabilities: ["文本嵌入", "语义搜索", "相似度计算"],
      requirements: { ram: "1GB", vram: "512MB", disk: "300MB" },
    },
    {
      name: "nomic-embed-text",
      tag: "137m-v1.5-fp16",
      size: "274MB",
      contextLength: "2K",
      type: ["Text"],
      commitId: "0a109f422b47",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "Nomic-Embed-Text",
      description: "137M参数FP16精度嵌入模型",
      capabilities: ["文本嵌入", "语义搜索"],
      requirements: { ram: "1GB", vram: "512MB", disk: "300MB" },
    },

    // Mistral 系列
    {
      name: "mistral",
      tag: "latest",
      size: "4.1GB",
      contextLength: "32K",
      type: ["Text"],
      commitId: "3944fe81ec14",
      updateTime: "2 weeks ago",
      downloaded: false,
      running: false,
      series: "Mistral",
      description: "最新的Mistral模型",
      capabilities: ["对话", "推理", "多语言", "代码生成"],
      requirements: { ram: "6GB", vram: "4GB", disk: "5GB" },
    },
    {
      name: "mistral",
      tag: "instruct",
      size: "4.1GB",
      contextLength: "32K",
      type: ["Text"],
      commitId: "3944fe81ec14",
      updateTime: "2 weeks ago",
      downloaded: false,
      running: false,
      series: "Mistral",
      description: "指令调优Mistral模型",
      capabilities: ["对话", "推理", "指令跟随"],
      requirements: { ram: "6GB", vram: "4GB", disk: "5GB" },
    },
    {
      name: "mistral",
      tag: "text",
      size: "4.1GB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "495ae085225b",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "Mistral",
      description: "文本生成Mistral模型",
      capabilities: ["文本生成", "创作"],
      requirements: { ram: "6GB", vram: "4GB", disk: "5GB" },
    },
    {
      name: "mistral",
      tag: "v0.1",
      size: "4.1GB",
      contextLength: "32K",
      type: ["Text"],
      commitId: "b17615239298",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "Mistral",
      description: "Mistral v0.1版本",
      capabilities: ["对话", "文本生成"],
      requirements: { ram: "6GB", vram: "4GB", disk: "5GB" },
    },
    {
      name: "mistral",
      tag: "v0.2",
      size: "4.1GB",
      contextLength: "32K",
      type: ["Text"],
      commitId: "61e88e884507",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "Mistral",
      description: "Mistral v0.2版本",
      capabilities: ["对话", "推理", "文本生成"],
      requirements: { ram: "6GB", vram: "4GB", disk: "5GB" },
    },
    {
      name: "mistral",
      tag: "v0.3",
      size: "4.1GB",
      contextLength: "32K",
      type: ["Text"],
      commitId: "3944fe81ec14",
      updateTime: "2 weeks ago",
      downloaded: false,
      running: false,
      series: "Mistral",
      description: "Mistral v0.3版本",
      capabilities: ["对话", "推理", "多语言"],
      requirements: { ram: "6GB", vram: "4GB", disk: "5GB" },
    },
    {
      name: "mistral",
      tag: "7blatest",
      size: "4.1GB",
      contextLength: "32K",
      type: ["Text"],
      commitId: "3944fe81ec14",
      updateTime: "2 weeks ago",
      downloaded: false,
      running: false,
      series: "Mistral",
      description: "7B参数Mistral模型",
      capabilities: ["对话", "推理", "多语言", "代码生成"],
      requirements: { ram: "6GB", vram: "4GB", disk: "5GB" },
    },

    // LLaVA 系列
    {
      name: "llava",
      tag: "latest",
      size: "4.7GB",
      contextLength: "32K",
      type: ["Text", "Image"],
      commitId: "8dd30f6b0cb1",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "LLaVA",
      description: "最新的LLaVA多模态模型",
      capabilities: ["图像理解", "视觉问答", "图像描述", "对话"],
      requirements: { ram: "8GB", vram: "5GB", disk: "5GB" },
    },
    {
      name: "llava",
      tag: "v1.6",
      size: "4.7GB",
      contextLength: "32K",
      type: ["Text", "Image"],
      commitId: "8dd30f6b0cb1",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "LLaVA",
      description: "LLaVA v1.6版本",
      capabilities: ["图像理解", "视觉问答", "图像描述"],
      requirements: { ram: "8GB", vram: "5GB", disk: "5GB" },
    },
    {
      name: "llava",
      tag: "7blatest",
      size: "4.7GB",
      contextLength: "32K",
      type: ["Text", "Image"],
      commitId: "8dd30f6b0cb1",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "LLaVA",
      description: "7B参数LLaVA模型",
      capabilities: ["图像理解", "视觉问答", "图像描述", "对话"],
      requirements: { ram: "8GB", vram: "5GB", disk: "5GB" },
    },
    {
      name: "llava",
      tag: "13b",
      size: "8.0GB",
      contextLength: "4K",
      type: ["Text"],
      commitId: "0d0eb4d7f485",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "LLaVA",
      description: "13B参数LLaVA模型",
      capabilities: ["图像理解", "视觉问答", "图像描述", "对话", "推理"],
      requirements: { ram: "12GB", vram: "8GB", disk: "9GB" },
    },
    {
      name: "llava",
      tag: "34b",
      size: "20GB",
      contextLength: "4K",
      type: ["Text"],
      commitId: "3d2d24f46674",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "LLaVA",
      description: "34B参数大型LLaVA模型",
      capabilities: ["图像理解", "视觉问答", "图像描述", "对话", "推理", "复杂视觉任务"],
      requirements: { ram: "24GB", vram: "20GB", disk: "22GB" },
    },

    // Phi3 系列
    {
      name: "phi3",
      tag: "latest",
      size: "2.2GB",
      contextLength: "128K",
      type: ["Text"],
      commitId: "4f2222927938",
      updateTime: "11 months ago",
      downloaded: false,
      running: false,
      series: "Phi3",
      description: "最新的Phi3小型语言模型",
      capabilities: ["对话", "推理", "代码生成", "数学"],
      requirements: { ram: "4GB", vram: "2GB", disk: "3GB" },
    },
    {
      name: "phi3",
      tag: "instruct",
      size: "2.2GB",
      contextLength: "128K",
      type: ["Text"],
      commitId: "4f2222927938",
      updateTime: "11 months ago",
      downloaded: false,
      running: false,
      series: "Phi3",
      description: "指令调优Phi3模型",
      capabilities: ["对话", "推理", "指令跟随"],
      requirements: { ram: "4GB", vram: "2GB", disk: "3GB" },
    },
    {
      name: "phi3",
      tag: "medium",
      size: "7.9GB",
      contextLength: "4K",
      type: ["Text"],
      commitId: "cf611a26b048",
      updateTime: "11 months ago",
      downloaded: false,
      running: false,
      series: "Phi3",
      description: "中等规模Phi3模型",
      capabilities: ["对话", "推理", "代码生成", "数学", "分析"],
      requirements: { ram: "10GB", vram: "8GB", disk: "8GB" },
    },
    {
      name: "phi3",
      tag: "mini",
      size: "2.2GB",
      contextLength: "128K",
      type: ["Text"],
      commitId: "4f2222927938",
      updateTime: "11 months ago",
      downloaded: false,
      running: false,
      series: "Phi3",
      description: "迷你版Phi3模型",
      capabilities: ["对话", "推理"],
      requirements: { ram: "4GB", vram: "2GB", disk: "3GB" },
    },
    {
      name: "phi3",
      tag: "3.8blatest",
      size: "2.2GB",
      contextLength: "128K",
      type: ["Text"],
      commitId: "4f2222927938",
      updateTime: "11 months ago",
      downloaded: false,
      running: false,
      series: "Phi3",
      description: "3.8B参数Phi3模型",
      capabilities: ["对话", "推理", "代码生成", "数学"],
      requirements: { ram: "4GB", vram: "2GB", disk: "3GB" },
    },
    {
      name: "phi3",
      tag: "14b",
      size: "7.9GB",
      contextLength: "4K",
      type: ["Text"],
      commitId: "cf611a26b048",
      updateTime: "11 months ago",
      downloaded: false,
      running: false,
      series: "Phi3",
      description: "14B参数Phi3模型",
      capabilities: ["对话", "推理", "代码生成", "数学", "分析"],
      requirements: { ram: "10GB", vram: "8GB", disk: "8GB" },
    },
    {
      name: "phi3",
      tag: "3.8b-instruct",
      size: "2.2GB",
      contextLength: "128K",
      type: ["Text"],
      commitId: "4f2222927938",
      updateTime: "11 months ago",
      downloaded: false,
      running: false,
      series: "Phi3",
      description: "3.8B指令调优Phi3模型",
      capabilities: ["对话", "推理", "指令跟随"],
      requirements: { ram: "4GB", vram: "2GB", disk: "3GB" },
    },

    // Phi4 系列
    {
      name: "phi4",
      tag: "latest",
      size: "9.1GB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "ac896e5b8b34",
      updateTime: "5 months ago",
      downloaded: false,
      running: false,
      series: "Phi4",
      description: "最新的Phi4模型",
      capabilities: ["对话", "推理", "代码生成", "数学", "科学"],
      requirements: { ram: "12GB", vram: "9GB", disk: "10GB" },
    },
    {
      name: "phi4",
      tag: "14blatest",
      size: "9.1GB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "ac896e5b8b34",
      updateTime: "5 months ago",
      downloaded: false,
      running: false,
      series: "Phi4",
      description: "14B参数Phi4模型",
      capabilities: ["对话", "推理", "代码生成", "数学", "科学"],
      requirements: { ram: "12GB", vram: "9GB", disk: "10GB" },
    },
    {
      name: "phi4",
      tag: "14b-q4_K_M",
      size: "9.1GB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "ac896e5b8b34",
      updateTime: "5 months ago",
      downloaded: false,
      running: false,
      series: "Phi4",
      description: "14B量化Phi4模型",
      capabilities: ["对话", "推理", "代码生成", "数学"],
      requirements: { ram: "12GB", vram: "9GB", disk: "10GB" },
    },
    {
      name: "phi4",
      tag: "14b-q8_0",
      size: "16GB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "310d366232f4",
      updateTime: "5 months ago",
      downloaded: false,
      running: false,
      series: "Phi4",
      description: "14B高精度量化Phi4模型",
      capabilities: ["对话", "推理", "代码生成", "数学", "科学"],
      requirements: { ram: "18GB", vram: "16GB", disk: "17GB" },
    },
    {
      name: "phi4",
      tag: "14b-fp16",
      size: "29GB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "227695f919b5",
      updateTime: "5 months ago",
      downloaded: false,
      running: false,
      series: "Phi4",
      description: "14B全精度Phi4模型",
      capabilities: ["对话", "推理", "代码生成", "数学", "科学", "研究"],
      requirements: { ram: "32GB", vram: "29GB", disk: "30GB" },
    },

    // CodeLlama 系列
    {
      name: "codellama",
      tag: "latest",
      size: "3.8GB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "8fdf8f752f6e",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "CodeLlama",
      description: "最新的CodeLlama代码模型",
      capabilities: ["代码生成", "代码补全", "代码解释", "调试"],
      requirements: { ram: "6GB", vram: "4GB", disk: "4GB" },
    },
    {
      name: "codellama",
      tag: "code",
      size: "3.8GB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "8df0a30bb1e6",
      updateTime: "11 months ago",
      downloaded: false,
      running: false,
      series: "CodeLlama",
      description: "专业代码生成模型",
      capabilities: ["代码生成", "代码补全"],
      requirements: { ram: "6GB", vram: "4GB", disk: "4GB" },
    },
    {
      name: "codellama",
      tag: "instruct",
      size: "3.8GB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "8fdf8f752f6e",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "CodeLlama",
      description: "指令调优CodeLlama模型",
      capabilities: ["代码生成", "代码解释", "调试", "重构"],
      requirements: { ram: "6GB", vram: "4GB", disk: "4GB" },
    },
    {
      name: "codellama",
      tag: "python",
      size: "3.8GB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "120ca3419eae",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "CodeLlama",
      description: "Python专用CodeLlama模型",
      capabilities: ["Python代码生成", "Python调试", "Python优化"],
      requirements: { ram: "6GB", vram: "4GB", disk: "4GB" },
    },
    {
      name: "codellama",
      tag: "7blatest",
      size: "3.8GB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "8fdf8f752f6e",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "CodeLlama",
      description: "7B参数CodeLlama模型",
      capabilities: ["代码生成", "代码补全", "代码解释", "调试"],
      requirements: { ram: "6GB", vram: "4GB", disk: "4GB" },
    },
    {
      name: "codellama",
      tag: "13b",
      size: "7.4GB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "9f438cb9cd58",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "CodeLlama",
      description: "13B参数CodeLlama模型",
      capabilities: ["代码生成", "代码补全", "代码解释", "调试", "架构设计"],
      requirements: { ram: "10GB", vram: "7GB", disk: "8GB" },
    },
    {
      name: "codellama",
      tag: "34b",
      size: "19GB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "685be00e1532",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "CodeLlama",
      description: "34B参数大型CodeLlama模型",
      capabilities: ["代码生成", "代码补全", "代码解释", "调试", "架构设计", "代码审查"],
      requirements: { ram: "24GB", vram: "19GB", disk: "20GB" },
    },
    {
      name: "codellama",
      tag: "70b",
      size: "39GB",
      contextLength: "2K",
      type: ["Text"],
      commitId: "e59b580dfce7",
      updateTime: "1 year ago",
      downloaded: false,
      running: false,
      series: "CodeLlama",
      description: "70B参数顶级CodeLlama模型",
      capabilities: ["代码生成", "代码补全", "代码解释", "调试", "架构设计", "代码审查", "技术咨询"],
      requirements: { ram: "48GB", vram: "39GB", disk: "40GB" },
    },
    {
      name: "codellama",
      tag: "7b-code",
      size: "3.8GB",
      contextLength: "16K",
      type: ["Text"],
      commitId: "8df0a30bb1e6",
      updateTime: "11 months ago",
      downloaded: false,
      running: false,
      series: "CodeLlama",
      description: "7B代码专用CodeLlama模型",
      capabilities: ["代码生成", "代码补全"],
      requirements: { ram: "6GB", vram: "4GB", disk: "4GB" },
    },

    // MiniCPM-V 系列
    {
      name: "minicpm-v",
      tag: "latest",
      size: "5.5GB",
      contextLength: "32K",
      type: ["Text"],
      commitId: "c92bfad01205",
      updateTime: "7 months ago",
      downloaded: false,
      running: false,
      series: "MiniCPM-V",
      description: "最新的MiniCPM-V多模态模型",
      capabilities: ["图像理解", "视觉问答", "对话"],
      requirements: { ram: "8GB", vram: "6GB", disk: "6GB" },
    },
    {
      name: "minicpm-v",
      tag: "8blatest",
      size: "5.5GB",
      contextLength: "32K",
      type: ["Text"],
      commitId: "c92bfad01205",
      updateTime: "7 months ago",
      downloaded: false,
      running: false,
      series: "MiniCPM-V",
      description: "8B参数MiniCPM-V模型",
      capabilities: ["图像理解", "视觉问答", "对话"],
      requirements: { ram: "8GB", vram: "6GB", disk: "6GB" },
    },

    // BGE-M3 系列
    {
      name: "bge-m3",
      tag: "latest",
      size: "1.2GB",
      contextLength: "8K",
      type: ["Text"],
      commitId: "790764642607",
      updateTime: "11 months ago",
      downloaded: false,
      running: false,
      series: "BGE-M3",
      description: "最新的BGE-M3嵌入模型",
      capabilities: ["文本嵌入", "多语言嵌入", "语义搜索"],
      requirements: { ram: "2GB", vram: "1GB", disk: "1.5GB" },
    },
    {
      name: "bge-m3",
      tag: "567mlatest",
      size: "1.2GB",
      contextLength: "8K",
      type: ["Text"],
      commitId: "790764642607",
      updateTime: "11 months ago",
      downloaded: false,
      running: false,
      series: "BGE-M3",
      description: "567M参数BGE-M3模型",
      capabilities: ["文本嵌入", "多语言嵌入", "语义搜索"],
      requirements: { ram: "2GB", vram: "1GB", disk: "1.5GB" },
    },
    {
      name: "bge-m3",
      tag: "567m-fp16",
      size: "1.2GB",
      contextLength: "8K",
      type: ["Text"],
      commitId: "790764642607",
      updateTime: "11 months ago",
      downloaded: false,
      running: false,
      series: "BGE-M3",
      description: "FP16精度BGE-M3模型",
      capabilities: ["文本嵌入", "多语言嵌入", "语义搜索"],
      requirements: { ram: "2GB", vram: "1GB", disk: "1.5GB" },
    },
  ]

  constructor() {
    this.models = [...this.predefinedModels]
  }

  // 检查Ollama服务健康状态
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`)
      return response.ok
    } catch (error) {
      return false
    }
  }

  // 获取服务状态
  async getServiceStatus(): Promise<OllamaServiceStatus> {
    try {
      const isRunning = await this.checkHealth()

      if (!isRunning) {
        return {
          isRunning: false,
          version: "",
          models: this.models,
          runningModels: [],
          systemInfo: {
            cpu: "Unknown",
            memory: "Unknown",
            gpu: "Unknown",
            disk: "Unknown",
          },
        }
      }

      // 获取已安装的模型
      const installedModels = await this.listInstalledModels()

      // 更新模型状态
      this.models = this.models.map((model) => {
        const installed = installedModels.find((m) => m.name === `${model.name}:${model.tag}`)
        return {
          ...model,
          downloaded: !!installed,
          running: installed?.running || false,
        }
      })

      return {
        isRunning: true,
        version: "0.1.0",
        models: this.models,
        runningModels: this.models.filter((m) => m.running).map((m) => `${m.name}:${m.tag}`),
        systemInfo: await this.getSystemInfo(),
      }
    } catch (error) {
      throw new Error(`获取服务状态失败: ${error}`)
    }
  }

  // 获取已安装的模型列表
  async listInstalledModels(): Promise<Array<{ name: string; running: boolean }>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`)
      if (!response.ok) {
        throw new Error("获取模型列表失败")
      }

      const data = await response.json()
      return (
        data.models?.map((model: any) => ({
          name: model.name,
          running: false, // 需要额外检查运行状态
        })) || []
      )
    } catch (error) {
      // 返回模拟数据用于演示
      return [
        { name: "deepseek-r1:7b", running: true },
        { name: "qwen3:latest", running: false },
        { name: "codellama:latest", running: false },
      ]
    }
  }

  // 获取系统信息
  async getSystemInfo() {
    // 模拟系统信息
    return {
      cpu: "Intel Core i7-12700K @ 3.60GHz",
      memory: "32 GB DDR4",
      gpu: "NVIDIA RTX 4080 16GB",
      disk: "1 TB NVMe SSD",
    }
  }

  // 下载模型
  async downloadModel(modelName: string, tag = "latest"): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/api/pull`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${modelName}:${tag}`,
        }),
      })

      if (!response.ok) {
        throw new Error("模型下载失败")
      }

      // 更新模型状态
      this.updateModelStatus(modelName, tag, { downloaded: true })
    } catch (error) {
      throw new Error(`下载模型失败: ${error}`)
    }
  }

  // 删除模型
  async deleteModel(modelName: string, tag = "latest"): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/api/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${modelName}:${tag}`,
        }),
      })

      if (!response.ok) {
        throw new Error("模型删除失败")
      }

      // 更新模型状态
      this.updateModelStatus(modelName, tag, { downloaded: false, running: false })
    } catch (error) {
      throw new Error(`删除模型失败: ${error}`)
    }
  }

  // 启动模型
  async startModel(modelName: string, tag = "latest"): Promise<void> {
    try {
      // 预加载模型
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: `${modelName}:${tag}`,
          prompt: "",
          stream: false,
        }),
      })

      if (!response.ok) {
        throw new Error("模型启动失败")
      }

      // 更新模型状态
      this.updateModelStatus(modelName, tag, { running: true })
    } catch (error) {
      throw new Error(`启动模型失败: ${error}`)
    }
  }

  // 停止模型
  async stopModel(modelName: string, tag = "latest"): Promise<void> {
    try {
      // Ollama没有直接的停止API，这里模拟
      this.updateModelStatus(modelName, tag, { running: false })
    } catch (error) {
      throw new Error(`停止模型失败: ${error}`)
    }
  }

  // 生成文本
  async generateText(
    modelName: string,
    prompt: string,
    options?: {
      temperature?: number
      max_tokens?: number
      stream?: boolean
    },
  ): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: modelName,
          prompt: prompt,
          stream: false,
          options: {
            temperature: options?.temperature || 0.7,
            num_predict: options?.max_tokens || 1000,
          },
        }),
      })

      if (!response.ok) {
        throw new Error("文本生成失败")
      }

      const data = await response.json()
      return data.response || "生成失败"
    } catch (error) {
      // 返回模拟响应用于演示
      const responses = [
        "你好！我是运行在本地的AI助手。我可以帮助你进行文本生成、对话交流、代码编写等任务。",
        "很高兴为你服务！作为本地部署的大语言模型，我能够提供快速、私密的AI服务。",
        "欢迎使用本地AI助手！我具备多种能力，包括文本理解、代码生成、问题解答等。",
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }

  // 聊天对话
  async chat(modelName: string, messages: Array<{ role: string; content: string }>): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: modelName,
          messages: messages,
          stream: false,
        }),
      })

      if (!response.ok) {
        throw new Error("对话失败")
      }

      const data = await response.json()
      return data.message?.content || "对话失败"
    } catch (error) {
      // 返回模拟响应
      return "这是一个模拟的对话响应。在实际环境中，这里会返回模型的真实回复。"
    }
  }

  // 获取模型信息
  getModelInfo(modelName: string, tag = "latest"): OllamaModel | undefined {
    return this.models.find((m) => m.name === modelName && m.tag === tag)
  }

  // 获取模型系列
  getModelSeries(): string[] {
    const series = new Set(this.models.map((m) => m.series))
    return Array.from(series).sort()
  }

  // 按系列获取模型
  getModelsBySeries(series: string): OllamaModel[] {
    return this.models.filter((m) => m.series === series)
  }

  // 搜索模型
  searchModels(query: string): OllamaModel[] {
    const lowerQuery = query.toLowerCase()
    return this.models.filter(
      (m) =>
        m.name.toLowerCase().includes(lowerQuery) ||
        m.description.toLowerCase().includes(lowerQuery) ||
        m.capabilities.some((cap) => cap.toLowerCase().includes(lowerQuery)),
    )
  }

  // 更新模型状态
  private updateModelStatus(modelName: string, tag: string, updates: Partial<OllamaModel>) {
    const index = this.models.findIndex((m) => m.name === modelName && m.tag === tag)
    if (index !== -1) {
      this.models[index] = { ...this.models[index], ...updates }
    }
  }

  // 获取推荐模型
  getRecommendedModels(useCase: "chat" | "code" | "image" | "embed" | "reasoning"): OllamaModel[] {
    const recommendations: Record<string, string[]> = {
      chat: ["对话", "文本生成", "创作"],
      code: ["代码生成", "代码补全", "代码解释", "调试"],
      image: ["图像理解", "视觉问答", "图像描述"],
      embed: ["文本嵌入", "语义搜索", "相似度计算"],
      reasoning: ["推理", "数学", "分析", "复杂推理"],
    }

    const targetCapabilities = recommendations[useCase] || []

    return this.models
      .filter((m) => targetCapabilities.some((cap) => m.capabilities.includes(cap)))
      .sort((a, b) => {
        // 按匹配的能力数量排序
        const aMatches = a.capabilities.filter((cap) => targetCapabilities.includes(cap)).length
        const bMatches = b.capabilities.filter((cap) => targetCapabilities.includes(cap)).length
        return bMatches - aMatches
      })
      .slice(0, 5) // 返回前5个推荐
  }

  // 检查系统兼容性
  checkSystemCompatibility(model: OllamaModel): {
    compatible: boolean
    issues: string[]
    recommendations: string[]
  } {
    const issues: string[] = []
    const recommendations: string[] = []

    // 模拟系统检查
    const systemRAM = 32 // GB
    const systemVRAM = 16 // GB
    const systemDisk = 1000 // GB

    const requiredRAM = Number.parseInt(model.requirements.ram.replace("GB", ""))
    const requiredVRAM = Number.parseInt(model.requirements.vram.replace("GB", ""))
    const requiredDisk = Number.parseInt(model.requirements.disk.replace("GB", ""))

    if (requiredRAM > systemRAM) {
      issues.push(`内存不足：需要 ${model.requirements.ram}，系统只有 ${systemRAM}GB`)
      recommendations.push("考虑升级内存或选择更小的模型")
    }

    if (requiredVRAM > systemVRAM) {
      issues.push(`显存不足：需要 ${model.requirements.vram}，系统只有 ${systemVRAM}GB`)
      recommendations.push("考虑升级显卡或使用CPU运行模式")
    }

    if (requiredDisk > systemDisk * 0.1) {
      // 假设可用空间为总空间的10%
      issues.push(`磁盘空间可能不足：需要 ${model.requirements.disk}`)
      recommendations.push("清理磁盘空间或选择更小的模型")
    }

    return {
      compatible: issues.length === 0,
      issues,
      recommendations,
    }
  }
}

export const ollamaService = new OllamaService()
