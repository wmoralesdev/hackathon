import * as React from "react"
import { useXp } from "@/components/xp/xp-provider"
import { XP_VALUES, XPAction } from "@/lib/xp"

export function XpTrigger({ 
  children, 
  action = "VIEW_SECTION",
  once = true,
  className
}: { 
  children: React.ReactNode
  action?: XPAction
  once?: boolean
  className?: string
}) {
  const { addXp } = useXp()
  const ref = React.useRef<HTMLDivElement>(null)
  const [hasTriggered, setHasTriggered] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (once && hasTriggered) return
          
          addXp(XP_VALUES[action] || 10)
          setHasTriggered(true)
          
          if (once) {
            observer.disconnect()
          }
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [action, addXp, hasTriggered, once])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
