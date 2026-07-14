# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

- [ ] `15 docs/30-designs/runbook cleanup`：完成收口验证并清理 RUNBOOK
    - 任务类型：执行任务
    - 依据文档：`docs/00-governance/TODO-RULES.md`、`docs/30-designs/RUNBOOK-FEEDBACK-NAVIGATION-HARDENING.md`
    - 范围对象：`docs/30-designs/RUNBOOK-FEEDBACK-NAVIGATION-HARDENING.md`、`TODO.md`
    - 处理动作：在完整验证通过并确认长期结论已迁移后删除临时 RUNBOOK。
    - 验收点：`pnpm format:check`、`pnpm lint`、`pnpm test`、`pnpm build` 通过，RUNBOOK 被删除，TODO 收窄为剩余未完成项或清空。
    - 重要度：10/10

## 待审阅任务项

## 待讨论项
