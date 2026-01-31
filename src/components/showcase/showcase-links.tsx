"use client"

interface ShowcaseLinksProps {
  links: unknown
  title: string
}

interface LinkItem {
  href: string
  text?: string | null
}

/**
 * Validates and renders links from unknown data.
 * Accepts links in the format: Array<{href: string; text?: string}>
 */
export function ShowcaseLinks({ links, title }: ShowcaseLinksProps) {
  // Validate and normalize links
  const normalizedLinks: LinkItem[] = []

  if (Array.isArray(links)) {
    for (const link of links) {
      if (
        link &&
        typeof link === "object" &&
        "href" in link &&
        typeof link.href === "string"
      ) {
        normalizedLinks.push({
          href: link.href,
          text: typeof link.text === "string" ? link.text : null,
        })
      }
    }
  }

  if (normalizedLinks.length === 0) {
    return null
  }

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      <ul className="space-y-2">
        {normalizedLinks.map((link) => {
          // Use href as key, or fallback to index if href is not unique
          const key = link.href
          return (
            <li key={key}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {link.text || link.href}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
