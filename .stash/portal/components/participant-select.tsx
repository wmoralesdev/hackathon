"use client"

import * as React from "react"
import { Card } from "@/ui/card"
import { Button } from "@/ui/button"
import { findAllParticipantsByName, type Participant } from "@/lib/participants"
import type { Dictionary } from "@/i18n/utils"
import { cn } from "@/lib/utils"

interface ParticipantSelectProps {
  content: string
  onSelect: (data: { name: string; teamNumber: number; isLead: boolean }) => void
  dict: Dictionary
  loading?: boolean
}

export function ParticipantSelect({
  content,
  onSelect,
  dict,
  loading = false,
}: ParticipantSelectProps) {
  const [name, setName] = React.useState("")
  const [selectedParticipant, setSelectedParticipant] = React.useState<Participant | null>(null)

  const matchedParticipants = React.useMemo(() => {
    if (name.trim().length < 2) return []
    return findAllParticipantsByName(content, name)
  }, [name, content])

  // Auto-select if only one match exists
  React.useEffect(() => {
    if (matchedParticipants.length === 1) {
      setSelectedParticipant(matchedParticipants[0])
    } else {
      setSelectedParticipant(null)
    }
  }, [matchedParticipants])

  const handleConfirm = () => {
    if (name.trim() && selectedParticipant) {
      onSelect({
        name: name.trim(),
        teamNumber: selectedParticipant.teamNumber,
        isLead: selectedParticipant.isLead,
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Name Input */}
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={dict.portal?.onboarding?.name_placeholder || "Your full name..."}
          className="w-full px-4 py-3 bg-background/50 border border-white/10 font-mono text-sm focus:outline-none focus:border-accent transition-colors"
          disabled={loading}
        />
      </div>

      {/* Match Display */}
      {name.trim().length >= 2 && (
        <div className="space-y-4">
          {matchedParticipants.length === 0 ? (
            <Card level={1}>
              <p className="text-sm text-foreground/50">
                {dict.portal?.onboarding?.no_match || "No team match found"}
              </p>
            </Card>
          ) : matchedParticipants.length === 1 ? (
            <Card level={2} className="border-accent/50">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-mono text-accent">
                  {dict.portal?.onboarding?.matched?.replace("{team}", matchedParticipants[0].teamNumber.toString()) || `Matched: Team ${matchedParticipants[0].teamNumber}`}
                </span>
                {matchedParticipants[0].isLead && (
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-accent/20 text-accent border border-accent/30">
                    {dict.teams?.lead || "LEAD"}
                  </span>
                )}
              </div>
              <p className="font-bold">{matchedParticipants[0].name}</p>
            </Card>
          ) : (
            <>
              <p className="text-sm text-foreground/60 font-mono">
                {dict.portal?.onboarding?.multiple_matches || "Multiple matches found. Select your team:"}
              </p>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {matchedParticipants.map((participant) => {
                  const isSelected = selectedParticipant?.teamNumber === participant.teamNumber && 
                                     selectedParticipant?.name === participant.name
                  return (
                    <Card
                      key={`${participant.teamNumber}-${participant.name}`}
                      level={isSelected ? 2 : 1}
                      interactive
                      className={cn(
                        "cursor-pointer transition-all",
                        isSelected && "border-accent/50"
                      )}
                      onClick={() => setSelectedParticipant(participant)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold">{participant.name}</span>
                            {participant.isLead && (
                              <span className="text-[10px] font-mono px-2 py-0.5 bg-accent/20 text-accent border border-accent/30">
                                {dict.teams?.lead || "LEAD"}
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-mono text-foreground/50">
                            Team {participant.teamNumber}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="size-5 rounded-full bg-accent flex items-center justify-center" aria-label="Selected">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </Card>
                  )
                })}
              </div>
            </>
          )}
        </div>
      )}

      {/* Confirm Button */}
      <Button
        variant="primary"
        className="w-full"
        onClick={handleConfirm}
        disabled={!name.trim() || !selectedParticipant || loading}
      >
        {loading
          ? "Processing..."
          : dict.portal?.onboarding?.confirm || "Continue"}
      </Button>
    </div>
  )
}
