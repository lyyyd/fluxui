<div align="center">
  <h1>FluxUI</h1>
  <p>🌊 Next-gen UI Kit for Web & Mobile</p>
  
  <p>
    <a href="https://www.npmjs.com/package/fluxui"><img src="https://img.shields.io/npm/v/fluxui.svg" alt="npm version"></a>
    <a href="https://github.com/yourusername/fluxui/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/fluxui.svg" alt="license"></a>
    <a href="https://github.com/yourusername/fluxui/stargazers"><img src="https://img.shields.io/github/stars/yourusername/fluxui.svg" alt="stars"></a>
  </p>

  <p>
    <strong>English</strong> · <a href="./README.zh-CN.md">简体中文</a>
  </p>
</div>

---

## ✨ Features

- 🎨 **3 Beautiful Themes** - Neutral, Blue, Purple with Light/Dark modes
- 📱 **Cross-Platform** - Seamless experience on Desktop & Mobile (H5)
- ⚡ **Dual Component System** - shadcn/ui for PC, antd-mobile for Mobile
- 🎭 **Smart Adaptation** - Auto-detects device and loads optimal components
- 🌈 **OKLCH Color System** - Modern, perceptually uniform colors
- 🚀 **Built on Next.js 15** - Latest React 19 & App Router
- 💪 **TypeScript First** - Full type safety
- 🎬 **Smooth Animations** - View Transitions API for theme switching
- 📦 **Tree-shakable** - Import only what you need

---

## 🚀 Quick Start

### Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to see the demo.

### Usage

```tsx
import { Button } from "@/components/adaptive/button"
import { ThemeProvider } from "@/components/theme-provider"

export default function App() {
  return (
    <ThemeProvider>
      <Button variant="default">Click Me</Button>
    </ThemeProvider>
  )
}
```

---

## 🎨 Theme System

FluxUI provides 3 beautiful color themes with Light/Dark modes:

| Theme | Light | Dark | Color |
|-------|-------|------|-------|
| **Neutral** | `oklch(0.205 0 0)` | `oklch(0.922 0 0)` | ⚫ Gray |
| **Blue** | `oklch(0.55 0.2 257)` | `oklch(0.65 0.18 257)` | 🔵 Blue |
| **Purple** | `oklch(0.51 0.22 281)` | `oklch(0.65 0.2 281)` | 🟣 Purple |

### Switch Themes

```tsx
import { ThemeSwitcher } from "@/components/theme-switcher"

export default function Settings() {
  return <ThemeSwitcher />
}
```

**Features:**
- 🎨 3 color themes (Neutral, Blue, Purple)
- 🌓 Light/Dark mode toggle
- ✨ Smooth transitions with View Transitions API
- 🎯 Unified colors for PC & Mobile components

---

## 📱 Cross-Platform Components

FluxUI automatically adapts to your device:

```tsx
import { Button } from "@/components/adaptive/button"

// Desktop: renders shadcn/ui Button
// Mobile: renders antd-mobile Button
// Both share the same API and theme colors!

<Button variant="default" size="default">
  Works Everywhere
</Button>
```

### Component Adaptation Status

| Component | Desktop | Mobile | Status |
|-----------|---------|--------|--------|
| Button | shadcn/ui | antd-mobile | ✅ Done |
| Input | shadcn/ui | antd-mobile | ✅ Done |
| Checkbox | shadcn/ui | antd-mobile | ✅ Done |
| Radio | shadcn/ui | antd-mobile | ✅ Done |
| Select | shadcn/ui | Picker | 🚧 Planned |
| DatePicker | shadcn/ui | CalendarPicker | 🚧 Planned |
| TimePicker | shadcn/ui | Picker | 🚧 Planned |
| ImageUploader | - | ImageUploader | 🚧 Planned |

See [Component Adaptation Guide](./COMPONENT_ADAPTATION.md) for full list (64+ components).

---

## 📚 Project Structure

```
vacationtodo/
├── app/
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout with ThemeProvider
│   ├── page.tsx              # Home page
│   ├── demo/                 # Demo page with theme switcher
│   └── theme/                # Theme CSS files
│       ├── light.css         # Light mode themes
│       ├── dark.css          # Dark mode themes
│       └── components.css    # Component overrides
├── components/
│   ├── ui/                   # 53 shadcn/ui components (PC)
│   ├── mobile/               # antd-mobile adapters (Mobile)
│   │   └── button.tsx
│   ├── adaptive/             # Auto-adaptive components
│   │   └── button.tsx
│   ├── theme-provider.tsx    # Theme context provider
│   └── theme-switcher.tsx    # Theme switcher UI
├── lib/
│   ├── theme.ts              # Theme configuration
│   └── utils.ts              # Utility functions
├── hooks/
│   └── use-mobile.ts         # Device detection hook
├── types/
│   └── view-transitions.d.ts # View Transitions API types
└── docs/
    ├── THEME_SYSTEM.md       # Theme system documentation
    ├── COMPONENT_SYSTEM.md   # Component system guide
    └── COMPONENT_ADAPTATION.md # Component adaptation plan
```

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) + React 19
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) + OKLCH
- **Desktop UI**: [shadcn/ui](https://ui.shadcn.com/) (53 components)
- **Mobile UI**: [antd-mobile](https://mobile.ant.design/)
- **Animation**: [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## 📦 Available Components

### ✅ Ready to Use (53 shadcn/ui components)

- **General**: Button, Icon
- **Layout**: Aspect Ratio, Separator
- **Navigation**: Breadcrumb, Menu, Tabs, Pagination
- **Form**: Input, Checkbox, Radio, Select, Switch, Slider, Textarea
- **Feedback**: Alert, Dialog, Toast, Progress, Skeleton
- **Display**: Card, Avatar, Badge, Calendar, Table
- **And 30+ more...**

### 🚧 In Development (Mobile Adaptations)

- Select → Picker
- DatePicker → CalendarPicker
- TimePicker → Picker
- ImageUploader

See [Component Adaptation Guide](./COMPONENT_ADAPTATION.md) for priority roadmap.

---

## 🎯 Roadmap

### ✅ v1.0 (Current - Dec 2024)
- [x] Theme system (3 colors + Light/Dark)
- [x] Button component adaptation (PC/Mobile)
- [x] 53 shadcn/ui components installed
- [x] Theme switcher with smooth animations
- [x] OKLCH color system
- [x] View Transitions API integration
- [x] antd-mobile CSS variable adaptation

### 🚧 v1.1 (Next - Week 1-2)
- [ ] Select/Picker adaptation (P0)
- [ ] DatePicker/CalendarPicker adaptation (P0)
- [ ] TimePicker adaptation (P0)
- [ ] Form component examples

### 🔮 v1.2 (Week 3-4)
- [ ] ImageUploader component (P1)
- [ ] FileUploader component (P1)
- [ ] More mobile adaptations

### 📅 v2.0 (Future)
- [ ] CLI tool for scaffolding
- [ ] Figma design kit
- [ ] Storybook integration
- [ ] Visual theme editor
- [ ] Complete all 64+ component adaptations

---

## 📖 Documentation

- [Quick Start Guide](./QUICK_START.md) - Get started in 5 minutes
- [Theme System](./docs/THEME_SYSTEM.md) - Comprehensive theme guide
- [Component System](./docs/COMPONENT_SYSTEM.md) - How to use components
- [Component Adaptation](./COMPONENT_ADAPTATION.md) - Adaptation strategy
- [Form Components Priority](./FORM_COMPONENTS_PRIORITY.md) - Form component roadmap

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md).

```bash
# Clone the repo
git clone https://github.com/yourusername/fluxui.git

# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build library
pnpm build
```

---

## 📄 License

MIT © [Your Name](https://github.com/yourusername)

---

## 🌟 Show Your Support

If you find FluxUI helpful, please give it a ⭐️ on [GitHub](https://github.com/yourusername/fluxui)!

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Desktop component foundation
- [antd-mobile](https://mobile.ant.design/) - Mobile component foundation
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Next.js](https://nextjs.org/) - The React Framework

---

<div align="center">
  Made with ❤️ by the FluxUI Team
</div>
