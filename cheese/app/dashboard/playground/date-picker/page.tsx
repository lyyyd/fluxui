"use client"

import { useState } from "react"
import { DatePicker } from "@/components/adaptive/date-picker"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function DatePickerDemo() {
  const isMobile = useIsMobile()
  const { theme, mode } = useTheme()

  // 示例数据
  const [birthday, setBirthday] = useState<Date | null>(null)
  const [startDate, setStartDate] = useState<Date | null>(new Date())
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null)
  // 日期范围限制
  const today = new Date()
  const futureDate = new Date()
  futureDate.setDate(today.getDate() + 30) // 未来30天

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">
          DatePicker / CalendarPicker 演示 {isMobile ? "（移动端）" : "（PC端）"}
        </h1>
        <p className="text-muted-foreground">
          当前使用 {isMobile ? (
            <Badge variant="secondary">antd-mobile CalendarPicker（全屏日历）</Badge>
          ) : (
            <Badge variant="secondary">shadcn/ui Calendar + Popover（下拉日历）</Badge>
          )}，API 完全一致
        </p>
        <p className="text-sm text-muted-foreground">
          主题: <span className="font-semibold">{theme}</span> | 
          模式: <span className="font-semibold">{mode}</span>
        </p>
      </div>

      {/* 主题切换器 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">🎨 主题切换</h3>
        <ThemeSwitcher />
        <p className="text-sm text-muted-foreground">
          ✨ 支持 Neutral（灰）、Blue（蓝）、Purple（紫）三种主题色，Light/Dark 模式
        </p>
      </section>

      {/* 基础用法 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">基础用法</h3>
        <Card>
          <CardHeader>
            <CardTitle>选择生日</CardTitle>
            <CardDescription>
              {isMobile ? "点击触发全屏日历选择器" : "点击打开下拉日历"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>生日</Label>
              <DatePicker
                value={birthday}
                onChange={setBirthday}
                placeholder="请选择生日"
                max={today}
              />
            </div>
            {birthday && (
              <p className="text-sm text-muted-foreground">
                已选择: <span className="font-semibold">{birthday.toLocaleDateString("zh-CN")}</span>
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* 默认值 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">默认值</h3>
        <Card>
          <CardHeader>
            <CardTitle>选择开始日期</CardTitle>
            <CardDescription>默认选中今天</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>开始日期</Label>
              <DatePicker
                value={startDate}
                onChange={setStartDate}
                placeholder="请选择开始日期"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              当前选择: <span className="font-semibold">
                {startDate?.toLocaleDateString("zh-CN") || "未选择"}
              </span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 日期范围限制 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">日期范围限制</h3>
        <Card>
          <CardHeader>
            <CardTitle>预约日期</CardTitle>
            <CardDescription>只能选择未来30天内的日期</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>预约日期</Label>
              <DatePicker
                value={appointmentDate}
                onChange={setAppointmentDate}
                placeholder="请选择预约日期"
                min={today}
                max={futureDate}
              />
            </div>
            {appointmentDate && (
              <p className="text-sm text-muted-foreground">
                已选择: <span className="font-semibold">
                  {appointmentDate.toLocaleDateString("zh-CN")}
                </span>
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              可选范围: {today.toLocaleDateString("zh-CN")} ~ {futureDate.toLocaleDateString("zh-CN")}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 禁用状态 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">禁用状态</h3>
        <Card>
          <CardHeader>
            <CardTitle>禁用的日期选择器</CardTitle>
            <CardDescription>无法点击和选择</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>日期（禁用）</Label>
              <DatePicker
                disabled
                placeholder="此日期选择器已禁用"
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 表单示例 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">表单示例</h3>
        <Card>
          <CardHeader>
            <CardTitle>活动信息</CardTitle>
            <CardDescription>完整的表单场景</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>开始日期 *</Label>
                <DatePicker
                  value={startDate}
                  onChange={setStartDate}
                  placeholder="请选择开始日期"
                />
              </div>

              <div className="space-y-2">
                <Label>结束日期</Label>
                <DatePicker
                  value={endDate}
                  onChange={setEndDate}
                  placeholder="请选择结束日期"
                  min={startDate || undefined}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>预约日期</Label>
                <DatePicker
                  value={appointmentDate}
                  onChange={setAppointmentDate}
                  placeholder="请选择预约日期"
                  min={today}
                  max={futureDate}
                />
              </div>
            </div>

            {(startDate || endDate || appointmentDate) && (
              <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
                <p className="font-semibold">已填写信息：</p>
                {startDate && (
                  <p className="text-sm">开始日期: {startDate.toLocaleDateString("zh-CN")}</p>
                )}
                {endDate && (
                  <p className="text-sm">结束日期: {endDate.toLocaleDateString("zh-CN")}</p>
                )}
                {appointmentDate && (
                  <p className="text-sm">预约日期: {appointmentDate.toLocaleDateString("zh-CN")}</p>
                )}
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
            <strong>PC端（≥768px）：</strong> 使用 shadcn/ui Calendar，下拉日历选择器
          </li>
          <li>
            <strong>移动端（&lt;768px）：</strong> 使用 antd-mobile CalendarPicker，全屏日历体验
          </li>
          <li>支持日期范围限制（min/max）和禁用状态</li>
          <li>调整浏览器窗口大小即可看到组件自动切换</li>
        </ul>
      </div>
    </div>
  )
}
