"use client"

import * as React from "react"
import { Picker } from "antd-mobile"
import type { PickerValue } from "antd-mobile/es/components/picker"
import { cn } from "@/lib/utils"

export interface SelectOption {
  label: string
  value: string
}

export interface MobileSelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
  options: SelectOption[]
  className?: string
  children?: React.ReactNode
}

/**
 * 移动端 Select 组件（基于 antd-mobile Picker）
 * 提供与 shadcn/ui Select 一致的 API
 */
export function Select({
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled = false,
  placeholder = "请选择",
  options,
  className,
}: MobileSelectProps) {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(
    defaultValue
  )
  const [visible, setVisible] = React.useState(false)

  // 受控/非受控模式
  const value = controlledValue ?? internalValue
  const selectedOption = options.find((opt) => opt.value === value)

  // 转换为 antd-mobile Picker 格式
  const columns = [
    options.map((opt) => ({
      label: opt.label,
      value: opt.value,
    })),
  ]

  const handleConfirm = (val: PickerValue[]) => {
    const selectedValue = val[0] as string
    if (controlledValue === undefined) {
      setInternalValue(selectedValue)
    }
    onValueChange?.(selectedValue)
    setVisible(false)
  }

  return (
    <>
      {/* 触发器 */}
      <button
        type="button"
        onClick={() => !disabled && setVisible(true)}
        disabled={disabled}
        className={cn(
          "flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-colors",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:bg-input/30 dark:hover:bg-input/50",
          !selectedOption && "text-muted-foreground",
          className
        )}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className="h-4 w-4 shrink-0 opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Picker 弹窗 */}
      <Picker
        columns={columns}
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={handleConfirm}
        value={value ? [value] : undefined}
        confirmText="确定"
        cancelText="取消"
      />
    </>
  )
}

// 导出兼容组件（为了保持 API 一致性）
export function SelectTrigger({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span>{placeholder}</span>
}

export function SelectContent({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

export function SelectItem({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}
