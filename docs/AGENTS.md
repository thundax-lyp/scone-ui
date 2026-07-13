# Docs Agent

AI 文档路由入口。目标：少读、读准，只读取当前任务必需文档。

## Rules

- 只读取当前任务必需文档；不要默认全量加载 `docs/`。
- 治理文档优先于盘点、设计和 readiness 文档。
- 工程级规则优先于单个文档说明。
- `50-prompts/` 只保存人工触发提示词，默认不读。
- 涉及 TODO 或任务面板清理时，先读 `00-governance/TODO-RULES.md`。
- 涉及 PR 描述或阶段交付收口时，先读 `00-governance/PR-RULES.md`。

## Router

- 文档结构、文档写作、RUNBOOK：`00-governance/DOCUMENT-RULES.md`。
- TODO 协作、任务项格式、删除和收窄：`00-governance/TODO-RULES.md`。
- PR 描述、阶段性交付和验证证据：`00-governance/PR-RULES.md`。
- Admin Web 控件使用盘点：`ADMIN-WEB-CONTROLS-INVENTORY.md`。
- 临时执行计划、迁移计划、批量清理计划：按需读 `30-designs/RUNBOOK-*.md`。
- 覆盖度、验证证据、迁移完成状态：按需读 `40-readiness/`。

## Load Limits

- 单文档任务不读其他文档，除非当前文档明确引用。
- 跨文档任务只读涉及文档。
- 机械格式调整不额外加载盘点或治理文档。

## Directory Map

- `00-governance/`: 稳定治理规则。
- `30-designs/`: 专项设计和临时 RUNBOOK。
- `40-readiness/`: 验证证据和收口状态。
- `50-prompts/`: 人工触发提示词模板，默认不读。
