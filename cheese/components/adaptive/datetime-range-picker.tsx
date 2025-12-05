"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { MobileDateTimeRangePicker } from "@/components/mobile/datetime-range-picker"
import { DesktopDateTimeRangePicker } from "@/components/ui/datetime-range-picker"

export interface DateTimeRange {
  from?: Date
  to?: Date
}

export interface DateTimeRangePickerProps {
  value?: DateTimeRange
  onChange?: (range: DateTimeRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  min?: Date
  max?: Date
  showSecond?: boolean
  className?: string
}

/**
 * 自适应日期时间范围选择器组件
 * 
 * PC 端：Calendar + TimePicker（双月日历 + 时间选择）
 * 移动端：CalendarPicker + Picker（分步骤选择：日期范围 -> 开始时间 -> 结束时间）
 * 
 * @example
 * ```tsx
 * const [range, setRange] = useState<DateTimeRange | undefined>(undefined)
 * 
 * // 只显示时分
 * <DateTimeRangePicker
 *   value={range}
 *   onChange={setRange}
 *   placeholder="请选择日期时间范围"
 * />
 * 
 * // 显示时分秒
 * <DateTimeRangePicker
 *   value={range}
 *   onChange={setRange}
 *   placeholder="请选择日期时间范围"
 *   showSecond
 * />
 * ```
 */
export function DateTimeRangePicker(props: DateTimeRangePickerProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <MobileDateTimeRangePicker {...props} />
  }

  return <DesktopDateTimeRangePicker {...props} />
}
