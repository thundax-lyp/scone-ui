# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

- [ ] `3-systematic-review-test-status`：收窄系统性审核测试维护状态
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-TEST-DOC-MAINTENANCE.md`
    - 范围对象：`docs/40-readiness/SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 处理动作：删除已完全关闭的 demo copy 测试问题，并将测试内部标记耦合问题收窄到 layout / feedback-overlay 剩余范围。
    - 验收点：问题清单索引、建议执行顺序、最终总结、`[P2] Some tests are tightly coupled to internal slot markup` 和 `[P3] Demo App test validates copy instead of library behavior` 只保留真实未关闭内容。
    - 重要度：9/10

- [ ] `4-implementation-coverage-test-evidence`：同步 Implementation Coverage 测试维护证据
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-TEST-DOC-MAINTENANCE.md`
    - 范围对象：`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`
    - 处理动作：记录本批次 Pattern / App 测试维护验证证据，并保留 layout / feedback-overlay 测试耦合剩余项。
    - 验收点：`Verification Evidence Summary` 包含实际运行命令和结果，`Pending Implementation Work` 不再把 Pattern / App 写成未关闭范围。
    - 重要度：9/10

- [ ] `5-runbook-cleanup`：清理临时 RUNBOOK
    - 任务类型：执行任务
    - 依据文档：`docs/00-governance/DOCUMENT-RULES.md`、`docs/30-designs/RUNBOOK-TEST-DOC-MAINTENANCE.md`
    - 范围对象：`docs/30-designs/RUNBOOK-TEST-DOC-MAINTENANCE.md`
    - 处理动作：在测试、系统性审核和 Implementation Coverage 收口完成后删除临时 RUNBOOK。
    - 验收点：任务关闭时 `docs/30-designs/RUNBOOK-TEST-DOC-MAINTENANCE.md` 不再存在，长期证据只保留在 readiness 文档。
    - 重要度：7/10

## 待审阅任务项

## 待讨论项
