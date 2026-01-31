export interface Participant {
  name: string;
  teamNumber: number;
  isLead: boolean;
  luma?: boolean;
  rsvp?: boolean;
  whatsapp?: string;
}

export interface Team {
  number: number;
  members: Participant[];
}

/**
 * Parses the content.txt file to extract participant and team information
 */
export function parseParticipants(content: string): Team[] {
  const parseBoolean = (value?: string) => {
    if (!value) return undefined
    const normalized = value.trim().toLowerCase()
    if (normalized === "true") return true
    if (normalized === "false") return false
    return undefined
  }

  const lines = content.split("\n").filter((line) => line.trim());
  const teams: Team[] = [];
  let currentTeam: Team | null = null;

  for (const line of lines) {
    // Don't trim the whole line - we need to preserve leading tabs for empty columns
    // Skip completely empty lines
    if (!line.trim()) continue;

    // Check if this is a team header (e.g., "Team 01")
    const teamMatch = line.trim().match(/^Team\s+(\d+)/i);
    if (teamMatch) {
      // Save previous team if exists
      if (currentTeam && currentTeam.members.length > 0) {
        teams.push(currentTeam);
      }
      
      // Start new team
      currentTeam = {
        number: parseInt(teamMatch[1], 10),
        members: [],
      };
      continue;
    }

    // Check if this is a header row (Members, Luma, RSVP, WhatsApp)
    // Note: LEAD is NOT a header - it's a data value in the first column
    if (line.trim().match(/^(Members|Luma|RSVP|WhatsApp)$/i)) {
      continue;
    }

    // Parse team member line
    // Format: LEAD or empty, Name, Luma, RSVP, WhatsApp
    // Split by tab FIRST to preserve column alignment, then trim each part
    const parts = line.split("\t").map(p => p.trim());
    
    if (parts.length >= 2 && currentTeam) {
      // Column 0: LEAD or empty
      // Column 1: Name (Members column)
      // Column 2: Luma
      // Column 3: RSVP
      // Column 4: WhatsApp
      
      // Check if first column is LEAD (could be empty for regular members)
      const firstCol = parts[0] || "";
      const isLead = firstCol.toUpperCase() === "LEAD";
      
      // Name is always in column 1 (index 1)
      const name = parts[1] || "";
      const luma = parseBoolean(parts[2])
      const rsvp = parseBoolean(parts[3])
      const whatsapp = parts.length >= 5 && parts[4] ? parts[4] : undefined;

      // Skip if name is empty or is a header keyword
      if (name && name !== "Members" && name !== "Luma" && name !== "RSVP" && name !== "WhatsApp") {
        currentTeam.members.push({
          name,
          teamNumber: currentTeam.number,
          isLead,
          luma,
          rsvp,
          whatsapp: whatsapp && whatsapp !== "WhatsApp" ? whatsapp : undefined,
        });
      }
    }
  }

  // Don't forget the last team
  if (currentTeam && currentTeam.members.length > 0) {
    teams.push(currentTeam);
  }

  return teams;
}

/**
 * Get all participants as a flat list
 */
export function getAllParticipants(content: string): Participant[] {
  const teams = parseParticipants(content);
  return teams.flatMap((team) => team.members);
}

/**
 * Get a team by number
 */
export function getTeamByNumber(content: string, teamNumber: number): Team | null {
  const teams = parseParticipants(content);
  return teams.find((team) => team.number === teamNumber) || null;
}

/**
 * Find a participant by name (case-insensitive partial match)
 */
export function findParticipantByName(
  content: string,
  searchName: string
): Participant | null {
  const participants = getAllParticipants(content);
  // Normalize search term: trim and normalize whitespace
  const normalizedSearch = searchName.toLowerCase().trim().replace(/\s+/g, ' ');
  
  if (!normalizedSearch) return null;
  
  return (
    participants.find((p) => {
      // Normalize participant name: trim and normalize whitespace
      const normalizedName = p.name.toLowerCase().trim().replace(/\s+/g, ' ');
      
      // Check if participant name contains the search term
      if (normalizedName.includes(normalizedSearch)) {
        return true;
      }
      
      // Also check if any word in the name starts with the search term
      // This helps with cases like "Daniela" matching "Daniela Huezo"
      const words = normalizedName.split(/\s+/);
      return words.some(word => word.startsWith(normalizedSearch));
    }) || null
  );
}

/**
 * Find all participants matching a name (case-insensitive partial match)
 * Returns all matches, useful when multiple participants share the same name
 */
export function findAllParticipantsByName(
  content: string,
  searchName: string
): Participant[] {
  const participants = getAllParticipants(content);
  const normalizedSearch = searchName.toLowerCase().trim().replace(/\s+/g, ' ');
  
  if (!normalizedSearch) return [];
  
  return participants.filter((p) => {
    const normalizedName = p.name.toLowerCase().trim().replace(/\s+/g, ' ');
    if (normalizedName.includes(normalizedSearch)) return true;
    const words = normalizedName.split(/\s+/);
    return words.some(word => word.startsWith(normalizedSearch));
  });
}
