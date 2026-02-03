import { readFile } from "fs/promises"
import { join } from "path"
import { prisma } from "@/lib/prisma"
import { parseParticipants } from "@/lib/participants"

async function main() {
  const contentPath = join(process.cwd(), "public", "content.txt")
  const content = await readFile(contentPath, "utf-8")
  const teams = parseParticipants(content)
  const participants = teams.flatMap((team) => team.members)

  if (participants.length === 0) {
    console.log("No participants found in content.txt")
    return
  }

  const batchSize = 50
  for (let i = 0; i < participants.length; i += batchSize) {
    const batch = participants.slice(i, i + batchSize)
    await prisma.$transaction(
      batch.map((participant) =>
        prisma.participantDirectoryEntry.upsert({
          where: {
            teamNumber_name: {
              teamNumber: participant.teamNumber,
              name: participant.name,
            },
          },
          update: {
            isLead: participant.isLead,
            luma: participant.luma ?? null,
            rsvp: participant.rsvp ?? null,
          },
          create: {
            teamNumber: participant.teamNumber,
            name: participant.name,
            isLead: participant.isLead,
            luma: participant.luma ?? null,
            rsvp: participant.rsvp ?? null,
          },
        })
      )
    )
  }

  console.log(`Upserted ${participants.length} participant directory entries`)
}

main()
  .catch((error) => {
    console.error("Failed to seed participant directory:", error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
