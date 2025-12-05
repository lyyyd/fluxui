"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { useMetaColor } from "@/hooks/use-meta-color"
import { Button } from "@/registry/new-york-v4/ui/button"

export function ModeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()
  const { setMetaColor, metaColor } = useMetaColor()
  const transitionRef = React.useRef<ViewTransition | null>(null)

  React.useEffect(() => {
    setMetaColor(metaColor)
  }, [metaColor, setMetaColor])

  const toggleTheme = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      // 如果有正在进行的过渡，跳过
      if (transitionRef.current) {
        transitionRef.current.skipTransition()
        transitionRef.current = null
      }

      const x = event.clientX
      const y = event.clientY

      // 计算从点击位置到页面最远角的距离
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )

      const newTheme = resolvedTheme === "dark" ? "light" : "dark"

      // 检查是否支持 View Transitions API
      if (!document.startViewTransition) {
        setTheme(newTheme)
        return
      }

      // 使用 View Transitions API 创建动画
      const transition = document.startViewTransition(() => {
        setTheme(newTheme)
      })

      transitionRef.current = transition

      // 等待过渡准备好后添加动画
      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ]

        document.documentElement.animate(
          {
            clipPath: clipPath,
          },
          {
            duration: 500,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        )
      })

      // 过渡完成后清理引用
      transition.finished.finally(() => {
        if (transitionRef.current === transition) {
          transitionRef.current = null
        }
      })
    },
    [resolvedTheme, setTheme]
  )

  return (
    <Button
      variant="ghost"
      size="icon"
      className="group/toggle extend-touch-target size-8"
      onClick={toggleTheme}
      title="Toggle theme"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4.5"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 3l0 18" />
        <path d="M12 9l4.65 -4.65" />
        <path d="M12 14.3l7.37 -7.37" />
        <path d="M12 19.6l8.85 -8.85" />
      </svg>
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
