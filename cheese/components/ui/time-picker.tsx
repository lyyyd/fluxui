"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DesktopTimePickerProps {
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

export function DesktopTimePicker({
  value,
  onChange,
  placeholder = "请选择时间",
  disabled = false,
  minHour = 0,
  maxHour = 23,
  minuteStep = 1,
  secondStep = 1,
  showSecond = false,
  className,
}: DesktopTimePickerProps) {
  const [open, setOpen] = React.useState(false)
  
  // 临时选中的小时、分钟和秒（仅用于高亮显示）
  const [tempHour, setTempHour] = React.useState<number | null>(null)
  const [tempMinute, setTempMinute] = React.useState<number | null>(null)
  const [tempSecond, setTempSecond] = React.useState<number | null>(null)
  
  // 生成小时选项
  const hours = Array.from({ length: maxHour - minHour + 1 }, (_, i) => minHour + i)
  
  // 生成分钟选项
  const minutes = Array.from({ length: Math.floor(60 / minuteStep) }, (_, i) => i * minuteStep)
  
  // 生成秒选项
  const seconds = Array.from({ length: Math.floor(60 / secondStep) }, (_, i) => i * secondStep)

  // 解析当前值
  const parsedTime = value ? value.split(":") : []
  const currentHour = parsedTime[0] ? parseInt(parsedTime[0]) : null
  const currentMinute = parsedTime[1] ? parseInt(parsedTime[1]) : null
  const currentSecond = parsedTime[2] ? parseInt(parsedTime[2]) : null  // 显示的小时、分钟和秒（临时选中 > 当前值）
  const displayHour = tempHour !== null ? tempHour : currentHour
  const displayMinute = tempMinute !== null ? tempMinute : currentMinute
  const displaySecond = tempSecond !== null ? tempSecond : currentSecond

  // 选择小时
  const handleSelectHour = (hour: number) => {
    setTempHour(hour)
    // 只更新临时状态，不关闭弹窗，允许用户继续调整
  }

  // 选择分钟
  const handleSelectMinute = (minute: number) => {
    setTempMinute(minute)
    // 只更新临时状态，不关闭弹窗，允许用户继续调整
  }

  // 选择秒
  const handleSelectSecond = (second: number) => {
    setTempSecond(second)
    // 只更新临时状态，不关闭弹窗，允许用户继续调整
  }

  // 关闭弹窗时确认选择
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && (tempHour !== null || tempMinute !== null || tempSecond !== null)) {
      // 关闭弹窗时，如果时分秒都已选中，则更新值
      const finalHour = tempHour !== null ? tempHour : currentHour
      const finalMinute = tempMinute !== null ? tempMinute : currentMinute
      const finalSecond = tempSecond !== null ? tempSecond : currentSecond
      
      if (showSecond) {
        // 时分秒格式
        if (finalHour !== null && finalMinute !== null && finalSecond !== null) {
          const timeStr = `${finalHour.toString().padStart(2, "0")}:${finalMinute.toString().padStart(2, "0")}:${finalSecond.toString().padStart(2, "0")}`
          onChange?.(timeStr)
        }
      } else {
        // 时分格式
        if (finalHour !== null && finalMinute !== null) {
          const timeStr = `${finalHour.toString().padStart(2, "0")}:${finalMinute.toString().padStart(2, "0")}`
          onChange?.(timeStr)
        }
      }
    }
    
    setOpen(newOpen)
    if (newOpen) {
      // 打开弹窗时重置临时选中状态
      setTempHour(currentHour)
      setTempMinute(currentMinute)
      setTempSecond(currentSecond)
    } else {
      // 关闭弹窗时清空临时状态
      setTempHour(null)
      setTempMinute(null)
      setTempSecond(null)
    }
  }
  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
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
          <Clock className="mr-2 h-4 w-4" />
          {value || <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          {/* 小时列 */}
          <ScrollArea className="h-[200px] w-20 border-r">
            <div className="p-1">
              {hours.map((hour) => (
                <Button
                  key={hour}
                  variant={displayHour === hour ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-center text-sm",
                    displayHour === hour && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => handleSelectHour(hour)}
                >
                  {hour.toString().padStart(2, "0")}
                </Button>
              ))}
            </div>
          </ScrollArea>

          {/* 分钟列 */}
          <ScrollArea className={cn("h-[200px] w-20", showSecond && "border-r")}>
            <div className="p-1">
              {minutes.map((minute) => (
                <Button
                  key={minute}
                  variant={displayMinute === minute ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-center text-sm",
                    displayMinute === minute && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => handleSelectMinute(minute)}
                >
                  {minute.toString().padStart(2, "0")}
                </Button>
              ))}
            </div>
          </ScrollArea>

          {/* 秒列（可选） */}
          {showSecond && (
            <ScrollArea className="h-[200px] w-20">
              <div className="p-1">
                {seconds.map((second) => (
                  <Button
                    key={second}
                    variant={displaySecond === second ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-center text-sm",
                      displaySecond === second && "bg-primary text-primary-foreground"
                    )}
                    onClick={() => handleSelectSecond(second)}
                  >
                    {second.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
