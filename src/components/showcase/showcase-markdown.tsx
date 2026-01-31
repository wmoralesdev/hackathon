"use client"

interface ShowcaseMarkdownProps {
  markdown: string
}

/**
 * Safely renders markdown as React elements.
 * Supports: headings (#, ##, ###), bold (**text**), italic (*text*), and line breaks.
 * No dangerouslySetInnerHTML - all content is rendered as React elements.
 */
export function ShowcaseMarkdown({ markdown }: ShowcaseMarkdownProps) {
  // Split by lines to handle line breaks
  const lines = markdown.split("\n")
  const elements: React.ReactNode[] = []
  let currentParagraph: React.ReactNode[] = []

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      elements.push(<p key={elements.length} className="mb-4">{currentParagraph}</p>)
      currentParagraph = []
    }
  }

  const processInline = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = []
    const remaining = text
    let key = 0

    // Process bold (**text**)
    const boldRegex = /\*\*(.*?)\*\*/g
    let lastIndex = 0
    const boldMatches: RegExpMatchArray[] = Array.from(remaining.matchAll(boldRegex))

    for (const match of boldMatches) {
      // Add text before bold
      if (match.index !== undefined && match.index > lastIndex) {
        const beforeText = remaining.slice(lastIndex, match.index)
        parts.push(...processItalic(beforeText, key))
        key += beforeText.length
      }
      // Add bold text
      if (match[1] !== undefined) {
        parts.push(<strong key={key}>{match[1]}</strong>)
        key += match[0].length
        if (match.index !== undefined) {
          lastIndex = match.index + match[0].length
        }
      }
    }

    // Add remaining text
    if (lastIndex < remaining.length) {
      const afterText = remaining.slice(lastIndex)
      parts.push(...processItalic(afterText, key))
    }

    return parts.length > 0 ? parts : [remaining]
  }

  const processItalic = (text: string, startKey: number): React.ReactNode[] => {
    const parts: React.ReactNode[] = []
    const italicRegex = /\*(.*?)\*/g
    let lastIndex = 0
    let key = startKey
    const italicMatches: RegExpMatchArray[] = Array.from(text.matchAll(italicRegex))

    for (const match of italicMatches) {
      // Add text before italic
      if (match.index !== undefined && match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }
      // Add italic text
      if (match[1] !== undefined) {
        parts.push(<em key={key}>{match[1]}</em>)
        key += match[0].length
        if (match.index !== undefined) {
          lastIndex = match.index + match[0].length
        }
      }
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts.length > 0 ? parts : [text]
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Empty line - flush paragraph
    if (line.trim() === "") {
      flushParagraph()
      continue
    }

    // H1: # Title
    if (line.startsWith("# ")) {
      flushParagraph()
      const text = line.slice(2).trim()
      elements.push(<h1 key={elements.length} className="mb-4 text-3xl font-bold">{processInline(text)}</h1>)
      continue
    }

    // H2: ## Title
    if (line.startsWith("## ")) {
      flushParagraph()
      const text = line.slice(3).trim()
      elements.push(<h2 key={elements.length} className="mb-3 text-2xl font-semibold">{processInline(text)}</h2>)
      continue
    }

    // H3: ### Title
    if (line.startsWith("### ")) {
      flushParagraph()
      const text = line.slice(4).trim()
      elements.push(<h3 key={elements.length} className="mb-2 text-xl font-semibold">{processInline(text)}</h3>)
      continue
    }

    // Regular line - add to current paragraph
    currentParagraph.push(...processInline(line))
    currentParagraph.push(<br key={`br-${i}`} />)
  }

  // Flush any remaining paragraph
  flushParagraph()

  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      {elements}
    </div>
  )
}
