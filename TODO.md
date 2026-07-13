# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

## 待审阅任务项

- [ ] `07-design-verification-review`：生成验证、追溯和自审章节并回改 DESIGN
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-SPEC-TO-DESIGN.md`
    - 范围对象：`docs/30-designs/DESIGN-ADMIN-UI.md`、`docs/10-specs/ADMIN-UI-SPEC.md`、`docs/10-specs/FOUNDATIONS-SPEC.md`
    - 处理动作：编写 Verification Design、DESIGN Self Review、Decision Traceability 和 Review Questions，并根据自审结果修改 DESIGN 正文和矩阵。
    - 验收点：DESIGN 通过自审清单，所有关键目录、导出、类型、状态、可访问性和验证决策均可追溯到精确 SPEC 文件。
    - 重要度：10/10

- [ ] `08-sync-main-before-close`：同步 main 分支代码
    - 任务类型：执行任务
    - 依据文档：`AGENTS.md`
    - 范围对象：`docs/spec-design-runbook` 分支、`origin/main`、工作区改动
    - 处理动作：在文档收口前同步 `origin/main` 到当前工作分支并处理冲突。
    - 验收点：当前分支包含最新 `origin/main`，工作区无非预期冲突或混入改动。
    - 重要度：10/10

- [ ] `09-docs-update-implementation-coverage`：更新 Implementation Coverage
    - 任务类型：执行任务
    - 依据文档：`docs/00-governance/TODO-RULES.md`
    - 范围对象：`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`、`docs/30-designs/DESIGN-ADMIN-UI.md`、`docs/10-specs/COMPONENT-SELECTION.md`
    - 处理动作：根据 DESIGN 记录设计覆盖范围、待实现能力、验证规划和风险，不声明代码已实现。
    - 验收点：Implementation Coverage 与 DESIGN 和 `COMPONENT-SELECTION.md` 对齐，并明确当前是设计覆盖记录而非实现完成证据。
    - 重要度：10/10

- [ ] `10-close-runbook-todo`：清理 RUNBOOK 并收窄 TODO
    - 任务类型：执行任务
    - 依据文档：`docs/00-governance/DOCUMENT-RULES.md`
    - 范围对象：`docs/30-designs/RUNBOOK-SPEC-TO-DESIGN.md`、`docs/30-designs/DESIGN-ADMIN-UI.md`、`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`、`TODO.md`
    - 处理动作：在 DESIGN 和覆盖记录完成后删除临时 RUNBOOK，并按剩余范围收窄 TODO。
    - 验收点：RUNBOOK 临时文档已清理，长期设计和覆盖信息已迁移到 DESIGN/readiness，TODO 只保留未关闭任务。
    - 重要度：10/10

## 待讨论项
