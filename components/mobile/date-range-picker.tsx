"use client"

import { CalendarPicker } from "antd-mobile"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { CalendarIcon } from "lucide-react"

interface MobileDateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  min?: Date
  max?: Date
  className?: string
}

export function MobileDateRangePicker({
  value,
  onChange,
  placeholder = "请选择日期范围",
  disabled = false,
  min,
  max,
  className,
}: MobileDateRangePickerProps) {
  const [visible, setVisible] = useState(false)

  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) return placeholder
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    }

    if (!range.to) {
      return formatDate(range.from)
    }

    return `${formatDate(range.from)} - ${formatDate(range.to)}`
  }

  return (
    <>
      <div
        className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors items-center ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${className || ""}`}
        onClick={() => !disabled && setVisible(true)}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        <span className={value?.from ? "text-foreground" : "text-muted-foreground"}>
          {formatDateRange(value)}
        </span>
      </div>

      <CalendarPicker
        visible={visible}
        onClose={() => setVisible(false)}
        selectionMode="range"
        value={value?.from && value?.to ? [value.from, value.to] : undefined}
        onChange={(dates) => {
          if (!dates) {
            onChange?.(undefined)
            return
          }

          if (Array.isArray(dates) && dates.length === 2) {
            onChange?.({
              from: dates[0],
              to: dates[1],
            })
          }
        }}
        onConfirm={(dates) => {
          if (!dates) {
            onChange?.(undefined)
          } else if (Array.isArray(dates) && dates.length === 2) {
            onChange?.({
              from: dates[0],
              to: dates[1],
            })
          }
          setVisible(false)
        }}
        min={min}
        max={max}
        confirmText="确定"
        title="选择日期范围"
      />
    </>
  )
}
