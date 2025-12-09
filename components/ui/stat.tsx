import * as React from "react"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

const StatGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("grid gap-4", className)} {...props} />,
)
StatGroup.displayName = "StatGroup"

const Stat = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
))
Stat.displayName = "Stat"

const StatLabel = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm font-medium leading-none", className)} {...props} />
  ),
)
StatLabel.displayName = "StatLabel"

const StatNumber = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-3xl font-bold tracking-tight", className)} {...props} />
  ),
)
StatNumber.displayName = "StatNumber"

const StatHelpText = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-xs text-muted-foreground flex items-center gap-1", className)} {...props} />
  ),
)
StatHelpText.displayName = "StatHelpText"

interface StatArrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  type: "increase" | "decrease"
}

const StatArrow = React.forwardRef<HTMLSpanElement, StatArrowProps>(({ className, type, ...props }, ref) => {
  const Icon = type === "increase" ? TrendingUp : TrendingDown
  return (
    <span ref={ref} className={cn("inline-flex items-center", className)} {...props}>
      <Icon className="h-3 w-3" />
    </span>
  )
})
StatArrow.displayName = "StatArrow"

export { StatGroup, Stat, StatLabel, StatNumber, StatHelpText, StatArrow }
