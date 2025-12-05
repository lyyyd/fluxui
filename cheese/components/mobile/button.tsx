import * as React from "react"
import { Button as AntdButton } from "antd-mobile"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// 复用 shadcn 的变体定义，但适配到 antd-mobile
// 统一使用 rounded-md (0.5rem = 8px) 圆角
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:opacity-50 !rounded-md",
  {
    variants: {
      variant: {
        default: "adm-button-primary",
        destructive: "adm-button-danger",
        outline: "adm-button-default",
        secondary: "adm-button-default",
        ghost: "adm-button-fill-none",
        link: "adm-button-fill-none text-primary underline-offset-4",
      },
      size: {
        default: "adm-button-middle h-9",
        sm: "adm-button-small h-8",
        lg: "adm-button-large h-10",
        icon: "adm-button-middle size-9",
        "icon-sm": "adm-button-small size-8",
        "icon-lg": "adm-button-large size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// 映射 shadcn variant 到 antd-mobile color/fill
const variantToColor = {
  default: "primary",
  destructive: "danger",
  outline: "default",
  secondary: "default",
  ghost: "default",
  link: "default",
} as const

const variantToFill = {
  default: "solid",
  destructive: "solid",
  outline: "outline",
  secondary: "solid",
  ghost: "none",
  link: "none",
} as const

const sizeMap = {
  default: "middle",
  sm: "small",
  lg: "large",
  icon: "middle",
  "icon-sm": "small",
  "icon-lg": "large",
} as const

interface ButtonProps
  extends Omit<React.ComponentProps<typeof AntdButton>, "color" | "fill" | "size">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  // 如果使用 asChild，这里可以扩展支持
  if (asChild) {
    console.warn("asChild is not supported in mobile Button")
  }

  const color = variant ? variantToColor[variant] : "primary"
  const fill = variant ? variantToFill[variant] : "solid"
  const antdSize = size ? sizeMap[size] : "middle"

  return (
    <AntdButton
      color={color}
      fill={fill}
      size={antdSize}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </AntdButton>
  )
}

export { Button, buttonVariants }
