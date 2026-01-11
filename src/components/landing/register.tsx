"use client"

import * as React from "react"
import { Dictionary } from "@/i18n/utils"
import { Card } from "@/ui/card"
import { HoldToDeployButton } from "@/components/xp/hold-to-deploy"

export function Register({ dict }: { dict: Dictionary }) {
  const [showIframe, setShowIframe] = React.useState(false)

  return (
    <section id="register" className="container mx-auto px-4 py-12">
       <Card level={2} className="overflow-hidden p-0 border-white/5 bg-card/50 backdrop-blur-sm relative min-h-[400px]">
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{dict.nav.register}</h2>
          <p className="text-foreground/60 max-w-lg mx-auto mb-4">
            Secure your spot at the first Cursor Hackathon in Central America.
          </p>
          <p className="text-sm text-foreground/40 font-mono mb-8">
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
        </div>
        
        <div className="w-full flex justify-center pb-8 px-4">
          {!showIframe ? (
            <div className="flex flex-col items-center justify-center h-[300px] border border-dashed border-white/10 rounded-lg w-full max-w-3xl bg-black/20">
              <div className="text-center space-y-4">
                <div className="font-mono text-sm text-foreground/40 mb-4">
                  READY TO DEPLOY TO PRODUCTION?
                </div>
                <HoldToDeployButton 
                  onComplete={() => setShowIframe(true)}
                  className="bg-accent text-white h-16 px-12 rounded-md font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(245,78,0,0.3)]"
                >
                  DEPLOY REGISTRATION
                </HoldToDeployButton>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-3xl animate-in fade-in zoom-in duration-500">
              <iframe
                src="https://lu.ma/embed/9v6p0gz6/simple"
                className="w-full h-[600px] rounded-lg border border-white/10 bg-background"
                allow="fullscreen; payment"
                aria-label="Register for Cursor Hackathon"
                title="Luma Registration"
              />
            </div>
          )}
        </div>
       </Card>
    </section>
  )
}
