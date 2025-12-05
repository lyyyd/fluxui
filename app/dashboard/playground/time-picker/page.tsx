"use client"

import { useState } from "react"
import { TimePicker } from "@/components/adaptive/time-picker"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTheme } from "@/components/theme-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function TimePickerDemo() {
  const isMobile = useIsMobile()
  const { theme, mode } = useTheme()

  // 示例数据
  const [startTime, setStartTime] = useState<string | null>(null)
  const [endTime, setEndTime] = useState<string | null>(null)
  const [appointmentTime, setAppointmentTime] = useState<string | null>("14:00")
  const [workTime, setWorkTime] = useState<string | null>(null)
  const [meetingTime, setMeetingTime] = useState<string | null>(null)
  const [preciseTime, setPreciseTime] = useState<string | null>(null)
  const [preciseTimeWithStep, setPreciseTimeWithStep] = useState<string | null>("14:30:15")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">
          TimePicker 演示 {isMobile ? "（移动端）" : "（PC端）"}
        </h1>
        <p className="text-muted-foreground">
          当前使用 {isMobile ? (
            <Badge variant="secondary">antd-mobile Picker（滚轮时间选择器）</Badge>
          ) : (
            <Badge variant="secondary">Popover + 滚动列表（自定义时间选择器）</Badge>
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
            <CardTitle>选择时间</CardTitle>
            <CardDescription>
              {isMobile ? "点击触发滚轮时间选择器" : "点击弹出时间选择面板"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>开始时间</Label>
              <TimePicker
                value={startTime}
                onChange={setStartTime}
                placeholder="请选择时间"
              />
            </div>
            {startTime && (
              <p className="text-sm text-muted-foreground">
                已选择: <span className="font-semibold">{startTime}</span>
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
            <CardTitle>选择预约时间</CardTitle>
            <CardDescription>默认选中 14:00</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>预约时间</Label>
              <TimePicker
                value={appointmentTime}
                onChange={setAppointmentTime}
                placeholder="请选择预约时间"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              当前选择: <span className="font-semibold">{appointmentTime || "未选择"}</span>
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 时间范围限制 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">时间范围限制</h3>
        <Card>
          <CardHeader>
            <CardTitle>工作时间</CardTitle>
            <CardDescription>只能选择 9:00 - 18:00 的时间</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>工作时间</Label>
              <TimePicker
                value={workTime}
                onChange={setWorkTime}
                placeholder="请选择工作时间"
                minHour={9}
                maxHour={18}
              />
            </div>
            {workTime && (
              <p className="text-sm text-muted-foreground">
                已选择: <span className="font-semibold">{workTime}</span>
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              可选时间范围: 09:00 ~ 18:00
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 分钟步长 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">分钟步长</h3>
        <Card>
          <CardHeader>
            <CardTitle>会议时间</CardTitle>
            <CardDescription>以 30 分钟为间隔选择时间</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>会议时间</Label>
              <TimePicker
                value={meetingTime}
                onChange={setMeetingTime}
                placeholder="请选择会议时间"
                minuteStep={30}
              />
            </div>
            {meetingTime && (
              <p className="text-sm text-muted-foreground">
                已选择: <span className="font-semibold">{meetingTime}</span>
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              可选时间: 00:00, 00:30, 01:00, 01:30 ... 23:00, 23:30
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 时分秒选择 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">时分秒选择</h3>
        <Card>
          <CardHeader>
            <CardTitle>精确时间选择</CardTitle>
            <CardDescription>支持选择小时、分钟和秒</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>精确时间（HH:mm:ss）</Label>
              <TimePicker
                value={preciseTime}
                onChange={setPreciseTime}
                placeholder="请选择精确时间"
                showSecond
              />
            </div>
            {preciseTime && (
              <p className="text-sm text-muted-foreground">
                已选择: <span className="font-semibold">{preciseTime}</span>
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              格式: HH:mm:ss (24小时制，包含秒)
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 时分秒 + 步长 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">时分秒 + 自定义步长</h3>
        <Card>
          <CardHeader>
            <CardTitle>精确时间选择（带步长）</CardTitle>
            <CardDescription>分钟间隔 5 分钟，秒间隔 5 秒</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>精确时间</Label>
              <TimePicker
                value={preciseTimeWithStep}
                onChange={setPreciseTimeWithStep}
                placeholder="请选择精确时间"
                showSecond
                minuteStep={5}
                secondStep={5}
              />
            </div>
            {preciseTimeWithStep && (
              <p className="text-sm text-muted-foreground">
                已选择: <span className="font-semibold">{preciseTimeWithStep}</span>
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              分钟步长: 5 分钟 (00, 05, 10, 15 ...)
              <br />
              秒步长: 5 秒 (00, 05, 10, 15 ...)
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 禁用状态 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">禁用状态</h3>
        <Card>
          <CardHeader>
            <CardTitle>禁用的时间选择器</CardTitle>
            <CardDescription>无法点击和选择</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>时间（禁用）</Label>
              <TimePicker
                disabled
                placeholder="此时间选择器已禁用"
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
            <CardTitle>日程安排</CardTitle>
            <CardDescription>完整的表单场景</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>开始时间 *</Label>
                <TimePicker
                  value={startTime}
                  onChange={setStartTime}
                  placeholder="请选择开始时间"
                />
              </div>

              <div className="space-y-2">
                <Label>结束时间 *</Label>
                <TimePicker
                  value={endTime}
                  onChange={setEndTime}
                  placeholder="请选择结束时间"
                />
              </div>
            </div>

            {startTime && endTime && (
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm">
                  <span className="font-semibold">日程时间:</span> {startTime} - {endTime}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
