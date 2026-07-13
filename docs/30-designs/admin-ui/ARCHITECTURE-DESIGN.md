# Admin UI Architecture Design

## Purpose

依据文件：

- `docs/10-specs/README.md`
- `docs/10-specs/ADMIN-UI-SPEC.md`
- `docs/10-specs/COMPONENT-SELECTION.md`

本文档是 `scone-ui` admin-ui 组件库的设计阶段产物，用于把 `docs/10-specs/` 中已经成型的 SPEC 转换为可审核的工程设计。它描述后续实现应如何组织目录、导出、组件族、Admin Pattern、Recipe、类型、状态、可访问性和验证策略。

本文档不是实现记录，不代表代码已完成，不创建产品应用规则，也不把业务流程、权限、接口、路由或产品文案纳入通用组件库。

设计目标：

- 保持 `scone-ui` 作为 admin-ui 组件库和 UI 治理 workspace 的边界。
- 以 `docs/10-specs/README.md` 作为 SPEC 入口，不绕过核心 SPEC 直接按文件名猜测 API。
- 以 `docs/10-specs/COMPONENT-SELECTION.md` 作为当前能力范围、source strategy 和导出分组依据。
- 为后续人工审核和任务拆解提供精确文件落点、导出边界、类型边界和验证入口。

## Source Files

依据文件：

- `docs/10-specs/README.md`
- `docs/10-specs/ADMIN-UI-SPEC.md`
- `docs/10-specs/COMPONENT-SELECTION.md`

本 DESIGN 使用以下 SPEC 作为当前阶段输入。

核心 SPEC：

- `docs/10-specs/README.md`：SPEC 读取顺序、文件合同、组件和 Pattern 索引。
- `docs/10-specs/ADMIN-UI-SPEC.md`：仓库定位、Layer Model、source strategy、API principles、props/events policy、verification 基线。
- `docs/10-specs/FOUNDATIONS-SPEC.md`：跨组件词汇、theme contract、token、size、density、layout preset、shared types。
- `docs/10-specs/COMPONENT-SELECTION.md`：当前实现范围、source strategy、Export Groups、State Matrix、Anti-patterns。
- `docs/10-specs/ADMIN-PATTERNS-SPEC.md`：Admin Pattern 与 Recipe 索引。

分组 SPEC：

- `docs/10-specs/COMPONENT-SPEC-FORM.md`
- `docs/10-specs/COMPONENT-SPEC-DATA-DISPLAY.md`
- `docs/10-specs/COMPONENT-SPEC-LAYOUT.md`
- `docs/10-specs/COMPONENT-SPEC-FEEDBACK-OVERLAY.md`
- `docs/10-specs/COMPONENT-SPEC-NAVIGATION-MEDIA.md`

组件 SPEC：

- `docs/10-specs/components/form/SCONE-BUTTON.md`
- `docs/10-specs/components/form/SCONE-INPUT.md`
- `docs/10-specs/components/form/SCONE-SEARCH-INPUT.md`
- `docs/10-specs/components/form/SCONE-PASSWORD-INPUT.md`
- `docs/10-specs/components/form/SCONE-TEXTAREA.md`
- `docs/10-specs/components/form/SCONE-SELECT.md`
- `docs/10-specs/components/form/SCONE-FORM.md`
- `docs/10-specs/components/form/SCONE-FIELD.md`
- `docs/10-specs/components/form/SCONE-FIELD-GROUP.md`
- `docs/10-specs/components/form/SCONE-FORM-SECTION.md`
- `docs/10-specs/components/form/SCONE-FORM-ACTIONS.md`
- `docs/10-specs/components/form/SCONE-COMBOBOX.md`
- `docs/10-specs/components/form/SCONE-SWITCH.md`
- `docs/10-specs/components/form/SCONE-CHECKBOX.md`
- `docs/10-specs/components/form/SCONE-RADIO-GROUP.md`
- `docs/10-specs/components/form/SCONE-NUMBER-INPUT.md`
- `docs/10-specs/components/form/SCONE-SLIDER.md`
- `docs/10-specs/components/form/SCONE-DATE-PICKER.md`
- `docs/10-specs/components/form/SCONE-UPLOAD.md`
- `docs/10-specs/components/data-display/SCONE-DESCRIPTIONS.md`
- `docs/10-specs/components/data-display/SCONE-TABLE.md`
- `docs/10-specs/components/data-display/SCONE-CARD.md`
- `docs/10-specs/components/data-display/SCONE-TAG.md`
- `docs/10-specs/components/data-display/SCONE-BADGE.md`
- `docs/10-specs/components/data-display/SCONE-LIST.md`
- `docs/10-specs/components/data-display/SCONE-TYPOGRAPHY.md`
- `docs/10-specs/components/data-display/SCONE-STATISTIC.md`
- `docs/10-specs/components/data-display/SCONE-TIMELINE.md`
- `docs/10-specs/components/layout/SCONE-STACK.md`
- `docs/10-specs/components/layout/SCONE-INLINE.md`
- `docs/10-specs/components/layout/SCONE-COMPACT.md`
- `docs/10-specs/components/layout/SCONE-TOOLBAR.md`
- `docs/10-specs/components/layout/SCONE-SPLIT-PANE.md`
- `docs/10-specs/components/layout/SCONE-SEPARATOR.md`
- `docs/10-specs/components/layout/SCONE-SCROLL-AREA.md`
- `docs/10-specs/components/feedback-overlay/SCONE-DRAWER.md`
- `docs/10-specs/components/feedback-overlay/SCONE-DIALOG.md`
- `docs/10-specs/components/feedback-overlay/SCONE-CONFIRM.md`
- `docs/10-specs/components/feedback-overlay/SCONE-ALERT.md`
- `docs/10-specs/components/feedback-overlay/SCONE-EMPTY.md`
- `docs/10-specs/components/feedback-overlay/SCONE-LOADING.md`
- `docs/10-specs/components/feedback-overlay/SCONE-PROGRESS.md`
- `docs/10-specs/components/feedback-overlay/SCONE-TOAST.md`
- `docs/10-specs/components/feedback-overlay/SCONE-NOTIFICATION.md`
- `docs/10-specs/components/navigation/SCONE-BREADCRUMB.md`
- `docs/10-specs/components/navigation/SCONE-PAGINATION.md`
- `docs/10-specs/components/navigation/SCONE-TABS.md`
- `docs/10-specs/components/navigation/SCONE-SEGMENTED.md`
- `docs/10-specs/components/navigation/SCONE-TREE.md`
- `docs/10-specs/components/navigation/SCONE-DROPDOWN.md`
- `docs/10-specs/components/navigation/SCONE-MENU.md`
- `docs/10-specs/components/navigation/SCONE-TOOLTIP.md`
- `docs/10-specs/components/navigation/SCONE-COMMAND.md`
- `docs/10-specs/components/navigation/SCONE-ACCORDION.md`
- `docs/10-specs/components/navigation/SCONE-COLLAPSIBLE.md`
- `docs/10-specs/components/media/SCONE-IMAGE.md`
- `docs/10-specs/components/media/SCONE-AVATAR.md`

Pattern SPEC：

- `docs/10-specs/patterns/APP-SHELL.md`
- `docs/10-specs/patterns/PAGE.md`
- `docs/10-specs/patterns/SECTION.md`
- `docs/10-specs/patterns/FILTER-BAR.md`
- `docs/10-specs/patterns/DATA-TABLE.md`
- `docs/10-specs/patterns/FORM-PAGE.md`
- `docs/10-specs/patterns/DETAIL-PAGE.md`
- `docs/10-specs/patterns/SETTINGS-PAGE.md`
- `docs/10-specs/patterns/MASTER-DETAIL.md`

Recipe SPEC：

- `docs/10-specs/recipes/DRAWER-FORM.md`
- `docs/10-specs/recipes/CONFIRMATION-FLOW.md`
- `docs/10-specs/recipes/POPOVER.md`
- `docs/10-specs/recipes/LOGO.md`
- `docs/10-specs/recipes/RESULT.md`
- `docs/10-specs/recipes/DASHBOARD-METRIC.md`
- `docs/10-specs/recipes/GRID.md`

## Architecture Decisions

依据文件：

- `docs/10-specs/ADMIN-UI-SPEC.md`
- `docs/10-specs/COMPONENT-SELECTION.md`

`scone-ui` 的后续实现按 `Foundation -> Primitive -> Component/Layout -> Admin Pattern -> Recipe` 的方向组织。上层可以组合下层，下层不得反向承接 Pattern、Recipe 或业务侧规则。

层级设计：

- Foundation：集中维护跨组件词汇、theme token、size、density、shared types、响应式和可访问性规则。
- Primitive：继承 Radix 或原生 HTML 的交互模型，不在本 DESIGN 中单独形成公共业务语义。
- Component：提供稳定 `Scone*` API、DOM/ref/className 边界、状态语义和测试入口。
- Layout：只表达空间、排列、滚动和区域组织，不承载业务状态。
- Admin Pattern：通过 compound parts 表达高频 Admin 结构，不提供万能配置对象。
- Recipe：作为可复制组合方案，不产生新的正式 `Scone*` API。

Source strategy 到设计形态的映射：

| Source strategy | 设计形态 |
| --- | --- |
| `vendored-shadcn` | 目标文件保留 shadcn/Radix 组合模型，允许 token、density、class 边界调整，不破坏 `ref`、`asChild`、DOM 语义和可访问性行为。 |
| `scone-wrapper` | 目标文件增加 Admin 语义，例如 `tone`、`size`、`loading`、`ariaLabel`、稳定 slot 或服务 API；wrapper 不吞掉底层 compound parts。 |
| `pattern-only` | 目标文件只导出明确 compound parts，不设计大配置对象，不内置请求、路由、权限或业务字段。 |
| `direct-docs-only` | 不创建 wrapper 目标；DESIGN 只记录使用边界、复用组件和可验证组合方式。 |
| `custom` | 目标文件必须在 DESIGN 中明确键盘、ARIA、状态模型、受控/非受控策略和测试入口。 |
| `no-component` | 不进入当前导出面；仅在 SPEC 选择指南或覆盖审计中解释替代方式。 |

通用 API 决策：

- 受控/非受控命名固定使用 `value/defaultValue/onValueChange`、`open/defaultOpen/onOpenChange`、`checked/defaultChecked/onCheckedChange`。
- 用户明确动作使用 `onSelect`、`onConfirm`、`onCancel`、`onClear`、`onApply`、`onReset`、`onDismiss` 等动词事件，不设计万能 `onChange` payload。
- `tone` 表示语义色，`status` 表示流程状态，危险动作使用 `destructive`。
- `size` 只表达控件高度，`density` 表达信息区域节奏；宽度和高度 preset 使用布局语义，不复用 `size`。
- 数据展示状态优先级固定为 `loading > error > empty`。
- 组件和 Pattern 不发起请求、不判断权限、不修改路由、不内置产品文案。
