import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border-2 text-sm font-black transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-rose-200 bg-gradient-to-b from-rose-400 to-rose-600 text-white shadow-[0_4px_0_#9f1239] hover:-translate-y-0.5 hover:brightness-105 active:translate-y-1 active:shadow-none",
        destructive:
          "border-red-300 bg-red-500 text-white shadow-[0_4px_0_#991b1b] hover:bg-red-400 active:translate-y-1 active:shadow-none",
        outline:
          "border-amber-300 bg-[#fffaf0] text-amber-950 shadow-[0_3px_0_#d97706] hover:bg-amber-100 active:translate-y-0.5 active:shadow-none",
        secondary:
          "border-sky-300 bg-sky-400 text-sky-950 shadow-[0_4px_0_#0284c7] hover:bg-sky-300 active:translate-y-1 active:shadow-none",
        ghost:
          "border-transparent text-amber-950 hover:border-amber-200 hover:bg-amber-100",
        link:
          "border-transparent text-rose-600 underline-offset-4 shadow-none hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-2xl px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
