"use client"

import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"

export interface SelectOption {
  label: string
  value: string
}

export interface AdaptiveSelectProps {
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
 * 自适应 Select 组件
 * - PC 端使用 shadcn/ui Select（下拉菜单）
 * - 移动端使用 antd-mobile Picker（滚轮选择器）
 * - API 完全一致，自动适配设备
 */
export function Select(props: AdaptiveSelectProps) {
  const isMobile = useIsMobile()
  const [Component, setComponent] = React.useState<React.ComponentType<AdaptiveSelectProps> | null>(null)

  React.useEffect(() => {
    if (isMobile) {
      import("@/components/mobile/select").then((mod) => 
        setComponent(() => mod.Select as React.ComponentType<AdaptiveSelectProps>)
      )
    } else {
      // PC 端需要特殊处理，因为 shadcn/ui Select 是组合式组件
      setComponent(() => {        const PCSelect = (pcProps: AdaptiveSelectProps) => {
          const { value, defaultValue, onValueChange, disabled, placeholder, options, className } = pcProps
          // 延迟导入 shadcn/ui Select 组件
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const [SelectComponents, setSelectComponents] = React.useState<any>(null)

          React.useEffect(() => {
            import("@/components/ui/select").then((mod) => {
              setSelectComponents(mod)
            })
          }, [])

          if (!SelectComponents) {
            // 加载中状态
            return (
              <div className={className}>
                <div className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-muted-foreground">
                  {placeholder || "加载中..."}
                </div>
              </div>
            )
          }

          const {
            Select: ShadcnSelect,
            SelectContent,
            SelectItem,
            SelectTrigger,
            SelectValue,
          } = SelectComponents

          return (
            <ShadcnSelect
              value={value}
              defaultValue={defaultValue}
              onValueChange={onValueChange}
              disabled={disabled}
            >
              <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </ShadcnSelect>
          )
        }
        return PCSelect
      })
    }
  }, [isMobile])

  if (!Component) {
    // 加载中状态
    const { placeholder, className } = props
    return (
      <div className={className}>
        <div className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-muted-foreground">
          {placeholder || "加载中..."}
        </div>
      </div>
    )
  }

  return <Component {...props} />
}
