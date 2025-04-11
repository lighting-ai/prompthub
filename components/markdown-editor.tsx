"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

// 动态导入编辑器以避免SSR问题
const MDEditor = dynamic(() => import("@uiw/react-md-editor").then((mod) => mod.default), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[300px]" />,
})

const MDPreview = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown
    }),
  {
    ssr: false,
    loading: () => <Skeleton className="w-full h-[300px]" />,
  },
)

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  height?: number
  preview?: "edit" | "preview" | "live"
}

export function MarkdownEditor({ value, onChange, height = 300, preview = "live" }: MarkdownEditorProps) {
  const [mounted, setMounted] = useState(false)

  // 处理客户端渲染
  useEffect(() => {
    setMounted(true)
  }, [])

  // 添加数据属性以处理暗模式
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-color-mode",
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    )

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          document.documentElement.setAttribute(
            "data-color-mode",
            document.documentElement.classList.contains("dark") ? "dark" : "light",
          )
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })
    return () => observer.disconnect()
  }, [])

  if (!mounted) {
    return <Skeleton className="w-full h-[300px]" />
  }

  return (
    <div
      className="markdown-editor"
      data-color-mode={document.documentElement.classList.contains("dark") ? "dark" : "light"}
    >
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || "")}
        height={height}
        preview={preview}
        highlightEnable={true}
        enableScroll={true}
        visibleDragbar={false}
        textareaProps={{
          placeholder: "Write your prompt here using Markdown...",
        }}
      />
    </div>
  )
}

export function MarkdownDisplay({ content }: { content: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Skeleton className="w-full h-[200px]" />
  }

  return (
    <div
      className="markdown-preview"
      data-color-mode={document.documentElement.classList.contains("dark") ? "dark" : "light"}
    >
      <MDPreview source={content} />
    </div>
  )
}
