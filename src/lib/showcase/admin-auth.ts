/**
 * Admin authorization utilities for showcase ingestion routes.
 * 
 * Admin access is determined by:
 * 1. Environment variable ADMIN_EMAILS (comma-separated list)
 * 2. Or user is a team lead (isLead = true)
 */

import { createClient } from "@/lib/supabase/server"
import { prisma } from "@/lib/prisma"

/**
 * Checks if the current user is an admin.
 * 
 * @returns Admin status and user ID, or null if not authenticated/admin
 */
export async function checkAdminAuth(): Promise<{
  isAdmin: boolean
  userId: string
} | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  // Check environment variable for admin emails
  const adminEmails = process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || []
  if (adminEmails.length > 0 && user.email && adminEmails.includes(user.email)) {
    return { isAdmin: true, userId: user.id }
  }

  // Check if user is a team lead
  const profile = await prisma.profile.findUnique({
    where: { id: user.id },
    select: { isLead: true },
  })

  if (profile?.isLead) {
    return { isAdmin: true, userId: user.id }
  }

  return { isAdmin: false, userId: user.id }
}
