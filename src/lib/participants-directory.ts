import { readFile } from "fs/promises"
import { join } from "path"
import { prisma } from "@/lib/prisma"

type ParticipantDirectoryRow = {
  teamNumber: number
  name: string
  isLead: boolean
  luma: boolean | null
  rsvp: boolean | null
  whatsapp: string | null
}

const toTruthLabel = (value: boolean | null) => {
  if (value === null) return ""
  return value ? "TRUE" : "FALSE"
}

const formatTeamHeader = (teamNumber: number) =>
  `Team ${String(teamNumber).padStart(2, "0")}\tMembers\tLuma\tRSVP\tWhatsApp`

const formatParticipantLine = (row: ParticipantDirectoryRow) => {
  const leadLabel = row.isLead ? "LEAD" : ""
  const lumaLabel = toTruthLabel(row.luma)
  const rsvpLabel = toTruthLabel(row.rsvp)
  const whatsapp = row.whatsapp ?? ""
  return `${leadLabel}\t${row.name}\t${lumaLabel}\t${rsvpLabel}\t${whatsapp}`
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

  if (rows.length > 0) {
    return formatDirectoryContent(rows)
  }

  const contentPath = join(process.cwd(), "public", "content.txt")
  return readFile(contentPath, "utf-8")
}
