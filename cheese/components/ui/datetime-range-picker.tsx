"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format, parse, isValid } from "date-fns"
import { zhCN } from "date-fns/locale"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DesktopTimePicker } from "@/components/ui/time-picker"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export interface DateTimeRange {
  from?: Date
  to?: Date
}

export interface DesktopDateTimeRangePickerProps {
  value?: DateTimeRange
  onChange?: (range: DateTimeRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  min?: Date
  max?: Date
  showSecond?: boolean
  className?: string
}

export function DesktopDateTimeRangePicker({
  value,
  onChange,
  placeholder = "请选择日期时间范围",
  disabled = false,
  min,
  max,
  showSecond = false,
  className,
}: DesktopDateTimeRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    value ? { from: value.from, to: value.to } : undefined
  )
  const [startTime, setStartTime] = React.useState<string | null>(
    value?.from ? format(value.from, showSecond ? "HH:mm:ss" : "HH:mm") : null
  )
  const [endTime, setEndTime] = React.useState<string | null>(
    value?.to ? format(value.to, showSecond ? "HH:mm:ss" : "HH:mm") : null
  )

  // 手动输入的日期时间字符串
  const [startDateTimeInput, setStartDateTimeInput] = React.useState<string>(
    value?.from ? format(value.from, showSecond ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd HH:mm") : ""
  )
  const [endDateTimeInput, setEndDateTimeInput] = React.useState<string>(
    value?.to ? format(value.to, showSecond ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd HH:mm") : ""
  )

  // 合并日期和时间
  const combineDateTime = (date: Date | undefined, time: string | null): Date | undefined => {
    if (!date) return undefined
    if (!time) return date

    const [hours, minutes, seconds] = time.split(":").map(Number)
    const newDate = new Date(date)
    newDate.setHours(hours || 0)
    newDate.setMinutes(minutes || 0)
    newDate.setSeconds(seconds || 0)
    return newDate
  }
  // 当日历选择范围变化时，初始化时间（如果还没有设置）
  React.useEffect(() => {
    if (dateRange?.from && !startTime) {
      // 默认设置为 00:00:00
      const defaultTime = showSecond ? "00:00:00" : "00:00"
      setStartTime(defaultTime)
    }
  }, [dateRange?.from, startTime, showSecond])

  React.useEffect(() => {
    if (dateRange?.to && !endTime) {
      // 默认设置为 23:59:59 或 23:59
      const defaultTime = showSecond ? "23:59:59" : "23:59"
      setEndTime(defaultTime)
    }
  }, [dateRange?.to, endTime, showSecond])

  // 当日历或时间选择器变化时，同步更新输入框
  React.useEffect(() => {
    if (dateRange?.from && startTime) {
      const combined = combineDateTime(dateRange.from, startTime)
      if (combined) {
        setStartDateTimeInput(format(combined, showSecond ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd HH:mm"))
      }
    }
  }, [dateRange?.from, startTime, showSecond])

  React.useEffect(() => {
    if (dateRange?.to && endTime) {
      const combined = combineDateTime(dateRange.to, endTime)
      if (combined) {
        setEndDateTimeInput(format(combined, showSecond ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd HH:mm"))
      }
    }
  }, [dateRange?.to, endTime, showSecond])

  const formatDateTimeRange = (range: DateTimeRange | undefined) => {
    if (!range?.from) return placeholder
    
    const formatStr = showSecond ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd HH:mm"
    
    if (!range.to) {
      return format(range.from, formatStr, { locale: zhCN })
    }

    return `${format(range.from, formatStr, { locale: zhCN })} - ${format(range.to, formatStr, { locale: zhCN })}`
  }
  // 处理手动输入的开始日期时间
  const handleStartDateTimeInputChange = (inputValue: string) => {
    setStartDateTimeInput(inputValue)
  }

  // 处理开始日期时间输入框失去焦点
  const handleStartDateTimeInputBlur = () => {
    const formatStr = showSecond ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd HH:mm"
    const parsedDate = parse(startDateTimeInput, formatStr, new Date())
    
    if (isValid(parsedDate)) {
      // 格式正确，更新日期范围和时间
      setDateRange(prev => ({ from: parsedDate, to: prev?.to }))
      setStartTime(format(parsedDate, showSecond ? "HH:mm:ss" : "HH:mm"))
    } else {
      // 格式错误，恢复原值
      if (dateRange?.from && startTime) {
        const combined = combineDateTime(dateRange.from, startTime)
        if (combined) {
          setStartDateTimeInput(format(combined, showSecond ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd HH:mm"))
        }
      } else {
        setStartDateTimeInput("")
      }
    }
  }

  // 处理手动输入的结束日期时间
  const handleEndDateTimeInputChange = (inputValue: string) => {
    setEndDateTimeInput(inputValue)
  }

  // 处理结束日期时间输入框失去焦点
  const handleEndDateTimeInputBlur = () => {
    const formatStr = showSecond ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd HH:mm"
    const parsedDate = parse(endDateTimeInput, formatStr, new Date())
    
    if (isValid(parsedDate)) {
      // 格式正确，更新日期范围和时间
      setDateRange(prev => ({ from: prev?.from, to: parsedDate }))
      setEndTime(format(parsedDate, showSecond ? "HH:mm:ss" : "HH:mm"))
    } else {
      // 格式错误，恢复原值
      if (dateRange?.to && endTime) {
        const combined = combineDateTime(dateRange.to, endTime)
        if (combined) {
          setEndDateTimeInput(format(combined, showSecond ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd HH:mm"))
        }
      } else {
        setEndDateTimeInput("")
      }
    }
  }

  // 处理确认
  const handleConfirm = () => {
    if (dateRange?.from && dateRange?.to && startTime && endTime) {
      const fromDateTime = combineDateTime(dateRange.from, startTime)
      const toDateTime = combineDateTime(dateRange.to, endTime)
      
      onChange?.({
        from: fromDateTime,
        to: toDateTime,
      })
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value?.from && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDateTimeRange(value)}
        </Button>
      </PopoverTrigger>      <PopoverContent className="w-auto p-0" align="start">
        <div className="space-y-4 p-4">          {/* 日历选择 */}
          <div className="flex justify-center">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              disabled={(date) => {
                if (min && date < min) return true
                if (max && date > max) return true
                return false
              }}
              initialFocus
              numberOfMonths={2}
              pagedNavigation
              showOutsideDays={false}
            />
          </div>{/* 时间选择 */}
          {dateRange?.from && dateRange?.to && (
            <div className="space-y-3 border-t pt-4">
              {/* 标签和输入框区域（居中） */}
              <div className="flex flex-col items-center space-y-3">
                {/* 标签行 */}
                <div className="flex gap-4">
                  <Label className="text-sm font-medium w-[280px]">开始时间</Label>
                  <Label className="text-sm font-medium w-[280px]">结束时间</Label>
                </div>
                
                {/* 输入框和选择器行 */}
                <div className="flex gap-4">
                  {/* 开始日期时间 */}
                  <div className="flex gap-2 w-[280px]">
                    <Input
                      value={startDateTimeInput}
                      onChange={(e) => handleStartDateTimeInputChange(e.target.value)}
                      onBlur={handleStartDateTimeInputBlur}
                      placeholder={showSecond ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd HH:mm"}
                      className="flex-1 font-mono text-sm"
                    />
                    <DesktopTimePicker
                      value={startTime}
                      onChange={setStartTime}
                      placeholder="HH:mm"
                      showSecond={showSecond}
                      className="w-[100px]"
                    />
                  </div>

                  {/* 结束日期时间 */}
                  <div className="flex gap-2 w-[280px]">
                    <Input
                      value={endDateTimeInput}
                      onChange={(e) => handleEndDateTimeInputChange(e.target.value)}
                      onBlur={handleEndDateTimeInputBlur}
                      placeholder={showSecond ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd HH:mm"}
                      className="flex-1 font-mono text-sm"
                    />
                    <DesktopTimePicker
                      value={endTime}
                      onChange={setEndTime}
                      placeholder="HH:mm"
                      showSecond={showSecond}
                      className="w-[100px]"
                    />
                  </div>
                </div>
              </div>

              {/* 确认按钮（右下角） */}
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpen(false)}
                >
                  取消
                </Button>
                <Button
                  size="sm"
                  onClick={handleConfirm}
                  disabled={!startTime || !endTime}
                >
                  确定
                </Button>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
