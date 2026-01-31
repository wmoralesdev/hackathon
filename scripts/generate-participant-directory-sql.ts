import { readFile, writeFile } from "fs/promises"
import { join } from "path"
import { parseParticipants } from "@/lib/participants"

function escapeSqlString(str: string | null | undefined): string {
  if (!str) return "NULL"
  return `'${str.replace(/'/g, "''")}'`
}

function formatSqlBoolean(value: boolean | null | undefined): string {
  if (value === null || value === undefined) return "NULL"
  return value ? "TRUE" : "FALSE"
}

async function main() {
  const contentPath = join(process.cwd(), "public", "content.txt")
  const content = await readFile(contentPath, "utf-8")
  const teams = parseParticipants(content)
  const participants = teams.flatMap((team) => team.members)

  if (participants.length === 0) {
    console.log("No participants found in content.txt")
    return
  }

  console.log(`Found ${participants.length} participants from ${teams.length} teams`)

  const sqlLines = [
    "BEGIN;",
    "",
  ]

  for (const participant of participants) {
    const sql = `INSERT INTO participant_directory_entries (team_number, participant_name, is_lead, luma, rsvp, whatsapp, created_at, updated_at)
VALUES (
  ${participant.teamNumber},
  ${escapeSqlString(participant.name)},
  ${formatSqlBoolean(participant.isLead)},
  ${formatSqlBoolean(participant.luma)},
  ${formatSqlBoolean(participant.rsvp)},
  ${escapeSqlString(participant.whatsapp)},
  NOW(),
  NOW()
)
ON CONFLICT (team_number, participant_name) 
DO UPDATE SET
  is_lead = EXCLUDED.is_lead,
  luma = EXCLUDED.luma,
  rsvp = EXCLUDED.rsvp,
  whatsapp = EXCLUDED.whatsapp,
  updated_at = NOW();`
    
    sqlLines.push(sql)
    sqlLines.push("")
  }

  sqlLines.push("COMMIT;")
  sqlLines.push("")

  const sqlContent = sqlLines.join("\n")
  const outputPath = join(process.cwd(), "scripts", "seed-participant-directory.sql")

  await writeFile(outputPath, sqlContent, "utf-8")
  console.log(`Generated SQL file: ${outputPath}`)
}

main().catch((error) => {
  console.error("Failed to generate SQL:", error)
  process.exitCode = 1
})
