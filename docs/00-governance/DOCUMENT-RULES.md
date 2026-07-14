# Document Rules

## Purpose

本文档定义 `scone-ui` 的文档写作、目录归属和 AI 输入文档规则，让文档适合 admin-ui 组件库治理、工程实现和持续维护。

## File Naming

- 文档文件名使用大写英文，可用 `-` 连接单词。
- 文件名不得使用中文或空格。
- 目录可使用小写英文和 `-` 组织稳定分类；目录名不承载文档标题语义。
- 每个稳定文档目录应优先提供 `README.md` 作为工程索引；下级文档由 README 导航。
- 治理文档固定放在 `docs/00-governance/`。
- `RUNBOOK` 文档固定放在 `docs/30-designs/`，命名为 `RUNBOOK-XXX.md`。
- `HOW-TO` 文档仅在用户明确要求沉淀稳定流程时新增，命名为 `HOW-TO-XXX.md`。

## Governance Entry Map

- 文档写作、目录和 RUNBOOK：本文档。
- Commit 标题、type/scope 白名单和提交粒度：根 [`AGENTS.md`](../../AGENTS.md)。
- TODO 协作、任务项格式、删除和收窄：[`TODO-RULES.md`](./TODO-RULES.md)。
- PR 描述、阶段性交付和验证证据：[`PR-RULES.md`](./PR-RULES.md)。
- 系统性代码审核流程：[`HOW-TO-SYSTEMATIC-CODE-REVIEW.md`](./HOW-TO-SYSTEMATIC-CODE-REVIEW.md)。

## Language Rules

- 文档说明内容使用中文。
- 代码定义、模块名、类名、接口名、字段名、工具名和协议名保留英文原文。
- 不为了“纯中文”翻译代码概念，也不为了“纯英文”改写业务说明。

## Content Principles

- 文档必须清晰、明确、可执行。
- `docs/00-governance/` 只沉淀稳定规则，不记录任务执行过程。
- 根目录 `PACKAGE-AI-GUIDE.md` 是随发布包分发的独立 AI 使用入口；它必须与设计文档分开，并能脱离未发布的设计文档、RUNBOOK、TODO、PR 记录和源码路径被 AI 理解。
- `docs/30-designs/` 承载专项设计和临时 RUNBOOK。
- `docs/40-readiness/` 承载验证证据、覆盖度和收口状态。
- 同一规则不得在多处重复且表述不一致。
- `50-prompts/` 只保存人工触发的提示词模板。
- 本仓库是 admin-ui 组件库治理仓库，不沉淀产品应用级 UI 规则。

## RUNBOOK Boundary

`RUNBOOK` 是复杂任务的临时执行手册，适用于跨文档清理、迁移、删除、重构、验证或收口。

`RUNBOOK` 不是长期规则来源。任务执行过程中可以用 RUNBOOK 记录范围拆解、执行顺序、验证命令和临时风险，但长期规则必须沉淀到 `docs/00-governance/`，完成状态或证据必须沉淀到 `docs/40-readiness/`。

RUNBOOK 固定包含：

- `Purpose`：说明本次执行目标。
- `Scope`：说明纳入本次闭环的文档、模块或对象。
- `Non-goals`：说明明确不纳入本次闭环的事项。
- `Plan`：列出可执行步骤。
- `Verification`：列出需要运行或记录的验证。
- `Closure`：说明任务完成后要删除 RUNBOOK，或把证据沉淀到哪个 readiness/evidence 文档。

任务关闭时，必须清理 RUNBOOK 及残留引用；如果 RUNBOOK 中存在仍有长期价值的结论，必须先迁移到对应治理或 readiness 文档，再删除临时 RUNBOOK。
