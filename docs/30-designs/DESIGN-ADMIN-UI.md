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

## Theme And Foundation Design

依据文件：

- `docs/10-specs/FOUNDATIONS-SPEC.md`
- `docs/10-specs/ADMIN-UI-SPEC.md`

Theme 是 `admin-ui` 的视觉实现合约。后续实现必须把语义 token 映射为 CSS variables、Tailwind theme 和组件 class，不在组件文件或组件 SPEC 中散落固定 px/rem、hex、阴影、字体数值或 z-index 数值。

目标文件：

| 文件 | 职责 |
| --- | --- |
| `src/styles/theme.css` | CSS variables 唯一数值源。 |
| `src/styles.css` | 引入 theme、Tailwind layers 和全局基础样式。 |
| `tailwind.config.ts` | 只映射 `src/styles/theme.css` 中的 CSS variables；若项目不引入 Tailwind 配置，需要在 Review Questions 中确认等价映射方案。 |

硬约束：

- 不创建第二套 `tokens.ts` 数值源。
- 若后续需要 TypeScript token 名称，只允许导出 token key，不导出 token 数值。
- CSS variables 使用 `--scone-*` 前缀，例如 `--scone-color-background`、`--scone-spacing-md`、`--scone-radius-sm`。
- 组件 class 只能消费语义 token，例如 `bg-background`、`text-foreground`、`border-border`、`ring-ring`。
- `tone` 到颜色的映射由 theme 决定，组件只传递 `tone` 语义。
- 当前主题目标只覆盖 light theme；dark mode 后续若纳入，必须先补 contrast、surface、overlay 和 chart/token 映射。

Token families：

| 族 | 最小 key | 设计要求 |
| --- | --- | --- |
| Color | `background`、`foreground`、`muted`、`muted-foreground`、`border`、`ring`、`primary`、`primary-foreground`、`neutral`、`info`、`success`、`warning`、`danger` | 覆盖背景、前景、边框、焦点、状态和语义色；不得直接使用产品品牌色或后端状态名。 |
| Spacing | `2xs`、`xs`、`sm`、`md`、`lg`、`xl` | 用于组件内部间距、组件间距和页面分段；默认 API 不接受任意 number。 |
| Radius | `sm`、`md`、`lg`、`full` | 控件、卡片、浮层和可交互元素圆角；组件不得内联任意圆角。 |
| Shadow | `sm`、`md`、`lg` | 浮层、弹窗、抽屉和悬浮菜单层级；状态变化不得依赖阴影作为唯一反馈。 |
| Typography | `body`、`label`、`title`、`mono` | 字号、行高、字重和等宽字体语义层级。 |
| Focus | `ring`、`ring-offset` | 键盘焦点可见样式，所有可交互组件共享。 |
| Motion | `duration-fast`、`duration-default`、`easing-standard` | 浮层、折叠、加载和状态切换动画；不得阻断 reduced motion。 |
| Z-index | `sticky`、`dropdown`、`popover`、`drawer`、`modal`、`toast` | 由 theme 或 overlay policy 管理，组件不得私自递增数字。 |
| Control | `control-height-sm/md/lg`、`icon-size-sm/md/lg`、`hit-area-min`、`table-row-height-*`、`list-row-height-*`、`toolbar-height-*` | 控件高度、图标尺寸、点击热区和数据行高度。 |

Size 和 density：

| 名称 | 值 | 适用范围 |
| --- | --- | --- |
| `SconeControlSize` | `sm`、`md`、`lg` | Button、Input、SearchInput、PasswordInput、Select、Segmented、Checkbox、Switch、Radio、NumberInput、DatePicker 等控件高度。 |
| `SconeDensity` | `compact`、`default`、`comfortable` | Table、List、Descriptions、Toolbar 和 DataTable 区域的信息密度。 |

规则：

- `size` 表达单个可交互控件高度，不表达 Drawer 宽度、Card 体量或页面宽度。
- `density` 表达信息区域的行高、内边距和扫描节奏，不替代控件 `size`。
- Toolbar `density="compact"` 默认搭配 `size="sm"` 控件；`density="default"` 默认搭配 `size="md"` 控件。
- `comfortable` 只用于阅读性优先的详情或设置区域，不用于大批量数据表。
- 图标按钮的可点击区域不得小于 `hit-area-min`。

Layout preset：

| 语义 | token / preset | 使用对象 |
| --- | --- | --- |
| page width | `page-width-narrow/content/wide/full` | `Page.Root` |
| drawer width | `drawer-width-sm/md/lg/full` | `SconeDrawer` |
| split pane size | `split-pane-size-narrow/medium/wide/fill` | `SconeSplitPane` |
| table region | `table-region-height-sm/md/lg/full` | `DataTable.TableRegion` |
| scroll viewport | `scroll-viewport-height-sm/md/lg` | `SconeScrollArea` |
| sticky offset | `sticky-offset-header/footer` | Page、DataTable 和 FormActions |

布局规则：

- 布局尺寸使用 preset 和 CSS 长度边界，不把无单位 `number` 作为公共 API。
- 覆盖字段必须带单位或百分比，例如 `320px`、`40rem`、`50%`。
- 主滚动容器只能有一个；页面使用 `Page.Content`，局部区域使用 `SconeScrollArea` 或 Pattern 定义的 viewport slot。
- sticky header/footer 必须绑定到同一个 scroll viewport，并由对应 Pattern 负责留出 padding 或 offset。

Loading categories：

| 类别 | 使用对象 | 行为 |
| --- | --- | --- |
| `action` | Button、单个提交动作 | 保持原尺寸，默认禁用重复触发。 |
| `region` | Drawer、Card、Section 区域 | 设置 `aria-busy`，保留内容容器尺寸。 |
| `data` | Table、List、DataTable | `loading > error > empty`，由数据区域决定状态容器。 |

Icon policy：

- 不提供独立 `SconeIcon` 组件。
- 图标由调用方传入，组件只规定尺寸、语义和可访问边界。
- 图标按钮必须提供可见文本或 `ariaLabel`。
- 装饰性图标必须对辅助技术隐藏。
- 产品业务图标、品牌图形、资源类型图标和权限图标由产品侧组合，不进入 Foundation token 或通用组件。

State semantics：

| 状态 | 设计要求 |
| --- | --- |
| Focus visible | 键盘聚焦必须可见，不移除浏览器或 Radix 可访问焦点行为。 |
| Disabled | 不触发交互，不作为唯一权限表达。 |
| Readonly | 可聚焦、可复制、不可修改，与 disabled 视觉可区分。 |
| Loading | 保留原尺寸；操作级默认禁用重复提交；区域级设置 `aria-busy`。 |
| Invalid | 使用 `aria-invalid` 和 `aria-describedby`，并与错误文案关联。 |
| Empty | 说明当前没有什么；可恢复时提供 `action`。 |
| Error | 数据型组件中优先级高于 empty。 |
| Selected | 与 hover/focus 区分，并能通过键盘或状态属性识别。 |
| Expanded | 使用 `aria-expanded` 或底层 Radix 状态。 |

Responsive 和 accessibility：

- Admin UI 最小支持内容宽度为 `360px`。
- 页面主滚动由 `Page.Content` 承担；局部滚动使用 `SconeScrollArea`。
- 表格窄屏优先横向滚动或列裁剪 recipe，不默认改造成卡片列表。
- 工具栏窄屏允许换行，主操作优先可见，次要操作进入菜单。
- Drawer 窄屏可提升为 `full` 宽度；Dialog 不承载长表单。
- 基于 Radix 的组件必须保留原有键盘、焦点、ARIA 和关闭行为。
- Tooltip 不能承载必读信息；阻断性错误使用 Alert 或字段错误。
- 颜色状态必须配合文本、图标或结构，不得只依赖色彩。

## Type And Data Structure Design

依据文件：

- `docs/10-specs/FOUNDATIONS-SPEC.md`
- `docs/10-specs/ADMIN-UI-SPEC.md`

类型文件归属：

| 文件 | 类型范围 | 导出边界 |
| --- | --- | --- |
| `src/types/foundation.ts` | Foundation shared types、词表类型、基础状态桥接类型。 | 从 `src/index.ts` 公开导出。 |
| `src/components/*/*.tsx` | 与单组件紧耦合的 props 和 item 类型。 | 组件公共 props 可从组件族入口导出；内部 helper 类型不导出。 |
| `src/patterns/*.tsx` | Pattern compound parts props、slot props 和 Pattern 状态桥接。 | Pattern 公共 props 可从 `src/patterns/index.ts` 和 `src/index.ts` 导出。 |
| `src/components/feedback-overlay/toast.tsx` | Toast provider props、service options、queue item、返回 id 和关闭原因。 | Provider、service function 和公共 option 类型公开导出。 |
| `src/components/feedback-overlay/notification.tsx` | Notification provider props、service options、queue item、返回 id 和关闭原因。 | Provider、service function 和公共 option 类型公开导出。 |

公共 Foundation 类型：

| 类型 | 定义位置 | 导出 | 适用组件 | 非目标 |
| --- | --- | --- | --- | --- |
| `Breakpoint` | `src/types/foundation.ts` | 是 | `ResponsiveValue<T>` | 不定义 `mobile/tablet/desktop` 第二套断点。 |
| `ResponsiveValue<T>` | `src/types/foundation.ts` | 是 | Page、Drawer、SplitPane、Descriptions、Toolbar | 不使用数组形态。 |
| `Key` | `src/types/foundation.ts` | 是 | Tree、Table、Timeline、Descriptions、selection | 不默认表达 URL 或网络 id 规范化。 |
| `SconeTone` | `src/types/foundation.ts` | 是 | Alert、Tag、Badge、Progress、Toast、Notification、Timeline | 不表达业务枚举、后端状态或流程阶段。 |
| `SconeSpacingToken` | `src/types/foundation.ts` | 是 | Layout、section spacing、局部间距 API | 不接受任意 number 作为默认公共 API。 |
| `SconeControlSize` | `src/types/foundation.ts` | 是 | 控件型组件 | 不表达容器宽度。 |
| `SconeDensity` | `src/types/foundation.ts` | 是 | Table、List、Descriptions、Toolbar、DataTable | 不替代控件高度。 |
| `SconeOption<Value = string>` | `src/types/foundation.ts` | 是 | Select、Segmented、Combobox、RadioGroup | 不把整条业务对象作为默认 value。 |
| `OverlayCloseReason` | `src/types/foundation.ts` | 是 | Drawer、Dialog、Confirm | 不表达业务取消原因。 |

词表类型：

| 类型 | 值 |
| --- | --- |
| `SconeOrientation` | `horizontal`、`vertical` |
| `SconeAlign` | `start`、`center`、`end` |
| `SconeSide` | `top`、`right`、`bottom`、`left` |
| `SconeStatus` | `idle`、`active`、`success`、`error` |

数据结构类型：

| 类型 | 定义位置 | 用途 | 设计边界 |
| --- | --- | --- | --- |
| `SconeDescriptionItem` | `src/types/foundation.ts` | Descriptions 键值展示项。 | 不直接使用后端字段名；空值 fallback 由调用方或 recipe 处理。 |
| `SconePaginationState` | `src/types/foundation.ts` | Pagination、Table、DataTable 分页桥接。 | 只表达 UI 和查询意图，不发起请求。 |
| `SconePaginationChangeReason` | `src/types/foundation.ts` | 分页变化原因。 | 值限定为 `page`、`pageSize`。 |
| `SconeTableSorting` | `src/types/foundation.ts` | DataTable 排序状态桥接。 | 不在组件内发起请求。 |
| `SconeTableColumn<T>` | `src/types/foundation.ts` 或 `src/components/data-display/table.tsx` | 基础表格列定义。 | 不承载请求、权限、字典加载或业务动作执行。 |
| `SconeTableScroll` | `src/types/foundation.ts` 或 `src/components/data-display/table.tsx` | 基础表格横向滚动配置。 | 不沿用 AntD `{ x, y }` 完整语义；垂直滚动由 TableRegion 管理。 |
| `SconeRowSelection<T>` | `src/types/foundation.ts` 或 `src/patterns/data-table.tsx` | DataTable selection UI 状态桥接。 | 不属于基础 `SconeTable` prop，不定义批量动作。 |
| `SconeBaseItem` | `src/types/foundation.ts` | 动作、导航、路径和命令项共享最小字段。 | 各组件必须扩展自己的 item 类型，不复用万能 schema。 |
| `SconeActionItem` | `src/types/foundation.ts` | Dropdown、ActionMenu 和行操作菜单。 | `destructive` 不自动打开确认；权限过滤由调用方完成。 |
| `SconeNavigationItem` | `src/types/foundation.ts` | Menu、Sidebar 和导航集合。 | 不把 router API 写入 item schema。 |
| `SconeBreadcrumbItem` | `src/types/foundation.ts` | Breadcrumb 路径。 | 不支持 destructive 或动作回调。 |
| `SconeCommandItem` | `src/types/foundation.ts` | Command 搜索项。 | 不表达表单值；表单选择由 Combobox 增加语义。 |
| `SconeTreeNode` | `src/types/foundation.ts` | Tree 和层级选择能力。 | 异步加载、虚拟滚动和拖拽单独扩展。 |
| `SconeAccordionItem` | `src/types/foundation.ts` 或 `src/components/navigation/accordion.tsx` | Accordion 简化配置。 | 复杂内容优先使用 compound children。 |
| `SconeTimelineItem` | `src/types/foundation.ts` 或 `src/components/data-display/timeline.tsx` | Timeline 通用事件项。 | 不承载审批、权限或流程状态机。 |
| `SconeToastItem` | `src/components/feedback-overlay/toast.tsx` | Toast 队列展示项。 | 不承载业务来源、持久化或通知订阅状态。 |
| `SconeNotificationItem` | `src/components/feedback-overlay/notification.tsx` | Notification 队列展示项。 | 已读、订阅来源和持久化由产品侧处理。 |

Props 类型命名：

- 单组件 props 使用 `{ExportName}Props`，例如 `SconeButtonProps`、`SconeTableProps`。
- Compound part props 使用 `{Namespace}{Part}Props`，例如 `PageRootProps`、`DataTableTableRegionProps`。
- Provider props 使用 `{ExportName}ProviderProps`，例如 `SconeToastProviderProps`。
- Service option 类型使用 `{serviceName}Options` 或 `{ExportName}Options`，例如 `ToastOptions`、`NotificationOptions`。
- 组件内部 helper 类型不从 `src/index.ts` 导出。

泛型策略：

- `SconeOption<Value = string>` 默认 value 为 string；Select、Combobox、RadioGroup、Segmented 可通过泛型扩展。
- `SconeTableColumn<T>` 和 `SconeRowSelection<T>` 的 `T` 代表调用方数据行类型；组件不假设业务字段。
- `SconeTreeNode` 默认 key 使用 `Key`，不以数组 index 作为稳定标识。
- 回调 payload 使用稳定值、key 或 UI 状态，不传递整条业务对象作为默认行为；确需 `record` 的表格 render 和 selection 场景由泛型显式表达。

事件 payload：

| 回调 | 参数设计 | DOM event | 业务对象 |
| --- | --- | --- | --- |
| `onValueChange` | `(value: Value) => void` | 否 | 否 |
| `onOpenChange` | `(open: boolean) => void` | 否 | 否 |
| `onCheckedChange` | `(checked: boolean) => void` | 否 | 否 |
| `onSelect` | `(keyOrValue) => void`，具体类型由组件定义。 | 否 | 否 |
| `onConfirm` | `() => void` 或 `(reason)`，仅在 SPEC 明确时扩展。 | 否 | 否 |
| `onCancel` | `() => void` 或 `(reason)`，仅在 SPEC 明确时扩展。 | 否 | 否 |
| `onClear` | `() => void` | 否 | 否 |
| `onApply` | `(state) => void`，用于 FilterBar/DataTable 等 Pattern 状态。 | 否 | 否 |
| `onReset` | `() => void` | 否 | 否 |
| `onDismiss` | `(id: string) => void` 或 close reason，按 service 定义。 | 否 | 否 |

状态结构边界：

- 受控状态必须成组出现：`value/defaultValue/onValueChange`、`open/defaultOpen/onOpenChange`、`checked/defaultChecked/onCheckedChange`。
- 内部派生状态只能用于 UI 展开、焦点、hover、loading 展示等组件内部行为，不泄漏为业务状态。
- `loading`、`empty`、`error`、`invalid`、`selected`、`expanded` 的所有权必须在组件族或 Pattern 章节中说明。
- DataTable 的筛选、排序、分页、选择只表达 UI 状态和调用方意图，不封装请求状态机。

DOM/ref 类型：

- 每个组件或 part 必须在对应组件族章节说明 ref 指向的稳定 DOM 边界。
- 支持 `asChild` 的组件沿用底层 Radix/shadcn 类型模型，不改成不兼容的 `as` API。
- `className` 透传到文档定义的稳定 DOM 边界；slot className 需要按组件 SPEC 明确。

Provider/service 类型：

| 服务 | 公共导出 | 类型边界 |
| --- | --- | --- |
| Toast | `SconeToastProvider`、`toast`、`ToastOptions`、`SconeToastItem`、`ToastPosition` | service 生成或接收 id，返回稳定 id；不承载业务来源或持久化。 |
| Notification | `SconeNotificationProvider`、`notification`、`NotificationOptions`、`SconeNotificationItem`、`NotificationPlacement` | 支持 persistent UI 语义；已读、订阅来源和持久化由产品侧处理。 |

类型验证入口：

- `src/types/foundation.test.ts` 验证公共类型导出和关键泛型默认值。
- `src/index.test.ts` 验证公共类型和 service 类型没有从私有文件隐式泄漏。
- 组件族测试验证 props、事件 payload、ref 和可访问名称行为。

## Export Surface Design

依据文件：

- `docs/10-specs/COMPONENT-SELECTION.md`
- `docs/10-specs/ADMIN-UI-SPEC.md`

公共导出必须以 `docs/10-specs/COMPONENT-SELECTION.md` 的 Export Groups 为准。`src/index.ts` 是库级公共入口；组件族入口只导出本族能力和必要公共类型；Recipe 不默认形成正式 `Scone*` API。

| Export group | 导出名称 | 所属文件路径 | 导出形态 | Compound | Source strategy | 类型归属 | 验证入口 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Admin Pattern exports | `Page.Root/Header/Content/StickyActions` | `src/patterns/page.tsx` | Pattern parts | 是 | `pattern-only` | `src/patterns/page.tsx` | `src/patterns/patterns.test.tsx` |
| Admin Pattern exports | `Section.Root/Header/Content/Footer` | `src/patterns/section.tsx` | Pattern parts | 是 | `pattern-only` | `src/patterns/section.tsx` | `src/patterns/patterns.test.tsx` |
| Admin Pattern exports | `DataTable.Root/FilterBar/Toolbar/BulkActions/TableRegion/Pagination` | `src/patterns/data-table.tsx` | Pattern parts | 是 | `pattern-only` | `src/patterns/data-table.tsx` | `src/patterns/patterns.test.tsx` |
| Typography | `SconeTypography`、`SconeText`、`SconeTitle`、`SconeParagraph` | `src/components/data-display/typography.tsx` | `Scone*` export | 否 | `custom` | `src/components/data-display/typography.tsx` | `src/components/data-display/data-display.test.tsx` |
| Form components | `SconeButton` | `src/components/form/button.tsx` | `Scone*` export | 支持 | `scone-wrapper` | `src/components/form/button.tsx` | `src/components/form/controls.test.tsx` |
| Form components | `SconeInput`、`SconeSearchInput`、`SconePasswordInput`、`SconeTextArea` | `src/components/form/input.tsx`、`src/components/form/search-input.tsx`、`src/components/form/password-input.tsx`、`src/components/form/textarea.tsx` | `Scone*` export | 否 | `scone-wrapper` | 各组件文件 | `src/components/form/controls.test.tsx` |
| Form components | `SconeSelect` | `src/components/form/select.tsx` | `Scone*` export | 支持 | `scone-wrapper` | `src/components/form/select.tsx` | `src/components/form/controls.test.tsx` |
| Form components | `SconeForm`、`SconeField` | `src/components/form/form.tsx`、`src/components/form/field.tsx` | `Scone*` export | 支持 | `custom` | 各组件文件 | `src/components/form/form.test.tsx` |
| Form helpers | `SconeFieldGroup`、`SconeFormSection`、`SconeFormActions` | `src/components/form/field-group.tsx`、`src/components/form/form-section.tsx`、`src/components/form/form-actions.tsx` | helper export | 部分 | `pattern-only` | 各组件文件 | `src/components/form/form.test.tsx` |
| Additional form inputs | `SconeCombobox` | `src/components/form/combobox.tsx` | `Scone*` export | 支持 | `scone-wrapper` | `src/components/form/combobox.tsx` | `src/components/form/controls.test.tsx` |
| Additional form inputs | `SconeSwitch`、`SconeCheckbox`、`SconeRadioGroup`、`SconeSlider` | `src/components/form/switch.tsx`、`src/components/form/checkbox.tsx`、`src/components/form/radio-group.tsx`、`src/components/form/slider.tsx` | `Scone*` export | RadioGroup/Slider 支持 | `vendored-shadcn` | 各组件文件 | `src/components/form/controls.test.tsx` |
| Additional form inputs | `SconeNumberInput`、`SconeDatePicker`、`SconeUpload` | `src/components/form/number-input.tsx`、`src/components/form/date-picker.tsx`、`src/components/form/upload.tsx` | `Scone*` export | 否 | `custom` | 各组件文件 | `src/components/form/controls.test.tsx` |
| Layout primitives | `SconeStack`、`SconeInline`、`SconeCompact`、`SconeToolbar`、`SconeSplitPane` | `src/components/layout/stack.tsx`、`src/components/layout/inline.tsx`、`src/components/layout/compact.tsx`、`src/components/layout/toolbar.tsx`、`src/components/layout/split-pane.tsx` | `Scone*` export | 否 | `custom` | 各组件文件 | `src/components/layout/layout.test.tsx` |
| Layout primitives | `SconeSeparator`、`SconeScrollArea` | `src/components/layout/separator.tsx`、`src/components/layout/scroll-area.tsx` | `Scone*` export | ScrollArea 支持 | `vendored-shadcn` | 各组件文件 | `src/components/layout/layout.test.tsx` |
| Data display | `SconeDescriptions`、`SconeList`、`SconeStatistic`、`SconeTimeline` | `src/components/data-display/descriptions.tsx`、`src/components/data-display/list.tsx`、`src/components/data-display/statistic.tsx`、`src/components/data-display/timeline.tsx` | `Scone*` export | 否 | `custom` | 各组件文件或 `src/types/foundation.ts` | `src/components/data-display/data-display.test.tsx` |
| Data display | `SconeTable` | `src/components/data-display/table.tsx` | `Scone*` export | 否 | `scone-wrapper` | `src/components/data-display/table.tsx` | `src/components/data-display/data-display.test.tsx` |
| Data display | `SconeCard`、`SconeTag`、`SconeBadge` | `src/components/data-display/card.tsx`、`src/components/data-display/tag.tsx`、`src/components/data-display/badge.tsx` | `Scone*` export | 否 | `scone-wrapper`/`custom` 按组件 SPEC 确认 | 各组件文件 | `src/components/data-display/data-display.test.tsx` |
| Navigation and media | `SconeBreadcrumb`、`SconeTabs`、`SconeDropdown`、`SconeMenu`、`SconeSegmented`、`SconeAccordion`、`SconeCollapsible` | `src/components/navigation/*.tsx` | `Scone*` export | 支持 | `vendored-shadcn` | 各组件文件或 `src/types/foundation.ts` | `src/components/navigation/navigation.test.tsx` |
| Navigation and media | `SconePagination`、`SconeTree` | `src/components/navigation/pagination.tsx`、`src/components/navigation/tree.tsx` | `Scone*` export | 否 | `custom` | 各组件文件或 `src/types/foundation.ts` | `src/components/navigation/navigation.test.tsx` |
| Navigation and media | `SconeCommand` | `src/components/navigation/command.tsx` | `Scone*` export | 支持 | `scone-wrapper` | `src/components/navigation/command.tsx` | `src/components/navigation/navigation.test.tsx` |
| Navigation and media | `SconeTooltip`、`SconeImage`、`SconeAvatar` | `src/components/navigation/tooltip.tsx`、`src/components/media/image.tsx`、`src/components/media/avatar.tsx` | `Scone*` export | Tooltip 支持 | `vendored-shadcn` | 各组件文件 | `src/components/navigation/navigation.test.tsx`、`src/components/media/media.test.tsx` |
| Feedback | `SconeDrawer`、`SconeDialog`、`SconeConfirm` | `src/components/feedback-overlay/drawer.tsx`、`src/components/feedback-overlay/dialog.tsx`、`src/components/feedback-overlay/confirm.tsx` | `Scone*` export | 支持 | `scone-wrapper` | 各组件文件 | `src/components/feedback-overlay/feedback-overlay.test.tsx` |
| Feedback | `SconeAlert`、`SconeEmpty`、`SconeLoading`、`SconeProgress` | `src/components/feedback-overlay/alert.tsx`、`src/components/feedback-overlay/empty.tsx`、`src/components/feedback-overlay/loading.tsx`、`src/components/feedback-overlay/progress.tsx` | `Scone*` export | 否 | `scone-wrapper` | 各组件文件 | `src/components/feedback-overlay/feedback-overlay.test.tsx` |
| Feedback | `SconeToastProvider`、`toast` | `src/components/feedback-overlay/toast.tsx` | provider/service export | Provider | `scone-wrapper` | `src/components/feedback-overlay/toast.tsx` | `src/components/feedback-overlay/feedback-overlay.test.tsx` |
| Feedback | `SconeNotificationProvider`、`notification` | `src/components/feedback-overlay/notification.tsx` | provider/service export | Provider | `scone-wrapper` | `src/components/feedback-overlay/notification.tsx` | `src/components/feedback-overlay/feedback-overlay.test.tsx` |
| Recipes | DrawerForm、ConfirmationFlow、Dashboard Metric、Grid | `src/recipes/*.tsx` 或 docs-only 示例 | Recipe | 否 | 按 Recipe Designs 确认 | 示例私有类型 | `src/recipes/recipes.test.tsx` 或文档验证 |
| Recipes | Popover、Logo、Result | `docs/10-specs/recipes/POPOVER.md`、`docs/10-specs/recipes/LOGO.md`、`docs/10-specs/recipes/RESULT.md` | docs-only Recipe | 否 | `direct-docs-only` | 无公共类型 | 文档验证 |

导出规则：

- `src/index.ts` 只导出 `COMPONENT-SELECTION.md` 中列入 Export Groups 的能力。
- `direct-docs-only` Recipe 不从 `src/index.ts` 导出。
- `pattern-only` 只导出明确 compound parts；禁止单一万能配置对象。
- Provider/service export 必须同时导出必要 option 类型，避免调用方依赖私有结构。
- 组件族内部 helper、私有状态、私有 hook 不从公共入口导出。

## Coverage Matrix

依据文件：

- `docs/10-specs/COMPONENT-SELECTION.md`

本矩阵证明 `docs/10-specs/COMPONENT-SELECTION.md` 中当前能力均已进入 DESIGN。目标源码文件、类型定义位置和测试文件是设计落点，不代表已经创建。

| 能力 | SPEC 文件 | 层级 | Source strategy | 导出名称 | 目标源码文件 | 类型定义位置 | 状态能力 | 验证策略 | DESIGN 章节 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Button | `docs/10-specs/components/form/SCONE-BUTTON.md` | Component | `scone-wrapper` | `SconeButton` | `src/components/form/button.tsx` | `src/components/form/button.tsx` | loading / disabled | action loading、disabled、ref、className、ariaLabel | Component Family Designs / Form |
| Input / Search / Password / TextArea | `docs/10-specs/components/form/SCONE-INPUT.md` 等 | Component | `scone-wrapper` | `SconeInput`、`SconeSearchInput`、`SconePasswordInput`、`SconeTextArea` | `src/components/form/input.tsx` 等 | 各组件文件 | disabled / readOnly / invalid via Field | label 关联、readOnly/disabled、Field invalid | Component Family Designs / Form |
| Select | `docs/10-specs/components/form/SCONE-SELECT.md` | Component | `scone-wrapper` | `SconeSelect` | `src/components/form/select.tsx` | `src/components/form/select.tsx`、`src/types/foundation.ts` | disabled / readOnly / invalid via Field | value/open 受控、Radix 键盘、aria | Component Family Designs / Form |
| Field / Form | `docs/10-specs/components/form/SCONE-FIELD.md`、`SCONE-FORM.md` | Component | `custom` | `SconeField`、`SconeForm` | `src/components/form/field.tsx`、`src/components/form/form.tsx` | 各组件文件 | invalid / disabled / readOnly / required | label/description/message 关联、状态传播 | Component Family Designs / Form |
| Form helpers | `docs/10-specs/components/form/SCONE-FIELD-GROUP.md` 等 | Pattern helper | `pattern-only` | `SconeFieldGroup`、`SconeFormSection`、`SconeFormActions` | `src/components/form/field-group.tsx` 等 | 各组件文件 | sticky / section / grouping | sticky/actions 布局与业务边界 | Component Family Designs / Form |
| Stack / Inline / Compact / Toolbar | `docs/10-specs/components/layout/*.md` | Layout | `custom` | `SconeStack`、`SconeInline`、`SconeCompact`、`SconeToolbar` | `src/components/layout/*.tsx` | 各组件文件、`src/types/foundation.ts` | 不承载业务状态 | density、gap、wrap、ref/className | Component Family Designs / Layout |
| Separator / ScrollArea | `docs/10-specs/components/layout/SCONE-SEPARATOR.md`、`SCONE-SCROLL-AREA.md` | Layout | `vendored-shadcn` | `SconeSeparator`、`SconeScrollArea` | `src/components/layout/separator.tsx`、`scroll-area.tsx` | 各组件文件 | 不承载业务状态 | viewport、局部滚动、Radix 行为 | Component Family Designs / Layout |
| SplitPane | `docs/10-specs/components/layout/SCONE-SPLIT-PANE.md` | Layout | `custom` | `SconeSplitPane` | `src/components/layout/split-pane.tsx` | `src/components/layout/split-pane.tsx` | 不承载业务状态 | resize、keyboard、ARIA、preset | Component Family Designs / Layout |
| Page / Section / FilterBar / DataTable | `docs/10-specs/patterns/*.md` | Admin Pattern | `pattern-only` | `Page.*`、`Section.*`、`FilterBar`、`DataTable.*` | `src/patterns/*.tsx` | `src/patterns/*.tsx` | data / sticky / selection 按 Pattern | slot、状态归属、滚动/sticky、业务边界 | Admin Pattern Designs |
| Table | `docs/10-specs/components/data-display/SCONE-TABLE.md` | Component | `scone-wrapper` | `SconeTable` | `src/components/data-display/table.tsx` | `src/components/data-display/table.tsx`、`src/types/foundation.ts` | loading / empty / error | 状态优先级、columns、scroll、ref/className | Component Family Designs / Data Display |
| Pagination | `docs/10-specs/components/navigation/SCONE-PAGINATION.md` | Component | `custom` | `SconePagination` | `src/components/navigation/pagination.tsx` | `src/types/foundation.ts` | disabled | page/pageSize、ARIA、键盘 | Component Family Designs / Navigation |
| Drawer | `docs/10-specs/components/feedback-overlay/SCONE-DRAWER.md` | Component | `scone-wrapper` | `SconeDrawer` | `src/components/feedback-overlay/drawer.tsx` | `src/components/feedback-overlay/drawer.tsx`、`src/types/foundation.ts` | loading / close reason | focus trap/restore、close reason、widthPreset | Component Family Designs / Feedback |
| Card / Alert / Empty / Loading / Progress | `docs/10-specs/components/*/SCONE-*.md` | Component | `scone-wrapper` | `SconeCard`、`SconeAlert`、`SconeEmpty`、`SconeLoading`、`SconeProgress` | 对应组件文件 | 各组件文件、`src/types/foundation.ts` | loading / empty / error | tone/status、aria-busy、action | Component Family Designs |
| Descriptions / Tag / Badge / List / Typography / Statistic | `docs/10-specs/components/data-display/*.md` | Component | `custom` | `SconeDescriptions` 等 | `src/components/data-display/*.tsx` | 各组件文件、`src/types/foundation.ts` | empty / loading 按组件适用 | density、tone、typography、item 类型 | Component Family Designs / Data Display |
| Switch / Checkbox | `docs/10-specs/components/form/SCONE-SWITCH.md`、`SCONE-CHECKBOX.md` | Component | `vendored-shadcn` | `SconeSwitch`、`SconeCheckbox` | `src/components/form/switch.tsx`、`checkbox.tsx` | 各组件文件 | checked / disabled / invalid via Field | checked 受控、Radix 行为、Field invalid | Component Family Designs / Form |
| RadioGroup / Slider | `docs/10-specs/components/form/SCONE-RADIO-GROUP.md`、`SCONE-SLIDER.md` | Component | `vendored-shadcn` | `SconeRadioGroup`、`SconeSlider` | `src/components/form/radio-group.tsx`、`slider.tsx` | 各组件文件、`src/types/foundation.ts` | selected / disabled / invalid via Field | keyboard、value、aria | Component Family Designs / Form |
| NumberInput / DatePicker / Upload | `docs/10-specs/components/form/*.md` | Component | `custom` | `SconeNumberInput`、`SconeDatePicker`、`SconeUpload` | `src/components/form/number-input.tsx` 等 | 各组件文件 | disabled / readOnly / invalid via Field | custom 键盘、ARIA、事件 payload | Component Family Designs / Form |
| Combobox / Command | `docs/10-specs/components/form/SCONE-COMBOBOX.md`、`navigation/SCONE-COMMAND.md` | Component | `scone-wrapper` | `SconeCombobox`、`SconeCommand` | `src/components/form/combobox.tsx`、`src/components/navigation/command.tsx` | 各组件文件、`src/types/foundation.ts` | loading / empty / selected / expanded | search、selection、keyboard、empty | Component Family Designs |
| Breadcrumb / Tabs / Dropdown / Menu | `docs/10-specs/components/navigation/*.md` | Component | `vendored-shadcn` | `SconeBreadcrumb`、`SconeTabs`、`SconeDropdown`、`SconeMenu` | `src/components/navigation/*.tsx` | 各组件文件、`src/types/foundation.ts` | selected / expanded | aria-current、roving focus、typeahead | Component Family Designs / Navigation |
| Segmented / Accordion / Collapsible | `docs/10-specs/components/navigation/*.md` | Component | `vendored-shadcn` | `SconeSegmented`、`SconeAccordion`、`SconeCollapsible` | `src/components/navigation/*.tsx` | 各组件文件、`src/types/foundation.ts` | selected / expanded | value/open、keyboard、ARIA | Component Family Designs / Navigation |
| Tree | `docs/10-specs/components/navigation/SCONE-TREE.md` | Component | `custom` | `SconeTree` | `src/components/navigation/tree.tsx` | `src/types/foundation.ts`、组件文件 | selected / checked / expanded | tree keyboard、ARIA、selection/checking | Component Family Designs / Navigation |
| Image / Avatar / Tooltip | `docs/10-specs/components/media/*.md`、`navigation/SCONE-TOOLTIP.md` | Component | `vendored-shadcn` | `SconeImage`、`SconeAvatar`、`SconeTooltip` | `src/components/media/*.tsx`、`src/components/navigation/tooltip.tsx` | 各组件文件 | fallback / hover / focus | fallback、alt、tooltip trigger/focus | Component Family Designs / Media/Navigation |
| Dialog / Confirm | `docs/10-specs/components/feedback-overlay/SCONE-DIALOG.md`、`SCONE-CONFIRM.md` | Component | `scone-wrapper` | `SconeDialog`、`SconeConfirm` | `src/components/feedback-overlay/dialog.tsx`、`confirm.tsx` | 各组件文件、`src/types/foundation.ts` | close reason / loading / destructive | focus trap、close reason、destructive action | Component Family Designs / Feedback |
| Toast / Notification | `docs/10-specs/components/feedback-overlay/SCONE-TOAST.md`、`SCONE-NOTIFICATION.md` | Component service | `scone-wrapper` | `SconeToastProvider`、`toast`、`SconeNotificationProvider`、`notification` | `src/components/feedback-overlay/toast.tsx`、`notification.tsx` | 各 service 文件 | queued feedback / persistent notice | provider/service API、queue、dismiss | Component Family Designs / Feedback |
| Timeline | `docs/10-specs/components/data-display/SCONE-TIMELINE.md` | Component | `custom` | `SconeTimeline` | `src/components/data-display/timeline.tsx` | `src/types/foundation.ts`、组件文件 | event sequence | item sequence、tone、accessibility | Component Family Designs / Data Display |
| Popover / Logo / Result | `docs/10-specs/recipes/POPOVER.md`、`LOGO.md`、`RESULT.md` | Recipe | `direct-docs-only` | 无 `Scone*` export | docs-only | 无公共类型 | 按 recipe 组合 | 无 wrapper 原因和可验证组合 | Recipe Designs |

覆盖规则：

- Coverage Matrix 中的目标文件均为设计落点，不代表已经创建。
- 后续如果 SPEC 新增或排除能力，必须同步本矩阵和 `docs/10-specs/COMPONENT-SELECTION.md`。
- 若某个能力在单组件 SPEC 中调整 source strategy，以单组件 SPEC 和 `COMPONENT-SELECTION.md` 更新后的交集为准。
