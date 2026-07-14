# Docs Agent

AI 文档路由入口。目标：少读、读准，只读取当前任务必需文档。

## Rules

- 只读取当前任务必需文档；不要默认全量加载 `docs/`。
- 治理文档优先于盘点、设计和 readiness 文档。
- 工程级规则优先于单个文档说明。
- `50-prompts/` 只保存人工触发提示词，默认不读。
- 涉及 TODO 或任务面板清理时，先读 `00-governance/TODO-RULES.md`。
- 涉及 PR 描述或阶段交付收口时，先读 `00-governance/PR-RULES.md`。
- 修改根目录 `README.md`、`PACKAGE-AI-GUIDE.md` 或发包文件白名单时，必须按随包发布的独立 AI 文档处理：这些文档不能依赖未随包发布的设计文档、RUNBOOK、TODO、PR 记录或源码路径才能被 AI 理解。

## Router

- 文档结构、文档写作、RUNBOOK：`00-governance/DOCUMENT-RULES.md`。
- TODO 协作、任务项格式、删除和收窄：`00-governance/TODO-RULES.md`。
- PR 描述、阶段性交付和验证证据：`00-governance/PR-RULES.md`。
- 发布包 README 和 AI 安装入口：根目录 `README.md`。
- 发布包 AI 使用入口和公共 API 生成规则：根目录 `PACKAGE-AI-GUIDE.md`。
- 临时执行计划、迁移计划、批量清理计划：按需读 `30-designs/RUNBOOK-*.md`。
- 覆盖度、验证证据、迁移完成状态：按需读 `40-readiness/`。

## Load Limits

- 单文档任务不读其他文档，除非当前文档明确引用。
- 跨文档任务只读涉及文档。
- 机械格式调整不额外加载盘点或治理文档。

## Directory Map

- `00-governance/`: 稳定治理规则。
- `10-specs/`: 仓库内组件库稳定规格和公共 API 说明，不作为发布包 README / AI Guide 的必需依赖。
- `30-designs/`: 专项设计和临时 RUNBOOK。
- `40-readiness/`: 验证证据和收口状态。
- `50-prompts/`: 人工触发提示词模板，默认不读。
