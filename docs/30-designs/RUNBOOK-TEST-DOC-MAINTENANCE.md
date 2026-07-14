# Test Doc Maintenance Runbook

## Purpose

完成 `test-doc-maintenance` 的低冲突批次：先清理 Pattern 测试和 demo app 测试，降低它们对内部 DOM 标记和实现类名的非必要耦合，并同步系统性审核与 readiness 状态。

本任务完成后，`SYSTEMATIC-CODE-REVIEW-2026-07.md` 不应继续保留已经完全关闭的问题章节；仍未关闭的问题必须保留并写清剩余范围。

## Scope

本批次测试清理范围：

- `src/patterns/app-shell.test.tsx`
- `src/patterns/data-table.test.tsx`
- `src/patterns/filter-bar.test.tsx`
- `src/patterns/page.test.tsx`
- `src/patterns/section.test.tsx`
- `src/app.test.tsx`

文档收口范围：

- `docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`
- `docs/40-readiness/IMPLEMENTATION-COVERAGE.md`

暂缓测试范围：

- `src/components/feedback-overlay/alert.test.tsx`
- `src/components/feedback-overlay/confirm.test.tsx`
- `src/components/feedback-overlay/dialog.test.tsx`
- `src/components/feedback-overlay/drawer.test.tsx`
- `src/components/feedback-overlay/empty.test.tsx`
- `src/components/feedback-overlay/loading.test.tsx`
- `src/components/feedback-overlay/notification.test.tsx`
- `src/components/feedback-overlay/progress.test.tsx`
- `src/components/feedback-overlay/toast.test.tsx`
- `src/components/layout/compact.test.tsx`
- `src/components/layout/inline.test.tsx`
- `src/components/layout/scroll-area.test.tsx`
- `src/components/layout/separator.test.tsx`
- `src/components/layout/split-pane.test.tsx`
- `src/components/layout/stack.test.tsx`
- `src/components/layout/toolbar.test.tsx`

本 runbook 对应系统性审核中的问题：

- `[P2] Some tests are tightly coupled to internal slot markup`
- `[P3] Demo App test validates copy instead of library behavior`

## Non-goals

- 不改组件运行时行为。
- 不改 public API、导出面、SPEC 或 DESIGN。
- 不迁移产品级 UI 规则到本仓库。
- 不清理本范围外测试文件，即使它们也包含 `data-scone`、`data-slot`、`closest()`、`querySelector()` 或 `toHaveClass()`。
- 不删除确实属于布局契约、slot contract 或公开组合边界的 attribute 断言。
- 不处理暂缓测试范围；这些文件只在 readiness/review 文档中记录为剩余范围。

## Decision Rules

测试断言分类：

- 保留：Pattern root marker、Pattern part marker、layout contract、slot contract、composition boundary。
- 改写：仅用于定位元素的 `closest()`、`querySelector()`、`data-scone-*`、`data-slot`。
- 删除或弱化：只验证 demo copy、shadcn/Radix 内部 class、纯视觉实现 class 的断言。

前端断言替代入口：

- `AppShell`：用 sidebar/header/main/aside 中的可见文本、折叠按钮点击、controlled/default display state 断言替代内部查找；保留 app shell root/part contract。
- `Page`：用标题、描述、actions 按钮、sticky actions 按钮、scroll content 文本断言替代内部查找；保留 page main/content/sticky-actions 的布局 contract。
- `Section`：用 title、description、actions 按钮、footer 文本和 semantic section 断言替代内部查找；保留 section root/part contract。
- `FilterBar`：用 search input、Status select、Apply/Reset/Toggle 按钮点击和 `onSubmit` / `onReset` 回调断言替代内部查找；保留 filter-bar part contract。
- `DataTable`：用 Query input、Users 标题、table rows、filter-bar composition 断言替代内部查找；保留 data-table root/filter-bar composition contract。
- `App`：不验证 `"React + TailwindCSS frontend project"` 这类 demo copy；若保留测试，只验证 demo entry 能渲染稳定 landmark 或 smoke container。

数据结构变更：

- 无运行时数据结构变更。
- 无 public props、callback payload、export shape 或 context field 变更。
- 文档状态字段只允许更新以下语义：
    - `SYSTEMATIC-CODE-REVIEW-2026-07.md`：问题清单索引、建议执行顺序、`[P2] Some tests are tightly coupled to internal slot markup`、`[P3] Demo App test validates copy instead of library behavior`。
    - `IMPLEMENTATION-COVERAGE.md`：`Verification Evidence Summary`、`Pending Implementation Work`。

## Plan

1. 重新读取目标审核章节，确认本批次只关闭 Pattern 测试表达方式和 demo app 测试价值问题。
2. 在本批次测试范围内搜索以下模式：
    - `data-scone`
    - `data-slot`
    - `closest(`
    - `querySelector(`
    - `toHaveClass(`
3. 小任务 A：清理 AppShell / Page / Section 测试。
    - 文件：`src/patterns/app-shell.test.tsx`、`src/patterns/page.test.tsx`、`src/patterns/section.test.tsx`。
    - 操作：将纯定位用 `closest()` 改成更直接的 role/text/button 断言；保留 root/part marker 和 sticky/layout contract。
    - 前端控件：sidebar collapse button、page actions button、sticky actions button、section actions button。
4. 小任务 B：清理 FilterBar / DataTable / App 测试。
    - 文件：`src/patterns/filter-bar.test.tsx`、`src/patterns/data-table.test.tsx`、`src/app.test.tsx`。
    - 操作：用 input/select/button 操作和 callback payload 断言替代内部 DOM traversal；删除或改写 demo copy 断言。
    - 前端控件：search input、Query input、Status select、Apply button、Reset button、Toggle button、table rows。
5. 更新 `SYSTEMATIC-CODE-REVIEW-2026-07.md`：
    - 删除 `[P3] Demo App test validates copy instead of library behavior` 章节和索引项，前提是 `src/app.test.tsx` 已不再验证 demo copy。
    - 保留 `[P2] Some tests are tightly coupled to internal slot markup` 章节，但收窄为暂缓的 layout / feedback-overlay 范围，且说明 Pattern 范围已关闭。
    - 同步更新问题清单索引、建议执行顺序和最终总结中“测试内部标记耦合”的表述。
6. 更新 `IMPLEMENTATION-COVERAGE.md`：
    - 在 `Verification Evidence Summary` 记录本批次 Pattern / App 测试维护和实际命令。
    - 在 `Pending Implementation Work` 保留 layout / feedback-overlay 测试耦合剩余项，删除 Pattern / App 已关闭表述。
7. 删除本 runbook，或在提交前确认它只作为待审核计划保留；任务真正关闭时不得留下临时 runbook。

## Verification

最小验证命令：

```bash
pnpm test -- src/patterns/*.test.tsx src/app.test.tsx
pnpm format:check
```

若修改了测试辅助方式、删除了 demo test，或文档状态需要完整证据，补充运行：

```bash
pnpm test
pnpm lint
pnpm typecheck
```

验证通过后，在 `IMPLEMENTATION-COVERAGE.md` 记录实际运行的命令、状态和测试数量。

## Closure

关闭标准：

- 本批次测试范围内非必要的内部 marker、DOM traversal 和 class 断言已清理。
- 保留的 `data-scone-*`、`data-slot`、`querySelector()`、`closest()` 或 `toHaveClass()` 均能解释为布局契约、slot contract、组合边界或无更稳定的用户行为入口。
- `src/app.test.tsx` 不再只验证 demo copy。
- `SYSTEMATIC-CODE-REVIEW-2026-07.md` 已删除 `[P3]` demo copy 问题章节，并将 `[P2]` 测试内部标记耦合问题收窄到 layout / feedback-overlay 剩余范围。
- `IMPLEMENTATION-COVERAGE.md` 已同步本批次验证证据，并保留 layout / feedback-overlay 剩余 pending work。
- 临时 runbook 已删除，长期证据只保留在 readiness 文档中。
