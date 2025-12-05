"use client"

import { CalendarPicker, Picker } from "antd-mobile"
import { useState } from "react"
import { CalendarIcon } from "lucide-react"

export interface DateTimeRange {
  from?: Date
  to?: Date
}

interface MobileDateTimeRangePickerProps {
  value?: DateTimeRange
  onChange?: (range: DateTimeRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  min?: Date
  max?: Date
  showSecond?: boolean
  className?: string
}

export function MobileDateTimeRangePicker({
  value,
  onChange,
  placeholder = "请选择日期时间范围",
  disabled = false,
  min,
  max,
  showSecond = false,
  className,
}: MobileDateTimeRangePickerProps) {
  const [dateVisible, setDateVisible] = useState(false)
  const [timeVisible, setTimeVisible] = useState(false)
  const [tempDateRange, setTempDateRange] = useState<[Date, Date] | null>(null)
  const [tempStartDateTime, setTempStartDateTime] = useState<Date | null>(null)
  const [currentStep, setCurrentStep] = useState<"date" | "startTime" | "endTime">("date")
  const formatDateTime = (date: Date | undefined) => {
    if (!date) return ""
    const formatStr: Intl.DateTimeFormatOptions = showSecond 
      ? { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }
      : { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }
    return date.toLocaleString("zh-CN", formatStr)
  }

  const formatDateTimeRange = (range: DateTimeRange | undefined) => {
    if (!range?.from) return placeholder
    if (!range.to) return formatDateTime(range.from)
    return `${formatDateTime(range.from)} - ${formatDateTime(range.to)}`
  }

  // 生成时间选项
  const hourColumns = Array.from({ length: 24 }, (_, i) => ({
    label: i.toString().padStart(2, "0"),
    value: i.toString(),
  }))

  const minuteColumns = Array.from({ length: 60 }, (_, i) => ({
    label: i.toString().padStart(2, "0"),
    value: i.toString(),
  }))

  const secondColumns = Array.from({ length: 60 }, (_, i) => ({
    label: i.toString().padStart(2, "0"),
    value: i.toString(),
  }))

  const timeColumns = showSecond
    ? [hourColumns, minuteColumns, secondColumns]
    : [hourColumns, minuteColumns]
  const handleDateConfirm = (dates: [Date, Date] | null) => {
    if (dates && dates.length === 2) {
      setTempDateRange(dates)
      setDateVisible(false)
      setCurrentStep("startTime")
      setTimeVisible(true)
    }
  }

  const handleStartTimeConfirm = (val: (string | number | null)[]) => {
    if (tempDateRange && val.length >= 2) {
      const hour = typeof val[0] === 'number' ? val[0] : parseInt(val[0] || "0")
      const minute = typeof val[1] === 'number' ? val[1] : parseInt(val[1] || "0")
      const second = val[2] ? (typeof val[2] === 'number' ? val[2] : parseInt(val[2] || "0")) : 0
      
      const startDate = new Date(tempDateRange[0])
      startDate.setHours(hour, minute, second)
      
      // 保存开始时间
      setTempStartDateTime(startDate)
      
      setTimeVisible(false)
      setCurrentStep("endTime")
      setTimeout(() => setTimeVisible(true), 100)
    }
  }

  const handleEndTimeConfirm = (val: (string | number | null)[]) => {
    if (tempDateRange && tempStartDateTime && val.length >= 2) {
      const hour = typeof val[0] === 'number' ? val[0] : parseInt(val[0] || "0")
      const minute = typeof val[1] === 'number' ? val[1] : parseInt(val[1] || "0")
      const second = val[2] ? (typeof val[2] === 'number' ? val[2] : parseInt(val[2] || "0")) : 0
      
      // 设置结束时间
      const endDate = new Date(tempDateRange[1])
      endDate.setHours(hour, minute, second)
      
      onChange?.({
        from: tempStartDateTime,
        to: endDate,
      })
      
      setTimeVisible(false)
      setTempDateRange(null)
      setTempStartDateTime(null)
      setCurrentStep("date")
    }
  }

  return (
    <>
      <div
        className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors items-center ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${className || ""}`}
        onClick={() => !disabled && setDateVisible(true)}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        <span className={value?.from ? "text-foreground" : "text-muted-foreground"}>
          {formatDateTimeRange(value)}
        </span>
      </div>

      {/* 日期选择 */}
      <CalendarPicker
        visible={dateVisible}
        onClose={() => setDateVisible(false)}
        selectionMode="range"
        onConfirm={handleDateConfirm}
        min={min}
        max={max}
        confirmText="下一步"
        title="选择日期范围"
      />

      {/* 时间选择 */}      <Picker
        visible={timeVisible}
        onClose={() => {
          setTimeVisible(false)
          setTempDateRange(null)
          setTempStartDateTime(null)
          setCurrentStep("date")
        }}
        columns={timeColumns}
        onConfirm={currentStep === "startTime" ? handleStartTimeConfirm : handleEndTimeConfirm}
        confirmText={currentStep === "startTime" ? "下一步" : "确定"}
        cancelText="取消"
        title={currentStep === "startTime" ? "选择开始时间" : "选择结束时间"}
      />
    </>
  )
}
