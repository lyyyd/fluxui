# 🎨 主题系统配置说明

## 概述

本项目使用 **OKLCH 颜色空间**统一管理主题，支持：
- ✅ **3 种主题色**：Neutral（灰）、Blue（蓝）、Purple（紫）
- ✅ **2 种模式**：Light（浅色）、Dark（深色）
- ✅ **PC 和移动端统一**：shadcn/ui 和 antd-mobile 共享颜色
- ✅ **完全自定义**：通过 CSS 变量轻松调整

## 为什么选择 OKLCH？

相比传统的 HSL/RGB：
- ✅ **感知均匀**：数值变化与人眼感知一致
- ✅ **色域更广**：支持更丰富的颜色
- ✅ **现代浏览器**：Chrome、Safari、Firefox 都已支持
- ✅ **未来趋势**：CSS Color Level 4 标准

## 主题色对照表

### Neutral (中性灰)
- **Light 模式**：
  - Primary: `oklch(0.205 0 0)` - 深灰
  - Accent: `oklch(0.97 0 0)` - 浅灰
  
- **Dark 模式**：
  - Primary: `oklch(0.922 0 0)` - 浅灰
  - Accent: `oklch(0.269 0 0)` - 深灰

### Blue (蓝色)
原 HSL: `hsl(212 100% 45%)`

- **Light 模式**：
  - Primary: `oklch(0.55 0.2 257)` - 标准蓝
  - Accent: `oklch(0.95 0.03 257)` - 浅蓝背景
  
- **Dark 模式**：
  - Primary: `oklch(0.65 0.18 257)` - 亮蓝
  - Accent: `oklch(0.25 0.05 257)` - 深蓝背景

### Purple (紫色)
原 HSL: `hsl(248.13 70.14% 56.67%)`

- **Light 模式**：
  - Primary: `oklch(0.51 0.22 281)` - 标准紫
  - Accent: `oklch(0.95 0.03 281)` - 浅紫背景
  
- **Dark 模式**：
  - Primary: `oklch(0.65 0.2 281)` - 亮紫
  - Accent: `oklch(0.25 0.05 281)` - 深紫背景

## 使用方法

### 1. 在组件中使用主题

\`\`\`tsx
import { useTheme } from "@/components/theme-provider"

export function MyComponent() {
  const { theme, mode, setTheme, toggleMode } = useTheme()
  
  return (
    <div>
      <p>当前主题: {theme}</p>
      <p>当前模式: {mode}</p>
      
      <button onClick={() => setTheme("blue")}>
        切换到蓝色
      </button>
      
      <button onClick={toggleMode}>
        切换明暗模式
      </button>
    </div>
  )
}
\`\`\`

### 2. 使用主题切换器组件

\`\`\`tsx
import { ThemeSwitcher } from "@/components/theme-switcher"

export default function Page() {
  return (
    <div>
      <ThemeSwitcher />
      {/* 其他内容 */}
    </div>
  )
}
\`\`\`

### 3. 在 CSS 中使用主题色

\`\`\`css
/* 使用 primary 主色 */
.my-button {
  background-color: oklch(var(--primary));
  color: oklch(var(--primary-foreground));
}

/* 使用 accent 强调色 */
.my-card {
  background-color: oklch(var(--accent));
  border: 1px solid oklch(var(--border));
}

/* 响应主题变化 */
.themed-element {
  /* Light 模式下是主题色，Dark 模式下自动调整 */
  background: oklch(var(--primary));
}
\`\`\`

## 自定义主题色

### 方法 1：修改 CSS 变量

编辑 `app/globals.css`：

\`\`\`css
/* 自定义绿色主题 */
:root[data-theme="green"] {
  --primary: oklch(0.6 0.2 145);        /* 绿色 */
  --primary-foreground: oklch(0.985 0 0);
  --accent: oklch(0.95 0.03 145);       /* 浅绿 */
  --accent-foreground: oklch(0.6 0.2 145);
  --ring: oklch(0.6 0.2 145);
}

.dark[data-theme="green"] {
  --primary: oklch(0.7 0.18 145);       /* 亮绿 */
  --accent: oklch(0.25 0.05 145);       /* 深绿 */
}
\`\`\`

### 方法 2：在主题配置中添加

编辑 `lib/theme.ts`：

\`\`\`typescript
export const themeColors = {
  // ...existing themes...
  green: {
    light: {
      primary: "oklch(0.6 0.2 145)",
      accent: "oklch(0.95 0.03 145)",
      ring: "oklch(0.6 0.2 145)",
    },
    dark: {
      primary: "oklch(0.7 0.18 145)",
      accent: "oklch(0.25 0.05 145)",
      ring: "oklch(0.7 0.18 145)",
    },
  },
}
\`\`\`

然后更新 ThemeSwitcher 组件。

## OKLCH 参数说明

OKLCH 格式：`oklch(L C H / A)`

- **L (Lightness)**：亮度，0-1 或 0%-100%
  - 0 = 黑色
  - 0.5 = 中等亮度
  - 1 = 白色

- **C (Chroma)**：色度/饱和度，0-0.4+
  - 0 = 无色（灰色）
  - 0.1 = 低饱和度
  - 0.3+ = 高饱和度

- **H (Hue)**：色相，0-360 度
  - 0/360 = 红色
  - 120 = 绿色
  - 240 = 蓝色
  - 285 = 紫色

- **A (Alpha)**：透明度，0-1（可选）

### 示例

\`\`\`css
/* 鲜艳的蓝色 */
oklch(0.55 0.2 257)
/*   ↑    ↑   ↑
     |    |   └─ 蓝色色相
     |    └───── 高饱和度
     └────────── 中等亮度 */

/* 柔和的灰色 */
oklch(0.7 0 0)
/*   ↑   ↑ ↑
     |   | └─ 色相（无关紧要，因为无色）
     |   └─── 无饱和度 = 灰色
     └─────── 较亮 */

/* 半透明的紫色 */
oklch(0.51 0.22 281 / 0.5)
/*                  ↑
                    └─ 50% 透明度 */
\`\`\`

## 颜色转换工具

推荐使用以下工具转换颜色：

1. **OKLCH Picker**: https://oklch.com/
2. **Colorjs.io**: https://colorjs.io/apps/convert/
3. **VS Code 扩展**: Color Highlight

## 最佳实践

1. ✅ **保持一致性**：同一主题下，保持色相(H)一致，只调整亮度(L)和饱和度(C)
2. ✅ **对比度**：确保前景色和背景色有足够对比度（WCAG AA: 4.5:1）
3. ✅ **测试双模式**：同时测试 Light 和 Dark 模式
4. ✅ **移动端测试**：确保在小屏幕上颜色依然清晰可辨

## 常见问题

### Q: 浏览器不支持 OKLCH 怎么办？
A: 现代浏览器都已支持。如需兼容旧浏览器，可以提供 HSL 回退：

\`\`\`css
.button {
  background: hsl(212 100% 45%);           /* 回退 */
  background: oklch(0.55 0.23 250);        /* 现代浏览器 */
}
\`\`\`

### Q: 如何找到合适的 OKLCH 值？
A: 使用 https://oklch.com/ 在线调色，直观预览效果

### Q: antd-mobile 组件会应用主题吗？
A: 会！所有组件都通过 CSS 变量统一主题

---

**相关文档**：
- [组件系统文档](./COMPONENT_SYSTEM.md)
- [快速开始](../QUICK_START.md)
