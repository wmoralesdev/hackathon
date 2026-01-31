"use client"

import * as React from "react"
import { Card } from "@/ui/card"
import { getTeamByNumber } from "@/lib/participants"
import type { Dictionary } from "@/i18n/utils"
import { cn, toSentenceCase } from "@/lib/utils"
import { PortalSectionHeader } from "./portal-section-header"

interface TeamCardProps {
  teamNumber: number
  currentUserName: string
  content: string
  dict: Dictionary
}

export function TeamCard({
  teamNumber,
  currentUserName,
  content,
  dict,
}: TeamCardProps) {
  const team = React.useMemo(() => {
    return getTeamByNumber(content, teamNumber)
  }, [content, teamNumber])

  if (!team) {
    return (
      <Card level={2}>
        <p className="text-foreground/50 text-sm">
          {dict.portal?.team?.not_found?.replace("{number}", teamNumber.toString()) || `Team ${teamNumber} not found`}
        </p>
      </Card>
    )
  }

  return (
    <Card level={2}>
      <div className="space-y-4">
        <PortalSectionHeader
          title={dict.portal?.team?.title || "Your Team"}
          subtitle={dict.portal?.team?.number?.replace("{number}", teamNumber.toString()) || `Team ${teamNumber}`}
        />

        <div className="space-y-2">
          {team.members.map((member) => {
            const isCurrentUser = member.name.toLowerCase() === currentUserName.toLowerCase()
            return (
              <div
                key={member.name}
                className={cn(
                  "flex items-center justify-between p-3 rounded border transition-all duration-200",
                  isCurrentUser
                    ? "bg-accent/10 border-accent/30 shadow-[0_0_15px_rgba(245,78,0,0.1)]"
                    : "bg-white/5 border-white/10 hover:border-accent/30 hover:bg-white/10"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm">{toSentenceCase(member.name)}</span>
                  {member.isLead && (
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-accent/20 text-accent border border-accent/30 rounded-sm">
                      {dict.teams?.lead || "LEAD"}
                    </span>
                  )}
                  {isCurrentUser && (
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded-sm">
                      {dict.portal?.team?.you || "YOU"}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
