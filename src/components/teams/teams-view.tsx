"use client"

import * as React from "react"
import { Card } from "@/ui/card"
import { Badge } from "@/ui/badge"
import { cn } from "@/lib/utils"

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

interface TeamsViewProps {
  teams: Team[]
  loading: boolean
  error: string | null
  dict: {
    teams?: {
      title: string
      search_placeholder: string
      role: string
      name: string
      luma: string
      rsvp: string
      whatsapp: string
      lead: string
      member: string
      no_results: string
      loading: string
      error: string
      confirm_instructions: string
    }
  }
}

export function TeamsView({ teams, loading, error, dict }: TeamsViewProps) {
  const [search, setSearch] = React.useState("")
  const [rsvpChecks, setRsvpChecks] = React.useState<Record<string, boolean>>({})

  const t = dict.teams ?? {
    title: "Equipos",
    search_placeholder: "Buscar por nombre o WhatsApp...",
    role: "Rol",
    name: "Nombre",
    luma: "Luma",
    rsvp: "RSVP",
    whatsapp: "WhatsApp",
    lead: "Líder",
    member: "Miembro",
    no_results: "Sin resultados",
    loading: "Cargando equipos...",
    error: "Error al cargar equipos",
    confirm_instructions: "Haz clic en el badge de Líder para confirmar la participación de tu equipo",
  }

  const handleLeaderClick = (leaderName: string, teamDisplayName: string, teamSize: number) => {
    // Extract team number from displayName (e.g., "Team 1" -> "1")
    const teamNumber = teamDisplayName.replace(/[^0-9]/g, "") || teamDisplayName
    const message = `Hola Walter, soy ${leaderName} del equipo ${teamNumber}. Te confirmo la inscripción y participación de los ${teamSize} de mi equipo.`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/71320261?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  const toggleRsvp = (memberId: string) => {
    setRsvpChecks((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }))
  }

  // Filter teams based on search - show entire teams if any member matches
  const filteredTeams = React.useMemo(() => {
    if (!search.trim()) return teams

    const searchLower = search.toLowerCase()
    return teams.filter((team) =>
      team.members.some(
        (member) =>
          member.name.toLowerCase().includes(searchLower) ||
          member.whatsapp.toLowerCase().includes(searchLower)
      )
    )
  }, [teams, search])

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-12 w-48 bg-white/10 rounded mx-auto mb-8" />
            <div className="h-10 w-full max-w-md bg-white/10 rounded mx-auto mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-white/5 rounded" />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-500 font-mono">{t.error}: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-[95rem] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">
            {t.title}
          </h1>
          <p className="text-foreground/60 font-mono text-sm mb-6">
            {teams.length} equipos registrados
          </p>
          <p className="text-foreground/50 font-mono text-xs max-w-2xl mx-auto mb-4">
            {t.confirm_instructions}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.search_placeholder}
              className="w-full h-12 px-4 bg-black/40 border border-white/20 rounded font-mono text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <title>Buscar</title>
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Teams Grid */}
        {filteredTeams.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-foreground/60 font-mono">{t.no_results}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredTeams.map((team) => {
              const hasMissingLuma = team.members.some(member => !member.luma)
              
              return (
              <Card 
                key={team.id} 
                level={1} 
                className={cn(
                  "overflow-hidden",
                  hasMissingLuma && "border-yellow-500/50 border-2"
                )}
              >
                {/* Team Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="text-sm">
                      {team.displayName}
                    </Badge>
                    {hasMissingLuma && (
                      <Badge variant="destructive" className="text-[10px] px-2 py-0.5 animate-pulse">
                        ⚠ Luma pendiente
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs font-mono text-foreground/40">
                    {team.members.length} miembros
                  </span>
                </div>

                {/* Members Table */}
                <div className="overflow-x-auto -mx-6 px-6">
                  <table className="w-full text-sm min-w-full" style={{ tableLayout: 'auto', minWidth: '600px' }}>
                    <thead>
                      <tr className="border-b border-white/10 text-left">
                        <th className="pb-2 px-6 font-mono text-xs text-foreground/60 uppercase tracking-wider whitespace-nowrap" style={{ width: '80px' }}>
                          {t.role}
                        </th>
                        <th className="pb-2 px-6 font-mono text-xs text-foreground/60 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '180px' }}>
                          {t.name}
                        </th>
                        <th className="pb-2 px-6 font-mono text-xs text-foreground/60 uppercase tracking-wider text-center whitespace-nowrap" style={{ width: '60px' }}>
                          {t.luma}
                        </th>
                        <th className="pb-2 px-6 font-mono text-xs text-foreground/60 uppercase tracking-wider text-center whitespace-nowrap" style={{ width: '60px' }}>
                          {t.rsvp}
                        </th>
                        <th className="pb-2 px-6 font-mono text-xs text-foreground/60 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '140px', width: '140px' }}>
                          {t.whatsapp}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {team.members.map((member) => (
                        <tr
                          key={member.id}
                          className="border-b border-white/5 last:border-0"
                        >
                          <td className="py-2 px-6">
                            {member.role === "LEAD" ? (
                              <Badge 
                                variant="default" 
                                className="text-[10px] px-1.5 py-0 cursor-pointer hover:bg-accent/40 transition-colors"
                                onClick={() => handleLeaderClick(member.name, team.displayName, team.members.length)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault()
                                    handleLeaderClick(member.name, team.displayName, team.members.length)
                                  }
                                }}
                              >
                                {t.lead}
                              </Badge>
                            ) : (
                              <span className="text-foreground/40 text-xs">—</span>
                            )}
                          </td>
                          <td
                            className={cn(
                              "py-2 px-6 font-medium",
                              member.role === "LEAD" ? "text-accent" : "text-foreground"
                            )}
                          >
                            {member.name}
                          </td>
                          <td className="py-2 px-6 text-center">
                            {member.luma ? (
                              <span className="text-green-500">✓</span>
                            ) : (
                              <span className="text-red-500/60">✗</span>
                            )}
                          </td>
                          <td className="py-2 px-6 text-center">
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={rsvpChecks[member.id] ?? false}
                                onChange={() => toggleRsvp(member.id)}
                                className="sr-only peer"
                              />
                              <div className="w-4 h-4 border border-white/30 rounded-sm bg-black/40 peer-checked:bg-accent peer-checked:border-accent flex items-center justify-center transition-colors">
                                {rsvpChecks[member.id] && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-white"
                                    aria-hidden="true"
                                  >
                                    <title>Checked</title>
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                )}
                              </div>
                            </label>
                          </td>
                          <td className="py-2 px-6 font-mono text-xs text-foreground/60 break-all whitespace-normal" style={{ minWidth: '140px', width: '140px' }}>
                            {member.whatsapp ? (
                              <a
                                href={`https://wa.me/${member.whatsapp.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-accent transition-colors"
                              >
                                {member.whatsapp}
                              </a>
                            ) : (
                              <span className="text-foreground/30">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
