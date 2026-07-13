# DESIGN: Admin UI

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

## File Placement Design

依据文件：

- `docs/10-specs/README.md`
- `docs/10-specs/ADMIN-UI-SPEC.md`
- `docs/10-specs/COMPONENT-SELECTION.md`

本节只定义后续目标文件名，不创建源码文件。

| 文件 | 职责 | SPEC 来源 | 公共 API |
| --- | --- | --- | --- |
| `docs/30-designs/DESIGN-ADMIN-UI.md` | 设计阶段产物，记录架构、文件落点、导出、组件族、Pattern、Recipe、类型和验证设计。 | `docs/30-designs/RUNBOOK-SPEC-TO-DESIGN.md` | 否 |
| `docs/30-designs/RUNBOOK-SPEC-TO-DESIGN.md` | 临时执行手册，DESIGN 审核通过和任务拆解完成后删除。 | `docs/00-governance/DOCUMENT-RULES.md` | 否 |
| `src/styles/theme.css` | CSS variables 唯一数值源。 | `docs/10-specs/FOUNDATIONS-SPEC.md` | 否 |
| `src/styles.css` | 引入 theme、Tailwind layers 和全局基础样式。 | `docs/10-specs/FOUNDATIONS-SPEC.md` | 否 |
| `tailwind.config.ts` | 映射 `src/styles/theme.css` 中的 CSS variables；若项目保持无 Tailwind 配置，DESIGN 后续需在 Review Questions 中确认等价方案。 | `docs/10-specs/FOUNDATIONS-SPEC.md` | 否 |
| `src/types/foundation.ts` | Foundation shared types，例如 `ResponsiveValue<T>`、`SconeOption<Value>`、`Key`、`SconeTone` 和词表类型。 | `docs/10-specs/FOUNDATIONS-SPEC.md` | 是 |
| `src/lib/cn.ts` | className 合并工具。 | `docs/10-specs/ADMIN-UI-SPEC.md` | 否 |
| `src/lib/compose-refs.ts` | ref 合并工具。 | `docs/10-specs/ADMIN-UI-SPEC.md` | 否 |
| `src/lib/use-controllable-state.ts` | 受控/非受控状态辅助。 | `docs/10-specs/ADMIN-UI-SPEC.md` | 否 |
| `src/lib/aria.ts` | ARIA/id 辅助。 | `docs/10-specs/ADMIN-UI-SPEC.md` | 否 |
| `src/components/form/index.ts` | Form 组件族导出入口。 | `docs/10-specs/COMPONENT-SPEC-FORM.md` | 是 |
| `src/components/data-display/index.ts` | Data Display 组件族导出入口。 | `docs/10-specs/COMPONENT-SPEC-DATA-DISPLAY.md` | 是 |
| `src/components/layout/index.ts` | Layout 组件族导出入口。 | `docs/10-specs/COMPONENT-SPEC-LAYOUT.md` | 是 |
| `src/components/feedback-overlay/index.ts` | Feedback And Overlay 组件族导出入口。 | `docs/10-specs/COMPONENT-SPEC-FEEDBACK-OVERLAY.md` | 是 |
| `src/components/navigation/index.ts` | Navigation 组件族导出入口。 | `docs/10-specs/COMPONENT-SPEC-NAVIGATION-MEDIA.md` | 是 |
| `src/components/media/index.ts` | Media 组件族导出入口。 | `docs/10-specs/COMPONENT-SPEC-NAVIGATION-MEDIA.md` | 是 |
| `src/patterns/index.ts` | Admin Pattern 导出入口。 | `docs/10-specs/ADMIN-PATTERNS-SPEC.md` | 是 |
| `src/recipes/index.ts` | 仅当 DESIGN 后续确认 Recipe 需要源码示例时存在；docs-only Recipe 不通过该入口导出正式 API。 | `docs/10-specs/recipes/*.md` | 否 |
| `src/index.ts` | 库级公共导出入口，汇总 Foundation types、组件族、Pattern parts 和 provider/service export。 | `docs/10-specs/COMPONENT-SELECTION.md` | 是 |

组件目标文件：

| 组件族 | 目标文件 |
| --- | --- |
| Form | `src/components/form/button.tsx`、`src/components/form/input.tsx`、`src/components/form/search-input.tsx`、`src/components/form/password-input.tsx`、`src/components/form/textarea.tsx`、`src/components/form/select.tsx`、`src/components/form/form.tsx`、`src/components/form/field.tsx`、`src/components/form/field-group.tsx`、`src/components/form/form-section.tsx`、`src/components/form/form-actions.tsx`、`src/components/form/combobox.tsx`、`src/components/form/switch.tsx`、`src/components/form/checkbox.tsx`、`src/components/form/radio-group.tsx`、`src/components/form/number-input.tsx`、`src/components/form/slider.tsx`、`src/components/form/date-picker.tsx`、`src/components/form/upload.tsx` |
| Data Display | `src/components/data-display/descriptions.tsx`、`src/components/data-display/table.tsx`、`src/components/data-display/card.tsx`、`src/components/data-display/tag.tsx`、`src/components/data-display/badge.tsx`、`src/components/data-display/list.tsx`、`src/components/data-display/typography.tsx`、`src/components/data-display/statistic.tsx`、`src/components/data-display/timeline.tsx` |
| Layout | `src/components/layout/stack.tsx`、`src/components/layout/inline.tsx`、`src/components/layout/compact.tsx`、`src/components/layout/toolbar.tsx`、`src/components/layout/split-pane.tsx`、`src/components/layout/separator.tsx`、`src/components/layout/scroll-area.tsx` |
| Feedback And Overlay | `src/components/feedback-overlay/drawer.tsx`、`src/components/feedback-overlay/dialog.tsx`、`src/components/feedback-overlay/confirm.tsx`、`src/components/feedback-overlay/alert.tsx`、`src/components/feedback-overlay/empty.tsx`、`src/components/feedback-overlay/loading.tsx`、`src/components/feedback-overlay/progress.tsx`、`src/components/feedback-overlay/toast.tsx`、`src/components/feedback-overlay/notification.tsx` |
| Navigation | `src/components/navigation/breadcrumb.tsx`、`src/components/navigation/pagination.tsx`、`src/components/navigation/tabs.tsx`、`src/components/navigation/segmented.tsx`、`src/components/navigation/tree.tsx`、`src/components/navigation/dropdown.tsx`、`src/components/navigation/menu.tsx`、`src/components/navigation/tooltip.tsx`、`src/components/navigation/command.tsx`、`src/components/navigation/accordion.tsx`、`src/components/navigation/collapsible.tsx` |
| Media | `src/components/media/image.tsx`、`src/components/media/avatar.tsx` |

Pattern 目标文件：

| Pattern | 目标文件 |
| --- | --- |
| AppShell | `src/patterns/app-shell.tsx` |
| Page | `src/patterns/page.tsx` |
| Section | `src/patterns/section.tsx` |
| FilterBar | `src/patterns/filter-bar.tsx` |
| DataTable | `src/patterns/data-table.tsx` |
| FormPage | `src/patterns/form-page.tsx` |
| DetailPage | `src/patterns/detail-page.tsx` |
| SettingsPage | `src/patterns/settings-page.tsx` |
| MasterDetail | `src/patterns/master-detail.tsx` |

Recipe 目标文件：

| Recipe | 目标落点 |
| --- | --- |
| DrawerForm | `src/recipes/drawer-form.tsx` 或 docs-only 示例，后续由 Recipe Designs 确认。 |
| ConfirmationFlow | `src/recipes/confirmation-flow.tsx` 或 docs-only 示例，后续由 Recipe Designs 确认。 |
| Popover | docs-only：`docs/10-specs/recipes/POPOVER.md`，不创建 `SconePopover`。 |
| Logo | docs-only：`docs/10-specs/recipes/LOGO.md`，不创建 `SconeLogo`。 |
| Result | docs-only：`docs/10-specs/recipes/RESULT.md`，不创建 `SconeResult`。 |
| Dashboard Metric | `src/recipes/dashboard-metric.tsx` 或 docs-only 示例，后续由 Recipe Designs 确认。 |
| Grid | `src/recipes/grid.tsx` 或 docs-only 示例，后续由 Recipe Designs 确认。 |

测试目标文件：

| 范围 | 目标测试文件 |
| --- | --- |
| Foundation | `src/types/foundation.test.ts` |
| Shared utilities | `src/lib/shared-utils.test.ts` |
| Form | `src/components/form/form.test.tsx`、`src/components/form/controls.test.tsx` |
| Data Display | `src/components/data-display/data-display.test.tsx` |
| Layout | `src/components/layout/layout.test.tsx` |
| Feedback And Overlay | `src/components/feedback-overlay/feedback-overlay.test.tsx` |
| Navigation | `src/components/navigation/navigation.test.tsx` |
| Media | `src/components/media/media.test.tsx` |
| Patterns | `src/patterns/patterns.test.tsx` |
| Recipes | `src/recipes/recipes.test.tsx`，仅在存在源码 Recipe 时使用。 |
| Public exports | `src/index.test.ts` |

## Source Layout Design

依据文件：

- `docs/10-specs/README.md`
- `docs/10-specs/ADMIN-UI-SPEC.md`
- `docs/10-specs/COMPONENT-SELECTION.md`

源码布局应以 `src/index.ts` 作为公共导出入口，以组件族目录作为内部组织边界，以 `src/types/foundation.ts` 和 `src/lib/*.ts` 承载跨组件共享能力。

目标结构：

```text
src/
  components/
    data-display/
    feedback-overlay/
    form/
    layout/
    media/
    navigation/
  lib/
  patterns/
  recipes/
  styles/
  types/
  index.ts
```

设计规则：

- `src/components/*/index.ts` 只导出本组件族公共组件和必要公共类型，不导出私有 helper。
- 单组件文件优先承载组件实现和紧耦合 props 类型；跨组件共享类型必须提升到 `src/types/foundation.ts` 或组件族入口。
- `src/lib/*.ts` 只承载组件库通用工具，不承载产品业务、请求、权限、路由或状态机。
- `src/patterns/*.tsx` 只导出 Pattern compound parts，不导出大配置对象。
- `src/recipes/*.tsx` 不是正式组件 API 入口；若存在，只作为可复制示例或组合辅助，不能新增 `Scone*` export。
- `src/styles/theme.css` 是 CSS variables 唯一数值源；`src/styles.css` 只负责引入 theme、Tailwind layers 和全局基础样式。
- `src/index.ts` 汇总公共 API，导出范围必须与 `docs/10-specs/COMPONENT-SELECTION.md` 的 Export Groups 一致。
