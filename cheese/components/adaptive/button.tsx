"use client"

import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import type { VariantProps } from "class-variance-authority"
import type { buttonVariants } from "@/components/ui/button"

// 统一的 Button Props 类型
export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

/**
 * 自适应 Button 组件
 * - PC 端使用 shadcn/ui Button
 * - 移动端使用封装后的 antd-mobile Button
 * - API 完全一致，自动适配设备
 */
export function Button(props: ButtonProps) {
  const isMobile = useIsMobile()

  // 动态导入对应平台的组件
  const [Component, setComponent] = React.useState<React.ComponentType<ButtonProps> | null>(null)
  React.useEffect(() => {
    if (isMobile) {
      import("@/components/mobile/button").then(mod => setComponent(() => mod.Button as React.ComponentType<ButtonProps>))
    } else {
      import("@/components/ui/button").then(mod => setComponent(() => mod.Button as React.ComponentType<ButtonProps>))
    }
  }, [isMobile])

  if (!Component) {
    // 加载中状态，返回一个简单的 button
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant, size, asChild, ...buttonProps } = props
    return <button {...buttonProps} className={props.className} />
  }

  return <Component {...props} />
}

// 同时导出 buttonVariants 以便需要时使用
export { buttonVariants } from "@/components/ui/button"
