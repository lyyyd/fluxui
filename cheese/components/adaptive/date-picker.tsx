"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useIsMobile } from "@/hooks/use-mobile"
import { MobileDatePicker } from "@/components/mobile/date-picker"

export interface DatePickerProps {
  value?: Date | null
  onChange?: (date: Date | null) => void
  placeholder?: string
  disabled?: boolean
  min?: Date
  max?: Date
  className?: string
}

/**
 * 自适应日期选择器组件
 * 
 * PC 端：使用 shadcn Calendar + Popover（下拉日历）
 * 移动端：使用 antd-mobile CalendarPicker（全屏日历选择器）
 * 
 * @example
 * ```tsx
 * const [date, setDate] = useState<Date | null>(null)
 * 
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   placeholder="请选择日期"
 * />
 * ```
 */
export function DatePicker({
  value,
  onChange,
  placeholder = "请选择日期",
  disabled = false,
  min,
  max,
  className,
}: DatePickerProps) {
  const isMobile = useIsMobile()

  // 移动端使用 antd-mobile CalendarPicker
  if (isMobile) {
    return (
      <MobileDatePicker
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
        className={className}
      />
    )
  }

  // PC 端使用 shadcn Calendar + Popover
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            format(value, "PPP", { locale: zhCN })
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value || undefined}
          onSelect={(date) => onChange?.(date || null)}
          disabled={(date) => {
            if (disabled) return true
            if (min && date < min) return true
            if (max && date > max) return true
            return false
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
