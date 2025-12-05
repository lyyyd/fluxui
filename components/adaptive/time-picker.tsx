"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { MobileTimePicker } from "@/components/mobile/time-picker"
import { DesktopTimePicker } from "@/components/ui/time-picker"

export interface TimePickerProps {
  value?: string | null
  onChange?: (time: string | null) => void
  placeholder?: string
  disabled?: boolean
  minHour?: number
  maxHour?: number
  minuteStep?: number
  secondStep?: number
  showSecond?: boolean
  className?: string
}

/**
 * 自适应时间选择器组件
 * 
 * PC 端：使用 Popover + 自定义滚动列表（支持时分秒）
 * 移动端：使用 antd-mobile Picker（滚轮时间选择器，支持时分秒）
 * 
 * @example
 * ```tsx
 * const [time, setTime] = useState<string | null>(null)
 * 
 * // 只显示时分（默认）
 * <TimePicker
 *   value={time}
 *   onChange={setTime}
 *   placeholder="请选择时间"
 * />
 * 
 * // 显示时分秒
 * <TimePicker
 *   value={time}
 *   onChange={setTime}
 *   placeholder="请选择时间"
 *   showSecond
 * />
 * ```
 */
export function TimePicker(props: TimePickerProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <MobileTimePicker {...props} />
  }

  return <DesktopTimePicker {...props} />
}
