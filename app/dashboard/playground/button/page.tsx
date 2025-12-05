"use client"

import { Button } from "@/components/adaptive/button"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTheme } from "@/components/theme-provider"

export default function ComponentDemo() {
  const isMobile = useIsMobile()
  const { theme, mode } = useTheme()

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">
          组件演示 {isMobile ? "（移动端）" : "（PC端）"}
        </h1>
        <p className="text-muted-foreground">
          当前使用 {isMobile ? "antd-mobile" : "shadcn/ui"} 组件，API 完全一致
        </p>
        <p className="text-sm text-muted-foreground">
          主题: <span className="font-semibold">{theme}</span> | 
          模式: <span className="font-semibold">{mode}</span>
        </p>
      </div>

      {/* 主题切换器 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">🎨 主题切换</h2>
        <ThemeSwitcher />
        <p className="text-sm text-muted-foreground">
          ✨ 支持 Neutral（灰）、Blue（蓝）、Purple（紫）三种主题色，Light/Dark 模式
        </p>
      </section>

      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">按钮变体</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">默认按钮</Button>
            <Button variant="destructive">危险按钮</Button>
            <Button variant="outline">轮廓按钮</Button>
            <Button variant="secondary">次要按钮</Button>
            <Button variant="ghost">幽灵按钮</Button>
            <Button variant="link">链接按钮</Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">按钮尺寸</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">小按钮</Button>
            <Button size="default">默认按钮</Button>
            <Button size="lg">大按钮</Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">禁用状态</h2>
          <div className="flex flex-wrap gap-4">
            <Button disabled>禁用按钮</Button>
            <Button variant="destructive" disabled>禁用危险按钮</Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">组合示例</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default" size="lg">
              提交表单
            </Button>
            <Button variant="outline" size="lg">
              取消
            </Button>
          </div>
        </section>
      </div>

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          💡 提示：调整浏览器窗口大小或在移动设备上查看，组件会自动切换实现方式
        </p>
      </div>
    </div>
  )
}
