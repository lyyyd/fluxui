<div align="center">
  <h1>FluxUI</h1>
  <p>🌊 新一代跨端 UI 组件库</p>
  
  <p>
    <a href="https://www.npmjs.com/package/fluxui"><img src="https://img.shields.io/npm/v/fluxui.svg" alt="npm version"></a>
    <a href="https://github.com/yourusername/fluxui/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/fluxui.svg" alt="license"></a>
    <a href="https://github.com/yourusername/fluxui/stargazers"><img src="https://img.shields.io/github/stars/yourusername/fluxui.svg" alt="stars"></a>
  </p>

  <p>
    <a href="./README.md">English</a> · <strong>简体中文</strong>
  </p>
</div>

---

## ✨ 特性

- 🎨 **三套精美主题** - 中性灰、蓝色、紫色，支持明暗双模式
- 📱 **跨平台适配** - PC 端和移动端 (H5) 无缝体验
- ⚡ **双组件体系** - PC 使用 shadcn/ui，移动端使用 antd-mobile
- 🎭 **智能适配** - 自动检测设备并加载最优组件
- 🌈 **OKLCH 色彩系统** - 现代、感知均匀的颜色空间
- 🚀 **基于 Next.js 15** - 最新的 React 19 和 App Router
- 💪 **TypeScript 优先** - 完整的类型安全
- 🎬 **流畅动画** - 使用 View Transitions API 实现主题切换动画
- 📦 **按需加载** - Tree-shaking 友好

---

## 🚀 快速开始

### 开发

```bash
# 安装依赖
pnpm install

# 运行开发服务器
pnpm dev

# 生产构建
pnpm build

# 启动生产服务器
pnpm start
```

访问 [http://localhost:3000](http://localhost:3000) 查看演示。

### 使用

```tsx
import { Button } from "@/components/adaptive/button"
import { ThemeProvider } from "@/components/theme-provider"

export default function App() {
  return (
    <ThemeProvider>
      <Button variant="default">点击我</Button>
    </ThemeProvider>
  )
}
```

---

## 🎨 主题系统

FluxUI 提供 3 套精美的颜色主题，每套都支持明暗双模式：

| 主题 | 浅色模式 | 深色模式 | 颜色 |
|------|---------|---------|------|
| **中性灰** | `oklch(0.205 0 0)` | `oklch(0.922 0 0)` | ⚫ 灰色 |
| **蓝色** | `oklch(0.55 0.2 257)` | `oklch(0.65 0.18 257)` | 🔵 蓝色 |
| **紫色** | `oklch(0.51 0.22 281)` | `oklch(0.65 0.2 281)` | 🟣 紫色 |

### 切换主题

```tsx
import { ThemeSwitcher } from "@/components/theme-switcher"

export default function Settings() {
  return <ThemeSwitcher />
}
```

**特性：**
- 🎨 3 种颜色主题（中性灰、蓝色、紫色）
- 🌓 明暗模式切换
- ✨ View Transitions API 流畅过渡动画
- 🎯 PC 端和移动端组件统一颜色

---

## 📱 跨平台组件

FluxUI 会自动适配您的设备：

```tsx
import { Button } from "@/components/adaptive/button"

// 桌面端：渲染 shadcn/ui Button
// 移动端：渲染 antd-mobile Button
// 两者共享相同的 API 和主题色！

<Button variant="default" size="default">
  随处可用
</Button>
```

### 组件适配状态

| 组件 | 桌面端 | 移动端 | 状态 |
|------|--------|--------|------|
| 按钮 | shadcn/ui | antd-mobile | ✅ 已完成 |
| 输入框 | shadcn/ui | antd-mobile | ✅ 已完成 |
| 复选框 | shadcn/ui | antd-mobile | ✅ 已完成 |
| 单选框 | shadcn/ui | antd-mobile | ✅ 已完成 |
| 下拉选择 | shadcn/ui | Picker | 🚧 计划中 |
| 日期选择 | shadcn/ui | CalendarPicker | 🚧 计划中 |
| 时间选择 | shadcn/ui | Picker | 🚧 计划中 |
| 图片上传 | - | ImageUploader | 🚧 计划中 |

查看 [组件适配指南](./COMPONENT_ADAPTATION.md) 了解完整列表（64+ 组件）。

---

## 📚 项目结构

```
vacationtodo/
├── app/
│   ├── globals.css           # 全局样式
│   ├── layout.tsx            # 根布局（包含 ThemeProvider）
│   ├── page.tsx              # 首页
│   ├── demo/                 # 演示页面（包含主题切换器）
│   └── theme/                # 主题 CSS 文件
│       ├── light.css         # 浅色模式主题
│       ├── dark.css          # 深色模式主题
│       └── components.css    # 组件样式覆盖
├── components/
│   ├── ui/                   # 53 个 shadcn/ui 组件（PC 端）
│   ├── mobile/               # antd-mobile 适配器（移动端）
│   │   └── button.tsx
│   ├── adaptive/             # 自适应组件
│   │   └── button.tsx
│   ├── theme-provider.tsx    # 主题上下文提供者
│   └── theme-switcher.tsx    # 主题切换器 UI
├── lib/
│   ├── theme.ts              # 主题配置
│   └── utils.ts              # 工具函数
├── hooks/
│   └── use-mobile.ts         # 设备检测钩子
├── types/
│   └── view-transitions.d.ts # View Transitions API 类型定义
└── docs/
    ├── THEME_SYSTEM.md       # 主题系统文档
    ├── COMPONENT_SYSTEM.md   # 组件系统指南
    └── COMPONENT_ADAPTATION.md # 组件适配计划
```

---

## 🛠️ 技术栈

- **框架**: [Next.js 15](https://nextjs.org/) + React 19
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS 4.0](https://tailwindcss.com/) + OKLCH
- **桌面端 UI**: [shadcn/ui](https://ui.shadcn.com/)（53 个组件）
- **移动端 UI**: [antd-mobile](https://mobile.ant.design/)
- **动画**: [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- **包管理器**: [pnpm](https://pnpm.io/)

---

## 📦 可用组件

### ✅ 立即可用（53 个 shadcn/ui 组件）

- **通用**: Button、Icon
- **布局**: Aspect Ratio、Separator
- **导航**: Breadcrumb、Menu、Tabs、Pagination
- **表单**: Input、Checkbox、Radio、Select、Switch、Slider、Textarea
- **反馈**: Alert、Dialog、Toast、Progress、Skeleton
- **展示**: Card、Avatar、Badge、Calendar、Table
- **还有 30+ 个组件...**

### 🚧 开发中（移动端适配）

- Select → Picker
- DatePicker → CalendarPicker
- TimePicker → Picker
- ImageUploader

查看 [组件适配指南](./COMPONENT_ADAPTATION.md) 了解优先级路线图。

---

## 🎯 路线图

### ✅ v1.0（当前 - 2024年12月）
- [x] 主题系统（3 种颜色 + 明暗模式）
- [x] Button 组件适配（PC/移动端）
- [x] 安装 53 个 shadcn/ui 组件
- [x] 主题切换器（带流畅动画）
- [x] OKLCH 颜色系统
- [x] View Transitions API 集成
- [x] antd-mobile CSS 变量适配

### 🚧 v1.1（下一步 - 第 1-2 周）
- [ ] Select/Picker 适配（P0）
- [ ] DatePicker/CalendarPicker 适配（P0）
- [ ] TimePicker 适配（P0）
- [ ] 表单组件示例

### 🔮 v1.2（第 3-4 周）
- [ ] ImageUploader 组件（P1）
- [ ] FileUploader 组件（P1）
- [ ] 更多移动端适配

### 📅 v2.0（未来）
- [ ] CLI 脚手架工具
- [ ] Figma 设计套件
- [ ] Storybook 集成
- [ ] 可视化主题编辑器
- [ ] 完成所有 64+ 组件适配

---

## 📖 文档

- [快速开始指南](./QUICK_START.md) - 5 分钟上手
- [主题系统](./docs/THEME_SYSTEM.md) - 完整主题指南
- [组件系统](./docs/COMPONENT_SYSTEM.md) - 如何使用组件
- [组件适配](./COMPONENT_ADAPTATION.md) - 适配策略
- [表单组件优先级](./FORM_COMPONENTS_PRIORITY.md) - 表单组件路线图

---

## 🤝 贡献

我们欢迎贡献！请查看我们的[贡献指南](./CONTRIBUTING.md)。

```bash
# 克隆仓库
git clone https://github.com/yourusername/fluxui.git

# 安装依赖
pnpm install

# 运行开发服务器
pnpm dev

# 构建库
pnpm build
```

---

## 📄 许可证

MIT © [Your Name](https://github.com/yourusername)

---

## 🌟 支持我们

如果 FluxUI 对你有帮助，请在 [GitHub](https://github.com/yourusername/fluxui) 上给我们一个 ⭐️！

---

## 🙏 致谢

- [shadcn/ui](https://ui.shadcn.com/) - 桌面端组件基础
- [antd-mobile](https://mobile.ant.design/) - 移动端组件基础
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [Next.js](https://nextjs.org/) - React 框架

---

<div align="center">
  Made with ❤️ by the FluxUI Team
</div>
