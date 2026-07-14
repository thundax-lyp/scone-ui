# SplitPane Bounds Cleanup Runbook

## Purpose

修复 `SconeSplitPane` 的 resize 合约：兑现 `minSizePreset` / `maxSizePreset` 对 pointer resize 与 keyboard resize 的边界约束，并补齐 active drag 期间组件卸载时的全局 pointer listener cleanup。

本任务完成后，同步清理《Systematic Code Review 2026-07》中已完全处理的 SplitPane 问题章节，不保留已关闭问题作为中间状态。

## Scope

- `src/components/layout/split-pane.tsx`
- `src/components/layout/split-pane.test.tsx`
- `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`
- `docs/30-designs/README.md`
- `docs/30-designs/RUNBOOK-SPLIT-PANE-BOUNDS-CLEANUP.md`

## Non-goals

- 不调整 `SconeSplitPane` 的视觉样式、DOM 结构或公开组件名。
- 不新增产品应用级 layout 规则。
- 不扩展 `SplitPane` 到多分栏、嵌套 splitter 或复杂约束表达式。
- 不改动非 `SplitPane` 组件、非相关测试和无关 readiness 章节。
- 不迁移 `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md` 中未处理的问题。

## Contract Details

### Public Props

保留并兑现现有公开字段，不删除 props：

- `minSizePreset?: SconeSplitPaneSizePreset`
  - 默认值：`"narrow"`
  - 作用：resize 后 primary panel size 的最小像素边界。
- `maxSizePreset?: SconeSplitPaneSizePreset`
  - 默认值：`"fill"`
  - 作用：resize 后 primary panel size 的最大像素边界。
- `size?: string`
  - 受控 size。组件不写内部 state，但 `onSizeChange` / `onSizeCommit` 必须汇报 clamp 后的 next size。
- `sizePreset?: SconeSplitPaneSizePreset`
  - 受控 preset。组件不写内部 state，但 resize 操作仍按 `minSizePreset` / `maxSizePreset` 计算 next size。
- `onSizeChange?: (size: string) => void`
  - pointer move、pointer up、keyboard resize 均传入 clamp 后的 size。
- `onSizeCommit?: (size: string) => void`
  - pointer up 和 keyboard resize 传入 clamp 后的 size。
- `onSizePresetChange?: (preset: SconeSplitPaneSizePreset) => void`
  - keyboard resize 继续沿用现有行为：有效 arrow key 后调用 `onSizePresetChange("fill")`。

### Internal Data Shape

在 `src/components/layout/split-pane.tsx` 中集中表达以下数据和 helper：

- `presetPixels: Record<SconeSplitPaneSizePreset, number>`
  - 保持现有字段：`narrow`、`medium`、`wide`、`fill`。
  - 作为 `minSizePreset` / `maxSizePreset` 的唯一像素边界来源。
- `SconeSplitPaneSizeBounds`
  - 建议新增内部类型，字段精确为：
    - `minPixels: number`
    - `maxPixels: number`
- `resolveSizeBounds(minSizePreset, maxSizePreset): SconeSplitPaneSizeBounds`
  - 从 `presetPixels[minSizePreset]` 和 `presetPixels[maxSizePreset]` 得到边界。
  - 如果调用方传入反向边界，应给出稳定处理：建议将有效下限设为较小值、有效上限设为较大值，避免 resize 进入不可操作状态。
- `clampSizePixels(value, bounds): number`
  - 输入 pointer 或 keyboard 计算出的像素值。
  - 输出 `Math.round(value)` 后落在 `[bounds.minPixels, bounds.maxPixels]` 内的 number。
- `formatPixelSize(value): string`
  - 输出 `${value}px`，供 pointer、keyboard、callback 和 `aria-valuetext` 统一使用。
- `activeDragCleanupRef: React.MutableRefObject<(() => void) | null>`
  - 保存当前 active drag 注册到 `window` 的 cleanup 函数。
  - `pointerup` 和组件 unmount 都必须调用并清空。

## Frontend Interaction Contract

- 控件：`button[role="separator"][data-scone-split-pane-handle]`。
- 水平布局：
  - 用户按住 separator handle 后左右拖动。
  - `pointermove.clientX - rootRect.left` 得到候选像素值。
  - `ArrowLeft` 让 primary panel 减少 `16px`。
  - `ArrowRight` 让 primary panel 增加 `16px`。
- 垂直布局：
  - 用户按住 separator handle 后上下拖动。
  - `pointermove.clientY - rootRect.top` 得到候选像素值。
  - `ArrowUp` 让 primary panel 减少 `16px`。
  - `ArrowDown` 让 primary panel 增加 `16px`。
- 所有 pointer 和 keyboard 操作都必须在写入 state、调用 callback、更新 `aria-valuetext` 前完成 clamp。
- 当 pointer drag 过程中组件被卸载，后续 `window.pointermove` 和 `window.pointerup` 不得继续调用本次 drag 的 `onSizeChange` / `onSizeCommit`。

## Plan

1. 小任务 A：组件合约实现。
   - 文件：`src/components/layout/split-pane.tsx`
   - 新增内部 bounds helper 和 active drag cleanup ref。
   - 将 pointer resize 和 keyboard resize 都改为先计算候选像素值，再 clamp，再格式化为 `"Npx"`。
   - 保持 `data-min-size-preset`、`data-max-size-preset`、`aria-valuetext` 和现有 callback 语义。
2. 小任务 B：交互测试补齐。
   - 文件：`src/components/layout/split-pane.test.tsx`
   - 覆盖 pointer drag 低于 `minSizePreset`、pointer drag 高于 `maxSizePreset`。
   - 覆盖 keyboard arrow resize 低于 `minSizePreset`、keyboard arrow resize 高于 `maxSizePreset`。
   - 覆盖 active drag unmount 后，后续 `window.pointermove` / `window.pointerup` 不再触发 callbacks。
3. 小任务 C：review readiness 同步。
   - 文件：`docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`
   - 如果实现和测试已完全覆盖，删除章节 `### [P1] SplitPane min/max presets are not enforced`。
   - 如果 active drag unmount cleanup 已完全覆盖，删除章节 `### [P2] SplitPane pointer listeners lack unmount cleanup`。
   - 不新增“已处理”中间态章节。
4. 小任务 D：临时 RUNBOOK 收口。
   - 文件：`docs/30-designs/README.md`
   - 文件：`docs/30-designs/RUNBOOK-SPLIT-PANE-BOUNDS-CLEANUP.md`
   - 审核通过并完成任务后，删除本 RUNBOOK，并把 `docs/30-designs/README.md` 的 Active Runbooks 恢复为 `当前无。` 或移除本链接。

## Verification

运行最小相关验证：

```bash
pnpm test src/components/layout/split-pane.test.tsx
```

验证点：

- pointer drag 的 `onSizeChange` 与 `onSizeCommit` 均不能越过 preset 边界。
- keyboard arrow resize 的 `aria-valuetext`、`onSizeChange` 与 `onSizeCommit` 均使用被约束后的 size。
- active drag unmount 后，后续 `pointermove` / `pointerup` 不触发 stale callback，也不产生 listener 泄漏。
- `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md` 中不再保留已完全处理的 SplitPane P1/P2 章节。

## Closure

任务完成并通过审核后，删除本 RUNBOOK，并从 `docs/30-designs/README.md` 的 Active Runbooks 中移除对应链接。若最终实现产生长期组件合约说明，应迁移到对应稳定组件文档或 readiness 证据文档，不保留在 RUNBOOK 中。
