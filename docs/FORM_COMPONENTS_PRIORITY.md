# 📝 表单组件适配优先级

## 需求分析

PC 端表单组件适配清单（11个组件）

---

## 🎯 适配优先级建议

### ✅ 无需适配 - shadcn 已完美支持（6个）

这些组件 shadcn 在 PC 和移动端都表现良好，**无需额外适配**：

| 组件 | shadcn 组件 | 状态 | 说明 |
|------|------------|------|------|
| **输入框** | Input | ✅ 已有 | PC/移动端通用，响应式设计 |
| **数字输入** | Input + type="number" | ✅ 已有 | 使用 `<Input type="number" />` 即可 |
| **单选 Radio** | Radio Group | ✅ 已有 | PC/移动端通用 |
| **多选 Checkbox** | Checkbox | ✅ 已有 | PC/移动端通用 |
| **描述文字** | Label / Typography | ✅ 已有 | 纯展示组件，通用 |
| **图片预览** | Dialog + Image | ✅ 已有 | 组合使用 Dialog 和 Image 即可 |

**建议**: 直接使用 shadcn 现有组件，配合 `use-mobile.ts` 做响应式调整即可。

---

### ⚠️ 需要适配 - 移动端体验优化（3个）

这些组件在移动端需要特殊交互优化：

#### 1. 下拉选择 - **P0（最高优先级）**

| PC 端 | 移动端 | 优先级 | 原因 |
|-------|--------|--------|------|
| Select | Picker | **P0** | 移动端滚轮选择器体验远超下拉菜单 |

**适配方案**:
```tsx
// components/adaptive/select.tsx
const Select = () => {
  const isMobile = useIsMobile()
  return isMobile ? <MobileSelect /> : <DesktopSelect />
}
```

**antd-mobile 组件**:
- `Picker` - 滚轮选择器
- `CascaderView` - 级联选择（省市区等）

---

#### 2. 日期选择 - **P0（最高优先级）**

| PC 端 | 移动端 | 优先级 | 原因 |
|-------|--------|--------|------|
| Calendar / Date Picker | CalendarPicker | **P0** | 移动端日历选择交互优化 |

**适配方案**:
```tsx
// components/adaptive/date-picker.tsx
const DatePicker = () => {
  const isMobile = useIsMobile()
  return isMobile ? <MobileDatePicker /> : <DesktopDatePicker />
}
```

**antd-mobile 组件**:
- `CalendarPicker` - 日历选择器
- `Picker` - 时间滚轮选择器（时间选择）

---

#### 3. 时间选择 - **P0（最高优先级）**

| PC 端 | 移动端 | 优先级 | 原因 |
|-------|--------|--------|------|
| Input + time picker | Picker | **P0** | 移动端滚轮选择小时/分钟更便捷 |

**适配方案**:
```tsx
// components/adaptive/time-picker.tsx
const TimePicker = () => {
  const isMobile = useIsMobile()
  return isMobile ? <MobileTimePicker /> : <DesktopTimePicker />
}
```

**antd-mobile 组件**:
- `Picker` - 时间滚轮选择器（小时:分钟）

---

### 🔄 需要适配 - 功能增强（2个）

这些组件需要额外功能支持：

#### 4. 图片上传 - **P1（高优先级）**

| PC 端 | 移动端 | 优先级 | 原因 |
|-------|--------|--------|------|
| Input + file | ImageUploader | **P1** | 移动端需要相机调用、图片裁剪 |

**适配方案**:
```tsx
// components/adaptive/image-uploader.tsx
const ImageUploader = () => {
  const isMobile = useIsMobile()
  return isMobile ? <MobileImageUploader /> : <DesktopImageUploader />
}
```

**PC 端方案**:
- 自定义 `<Input type="file" accept="image/*" />`
- 使用 `react-dropzone` 拖拽上传

**移动端方案**:
- antd-mobile `ImageUploader`
- 支持相机拍照、相册选择、图片裁剪

---

#### 5. 文件上传 - **P1（高优先级）**

| PC 端 | 移动端 | 优先级 | 原因 |
|-------|--------|--------|------|
| Input + file | Input + file | **P1** | 需要统一上传逻辑、进度条、预览 |

**适配方案**:
```tsx
// components/adaptive/file-uploader.tsx
const FileUploader = () => {
  const isMobile = useIsMobile()
  return isMobile ? <MobileFileUploader /> : <DesktopFileUploader />
}
```

**通用方案**:
- 使用 `react-dropzone`（PC 端拖拽）
- 统一上传接口和进度显示
- 文件列表展示

---

## 📋 优先适配顺序

### 第一批（P0 - 必须立即适配）

这 3 个组件在移动端体验差异最大，优先适配：

1. ✅ **下拉选择 (Select/Picker)** - 移动端滚轮选择器
2. ✅ **日期选择 (DatePicker/CalendarPicker)** - 移动端日历优化
3. ✅ **时间选择 (TimePicker/Picker)** - 移动端时间滚轮

**预计工作量**: 2-3 天

---

### 第二批（P1 - 功能增强）

这 2 个组件需要额外功能支持：

4. ✅ **图片上传 (ImageUploader)** - 相机调用、裁剪
5. ✅ **文件上传 (FileUploader)** - 统一上传逻辑

**预计工作量**: 2-3 天

---

### 无需适配（直接使用 shadcn）

这 6 个组件 shadcn 已完美支持，**无需额外适配**：

- ✅ 输入框 (Input)
- ✅ 数字输入 (Input type="number")
- ✅ 单选 Radio (Radio Group)
- ✅ 多选 Checkbox (Checkbox)
- ✅ 描述文字 (Label)
- ✅ 图片预览 (Dialog + Image)

---

## 🚀 快速开始指南

### 步骤 1: 使用 shadcn 现有组件（立即可用）

这些组件可以直接使用，无需等待适配：

```tsx
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

// 输入框
<Input type="text" placeholder="请输入..." />

// 数字输入
<Input type="number" min={0} max={100} />

// 单选
<RadioGroup>
  <RadioGroupItem value="1" id="r1" />
  <Label htmlFor="r1">选项 1</Label>
</RadioGroup>

// 多选
<Checkbox id="c1" />
<Label htmlFor="c1">选项 1</Label>

// 描述文字
<Label>这是描述文字</Label>

// 图片预览
<Dialog>
  <DialogContent>
    <img src="..." alt="预览" />
  </DialogContent>
</Dialog>
```

---

### 步骤 2: 适配移动端组件（按优先级）

#### 2.1 下拉选择 (P0)

```bash
# 创建自适应 Select
# components/adaptive/select.tsx
```

**PC 端**: shadcn Select
**移动端**: antd-mobile Picker

---

#### 2.2 日期选择 (P0)

```bash
# 创建自适应 DatePicker
# components/adaptive/date-picker.tsx
```

**PC 端**: shadcn Calendar + Popover
**移动端**: antd-mobile CalendarPicker

---

#### 2.3 时间选择 (P0)

```bash
# 创建自适应 TimePicker
# components/adaptive/time-picker.tsx
```

**PC 端**: 自定义 TimePicker
**移动端**: antd-mobile Picker (时间模式)

---

#### 2.4 图片上传 (P1)

```bash
# 创建自适应 ImageUploader
# components/adaptive/image-uploader.tsx
```

**PC 端**: react-dropzone + 预览
**移动端**: antd-mobile ImageUploader

---

#### 2.5 文件上传 (P1)

```bash
# 创建自适应 FileUploader
# components/adaptive/file-uploader.tsx
```

**PC 端**: react-dropzone + 文件列表
**移动端**: Input file + 进度条

---

## 📊 适配进度跟踪

| 组件 | shadcn | antd-mobile | 适配状态 | 优先级 | 预计工时 |
|------|--------|-------------|---------|--------|---------|
| 输入框 | Input | - | ✅ 无需适配 | - | 0h |
| 数字输入 | Input | - | ✅ 无需适配 | - | 0h |
| 单选 Radio | Radio Group | - | ✅ 无需适配 | - | 0h |
| 多选 Checkbox | Checkbox | - | ✅ 无需适配 | - | 0h |
| 描述文字 | Label | - | ✅ 无需适配 | - | 0h |
| 图片预览 | Dialog+Image | - | ✅ 无需适配 | - | 0h |
| **下拉选择** | Select | Picker | ✅ 已完成 | **P0** | 6h |
| **日期选择** | Calendar | CalendarPicker | ✅ 已完成 | **P0** | 6h |
| **时间选择** | time input | Picker | ✅ 已完成 | **P0** | 4h |
| **图片上传** | - | ImageUploader | ❌ 未开始 | **P1** | 8h |
| **文件上传** | - | - | ❌ 未开始 | **P1** | 6h |

**总计**: 30 小时（约 4 个工作日）  
**已完成**: 16 小时（Select + DatePicker + TimePicker）✅  
**剩余**: 14 小时（图片上传 + 文件上传）

---

## 💡 实施建议

### 立即可用（0 工时）

这 6 个组件可以立即在项目中使用：
- ✅ Input（输入框、数字输入）
- ✅ Radio Group（单选）
- ✅ Checkbox（多选）
- ✅ Label（描述文字）
- ✅ Dialog + Image（图片预览）

**建议**: 先用这些组件快速搭建表单，不要等适配。

---

### 第一周：P0 组件适配（16 工时）

优先适配移动端体验差异最大的 3 个组件：
1. 下拉选择 (6h)
2. 日期选择 (6h)
3. 时间选择 (4h)

**收益**: 移动端表单体验大幅提升，用户可以流畅使用滚轮选择器。

---

### 第二周：P1 组件适配（14 工时）

适配需要额外功能的 2 个组件：
4. 图片上传 (8h) - 相机、裁剪
5. 文件上传 (6h) - 统一上传

**收益**: 完整的上传功能，支持移动端相机调用。

---

## 🎯 最终建议

### 立即开始使用（推荐）

```tsx
// 表单示例 - 使用现有 shadcn 组件
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/adaptive/button"

export function MyForm() {
  return (
    <form>
      {/* 输入框 - 立即可用 */}
      <Input placeholder="姓名" />
      
      {/* 数字输入 - 立即可用 */}
      <Input type="number" placeholder="年龄" />
      
      {/* 单选 - 立即可用 */}
      <RadioGroup>
        <RadioGroupItem value="male" />
        <Label>男</Label>
      </RadioGroup>
      
      {/* 多选 - 立即可用 */}
      <Checkbox />
      <Label>同意条款</Label>
      
      {/* 提交按钮 - 已适配 */}
      <Button type="submit">提交</Button>
    </form>
  )
}
```

### 优先适配顺序

1. **Week 1**: 下拉选择、日期选择、时间选择（P0）
2. **Week 2**: 图片上传、文件上传（P1）

这样可以在 2 周内完成所有表单组件的适配！

---

**创建时间**: 2024-12-04  
**预计完成**: 2024-12-18  
**状态**: 🟡 规划中
