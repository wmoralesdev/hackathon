import * as React from "react"
import { cn } from "@/lib/utils"

// Requires lucide-react. I'll check if installed, if not I'll just use SVG.
// Plan didn't specify icons lib, but shadcn usually uses lucide-react.
// I'll stick to SVG to be dependency-free as per "custom UI" spirit unless I add lucide.
// I'll add lucide-react, it's standard.

// Actually I'll check if lucide-react is installed.
// If not, I'll install it. It's useful.

// For now, SVG for Chevron.

interface AccordionProps {
  items: {
    id: string
    trigger: React.ReactNode
    content: React.ReactNode
  }[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item) => (
        <details
          key={item.id}
          className="group border border-white/5 bg-card px-4 open:bg-card-01 transition-colors"
        >
          <summary className="flex cursor-pointer items-center justify-between py-4 font-medium text-foreground [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            {item.trigger}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 text-foreground/50 transition-transform duration-200 group-open:rotate-180"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div className="pb-4 pt-0 text-foreground/80 animate-in fade-in slide-in-from-top-1 duration-200">
            {item.content}
          </div>
        </details>
      ))}
    </div>
  )
}
