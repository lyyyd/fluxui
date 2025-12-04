"use client"

import * as React from "react"

export type ThemeColor = "neutral" | "blue" | "purple"
export type ThemeMode = "light" | "dark"

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: ThemeColor
  defaultMode?: ThemeMode
}

// 创建主题上下文
const ThemeContext = React.createContext<{
  theme: ThemeColor
  mode: ThemeMode
  setTheme: (theme: ThemeColor) => void
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
}>({
  theme: "neutral",
  mode: "light",
  setTheme: () => {},
  setMode: () => {},
  toggleMode: () => {},
})

export const useTheme = () => React.useContext(ThemeContext)

/**
 * 统一主题 Provider
 * - 支持 Neutral、Blue、Purple 三种主题色
 * - 支持 Light、Dark 模式
 * - PC 和移动端统一使用 CSS 变量
 */
export function ThemeProvider({ 
  children, 
  defaultTheme = "neutral",
  defaultMode = "light" 
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<ThemeColor>(defaultTheme)
  const [mode, setMode] = React.useState<ThemeMode>(defaultMode)
  // 应用主题到 DOM
  React.useEffect(() => {
    const root = document.documentElement
    
    // 设置主题色（所有主题都设置 data-theme 属性）
    root.setAttribute("data-theme", theme)
    
    // 设置明暗模式
    if (mode === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [theme, mode])

  const toggleMode = React.useCallback(() => {
    setMode(prev => prev === "light" ? "dark" : "light")
  }, [])

  const value = React.useMemo(() => ({
    theme,
    mode,
    setTheme,
    setMode,
    toggleMode,
  }), [theme, mode, toggleMode])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
