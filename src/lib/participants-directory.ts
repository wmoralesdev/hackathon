import { prisma } from "@/lib/prisma"

type ParticipantDirectoryRow = {
  teamNumber: number
  name: string
  isLead: boolean
  luma: boolean | null
  rsvp: boolean | null
}

const toTruthLabel = (value: boolean | null) => {
  if (value === null) return ""
  return value ? "TRUE" : "FALSE"
}

const formatTeamHeader = (teamNumber: number) =>
  `Team ${String(teamNumber).padStart(2, "0")}\tMembers\tLuma\tRSVP`

const formatParticipantLine = (row: ParticipantDirectoryRow) => {
  const leadLabel = row.isLead ? "LEAD" : ""
  const lumaLabel = toTruthLabel(row.luma)
  const rsvpLabel = toTruthLabel(row.rsvp)
  return `${leadLabel}\t${row.name}\t${lumaLabel}\t${rsvpLabel}`
}

const formatDirectoryContent = (rows: ParticipantDirectoryRow[]) => {
  const lines: string[] = []
  let currentTeam: number | null = null

  for (const row of rows) {
    if (currentTeam !== row.teamNumber) {
      if (currentTeam !== null) {
        lines.push("")
      }
      currentTeam = row.teamNumber
      lines.push(formatTeamHeader(row.teamNumber))
    }
    lines.push(formatParticipantLine(row))
  }

  return lines.join("\n")
}

export async function getParticipantDirectoryContent() {
  const rows = await prisma.participantDirectoryEntry.findMany({
    orderBy: [
      { teamNumber: "asc" },
      { isLead: "desc" },
      { name: "asc" },
    ],
  })

  return formatDirectoryContent(rows)
}
