# Foundation Component Contracts Runbook

## Purpose

收口基础契约与小型组件 API，使 Tailwind token 配置、Data Display 原子组件、Layout primitives 和 `cn` 入口保持一致、可预期、可测试。

本次完成后的目标状态：

- `tailwind.config.ts` 不再引用已经从 `src/styles/theme.css` 移除或更名的 `--scone-*` token。
- `SconeDescriptions` 的 root HTML attributes、`className`、`style` 和 forwarded `ref` 都归属于外层 root；内部 `<dl>` 只承载列布局需要的私有样式。
- `SconeBadge` 的 root props、root `className` 和 forwarded `ref` 指向同一个 root element；indicator 相关样式有清晰归属。
- `SconeStack`、`SconeInline`、`SconeCompact`、`SconeToolbar` 支持常规 root HTML attributes、`aria-*`、`data-*`、`style`、`className` 和 ref passthrough。
- 本次触及文件统一从 `@/lib/cn` 导入 `cn`；当全仓库不再引用 `src/lib/utils.ts` 时删除该 re-export。
- `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md` 删除已经完全处理的问题章节，并保留仍未处理的问题。

## Scope

本 RUNBOOK 的源代码范围只覆盖下列文件；未列出的源码文件不应为完成本任务而修改。

- `tailwind.config.ts`
- `src/styles/theme.test.ts`
- `src/lib/cn.ts`
- `src/lib/cn.test.ts`
- `src/lib/utils.ts`
- `src/components/data-display/descriptions.tsx`
- `src/components/data-display/descriptions.test.tsx`
- `src/components/data-display/badge.tsx`
- `src/components/data-display/badge.test.tsx`
- `src/components/layout/stack.tsx`
- `src/components/layout/stack.test.tsx`
- `src/components/layout/inline.tsx`
- `src/components/layout/inline.test.tsx`
- `src/components/layout/compact.tsx`
- `src/components/layout/compact.test.tsx`
- `src/components/layout/toolbar.tsx`
- `src/components/layout/toolbar.test.tsx`
- `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`

只读对照文件：

- `src/styles/theme.css`
- `src/styles.css`
- `src/index.ts`
- `src/index.test.ts`

## Non-goals

- 不处理复杂交互组件：Combobox、DatePicker、Dropdown、Toast、Command、Confirm、NumberInput、Progress。
- 不处理 Pattern API：AppShell callbacks、Section Root shorthand、FilterBar hidden search state。
- 不修改组件视觉规范、设计 token 语义或公共组件命名。
- 不引入产品应用级 UI 规则、业务工作流、请求契约或运行时假设。
- 不为了删除 `src/lib/utils.ts` 扩大到无关文件；只有本次范围内引用全部收口且无剩余调用时才删除。

## API And Data Structure Changes

### Tailwind Token Config

目标字段：

- `theme.extend.fontFamily.body`、`label`、`title`、`mono`
- `theme.extend.fontSize.body`、`label`、`title`
- `theme.extend.transitionDuration.fast`、`DEFAULT`
- `theme.extend.transitionTimingFunction.standard`
- `theme.extend.zIndex.sticky`、`dropdown`、`popover`、`drawer`、`modal`、`toast`

处理规则：

- 若字段仍需要保留，值必须改为 `src/styles/theme.css` 中存在的当前 token 名称。
- 若字段已由 `src/styles.css` 的 Tailwind v4 `@theme inline` 映射覆盖，删除对应 stale extension。
- 不新增新的 `--scone-*` token 名称。

### `SconeDescriptions`

现有 public data shape 保持不变：

- `SconeDescriptionItem.key`
- `SconeDescriptionItem.label`
- `SconeDescriptionItem.value`
- `SconeDescriptionItem.span`
- `SconeDescriptionItem.emptyFallback`
- `SconeDescriptionsProps.title`
- `SconeDescriptionsProps.items`
- `SconeDescriptionsProps.columns`
- `SconeDescriptionsProps.bordered`
- `SconeDescriptionsProps.density`
- inherited root fields from `React.HTMLAttributes<HTMLDivElement>` except `title` and `children`

契约变更：

- `SconeDescriptionsProps.style` 必须应用到 outer root `<div>`。
- `SconeDescriptionsProps.className` 必须应用到 outer root `<div>`。
- `ref` 必须指向 outer root `<div>`。
- `id`、`role`、`aria-*`、`data-*` 和其他 root div attributes 必须 spread 到 outer root `<div>`。
- internal `<dl>` 只接收 columns 生成的 CSS variables：`--dd-columns`、`--dd-columns-sm`、`--dd-columns-md`、`--dd-columns-lg`、`--dd-columns-xl`。
- `getColumnsStyle` 不再合并 caller `style`；若保留该 helper，参数应只表达 `columns`。

### `SconeBadge`

现有 public fields 保持不增不删：

- `count`
- `dot`
- `tone`
- `overflow`
- `ariaLabel`
- `children`
- inherited root fields from `React.HTMLAttributes<HTMLSpanElement>`

契约变更：

- `className` 必须应用到 root `<span>`，不再应用到 indicator `<span>`。
- `ref` 必须指向同一个 root `<span>`。
- `id`、`role`、`aria-*`、`data-*`、`style`、event handlers 和其他 span attributes 必须 spread 到 root `<span>`。
- indicator `<span>` 只承载 badge 视觉和可访问性字段：`aria-label={ariaLabel}`、`aria-hidden={ariaLabel ? undefined : true}`、tone class、dot/count size class、formatted count text。
- children 分支中，root `<span>` 保留 positioning wrapper 职责；absolute wrapper 只负责把 indicator 定位到右上角。
- 暂不新增 `indicatorClassName`；若未来确实需要 indicator 级扩展，应单独设计，不复用 root `className`。

### Layout Primitives

目标 public prop shape：

- `SconeStackProps` extends `React.HTMLAttributes<HTMLDivElement>`，并保留 `gap?: SconeSpacingToken`、`align?: "start" | "center" | "end" | "stretch"`。
- `SconeInlineProps` extends `React.HTMLAttributes<HTMLDivElement>`，并保留 `gap?: SconeSpacingToken`、`align?: "start" | "center" | "end" | "baseline"`、`wrap?: boolean`、`split?: React.ReactNode`。
- `SconeCompactProps` extends `React.HTMLAttributes<HTMLDivElement>`，并保留 `orientation?: "horizontal" | "vertical"`、`size?: "sm" | "md"`。
- `SconeToolbarProps` extends `React.HTMLAttributes<HTMLDivElement>`，并保留 `start?: React.ReactNode`、`end?: React.ReactNode`、`children?: React.ReactNode`、`density?: "compact" | "default"`。

契约变更：

- `className`、`style`、`id`、`role`、`aria-*`、`data-*`、event handlers 和其他 div attributes 必须 spread 到 root `<div>`。
- 自有 data attributes 仍由组件维护：`data-scone-layout`、`data-gap`、`data-align`、`data-wrap`、`data-orientation`、`data-size`、`data-density`。
- 若 caller 传入与组件自有 data attributes 同名的字段，组件自有字段优先，避免外部覆盖内部状态标记。
- `SconeInline` 的 `split` 仍渲染为 `aria-hidden="true"` 的 separator `<span data-scone-inline-split="">`，不改变键盘或屏幕阅读器行为。
- `SconeToolbar` 的 `start` / `end` slot 结构不变；当 `children` 存在时继续优先渲染 `children`。

### `cn` Import And Legacy Re-export

目标：

- 本次触及的源码文件统一 `import { cn } from "@/lib/cn"`。
- `src/lib/utils.ts` 只有在 `rg "lib/utils|@/lib/utils|\\.\\./\\.\\./lib/utils" src` 无剩余调用时删除。
- 若 `src/lib/utils.ts` 仍保留，`src/lib/cn.test.ts` 中 legacy utils 兼容测试也保留。
- 若 `src/lib/utils.ts` 删除，`src/lib/cn.test.ts` 同步删除 legacy utils 兼容断言。
- `src/index.ts` 继续从 `./lib/cn` 导出 `cn`。

## Task Breakdown

### Task 1: Tailwind Token Config

文件：

- `tailwind.config.ts`
- `src/styles/theme.test.ts`
- `src/styles/theme.css` 只读对照
- `src/styles.css` 只读对照

操作：

1. 对照 `src/styles/theme.css` 和 `src/styles.css`，处理 `fontFamily`、`fontSize`、`transitionDuration`、`transitionTimingFunction`、`zIndex` 中的 stale variable。
2. 不新增组件样式、不改变 CSS 视觉 token 语义。
3. 更新或保留 `src/styles/theme.test.ts` 中的 token 守护，确保 stale token 名称不会重新进入配置。

验收：

- `rg "scone-font-family|scone-font-size|scone-motion|scone-z-index" tailwind.config.ts src` 无命中。
- `pnpm test -- src/styles/theme.test.ts` 通过。

### Task 2: Descriptions Root Contract

文件：

- `src/components/data-display/descriptions.tsx`
- `src/components/data-display/descriptions.test.tsx`

控件和操作：

- 控件：`SconeDescriptions` root `<div>`、title `<div>`、internal `<dl>`、item `<dt>/<dd>`。
- 操作：消费者给 `SconeDescriptions` 传入 `style`、`className`、`id`、`role`、`aria-label`、`data-testid`、`ref`。

实现目标：

1. root `<div>` 接收 caller `style`、`className`、rest root attrs 和 ref。
2. internal `<dl>` 只接收 columns CSS variables，不继承 caller root style。
3. title、item、fallback、bordered、density、responsive columns 渲染行为不变。

验收：

- 测试能区分 root style 和 `<dl>` columns style。
- `ref.current` 指向 root `<div>`。
- root 上能读到 `id`、`role`、`aria-*` 或 `data-*`。

### Task 3: Badge Root Contract

文件：

- `src/components/data-display/badge.tsx`
- `src/components/data-display/badge.test.tsx`

控件和操作：

- 控件：`SconeBadge` root `<span>`、indicator `<span>`、children wrapper、absolute indicator wrapper。
- 操作：消费者给 `SconeBadge` 传入 `className`、`style`、`id`、`role`、`aria-label`、`data-testid`、`onClick`、`ref`，并分别测试 no-children、children、dot、count overflow。

实现目标：

1. root props、root `className` 和 ref 指向同一个 root `<span>`。
2. indicator 保留 count/dot/tone/overflow/`ariaLabel` 的视觉和可访问性行为。
3. `children` 模式下，children 内容和 indicator 定位不变。

验收：

- root 上能读到 caller `className`、`style`、`data-*` 和事件处理。
- indicator 上保留 `aria-label` / `aria-hidden`、tone class 和 formatted count。
- no-children 与 children 两种渲染路径都覆盖。

### Task 4: Layout Root Passthrough

文件：

- `src/components/layout/stack.tsx`
- `src/components/layout/inline.tsx`
- `src/components/layout/compact.tsx`
- `src/components/layout/toolbar.tsx`
- 对应测试按组件拆在 `stack.test.tsx`、`inline.test.tsx`、`compact.test.tsx`、`toolbar.test.tsx`

控件和操作：

- 控件：`SconeStack` root `<div>`、`SconeInline` root `<div>`、`SconeInline` split `<span>`、`SconeCompact` root `<div>`、`SconeToolbar` root `<div>`、toolbar start/end slot `<div>`。
- 操作：消费者传入 `id`、`role`、`aria-label`、`data-testid`、`style`、`className`、`onClick`、`ref`。

实现目标：

1. 四个 root `<div>` 都接收 rest root attrs、style、className 和 ref。
2. 自有 layout data attributes 继续准确反映 props 状态。
3. `SconeInline` split 和 `SconeToolbar` start/end slot DOM 不改变语义。

验收：

- 每个组件至少有一个测试覆盖 root passthrough。
- `data-scone-layout` 等内部 data attributes 不被 caller 覆盖。
- 原有 gap、align、wrap、orientation、size、density、slot 渲染测试继续通过。

### Task 5: Import Cleanup And Review Closure

文件：

- `src/components/layout/stack.tsx`
- `src/components/layout/inline.tsx`
- `src/components/layout/compact.tsx`
- `src/components/layout/toolbar.tsx`
- `src/lib/utils.ts`
- `src/lib/cn.test.ts`
- `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`

操作：

1. 本次触及的 layout 文件统一从 `@/lib/cn` 导入 `cn`。
2. 运行 `rg "lib/utils|@/lib/utils|\\.\\./\\.\\./lib/utils" src`。
3. 若仍有 feedback-overlay 或其他非本次范围调用，保留 `src/lib/utils.ts` 和 `src/lib/cn.test.ts` 的 legacy utils 测试。
4. 若没有剩余调用，删除 `src/lib/utils.ts`，并删除 `src/lib/cn.test.ts` 中的 legacy utils 兼容断言。
5. 实现和验证完成后，同步 `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`：删除已完全处理的问题章节、索引条目和建议执行顺序中的对应条目；未完全处理的问题保留。

验收：

- 本次触及源码不再从 `../../lib/utils` 导入 `cn`。
- review 文档只反映最终状态，不写“处理中”“已计划”等中间状态。

## Verification

- `pnpm test -- src/styles/theme.test.ts src/components/data-display/descriptions.test.tsx src/components/data-display/badge.test.tsx src/components/layout/stack.test.tsx src/components/layout/inline.test.tsx src/components/layout/compact.test.tsx src/components/layout/toolbar.test.tsx src/lib/cn.test.ts`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm format:check`
- `rg "scone-font-family|scone-font-size|scone-motion|scone-z-index" tailwind.config.ts src`
- `rg "lib/utils|@/lib/utils|\\.\\./\\.\\./lib/utils" src`

若删除 `src/lib/utils.ts`，还需要确认 `src/index.ts` 仍从 `src/lib/cn.ts` 暴露 `cn`，且 `src/index.test.ts` 的 public export guard 仍通过。

## Closure

实现和验证完成后删除本 RUNBOOK，并从 `docs/30-designs/README.md` 的 Active Runbooks 移除链接。

收口时同步 `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`：

- 已完全处理的 finding 章节必须删除。
- 问题清单索引、建议优先级和执行顺序中对应条目必须删除或收窄。
- 仍未处理或只部分处理的问题不得删除。
- 不在 review 文档中记录“处理中”“计划处理”等中间状态。
