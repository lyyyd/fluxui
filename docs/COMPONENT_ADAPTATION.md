# 📱 移动端组件适配清单

## 概述

本文档记录 shadcn/ui（PC端）和 antd-mobile（移动端）组件的适配状态。

**适配原则**：
- ✅ **需要适配**：移动端有特殊交互需求或触摸优化的组件
- ⚠️ **可选适配**：shadcn 可用但移动端体验更好的组件
- ❌ **无需适配**：shadcn 完全满足移动端需求的组件

---

## 📊 适配状态总览

| 分类 | 需要适配 | 可选适配 | 无需适配 | 总计 |
|------|---------|---------|---------|------|
| 通用 | 1 | 0 | 1 | 2 |
| 布局 | 2 | 1 | 3 | 6 |
| 导航 | 5 | 2 | 0 | 7 |
| 信息展示 | 8 | 3 | 5 | 16 |
| 信息录入 | 12 | 2 | 2 | 16 |
| 反馈 | 9 | 4 | 2 | 15 |
| 引导提示 | 2 | 0 | 0 | 2 |
| **总计** | **39** | **12** | **13** | **64** |

---

## 1️⃣ 通用组件

### ✅ 需要适配（1个）

| shadcn 组件 | antd-mobile 组件 | 适配状态 | 优先级 | 原因 |
|------------|-----------------|---------|--------|------|
| Button | Button | ✅ 已完成 | P0 | 移动端需要更大触摸区域、波纹效果 |

### ❌ 无需适配（1个）

| shadcn 组件 | 说明 | 原因 |
|------------|------|------|
| Icon | 使用 lucide-react 即可 | 图标库通用，无需适配 |

---

## 2️⃣ 布局组件

### ✅ 需要适配（2个）

| shadcn 组件 | antd-mobile 组件 | 适配状态 | 优先级 | 原因 |
|------------|-----------------|---------|--------|------|
| - | AutoCenter | ❌ 未开始 | P2 | 移动端特有的居中布局组件 |
| - | SafeArea | ❌ 未开始 | P1 | 处理刘海屏、底部导航栏等安全区域 |

### ⚠️ 可选适配（1个）

| shadcn 组件 | antd-mobile 组件 | 说明 | 原因 |
|------------|-----------------|------|------|
| Separator | Divider | shadcn 可用 | antd-mobile 的 Divider 提供更多移动端样式 |

### ❌ 无需适配（3个）

| shadcn 组件 | 说明 | 原因 |
|------------|------|------|
| Grid | - | Tailwind Grid 完全满足需求 |
| Space | - | Tailwind Flexbox/Grid 可替代 |
| Aspect Ratio | - | PC 端和移动端通用 |

---

## 3️⃣ 导航组件

### ✅ 需要适配（5个）

| shadcn 组件 | antd-mobile 组件 | 适配状态 | 优先级 | 原因 |
|------------|-----------------|---------|--------|------|
| - | TabBar | ❌ 未开始 | P0 | 移动端专属底部导航栏 |
| - | NavBar | ❌ 未开始 | P1 | 移动端顶部导航栏（带返回按钮） |
| Tabs | CapsuleTabs | ❌ 未开始 | P2 | 胶囊样式更适合移动端 |
| Tabs | JumboTabs | ❌ 未开始 | P2 | 大尺寸标签页，移动端专属 |
| - | IndexBar | ❌ 未开始 | P2 | 字母索引导航（联系人列表等） |

### ⚠️ 可选适配（2个）

| shadcn 组件 | antd-mobile 组件 | 说明 | 原因 |
|------------|-----------------|------|------|
| Tabs | Tabs | shadcn 可用 | antd-mobile 提供更多移动端交互优化 |
| Sidebar | SideBar | PC 端专用 | 移动端通常使用 Drawer 替代 |

---

## 4️⃣ 信息展示组件

### ✅ 需要适配（8个）

| shadcn 组件 | antd-mobile 组件 | 适配状态 | 优先级 | 原因 |
|------------|-----------------|---------|--------|------|
| Carousel | Swiper | ❌ 未开始 | P1 | 移动端需要滑动手势优化 |
| - | InfiniteScroll | ❌ 未开始 | P1 | 移动端长列表必备 |
| - | PullToRefresh | ❌ 未开始 | P1 | 移动端下拉刷新 |
| - | FloatingPanel | ❌ 未开始 | P1 | 移动端半屏面板（类似地图应用） |
| - | ImageViewer | ❌ 未开始 | P2 | 图片预览、缩放、滑动切换 |
| - | PageIndicator | ❌ 未开始 | P2 | 轮播图分页指示器 |
| Accordion | Collapse | ❌ 未开始 | P2 | 移动端折叠面板优化 |
| - | WaterMark | ❌ 未开始 | P3 | 水印组件 |

### ⚠️ 可选适配（3个）

| shadcn 组件 | antd-mobile 组件 | 说明 | 原因 |
|------------|-----------------|------|------|
| Card | Card | shadcn 可用 | antd-mobile 提供更多移动端样式 |
| Typography | Ellipsis | shadcn 可用 | antd-mobile 提供多行省略优化 |
| - | Segmented | shadcn 可用 Tab/Toggle Group | 分段控制器，移动端体验更好 |

### ❌ 无需适配（5个）

| shadcn 组件 | 说明 | 原因 |
|------------|------|------|
| Avatar | - | PC 端和移动端通用 |
| Badge | - | PC 端和移动端通用 |
| Steps | - | PC 端和移动端通用 |
| Tag | - | PC 端和移动端通用 |
| List | - | shadcn 结合 Tailwind 可满足需求 |

---

## 5️⃣ 信息录入组件

### ✅ 需要适配（12个）

| shadcn 组件 | antd-mobile 组件 | 适配状态 | 优先级 | 原因 |
|------------|-----------------|---------|--------|------|
| Select | Picker | ❌ 未开始 | P0 | 移动端滚轮选择器体验更好 |
| - | PickerView | ❌ 未开始 | P1 | 嵌入式选择器 |
| Date Picker | CalendarPicker | ❌ 未开始 | P1 | 移动端日历选择优化 |
| - | Cascader | ❌ 未开始 | P1 | 级联选择（地区选择等） |
| - | CascaderView | ❌ 未开始 | P2 | 嵌入式级联选择 |
| - | Stepper | ❌ 未开始 | P1 | 数字增减器（购物车等） |
| - | SearchBar | ❌ 未开始 | P1 | 移动端搜索栏优化 |
| Checkbox | CheckList | ❌ 未开始 | P2 | 可勾选列表（更适合移动端） |
| - | Selector | ❌ 未开始 | P2 | 选择组（标签选择） |
| Slider | Slider | ❌ 未开始 | P2 | 移动端滑动条触摸优化 |
| - | NumberKeyboard | ❌ 未开始 | P3 | 数字键盘（支付场景） |
| - | PasscodeInput | ❌ 未开始 | P3 | 密码/验证码输入 |

### ⚠️ 可选适配（2个）

| shadcn 组件 | antd-mobile 组件 | 说明 | 原因 |
|------------|-----------------|------|------|
| Input | Input | shadcn 可用 | antd-mobile 提供移动端键盘优化 |
| Textarea | TextArea | shadcn 可用 | antd-mobile 提供自动高度等优化 |

### ❌ 无需适配（2个）

| shadcn 组件 | 说明 | 原因 |
|------------|------|------|
| Checkbox | - | PC 端和移动端通用 |
| Radio Group | - | PC 端和移动端通用 |
| Switch | - | PC 端和移动端通用 |
| Rate | - | PC 端和移动端通用 |
| Form | - | 使用 react-hook-form，两端通用 |

---

## 6️⃣ 反馈组件

### ✅ 需要适配（9个）

| shadcn 组件 | antd-mobile 组件 | 适配状态 | 优先级 | 原因 |
|------------|-----------------|---------|--------|------|
| Sheet | Popup | ❌ 未开始 | P0 | 移动端弹出层（底部、顶部、中央） |
| Dialog | ActionSheet | ❌ 未开始 | P1 | 移动端动作面板（底部滑出） |
| - | Mask | ❌ 未开始 | P1 | 背景蒙层 |
| Dialog | Modal | ❌ 未开始 | P1 | 移动端对话框优化 |
| - | Loading | ❌ 未开始 | P1 | 加载中状态 |
| Toast | Toast | ❌ 未开始 | P1 | 移动端轻提示优化 |
| - | SwipeAction | ❌ 未开始 | P2 | 滑动操作（类似 iOS 列表滑动删除） |
| - | Result | ❌ 未开始 | P2 | 结果页（成功/失败/404 等） |
| Progress | ProgressBar/Circle | ❌ 未开始 | P2 | 进度条/圆形进度 |

### ⚠️ 可选适配（4个）

| shadcn 组件 | antd-mobile 组件 | 说明 | 原因 |
|------------|-----------------|------|------|
| Alert Dialog | Dialog | shadcn 可用 | antd-mobile 提供更好的移动端体验 |
| Popover | Popover | shadcn 可用 | antd-mobile 提供触摸优化 |
| Empty | Empty | shadcn 可用 | antd-mobile 提供更多移动端插图 |
| - | ErrorBlock | shadcn 可用 Empty | 异常状态组件 |

### ❌ 无需适配（2个）

| shadcn 组件 | 说明 | 原因 |
|------------|------|------|
| Skeleton | - | PC 端和移动端通用 |
| Spinner | - | PC 端和移动端通用 |

---

## 7️⃣ 引导提示组件

### ✅ 需要适配（2个）

| shadcn 组件 | antd-mobile 组件 | 适配状态 | 优先级 | 原因 |
|------------|-----------------|---------|--------|------|
| Badge | Badge | ❌ 未开始 | P2 | 移动端徽标优化 |
| - | NoticeBar | ❌ 未开始 | P2 | 通告栏（滚动文字） |

---

## 8️⃣ 其他组件

### ✅ 需要适配（1个）

| shadcn 组件 | antd-mobile 组件 | 适配状态 | 优先级 | 原因 |
|------------|-----------------|---------|--------|------|
| - | ConfigProvider | ❌ 未开始 | P0 | 全局配置（主题、语言等） |

---

## 🔬 试验性组件

以下是 antd-mobile 的试验性组件，暂不纳入适配计划：

| 组件 | 说明 | 是否适配 |
|------|------|---------|
| Calendar | 日历 | 🔄 待评估 |
| CalendarPicker | 日历选择器 | 🔄 待评估 |
| CalendarPickerView | 日历选择器视图 | 🔄 待评估 |
| Dropdown | 下拉菜单 | 🔄 待评估 |
| FloatingBubble | 浮动气泡 | 🔄 待评估 |
| ImageUploader | 图片上传 | 🔄 待评估 |
| TreeSelect | 级联选择器 | 🔄 待评估 |
| VirtualInput | 虚拟输入框 | 🔄 待评估 |
| ResultPage | 结果页面 | 🔄 待评估 |

---

## 📋 适配优先级说明

### P0 - 核心组件（必须立即适配）
- Button ✅
- TabBar
- Popup
- Picker
- ConfigProvider

### P1 - 高优先级（近期适配）
- NavBar
- Swiper
- InfiniteScroll
- PullToRefresh
- FloatingPanel
- SearchBar
- Stepper
- ActionSheet
- Mask
- Modal
- Loading
- Toast

### P2 - 中优先级（按需适配）
- CapsuleTabs
- JumboTabs
- IndexBar
- ImageViewer
- PageIndicator
- Collapse
- CheckList
- Selector
- Slider
- SwipeAction
- Result
- ProgressBar/Circle
- Badge
- NoticeBar

### P3 - 低优先级（可选适配）
- WaterMark
- NumberKeyboard
- PasscodeInput

---

## 📈 适配进度跟踪

### 已完成（1个）
- ✅ Button

### 进行中（0个）
- 暂无

### 计划中（39个）
- 见上文优先级列表

---

## 🎯 适配原则总结

### ✅ 需要适配的场景
1. **移动端特有交互**：滑动、下拉、手势等
2. **触摸优化**：更大的触摸区域、波纹效果
3. **移动端专属组件**：TabBar、NavBar、SafeArea 等
4. **滚轮选择器**：Picker、Cascader 等

### ⚠️ 可选适配的场景
1. **体验增强**：shadcn 可用但 antd-mobile 更优
2. **样式丰富**：antd-mobile 提供更多移动端预设样式
3. **性能优化**：antd-mobile 针对移动端做了优化

### ❌ 无需适配的场景
1. **纯展示组件**：Avatar、Badge、Tag 等
2. **通用组件**：Icon、Grid、Space 等
3. **框架无关**：Form（react-hook-form）等

---

## 📝 更新日志

| 日期 | 版本 | 更新内容 |
|------|------|---------|
| 2024-12-04 | 1.0.0 | 初始版本，完成组件对比分析 |
| 2024-12-04 | 1.1.0 | 完成 Button 组件适配 |

---

**最后更新**: 2024-12-04  
**维护者**: 开发团队  
**文档状态**: 🟢 活跃维护
