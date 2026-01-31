"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import type { MouseEvent } from "react"
import Image from "next/image"
import type { Dictionary } from "@/i18n/utils"
import { useXp } from "@/components/xp/xp-provider"
import { useXpFloater } from "@/components/xp/xp-floater"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { SectionTitle } from "./section-title"
import { getJuryMembers, type JuryMember } from "@/lib/people/jury"

export function Jury({ dict }: { dict: Dictionary }) {
  const { completeAction } = useXp()
  const { spawnFloater } = useXpFloater()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  const juryMembers = useMemo(() => getJuryMembers(dict), [dict])

  const selectedMember = useMemo(
    () => selectedId ? juryMembers.find((m) => m.id === selectedId) : null,
    [selectedId, juryMembers]
  )

  const handleSelect = (member: JuryMember, e?: MouseEvent) => {
    if (member.isSurpriseGuest) return
    
    setSelectedId(member.id)
    
    // XP Logic
    const completed = completeAction(`jury_${member.name.toLowerCase().replace(/\s+/g, '_')}`, { xp: 30 })
    if (completed && e) {
      spawnFloater(e.clientX, e.clientY, `+30xp // JURY_${member.name.toUpperCase().split(' ')[0]}`, "text-purple-400")
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    const scrollAmount = 300
    const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })
  }

  // Hide XP widget when jury section is visible
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          document.body.classList.add('jury-section-active')
        } else {
          document.body.classList.remove('jury-section-active')
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
      document.body.classList.remove('jury-section-active')
    }
  }, [])

  // JS-driven auto-scroll for sync with scrollbar
  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth < 768) return

    let animationFrameId: number
    const scrollSpeed = 0.5 // pixels per frame

    const animate = () => {
      if (!isPaused && scrollContainerRef.current) {
        const container = scrollContainerRef.current
        
        // If we've scrolled past the first set of items (halfway), reset to 0
        // We need to calculate the width of one set of items
        // Since we duplicate the items, scrollWidth is approx 2x the single set width
        // We can check if scrollLeft >= scrollWidth / 2
        
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0
        } else {
          container.scrollLeft += scrollSpeed
        }
      }
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isPaused])

  return (
    <section ref={sectionRef} id="evaluation-jury" className="container mx-auto px-4 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="mb-4">
            <SectionTitle href="#evaluation-jury">
              <span className="text-accent">{dict.jury.title_part1}</span> {dict.jury.title_part2}
            </SectionTitle>
          </div>
          <p className="text-foreground/60 font-mono">
            &gt; {dict.jury.subtitle}
          </p>
        </div>

        {/* Jury Profile Modal */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              {/* Backdrop */}
              <button
                type="button"
                className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
                onClick={() => setSelectedId(null)}
                aria-label="Close modal"
              />
              
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative z-10 w-full max-w-lg bg-card border border-white/10 shadow-2xl overflow-hidden"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/50 border border-white/10 text-white/50 hover:text-accent hover:border-accent transition-all"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Image Header */}
                <div className="relative aspect-4/5 max-h-[60vh] overflow-hidden bg-card-02">
                  {selectedMember.image ? (
                    <Image
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      fill
                      className={cn(
                        "object-cover object-center",
                        selectedMember.name === "Francis Sanchinelli" && "object-[center_25%]"
                      )}
                      sizes="(max-width: 768px) 100vw, 512px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                      <span className="text-6xl font-black text-foreground/20">
                        {selectedMember.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-card to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 -mt-12 relative">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-accent mb-1">
                    {selectedMember.name}
                  </h3>
                  <p className="text-sm text-foreground/60 font-mono leading-relaxed mb-4">
                    {selectedMember.title}
                  </p>

                  {selectedMember.description && (
                    <p className="text-sm text-foreground/70 leading-relaxed mb-4 border-l-2 border-accent/30 pl-3">
                      {selectedMember.description}
                    </p>
                  )}

                  {/* Social Links */}
                  {(selectedMember.x || selectedMember.linkedin) && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                      {selectedMember.x && (
                        <a
                          href={selectedMember.x}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-accent/10 hover:border-accent hover:text-accent transition-all text-sm"
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                            <title>X (Twitter)</title>
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                          <span className="font-mono">@{selectedMember.x.split('/').pop()}</span>
                        </a>
                      )}
                      {selectedMember.linkedin && (
                        <a
                          href={selectedMember.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-accent/10 hover:border-accent hover:text-accent transition-all text-sm"
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                            <title>LinkedIn</title>
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          <span className="font-mono">LinkedIn</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* HUD Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Juror Stream (Desktop Marquee / Mobile Scroll) */}
        <div 
          className="relative w-full py-8 group/stream"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Jury members carousel"
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Controls */}
          <button 
            type="button"
            onClick={() => scroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 border border-white/10 hidden md:flex items-center justify-center text-white/50 hover:text-accent hover:border-accent transition-all backdrop-blur-sm"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            type="button"
            onClick={() => scroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 border border-white/10 hidden md:flex items-center justify-center text-white/50 hover:text-accent hover:border-accent transition-all backdrop-blur-sm"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Marquee Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-6 custom-scrollbar px-4 md:px-16"
          >
            {/* We duplicate the array for infinite loop effect on desktop */}
            <div className="flex gap-4 md:gap-6 min-w-full">
              {[...juryMembers, ...juryMembers].map((member, i) => (
                <button
                  type="button"
                  key={`${member.id}-${i}`}
                  onClick={(e) => handleSelect(member, e)}
                  disabled={member.isSurpriseGuest}
                  className={cn(
                    "relative shrink-0 w-[200px] md:w-[240px] aspect-3/4 group/card text-left transition-all duration-300 snap-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    selectedId === member.id ? "scale-105 z-10" : "scale-100 opacity-70 hover:opacity-100",
                    member.isSurpriseGuest && "opacity-40 cursor-default"
                  )}
                >
                  <div className={cn(
                    "absolute inset-0 border border-white/10 bg-card-01 transition-colors overflow-hidden",
                    selectedId === member.id ? "border-accent/50 bg-card-02" : "group-hover/card:border-white/30"
                  )}>
                    {/* Image */}
                    <div className="h-[60%] w-full relative overflow-hidden bg-black/50">
                      {member.isSurpriseGuest ? (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl font-black text-white/10">???</span>
                        </div>
                      ) : member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className={cn(
                            "object-cover object-center transition-transform duration-500 group-hover/card:scale-110 grayscale",
                            selectedId === member.id && "grayscale-0",
                            member.name === "Francis Sanchinelli" && "object-[center_25%]"
                          )}
                          sizes="(max-width: 768px) 200px, 240px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/5">
                          <span className="text-4xl font-black text-white/20">{member.name.charAt(0)}</span>
                        </div>
                      )}
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-linear-to-t from-card-01 via-transparent to-transparent opacity-80" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      {member.isSurpriseGuest ? (
                        <div className="font-mono text-xs text-accent/50 uppercase">Coming Soon</div>
                      ) : (
                        <>
                          <h4 className={cn(
                            "font-bold uppercase leading-tight mb-1 transition-colors",
                            selectedId === member.id ? "text-accent" : "text-foreground"
                          )}>
                            {member.name}
                          </h4>
                          <p className="text-[10px] text-foreground/50 font-mono line-clamp-2 leading-relaxed">
                            {member.title}
                          </p>
                        </>
                      )}
                    </div>

                    {/* Active Indicator */}
                    {selectedId === member.id && (
                      <div className="absolute top-2 right-2 w-2 h-2 bg-accent animate-pulse rounded-full shadow-[0_0_10px_rgba(245,78,0,0.8)]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Mobile Scroll Hint */}
          <div className="md:hidden text-center mt-4 text-xs font-mono text-foreground/30 animate-pulse">
            &lt;&lt; SWIPE TO EXPLORE &gt;&gt;
          </div>
        </div>
      </div>
    </section>
  )
}