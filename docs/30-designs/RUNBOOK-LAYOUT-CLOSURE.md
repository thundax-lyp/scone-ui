# Layout Closure Runbook

## Purpose

完成 Layout 组件族闭环：在 `src/components/layout/*` 落地 `SconeStack`、`SconeInline`、`SconeCompact`、`SconeToolbar`、`SconeSeparator`、`SconeScrollArea`、`SconeSplitPane` 及同目录测试，并把公共导出面补齐到 `src/index.ts`。

本 RUNBOOK 只作为执行手册，不记录阶段进度；实现完成后按 Closure 清理。

## Scope

- 组件源码：
  - `src/components/layout/stack.tsx`
  - `src/components/layout/inline.tsx`
  - `src/components/layout/compact.tsx`
  - `src/components/layout/toolbar.tsx`
  - `src/components/layout/separator.tsx`
  - `src/components/layout/scroll-area.tsx`
  - `src/components/layout/split-pane.tsx`
- 同目录测试：
  - `src/components/layout/stack.test.tsx`
  - `src/components/layout/inline.test.tsx`
  - `src/components/layout/compact.test.tsx`
  - `src/components/layout/toolbar.test.tsx`
  - `src/components/layout/separator.test.tsx`
  - `src/components/layout/scroll-area.test.tsx`
  - `src/components/layout/split-pane.test.tsx`
- 公共导出：
  - `src/index.ts` 导出上述 `Scone*` 组件及组件文件内 public props type。
- 设计和规格依据：
  - `docs/10-specs/COMPONENT-SPEC-LAYOUT.md`
  - `docs/10-specs/components/layout/SCONE-STACK.md`
  - `docs/10-specs/components/layout/SCONE-INLINE.md`
  - `docs/10-specs/components/layout/SCONE-COMPACT.md`
  - `docs/10-specs/components/layout/SCONE-TOOLBAR.md`
  - `docs/10-specs/components/layout/SCONE-SEPARATOR.md`
  - `docs/10-specs/components/layout/SCONE-SCROLL-AREA.md`
  - `docs/10-specs/components/layout/SCONE-SPLIT-PANE.md`
  - `docs/10-specs/FOUNDATIONS-SPEC.md`
  - `docs/30-designs/admin-ui/COMPONENT-FAMILY-DESIGN.md`
  - `docs/30-designs/admin-ui/EXPORT-SURFACE-DESIGN.md`

## Non-goals

- 不新增 `ListPage`、`PageShell`、`FilterPanel`、`BatchActionBar` 或其他 Pattern。
- 不把页面主滚动、业务状态、数据加载、权限判断、页面标题、选中数量或筛选开关塞入 Layout primitive。
- 不新增产品应用级 UI 规则，不创建 `UI-RULES.md`。
- 不引入第二套 token 数值源；Layout props 继续引用 Foundation token、preset 或显式 CSS 长度覆盖。
- 不把任意无单位 `number` 作为 `gap`、`size`、`defaultSize` 或受控尺寸的公共 API。
- 不给 `SconeScrollArea` 增加 `heightPreset`；高度来源由调用方通过父容器、`className` 或布局上下文提供。
- 不给 `SconeToolbar` 增加 `density="comfortable"`；本轮只实现 `compact` 和 `default`。
- 不通过 `cloneElement` 修改 `SconeCompact` 子项；紧凑边界通过根容器 class 和 CSS 选择器协调。

## Public API Fields

### `src/components/layout/stack.tsx`

- `SconeStackProps`
  - `gap?: SconeSpacingToken`，默认 `md`。
  - `align?: "start" | "center" | "end" | "stretch"`。
  - `children?: React.ReactNode`。
  - `className?: string`。
  - `style?: React.CSSProperties`。
- `SconeStack` 使用 `React.forwardRef<HTMLDivElement, SconeStackProps>`，ref 指向根布局容器。

### `src/components/layout/inline.tsx`

- `SconeInlineProps`
  - `gap?: SconeSpacingToken`，默认 `sm`。
  - `align?: "start" | "center" | "end" | "baseline"`。
  - `wrap?: boolean`。
  - `split?: React.ReactNode`。
  - `children?: React.ReactNode`。
  - `className?: string`。
  - `style?: React.CSSProperties`。
- `SconeInline` 使用 `React.forwardRef<HTMLDivElement, SconeInlineProps>`，ref 指向根布局容器。
- `split` 插入到相邻子项之间，默认作为装饰性节点处理，使用 `aria-hidden="true"`，不表达语义分组或业务状态。

### `src/components/layout/compact.tsx`

- `SconeCompactProps`
  - `orientation?: "horizontal" | "vertical"`，默认 `horizontal`。
  - `size?: "sm" | "md"`，默认 `md`。
  - `children?: React.ReactNode`。
  - `className?: string`。
- `SconeCompact` 使用 `React.forwardRef<HTMLDivElement, SconeCompactProps>`，ref 指向根布局容器。
- 子项的 disabled、loading、pressed、selected 等状态由子项自身管理。

### `src/components/layout/toolbar.tsx`

- `SconeToolbarProps`
  - `start?: React.ReactNode`。
  - `end?: React.ReactNode`。
  - `children?: React.ReactNode`。
  - `density?: "compact" | "default"`，默认 `default`。
  - `className?: string`。
- `SconeToolbar` 使用 `React.forwardRef<HTMLDivElement, SconeToolbarProps>`，ref 指向根布局容器。
- `children` 存在时渲染完全自定义内容；没有 `children` 时渲染 `start` / `end` 两侧布局。

### `src/components/layout/separator.tsx`

- `SconeSeparatorProps`
  - `orientation?: "horizontal" | "vertical"`，默认 `horizontal`。
  - `decorative?: boolean`，默认 `true`。
  - `className?: string`。
- `SconeSeparator` 基于 `src/components/ui/separator.tsx`，ref 指向 Radix/shadcn separator 根元素。

### `src/components/layout/scroll-area.tsx`

- `SconeScrollAreaProps`
  - `children?: React.ReactNode`。
  - `onScroll?: React.UIEventHandler<HTMLDivElement>`，绑定 viewport slot。
  - `className?: string`，作用于根容器。
  - `viewportClassName?: string`，作用于 viewport slot。
- `SconeScrollArea` 基于 `src/components/ui/scroll-area.tsx`，ref 指向根容器。
- 调用方必须通过父容器、`className` 或布局上下文提供明确高度来源。

### `src/components/layout/split-pane.tsx`

- `SconeSplitPaneSizePreset = "narrow" | "medium" | "wide" | "fill"`。
- `SconeSplitPaneProps`
  - `orientation?: "horizontal" | "vertical"`，默认 `horizontal`。
  - `defaultSizePreset?: "narrow" | "medium" | "wide"`，默认 `medium`。
  - `sizePreset?: SconeSplitPaneSizePreset`。
  - `onSizePresetChange?: (preset: SconeSplitPaneSizePreset) => void`。
  - `minSizePreset?: SconeSplitPaneSizePreset`，默认 `narrow`。
  - `maxSizePreset?: SconeSplitPaneSizePreset`，默认 `fill`。
  - `defaultSize?: string`，CSS 长度覆盖，必须带单位或百分比。
  - `size?: string`，受控 CSS 长度覆盖，必须带单位或百分比。
  - `onSizeChange?: (size: string) => void`，拖拽或键盘调整过程中触发。
  - `onSizeCommit?: (size: string) => void`，拖拽结束、键盘确认或键盘步进完成后触发。
  - `children?: React.ReactNode`，渲染两个面板；多余子项不生成额外业务区域。
  - `className?: string`。
- `SconeSplitPane` 使用 `React.forwardRef<HTMLDivElement, SconeSplitPaneProps>`，ref 指向 split 根容器。
- 内部 resize handle 必须有 `role="separator"`、`aria-orientation`、`aria-valuetext`，支持鼠标拖拽和键盘操作。

## Plan

1. 基础排列小任务，修改 4 个文件：
   - `src/components/layout/stack.tsx`
   - `src/components/layout/stack.test.tsx`
   - `src/components/layout/inline.tsx`
   - `src/components/layout/inline.test.tsx`
   - 前端行为：验证 Stack 垂直排列、Inline 水平排列、Inline `wrap` 换行、Inline `split` 插入到相邻子项之间且为装饰性节点。
2. 紧凑组合和工具栏小任务，修改 4 个文件：
   - `src/components/layout/compact.tsx`
   - `src/components/layout/compact.test.tsx`
   - `src/components/layout/toolbar.tsx`
   - `src/components/layout/toolbar.test.tsx`
   - 前端行为：验证 Compact 横向/纵向紧凑边界、`size="sm" | "md"` class 映射、Toolbar `start`/`end` 两侧布局、`children` 自定义内容优先、`density="compact" | "default"` 高度和间距映射、窄屏换行 class。
3. vendored shadcn 封装小任务，修改 4 个文件：
   - `src/components/layout/separator.tsx`
   - `src/components/layout/separator.test.tsx`
   - `src/components/layout/scroll-area.tsx`
   - `src/components/layout/scroll-area.test.tsx`
   - 前端行为：验证 Separator 横向/纵向、decorative 语义、ref；验证 ScrollArea 根容器 class、viewport class、viewport 滚动事件、局部滚动容器不会声明页面主滚动。
4. SplitPane 小任务，修改 2 个文件：
   - `src/components/layout/split-pane.tsx`
   - `src/components/layout/split-pane.test.tsx`
   - 前端行为：验证两个面板和中间 resize handle；用户可拖拽 handle 调整主面板尺寸；用户可聚焦 handle 后用键盘方向键调整尺寸；horizontal 使用左右方向键，vertical 使用上下方向键；触发 `onSizeChange` 和 `onSizeCommit`；handle 暴露 `role="separator"`、`aria-orientation`、`aria-valuetext`；无单位 CSS 长度覆盖被拒绝。
5. 公共入口小任务，修改 2 个文件：
   - `src/index.ts`
   - `src/index.test.ts`
   - 前端行为：无新增运行时 UI；验证库入口可以导入 `SconeStack`、`SconeInline`、`SconeCompact`、`SconeToolbar`、`SconeSeparator`、`SconeScrollArea`、`SconeSplitPane` 以及 `Scone*Props` / `SconeSplitPaneSizePreset` 类型。
6. 全局约束贯穿所有小任务：
   - 样式消费 `src/styles/theme.css` 暴露的语义 token 和现有 Tailwind 规则。
   - 组件根节点稳定接收 `className`；支持 `style` 的组件只限 Stack 和 Inline。
   - 不写产品色、业务文案、请求逻辑、权限逻辑或页面级滚动策略。

## Verification

- 运行 `pnpm test -- src/components/layout`，覆盖：
  - Stack/Inline/Compact/Toolbar 的 token gap、density、orientation、wrap、ref、className、style 透传。
  - Inline `split` 插入视觉分隔且不包裹业务状态。
  - Separator 的 `orientation`、`decorative` 和可访问语义。
  - ScrollArea 的 viewport slot、`viewportClassName`、根 ref、viewport `onScroll`。
  - SplitPane 的 preset、min/max、拖拽回调、键盘 resize、ARIA orientation、当前尺寸语义、CSS 长度单位校验。
- 运行 `pnpm test -- src/index.test.ts src/components/layout`，确认公共导出可被库入口消费。
- 运行 `pnpm typecheck`，确认 public props、ref 类型和导出类型通过 TypeScript。
- 运行 `pnpm lint`，确认无未使用导出、不可达分支或 React hooks 违规。

## Closure

Layout 闭环完成且验证通过后，删除本 RUNBOOK。若执行过程中产生仍有长期价值的结论，只能先沉淀到对应 SPEC、`docs/30-designs/admin-ui/*-DESIGN.md` 或 `docs/40-readiness/` 证据文档，再删除本临时 RUNBOOK。
