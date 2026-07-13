# Repository Guidelines

## Read Order

- Read `docs/AGENTS.md` first for document routing.
- For documentation or governance work, read `docs/00-governance/DOCUMENT-RULES.md`.
- For TODO or task cleanup work, read `docs/00-governance/TODO-RULES.md`.
- For PR work, read `docs/00-governance/PR-RULES.md`.
- Do not treat root `README.md` as implementation authority.

## Project Scope

`scone-ui` is a foundational UI library and UI governance workspace. It is not a product application repository.

Keep repository content focused on reusable UI components, component usage inventory, library-level conventions, documentation, and migration support. Do not add product-specific UI rules, business workflows, backend contracts, or application runtime assumptions unless the repository later adds those modules explicitly.

## Project Structure

- `docs/`: repository documentation and inventories.
- `docs/00-governance/`: stable collaboration and documentation rules.
- `docs/30-designs/`: temporary runbooks or focused design notes when needed.
- `docs/40-readiness/`: implementation coverage, verification evidence, and release readiness notes when needed.
- `.github/`: PR templates and repository automation when introduced.

## Documentation Governance

Stable rules belong in `docs/00-governance/`. Temporary execution plans belong in `docs/30-designs/RUNBOOK-*.md` and should be removed after the task closes. Evidence that remains useful after closure belongs in `docs/40-readiness/`.

`docs/50-prompts/`, if introduced, stores manually triggered prompt templates only. It is not default AI context.

## Commit Rules

Commit 粒度固定围绕工程判断组织。一个 commit 表达一次具体判断、小步能力变化、测试锁定、配置装配或文档规则落点。

Commit 可以是阶段任务的中间态，但必须满足：

- 判断含义明确。
- 改动范围可解释。
- 不混入无关修改。
- 不故意留下不清楚的破坏。
- 涉及可运行入口时，运行最小相关验证。

Commit message 固定格式：

```text
Type(scope): 中文说明
```

`Type` 固定使用以下白名单：

- `Feat`：新增用户可见能力。
- `Fix`：修复缺陷。
- `Docs`：文档、治理、说明。
- `Style`：纯格式或样式调整，不改变行为。
- `Refactor`：重构，不改变行为。
- `Test`：测试新增或调整。
- `Build`：依赖、构建、脚手架、CI。
- `Chore`：维护性变更，非源码、非交付能力。

`scope` 固定使用以下白名单：

- `app`：React 应用入口、页面、运行时 UI。
- `styles`：Tailwind、全局样式、样式配置。
- `build`：Vite、TypeScript、package、pnpm、lint/test 工具链。
- `governance`：`AGENTS.md`、`docs/00-governance/`、PR/TODO 规则。
- `docs`：普通文档、盘点、README。
- `test`：测试支撑和测试用例。

新增 `Type` 或 `scope` 必须先更新本文档，再用于 commit message。

一个 commit 只能使用一个 `Type(scope)`，不得用多个 type 或多个 scope 共用一个提交。需要同时写 `Docs/Build`、`app,styles`、`build+test` 等组合时，必须拆成多个 commit，或选择唯一能表达本次工程判断的主 `Type(scope)`。

检查清单：

- `Type` 是否来自白名单。
- `scope` 是否来自白名单。
- 是否只有一个 `Type(scope)`。
- 中文说明是否点出具体能力，避免只写“调整”“修改”“优化”。

## Agent-Specific Instructions

Load the minimum docs needed for the task. Keep edits scoped, preserve user changes, and update documentation when behavior, setup, or developer workflow changes.

Do not migrate product-specific UI policy from kuzhambu into this repository. For example, do not create `UI-RULES.md` unless the user explicitly asks for a product/application UI policy.
