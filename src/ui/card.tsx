import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "relative border border-white/10 backdrop-blur-md transition-all overflow-hidden",
  {
    variants: {
      level: {
        default: "bg-black/60",
        1: "bg-black/40",
        2: "bg-card-02/80",
        3: "bg-card-03/80",
        4: "bg-card-04/80",
      },
      interactive: {
        true: "hover:border-accent/50 hover:shadow-[0_0_30px_rgba(245,78,0,0.1)] cursor-pointer group hover:bg-accent/5",
        false: "",
      }
    },
    defaultVariants: {
      level: "default",
      interactive: false,
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, level, interactive, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ level, interactive, className }))}
        {...props}
      >
        {/* HUD Corner Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/20 group-hover:border-accent transition-colors" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/20 group-hover:border-accent transition-colors" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/20 group-hover:border-accent transition-colors" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/20 group-hover:border-accent transition-colors" />
        
        {/* Scanline overlay for interactive cards */}
        {interactive && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 translate-y-[-100%] group-hover:translate-y-[100%] transition-all duration-1000 pointer-events-none" />
        )}
        
        <div className="relative z-10 p-6">
          {children}
        </div>
      </div>
    )
  }
)
Card.displayName = "Card"

export { Card, cardVariants }
