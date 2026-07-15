# PR Rules

## 1. Purpose

本文档定义 `scone-ui` 的 Pull Request 收口规则。

目标是让每个 PR 表达清晰的阶段性交付边界，并记录验证证据、未覆盖项、文档同步和 TODO/RUNBOOK 收口状态。

## 2. Scope

当前范围：

- PR 标题和描述要求。
- 文档、TODO 和 RUNBOOK 收口要求。
- admin-ui 组件库治理、组件盘点、文档和后续构建验证的证据要求。

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
- PR 标题的 `Type` 和 `scope` 固定沿用根 `AGENTS.md` 的 commit 标题白名单。
- PR 可以包含多个不同 `Type(scope)` 的小步 commit，但 PR 标题只写一个主 `Type(scope)` 作为检索入口。
- PR 覆盖多个 type 或 scope 时，必须在 `Scope`、`Cross-domain Impact` 和 `Verification Evidence` 中说明涉及范围、不可拆分原因和额外验证。
- PR 描述固定使用 `.github/pull_request_template.md`。
- PR 应尽量只承载一个可验收闭环；如果同一 PR 跨多个治理域，必须说明不可拆分原因、跨域影响和额外验证范围。
- PR 必须明确记录完成点、验证证据、未覆盖项、跨域影响、文档、TODO 与 RUNBOOK 收口状态。
- `PR-RULES.md` 增加 PR 描述必填信息时，必须同步更新 `.github/pull_request_template.md`。
- 后续新增构建、测试、lint 或发布自动化时，必须同步接入 PR 验证说明或 workflow。
- 没有构建系统或验证命令的模块不得在 workflow 或 PR 描述中伪造空验证。
- PR 验证必须根据变更面选择最小充分命令，不得把所有 PR 都描述成同一套固定验证。
- CI 可按变更面分流验证，但 PR 描述仍必须写明本次实际触发或人工运行的验证项。

## 5. Change-Aware Verification

PR 验证按以下变更面选择：

- Governance：所有 PR 必跑治理文件存在性、文档文件名规则和 PR 模板入口检查。
- Package：`packages/scone-ui/**`、包 README、AI Guide、公共导出、组件实现、组件测试、包构建配置或根构建配置变更时，至少验证 package typecheck、tests、package build；随包文档或发包边界变化时补充 `pack:check`。
- Example：`apps/example/**` 变更时，至少验证 example typecheck、example test、example build。
- Docs site：`apps/scone-docs/**`、`docs/**`、根 README、文档站配置或公开文档口径变化时，至少验证 docs typecheck、docs build。
- Full：`package.json`、`pnpm-lock.yaml`、`pnpm-workspace.yaml`、全局 TypeScript/Vite/Vitest/ESLint/Prettier 配置或 workflow 变化时，按 Package、Example、Docs site 全部验证。

当前 workflow 不把 `format:check` 和 `lint` 作为必跑项，因为仓库存在既有格式和 lint 基线债。后续清理基线后，必须在同一 PR 中同步更新本文档、PR 模板和 `.github/workflows/pr-verify.yml`。

PR 描述中的 `Verification Evidence` 必须说明：

- 本次属于哪些变更面。
- CI 预计触发哪些 verify job。
- 本地或人工验证是否覆盖 CI 未覆盖项。
- 未运行某个相关验证时，必须在 `Not Covered` 或 `Risks` 说明原因。

## 6. PR Description

PR 描述固定包含：

- `Delivery Closure`：说明本 PR 形成的交付完成点；如果只是治理、验证或文档收口，也必须说明完成的边界。
- `Scope`：说明主要改动范围，并说明是否跨治理域。
- `Verification Evidence`：记录已运行验证命令、结果和人工检查证据；未自动化验证不得伪装为 workflow 必过项。
- `Not Covered`：说明本 PR 未覆盖、未自动化或刻意不纳入的事项；没有未覆盖项时明确写 `无`。
- `Cross-domain Impact`：说明是否影响其他文档、组件边界、目录规则、后续构建入口或协作规则。
- `Documentation, TODO And RUNBOOK Closure`：确认治理文档、盘点文档、readiness 文档是否同步；确认相关 TODO 已按 `TODO-RULES.md` 清理或收窄；确认临时 RUNBOOK 已删除，或证据已沉淀到指定 readiness/evidence 文档。
- `Risks`：说明剩余风险、人工决策点或后续仍需关注的事项。
