"use client"

import * as React from "react"
import { useTheme, type ThemeColor } from "./theme-provider"
import { Button } from "./adaptive/button"

/**
 * 主题切换器组件
 * - 切换主题色：Neutral、Blue、Purple
 * - 切换明暗模式
 */
export function ThemeSwitcher() {
  const { theme, mode, setTheme, toggleMode } = useTheme()

  // 带动效的模式切换
  const handleModeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const x = event.clientX
    const y = event.clientY
    
    // 计算从点击位置到页面最远角的距离
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    // 检查是否支持 View Transitions API
    if (!document.startViewTransition) {
      toggleMode()
      return
    }    // 使用 View Transitions API 创建动画
    const transition = document.startViewTransition(() => {
      toggleMode()
    })

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
  }
  const themes: { value: ThemeColor; label: string; color: string }[] = [
    { value: "neutral", label: "中性灰", color: "oklch(0.205 0 0)" },
    { value: "blue", label: "蓝色", color: "oklch(0.55 0.2 257)" },
    { value: "purple", label: "紫色", color: "oklch(0.51 0.22 281)" },
  ]
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg border bg-card">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">主题色:</span>
        <div className="flex gap-2">
          {themes.map((t) => (
            <button
              key={t.value}
              onClick={() => setTheme(t.value)}
              className="relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent"
            >
              <span 
                className="inline-block w-3 h-3 rounded-full" 
                style={{ backgroundColor: t.color }}
              />
              <span>{t.label}</span>
              {theme === t.value && (
                <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="h-6 w-px bg-border" />
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">模式:</span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleModeToggle}
        >
          {mode === "light" ? "🌞 浅色" : "🌙 深色"}
        </Button>
      </div>
    </div>
  )
}
