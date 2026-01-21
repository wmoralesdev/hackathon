"use client"

import * as React from "react"
import { TeamsView } from "@/components/teams/teams-view"
import { Nav } from "@/components/nav"
import { es } from "@/i18n/es"

interface TeamMember {
  id: string
  role: string
  name: string
  luma: boolean
  whatsapp: string
}

interface Team {
  id: string
  displayName: string
  members: TeamMember[]
}

function parseTeamsData(content: string): Team[] {
  const lines = content.split("\n")
  const teams: Team[] = []
  let currentTeam: Team | null = null
  let memberIndex = 0
  let teamIndex = 0

  for (const line of lines) {
    const trimmed = line.trim()
    
    // Skip empty lines
    if (!trimmed) {
      if (currentTeam && currentTeam.members.length > 0) {
        teams.push(currentTeam)
        currentTeam = null
      }
      continue
    }

    // Check if it's a team header (starts with "Team")
    if (trimmed.startsWith("Team")) {
      if (currentTeam && currentTeam.members.length > 0) {
        teams.push(currentTeam)
      }
      const parts = trimmed.split("\t")
      teamIndex++
      currentTeam = {
        id: `team-${teamIndex}`,
        displayName: parts[0],
        members: [],
      }
      memberIndex = 0
      continue
    }

    // It's a member row
    if (currentTeam) {
      const parts = line.split("\t")
      
      // Format is always: [Role/Empty] | Name | RSVP | WhatsApp
      // Column 0: Role (LEAD or empty string)
      // Column 1: Name
      // Column 2: RSVP (TRUE/FALSE)
      // Column 3: WhatsApp
      const roleCol = parts[0]?.trim() || ""
      const name = parts[1]?.trim() || ""
      const rsvpValue = parts[2]?.trim() || "FALSE"
      const whatsapp = parts[3]?.trim() || ""

      // Skip rows with no name
      if (!name) continue

      // Determine if this is a LEAD
      const role = roleCol.toUpperCase() === "LEAD" ? "LEAD" : ""

      currentTeam.members.push({
        id: `${currentTeam.id}-${memberIndex}`,
        role,
        name,
        luma: rsvpValue.toUpperCase() === "TRUE",
        whatsapp,
      })
      memberIndex++
    }
  }

  // Don't forget the last team
  if (currentTeam && currentTeam.members.length > 0) {
    teams.push(currentTeam)
  }

  return teams
}

export default function EquiposPage() {
  const [teams, setTeams] = React.useState<Team[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch("/content.txt")
        if (!response.ok) {
          throw new Error("Failed to load teams data")
        }
        const content = await response.text()
        const parsedTeams = parseTeamsData(content)
        setTeams(parsedTeams)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  // Use Spanish dictionary directly since page is Spanish-only
  const dict = es

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30">
      <Nav dict={dict} />
      <main className="flex flex-col">
        <TeamsView teams={teams} loading={loading} error={error} dict={dict} />
      </main>
    </div>
  )
}
