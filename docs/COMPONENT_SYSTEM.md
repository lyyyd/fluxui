# 统一组件系统使用指南

## 架构说明

本项目实现了 PC 和移动端统一的组件系统：

```
components/
  ├── ui/              # shadcn/ui 组件（PC 端）
  ├── mobile/          # antd-mobile 封装（移动端，API 与 shadcn 一致）
  ├── adaptive/        # 自适应组件（自动根据设备切换）
  └── theme-provider.tsx
```

## 核心特性

✅ **统一 API**：PC 和移动端使用相同的 props
✅ **统一主题**：通过 CSS 变量同步颜色、字体、间距
✅ **自动适配**：根据设备宽度自动切换组件实现
✅ **类型安全**：完整的 TypeScript 支持

## 快速开始

### 1. 在 layout.tsx 中添加 ThemeProvider

\`\`\`tsx
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
\`\`\`

### 2. 使用自适应组件

\`\`\`tsx
import { Button } from "@/components/adaptive/button"

export default function MyPage() {
  return (
    <div>
      {/* PC 使用 shadcn Button，移动端使用 antd-mobile Button */}
      <Button variant="default" size="lg">
        点击我
      </Button>
      
      <Button variant="destructive">
        危险操作
      </Button>
      
      <Button variant="outline" size="sm">
        轮廓按钮
      </Button>
    </div>
  )
}
\`\`\`

### 3. 或直接使用特定平台组件

\`\`\`tsx
// 明确使用 PC 组件
import { Button } from "@/components/ui/button"

// 明确使用移动端组件
import { Button } from "@/components/mobile/button"
\`\`\`

## 组件封装示例

### Button 组件

| Prop | 类型 | 说明 |
|------|------|------|
| variant | "default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link" | 按钮样式 |
| size | "default" \| "sm" \| "lg" \| "icon" \| "icon-sm" \| "icon-lg" | 按钮大小 |
| asChild | boolean | 作为子元素渲染（仅 PC 端支持） |

## 主题定制

编辑 `app/globals.css` 中的 CSS 变量：

\`\`\`css
:root {
  --primary: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --secondary: 210 40% 96.1%;
  /* ... */
}
\`\`\`

这些变量会自动同步到 antd-mobile！

## 添加更多组件

### 1. 封装 antd-mobile 组件

\`\`\`tsx
// components/mobile/card.tsx
import { Card as AntdCard } from "antd-mobile"
import { cn } from "@/lib/utils"

export function Card({ className, ...props }) {
  return (
    <AntdCard 
      className={cn("rounded-lg border bg-card", className)}
      {...props}
    />
  )
}
\`\`\`

### 2. 创建自适应版本

\`\`\`tsx
// components/adaptive/card.tsx
"use client"

import { useMobile } from "@/hooks/use-mobile"

export function Card(props) {
  const isMobile = useMobile()
  
  const Component = isMobile 
    ? require("@/components/mobile/card").Card
    : require("@/components/ui/card").Card
    
  return <Component {...props} />
}
\`\`\`

## 性能优化

使用动态导入减少包体积：

\`\`\`tsx
const Button = dynamic(() => 
  isMobile 
    ? import("@/components/mobile/button")
    : import("@/components/ui/button"),
  { ssr: true }
)
\`\`\`

## 最佳实践

1. ✅ 优先使用 `components/adaptive/*` 中的组件
2. ✅ 保持 PC 和移动端组件 API 一致
3. ✅ 使用 CSS 变量管理主题
4. ✅ 为移动端特有功能（如手势）单独封装
5. ❌ 避免在同一页面混用 PC 和移动端组件

## 目录结构建议

\`\`\`
components/
  ├── ui/                 # shadcn/ui 组件
  │   ├── button.tsx
  │   ├── card.tsx
  │   └── ...
  ├── mobile/             # antd-mobile 封装
  │   ├── button.tsx      # API 与 ui/button 一致
  │   ├── card.tsx
  │   └── ...
  ├── adaptive/           # 自适应组件（推荐使用）
  │   ├── button.tsx
  │   ├── card.tsx
  │   └── ...
  └── theme-provider.tsx  # 主题提供者
\`\`\`
