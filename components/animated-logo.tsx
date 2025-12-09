"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLogoTransition } from "./page-transition"
import { cn } from "@/lib/utils"

interface AnimatedLogoProps {
  onClick?: () => void
  size?: "sm" | "md" | "lg"
  showShield?: boolean
}

export function AnimatedLogo({ onClick, size = "md", showShield = false }: AnimatedLogoProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const { triggerLogoTransition } = useLogoTransition()

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 2000)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      triggerLogoTransition("/")
    }
  }

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} flex items-center justify-center cursor-pointer`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-blue-400/30"
        animate={
          isAnimating
            ? {
                rotate: 360,
                scale: [1, 1.1, 1],
                borderColor: ["rgba(59, 130, 246, 0.3)", "rgba(59, 130, 246, 0.8)", "rgba(59, 130, 246, 0.3)"],
              }
            : {}
        }
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-1 rounded-full border border-cyan-400/50"
        animate={
          isAnimating
            ? {
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
                borderColor: ["rgba(34, 211, 238, 0.5)", "rgba(34, 211, 238, 1)", "rgba(34, 211, 238, 0.5)"],
              }
            : {}
        }
        transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
      />

      <motion.div
        className="relative w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg"
        animate={
          isAnimating
            ? {
                scale: [1, 1.15, 1],
                boxShadow: [
                  "0 4px 6px rgba(0, 0, 0, 0.1)",
                  "0 8px 25px rgba(59, 130, 246, 0.4)",
                  "0 4px 6px rgba(0, 0, 0, 0.1)",
                ],
              }
            : {}
        }
        transition={{ duration: 2, ease: "easeInOut", delay: 0.4 }}
      >
        <span className="text-white font-bold text-xs">Y³</span>
      </motion.div>

      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-400/20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: [0, 0.3, 0] }}
            exit={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function StreamingText({
  text,
  delay = 50,
  className = "",
  enhanced = false,
  size = "md",
}: {
  text: string
  delay?: number
  className?: string
  enhanced?: boolean
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl"
}) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl sm:text-5xl lg:text-7xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
    "7xl": "text-7xl",
  }

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, delay])

  useEffect(() => {
    setDisplayedText("")
    setCurrentIndex(0)
  }, [text])

  if (enhanced) {
    return (
      <motion.span
        className={cn(
          "bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-bold",
          sizeClasses[size],
          className,
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {displayedText}
        {currentIndex < text.length && (
          <motion.span
            className="inline-block w-0.5 h-4 bg-blue-400 ml-1"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          />
        )}
      </motion.span>
    )
  }

  return (
    <span
      className={cn(
        "bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-bold",
        sizeClasses[size],
        className,
      )}
    >
      {displayedText}
      {currentIndex < text.length && <span className="animate-pulse text-blue-400">|</span>}
    </span>
  )
}
