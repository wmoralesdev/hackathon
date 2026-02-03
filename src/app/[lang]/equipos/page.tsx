import { TeamsView } from "@/components/teams/teams-view"
import { Nav } from "@/components/nav"
import { getDictionary } from "@/i18n/utils"
import { prisma } from "@/lib/prisma"

interface TeamMember {
  id: string
  role: string
  name: string
  luma: boolean
  rsvp: boolean
}

interface Team {
  id: string
  displayName: string
  members: TeamMember[]
}

async function getTeamsFromDatabase(): Promise<Team[]> {
  const entries = await prisma.participantDirectoryEntry.findMany({
    orderBy: [
      { teamNumber: "asc" },
      { isLead: "desc" },
      { name: "asc" },
    ],
  })

  const teamsMap = new Map<number, Team>()

  for (const entry of entries) {
    let team = teamsMap.get(entry.teamNumber)
    if (!team) {
      const teamNumberStr = String(entry.teamNumber).padStart(2, "0")
      team = {
        id: `team-${entry.teamNumber}`,
        displayName: `Team ${teamNumberStr}`,
        members: [],
      }
      teamsMap.set(entry.teamNumber, team)
    }
    team.members.push({
      id: `${team.id}-${entry.id}`,
      role: entry.isLead ? "LEAD" : "",
      name: entry.name,
      luma: entry.luma ?? false,
      rsvp: entry.rsvp ?? false,
    })
  }

  return Array.from(teamsMap.values())
}

export default async function EquiposPage({
  params,
}: {
  params: Promise<{ lang: "en" | "es" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  let teams: Team[] = []
  let error: string | null = null

  try {
    teams = await getTeamsFromDatabase()
  } catch (err) {
    error = err instanceof Error ? err.message : "Unknown error"
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30">
      <Nav dict={dict} />
      <main className="flex flex-col">
        <TeamsView teams={teams} loading={false} error={error} dict={dict} />
      </main>
    </div>
  )
}
