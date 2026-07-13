# Navigation And Media Component Spec

本文档是该分组的索引和共享规则。单组件合同已拆分到更小颗粒度的 SPEC 文件。

## Scope

本规格覆盖 admin-ui 基础导航、菜单、浮动辅助和媒体展示组件。导航组件只处理选择、切换、菜单结构和可访问交互，不内置路由、权限、菜单数据加载或产品身份。

跨组件词汇和可访问性以 [`FOUNDATIONS-SPEC.md`](./FOUNDATIONS-SPEC.md) 为准；相似组件选择以 [`COMPONENT-SELECTION.md`](./COMPONENT-SELECTION.md) 为准。

## Component Index

导航、菜单和媒体组件均属于当前实现范围。它们只处理选择、切换、菜单结构、浮动辅助、媒体 fallback 和可访问交互，不内置路由、权限、菜单数据加载、产品身份或业务导航策略。

### Navigation components

- [`SconeBreadcrumb`](./components/navigation/SCONE-BREADCRUMB.md)
- [`SconePagination`](./components/navigation/SCONE-PAGINATION.md)
- [`SconeTabs`](./components/navigation/SCONE-TABS.md)
- [`SconeSegmented`](./components/navigation/SCONE-SEGMENTED.md)
- [`SconeTree`](./components/navigation/SCONE-TREE.md)
- [`SconeDropdown`](./components/navigation/SCONE-DROPDOWN.md)
- [`SconeMenu`](./components/navigation/SCONE-MENU.md)
- [`SconeTooltip`](./components/navigation/SCONE-TOOLTIP.md)
- [`SconeCommand`](./components/navigation/SCONE-COMMAND.md)
- [`SconeAccordion`](./components/navigation/SCONE-ACCORDION.md)
- [`SconeCollapsible`](./components/navigation/SCONE-COLLAPSIBLE.md)

### Media components

- [`SconeImage`](./components/media/SCONE-IMAGE.md)
- [`SconeAvatar`](./components/media/SCONE-AVATAR.md)

## Recipes

- [Popover Recipe](./recipes/POPOVER.md)
- [Logo Recipe](./recipes/LOGO.md)

## Anti-patterns

- 用 Dropdown 做表单选择。
- 用 Tabs 做全局导航或路由系统。
- 用 Tooltip 放错误文案、表单说明或可点击内容。
- 在基础 Menu 中内置权限过滤和路由匹配。
- 在未定义键盘模型前实现复杂 Tree。
