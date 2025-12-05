# 📅 DatePicker 日期选择器组件实现文档

## 📋 概述

自适应日期选择器组件，根据设备类型自动切换实现方式：
- **PC 端（≥768px）**：shadcn/ui Calendar + Popover（下拉日历选择器）
- **移动端（<768px）**：antd-mobile CalendarPicker（全屏日历选择器）

---

## 🎯 组件特性

### ✅ 已实现功能

- ✅ **自适应切换**：根据 `useIsMobile()` 自动切换 PC/移动端组件
- ✅ **统一 API**：PC 和移动端使用完全相同的 Props
- ✅ **日期格式化**：使用 `date-fns` 统一处理日期显示
- ✅ **日期范围限制**：支持 `min`/`max` 限制可选日期范围
- ✅ **禁用状态**：支持 `disabled` 属性
- ✅ **默认值**：支持设置默认日期
- ✅ **主题适配**：完美适配三色主题（Neutral、Blue、Purple）和 Light/Dark 模式
- ✅ **国际化**：中文日期格式显示

---

## 📦 文件结构

```
components/
  adaptive/
    date-picker.tsx          # 自适应日期选择器（主组件）
  mobile/
    date-picker.tsx          # 移动端实现（antd-mobile）
  ui/
    calendar.tsx             # PC 端日历组件（shadcn）
    popover.tsx              # PC 端弹出层（shadcn）

app/
  dashboard/
    playground/
      date-picker/
        page.tsx             # DatePicker 演示页面
```

---

## 🔧 依赖安装

```bash
# 核心依赖
pnpm add date-fns         # 日期格式化库
pnpm add antd-mobile      # 已安装（移动端组件库）

# shadcn/ui 组件（已有）
- Calendar
- Popover
- Button
```

---

## 📖 API 文档

### DatePicker Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `value` | `Date \| null \| undefined` | `undefined` | 受控模式的值 |
| `onChange` | `(date: Date \| null) => void` | - | 日期改变回调 |
| `placeholder` | `string` | `"请选择日期"` | 占位文本 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `min` | `Date` | - | 最小可选日期 |
| `max` | `Date` | - | 最大可选日期 |
| `className` | `string` | - | 自定义样式类名 |

---

## 💡 使用示例

### 基础用法

```tsx
import { useState } from "react"
import { DatePicker } from "@/components/adaptive/date-picker"

export function BasicExample() {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      placeholder="请选择日期"
    />
  )
}
```

### 默认值

```tsx
export function DefaultValueExample() {
  const [date, setDate] = useState<Date | null>(new Date())

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      placeholder="请选择日期"
    />
  )
}
```

### 日期范围限制

```tsx
export function RangeLimitExample() {
  const [date, setDate] = useState<Date | null>(null)
  
  const today = new Date()
  const futureDate = new Date()
  futureDate.setDate(today.getDate() + 30)

  return (
    <DatePicker
      value={date}
      onChange={setDate}
      placeholder="请选择预约日期"
      min={today}              // 只能选择今天及以后
      max={futureDate}         // 只能选择未来30天内
    />
  )
}
```

### 禁用状态

```tsx
export function DisabledExample() {
  return (
    <DatePicker
      disabled
      placeholder="此日期选择器已禁用"
    />
  )
}
```

### 表单场景

```tsx
export function FormExample() {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  return (
    <form>
      <div>
        <Label>开始日期</Label>
        <DatePicker
          value={startDate}
          onChange={setStartDate}
          placeholder="请选择开始日期"
        />
      </div>

      <div>
        <Label>结束日期</Label>
        <DatePicker
          value={endDate}
          onChange={setEndDate}
          placeholder="请选择结束日期"
          min={startDate || undefined}  // 结束日期不能早于开始日期
        />
      </div>
    </form>
  )
}
```

---

## 🎨 平台差异

### PC 端体验

- **组件**: shadcn/ui Calendar + Popover
- **交互**: 点击按钮，弹出下拉日历面板
- **样式**: 紧凑的日历视图，支持快速选择
- **优势**: 不占用屏幕空间，适合桌面操作

### 移动端体验

- **组件**: antd-mobile CalendarPicker
- **交互**: 点击输入框，打开全屏日历选择器
- **样式**: 全屏日历视图，大号日期按钮
- **优势**: 
  - 触摸友好的大按钮
  - 全屏显示更清晰
  - 原生滚动体验
  - 支持手势操作

---

## 🔄 自动切换逻辑

```tsx
export function DatePicker(props: DatePickerProps) {
  const isMobile = useIsMobile()

  // 移动端：antd-mobile CalendarPicker
  if (isMobile) {
    return <MobileDatePicker {...props} />
  }

  // PC 端：shadcn Calendar + Popover
  return <DesktopDatePicker {...props} />
}
```

**切换断点**: `768px`（与 Tailwind CSS `md:` 断点一致）

---

## 🌈 主题适配

### Light 模式
- ✅ Neutral（灰）主题
- ✅ Blue（蓝）主题
- ✅ Purple（紫）主题

### Dark 模式
- ✅ 自动适配暗色主题
- ✅ 按钮和边框颜色跟随主题

### 样式来源
- **PC 端**: 使用 shadcn/ui 的 CSS 变量系统
- **移动端**: antd-mobile 自动适配暗色模式

---

## 📊 实现进度

| 功能 | PC 端 | 移动端 | 状态 |
|------|------|--------|------|
| 基础日期选择 | ✅ Calendar | ✅ CalendarPicker | ✅ 完成 |
| 日期范围限制 | ✅ disabled 函数 | ✅ min/max | ✅ 完成 |
| 禁用状态 | ✅ disabled | ✅ disabled | ✅ 完成 |
| 默认值 | ✅ selected | ✅ value | ✅ 完成 |
| 日期格式化 | ✅ date-fns | ✅ toLocaleDateString | ✅ 完成 |
| 主题适配 | ✅ CSS 变量 | ✅ 自动适配 | ✅ 完成 |
| 国际化 | ✅ zhCN locale | ✅ zh-CN | ✅ 完成 |

---

## ⚡ 性能优化

### 按需加载
```tsx
// 只在移动端加载 antd-mobile CalendarPicker
if (isMobile) {
  return <MobileDatePicker />  // 动态导入
}
```

### 避免重复渲染
- 使用 `useState` 管理日期状态
- `onChange` 回调避免不必要的更新

---

## 🐛 已知问题和解决方案

### 1. 日期格式化问题
**问题**: 不同平台日期显示格式不一致  
**解决**: 使用 `date-fns` 的 `format()` 统一格式化

### 2. 时区问题
**问题**: Date 对象可能受时区影响  
**解决**: 使用本地时间显示，避免 UTC 转换

### 3. 移动端全屏遮罩
**问题**: CalendarPicker 打开时可能遮挡内容  
**解决**: 使用 `visible` 状态控制显示/隐藏

---

## 🚀 下一步计划

### P1 优先级
- [ ] **范围选择**: 支持选择日期范围（开始日期 ~ 结束日期）
- [ ] **时间选择**: 增加时间选择功能（DateTimePicker）
- [ ] **快捷选择**: 添加"今天"、"明天"、"下周"等快捷按钮

### P2 优先级
- [ ] **多选模式**: 支持选择多个日期
- [ ] **周选择**: 支持按周选择
- [ ] **月选择**: 支持按月选择
- [ ] **年选择**: 支持按年选择

---

## 📝 测试清单

### 功能测试
- [x] 基础选择功能
- [x] 默认值显示
- [x] 日期范围限制（min/max）
- [x] 禁用状态
- [x] PC/移动端自动切换

### 主题测试
- [x] Neutral 主题（Light/Dark）
- [x] Blue 主题（Light/Dark）
- [x] Purple 主题（Light/Dark）

### 兼容性测试
- [x] Chrome（PC/Mobile）
- [x] Safari（PC/Mobile）
- [x] Firefox（PC/Mobile）
- [ ] Edge（PC）

---

## 💻 演示页面

访问路径: `/dashboard/playground/date-picker`

**演示内容**:
1. 基础用法 - 选择生日
2. 默认值 - 默认选中今天
3. 日期范围限制 - 只能选择未来30天
4. 禁用状态 - 无法点击选择
5. 表单示例 - 开始/结束日期联动

---

## 📚 参考资料

- [shadcn/ui Calendar](https://ui.shadcn.com/docs/components/calendar)
- [antd-mobile CalendarPicker](https://mobile.ant.design/zh/components/calendar-picker)
- [date-fns 文档](https://date-fns.org/)
- [react-day-picker](https://react-day-picker.js.org/)

---

**创建时间**: 2024-12-05  
**状态**: ✅ 已完成  
**优先级**: P0（最高优先级）  
**预计工时**: 6 小时  
**实际工时**: 1 小时
