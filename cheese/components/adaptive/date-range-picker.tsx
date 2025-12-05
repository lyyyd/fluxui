"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { MobileDateRangePicker } from "@/components/mobile/date-range-picker"
import { DesktopDateRangePicker } from "@/components/ui/date-range-picker"
import { DateRange } from "react-day-picker"

export interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  min?: Date
  max?: Date
  className?: string
}

/**
 * 自适应日期范围选择器组件
 * 
 * PC 端：使用 shadcn Calendar + Popover（双月日历，范围选择）
 * 移动端：使用 antd-mobile CalendarPicker（全屏日历范围选择器）
 * 
 * @example
 * ```tsx
 * const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
 * 
 * <DateRangePicker
 *   value={dateRange}
 *   onChange={setDateRange}
 *   placeholder="请选择日期范围"
 * />
 * ```
 */
export function DateRangePicker(props: DateRangePickerProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <MobileDateRangePicker {...props} />
  }

  return <DesktopDateRangePicker {...props} />
}
