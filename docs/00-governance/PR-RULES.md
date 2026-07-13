# PR Rules

## 1. Purpose

本文档定义 `scone-ui` 的 Pull Request 收口规则。

目标是让每个 PR 表达清晰的阶段性交付边界，并记录验证证据、未覆盖项、文档同步和 TODO/RUNBOOK 收口状态。

## 2. Scope

当前范围：

- PR 标题和描述要求。
- 文档、TODO 和 RUNBOOK 收口要求。
- 基础 UI 库治理、组件盘点、文档和后续构建验证的证据要求。

不在范围内：

- 不定义产品应用级 UI 规则。
- 不伪造当前仓库不存在的构建系统验证。
- 不定义发布流程。
- 不定义分支保护配置的 GitHub UI 操作。

## 3. Bounded Context

Commit 是工程判断记录，可以表示阶段任务中的中间判断。

PR 是阶段性交付边界。PR 合并前必须完整、可验证，并完成文档、TODO 和 RUNBOOK 收口。

## 4. Global Constraints

- PR 标题固定使用 `Type(scope): 中文说明`。
- PR 描述固定使用 `.github/pull_request_template.md`。
- PR 应尽量只承载一个可验收闭环；如果同一 PR 跨多个治理域，必须说明不可拆分原因、跨域影响和额外验证范围。
- PR 必须明确记录完成点、验证证据、未覆盖项、跨域影响、文档、TODO 与 RUNBOOK 收口状态。
- `PR-RULES.md` 增加 PR 描述必填信息时，必须同步更新 `.github/pull_request_template.md`。
- 后续新增构建、测试、lint 或发布自动化时，必须同步接入 PR 验证说明或 workflow。
- 没有构建系统或验证命令的模块不得在 workflow 或 PR 描述中伪造空验证。

## 5. PR Description

PR 描述固定包含：

- `Delivery Closure`：说明本 PR 形成的交付完成点；如果只是治理、验证或文档收口，也必须说明完成的边界。
- `Scope`：说明主要改动范围，并说明是否跨治理域。
- `Verification Evidence`：记录已运行验证命令、结果和人工检查证据；未自动化验证不得伪装为 workflow 必过项。
- `Not Covered`：说明本 PR 未覆盖、未自动化或刻意不纳入的事项；没有未覆盖项时明确写 `无`。
- `Cross-domain Impact`：说明是否影响其他文档、组件边界、目录规则、后续构建入口或协作规则。
- `Documentation, TODO And RUNBOOK Closure`：确认治理文档、盘点文档、readiness 文档是否同步；确认相关 TODO 已按 `TODO-RULES.md` 清理或收窄；确认临时 RUNBOOK 已删除，或证据已沉淀到指定 readiness/evidence 文档。
- `Risks`：说明剩余风险、人工决策点或后续仍需关注的事项。
