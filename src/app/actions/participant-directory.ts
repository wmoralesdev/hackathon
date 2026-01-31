"use server"

import { prisma } from "@/lib/prisma"
import type { Participant } from "@/lib/participants"

export async function getParticipantDirectoryEntries(): Promise<Participant[]> {
  const rows = await prisma.participantDirectoryEntry.findMany({
    select: {
      teamNumber: true,
      name: true,
      isLead: true,
      luma: true,
      rsvp: true,
      whatsapp: true,
    },
    orderBy: [
      { teamNumber: "asc" },
      { isLead: "desc" },
      { name: "asc" },
    ],
  })

  return rows.map((row) => ({
    name: row.name,
    teamNumber: row.teamNumber,
    isLead: row.isLead,
    luma: row.luma ?? undefined,
    rsvp: row.rsvp ?? undefined,
    whatsapp: row.whatsapp ?? undefined,
  }))
}
