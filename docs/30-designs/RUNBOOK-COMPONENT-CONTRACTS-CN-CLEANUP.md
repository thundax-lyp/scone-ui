# RUNBOOK: Component Contracts And `cn` Cleanup

## Purpose

完成 `component-contracts-cn-cleanup`，把本轮系统性代码审核中仍保留的组件根节点契约和 `cn` 导入路径问题收口到最终状态。

最终状态：

- `SconeDescriptions` 的 root `ref`、root HTML attributes、`className` 和 `style` 全部落在同一个根容器；内部 `dl` 只持有响应式 columns 所需的 grid style。
- `SconeBadge` 的 root props、`ref`、`className` 和可访问属性全部落在同一个根元素；有 children 和无 children 两种渲染路径保持同一 root 契约。
- Layout primitive root 支持合理的 HTML attributes passthrough；根节点内部计算 style 不吞掉调用方 `style`。
- 所有剩余 `../../lib/utils`、`@/lib/utils` 和等价 `lib/utils` 导入统一到 `@/lib/cn`。
- `src/lib/utils.ts` 不再存在。
- 《Systematic Code Review 2026-07》中已经完全处理的问题章节被删除；如果仍有未处理项，只保留准确的剩余问题。

## Scope

源码范围：

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
- `src/components/layout/scroll-area.tsx`
- `src/components/layout/separator.tsx`
- `src/components/layout/split-pane.tsx`
- `src/components/ui/*.tsx`
- `src/components/feedback-overlay/*.tsx`
- `src/components/navigation/*.tsx`
- `src/components/media/*.tsx`

文档范围：

- `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`

## Non-goals

- 不新增产品应用级 UI policy，不从其他产品仓库迁移业务规则。
- 不扩大公共组件 API，不引入新的组件抽象。
- 不重写 shadcn/Radix primitive wrapper 的行为。
- 不把内部 slot marker 变成新的公共契约，除非现有测试已经明确依赖该行为。
- 不在本任务中处理 Form context public API、controlled `undefined`、input value plumbing、demo app test 等其他审核问题。

## Plan

### 1. 建立基线

相关文件：

- `src/lib/cn.ts`
- `src/lib/cn.test.ts`
- `src/lib/utils.ts`

执行：

- 运行 `rg "lib/utils|@/lib/utils|\\.\\./\\.\\./lib/utils" src`，记录所有仍指向 `src/lib/utils.ts` 的 import。
- 运行 `rg "from \\\"@/lib/cn\\\"|from '\\@/lib/cn'" src`，确认 `@/lib/cn` 已经是现有可用导入路径。
- 确认 `src/lib/utils.ts` 只承担 `cn` re-export；如果发现其他字段或函数，先停止并重新收窄任务。

完成条件：

- 已得到准确的 import 调用方清单。
- 已确认删除目标文件只涉及 `cn` helper，不涉及其他数据结构或工具函数。

### 2. Data Display Root Contract

小任务 2.1：`SconeDescriptions`

相关文件：

- `src/components/data-display/descriptions.tsx`
- `src/components/data-display/descriptions.test.tsx`

数据结构和字段要求：

- `SconeDescriptionsProps.title`：继续渲染为 root 内的标题文本，不转移到 `dl`。
- `SconeDescriptionsProps.items`：继续驱动内部 `dl` 的 `dt` / `dd` 列表。
- `SconeDescriptionsProps.columns`：只生成内部 `dl` 的 CSS custom properties：`--dd-columns`、`--dd-columns-sm`、`--dd-columns-md`、`--dd-columns-lg`、`--dd-columns-xl`。
- `SconeDescriptionsProps.bordered`：只影响 item wrapper 的 border class。
- `SconeDescriptionsProps.density`：只影响内部 `dl` gap/text size 和 item padding/gap。
- `SconeDescriptionsProps.className`：只作用于 root `div`。
- `SconeDescriptionsProps.style`：只作用于 root `div`。
- root HTML attributes：`id`、`data-*`、`aria-*`、`role` 必须透传到 root `div`。
- `ref`：必须指向 root `div`。

前端元素和操作要求：

- root 控件是外层 `div`，用于承载调用方属性。
- 内部 `dl` 只负责 descriptions grid。
- 操作级验证：渲染带 `style`、`className`、`data-*` 和 responsive `columns` 的组件，检查 root 和 `dl` 的职责没有互相吞并。

小任务 2.2：`SconeBadge`

相关文件：

- `src/components/data-display/badge.tsx`
- `src/components/data-display/badge.test.tsx`

数据结构和字段要求：

- `SconeBadgeProps.count`：只影响 indicator 文本。
- `SconeBadgeProps.dot`：只影响 indicator 是否显示点状视觉。
- `SconeBadgeProps.tone`：只影响 indicator tone class。
- `SconeBadgeProps.overflow`：只影响 count 格式化结果。
- `SconeBadgeProps.ariaLabel`：只作用于 indicator 的 `aria-label`。
- `SconeBadgeProps.children`：决定是否渲染被标记内容，但不改变 root props 归属。
- `SconeBadgeProps.className`：只作用于 root `span`。
- root HTML attributes：`id`、`style`、`data-*`、`aria-*`、`role` 必须透传到 forwarded-ref 指向的 root `span`。
- `ref`：children path 和 standalone path 都必须指向 root `span`。

前端元素和操作要求：

- root 控件是外层 `span`。
- indicator 控件是内部展示角标的 `span`。
- children path 操作级验证：渲染带 children 的 Badge，检查 root 接收 `style`、`className`、`data-*`，indicator 仍覆盖在 children 右上角。
- standalone path 操作级验证：渲染无 children 的 Badge，检查 root 接收 `style`、`className`、`data-*`，indicator 文本或 dot 正常显示。

完成条件：

- 两个组件的 root props、`ref`、`className`、`style` 和内部展示元素职责清晰分离。
- 相关测试锁住字段归属，不依赖无关内部 slot marker。

### 3. Layout Root Contract

小任务 3.1：基础 layout primitives

相关文件：

- `src/components/layout/stack.tsx`
- `src/components/layout/stack.test.tsx`
- `src/components/layout/inline.tsx`
- `src/components/layout/inline.test.tsx`

数据结构和字段要求：

- `SconeStackProps.gap`：只影响 root 的 gap class 和 `data-gap`。
- `SconeStackProps.align`：只影响 root 的 align class 和 `data-align`。
- `SconeInlineProps.gap`：只影响 root 的 gap class 和 `data-gap`。
- `SconeInlineProps.align`：只影响 root 的 align class 和 `data-align`。
- `SconeInlineProps.wrap`：只影响 root 的 wrap class 和 `data-wrap`。
- `SconeInlineProps.split`：只渲染内部隐藏 separator，不影响 root props。
- root HTML attributes：`id`、`style`、`data-*`、`aria-*`、`role` 必须透传到 root `div`。
- `ref`：必须指向 root `div`。

前端元素和操作要求：

- Stack 控件是纵向排列的 root `div`。
- Inline 控件是横向排列的 root `div`。
- Inline split 操作级验证：渲染三个 child 和 `split`，确认 split separator 被插入 child 之间且 root attrs 仍在 root。

小任务 3.2：组合 layout primitives

相关文件：

- `src/components/layout/compact.tsx`
- `src/components/layout/compact.test.tsx`
- `src/components/layout/toolbar.tsx`
- `src/components/layout/toolbar.test.tsx`

数据结构和字段要求：

- `SconeCompactProps.orientation`：只影响 root orientation class 和 `data-orientation`。
- `SconeCompactProps.size`：只影响 root child size class 和 `data-size`。
- `SconeToolbarProps.start`：只渲染到 start slot。
- `SconeToolbarProps.end`：只渲染到 end slot。
- `SconeToolbarProps.density`：只影响 root density class 和 `data-density`。
- `SconeToolbarProps.children`：存在时替代 start/end slot 渲染，不改变 root props 归属。
- root HTML attributes：`id`、`style`、`data-*`、`aria-*`、`role` 必须透传到 root `div`。
- `ref`：必须指向 root `div`。

前端元素和操作要求：

- Compact 控件是包裹相邻控件的 root `div`。
- Toolbar 控件是 root `div`，包含 start slot 和 end slot。
- Toolbar 操作级验证：分别渲染 start/end 和 children override，确认 root attrs 不进入 slot。

小任务 3.3：Radix layout wrappers

相关文件：

- `src/components/layout/scroll-area.tsx`
- `src/components/layout/separator.tsx`
- 需要新增或调整时使用同目录已有测试文件。

数据结构和字段要求：

- `SconeScrollAreaProps.className`：只作用于 Radix root。
- `SconeScrollAreaProps.viewportClassName`：只作用于 Radix viewport。
- `SconeScrollAreaProps.onScroll`：只绑定到 viewport。
- `SconeScrollAreaProps.children`：只渲染到 viewport 内。
- ScrollArea root HTML attributes：除 `onScroll` 外的 Radix root props 必须透传到 root。
- `SconeSeparatorProps.orientation`：只传给 Radix separator root。
- `SconeSeparatorProps.decorative`：只传给 Radix separator root。
- `SconeSeparatorProps.className`：只作用于 Radix separator root。
- Separator root HTML attributes：`id`、`style`、`data-*`、`aria-*` 必须透传到 root。

前端元素和操作要求：

- ScrollArea root 控件是 Radix root；滚动操作发生在 viewport。
- 操作级验证：触发 viewport scroll，确认调用 `onScroll`；检查 root `data-*` 不进入 viewport。
- Separator 控件是单一 Radix root；验证 horizontal 和 vertical 两种方向。

小任务 3.4：SplitPane root attributes

相关文件：

- `src/components/layout/split-pane.tsx`
- 需要新增或调整时使用同目录已有测试文件。

数据结构和字段要求：

- `SconeSplitPaneProps` 扩展 root `div` HTML attributes，但需要排除与自有字段冲突的字段。
- `SconeSplitPaneProps.orientation`：只影响 root `data-orientation`、grid 方向和 handle `aria-orientation`。
- `SconeSplitPaneProps.defaultSizePreset`：只用于 uncontrolled 初始 size。
- `SconeSplitPaneProps.sizePreset`：只用于 controlled preset size 和 root `data-size-preset`。
- `SconeSplitPaneProps.onSizePresetChange`：只在 keyboard resize 切换为 `"fill"` 时触发。
- `SconeSplitPaneProps.minSizePreset`：只影响 resize bounds 和 root `data-min-size-preset`。
- `SconeSplitPaneProps.maxSizePreset`：只影响 resize bounds 和 root `data-max-size-preset`。
- `SconeSplitPaneProps.defaultSize`：只用于 uncontrolled 初始 CSS length。
- `SconeSplitPaneProps.size`：只用于 controlled CSS length。
- `SconeSplitPaneProps.onSizeChange`：pointer move 和 keyboard resize 时触发。
- `SconeSplitPaneProps.onSizeCommit`：pointer up 和 keyboard resize commit 时触发。
- `SconeSplitPaneProps.children`：第一个 child 渲染到 primary panel，第二个 child 渲染到 secondary panel。
- `SconeSplitPaneProps.className`：只作用于 root `div`。
- `SconeSplitPaneProps.style`：合并到 root `div`；调用方 style 可以补充其他样式，但不得覆盖内部生成的 `gridTemplateColumns` 或 `gridTemplateRows`。
- root HTML attributes：`id`、`data-*`、`aria-*`、`role` 必须透传到 root `div`。
- `ref`：必须指向 root `div`。

前端元素和操作要求：

- root 控件是 grid `div`。
- primary panel 控件承载第一个 child。
- handle 控件是 `button`，`role="separator"`，支持 pointer drag 和 Arrow 键 resize。
- secondary panel 控件承载第二个 child。
- 操作级验证：渲染 horizontal 和 vertical；验证 root `style` 合并后 grid template 仍由组件控制；触发 Arrow 键确认 `onSizeChange`、`onSizeCommit` 和 `onSizePresetChange`。

完成条件：

- 每个 layout primitive 的 root attrs passthrough 都有源码和测试对应。
- `SconeSplitPane` 没有因为开放 HTML attrs 而允许调用方破坏核心 grid 布局。

### 4. `cn` Import Cleanup

小任务 4.1：layout import cleanup

相关文件：

- `src/components/layout/scroll-area.tsx`
- `src/components/layout/separator.tsx`
- `src/components/layout/split-pane.tsx`

执行：

- 将 `../../lib/utils` 改为 `@/lib/cn`。
- 不改变组件行为。

小任务 4.2：ui import cleanup

相关文件：

- `src/components/ui/accordion.tsx`
- `src/components/ui/alert-dialog.tsx`
- `src/components/ui/alert.tsx`
- `src/components/ui/avatar.tsx`
- `src/components/ui/breadcrumb.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/checkbox.tsx`
- `src/components/ui/command.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/ui/dropdown-menu.tsx`
- `src/components/ui/input-group.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/popover.tsx`
- `src/components/ui/progress.tsx`
- `src/components/ui/radio-group.tsx`
- `src/components/ui/scroll-area.tsx`
- `src/components/ui/select.tsx`
- `src/components/ui/separator.tsx`
- `src/components/ui/sheet.tsx`
- `src/components/ui/slider.tsx`
- `src/components/ui/switch.tsx`
- `src/components/ui/table.tsx`
- `src/components/ui/tabs.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/tooltip.tsx`

执行：

- 将 `@/lib/utils` 改为 `@/lib/cn`。
- 每次编辑控制在 2-5 个文件；按文件名顺序分批处理，避免机械大改难以审核。
- 不修改 shadcn/Radix wrapper 的 DOM 结构、className 内容或 export。

小任务 4.3：navigation import cleanup

相关文件：

- `src/components/navigation/accordion.tsx`
- `src/components/navigation/breadcrumb.tsx`
- `src/components/navigation/collapsible.tsx`
- `src/components/navigation/command.tsx`
- `src/components/navigation/dropdown.tsx`
- `src/components/navigation/menu.tsx`
- `src/components/navigation/segmented.tsx`
- `src/components/navigation/tabs.tsx`
- `src/components/navigation/tooltip.tsx`
- `src/components/navigation/tree.tsx`

执行：

- 将 `@/lib/utils` 改为 `@/lib/cn`。
- 每次编辑控制在 2-5 个文件；按文件名顺序分批处理。
- 不改变菜单、tabs、tree、tooltip 的交互行为。

小任务 4.4：media import cleanup

相关文件：

- `src/components/media/avatar.tsx`
- `src/components/media/image.tsx`

执行：

- 将 `@/lib/utils` 改为 `@/lib/cn`。
- 不改变 image loading、fallback、avatar group 或 avatar fallback 行为。

小任务 4.5：feedback-overlay import cleanup

相关文件：

- `src/components/feedback-overlay/alert.tsx`
- `src/components/feedback-overlay/confirm.tsx`
- `src/components/feedback-overlay/dialog.tsx`
- `src/components/feedback-overlay/drawer.tsx`
- `src/components/feedback-overlay/empty.tsx`
- `src/components/feedback-overlay/loading.tsx`
- `src/components/feedback-overlay/notification.tsx`
- `src/components/feedback-overlay/progress.tsx`
- `src/components/feedback-overlay/toast.tsx`

执行：

- 先运行 `rg "lib/utils|@/lib/utils|\\.\\./\\.\\./lib/utils" src/components/feedback-overlay`。
- 只修改实际命中的文件；如果没有命中，不制造无意义 diff。
- 每次编辑控制在 2-5 个文件。

小任务 4.6：删除 re-export

相关文件：

- `src/lib/utils.ts`

执行：

- 在 `rg "lib/utils|@/lib/utils|\\.\\./\\.\\./lib/utils" src` 无结果后删除 `src/lib/utils.ts`。
- 确认 `src/lib/cn.ts` 是唯一 `cn` 定义来源。

完成条件：

- `rg "lib/utils|@/lib/utils|\\.\\./\\.\\./lib/utils" src` 没有结果。
- `test ! -f src/lib/utils.ts` 通过。

### 5. Readiness Report Sync

相关文件：

- `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`

执行：

- 如果 Descriptions root style 已完全处理，删除 P2 索引里的 `Descriptions style prop is applied to an internal dl, not the root.` 和对应问题章节。
- 如果 Badge root props 已完全处理，删除 P2 索引里的 `Badge root props do not target the same element as the forwarded ref.` 和对应问题章节。
- 如果 Layout primitive props 已完全处理，删除 P2 索引里的 `Layout primitive props are narrower than neighboring root components.` 和对应问题章节。
- 如果 `cn` import path 已完全处理，删除 P3 索引里的 `` `cn` import path is inconsistent.`` 和对应问题章节。
- 如果某项仍有剩余范围，只保留准确位置、证据和建议；不得保留已经处理的历史描述。

完成条件：

- 审核报告只记录当前仍成立的问题。
- 已完全处理的问题不再作为章节或索引项出现。

### 6. Runbook Closure

相关文件：

- `docs/30-designs/RUNBOOK-COMPONENT-CONTRACTS-CN-CLEANUP.md`

执行：

- 任务关闭前删除本文件。
- 如果产生长期验证证据，写入 `docs/40-readiness/` 的对应 readiness 文档，而不是保留在 runbook。

## Verification

实施后运行：

- `pnpm test -- src/lib/cn.test.ts src/components/data-display/descriptions.test.tsx src/components/data-display/badge.test.tsx src/components/layout/stack.test.tsx src/components/layout/inline.test.tsx src/components/layout/compact.test.tsx src/components/layout/toolbar.test.tsx`
- `pnpm test`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`

实施后检查：

- `rg "lib/utils|@/lib/utils|\\.\\./\\.\\./lib/utils" src` 必须没有结果。
- `test ! -f src/lib/utils.ts` 必须通过。
- `git diff --stat` 只包含本 runbook 范围内的源码、测试和审核报告更新。

## Closure

本 RUNBOOK 是临时执行手册。完成 `component-contracts-cn-cleanup` 后：

- 删除本文件。
- 将最终验证证据保留在 `docs/40-readiness/`。
- 从 `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md` 删除已经完全处理的问题章节；不要把已完成问题保留为历史 TODO。
