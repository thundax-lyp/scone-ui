# TODO List

## 说明

- `TODO.md` 是未关闭任务面板，不是完成历史。
- 宏观任务必须先讨论边界，再拆解为可执行 TODO。
- 已完成任务必须删除，不在 `TODO.md` 中打勾保留。
- 完成历史保留在工程历史中。

## 当前任务项

- [ ] `22-tests-public-behavior`：22 审核测试策略和公共行为覆盖
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 范围对象：`src/index.test.ts`、`src/test/setup.ts`、`vitest.config.ts`、`src/app.test.tsx`
    - 处理动作：检查测试是否验证公共行为、导出守护、环境设置和示例入口，而非脆弱内部实现。
    - 验收点：输出测试结构是否存在维护成本高、Mock 过重或覆盖目标不清的问题。
    - 重要度：8/10

- [ ] `23-docs-spec-design-alignment`：23 审核 SPEC、DESIGN 和 readiness 对齐
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 范围对象：`docs/10-specs/COMPONENT-SELECTION.md`、`docs/30-designs/admin-ui/EXPORT-SURFACE-DESIGN.md`、`docs/30-designs/admin-ui/VERIFICATION-DESIGN.md`、`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`
    - 处理动作：检查需求矩阵、设计落点、验证矩阵和实现证据是否一致且不过期。
    - 验收点：输出文档与源码是否存在状态不一致、重复规则或过期证据的结论。
    - 重要度：9/10

- [ ] `24-review-report`：24 汇总系统性代码审核报告
    - 任务类型：执行任务
    - 依据文档：`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 范围对象：`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`、`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`
    - 处理动作：按 RUNBOOK 输出总体评价、问题清单、目录结构调整、重命名清单和建议执行顺序。
    - 验收点：审核报告按 P0/P1/P2/P3 排序，所有建议都有证据、影响范围和功能风险。
    - 重要度：10/10

- [ ] `25-readiness-runbook-closure`：25 更新 Implementation Coverage 并清理 RUNBOOK
    - 任务类型：执行任务
    - 依据文档：`docs/00-governance/TODO-RULES.md`、`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`
    - 范围对象：`docs/40-readiness/IMPLEMENTATION-COVERAGE.md`、`docs/30-designs/RUNBOOK-SYSTEMATIC-CODE-REVIEW-2026-07.md`、`docs/30-designs/README.md`、`TODO.md`
    - 处理动作：把有长期价值的审核结论迁移到 readiness，删除临时 RUNBOOK 和索引，并收窄或删除已完成 TODO。
    - 验收点：readiness 记录审核状态，RUNBOOK 文件和索引被清理，TODO 只保留未完成任务。
    - 重要度：10/10

## 待审阅任务项

## 待讨论项
