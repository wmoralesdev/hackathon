"use client"

import { Dictionary } from "@/i18n/utils"
import { Badge } from "@/ui/badge"
import { Button } from "@/ui/button"
import { Card } from "@/ui/card"

interface ShowcaseAdminViewProps {
  data: Array<{
    teamNumber: number
    sourceUrl: string | null
    snapshot: {
      teamNumber: number
      sourceUrl: string
      title: string | null
      fetchError: string | null
      lastFetchedAt: Date | null
    } | null
  }>
  dict: Dictionary
  lang: string
}

export function ShowcaseAdminView({
  data,
  dict,
  lang,
}: ShowcaseAdminViewProps) {
  const handleRetry = async (teamNumber: number) => {
    if (!confirm(`Retry scraping for Team ${teamNumber}?`)) {
      return
    }

    try {
      const response = await fetch(`/api/portal/showcase/ingest/${teamNumber}`, {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to retry")
      }

      alert(`Team ${teamNumber} scrape initiated. Refresh to see results.`)
      window.location.reload()
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  const handleBulkRetry = async (retryFailedOnly: boolean) => {
    if (
      !confirm(
        retryFailedOnly
          ? "Retry scraping for all failed teams?"
          : "Retry scraping for all teams?"
      )
    ) {
      return
    }

    try {
      const response = await fetch("/api/portal/showcase/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          concurrency: 3,
          retryFailedOnly,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to start bulk ingestion")
      }

      const result = await response.json()
      alert(
        `Bulk ingestion started. Stats: ${result.stats.successful} successful, ${result.stats.failed} failed. Refresh to see results.`
      )
      window.location.reload()
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  const successful = data.filter((d) => d.snapshot && !d.snapshot.fetchError).length
  const failed = data.filter((d) => d.snapshot?.fetchError).length
  const missing = data.filter((d) => !d.snapshot).length

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">Showcase Admin</h1>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card level={2} className="p-4">
            <div className="text-sm text-muted-foreground">Successful</div>
            <div className="text-2xl font-bold text-green-600">{successful}</div>
          </Card>
          <Card level={2} className="p-4">
            <div className="text-sm text-muted-foreground">Failed</div>
            <div className="text-2xl font-bold text-red-600">{failed}</div>
          </Card>
          <Card level={2} className="p-4">
            <div className="text-sm text-muted-foreground">Missing</div>
            <div className="text-2xl font-bold text-yellow-600">{missing}</div>
          </Card>
        </div>

        {/* Actions */}
        <div className="mb-6 flex flex-wrap gap-4">
          <Button
            onClick={() => handleBulkRetry(false)}
            variant="primary"
          >
            Scrape All Teams
          </Button>
          <Button
            onClick={() => handleBulkRetry(true)}
            variant="outline"
          >
            Retry Failed Only
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card level={2} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">Team</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Last Fetched</th>
                <th className="p-4 text-left">Error</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                const hasError = item.snapshot?.fetchError !== null
                const status = item.snapshot
                  ? hasError
                    ? "error"
                    : "success"
                  : "missing"

                return (
                  <tr key={item.teamNumber} className="border-b">
                    <td className="p-4 font-mono">{item.teamNumber}</td>
                    <td className="p-4">
                      {status === "success" && (
                        <Badge variant="default" className="bg-green-600">
                          Success
                        </Badge>
                      )}
                      {status === "error" && (
                        <Badge variant="destructive">Error</Badge>
                      )}
                      {status === "missing" && (
                        <Badge variant="outline">Missing</Badge>
                      )}
                    </td>
                    <td className="p-4">
                      {item.snapshot?.title || (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {item.snapshot?.lastFetchedAt
                        ? new Date(item.snapshot.lastFetchedAt).toLocaleString()
                        : "—"}
                    </td>
                    <td className="p-4 text-sm">
                      {item.snapshot?.fetchError ? (
                        <code className="text-red-600">
                          {item.snapshot.fetchError}
                        </code>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleRetry(item.teamNumber)}
                          variant="outline"
                          size="sm"
                        >
                          Retry
                        </Button>
                        <Button
                          onClick={() =>
                            window.open(
                              `/${lang}/showcase/${item.teamNumber}`,
                              "_blank"
                            )
                          }
                          variant="ghost"
                          size="sm"
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
