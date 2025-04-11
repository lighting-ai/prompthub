"use client"

import { useEffect, useState } from "react"
import DOMPurify from "dompurify"
import { marked } from "marked"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

interface MarkdownPreviewProps {
  content: string
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const [html, setHtml] = useState("")

  useEffect(() => {
    // Configure marked renderer
    const renderer = new marked.Renderer()

    // Custom link renderer to add target="_blank" for external links
    renderer.link = (href, title, text) => {
      const isExternal = href && href.startsWith("http")
      return `<a href="${href}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ""} ${title ? `title="${title}"` : ""}>${text}</a>`
    }

    // Custom code block renderer with syntax highlighting
    renderer.code = (code, language) => {
      if (language && SyntaxHighlighter.supportedLanguages.includes(language)) {
        const highlighted = SyntaxHighlighter.highlight(code, {
          language,
          style: vscDarkPlus,
        })
        return `<div class="code-block-wrapper"><div class="code-block-header"><span>${language}</span></div>${highlighted}</div>`
      }
      return `<pre><code>${code}</code></pre>`
    }

    // Configure marked with our custom renderer
    marked.setOptions({
      renderer,
      breaks: true,
      gfm: true,
    })

    // Process the markdown
    const rawHtml = marked.parse(content || "No content to preview")

    // Sanitize the HTML to prevent XSS
    const sanitizedHtml = DOMPurify.sanitize(rawHtml)

    setHtml(sanitizedHtml)
  }, [content])

  // Process links to show as cards if they are URLs
  useEffect(() => {
    if (typeof window !== "undefined") {
      const links = document.querySelectorAll('.prose a[href^="http"]')

      links.forEach(async (link) => {
        const url = link.getAttribute("href")
        if (!url) return

        // Check if the link is already processed
        if (link.classList.contains("link-card-processed")) return

        // Mark as processed to avoid duplicate processing
        link.classList.add("link-card-processed")

        // Add external link indicator
        const icon = document.createElement("span")
        icon.innerHTML = "↗️"
        icon.className = "ml-1 text-xs"
        link.appendChild(icon)
      })
    }
  }, [html])

  return <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
}
