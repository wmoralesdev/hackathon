"use client"

import type { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"
import { Rocket, AlertCircle, Check, Lightbulb, Target } from "lucide-react"

export function HackathonTheme({ dict }: { dict: Dictionary }) {
  const { completeAction, actions } = useXp()
  const { spawnFloater } = useXpFloater()

  const handleScan = (e: React.MouseEvent) => {
    const completed = completeAction("theme_section", { xp: 50 })
    if (completed) {
      spawnFloater(e.clientX, e.clientY, "+50xp // THEME_ACQUIRED", "text-accent")
    }
  }

  const isScanned = actions.includes("theme_section")

  return (
    <section id="theme" className="container mx-auto px-4 py-16 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(245,78,0,0.05)_0%,transparent_60%)] -z-10" />

      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4">
          <span className="text-accent">{dict.theme.title_part1}</span> {dict.theme.title_part2}
        </h2>
        <p className="text-foreground/60 font-mono text-sm">
          &gt; {dict.theme.subtitle.toUpperCase()}
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <Card 
          level={1} 
          interactive={!isScanned}
          onClick={handleScan}
          className={cn(
            "group relative transition-all duration-500 animate-in fade-in slide-in-from-bottom-8",
            "p-5 md:p-10",
            isScanned && "border-accent/50 bg-accent/5 shadow-[0_0_30px_rgba(245,78,0,0.1)]"
          )}
        >
          {/* Status Indicator */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
            {isScanned ? (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-accent/10 border border-accent/20 text-accent">
                <Check className="w-3 h-3" />
                <span className="text-[10px] font-mono font-bold tracking-wider">ACQUIRED</span>
              </div>
            ) : (
              <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-accent transition-colors" />
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative z-10">
            {/* Left Column: Icon & Title */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6 mb-6 md:mb-8">
                <div className={cn(
                  "p-4 md:p-5 bg-white/5 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/10 shrink-0",
                  isScanned ? "text-accent" : "text-foreground/60 group-hover:text-accent"
                )}>
                  <Rocket className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-3 text-foreground group-hover:text-white transition-colors">
                    {dict.theme.title}
                  </h3>
                  <p className="text-foreground/70 font-mono text-sm md:text-base leading-relaxed max-w-2xl">
                    {dict.theme.description}
                  </p>
                </div>
              </div>

              {/* Examples Grid */}
              <div className="mt-8 md:mt-10">
                <div className="flex items-center gap-2 mb-4 md:mb-5">
                  <Lightbulb className="w-4 h-4 text-accent" />
                  <p className="text-xs font-mono text-accent/80 uppercase tracking-wider">
                    {dict.theme.examples_title}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                  {dict.theme.examples.map((example) => (
                    <div
                      key={example}
                      className="px-4 py-3 md:px-5 md:py-4 border border-white/5 bg-white/5 font-mono text-xs text-foreground/70 transition-colors group-hover:border-white/10 group-hover:bg-white/10 flex items-start gap-2 md:gap-3"
                    >
                      <span className="text-accent shrink-0 mt-0.5">&gt;</span>
                      <span className="leading-relaxed">{example}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evaluation Criteria */}
              <div className="mt-8 md:mt-10">
                <div className="flex items-center gap-2 mb-4 md:mb-5">
                  <Target className="w-4 h-4 text-accent" />
                  <p className="text-xs font-mono text-accent/80 uppercase tracking-wider">
                    {dict.theme.evaluation_title}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                  {dict.theme.evaluation_criteria.map((criterion) => (
                    <div
                      key={criterion.category}
                      className="px-4 py-3 md:px-5 md:py-4 border border-white/5 bg-white/5 transition-colors group-hover:border-white/10 group-hover:bg-white/10"
                    >
                      <div className="mb-2">
                        <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider">
                          {criterion.category}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-foreground/70 leading-relaxed">
                        {criterion.question}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Rule */}
            <div className="lg:w-80 shrink-0 mt-4 lg:mt-0">
              <div className="h-full border border-orange-500/20 bg-orange-500/5 p-6 relative overflow-hidden group/rule hover:border-orange-500/40 transition-colors flex flex-col justify-center">
                <div className="absolute -top-6 -right-6 p-3 opacity-[0.07] rotate-12 transition-transform group-hover/rule:rotate-0 duration-500">
                  <AlertCircle className="w-40 h-40 text-orange-500" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-500/10 text-orange-500">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-bold text-orange-400 uppercase tracking-tight">
                      {dict.theme.rule_title}
                    </p>
                  </div>
                  <p className="text-sm font-mono text-foreground/80 leading-relaxed">
                    {dict.theme.rule_text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
