"use client"

import { useState } from "react"
import { DateRange } from "react-day-picker"
import { DateRangePicker } from "@/components/adaptive/date-range-picker"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function DateRangePickerDemo() {
  const isMobile = useIsMobile()
  const { theme, mode } = useTheme()

  // 示例数据
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [vacationRange, setVacationRange] = useState<DateRange | undefined>(undefined)
  const [limitedRange, setLimitedRange] = useState<DateRange | undefined>(undefined)
  
  // 默认值示例（本月第一天到今天）
  const today = new Date()
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const [defaultRange, setDefaultRange] = useState<DateRange | undefined>({
    from: firstDayOfMonth,
    to: today,
  })

  // 日期范围限制示例（未来30天）
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const thirtyDaysLater = new Date()
  thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">
          DateRangePicker 演示 {isMobile ? "（移动端）" : "（PC端）"}
        </h1>
        <p className="text-muted-foreground">
          当前使用 {isMobile ? (
            <Badge variant="secondary">antd-mobile CalendarPicker（全屏范围选择）</Badge>
          ) : (
            <Badge variant="secondary">shadcn Calendar（双月范围选择）</Badge>
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
            <CardTitle>选择日期范围</CardTitle>
            <CardDescription>
              {isMobile ? "点击触发全屏日历范围选择" : "点击弹出双月日历，支持拖选范围"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>日期范围</Label>
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
                placeholder="请选择日期范围"
              />
            </div>
            {dateRange?.from && (
              <div className="text-sm text-muted-foreground space-y-1">
                <p>开始日期: <span className="font-semibold">{dateRange.from.toLocaleDateString("zh-CN")}</span></p>
                {dateRange.to && (
                  <>
                    <p>结束日期: <span className="font-semibold">{dateRange.to.toLocaleDateString("zh-CN")}</span></p>
                    <p>天数: <span className="font-semibold">
                      {Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1} 天
                    </span></p>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* 默认值 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">默认值</h3>
        <Card>
          <CardHeader>
            <CardTitle>本月统计</CardTitle>
            <CardDescription>默认选中本月第一天到今天</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>统计时间范围</Label>
              <DateRangePicker
                value={defaultRange}
                onChange={setDefaultRange}
                placeholder="请选择统计时间"
              />
            </div>
            {defaultRange?.from && defaultRange?.to && (
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm">
                  <span className="font-semibold">统计周期:</span> {defaultRange.from.toLocaleDateString("zh-CN")} - {defaultRange.to.toLocaleDateString("zh-CN")}
                  <br />
                  <span className="font-semibold">共计:</span> {Math.ceil((defaultRange.to.getTime() - defaultRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1} 天
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* 日期范围限制 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">日期范围限制</h3>
        <Card>
          <CardHeader>
            <CardTitle>预订时间</CardTitle>
            <CardDescription>只能选择未来 30 天内的日期</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>预订日期</Label>
              <DateRangePicker
                value={limitedRange}
                onChange={setLimitedRange}
                placeholder="请选择预订时间"
                min={tomorrow}
                max={thirtyDaysLater}
              />
            </div>
            {limitedRange?.from && limitedRange?.to && (
              <p className="text-sm text-muted-foreground">
                已选择: <span className="font-semibold">
                  {limitedRange.from.toLocaleDateString("zh-CN")} - {limitedRange.to.toLocaleDateString("zh-CN")}
                </span>
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              可选范围: {tomorrow.toLocaleDateString("zh-CN")} ~ {thirtyDaysLater.toLocaleDateString("zh-CN")}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 禁用状态 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">禁用状态</h3>
        <Card>
          <CardHeader>
            <CardTitle>禁用的日期范围选择器</CardTitle>
            <CardDescription>无法点击和选择</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>日期范围（禁用）</Label>
              <DateRangePicker
                disabled
                placeholder="此日期范围选择器已禁用"
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
            <CardTitle>请假申请</CardTitle>
            <CardDescription>完整的表单场景</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>请假时间 *</Label>
              <DateRangePicker
                value={vacationRange}
                onChange={setVacationRange}
                placeholder="请选择请假时间"
              />
            </div>

            {vacationRange?.from && vacationRange?.to && (
              <div className="rounded-lg bg-muted p-4 space-y-2">
                <p className="text-sm">
                  <span className="font-semibold">请假开始:</span> {vacationRange.from.toLocaleDateString("zh-CN", { 
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long"
                  })}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">请假结束:</span> {vacationRange.to.toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long"
                  })}
                </p>
                <p className="text-sm font-semibold text-primary">
                  共计请假: {Math.ceil((vacationRange.to.getTime() - vacationRange.from.getTime()) / (1000 * 60 * 60 * 24)) + 1} 天
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* 常见场景 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">常见使用场景</h3>
        <Card>
          <CardHeader>
            <CardTitle>应用场景</CardTitle>
            <CardDescription>日期范围选择的典型用例</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>数据统计：</strong>选择统计时间范围，查看指定周期的数据报表</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>酒店预订：</strong>选择入住和退房日期，计算住宿天数和费用</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>请假申请：</strong>选择请假开始和结束日期，自动计算请假天数</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>活动报名：</strong>限制活动日期范围，只允许选择特定时间段</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span><strong>日志筛选：</strong>选择查询时间范围，过滤系统日志</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
