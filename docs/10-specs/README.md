# Admin UI Specs

本文档是 `admin-ui` SPEC 的工程索引。实现组件、审核组件或生成迁移计划时，从本文件进入，再按目标读取最小必要 SPEC。

## Read Protocol

AI 或实现者按以下顺序读取：

1. 读取本 README，确认目标能力所属层级和文件位置。
2. 读取 [`ADMIN-UI-SPEC.md`](./ADMIN-UI-SPEC.md) 和 [`FOUNDATIONS-SPEC.md`](./FOUNDATIONS-SPEC.md)，获得全局 API、状态、token、可访问性和 source strategy 规则。
3. 读取 [`COMPONENT-SELECTION.md`](./COMPONENT-SELECTION.md)，确认目标能力是否导出、属于 Component/Layout/Pattern/Recipe，以及 source strategy。
4. 包使用、AI 生成代码或快速查公共 props 类型时，读取 [`PACKAGE-AI-GUIDE.md`](./PACKAGE-AI-GUIDE.md)。
5. 只读取目标组件、Pattern 或 Recipe 的单独 SPEC 文件。
6. 只有涉及范围争议、Not In Scope 或新增组件时，才读取 [`COMPONENT-COVERAGE-AUDIT.md`](./COMPONENT-COVERAGE-AUDIT.md)。

## File Contract

- `ADMIN-UI-SPEC.md` 是总纲，不承载单组件 API 细节。
- `FOUNDATIONS-SPEC.md` 是跨组件共享类型、token、状态和可访问性权威。
- `COMPONENT-SELECTION.md` 是导出范围、source strategy 和组件选择权威。
- `PACKAGE-AI-GUIDE.md` 是发布包后面向 AI 和调用方的公共 API、props 类型、导入规则和禁止导入边界索引。
- `components/**/*.md` 是单组件 props、events、state、usage 和 out-of-scope 权威。
- `patterns/**/*.md` 是 Admin Pattern anatomy、slot、状态归属和组合边界权威。
- `recipes/**/*.md` 是可复制组合方式，不产生新的 `Scone*` 组件 API。
- `COMPONENT-SPEC-*.md` 是分组索引和共享规则页，不再承载单组件完整合同。

## Implementation Checklist

落代码前必须确认：

- 目标文件存在 `Metadata`，且 `Status` 为 `Ready` 或 `Ready Boundary`。
- props 表覆盖受控值、默认值、事件、slot、状态和 `className`。
- events 使用本 SPEC 的命名基线，例如 `onValueChange`、`onOpenChange`、`onRequestClose`。
- 组件没有内置请求、权限、路由、业务字典或产品文案。
- `className`、`ref`、可访问名称和核心状态可以被测试覆盖。

## Core Specs

- [`ADMIN-UI-SPEC.md`](./ADMIN-UI-SPEC.md)：组件库定位、层级模型、API 原则、source strategy 和验证基线。
- [`FOUNDATIONS-SPEC.md`](./FOUNDATIONS-SPEC.md)：跨组件词汇、tokens、shared types、状态语义、响应式和可访问性规则。
- [`COMPONENT-SELECTION.md`](./COMPONENT-SELECTION.md)：组件选择规则、能力矩阵、导出分组和状态矩阵。
- [`PACKAGE-AI-GUIDE.md`](./PACKAGE-AI-GUIDE.md)：包发布后的 AI 使用入口、公共导入规则、组件 registry、props 类型和 SPEC 路由。
- [`COMPONENT-COVERAGE-AUDIT.md`](./COMPONENT-COVERAGE-AUDIT.md)：覆盖审计、Not In Scope 和 Recipe 边界。
- [`ADMIN-PATTERNS-SPEC.md`](./ADMIN-PATTERNS-SPEC.md)：Page、Section、FilterBar、DataTable、FormPage、DetailPage 等 Admin Pattern。

## Component Specs

### Form

- [`SconeButton`](./components/form/SCONE-BUTTON.md)
- [`SconeInput`](./components/form/SCONE-INPUT.md)
- [`SconeSearchInput`](./components/form/SCONE-SEARCH-INPUT.md)
- [`SconePasswordInput`](./components/form/SCONE-PASSWORD-INPUT.md)
- [`SconeTextArea`](./components/form/SCONE-TEXTAREA.md)
- [`SconeSelect`](./components/form/SCONE-SELECT.md)
- [`SconeForm`](./components/form/SCONE-FORM.md)
- [`SconeField`](./components/form/SCONE-FIELD.md)
- [`SconeFieldGroup`](./components/form/SCONE-FIELD-GROUP.md)
- [`SconeFormSection`](./components/form/SCONE-FORM-SECTION.md)
- [`SconeFormActions`](./components/form/SCONE-FORM-ACTIONS.md)
- [`SconeCombobox`](./components/form/SCONE-COMBOBOX.md)
- [`SconeSwitch`](./components/form/SCONE-SWITCH.md)
- [`SconeCheckbox`](./components/form/SCONE-CHECKBOX.md)
- [`SconeRadioGroup`](./components/form/SCONE-RADIO-GROUP.md)
- [`SconeNumberInput`](./components/form/SCONE-NUMBER-INPUT.md)
- [`SconeSlider`](./components/form/SCONE-SLIDER.md)
- [`SconeDatePicker`](./components/form/SCONE-DATE-PICKER.md)
- [`SconeUpload`](./components/form/SCONE-UPLOAD.md)

### Data Display

- [`SconeDescriptions`](./components/data-display/SCONE-DESCRIPTIONS.md)
- [`SconeTable`](./components/data-display/SCONE-TABLE.md)
- [`SconeCard`](./components/data-display/SCONE-CARD.md)
- [`SconeTag`](./components/data-display/SCONE-TAG.md)
- [`SconeBadge`](./components/data-display/SCONE-BADGE.md)
- [`SconeList`](./components/data-display/SCONE-LIST.md)
- [`SconeTypography`](./components/data-display/SCONE-TYPOGRAPHY.md)
- [`SconeStatistic`](./components/data-display/SCONE-STATISTIC.md)
- [`SconeTimeline`](./components/data-display/SCONE-TIMELINE.md)

### Layout

- [`SconeStack`](./components/layout/SCONE-STACK.md)
- [`SconeInline`](./components/layout/SCONE-INLINE.md)
- [`SconeCompact`](./components/layout/SCONE-COMPACT.md)
- [`SconeToolbar`](./components/layout/SCONE-TOOLBAR.md)
- [`SconeSplitPane`](./components/layout/SCONE-SPLIT-PANE.md)
- [`SconeSeparator`](./components/layout/SCONE-SEPARATOR.md)
- [`SconeScrollArea`](./components/layout/SCONE-SCROLL-AREA.md)

### Feedback And Overlay

- [`SconeDrawer`](./components/feedback-overlay/SCONE-DRAWER.md)
- [`SconeDialog`](./components/feedback-overlay/SCONE-DIALOG.md)
- [`SconeConfirm`](./components/feedback-overlay/SCONE-CONFIRM.md)
- [`SconeAlert`](./components/feedback-overlay/SCONE-ALERT.md)
- [`SconeEmpty`](./components/feedback-overlay/SCONE-EMPTY.md)
- [`SconeLoading`](./components/feedback-overlay/SCONE-LOADING.md)
- [`SconeProgress`](./components/feedback-overlay/SCONE-PROGRESS.md)
- [`SconeToast`](./components/feedback-overlay/SCONE-TOAST.md)
- [`SconeNotification`](./components/feedback-overlay/SCONE-NOTIFICATION.md)

### Navigation

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

### Media

- [`SconeImage`](./components/media/SCONE-IMAGE.md)
- [`SconeAvatar`](./components/media/SCONE-AVATAR.md)

## Recipes

- [DrawerForm Recipe](./recipes/DRAWER-FORM.md)
- [ConfirmationFlow Recipe](./recipes/CONFIRMATION-FLOW.md)
- [Popover Recipe](./recipes/POPOVER.md)
- [Logo Recipe](./recipes/LOGO.md)
- [Result Recipe](./recipes/RESULT.md)
- [Dashboard Metric](./recipes/DASHBOARD-METRIC.md)
- [Grid Recipe](./recipes/GRID.md)

## Pattern Specs

- [App Shell](./patterns/APP-SHELL.md)
- [Page](./patterns/PAGE.md)
- [Section](./patterns/SECTION.md)
- [FilterBar](./patterns/FILTER-BAR.md)
- [DataTable](./patterns/DATA-TABLE.md)
- [FormPage](./patterns/FORM-PAGE.md)
- [DetailPage](./patterns/DETAIL-PAGE.md)
- [SettingsPage](./patterns/SETTINGS-PAGE.md)
- [MasterDetail](./patterns/MASTER-DETAIL.md)

## Group Indexes

分组文件保留为共享规则和二级索引页：

- [`COMPONENT-SPEC-FORM.md`](./COMPONENT-SPEC-FORM.md)
- [`COMPONENT-SPEC-DATA-DISPLAY.md`](./COMPONENT-SPEC-DATA-DISPLAY.md)
- [`COMPONENT-SPEC-LAYOUT.md`](./COMPONENT-SPEC-LAYOUT.md)
- [`COMPONENT-SPEC-FEEDBACK-OVERLAY.md`](./COMPONENT-SPEC-FEEDBACK-OVERLAY.md)
- [`COMPONENT-SPEC-NAVIGATION-MEDIA.md`](./COMPONENT-SPEC-NAVIGATION-MEDIA.md)
