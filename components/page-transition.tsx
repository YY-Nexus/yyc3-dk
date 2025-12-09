"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

interface PageTransitionContextType {
  isTransitioning: boolean
  triggerLogoTransition: (href: string) => void
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined)

export function useLogoTransition() {
  const context = useContext(PageTransitionContext)
  if (!context) {
    return {
      isTransitioning: false,
      triggerLogoTransition: () => {},
    }
  }
  return context
}

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [targetHref, setTargetHref] = useState<string>("")
  const router = useRouter()

  const triggerLogoTransition = useCallback(
    (href: string) => {
      if (typeof window === "undefined" || href === window.location.pathname) return

      setTargetHref(href)
      setIsTransitioning(true)

      setTimeout(() => {
        router.push(href)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 500)
      }, 1500)
    },
    [router],
  )

  const contextValue: PageTransitionContextType = {
    isTransitioning,
    triggerLogoTransition,
  }

  return (
    <PageTransitionContext.Provider value={contextValue}>
      <div className="relative">
        {children}

        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />

              <div className="relative z-10 flex flex-col items-center space-y-8">
                <motion.div
                  className="relative"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <motion.div
                    className="relative w-24 h-24"
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                      scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 p-1">
                      <div className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white font-bold text-lg">Y³</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-cyan-400/30"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.8, 0.3],
                      rotate: 360,
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-blue-400/20"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.2, 0.6, 0.2],
                      rotate: -360,
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                <motion.div
                  className="text-center space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <motion.h1
                    className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  >
                    YanYu Cloud³
                  </motion.h1>
                  <motion.p
                    className="text-lg text-blue-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    DeekStack Platform
                  </motion.p>
                  <motion.p
                    className="text-sm text-slate-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    万象归元于云枢，深栈智启新纪元
                  </motion.p>
                </motion.div>

                <motion.div
                  className="flex space-x-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.4 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-cyan-400 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>

                {targetHref && (
                  <motion.p
                    className="text-sm text-slate-300 mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.4 }}
                  >
                    正在跳转到 {targetHref === "/" ? "首页" : targetHref.replace("/", "")}...
                  </motion.p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransitionContext.Provider>
  )
}
