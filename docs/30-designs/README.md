# Designs

本文档索引 `scone-ui` 当前有效的设计阶段文档。`docs/30-designs/` 只承载专项设计和临时 RUNBOOK；长期治理规则仍归属 `docs/00-governance/`。

## Admin UI

- [Admin UI Design](./DESIGN-ADMIN-UI.md)：Admin UI 设计总入口。
- [Architecture Design](./admin-ui/ARCHITECTURE-DESIGN.md)：目标、输入 SPEC 和架构决策。
- [File Placement Design](./admin-ui/FILE-PLACEMENT-DESIGN.md)：目标文件落点和源码布局。
- [Foundation Design](./admin-ui/FOUNDATION-DESIGN.md)：theme、token、响应式和可访问性基础设计。
- [Type And Data Structure Design](./admin-ui/TYPE-DATA-DESIGN.md)：公共类型、组件族类型、事件和 service 类型边界。
- [Export Surface Design](./admin-ui/EXPORT-SURFACE-DESIGN.md)：公共导出面和 SPEC 覆盖矩阵。
- [Component Family Design](./admin-ui/COMPONENT-FAMILY-DESIGN.md)：Form、Data Display、Layout、Feedback、Navigation、Media 组件族设计。
- [Pattern Design](./admin-ui/PATTERN-DESIGN.md)：Admin Pattern 结构、状态归属和业务边界。
- [Recipe Design](./admin-ui/RECIPE-DESIGN.md)：docs-only Recipe 组合边界。
- [Verification Design](./admin-ui/VERIFICATION-DESIGN.md)：实现验证策略。
- [Review And Traceability](./admin-ui/REVIEW-TRACEABILITY.md)：自审结果、决策追溯和审核状态。

## Active Runbooks

- [SplitPane Bounds Cleanup Runbook](./RUNBOOK-SPLIT-PANE-BOUNDS-CLEANUP.md)：修复 `SconeSplitPane` resize preset 边界和 active drag 卸载清理。
