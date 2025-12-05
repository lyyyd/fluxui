"use client"

import { CalendarPicker } from "antd-mobile"
import { useState } from "react"

interface MobileDatePickerProps {
  value?: Date | null
  onChange?: (date: Date | null) => void
  placeholder?: string
  disabled?: boolean
  min?: Date
  max?: Date
  className?: string
}

export function MobileDatePicker({
  value,
  onChange,
  placeholder = "请选择日期",
  disabled = false,
  min,
  max,
  className,
}: MobileDatePickerProps) {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <div
        className={`
          flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm 
          shadow-sm transition-colors
          ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
          ${className || ""}
        `}
        onClick={() => !disabled && setVisible(true)}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value
            ? value.toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            : placeholder}
        </span>
      </div>

      <CalendarPicker
        visible={visible}
        onClose={() => setVisible(false)}
        selectionMode="single"
        value={value || undefined}
        onChange={(date: Date | null) => {
          onChange?.(date || null)
          setVisible(false)
        }}
        min={min}
        max={max}
        title={placeholder}
      />
    </>
  )
}
