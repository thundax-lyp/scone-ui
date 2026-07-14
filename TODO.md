# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

- [ ] `11. main-sync`：同步 main 分支最新代码
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FOUNDATION-PUBLIC-API.md`、`docs/00-governance/TODO-RULES.md`
    - 范围对象：`main`、`feat/foundation-public-api`
    - 处理动作：在收口前同步 `main` 分支最新代码到当前工作分支。
    - 验收点：当前分支包含 `main` 最新代码，且同步后相关验证仍通过或已记录需要修复的本闭环问题。
    - 重要度：10/10

- [ ] `12. runbook-cleanup`：清理 RUNBOOK 和已完成 TODO
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-FOUNDATION-PUBLIC-API.md`、`docs/00-governance/TODO-RULES.md`
    - 范围对象：`main`、`feat/foundation-public-api`、`docs/30-designs/RUNBOOK-FOUNDATION-PUBLIC-API.md`、`TODO.md`
    - 处理动作：任务完成后删除 RUNBOOK，并从 `TODO.md` 删除已完成任务。
    - 验收点：RUNBOOK 已删除或其长期证据已迁移到 `docs/40-readiness/`，已完成 TODO 不保留在 `TODO.md`。
    - 重要度：10/10

## 待审阅任务项

## 待讨论项
