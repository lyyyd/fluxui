"use client"

import { Picker } from "antd-mobile"
import { useState } from "react"

interface MobileTimePickerProps {
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

export function MobileTimePicker({
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
}: MobileTimePickerProps) {
  const [visible, setVisible] = useState(false)

  const hourColumns = Array.from({ length: maxHour - minHour + 1 }, (_, i) => {
    const hour = minHour + i
    return { label: hour.toString().padStart(2, "0"), value: hour.toString() }
  })

  const minuteColumns = Array.from({ length: Math.floor(60 / minuteStep) }, (_, i) => {
    const minute = i * minuteStep
    return { label: minute.toString().padStart(2, "0"), value: minute.toString() }
  })

  const secondColumns = Array.from({ length: Math.floor(60 / secondStep) }, (_, i) => {
    const second = i * secondStep
    return { label: second.toString().padStart(2, "0"), value: second.toString() }
  })

  const parseValue = (timeStr: string | null | undefined) => {
    if (!timeStr) return undefined
    const parts = timeStr.split(":")
    if (showSecond) {
      return [parts[0], parts[1], parts[2] || "00"]
    }
    return [parts[0], parts[1]]
  }

  const columns = showSecond 
    ? [hourColumns, minuteColumns, secondColumns]
    : [hourColumns, minuteColumns]

  return (
    <>
      <div
        className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors items-center ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${className || ""}`}
        onClick={() => !disabled && setVisible(true)}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value || placeholder}
        </span>
      </div>

      <Picker
        visible={visible}
        onClose={() => setVisible(false)}
        columns={columns}
        value={parseValue(value)}
        onConfirm={(val) => {
          if (showSecond) {
            const [hour, minute, second] = val as [string, string, string]
            const timeStr = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:${second.padStart(2, "0")}`
            onChange?.(timeStr)
          } else {
            const [hour, minute] = val as [string, string]
            const timeStr = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`
            onChange?.(timeStr)
          }
          setVisible(false)
        }}
        confirmText="确定"
        cancelText="取消"
      />
    </>
  )
}
