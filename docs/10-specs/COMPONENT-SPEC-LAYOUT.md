# Layout Component Spec

本文档是该分组的索引和共享规则。单组件合同已拆分到更小颗粒度的 SPEC 文件。

## Scope

本规格覆盖 admin-ui 布局 primitives。布局组件只负责空间、排列和局部滚动，不承载业务状态、数据请求、权限判断或页面流程。

跨组件间距、响应式和密度规则以 [`FOUNDATIONS-SPEC.md`](./FOUNDATIONS-SPEC.md) 为准；页面级组合以 [`ADMIN-PATTERNS-SPEC.md`](./ADMIN-PATTERNS-SPEC.md) 为准。

## Layout Principles

- 页面级空间、Page、Section、Sticky 和 DataTable 区域以 [`ADMIN-PATTERNS-SPEC.md`](./ADMIN-PATTERNS-SPEC.md) 为权威。
- 页面主滚动由 PageContent 承担；局部滚动组件使用 `SconeScrollArea`。
- 布局 props 使用 token，不把任意 number 作为主 API。
- 工具栏、批量操作区和页级操作共用 `SconeToolbar` primitive，但各自 slot 归属由 Pattern 定义。
- 不提供 `ListPage`、`PageShell`、`FilterPanel`、`BatchActionBar` 作为当前目标组件；这些以 Pattern/Recipe 记录。

## Component Index

- [`SconeStack`](./components/layout/SCONE-STACK.md)
- [`SconeInline`](./components/layout/SCONE-INLINE.md)
- [`SconeCompact`](./components/layout/SCONE-COMPACT.md)
- [`SconeToolbar`](./components/layout/SCONE-TOOLBAR.md)
- [`SconeSplitPane`](./components/layout/SCONE-SPLIT-PANE.md)
- [`SconeSeparator`](./components/layout/SCONE-SEPARATOR.md)
- [`SconeScrollArea`](./components/layout/SCONE-SCROLL-AREA.md)

## Anti-patterns

- 用 Card 或旧 Panel 代替 Page/Section 管页面空间。
- 在 body、main、PageContent、Table 四层同时设置滚动。
- 用任意 number gap 拼页面节奏。
- 把筛选、批量操作或页面标题封装进 Toolbar primitive。
