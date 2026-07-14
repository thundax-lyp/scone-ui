# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

- [ ] `4. docs/40-readiness/IMPLEMENTATION-COVERAGE.md`：同步 SplitPane 修复覆盖状态
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-SPLIT-PANE-BOUNDS-CLEANUP.md`
    - 范围对象：`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`
    - 处理动作：更新 Pending Implementation Work 或验证证据，使 SplitPane min/max 边界和 listener cleanup 的当前状态与实现一致。
    - 验收点：Implementation Coverage 不再把已完成的 SplitPane listener cleanup 作为待处理项，且记录最小相关验证入口。
    - 重要度：8/10

- [ ] `5. docs/30-designs/RUNBOOK-SPLIT-PANE-BOUNDS-CLEANUP.md`：完成后清理临时 RUNBOOK
    - 任务类型：执行任务
    - 依据文档：`docs/00-governance/DOCUMENT-RULES.md`
    - 范围对象：`docs/30-designs/RUNBOOK-SPLIT-PANE-BOUNDS-CLEANUP.md`、`docs/30-designs/README.md`
    - 处理动作：任务完成并通过验证后删除临时 RUNBOOK，并从 Active Runbooks 移除对应链接。
    - 验收点：`docs/30-designs/RUNBOOK-SPLIT-PANE-BOUNDS-CLEANUP.md` 不存在，`docs/30-designs/README.md` 的 Active Runbooks 不再引用该 RUNBOOK。
    - 重要度：7/10

## 待审阅任务项

## 待讨论项
