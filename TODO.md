# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

- [ ] `04 src/components/feedback-overlay/alert`：调整 Alert urgent 与 non-urgent role 语义
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FEEDBACK-NAVIGATION-HARDENING.md`
    - 范围对象：`src/components/feedback-overlay/alert.tsx`、`src/components/feedback-overlay/alert.test.tsx`、`docs/10-specs/components/feedback-overlay/SCONE-ALERT.md`
    - 处理动作：按 tone 默认映射 `role`，并允许调用方显式 `role` override。
    - 验收点：`error`、`warning` 默认 `alert`，`success`、`info`、`neutral` 默认 `status`，显式 role 不被覆盖。
    - 重要度：8/10

- [ ] `05 src/components/feedback-overlay/status imports`：统一状态类 feedback 文件的 `cn` import
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FEEDBACK-NAVIGATION-HARDENING.md`
    - 范围对象：`src/components/feedback-overlay/alert.tsx`、`src/components/feedback-overlay/empty.tsx`、`src/components/feedback-overlay/loading.tsx`、`src/components/feedback-overlay/progress.tsx`
    - 处理动作：把 `cn` import 从 `../../lib/utils` 统一为 `@/lib/cn`。
    - 验收点：范围文件不再出现 `from "../../lib/utils"`。
    - 重要度：5/10

- [ ] `06 src/components/feedback-overlay/overlay imports`：统一 overlay/service feedback 文件的 `cn` import
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FEEDBACK-NAVIGATION-HARDENING.md`
    - 范围对象：`src/components/feedback-overlay/confirm.tsx`、`src/components/feedback-overlay/dialog.tsx`、`src/components/feedback-overlay/drawer.tsx`、`src/components/feedback-overlay/toast.tsx`、`src/components/feedback-overlay/notification.tsx`
    - 处理动作：把 `cn` import 从 `../../lib/utils` 统一为 `@/lib/cn`。
    - 验收点：范围文件不再出现 `from "../../lib/utils"`。
    - 重要度：5/10

- [ ] `07 src/components/navigation/dropdown`：补齐 Dropdown outside close 和 keyboard initial focus
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FEEDBACK-NAVIGATION-HARDENING.md`
    - 范围对象：`src/components/navigation/dropdown.tsx`、`src/components/navigation/dropdown.test.tsx`、`docs/10-specs/components/navigation/SCONE-DROPDOWN.md`
    - 处理动作：让 dropdown trigger 打开后的外部点击、外部 focus、Escape 和 keyboard open initial focus 行为符合 SPEC。
    - 验收点：菜单外交互关闭 menu，Escape 关闭并恢复 trigger focus，keyboard open 聚焦首个 enabled menu item。
    - 重要度：10/10

- [ ] `08 src/components/navigation/command`：修复 Command filter 后 active item
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FEEDBACK-NAVIGATION-HARDENING.md`
    - 范围对象：`src/components/navigation/command.tsx`、`src/components/navigation/command.test.tsx`、`docs/10-specs/components/navigation/SCONE-COMMAND.md`
    - 处理动作：让内部 `activeKey` 在 query 或 filtered enabled items 变化后指向可见可用结果。
    - 验收点：用户过滤后直接按 Enter 会选择可见 enabled option，不会选中 disabled 或 stale option。
    - 重要度：8/10

- [ ] `09 src/components/navigation/tabs`：补齐 Tabs root props 和 ref passthrough
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FEEDBACK-NAVIGATION-HARDENING.md`
    - 范围对象：`src/components/navigation/tabs.tsx`、`src/components/navigation/tabs.test.tsx`、`docs/10-specs/components/navigation/SCONE-TABS.md`
    - 处理动作：让 `SconeTabsRootProps` 扩展 root HTML attributes，并让 `SconeTabs.Root` forward root ref。
    - 验收点：root `id`、`data-*`、`aria-label`、`className` 和 `ref` 落到 tabs root DOM。
    - 重要度：7/10

- [ ] `10 src/components/navigation/segmented`：锁定 Segmented keyboard focus 行为
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FEEDBACK-NAVIGATION-HARDENING.md`
    - 范围对象：`src/components/navigation/segmented.tsx`、`src/components/navigation/segmented.test.tsx`、`docs/10-specs/components/navigation/SCONE-SEGMENTED.md`
    - 处理动作：补齐 arrow key selection 与 focus 同步行为或用测试明确当前语义。
    - 验收点：ArrowLeft、ArrowRight、ArrowUp、ArrowDown 不让 selection 和 focus 分离，并跳过 disabled option。
    - 重要度：7/10

- [ ] `11 src/patterns/app-shell`：移除 AppShell 未兑现 callback 语义
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FEEDBACK-NAVIGATION-HARDENING.md`
    - 范围对象：`src/patterns/app-shell.tsx`、`src/patterns/app-shell.test.tsx`、`docs/10-specs/patterns/APP-SHELL.md`、`docs/30-designs/admin-ui/PATTERN-DESIGN.md`
    - 处理动作：移除 `AppShellSidebarProps.onCollapsedChange` 和 `AppShellAsideProps.onOpenChange` 并同步文档为纯结构状态 props。
    - 验收点：AppShell 不再暴露无法由内部交互触发的 callbacks，`collapsed/defaultCollapsed` 和 `open/defaultOpen` 行为保持。
    - 重要度：9/10

- [ ] `12 src/patterns/section`：实现 Section Root shorthand
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FEEDBACK-NAVIGATION-HARDENING.md`
    - 范围对象：`src/patterns/section.tsx`、`src/patterns/section.test.tsx`、`docs/10-specs/patterns/SECTION.md`、`docs/30-designs/admin-ui/PATTERN-DESIGN.md`
    - 处理动作：为 `SectionRootProps` 新增 `title?: React.ReactNode`、`description?: React.ReactNode`、`actions?: React.ReactNode`。
    - 验收点：`Section.Root` shorthand 自动渲染 header 区域，children 和显式 `Section.Header` 组合不破坏非 Card 结构。
    - 重要度：9/10

- [ ] `13 src/patterns/filter-bar`：修复 FilterBar hidden search state
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FEEDBACK-NAVIGATION-HARDENING.md`
    - 范围对象：`src/patterns/filter-bar.tsx`、`src/patterns/filter-bar.test.tsx`、`docs/10-specs/patterns/FILTER-BAR.md`
    - 处理动作：让 `defaultSearchValue` 触发 built-in search input 渲染并参与可见输入提交。
    - 验收点：只传 `defaultSearchValue` 时 search input 可见，用户修改后点击 apply 会提交可见 search value。
    - 重要度：8/10

- [ ] `14 docs/40-readiness`：更新 Implementation Coverage 和系统评审
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FEEDBACK-NAVIGATION-HARDENING.md`
    - 范围对象：`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`、`docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 处理动作：同步 readiness 的 remediation 口径，并删除或收窄已经完全处理的系统评审 finding。
    - 验收点：`IMPLEMENTATION-COVERAGE.md` 明确覆盖完成不等于无 remediation，系统评审不保留已完全处理章节。
    - 重要度：10/10

- [ ] `15 docs/30-designs/runbook cleanup`：完成收口验证并清理 RUNBOOK
    - 任务类型：执行任务
    - 依据文档：`docs/00-governance/TODO-RULES.md`、`docs/30-designs/RUNBOOK-FEEDBACK-NAVIGATION-HARDENING.md`
    - 范围对象：`docs/30-designs/RUNBOOK-FEEDBACK-NAVIGATION-HARDENING.md`、`TODO.md`
    - 处理动作：在完整验证通过并确认长期结论已迁移后删除临时 RUNBOOK。
    - 验收点：`pnpm format:check`、`pnpm lint`、`pnpm test`、`pnpm build` 通过，RUNBOOK 被删除，TODO 收窄为剩余未完成项或清空。
    - 重要度：10/10

## 待审阅任务项

## 待讨论项
