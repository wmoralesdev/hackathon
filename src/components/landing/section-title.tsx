import Link from "next/link"
import { Hash } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function SectionTitle({ href, children, className }: SectionTitleProps) {
  return (
    <Link 
      href={href} 
      className={cn(
        "group relative inline-block",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Hash className="w-6 h-6 md:w-8 md:h-8 opacity-0 group-hover:opacity-100 transition-opacity text-accent/60" />
        <div className={cn(
          "relative text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter transition-opacity",
          "after:absolute after:left-0 after:bottom-0 after:w-full after:h-px after:bg-current after:opacity-0 after:group-hover:opacity-100 after:transition-opacity",
          className
        )}>
          {children}
        </div>
      </div>
    </Link>
  )
}
