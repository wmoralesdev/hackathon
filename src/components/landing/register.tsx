"use client"

import Script from "next/script"
import type { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"

export function Register({ dict }: { dict: Dictionary }) {
  return (
    <section id="register" className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <Card level={2} className="overflow-hidden p-0 border-white/5 bg-card/50 backdrop-blur-sm relative">
          {/* Background Decoration */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(245,78,0,0.05)_0%,transparent_60%)] -z-10" />
          
          <div className="relative z-10 p-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-3">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-white/50">{dict.nav.register}</span>
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto mb-3 font-mono text-sm">
              Secure your spot at the first Cursor Hackathon in Central America.
            </p>
            <p className="text-xs text-foreground/40 font-mono mb-6">
              &gt; Need a team?{" "}
              <a 
                href="https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj" 
                target="_blank" 
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                Join our WhatsApp
              </a>{" "}
              to find teammates!
            </p>
            
            <div className="flex justify-center">
              <a
                href="https://luma.com/event/evt-tkoz9MA8IzqktV7"
                className="luma-checkout--button inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent/90 text-white font-bold uppercase tracking-wider text-sm rounded-lg transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(245,78,0,0.3)] group relative"
                data-luma-action="checkout"
                data-luma-event-id="evt-tkoz9MA8IzqktV7"
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/30" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white/30" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/30" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/30" />
                
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform" aria-hidden="true">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>Register for Event</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </Card>
      </div>
       
      <Script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js" strategy="afterInteractive" />
    </section>
  )
}
