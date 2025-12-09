"use client"

import type React from "react"

import { ResponsiveHeader } from "./responsive-header"
import { ResponsiveFooter } from "./responsive-footer"

interface PageLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function PageLayout({ children, title, description }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        <ResponsiveHeader />

        {(title || description) && (
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
              {title && (
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
                  {title}
                </h1>
              )}
              {description && <p className="text-xl text-slate-300 max-w-3xl mx-auto">{description}</p>}
            </div>
          </div>
        )}

        <main className="container mx-auto px-4 pb-16">{children}</main>

        <ResponsiveFooter />
      </div>
    </div>
  )
}
