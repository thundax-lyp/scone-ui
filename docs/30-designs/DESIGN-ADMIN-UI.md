# DESIGN: Admin UI

本文档是 `scone-ui` Admin UI 设计总入口。详细设计按主题拆分到 `docs/30-designs/admin-ui/`，目录索引见 [README.md](./README.md)。

## Purpose

将 `docs/10-specs/` 中已经成型的 Admin UI SPEC 转换为可审核、可执行、可追溯的工程设计。本文只保留总览和入口，不承载完整设计正文。

## Design Documents

| 文档 | 内容 |
| --- | --- |
| [Architecture Design](./admin-ui/ARCHITECTURE-DESIGN.md) | 目标、输入 SPEC 和架构决策。 |
| [File Placement Design](./admin-ui/FILE-PLACEMENT-DESIGN.md) | 目标文件落点和源码布局。 |
| [Foundation Design](./admin-ui/FOUNDATION-DESIGN.md) | theme、token、响应式和可访问性基础设计。 |
| [Type And Data Structure Design](./admin-ui/TYPE-DATA-DESIGN.md) | 公共类型、组件族类型、事件和 service 类型边界。 |
| [Export Surface Design](./admin-ui/EXPORT-SURFACE-DESIGN.md) | 公共导出面和 SPEC 覆盖矩阵。 |
| [Component Family Design](./admin-ui/COMPONENT-FAMILY-DESIGN.md) | Form、Data Display、Layout、Feedback、Navigation、Media 组件族设计。 |
| [Pattern Design](./admin-ui/PATTERN-DESIGN.md) | Admin Pattern 结构、状态归属和业务边界。 |
| [Recipe Design](./admin-ui/RECIPE-DESIGN.md) | docs-only Recipe 组合边界。 |
| [Verification Design](./admin-ui/VERIFICATION-DESIGN.md) | 实现验证策略。 |
| [Review And Traceability](./admin-ui/REVIEW-TRACEABILITY.md) | 自审结果、决策追溯和审核状态。 |

## Current Review Decisions

- Pattern 导出固定使用 `Page`、`Section` 命名空间，不使用 `SconePage`、`SconeSection`。
- `tailwind.config.ts` 是必要目标文件，默认只映射 `src/styles/theme.css` 中的 CSS variables。
- 公共类型按组件族分散定义并从组件族入口汇总；`src/types/foundation.ts` 只保留跨组件共享词表和基础类型。
- Toast 和 Notification service API 返回稳定 id。
- DataTable 不引入 TanStack Table 作为推荐 recipe 基座，只留出外部状态库 props/callback 边界。
- 测试文件按组件、Pattern、utility 同目录放置，命名为同名 `*.test.ts` 或 `*.test.tsx`。
- 全部 Recipe 保持文档和示例边界，不创建 `src/recipes/` 源码入口。

## Status

- 设计覆盖：完成。
- 实现覆盖：未开始。
- 测试覆盖：未开始。
- 未决问题：需确认是否将 `AppShell.*` 和独立 `FilterBar.*` 补入公共导出面；建议补入。
