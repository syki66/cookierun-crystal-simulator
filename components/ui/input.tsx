import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border-2 border-amber-200 bg-white/85 px-3 py-1 text-base font-bold text-amber-950 shadow-inner transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:font-medium placeholder:text-amber-950/35 focus-visible:border-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
