"use client"

import { useState } from "react"
import { Select } from "@/components/adaptive/select"
import type { SelectOption } from "@/components/adaptive/select"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function SelectDemo() {
  const isMobile = useIsMobile()
  const { theme, mode } = useTheme()

  // 示例数据
  const [city, setCity] = useState<string>("")
  const [fruit, setFruit] = useState<string>("apple")
  const [framework, setFramework] = useState<string>("")

  const cityOptions: SelectOption[] = [
    { label: "北京", value: "beijing" },
    { label: "上海", value: "shanghai" },
    { label: "广州", value: "guangzhou" },
    { label: "深圳", value: "shenzhen" },
    { label: "杭州", value: "hangzhou" },
    { label: "成都", value: "chengdu" },
    { label: "武汉", value: "wuhan" },
    { label: "西安", value: "xian" },
  ]

  const fruitOptions: SelectOption[] = [
    { label: "🍎 苹果", value: "apple" },
    { label: "🍌 香蕉", value: "banana" },
    { label: "🍊 橙子", value: "orange" },
    { label: "🍇 葡萄", value: "grape" },
    { label: "🍓 草莓", value: "strawberry" },
    { label: "🥝 猕猴桃", value: "kiwi" },
  ]

  const frameworkOptions: SelectOption[] = [
    { label: "Next.js", value: "nextjs" },
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Nuxt", value: "nuxt" },  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">
          Select / Picker 演示 {isMobile ? "（移动端）" : "（PC端）"}
        </h1>
        <p className="text-muted-foreground">
          当前使用 {isMobile ? (
            <Badge variant="secondary">antd-mobile Picker（滚轮选择器）</Badge>
          ) : (
            <Badge variant="secondary">shadcn/ui Select（下拉菜单）</Badge>
          )}，API 完全一致
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

      {/* 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">基础用法</h2>
        <Card>
          <CardHeader>
            <CardTitle>选择城市</CardTitle>
            <CardDescription>
              {isMobile ? "点击触发滚轮选择器" : "点击打开下拉菜单"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>城市</Label>
              <Select
                value={city}
                onValueChange={setCity}
                placeholder="请选择城市"
                options={cityOptions}
              />
            </div>
            {city && (
              <p className="text-sm text-muted-foreground">
                已选择: <span className="font-semibold">{cityOptions.find(c => c.value === city)?.label}</span>
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* 默认值 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">默认值</h2>
        <Card>          <CardHeader>
            <CardTitle>选择水果</CardTitle>
            <CardDescription>默认选中 &ldquo;苹果&rdquo;</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>水果</Label>
              <Select
                value={fruit}
                onValueChange={setFruit}
                placeholder="请选择水果"
                options={fruitOptions}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              当前选择: <span className="font-semibold">{fruitOptions.find(f => f.value === fruit)?.label}</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 禁用状态 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">禁用状态</h2>
        <Card>
          <CardHeader>
            <CardTitle>禁用的选择器</CardTitle>
            <CardDescription>无法点击和选择</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>框架（禁用）</Label>
              <Select
                disabled
                placeholder="此选择器已禁用"
                options={frameworkOptions}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 表单示例 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">表单示例</h2>
        <Card>
          <CardHeader>
            <CardTitle>用户信息</CardTitle>
            <CardDescription>完整的表单场景</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>居住城市 *</Label>
                <Select
                  value={city}
                  onValueChange={setCity}
                  placeholder="请选择城市"
                  options={cityOptions}
                />
              </div>

              <div className="space-y-2">
                <Label>喜欢的水果</Label>
                <Select
                  value={fruit}
                  onValueChange={setFruit}
                  placeholder="请选择水果"
                  options={fruitOptions}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>常用框架</Label>
                <Select
                  value={framework}
                  onValueChange={setFramework}
                  placeholder="请选择框架"
                  options={frameworkOptions}
                />
              </div>
            </div>

            {(city || fruit || framework) && (
              <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
                <p className="font-semibold">已填写信息：</p>
                {city && <p className="text-sm">城市: {cityOptions.find(c => c.value === city)?.label}</p>}
                {fruit && <p className="text-sm">水果: {fruitOptions.find(f => f.value === fruit)?.label}</p>}
                {framework && <p className="text-sm">框架: {frameworkOptions.find(f => f.value === framework)?.label}</p>}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* 提示信息 */}
      <div className="p-4 bg-muted rounded-lg space-y-2">
        <p className="text-sm font-semibold">💡 体验差异：</p>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>
            <strong>PC端（≥768px）：</strong> 使用 shadcn/ui Select，下拉菜单样式
          </li>
          <li>
            <strong>移动端（&lt;768px）：</strong> 使用 antd-mobile Picker，原生滚轮选择器体验
          </li>
          <li>调整浏览器窗口大小即可看到组件自动切换</li>
        </ul>
      </div>
    </div>
  )
}
