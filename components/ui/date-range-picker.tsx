"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
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

export interface DesktopDateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  min?: Date
  max?: Date
  className?: string
}

export function DesktopDateRangePicker({
  value,
  onChange,
  placeholder = "请选择日期范围",
  disabled = false,
  min,
  max,
  className,
}: DesktopDateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) return placeholder
    
    if (!range.to) {
      return format(range.from, "yyyy-MM-dd", { locale: zhCN })
    }

    return `${format(range.from, "yyyy-MM-dd", { locale: zhCN })} - ${format(range.to, "yyyy-MM-dd", { locale: zhCN })}`
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
          {formatDateRange(value)}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0" 
        align="start"
      >
        <Calendar
          mode="range"
          selected={value}
          onSelect={(range) => {
            onChange?.(range)
            // 不自动关闭，让用户点击空白处手动关闭
          }}
          disabled={(date) => {
            if (min && date < min) return true
            if (max && date > max) return true
            return false
          }}
          initialFocus
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}
