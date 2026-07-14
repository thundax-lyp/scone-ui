# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

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
