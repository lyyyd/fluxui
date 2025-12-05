"use client"

import * as React from "react"
import { useTheme } from "./theme-provider"
import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"

/**
 * 简化的主题切换器 - 只切换亮暗模式
 */
export function ThemeSwitcher() {
  const { mode, toggleMode } = useTheme()

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
    }

    // 使用 View Transitions API 创建动画
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

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleModeToggle}
      className="h-9 w-9"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
