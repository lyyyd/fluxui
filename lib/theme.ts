/**
 * 统一主题配置
 * 使用 OKLCH 颜色空间，支持三种主题色
 */

export type ThemeColor = "neutral" | "blue" | "purple"
export type ThemeMode = "light" | "dark"

/**
 * 主题颜色定义
 */
export const themeColors = {
  neutral: {
    light: {
      primary: "oklch(0.205 0 0)",           // 深灰
      accent: "oklch(0.97 0 0)",             // 浅灰
      ring: "oklch(0.708 0 0)",              // 中灰
    },
    dark: {
      primary: "oklch(0.922 0 0)",           // 浅灰
      accent: "oklch(0.269 0 0)",            // 深灰
      ring: "oklch(0.556 0 0)",              // 中灰
    },
  },
  blue: {
    light: {
      primary: "oklch(0.55 0.2 257)",       // 蓝色 (hsl(212 100% 45%))
      accent: "oklch(0.95 0.03 257)",       // 浅蓝
      ring: "oklch(0.55 0.2 257)",          // 蓝色
    },
    dark: {
      primary: "oklch(0.65 0.18 257)",      // 亮蓝
      accent: "oklch(0.25 0.05 257)",       // 深蓝
      ring: "oklch(0.65 0.18 257)",         // 亮蓝
    },
  },
  purple: {
    light: {
      primary: "oklch(0.51 0.22 281)",      // 紫色 (hsl(248.13 70.14% 56.67%))
      accent: "oklch(0.95 0.03 281)",       // 浅紫
      ring: "oklch(0.51 0.22 281)",         // 紫色
    },
    dark: {
      primary: "oklch(0.65 0.2 281)",       // 亮紫
      accent: "oklch(0.25 0.05 281)",       // 深紫
      ring: "oklch(0.65 0.2 281)",          // 亮紫
    },
  },
} as const

/**
 * 通用主题配置
 */
export const themeConfig = {
  // 圆角
  radius: {
    sm: "0.375rem",   // 6px
    md: "0.5rem",     // 8px
    lg: "0.75rem",    // 12px
    xl: "1rem",       // 16px
  },
  
  // 字体大小
  fontSize: {
    xs: "0.75rem",    // 12px
    sm: "0.875rem",   // 14px
    base: "1rem",     // 16px
    lg: "1.125rem",   // 18px
    xl: "1.25rem",    // 20px
  },
  
  // 间距
  spacing: {
    xs: "0.5rem",     // 8px
    sm: "0.75rem",    // 12px
    md: "1rem",       // 16px
    lg: "1.5rem",     // 24px
    xl: "2rem",       // 32px
  },
}

/**
 * 获取指定主题的 CSS 变量
 */
export function getThemeVars(color: ThemeColor, mode: ThemeMode) {
  const colors = themeColors[color][mode]
  
  return {
    '--color-primary': colors.primary,
    '--color-accent': colors.accent,
    '--color-ring': colors.ring,
  }
}
