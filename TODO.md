# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

- [ ] `4.2 ui cn imports batch 1`：统一 ui 第一批 `cn` 导入
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-COMPONENT-CONTRACTS-CN-CLEANUP.md`
    - 范围对象：`src/components/ui/accordion.tsx`、`src/components/ui/alert-dialog.tsx`、`src/components/ui/alert.tsx`、`src/components/ui/avatar.tsx`、`src/components/ui/breadcrumb.tsx`
    - 处理动作：将本批 ui 文件中的 `@/lib/utils` 导入改为 `@/lib/cn`。
    - 验收点：本批文件不再引用 `@/lib/utils`，DOM 结构、className 内容和 export 不变。
    - 重要度：7/10

- [ ] `4.3 ui cn imports batch 2`：统一 ui 第二批 `cn` 导入
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-COMPONENT-CONTRACTS-CN-CLEANUP.md`
    - 范围对象：`src/components/ui/button.tsx`、`src/components/ui/card.tsx`、`src/components/ui/checkbox.tsx`、`src/components/ui/command.tsx`、`src/components/ui/dialog.tsx`
    - 处理动作：将本批 ui 文件中的 `@/lib/utils` 导入改为 `@/lib/cn`。
    - 验收点：本批文件不再引用 `@/lib/utils`，DOM 结构、className 内容和 export 不变。
    - 重要度：7/10

- [ ] `4.4 ui cn imports batch 3`：统一 ui 第三批 `cn` 导入
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-COMPONENT-CONTRACTS-CN-CLEANUP.md`
    - 范围对象：`src/components/ui/dropdown-menu.tsx`、`src/components/ui/input-group.tsx`、`src/components/ui/input.tsx`、`src/components/ui/popover.tsx`
    - 处理动作：将本批 ui 文件中的 `@/lib/utils` 导入改为 `@/lib/cn`。
    - 验收点：本批文件不再引用 `@/lib/utils`，DOM 结构、className 内容和 export 不变。
    - 重要度：7/10

- [ ] `4.5 ui cn imports batch 4`：统一 ui 第四批 `cn` 导入
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-COMPONENT-CONTRACTS-CN-CLEANUP.md`
    - 范围对象：`src/components/ui/progress.tsx`、`src/components/ui/radio-group.tsx`、`src/components/ui/scroll-area.tsx`、`src/components/ui/select.tsx`
    - 处理动作：将本批 ui 文件中的 `@/lib/utils` 导入改为 `@/lib/cn`。
    - 验收点：本批文件不再引用 `@/lib/utils`，DOM 结构、className 内容和 export 不变。
    - 重要度：7/10

- [ ] `4.6 ui cn imports batch 5`：统一 ui 第五批 `cn` 导入
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-COMPONENT-CONTRACTS-CN-CLEANUP.md`
    - 范围对象：`src/components/ui/separator.tsx`、`src/components/ui/sheet.tsx`、`src/components/ui/slider.tsx`、`src/components/ui/switch.tsx`
    - 处理动作：将本批 ui 文件中的 `@/lib/utils` 导入改为 `@/lib/cn`。
    - 验收点：本批文件不再引用 `@/lib/utils`，DOM 结构、className 内容和 export 不变。
    - 重要度：7/10

- [ ] `4.7 ui cn imports batch 6`：统一 ui 第六批 `cn` 导入
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-COMPONENT-CONTRACTS-CN-CLEANUP.md`
    - 范围对象：`src/components/ui/table.tsx`、`src/components/ui/tabs.tsx`、`src/components/ui/textarea.tsx`、`src/components/ui/tooltip.tsx`
    - 处理动作：将本批 ui 文件中的 `@/lib/utils` 导入改为 `@/lib/cn`。
    - 验收点：本批文件不再引用 `@/lib/utils`，DOM 结构、className 内容和 export 不变。
    - 重要度：7/10

- [ ] `4.8 navigation cn imports batch 1`：统一 navigation 第一批 `cn` 导入
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-COMPONENT-CONTRACTS-CN-CLEANUP.md`
    - 范围对象：`src/components/navigation/accordion.tsx`、`src/components/navigation/breadcrumb.tsx`、`src/components/navigation/collapsible.tsx`、`src/components/navigation/command.tsx`、`src/components/navigation/dropdown.tsx`
    - 处理动作：将本批 navigation 文件中的 `@/lib/utils` 导入改为 `@/lib/cn`。
    - 验收点：本批文件不再引用 `@/lib/utils`，菜单、面包屑、折叠、命令和下拉交互不变。
    - 重要度：7/10

- [ ] `4.9 navigation cn imports batch 2`：统一 navigation 第二批 `cn` 导入
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-COMPONENT-CONTRACTS-CN-CLEANUP.md`
    - 范围对象：`src/components/navigation/menu.tsx`、`src/components/navigation/segmented.tsx`、`src/components/navigation/tabs.tsx`、`src/components/navigation/tooltip.tsx`、`src/components/navigation/tree.tsx`
    - 处理动作：将本批 navigation 文件中的 `@/lib/utils` 导入改为 `@/lib/cn`。
    - 验收点：本批文件不再引用 `@/lib/utils`，menu、segmented、tabs、tooltip 和 tree 交互不变。
    - 重要度：7/10

- [ ] `4.10 media cn imports`：统一 media `cn` 导入
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-COMPONENT-CONTRACTS-CN-CLEANUP.md`
    - 范围对象：`src/components/media/avatar.tsx`、`src/components/media/image.tsx`
    - 处理动作：将 media 文件中的 `@/lib/utils` 导入改为 `@/lib/cn`。
    - 验收点：两个文件不再引用 `@/lib/utils`，image loading、fallback、avatar group 和 avatar fallback 行为不变。
    - 重要度：7/10

- [ ] `4.11 feedback-overlay cn check batch 1`：确认 feedback-overlay 第一批 `cn` 导入状态
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-COMPONENT-CONTRACTS-CN-CLEANUP.md`
    - 范围对象：`src/components/feedback-overlay/alert.tsx`、`src/components/feedback-overlay/confirm.tsx`、`src/components/feedback-overlay/dialog.tsx`、`src/components/feedback-overlay/drawer.tsx`、`src/components/feedback-overlay/empty.tsx`
    - 处理动作：确认本批 feedback-overlay 文件没有剩余 `lib/utils` 导入。
    - 验收点：本批文件不引用 `lib/utils`、`@/lib/utils` 或 `../../lib/utils`，alert、confirm、dialog、drawer 和 empty 行为不变。
    - 重要度：7/10

- [ ] `4.12 feedback-overlay cn check batch 2`：确认 feedback-overlay 第二批 `cn` 导入状态
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-COMPONENT-CONTRACTS-CN-CLEANUP.md`
    - 范围对象：`src/components/feedback-overlay/loading.tsx`、`src/components/feedback-overlay/notification.tsx`、`src/components/feedback-overlay/progress.tsx`、`src/components/feedback-overlay/toast.tsx`
    - 处理动作：确认本批 feedback-overlay 文件没有剩余 `lib/utils` 导入。
    - 验收点：本批文件不引用 `lib/utils`、`@/lib/utils` 或 `../../lib/utils`，loading、notification、progress 和 toast 行为不变。
    - 重要度：7/10

- [ ] `4.13 src/lib/utils.ts`：删除 `cn` re-export 文件
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-COMPONENT-CONTRACTS-CN-CLEANUP.md`
    - 范围对象：`src/lib/utils.ts`
    - 处理动作：在所有调用方改到 `@/lib/cn` 后删除 `src/lib/utils.ts`。
    - 验收点：`rg "lib/utils|@/lib/utils|\\.\\./\\.\\./lib/utils" src` 没有结果，且 `test ! -f src/lib/utils.ts` 通过。
    - 重要度：8/10

- [ ] `5.1 data-display verification`：运行 Data Display 契约验证
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-COMPONENT-CONTRACTS-CN-CLEANUP.md`
    - 范围对象：`src/lib/cn.test.ts`、`src/components/data-display/descriptions.test.tsx`、`src/components/data-display/badge.test.tsx`
    - 处理动作：运行 `cn`、Descriptions 和 Badge 的 focused test。
    - 验收点：三个 focused test 文件全部通过，失败项必须修复或记录明确剩余风险。
    - 重要度：9/10

- [ ] `5.2 layout verification batch 1`：运行基础 layout 契约验证
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-COMPONENT-CONTRACTS-CN-CLEANUP.md`
    - 范围对象：`src/components/layout/stack.test.tsx`、`src/components/layout/inline.test.tsx`、`src/components/layout/compact.test.tsx`、`src/components/layout/toolbar.test.tsx`
    - 处理动作：运行 Stack、Inline、Compact 和 Toolbar 的 focused test。
    - 验收点：四个 focused test 文件全部通过，失败项必须修复或记录明确剩余风险。
    - 重要度：9/10

- [ ] `5.3 layout verification batch 2`：运行 Radix 和 SplitPane layout 契约验证
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-COMPONENT-CONTRACTS-CN-CLEANUP.md`
    - 范围对象：`src/components/layout/scroll-area.test.tsx`、`src/components/layout/separator.test.tsx`、`src/components/layout/split-pane.test.tsx`
    - 处理动作：运行 ScrollArea、Separator 和 SplitPane 的 focused test。
    - 验收点：三个 focused test 文件全部通过，失败项必须修复或记录明确剩余风险。
    - 重要度：9/10

- [ ] `5.4 full verification`：运行全量验证
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-COMPONENT-CONTRACTS-CN-CLEANUP.md`
    - 范围对象：`package.json`、`vitest.config.ts`、`tsconfig.json`、`eslint.config.mjs`、`vite.config.ts`
    - 处理动作：运行全量 test、typecheck、lint 和 build。
    - 验收点：全量验证全部通过，失败项必须修复或记录明确剩余风险。
    - 重要度：9/10

- [ ] `6.1 readiness docs`：同步 readiness 文档
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-COMPONENT-CONTRACTS-CN-CLEANUP.md`
    - 范围对象：`docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`、`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`
    - 处理动作：删除系统性审核报告中已完全处理的问题章节，并补充 Implementation Coverage 的最终验证状态。
    - 验收点：审核报告不再保留已完全处理的问题章节，Implementation Coverage 记录本任务实际修改范围、验证命令和剩余风险。
    - 重要度：9/10

- [ ] `6.2 runbook cleanup`：清理临时 RUNBOOK
    - 任务类型：执行任务
    - 依据文档：`docs/00-governance/DOCUMENT-RULES.md`
    - 范围对象：`docs/30-designs/RUNBOOK-COMPONENT-CONTRACTS-CN-CLEANUP.md`
    - 处理动作：任务完成并完成 readiness 同步后删除临时 RUNBOOK。
    - 验收点：`docs/30-designs/RUNBOOK-COMPONENT-CONTRACTS-CN-CLEANUP.md` 不再存在，长期证据已保留在 `docs/40-readiness/`。
    - 重要度：8/10

## 待审阅任务项

## 待讨论项
