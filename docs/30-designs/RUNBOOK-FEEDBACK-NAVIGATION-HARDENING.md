# Feedback And Navigation Hardening Runbook

## Purpose

本 RUNBOOK 用于收口系统性代码审核中 Feedback / Overlay、Navigation 和 Admin Pattern 的明确 P1/P2/P3 问题。

目标是让相关源码行为、测试、SPEC、readiness 和 `Systematic Code Review 2026-07` 保持一致：已完全处理的问题从系统评审中删除；仍有剩余风险的问题在评审和 readiness 中保留精确描述。

## Scope

### Feedback Overlay Hardening

目标分支：`fix/feedback-overlay-hardening`

总范围：

- `src/components/feedback-overlay/*`
- `docs/10-specs/components/feedback-overlay/SCONE-ALERT.md`
- `docs/10-specs/components/feedback-overlay/SCONE-CONFIRM.md`
- `docs/10-specs/components/feedback-overlay/SCONE-PROGRESS.md`
- `docs/10-specs/components/feedback-overlay/SCONE-TOAST.md`
- `docs/40-readiness/IMPLEMENTATION-COVERAGE.md`
- `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`

完成目标：

- `SconeProgress` 对 invalid `max` 保持有限、稳定的 ARIA 和 indicator 百分比语义。
- `SconeConfirm` 捕获 async `onConfirm` rejection，不产生 unhandled promise rejection；失败时 dialog 保持打开、confirming 状态结束，并通过 `onError?: (error: unknown) => void` 通知调用方。
- `SconeToastProvider` 的 timer 不因无关 provider rerender 重置。
- `SconeAlert` 默认按 tone 映射 urgent / non-urgent 语义：`error`、`warning` 默认 `role="alert"`；`success`、`info`、`neutral` 默认 `role="status"`；调用方传入 `role` 时以显式值为准。
- `src/components/feedback-overlay/*` 内 `cn` import 路径统一到 `@/lib/cn`，不继续新增 `../../lib/utils` 路径。

### Navigation And Pattern Alignment

目标分支：`fix/navigation-pattern-alignment`

总范围：

- `src/components/navigation/*`
- `src/patterns/*`
- `docs/10-specs/components/navigation/SCONE-DROPDOWN.md`
- `docs/10-specs/components/navigation/SCONE-COMMAND.md`
- `docs/10-specs/components/navigation/SCONE-TABS.md`
- `docs/10-specs/components/navigation/SCONE-SEGMENTED.md`
- `docs/10-specs/patterns/APP-SHELL.md`
- `docs/10-specs/patterns/SECTION.md`
- `docs/10-specs/patterns/FILTER-BAR.md`
- `docs/40-readiness/IMPLEMENTATION-COVERAGE.md`
- `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`

完成目标：

- `SconeDropdown` 支持 outside close，并在 keyboard open 时提供正确的 initial focus。
- `SconeCommand` 在 filter 后保持 active item 指向可见且可用的候选项，filter 后 Enter 行为可预测。
- `SconeTabs` root 支持与同族组件一致的 root props / ref passthrough。
- `SconeSegmented` 的 keyboard focus 行为有测试锁定；如改变 focus 行为，同步实现和 SPEC。
- `AppShell` 不再暴露未兑现 callback 语义：移除 `AppShell.Sidebar` 的 `onCollapsedChange` 和 `AppShell.Aside` 的 `onOpenChange` 字段，SPEC / DESIGN 同步收窄为纯结构状态 props。
- `Section.Root` 实现 SPEC 已记录的 shorthand：新增 `title?: React.ReactNode`、`description?: React.ReactNode`、`actions?: React.ReactNode`，并复用现有 `Section.Header`、`Section.Title`、`Section.Description`、`Section.Actions` 语义。
- `FilterBar` 不保留不可见 search state；`defaultSearchValue` 与内置 search 控件的渲染和提交语义一致。
- readiness 明确“覆盖完成”只表示源码、导出和测试入口齐备，不等于无 remediation。

## Non-goals

- 不迁移 Combobox 或 DatePicker 的复杂 overlay 行为；这两个问题另行建项。
- 不调整 Form context public surface。
- 不重构公共导出分组。
- 不新增产品应用级 UI 规则、路由、请求、权限、业务字段或运行时假设。
- 不引入新的组件库依赖，除非目标文件已经依赖的 Radix / shadcn primitive 能直接替换手写交互。

## Plan

1. 创建并切换到目标实现分支，只处理该分支声明的范围。
2. 按下方小任务执行；每个小任务最多触及 2-5 个主要文件，避免把无关组件混入同一次判断。
3. 每个小任务先补用户可见行为或可访问语义测试，再改源码和 SPEC。
4. 小任务完成后运行对应最小验证；分支收口前运行完整验证。
5. 同步 `docs/40-readiness/IMPLEMENTATION-COVERAGE.md`，保留覆盖完成口径，同时列出仍未关闭的 remediation。
6. 同步 `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`：
    - 已完全处理的问题删除对应 finding 章节，并从 P1/P2/P3 索引、推荐执行顺序和相关评估文字中移除。
    - 部分处理的问题收窄为剩余问题，不保留已经解决的证据描述。
    - 新发现的风险只在有源码或测试证据时新增。
7. 删除本 RUNBOOK，或在两个目标分支都关闭前保留它作为临时执行入口。

## Task Breakdown

### Feedback Overlay: progress max and `cn` import

文件：

- `src/components/feedback-overlay/progress.tsx`
- `src/components/feedback-overlay/progress.test.tsx`
- `docs/10-specs/components/feedback-overlay/SCONE-PROGRESS.md`

数据结构变化：

- 不新增公共字段。
- `max?: number` 保持现有字段名；实现层将非有限值、小于等于 `0` 的值归一为可计算的有效上限。

前端控件和操作：

- 控件：progress root、progress indicator、可选 status text。
- 操作：传入 `max={0}`、`max={Number.NaN}`、`max={Infinity}`、`value` 超出范围时，indicator 不出现 `NaN`、`Infinity` 或非有限百分比；ARIA `aria-valuemax`、`aria-valuenow` 保持有限值。

完成判断：

- invalid `max` 不再产生非有限 transform、ARIA 或 status text。
- 对应 finding 从系统评审 Feedback status 章节删除或收窄。

### Feedback Overlay: confirm async rejection

文件：

- `src/components/feedback-overlay/confirm.tsx`
- `src/components/feedback-overlay/confirm.test.tsx`
- `docs/10-specs/components/feedback-overlay/SCONE-CONFIRM.md`

数据结构变化：

- `SconeConfirmProps` 新增字段：`onError?: (error: unknown) => void`。
- `onConfirm?: () => void | Promise<void>` 保持现有语义。
- `open?: boolean`、`defaultOpen?: boolean`、`onOpenChange?: (open: boolean) => void` 不改变字段名和控制模式。

前端控件和操作：

- 控件：confirm dialog、confirm button、cancel button。
- 操作：用户点击 confirm button 后，`onConfirm` 返回 rejected promise。
- 期望：dialog 保持打开；confirm button 从 busy/disabled 状态恢复；不触发未处理 rejection；调用 `onError(error)`；用户仍可点击 cancel button 或再次点击 confirm button。

完成判断：

- async rejection 测试覆盖 `onError`、open state、busy state 和 unhandled rejection 防护。
- 系统评审中 `Confirm can create unhandled promise rejections` finding 完全删除。

### Feedback Overlay: toast timer rerender stability

文件：

- `src/components/feedback-overlay/toast.tsx`
- `src/components/feedback-overlay/toast.test.tsx`
- `docs/10-specs/components/feedback-overlay/SCONE-TOAST.md`

数据结构变化：

- 不新增公共字段。
- `SconeToastProvider` 现有 `duration?: number`、`maxVisible?: number` 保持语义。

前端控件和操作：

- 控件：toast viewport、toast item、dismiss button。
- 操作：toast 已显示且未到期时，父组件或 provider 发生无关 rerender。
- 期望：已有 toast 的自动关闭时间不被重置；用户点击 dismiss button 仍按原有 close reason 工作。

完成判断：

- 测试使用 fake timers 覆盖 rerender 前后同一 toast 的到期时间。
- 系统评审中 `Toast timers reset on unrelated provider rerenders` finding 完全删除。

### Feedback Overlay: alert role semantics

文件：

- `src/components/feedback-overlay/alert.tsx`
- `src/components/feedback-overlay/alert.test.tsx`
- `docs/10-specs/components/feedback-overlay/SCONE-ALERT.md`

数据结构变化：

- 不新增专用字段。
- `role?: React.AriaRole` 继续来自 root HTML props；调用方显式传入 `role` 时覆盖默认 tone mapping。
- 默认 mapping：`tone="error"` 和 `tone="warning"` 使用 `role="alert"`；`tone="success"`、`tone="info"`、`tone="neutral"` 使用 `role="status"`。

前端控件和操作：

- 控件：alert root、title、description、action slot。
- 操作：渲染不同 `tone`，以及显式传入 `role="alert"` 或 `role="status"`。
- 期望：紧急 tone 以 assertive alert 暴露；非紧急 tone 以 status 暴露；显式 `role` 不被覆盖。

完成判断：

- 测试覆盖默认 role mapping 和 role override。
- 系统评审中 `Alert always announces as urgent` finding 完全删除。

### Navigation: dropdown outside close and keyboard initial focus

文件：

- `src/components/navigation/dropdown.tsx`
- `src/components/navigation/dropdown.test.tsx`
- `docs/10-specs/components/navigation/SCONE-DROPDOWN.md`

数据结构变化：

- 不新增公共字段。
- `open?: boolean`、`defaultOpen?: boolean`、`onOpenChange?: (open: boolean) => void` 保持控制模式。

前端控件和操作：

- 控件：dropdown trigger、menu、menu item、disabled menu item。
- 操作：用户点击 trigger 打开；点击菜单外部关闭；按 `Escape` 关闭并恢复 trigger focus；使用 keyboard 打开时首个 enabled menu item 获得 focus；disabled item 不获得 initial focus。
- 期望：outside pointer / focus 不留下可见菜单；keyboard open 后 Arrow / Enter 操作从首个 enabled item 开始。

完成判断：

- 优先用已有 Radix / shadcn dropdown primitive 替代手写 outside/focus 行为；如局部修复，必须覆盖 pointer outside、focus outside、Escape、keyboard open initial focus。
- 系统评审中 `Dropdown hand-rolls menu popover behavior without outside-click close` finding 删除或收窄为仍存在的手写复杂度风险。

### Navigation: command filtered active item

文件：

- `src/components/navigation/command.tsx`
- `src/components/navigation/command.test.tsx`
- `docs/10-specs/components/navigation/SCONE-COMMAND.md`

数据结构变化：

- 不新增公共字段。
- `selectedKey?: Key` 和 `onSelect?: (item: SconeCommandItem) => void` 保持现有语义。
- 内部 `activeKey` 在 `query` / filtered enabled items 变化后指向第一个可用结果；受控 selected state 不被内部覆盖。

前端控件和操作：

- 控件：command search input、option list、active option。
- 操作：用户输入搜索词过滤结果后，直接按 `Enter`。
- 期望：Enter 选择当前可见的第一个 enabled option；如果当前 active item 仍在过滤结果中，则保留 active item；disabled option 不成为 active target。

完成判断：

- 测试覆盖 filter 后直接 Enter、active item 仍可见时不跳动、全部结果 disabled 或 empty 时不误选。
- 系统评审中 `Command active item can become stale after filtering` finding 完全删除。

### Navigation: tabs root passthrough and segmented focus

文件：

- `src/components/navigation/tabs.tsx`
- `src/components/navigation/tabs.test.tsx`
- `src/components/navigation/segmented.tsx`
- `src/components/navigation/segmented.test.tsx`
- `docs/10-specs/components/navigation/SCONE-TABS.md`
- `docs/10-specs/components/navigation/SCONE-SEGMENTED.md`

数据结构变化：

- `SconeTabsRootProps` 扩展 `React.HTMLAttributes<HTMLDivElement>`，新增 root DOM passthrough 能力。
- `SconeTabs.Root` 改为 `React.forwardRef<HTMLDivElement, SconeTabsRootProps>`。
- `SconeSegmented` 不新增字段；如实现 roving focus，内部 arrow key 行为必须同步 focus 到新选项。

前端控件和操作：

- Tabs 控件：tabs root、tablist、tab、tabpanel。
- Tabs 操作：调用方传入 root `id`、`data-*`、`aria-label`、`className`、`ref`，应落到 root DOM。
- Segmented 控件：radiogroup root、radio option、disabled option。
- Segmented 操作：用户在 root 或 option 上按 ArrowLeft / ArrowRight / ArrowUp / ArrowDown。
- 期望：selection 和 focus 不分离；disabled option 被跳过；已有受控 / 非受控 selection 行为保持。

完成判断：

- Tabs passthrough 和 ref 测试通过。
- Segmented keyboard focus 测试锁定当前或修正后语义；如改行为，SPEC 同步。
- 系统评审中 Tabs / Segmented finding 删除或只保留未处理部分。

### Patterns: AppShell callbacks and Section shorthand

文件：

- `src/patterns/app-shell.tsx`
- `src/patterns/app-shell.test.tsx`
- `src/patterns/section.tsx`
- `src/patterns/section.test.tsx`
- `docs/10-specs/patterns/APP-SHELL.md`
- `docs/10-specs/patterns/SECTION.md`
- `docs/30-designs/admin-ui/PATTERN-DESIGN.md`

数据结构变化：

- 从 `AppShellSidebarProps` 移除字段：`onCollapsedChange?: (collapsed: boolean) => void`。
- 从 `AppShellAsideProps` 移除字段：`onOpenChange?: (open: boolean) => void`。
- `AppShell.Sidebar` 保留字段：`collapsed?: boolean`、`defaultCollapsed?: boolean`。
- `AppShell.Aside` 保留字段：`open?: boolean`、`defaultOpen?: boolean`。
- `SectionRootProps` 新增字段：`title?: React.ReactNode`、`description?: React.ReactNode`、`actions?: React.ReactNode`。

前端控件和操作：

- AppShell 控件：sidebar slot、aside slot、header slot、main slot。
- AppShell 操作：调用方传入 `collapsed` / `defaultCollapsed` 或 `open` / `defaultOpen` 控制可见状态；组件不渲染内置 toggle button，也不承诺内部触发 callback。
- Section 控件：section root、header、title、description、actions、content。
- Section 操作：调用方在 `Section.Root` 传入 `title`、`description`、`actions`，同时传入 children 内容。
- 期望：Root shorthand 自动渲染 header 区域；显式 children 中仍可手写 `Section.Header`；不把 Section 变成 card。

完成判断：

- AppShell docs 不再描述无法触发的 callbacks。
- Section Root shorthand 测试覆盖 title、description、actions、children 和显式 header 组合。
- 系统评审中 `AppShell exposes change callbacks that are never called` 和 `Section Root shorthand is specified but not implemented` findings 完全删除。

### Patterns: FilterBar hidden search state and readiness

文件：

- `src/patterns/filter-bar.tsx`
- `src/patterns/filter-bar.test.tsx`
- `docs/10-specs/patterns/FILTER-BAR.md`
- `docs/40-readiness/IMPLEMENTATION-COVERAGE.md`
- `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`

数据结构变化：

- 不新增公共字段。
- `defaultSearchValue?: string` 保持字段名。
- `shouldRenderSearch` 必须把 `defaultSearchValue` 视为 built-in search input 的渲染条件。

前端控件和操作：

- 控件：FilterBar search input、fields slot、actions slot、apply button。
- 操作：调用方只传入 `defaultSearchValue`，不传 `search`、`searchValue` 或 `onSearchChange`。
- 期望：search input 可见并显示 default value；用户修改 search input 后点击 apply，`onApply` 收到可见输入中的 search value；不会提交不可见 search state。

完成判断：

- FilterBar 测试覆盖 default-only search 可见性和 apply payload。
- `IMPLEMENTATION-COVERAGE.md` 明确 coverage completion 不等于无 remediation。
- 系统评审中 `FilterBar can keep hidden search state`、`Readiness says there is no pending implementation work despite verified audit findings`、`Pattern documentation includes behavior not implemented in source` 按完成情况删除或收窄。

## Verification

Feedback Overlay 目标分支最小验证：

- `pnpm test -- src/components/feedback-overlay/progress.test.tsx`
- `pnpm test -- src/components/feedback-overlay/confirm.test.tsx`
- `pnpm test -- src/components/feedback-overlay/toast.test.tsx`
- `pnpm test -- src/components/feedback-overlay/alert.test.tsx`
- `pnpm typecheck`

Navigation And Pattern 目标分支最小验证：

- `pnpm test -- src/components/navigation/dropdown.test.tsx`
- `pnpm test -- src/components/navigation/command.test.tsx`
- `pnpm test -- src/components/navigation/tabs.test.tsx`
- `pnpm test -- src/components/navigation/segmented.test.tsx`
- `pnpm test -- src/patterns/app-shell.test.tsx`
- `pnpm test -- src/patterns/section.test.tsx`
- `pnpm test -- src/patterns/filter-bar.test.tsx`
- `pnpm typecheck`

收口验证：

- `pnpm format:check`
- `pnpm lint`
- `pnpm test`
- `pnpm build`

## Closure

任务关闭时必须满足：

- 目标分支没有混入范围外源码或文档修改。
- 所有修改都有对应测试或明确的 docs-only 理由。
- `IMPLEMENTATION-COVERAGE.md` 不再把 coverage completion 表述为 no remediation。
- `SYSTEMATIC-CODE-REVIEW-2026-07.md` 中已经完全处理的 finding 章节已删除，未完全处理的 finding 已收窄。
- 本 RUNBOOK 已删除；仍有长期价值的结论已经迁移到 readiness 或治理文档。
