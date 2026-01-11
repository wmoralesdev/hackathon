"use client"

import * as React from "react"
import { useXp } from "./xp-provider"
import { Button } from "@/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const LEVEL_NAMES = [
  "Newbie",
  "Apprentice Builder",
  "Prototyper",
  "Product Builder",
  "System Architect",
  "Visionary" // Max level fallback
]

export function LevelUpOverlay() {
  const { currentLevel, justLeveledUp, acknowledgeLevelUp } = useXp()
  const [show, setShow] = React.useState(false)

  React.useEffect(() => {
    if (justLeveledUp) {
      setShow(true)
    }
  }, [justLeveledUp])

  const handleClose = () => {
    setShow(false)
    // Delay acknowledgement handled by exit animation
  }

  const rankName = LEVEL_NAMES[currentLevel] || "10x Builder"

  return (
    <AnimatePresence onExitComplete={acknowledgeLevelUp}>
      {show && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md cursor-pointer"
          onClick={handleClose}
        >
          <div className="relative text-center">
            {/* Burst Effect */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 blur-[100px] rounded-full" 
            />
            
            <div className="relative z-10 space-y-6">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-xl font-mono text-accent tracking-[0.5em] uppercase"
              >
                System Upgrade
              </motion.div>
              
              <motion.h2 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 stroke-text"
              >
                LEVEL {currentLevel}
              </motion.h2>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-3xl md:text-5xl font-bold text-accent"
              >
                {rankName}
              </motion.div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="pt-8"
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-black/50 border-accent/50 hover:bg-accent hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClose()
                  }}
                >
                  ACKNOWLEDGE
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
