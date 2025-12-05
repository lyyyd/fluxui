# Select / Picker 跨平台适配实现

## 📦 组件结构

```
components/
├── mobile/
│   └── select.tsx          # 移动端实现（antd-mobile Picker）
├── adaptive/
│   └── select.tsx          # 自适应组件（自动切换）
└── ui/
    └── select.tsx          # PC 端实现（shadcn/ui Select）

app/playground/select/
└── page.tsx                # 演示页面
```

## 🎯 设计思路

参考 Button 组件的适配经验，实现统一 API 的跨平台 Select：

### 1. **移动端：antd-mobile Picker**
- ✅ 滚轮选择器，原生移动端体验
- ✅ 底部弹出抽屉
- ✅ 触摸友好，支持滑动选择

### 2. **PC 端：shadcn/ui Select**
- ✅ 传统下拉菜单
- ✅ 键盘导航支持
- ✅ 鼠标交互优化

### 3. **自适应层：智能切换**
- ✅ 使用 `useIsMobile` hook 检测设备（< 768px）
- ✅ 动态加载对应组件，减少打包体积
- ✅ 统一的 Props 接口

## 📝 统一 API 设计

```tsx
interface SelectOption {
  label: string
  value: string
}

interface AdaptiveSelectProps {
  value?: string              // 受控模式
  defaultValue?: string       // 非受控模式
  onValueChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
  options: SelectOption[]     // 简化的选项格式
  className?: string
}
```

## 🔧 实现细节

### Mobile Select (components/mobile/select.tsx)

**核心功能：**
1. 封装 `antd-mobile` 的 `Picker` 组件
2. 提供与 shadcn/ui 一致的 API
3. 自定义触发器样式（与 PC 端保持一致）

**关键代码：**
```tsx
// 转换数据格式
const columns = [
  options.map((opt) => ({
    label: opt.label,
    value: opt.value,
  })),
]

// 触发器样式与 PC 端保持一致
<button className="flex h-9 w-full items-center justify-between gap-2 rounded-md border...">
  {selectedOption ? selectedOption.label : placeholder}
</button>

// antd-mobile Picker 弹窗
<Picker
  columns={columns}
  visible={visible}
  onConfirm={handleConfirm}
  confirmText="确定"
  cancelText="取消"
/>
```

### Adaptive Select (components/adaptive/select.tsx)

**核心功能：**
1. 检测设备类型
2. 动态加载对应组件
3. 处理 shadcn/ui 组合式组件的特殊情况

**关键代码：**
```tsx
React.useEffect(() => {
  if (isMobile) {
    // 移动端：直接导入封装好的组件
    import("@/components/mobile/select").then((mod) => 
      setComponent(() => mod.Select)
    )
  } else {
    // PC 端：需要组合 shadcn/ui 的多个组件
    setComponent(() => {
      const PCSelect = (props) => {
        const { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } = 
          // ... 动态导入
        
        return (
          <Select {...props}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      }
      return PCSelect
    })
  }
}, [isMobile])
```

## 🎨 主题适配

### 触发器样式统一
```tsx
className={cn(
  "flex h-9 w-full items-center justify-between gap-2",
  "rounded-md border border-input bg-transparent px-3 py-2",
  "text-sm shadow-xs outline-none transition-colors",
  "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "dark:bg-input/30 dark:hover:bg-input/50",
  !selectedOption && "text-muted-foreground"
)}
```

### antd-mobile Picker 主题继承

Picker 组件会自动继承 `app/theme/components.css` 中定义的主题变量：
- `--adm-color-primary`（主题色）
- `--adm-color-text`（文字颜色）
- `--adm-color-background`（背景色）

## 📱 演示页面 (app/playground/select/page.tsx)

### 功能展示

1. **基础用法**
   - 受控模式
   - placeholder 提示
   - 实时显示选中值

2. **默认值**
   - defaultValue 演示
   - 非受控模式

3. **禁用状态**
   - disabled 属性
   - 样式适配

4. **表单场景**
   - 多个 Select 组合
   - 响应式布局
   - 表单数据收集

5. **主题切换**
   - 集成 ThemeSwitcher
   - 实时预览主题效果
   - 支持 3 色主题 + Light/Dark 模式

## 🎯 用户体验对比

| 特性 | PC 端 (shadcn/ui) | 移动端 (antd-mobile) |
|------|------------------|---------------------|
| **交互方式** | 下拉菜单，点击选择 | 滚轮选择器，滑动选择 |
| **视觉呈现** | 浮层覆盖 | 底部抽屉 |
| **适用场景** | 鼠标操作 | 触摸操作 |
| **用户体验** | 精准快速 | 原生流畅 |

## 🚀 使用示例

```tsx
import { Select } from "@/components/adaptive/select"

const options = [
  { label: "选项 1", value: "1" },
  { label: "选项 2", value: "2" },
]

function MyForm() {
  const [value, setValue] = useState("")

  return (
    <Select
      value={value}
      onValueChange={setValue}
      placeholder="请选择"
      options={options}
    />
  )
}
```

## 📊 技术优势

✅ **统一 API**：开发者无需关心平台差异  
✅ **自动适配**：根据设备自动选择最优组件  
✅ **动态加载**：按需加载，减少打包体积  
✅ **主题一致**：跨平台样式统一  
✅ **类型安全**：完整的 TypeScript 支持  

## 🎬 访问演示

- **首页**：http://localhost:3000
- **Select Demo**：http://localhost:3000/playground/select
- **Button Demo**：http://localhost:3000/playground/button

调整浏览器窗口到 < 768px 即可看到移动端效果！
