# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

- [ ] `src/components/layout/stack.tsx, src/components/layout/inline.tsx`：01 基础排列组件闭环
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-LAYOUT-CLOSURE.md`
    - 范围对象：`src/components/layout/stack.tsx`、`src/components/layout/stack.test.tsx`、`src/components/layout/inline.tsx`、`src/components/layout/inline.test.tsx`
    - 处理动作：实现 `SconeStack` 和 `SconeInline` 及同目录测试。
    - 验收点：Stack 垂直排列、Inline 水平排列、`wrap`、`split` 装饰性分隔、token gap、ref、`className`、`style` 均有测试覆盖。
    - 重要度：9/10

- [ ] `src/components/layout/compact.tsx, src/components/layout/toolbar.tsx`：02 紧凑组合和工具栏闭环
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-LAYOUT-CLOSURE.md`
    - 范围对象：`src/components/layout/compact.tsx`、`src/components/layout/compact.test.tsx`、`src/components/layout/toolbar.tsx`、`src/components/layout/toolbar.test.tsx`
    - 处理动作：实现 `SconeCompact` 和 `SconeToolbar` 及同目录测试。
    - 验收点：Compact 横向/纵向、`size="sm" | "md"`、不 clone 子项、Toolbar `start`/`end`、`children` 优先、`density="compact" | "default"` 和窄屏换行 class 均有测试覆盖。
    - 重要度：9/10

- [ ] `src/components/layout/separator.tsx, src/components/layout/scroll-area.tsx`：03 vendored shadcn 布局封装闭环
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-LAYOUT-CLOSURE.md`
    - 范围对象：`src/components/layout/separator.tsx`、`src/components/layout/separator.test.tsx`、`src/components/layout/scroll-area.tsx`、`src/components/layout/scroll-area.test.tsx`
    - 处理动作：基于现有 `src/components/ui/separator.tsx` 和 `src/components/ui/scroll-area.tsx` 实现 `SconeSeparator`、`SconeScrollArea` 及同目录测试。
    - 验收点：Separator 的 orientation、decorative、ref 语义，以及 ScrollArea 的根 class、viewport class、viewport `onScroll`、根 ref 和局部滚动边界均有测试覆盖。
    - 重要度：9/10

- [ ] `src/components/layout/split-pane.tsx`：04 SplitPane 交互闭环
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-LAYOUT-CLOSURE.md`
    - 范围对象：`src/components/layout/split-pane.tsx`、`src/components/layout/split-pane.test.tsx`
    - 处理动作：实现 `SconeSplitPane` 的 preset、受控尺寸、拖拽 resize、键盘 resize、ARIA 和同目录测试。
    - 验收点：两个面板、resize handle、鼠标拖拽、方向键调整、`onSizeChange`、`onSizeCommit`、`role="separator"`、`aria-orientation`、`aria-valuetext`、CSS 长度单位校验均有测试覆盖。
    - 重要度：10/10

- [ ] `src/index.ts`：05 Layout 公共导出闭环
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-LAYOUT-CLOSURE.md`
    - 范围对象：`src/index.ts`、`src/index.test.ts`
    - 处理动作：从库入口导出 Layout 组件和 public props type。
    - 验收点：`SconeStack`、`SconeInline`、`SconeCompact`、`SconeToolbar`、`SconeSeparator`、`SconeScrollArea`、`SconeSplitPane`、`Scone*Props`、`SconeSplitPaneSizePreset` 可从 `src/index.ts` 导入并通过测试。
    - 重要度：9/10

- [ ] `feat/layout-components <- main`：06 同步 main 分支代码
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-LAYOUT-CLOSURE.md`
    - 范围对象：`feat/layout-components`、`main`
    - 处理动作：在 Layout 实现和公共导出完成后，同步 `main` 最新代码到当前工作分支。
    - 验收点：当前分支包含 `main` 最新提交，冲突已解决，未引入无关文件修改。
    - 重要度：9/10

- [ ] `layout verification`：07 Layout 最终验证闭环
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-LAYOUT-CLOSURE.md`
    - 范围对象：`src/components/layout/*`、`src/index.ts`、`src/index.test.ts`
    - 处理动作：在同步 `main` 后运行 Layout 相关测试、类型检查和 lint。
    - 验收点：`pnpm test -- src/components/layout`、`pnpm test -- src/index.test.ts src/components/layout`、`pnpm typecheck`、`pnpm lint` 均通过，或记录明确失败原因和修复范围。
    - 重要度：10/10

- [ ] `docs/40-readiness/IMPLEMENTATION-COVERAGE.md`：08 更新 Implementation Coverage
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-LAYOUT-CLOSURE.md`
    - 范围对象：`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`
    - 处理动作：在最终验证后，把 Layout primitives 的实现覆盖、测试覆盖和验证命令结果同步到 Implementation Coverage。
    - 验收点：文档准确区分 Layout 已实现、已测试、未覆盖和延期项，不把其他组件族误标为完成。
    - 重要度：8/10

- [ ] `docs/30-designs/RUNBOOK-LAYOUT-CLOSURE.md`：09 清理 RUNBOOK
    - 任务类型：执行任务
    - 依据文档：`docs/00-governance/DOCUMENT-RULES.md`
    - 范围对象：`docs/30-designs/RUNBOOK-LAYOUT-CLOSURE.md`、`TODO.md`
    - 处理动作：在 Implementation Coverage 更新后删除临时 RUNBOOK，并从 `TODO.md` 删除已完成任务项。
    - 验收点：临时 RUNBOOK 不再留在 `docs/30-designs/`，`TODO.md` 只保留未关闭任务，长期结论已按需迁移到 readiness 或稳定文档。
    - 重要度：8/10

## 待审阅任务项

## 待讨论项
