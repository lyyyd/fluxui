"use client"

import { useState } from "react"
import { DateTimeRangePicker, DateTimeRange } from "@/components/adaptive/datetime-range-picker"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTheme } from "@/components/theme-provider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { CalendarClock, Clock, Calendar, Zap } from "lucide-react"

export default function DateTimeRangePickerPage() {
  const isMobile = useIsMobile()
  const { theme, mode } = useTheme()
  
  const [basicRange, setBasicRange] = useState<DateTimeRange | undefined>(undefined)
  
  // 默认值：最近7天
  const [defaultRange, setDefaultRange] = useState<DateTimeRange | undefined>(() => {
    const today = new Date()
    const sevenDaysAgo = new Date(today)
    sevenDaysAgo.setDate(today.getDate() - 7)
    sevenDaysAgo.setHours(0, 0, 0)
    today.setHours(23, 59, 59)
    return { from: sevenDaysAgo, to: today }
  })
  
  // 时分秒选择
  const [secondRange, setSecondRange] = useState<DateTimeRange | undefined>(undefined)
  
  // 限制范围
  const [limitedRange, setLimitedRange] = useState<DateTimeRange | undefined>(undefined)
  const minDate = new Date()
  minDate.setDate(minDate.getDate() - 30) // 只能选择最近30天
  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + 7) // 最多到未来7天
  
  // 禁用状态
  const [disabledRange, setDisabledRange] = useState<DateTimeRange | undefined>({
    from: new Date(2024, 0, 1, 9, 0),
    to: new Date(2024, 0, 7, 18, 0)
  })
  
  // 表单示例
  const [formRange, setFormRange] = useState<DateTimeRange | undefined>(undefined)
  const [submitted, setSubmitted] = useState(false)

  // 格式化日期时间范围
  const formatRange = (range: DateTimeRange | undefined, withSeconds = false) => {
    if (!range?.from || !range?.to) return "未选择"
    const formatStr = withSeconds ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd HH:mm"
    return `${format(range.from, formatStr, { locale: zhCN })} - ${format(range.to, formatStr, { locale: zhCN })}`
  }

  // 计算时间差
  const calculateDuration = (range: DateTimeRange | undefined) => {
    if (!range?.from || !range?.to) return null
    const diff = range.to.getTime() - range.from.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return { days, hours, minutes, total: diff }
  }

  // 快捷选择
  const handleQuickSelect = (type: 'today' | 'yesterday' | 'week' | 'month') => {
    const now = new Date()
    const from = new Date()
    const to = new Date()

    switch (type) {
      case 'today':
        from.setHours(0, 0, 0)
        to.setHours(23, 59, 59)
        break
      case 'yesterday':
        from.setDate(now.getDate() - 1)
        from.setHours(0, 0, 0)
        to.setDate(now.getDate() - 1)
        to.setHours(23, 59, 59)
        break
      case 'week':
        from.setDate(now.getDate() - 7)
        from.setHours(0, 0, 0)
        to.setHours(23, 59, 59)
        break
      case 'month':
        from.setDate(now.getDate() - 30)
        from.setHours(0, 0, 0)
        to.setHours(23, 59, 59)
        break
    }

    setBasicRange({ from, to })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    
    // 模拟提交
    setTimeout(() => {
      setSubmitted(false)
      alert(`提交成功！\n开始: ${formRange?.from?.toLocaleString()}\n结束: ${formRange?.to?.toLocaleString()}`)
    }, 1000)
  }
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <CalendarClock className="h-8 w-8" />
          日期时间范围选择器 DateTimeRangePicker {isMobile ? "（移动端）" : "（PC端）"}
        </h1>
        <p className="text-muted-foreground">
          选择日期时间范围的组件，支持年月日时分秒。
          {isMobile ? (
            <Badge variant="secondary" className="ml-2">移动端分步骤选择</Badge>
          ) : (
            <Badge variant="secondary" className="ml-2">PC端双月日历 + 时间选择</Badge>
          )}
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

      <div className="grid gap-6 md:grid-cols-2">
        {/* 基础用法 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              基础用法
            </CardTitle>
            <CardDescription>最简单的日期时间范围选择</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>选择日期时间范围（时分）</Label>
              <DateTimeRangePicker
                value={basicRange}
                onChange={setBasicRange}
                placeholder="请选择日期时间范围"
              />
            </div>
            {basicRange?.from && basicRange?.to && (
              <div className="space-y-2 rounded-lg bg-muted p-4">
                <div className="text-sm font-medium">选择结果：</div>
                <div className="text-sm text-muted-foreground">
                  {formatRange(basicRange)}
                </div>
                {(() => {
                  const duration = calculateDuration(basicRange)
                  if (duration) {
                    return (
                      <div className="text-sm text-muted-foreground">
                        时长：{duration.days > 0 && `${duration.days}天 `}
                        {duration.hours}小时 {duration.minutes}分钟
                      </div>
                    )
                  }
                  return null
                })()}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickSelect('today')}
              >
                今天
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickSelect('yesterday')}
              >
                昨天
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickSelect('week')}
              >
                最近7天
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuickSelect('month')}
              >
                最近30天
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 默认值 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5" />
              默认值
            </CardTitle>
            <CardDescription>设置初始日期时间范围（最近7天）</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>默认最近7天</Label>
              <DateTimeRangePicker
                value={defaultRange}
                onChange={setDefaultRange}
                placeholder="请选择日期时间范围"
              />
            </div>
            {defaultRange?.from && defaultRange?.to && (
              <div className="space-y-2 rounded-lg bg-muted p-4">
                <div className="text-sm font-medium">当前值：</div>
                <div className="text-sm text-muted-foreground">
                  {formatRange(defaultRange)}
                </div>
              </div>
            )}
            <Button
              variant="outline"
              onClick={() => setDefaultRange(undefined)}
              className="w-full"
            >
              清空选择
            </Button>
          </CardContent>
        </Card>

        {/* 时分秒选择 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              时分秒选择
            </CardTitle>
            <CardDescription>包含秒的精确时间范围选择</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>选择日期时间范围（时分秒）</Label>
              <DateTimeRangePicker
                value={secondRange}
                onChange={setSecondRange}
                placeholder="请选择精确的日期时间范围"
                showSecond
              />
            </div>
            {secondRange?.from && secondRange?.to && (
              <div className="space-y-2 rounded-lg bg-muted p-4">
                <div className="text-sm font-medium">选择结果：</div>
                <div className="text-sm text-muted-foreground">
                  {formatRange(secondRange, true)}
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">
                    开始: {format(secondRange.from, "HH:mm:ss")}
                  </Badge>
                  <Badge variant="secondary">
                    结束: {format(secondRange.to, "HH:mm:ss")}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 限制范围 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              限制范围
            </CardTitle>
            <CardDescription>只能选择最近30天到未来7天</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>受限的日期时间范围</Label>
              <DateTimeRangePicker
                value={limitedRange}
                onChange={setLimitedRange}
                placeholder="只能选择指定范围"
                min={minDate}
                max={maxDate}
              />
            </div>
            <div className="rounded-lg bg-muted p-4 text-sm">
              <div className="font-medium mb-2">可选范围：</div>
              <div className="text-muted-foreground">
                最早：{format(minDate, "yyyy-MM-dd", { locale: zhCN })}
              </div>
              <div className="text-muted-foreground">
                最晚：{format(maxDate, "yyyy-MM-dd", { locale: zhCN })}
              </div>
            </div>
            {limitedRange?.from && limitedRange?.to && (
              <div className="space-y-2 rounded-lg bg-primary/10 p-4">
                <div className="text-sm font-medium">已选择：</div>
                <div className="text-sm text-muted-foreground">
                  {formatRange(limitedRange)}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 禁用状态 */}
        <Card>
          <CardHeader>
            <CardTitle>禁用状态</CardTitle>
            <CardDescription>不可编辑的日期时间范围</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>禁用的日期时间选择器</Label>
              <DateTimeRangePicker
                value={disabledRange}
                onChange={setDisabledRange}
                disabled
              />
            </div>
            <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
              此选择器处于禁用状态，无法进行选择操作
            </div>
          </CardContent>
        </Card>

        {/* 表单示例 */}
        <Card>
          <CardHeader>
            <CardTitle>表单集成</CardTitle>
            <CardDescription>在表单中使用日期时间范围选择器</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="activity-period">活动时间段</Label>
                <DateTimeRangePicker
                  value={formRange}
                  onChange={setFormRange}
                  placeholder="请选择活动时间段"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={!formRange?.from || !formRange?.to || submitted}
              >
                {submitted ? "提交中..." : "提交"}
              </Button>

              {formRange?.from && formRange?.to && (
                <div className="rounded-lg bg-muted p-4 text-sm">
                  <div className="font-medium mb-2">将要提交：</div>
                  <div className="text-muted-foreground space-y-1">
                    <div>开始时间：{format(formRange.from, "yyyy-MM-dd HH:mm", { locale: zhCN })}</div>
                    <div>结束时间：{format(formRange.to, "yyyy-MM-dd HH:mm", { locale: zhCN })}</div>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      {/* 使用说明 */}
      <Card>
        <CardHeader>
          <CardTitle>使用说明</CardTitle>
          <CardDescription>DateTimeRangePicker 组件的特性和用法</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">📱 响应式设计</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li><strong>PC 端</strong>：双月日历展示，选择范围后显示开始/结束时间选择器，有确认/取消按钮</li>
              <li><strong>移动端</strong>：分步骤选择，先选日期范围 → 选开始时间 → 选结束时间，每步独立确认</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">⚙️ 主要属性</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div><Badge variant="outline" className="mr-2">value</Badge>当前选中的日期时间范围</div>
              <div><Badge variant="outline" className="mr-2">onChange</Badge>值改变时的回调函数</div>
              <div><Badge variant="outline" className="mr-2">showSecond</Badge>是否显示秒（默认只显示时分）</div>
              <div><Badge variant="outline" className="mr-2">min / max</Badge>可选择的最小/最大日期</div>
              <div><Badge variant="outline" className="mr-2">disabled</Badge>是否禁用</div>
              <div><Badge variant="outline" className="mr-2">placeholder</Badge>占位提示文字</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">🎯 常见场景</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li><strong>活动时间</strong>：设置活动的开始和结束日期时间</li>
              <li><strong>数据查询</strong>：选择数据统计的时间范围（精确到时分或时分秒）</li>
              <li><strong>日程安排</strong>：预定会议室、排班等需要精确时间段的场景</li>
              <li><strong>日志查看</strong>：查看特定时间段内的系统日志</li>
              <li><strong>报表导出</strong>：选择需要导出报表的时间范围</li>
            </ul>
          </div>          <div>
            <h3 className="font-semibold mb-2">💡 交互说明</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>PC 端选择完日期范围后，会自动显示时间选择器</li>
              <li>只有同时选择了开始和结束时间，才能点击&ldquo;确定&rdquo;按钮</li>
              <li>点击&ldquo;取消&rdquo;会关闭弹窗，不保存更改</li>
              <li>移动端采用分步骤向导式交互，体验更友好</li>
              <li>支持通过快捷按钮快速选择常用时间范围</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">📝 代码示例</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
{`import { DateTimeRangePicker } from "@/components/adaptive/datetime-range-picker"

// 基础用法
<DateTimeRangePicker
  value={range}
  onChange={setRange}
  placeholder="请选择日期时间范围"
/>

// 显示秒
<DateTimeRangePicker
  value={range}
  onChange={setRange}
  showSecond
/>

// 限制范围
<DateTimeRangePicker
  value={range}
  onChange={setRange}
  min={minDate}
  max={maxDate}
/>`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
