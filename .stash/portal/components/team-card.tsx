"use client"

import * as React from "react"
import { Card } from "@/ui/card"
import { getTeamByNumber } from "@/lib/participants"
import type { Dictionary } from "@/i18n/utils"
import { cn, toSentenceCase } from "@/lib/utils"

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
      <Card level={2} className="p-6">
        <p className="text-foreground/50 text-sm">
          {dict.portal?.team?.not_found?.replace("{number}", teamNumber.toString()) || `Team ${teamNumber} not found`}
        </p>
      </Card>
    )
  }

  return (
    <Card level={2} className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-mono text-foreground/60 mb-1 uppercase tracking-wider">
            {dict.portal?.team?.title || "Your Team"}
          </h3>
          <p className="text-2xl font-black">
            {dict.portal?.team?.number?.replace("{number}", teamNumber.toString()) || `Team ${teamNumber}`}
          </p>
        </div>

        <div className="space-y-2 pt-4 border-t border-white/10">
          {team.members.map((member) => {
            const isCurrentUser = member.name.toLowerCase() === currentUserName.toLowerCase()
            return (
              <div
                key={member.name}
                className={cn(
                  "flex items-center justify-between p-3 transition-colors",
                  isCurrentUser
                    ? "bg-accent/10 border border-accent/30"
                    : "bg-white/5"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{toSentenceCase(member.name)}</span>
                  {member.isLead && (
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-accent/20 text-accent border border-accent/30">
                      {dict.teams?.lead || "LEAD"}
                    </span>
                  )}
                  {isCurrentUser && (
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/30">
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
