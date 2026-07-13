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
| `tailwind.config.ts` | 必要目标文件；默认只映射 `src/styles/theme.css` 中的 CSS variables，不维护第二套 token 数值。 | `docs/10-specs/FOUNDATIONS-SPEC.md` | 否 |
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
| DrawerForm | docs-only：`docs/10-specs/recipes/DRAWER-FORM.md`，不创建 `src/recipes/drawer-form.tsx`。 |
| ConfirmationFlow | docs-only：`docs/10-specs/recipes/CONFIRMATION-FLOW.md`，不创建 `src/recipes/confirmation-flow.tsx`。 |
| Popover | docs-only：`docs/10-specs/recipes/POPOVER.md`，不创建 `SconePopover`。 |
| Logo | docs-only：`docs/10-specs/recipes/LOGO.md`，不创建 `SconeLogo`。 |
| Result | docs-only：`docs/10-specs/recipes/RESULT.md`，不创建 `SconeResult`。 |
| Dashboard Metric | docs-only：`docs/10-specs/recipes/DASHBOARD-METRIC.md`，不创建 `src/recipes/dashboard-metric.tsx`。 |
| Grid | docs-only：`docs/10-specs/recipes/GRID.md`，不创建 `src/recipes/grid.tsx`。 |

测试目标文件：

| 范围 | 目标测试文件 |
| --- | --- |
| Foundation | `src/types/foundation.test.ts` |
| Shared utilities | 与 `src/lib/*.ts` 同目录的同名 `*.test.ts`。 |
| Components | 与 `src/components/**/*.tsx` 同目录的同名 `*.test.tsx`。 |
| Patterns | 与 `src/patterns/*.tsx` 同目录的同名 `*.test.tsx`。 |
| Recipes | 文档和示例验证，不创建 `src/recipes/recipes.test.tsx`。 |
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

- `src/components/*/index.ts` 只导出本组件族公共组件和本族公共类型，不导出私有 helper。
- 单组件文件优先承载组件实现和紧耦合 props 类型；组件族公共类型按组件族分散定义并从组件族入口汇总，再由 `src/index.ts` 汇总导出。
- 跨组件共享词表和基础状态桥接类型才提升到 `src/types/foundation.ts`。
- `src/lib/*.ts` 只承载组件库通用工具，不承载产品业务、请求、权限、路由或状态机。
- `src/patterns/*.tsx` 只导出 Pattern compound parts，不导出大配置对象。
- Recipe 全部保持文档和示例边界，不创建 `src/recipes/` 源码入口，不新增 `Scone*` export。
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
| `tailwind.config.ts` | 必要目标文件；默认只映射 `src/styles/theme.css` 中的 CSS variables，不维护第二套 token 数值。 |

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
| `src/types/foundation.ts` | Foundation shared types、词表类型、跨组件基础状态桥接类型。 | 从 `src/index.ts` 公开导出。 |
| `src/components/*/*.tsx` | 与单组件紧耦合的 props、item、state 和 event payload 类型。 | 本族公共类型从对应 `src/components/*/index.ts` 汇总，再由 `src/index.ts` 汇总导出；内部 helper 类型不导出。 |
| `src/components/*/index.ts` | 组件族公共组件和本族公共类型汇总入口。 | 只导出本组件族 API，不导出其他组件族类型。 |
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
| `SconeDescriptionItem` | `src/components/data-display/descriptions.tsx` | Descriptions 键值展示项。 | 不直接使用后端字段名；空值 fallback 由调用方或 recipe 处理。 |
| `SconePaginationState` | `src/components/navigation/pagination.tsx` | Pagination、Table、DataTable 分页桥接。 | 只表达 UI 和查询意图，不发起请求。 |
| `SconePaginationChangeReason` | `src/components/navigation/pagination.tsx` | 分页变化原因。 | 值限定为 `page`、`pageSize`。 |
| `SconeTableSorting` | `src/patterns/data-table.tsx` | DataTable 排序状态桥接。 | 不在组件内发起请求。 |
| `SconeTableColumn<T>` | `src/components/data-display/table.tsx` | 基础表格列定义。 | 不承载请求、权限、字典加载或业务动作执行。 |
| `SconeTableScroll` | `src/components/data-display/table.tsx` | 基础表格横向滚动配置。 | 不沿用 AntD `{ x, y }` 完整语义；垂直滚动由 TableRegion 管理。 |
| `SconeRowSelection<T>` | `src/patterns/data-table.tsx` | DataTable selection UI 状态桥接。 | 不属于基础 `SconeTable` prop，不定义批量动作。 |
| `SconeBaseItem` | `src/types/foundation.ts` | 动作、导航、路径和命令项共享最小字段。 | 各组件必须扩展自己的 item 类型，不复用万能 schema。 |
| `SconeActionItem` | `src/components/navigation/dropdown.tsx` 或 `src/components/navigation/menu.tsx` | Dropdown、ActionMenu 和行操作菜单。 | `destructive` 不自动打开确认；权限过滤由调用方完成。 |
| `SconeNavigationItem` | `src/components/navigation/menu.tsx` 或 `src/patterns/app-shell.tsx` | Menu、Sidebar 和导航集合。 | 不把 router API 写入 item schema。 |
| `SconeBreadcrumbItem` | `src/components/navigation/breadcrumb.tsx` | Breadcrumb 路径。 | 不支持 destructive 或动作回调。 |
| `SconeCommandItem` | `src/components/navigation/command.tsx` | Command 搜索项。 | 不表达表单值；表单选择由 Combobox 增加语义。 |
| `SconeTreeNode` | `src/components/navigation/tree.tsx` | Tree 和层级选择能力。 | 异步加载、虚拟滚动和拖拽单独扩展。 |
| `SconeAccordionItem` | `src/components/navigation/accordion.tsx` | Accordion 简化配置。 | 复杂内容优先使用 compound children。 |
| `SconeTimelineItem` | `src/components/data-display/timeline.tsx` | Timeline 通用事件项。 | 不承载审批、权限或流程状态机。 |
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
| Notification | `SconeNotificationProvider`、`notification`、`NotificationOptions`、`SconeNotificationItem`、`NotificationPlacement` | service 生成或接收 id，返回稳定 id；支持 persistent UI 语义；已读、订阅来源和持久化由产品侧处理。 |

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
| Admin Pattern exports | `Page.Root/Header/Content/StickyActions` | `src/patterns/page.tsx` | Pattern parts | 是 | `pattern-only` | `src/patterns/page.tsx` | `src/patterns/page.test.tsx` |
| Admin Pattern exports | `Section.Root/Header/Content/Footer` | `src/patterns/section.tsx` | Pattern parts | 是 | `pattern-only` | `src/patterns/section.tsx` | `src/patterns/section.test.tsx` |
| Admin Pattern exports | `DataTable.Root/FilterBar/Toolbar/BulkActions/TableRegion/Pagination` | `src/patterns/data-table.tsx` | Pattern parts | 是 | `pattern-only` | `src/patterns/data-table.tsx` | `src/patterns/data-table.test.tsx` |
| Typography | `SconeTypography`、`SconeText`、`SconeTitle`、`SconeParagraph` | `src/components/data-display/typography.tsx` | `Scone*` export | 否 | `custom` | `src/components/data-display/typography.tsx` | `src/components/data-display/typography.test.tsx` |
| Form components | `SconeButton` | `src/components/form/button.tsx` | `Scone*` export | 支持 | `scone-wrapper` | `src/components/form/button.tsx` | `src/components/form/button.test.tsx` |
| Form components | `SconeInput`、`SconeSearchInput`、`SconePasswordInput`、`SconeTextArea` | `src/components/form/input.tsx`、`src/components/form/search-input.tsx`、`src/components/form/password-input.tsx`、`src/components/form/textarea.tsx` | `Scone*` export | 否 | `scone-wrapper` | 各组件文件 | 同目录同名 `*.test.tsx` |
| Form components | `SconeSelect` | `src/components/form/select.tsx` | `Scone*` export | 支持 | `scone-wrapper` | `src/components/form/select.tsx` | `src/components/form/select.test.tsx` |
| Form components | `SconeForm`、`SconeField` | `src/components/form/form.tsx`、`src/components/form/field.tsx` | `Scone*` export | 支持 | `custom` | 各组件文件 | 同目录同名 `*.test.tsx` |
| Form helpers | `SconeFieldGroup`、`SconeFormSection`、`SconeFormActions` | `src/components/form/field-group.tsx`、`src/components/form/form-section.tsx`、`src/components/form/form-actions.tsx` | helper export | 部分 | `pattern-only` | 各组件文件 | 同目录同名 `*.test.tsx` |
| Additional form inputs | `SconeCombobox` | `src/components/form/combobox.tsx` | `Scone*` export | 支持 | `scone-wrapper` | `src/components/form/combobox.tsx` | `src/components/form/combobox.test.tsx` |
| Additional form inputs | `SconeSwitch`、`SconeCheckbox`、`SconeRadioGroup`、`SconeSlider` | `src/components/form/switch.tsx`、`src/components/form/checkbox.tsx`、`src/components/form/radio-group.tsx`、`src/components/form/slider.tsx` | `Scone*` export | RadioGroup/Slider 支持 | `vendored-shadcn` | 各组件文件 | 同目录同名 `*.test.tsx` |
| Additional form inputs | `SconeNumberInput`、`SconeDatePicker`、`SconeUpload` | `src/components/form/number-input.tsx`、`src/components/form/date-picker.tsx`、`src/components/form/upload.tsx` | `Scone*` export | 否 | `custom` | 各组件文件 | 同目录同名 `*.test.tsx` |
| Layout primitives | `SconeStack`、`SconeInline`、`SconeCompact`、`SconeToolbar`、`SconeSplitPane` | `src/components/layout/stack.tsx`、`src/components/layout/inline.tsx`、`src/components/layout/compact.tsx`、`src/components/layout/toolbar.tsx`、`src/components/layout/split-pane.tsx` | `Scone*` export | 否 | `custom` | 各组件文件 | 同目录同名 `*.test.tsx` |
| Layout primitives | `SconeSeparator`、`SconeScrollArea` | `src/components/layout/separator.tsx`、`src/components/layout/scroll-area.tsx` | `Scone*` export | ScrollArea 支持 | `vendored-shadcn` | 各组件文件 | 同目录同名 `*.test.tsx` |
| Data display | `SconeDescriptions`、`SconeList`、`SconeStatistic`、`SconeTimeline` | `src/components/data-display/descriptions.tsx`、`src/components/data-display/list.tsx`、`src/components/data-display/statistic.tsx`、`src/components/data-display/timeline.tsx` | `Scone*` export | 否 | `custom` | 各组件文件或 `src/types/foundation.ts` | 同目录同名 `*.test.tsx` |
| Data display | `SconeTable` | `src/components/data-display/table.tsx` | `Scone*` export | 否 | `scone-wrapper` | `src/components/data-display/table.tsx` | `src/components/data-display/table.test.tsx` |
| Data display | `SconeCard`、`SconeTag`、`SconeBadge` | `src/components/data-display/card.tsx`、`src/components/data-display/tag.tsx`、`src/components/data-display/badge.tsx` | `Scone*` export | 否 | `scone-wrapper`/`custom` 按组件 SPEC 确认 | 各组件文件 | 同目录同名 `*.test.tsx` |
| Navigation and media | `SconeBreadcrumb`、`SconeTabs`、`SconeDropdown`、`SconeMenu`、`SconeSegmented`、`SconeAccordion`、`SconeCollapsible` | `src/components/navigation/*.tsx` | `Scone*` export | 支持 | `vendored-shadcn` | 各组件文件或 `src/types/foundation.ts` | 同目录同名 `*.test.tsx` |
| Navigation and media | `SconePagination`、`SconeTree` | `src/components/navigation/pagination.tsx`、`src/components/navigation/tree.tsx` | `Scone*` export | 否 | `custom` | 各组件文件或 `src/types/foundation.ts` | 同目录同名 `*.test.tsx` |
| Navigation and media | `SconeCommand` | `src/components/navigation/command.tsx` | `Scone*` export | 支持 | `scone-wrapper` | `src/components/navigation/command.tsx` | `src/components/navigation/command.test.tsx` |
| Navigation and media | `SconeTooltip`、`SconeImage`、`SconeAvatar` | `src/components/navigation/tooltip.tsx`、`src/components/media/image.tsx`、`src/components/media/avatar.tsx` | `Scone*` export | Tooltip 支持 | `vendored-shadcn` | 各组件文件 | 同目录同名 `*.test.tsx` |
| Feedback | `SconeDrawer`、`SconeDialog`、`SconeConfirm` | `src/components/feedback-overlay/drawer.tsx`、`src/components/feedback-overlay/dialog.tsx`、`src/components/feedback-overlay/confirm.tsx` | `Scone*` export | 支持 | `scone-wrapper` | 各组件文件 | 同目录同名 `*.test.tsx` |
| Feedback | `SconeAlert`、`SconeEmpty`、`SconeLoading`、`SconeProgress` | `src/components/feedback-overlay/alert.tsx`、`src/components/feedback-overlay/empty.tsx`、`src/components/feedback-overlay/loading.tsx`、`src/components/feedback-overlay/progress.tsx` | `Scone*` export | 否 | `scone-wrapper` | 各组件文件 | 同目录同名 `*.test.tsx` |
| Feedback | `SconeToastProvider`、`toast` | `src/components/feedback-overlay/toast.tsx` | provider/service export | Provider | `scone-wrapper` | `src/components/feedback-overlay/toast.tsx` | `src/components/feedback-overlay/toast.test.tsx` |
| Feedback | `SconeNotificationProvider`、`notification` | `src/components/feedback-overlay/notification.tsx` | provider/service export | Provider | `scone-wrapper` | `src/components/feedback-overlay/notification.tsx` | `src/components/feedback-overlay/notification.test.tsx` |
| Recipes | DrawerForm、ConfirmationFlow、Popover、Logo、Result、Dashboard Metric、Grid | `docs/10-specs/recipes/*.md` | docs-only Recipe | 否 | `direct-docs-only` | 无公共类型 | 文档和示例验证 |

导出规则：

- `src/index.ts` 只导出 `COMPONENT-SELECTION.md` 中列入 Export Groups 的能力。
- `direct-docs-only` Recipe 不从 `src/index.ts` 导出。
- 不创建 `src/recipes/` 源码目录；Recipe 示例留在文档和示例边界内。
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
| Toast / Notification | `docs/10-specs/components/feedback-overlay/SCONE-TOAST.md`、`SCONE-NOTIFICATION.md` | Component service | `scone-wrapper` | `SconeToastProvider`、`toast`、`SconeNotificationProvider`、`notification` | `src/components/feedback-overlay/toast.tsx`、`notification.tsx` | 各 service 文件 | queued feedback / persistent notice | provider/service API、稳定 id、queue | Component Family Designs / Feedback |
| Timeline | `docs/10-specs/components/data-display/SCONE-TIMELINE.md` | Component | `custom` | `SconeTimeline` | `src/components/data-display/timeline.tsx` | `src/types/foundation.ts`、组件文件 | event sequence | item sequence、tone、accessibility | Component Family Designs / Data Display |
| Popover / Logo / Result | `docs/10-specs/recipes/POPOVER.md`、`LOGO.md`、`RESULT.md` | Recipe | `direct-docs-only` | 无 `Scone*` export | docs-only | 无公共类型 | 按 recipe 组合 | 无 wrapper 原因和可验证组合 | Recipe Designs |

覆盖规则：

- Coverage Matrix 中的目标文件均为设计落点，不代表已经创建。
- 后续如果 SPEC 新增或排除能力，必须同步本矩阵和 `docs/10-specs/COMPONENT-SELECTION.md`。
- 若某个能力在单组件 SPEC 中调整 source strategy，以单组件 SPEC 和 `COMPONENT-SELECTION.md` 更新后的交集为准。

## Component Family Designs

### Form

依据文件：

- `docs/10-specs/COMPONENT-SPEC-FORM.md`
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

导出清单和目标文件：

| 导出 | Source strategy | Compound | 目标文件 | 状态能力 | 类型位置 |
| --- | --- | --- | --- | --- | --- |
| `SconeButton` | `scone-wrapper` | 支持 `asChild` | `src/components/form/button.tsx` | loading / disabled | `src/components/form/button.tsx` |
| `SconeInput` | `scone-wrapper` | 否 | `src/components/form/input.tsx` | disabled / readOnly / invalid via Field | `src/components/form/input.tsx` |
| `SconeSearchInput` | `scone-wrapper` | 否 | `src/components/form/search-input.tsx` | disabled / readOnly / loading / clearable | `src/components/form/search-input.tsx` |
| `SconePasswordInput` | `scone-wrapper` | 否 | `src/components/form/password-input.tsx` | disabled / readOnly / visibility toggle | `src/components/form/password-input.tsx` |
| `SconeTextArea` | `scone-wrapper` | 否 | `src/components/form/textarea.tsx` | disabled / readOnly / autoSize / count | `src/components/form/textarea.tsx` |
| `SconeSelect` | `scone-wrapper` | 支持 | `src/components/form/select.tsx` | disabled / readOnly / invalid / open / selected | `src/components/form/select.tsx`、`src/types/foundation.ts` |
| `SconeForm` | `custom` | 支持 | `src/components/form/form.tsx` | disabled / readOnly / requiredMark | `src/components/form/form.tsx` |
| `SconeField` | `custom` | 支持 | `src/components/form/field.tsx` | invalid / disabled / readOnly / required | `src/components/form/field.tsx` |
| `SconeFieldGroup` | `pattern-only` | 否 | `src/components/form/field-group.tsx` | semantic grouping | `src/components/form/field-group.tsx` |
| `SconeFormSection` | `pattern-only` | 部分 | `src/components/form/form-section.tsx` | section grouping | `src/components/form/form-section.tsx` |
| `SconeFormActions` | `pattern-only` | 部分 | `src/components/form/form-actions.tsx` | sticky / align | `src/components/form/form-actions.tsx` |
| `SconeCombobox` | `scone-wrapper` | 支持 | `src/components/form/combobox.tsx` | loading / empty / selected / expanded | `src/components/form/combobox.tsx`、`src/types/foundation.ts` |
| `SconeSwitch` | `vendored-shadcn` | 否 | `src/components/form/switch.tsx` | checked / disabled / invalid via Field | `src/components/form/switch.tsx` |
| `SconeCheckbox` | `vendored-shadcn` | 否 | `src/components/form/checkbox.tsx` | checked / indeterminate / disabled / invalid via Field | `src/components/form/checkbox.tsx` |
| `SconeRadioGroup` | `vendored-shadcn` | 支持 | `src/components/form/radio-group.tsx` | selected / disabled / invalid via Field | `src/components/form/radio-group.tsx`、`src/types/foundation.ts` |
| `SconeNumberInput` | `custom` | 否 | `src/components/form/number-input.tsx` | disabled / readOnly / invalid | `src/components/form/number-input.tsx` |
| `SconeSlider` | `vendored-shadcn` | 支持 | `src/components/form/slider.tsx` | selected range / disabled / invalid via Field | `src/components/form/slider.tsx` |
| `SconeDatePicker` | `custom` | 否 | `src/components/form/date-picker.tsx` | open / disabled / readOnly / invalid | `src/components/form/date-picker.tsx` |
| `SconeUpload` | `custom` | 否 | `src/components/form/upload.tsx` | files / disabled / reject | `src/components/form/upload.tsx` |

状态模型：

- 输入值统一以 `value/defaultValue/onValueChange` 表达，原生 `onChange` 仅作为 DOM event 透传。
- 打开状态统一以 `open/defaultOpen/onOpenChange` 表达，适用于 Select、Combobox、DatePicker。
- 勾选状态统一以 `checked/defaultChecked/onCheckedChange` 表达，适用于 Switch、Checkbox。
- `SconeForm` 提供表单级 `disabled`、`readOnly` 和 `requiredMark` context；字段级 props 可覆盖表单级值。
- `SconeField` 负责 label、description、message、invalid、required、disabled、readOnly 的 ARIA 关联和状态传播。
- `loading` 在 Button/SearchInput/Combobox 等操作或局部选择场景中只表达 UI 等待，不发起请求。

DOM/ref/className 边界：

- `SconeButton` ref 指向 button 或 `asChild` child 的稳定交互元素；`className` 透传到可交互根节点。
- 文本输入、SearchInput、PasswordInput、TextArea、NumberInput ref 指向原生 input/textarea。
- Select、Combobox、DatePicker ref 指向 trigger/input 的稳定交互边界，浮层内容 slot 单独接受样式边界。
- `SconeField.Root` ref 指向字段容器；`SconeField.Control` 使用 Slot/asChild 向 control 注入 id、ARIA 和状态。
- Form helpers ref 指向语义容器，不创建额外业务层。

可访问性边界：

- 输入控件必须可通过 label 查询；无可见 label 时必须提供 `ariaLabel`。
- `SconeField.Label` 的 `htmlFor` 指向 `fieldId`；非 labelable trigger 使用 `aria-labelledby`。
- `SconeField.Description` 和 `SconeField.Message` 的 id 必须合并到 control 的 `aria-describedby`。
- invalid 时 control 必须有 `aria-invalid=true` 或 Radix trigger 的等价 ARIA/data 状态。
- required 必须体现在 label 标记和 control 的 `aria-required` 或原生 `required`。
- Checkbox、Switch、RadioGroup、Slider、Select、Combobox、DatePicker 必须保留键盘操作。

Source strategy 处理：

- `scone-wrapper` 组件只补充 Admin 语义、token、size、loading、ariaLabel、Field 状态关联和稳定 slot，不破坏底层 ref/asChild/ARIA。
- `vendored-shadcn` 组件只调整 token、density、class 边界，保留 Radix checked/value/keyboard 语义。
- `custom` 组件必须在实现前补齐键盘、ARIA、受控/非受控和边界条件测试，尤其是 Form/Field、NumberInput、DatePicker、Upload。
- `pattern-only` Form helpers 只表达结构，不内置保存、请求、路由、权限、校验规则对象或业务文案。

验证点：

- `src/components/form/form.test.tsx` 验证 Form/Field label、description、message、required、disabled、readOnly 和 invalid 传播。
- Form 组件测试按组件文件同目录放置，验证各控件的受控值、默认值、回调、ref、className、可访问名称和核心键盘行为。
- Upload 验证 `accept`、`multiple`、`maxFiles`、`maxSize`、`beforeAdd`、`onReject` 和 disabled 行为。
- DatePicker 验证键盘打开、选择、关闭、`disabledDate` 和 Field 错误关联。

明确非目标：

- 不绑定 React Hook Form、Formik 或自研 store。
- 不提供 AntD Form 风格全局 `form` 实例和 rules 系统。
- 不内置请求、字典加载、权限判断、业务校验规则或保存文案。
- 不用 placeholder 替代 label。

### Data Display

依据文件：

- `docs/10-specs/COMPONENT-SPEC-DATA-DISPLAY.md`
- `docs/10-specs/components/data-display/SCONE-DESCRIPTIONS.md`
- `docs/10-specs/components/data-display/SCONE-TABLE.md`
- `docs/10-specs/components/data-display/SCONE-CARD.md`
- `docs/10-specs/components/data-display/SCONE-TAG.md`
- `docs/10-specs/components/data-display/SCONE-BADGE.md`
- `docs/10-specs/components/data-display/SCONE-LIST.md`
- `docs/10-specs/components/data-display/SCONE-TYPOGRAPHY.md`
- `docs/10-specs/components/data-display/SCONE-STATISTIC.md`
- `docs/10-specs/components/data-display/SCONE-TIMELINE.md`

导出清单和目标文件：

| 导出 | Source strategy | Compound | 目标文件 | 状态能力 | 类型位置 |
| --- | --- | --- | --- | --- | --- |
| `SconeDescriptions` | `custom` | 否 | `src/components/data-display/descriptions.tsx` | density / bordered | `src/types/foundation.ts`、组件文件 |
| `SconeTable` | `scone-wrapper` | 否 | `src/components/data-display/table.tsx` | loading / empty / error | `src/types/foundation.ts`、组件文件 |
| `SconeCard` | `scone-wrapper` | 否 | `src/components/data-display/card.tsx` | loading | `src/components/data-display/card.tsx` |
| `SconeTag` | `custom` | 否 | `src/components/data-display/tag.tsx` | tone / closable | `src/components/data-display/tag.tsx` |
| `SconeBadge` | `custom` | 否 | `src/components/data-display/badge.tsx` | count / dot / tone | `src/components/data-display/badge.tsx` |
| `SconeList` | `custom` | 否 | `src/components/data-display/list.tsx` | loading / empty / error | `src/components/data-display/list.tsx`、`src/types/foundation.ts` |
| `SconeTypography`、`SconeText`、`SconeTitle`、`SconeParagraph` | `custom` | 否 | `src/components/data-display/typography.tsx` | tone / truncate | `src/components/data-display/typography.tsx` |
| `SconeStatistic` | `custom` | 否 | `src/components/data-display/statistic.tsx` | tone | `src/components/data-display/statistic.tsx` |
| `SconeTimeline` | `custom` | 否 | `src/components/data-display/timeline.tsx` | event sequence | `src/types/foundation.ts`、组件文件 |

状态模型：

- Table 和 List 的数据状态优先级固定为 `loading > error > empty`。
- Card 的 `loading` 是 region loading，必须保留内容容器尺寸并可设置 `aria-busy`。
- Descriptions 不使用 disabled input 表达只读详情；编辑态交给 Form/Field。
- Tag/Badge 的 `tone` 只表达语义色，业务枚举到 `tone` 的映射由调用方处理。
- Timeline 只表达通用事件序列，不承载审批、权限或业务状态机。

DOM/ref/className 边界：

- `SconeTable` ref 指向 table 外层稳定容器或 table 元素，具体边界需在实现前固定；`className` 透传到表格根容器。
- `SconeDescriptions` ref 指向 descriptions 根容器；item className 仅影响项级样式。
- `SconeCard` ref 指向 card 根容器，`actions`、`footer` 是稳定 slot。
- Tag、Badge、Statistic、Typography ref 指向根文本或展示元素。
- `SconeTimeline` ref 指向 timeline 根容器，item click 不作为业务动作执行器。

可访问性边界：

- Table 无外部标题时必须提供 `ariaLabel`。
- Table 操作列应有明确列标题或 `ariaLabel`；危险动作使用 `destructive` 并配合 Confirm recipe。
- Badge `dot` 不能只靠颜色传递状态，必须通过相邻文本、`ariaLabel` 或被标记对象的可读状态说明补足语义。
- Typography 保持语义 HTML 和可读对比度，不内置业务文案样式。
- Timeline item 的时间、标题和描述必须可读，时间格式由调用方处理。

Source strategy 处理：

- `SconeTable` 可复用 shadcn Table 的基础结构和 token，但不暴露 TanStack 实例，不复制 AntD Table API。
- `custom` 数据展示组件必须明确 item/column 数据结构、density、状态展示和 ref/className 边界。
- Card/Alert/Empty/Loading/Progress 等视觉容器和反馈组件在各自组件族中处理；Data Display 只处理业务中性展示。

验证点：

- Data Display 组件测试按组件文件同目录放置，验证 Table/List 的 `loading > error > empty` 优先级。
- 验证 Table columns、rowKey、cell render、横向 scroll、行操作列可访问名称和 ref/className。
- 验证 Descriptions columns 的 `ResponsiveValue<number>`、density、label 可读文本和长文本换行。
- 验证 Badge dot 的 `ariaLabel` 要求、Tag closable 的 `onClose`、Typography 的语义标签和 truncate。
- 验证 Timeline items、pending、reverse 和 `onItemClick` 不承载业务状态机。

明确非目标：

- 不绑定业务数据模型、请求协议、权限判断或路由。
- 基础 `SconeTable` 不内置筛选、toolbar、pagination controls、selection checkbox column、bulk actions、fixed column、sticky header、虚拟滚动或 DataGrid 键盘模型。
- 不用 disabled input 伪装只读详情。
- 不在 Badge/Tag 内写入业务枚举含义。

### Layout

依据文件：

- `docs/10-specs/COMPONENT-SPEC-LAYOUT.md`
- `docs/10-specs/components/layout/SCONE-STACK.md`
- `docs/10-specs/components/layout/SCONE-INLINE.md`
- `docs/10-specs/components/layout/SCONE-COMPACT.md`
- `docs/10-specs/components/layout/SCONE-TOOLBAR.md`
- `docs/10-specs/components/layout/SCONE-SPLIT-PANE.md`
- `docs/10-specs/components/layout/SCONE-SEPARATOR.md`
- `docs/10-specs/components/layout/SCONE-SCROLL-AREA.md`

导出清单和目标文件：

| 导出 | Source strategy | Compound | 目标文件 | 状态能力 | 类型位置 |
| --- | --- | --- | --- | --- | --- |
| `SconeStack` | `custom` | 否 | `src/components/layout/stack.tsx` | 不承载业务状态 | `src/components/layout/stack.tsx`、`src/types/foundation.ts` |
| `SconeInline` | `custom` | 否 | `src/components/layout/inline.tsx` | 不承载业务状态 | `src/components/layout/inline.tsx`、`src/types/foundation.ts` |
| `SconeCompact` | `custom` | 否 | `src/components/layout/compact.tsx` | 不承载业务状态 | `src/components/layout/compact.tsx` |
| `SconeToolbar` | `custom` | 否 | `src/components/layout/toolbar.tsx` | density | `src/components/layout/toolbar.tsx`、`src/types/foundation.ts` |
| `SconeSplitPane` | `custom` | 否 | `src/components/layout/split-pane.tsx` | size preset / resize | `src/components/layout/split-pane.tsx` |
| `SconeSeparator` | `vendored-shadcn` | 否 | `src/components/layout/separator.tsx` | decorative / orientation | `src/components/layout/separator.tsx` |
| `SconeScrollArea` | `vendored-shadcn` | 支持 viewport slot | `src/components/layout/scroll-area.tsx` | 局部滚动 | `src/components/layout/scroll-area.tsx` |

状态和职责边界：

- Layout 组件只负责空间、排列、分隔、局部滚动和区域组织，不表达业务状态。
- `gap`、`density`、`sizePreset` 等 props 必须引用 Foundation token 或 preset，不把任意 number 作为主 API。
- Toolbar 只解决 `start` / `end` / `children` 布局，不内置 selected count、filter open、权限逻辑或页面标题。
- SplitPane 只表达布局尺寸和拖拽交互，不内置选中项、数据加载或主从视图状态。
- ScrollArea 是局部滚动容器；页面主滚动由 Page Pattern 承担。

DOM/ref/className 边界：

- Stack、Inline、Compact、Toolbar ref 指向根布局容器；`className` 和 `style` 只做局部覆盖。
- Separator ref 指向 Radix/shadcn separator 根元素，保留 decorative 和 orientation 语义。
- ScrollArea ref 指向根容器，`viewportClassName` 指向 viewport slot，`onScroll` 绑定 viewport。
- SplitPane ref 指向 split 根容器，resize handle 的 DOM 边界由组件内部稳定维护。

可访问性边界：

- Separator 默认可作为装饰性分隔，不表达语义分段；语义分段使用 Section/FormSection。
- SplitPane 必须定义 handle 键盘操作、ARIA orientation 和当前尺寸语义。
- ScrollArea 不得造成多层主滚动；sticky header/footer 必须绑定同一滚动上下文。
- Toolbar 窄屏允许换行，主操作保留可见，次要操作进入 Dropdown。

验证点：

- Layout 组件测试按组件文件同目录放置，验证 token gap、wrap、density、orientation、ref/className 和 viewport slot。
- 验证 SplitPane 的 preset、min/max、键盘 resize 和 CSS 长度覆盖必须带单位。
- 验证 ScrollArea 必须有明确高度来源，且 `onScroll` 来自 viewport。

明确非目标：

- 不提供 `ListPage`、`PageShell`、`FilterPanel`、`BatchActionBar`。
- 不用 Card 或旧 Panel 代替 Page/Section 管页面空间。
- 不在 body、main、PageContent、Table 多层同时设置主滚动。

### Feedback And Overlay

依据文件：

- `docs/10-specs/COMPONENT-SPEC-FEEDBACK-OVERLAY.md`
- `docs/10-specs/components/feedback-overlay/SCONE-DRAWER.md`
- `docs/10-specs/components/feedback-overlay/SCONE-DIALOG.md`
- `docs/10-specs/components/feedback-overlay/SCONE-CONFIRM.md`
- `docs/10-specs/components/feedback-overlay/SCONE-ALERT.md`
- `docs/10-specs/components/feedback-overlay/SCONE-EMPTY.md`
- `docs/10-specs/components/feedback-overlay/SCONE-LOADING.md`
- `docs/10-specs/components/feedback-overlay/SCONE-PROGRESS.md`
- `docs/10-specs/components/feedback-overlay/SCONE-TOAST.md`
- `docs/10-specs/components/feedback-overlay/SCONE-NOTIFICATION.md`

导出清单和目标文件：

| 导出 | Source strategy | Compound | 目标文件 | 状态能力 | 类型位置 |
| --- | --- | --- | --- | --- | --- |
| `SconeDrawer` | `scone-wrapper` | 支持 | `src/components/feedback-overlay/drawer.tsx` | open / loading / close reason | 组件文件、`src/types/foundation.ts` |
| `SconeDialog` | `scone-wrapper` | 支持 | `src/components/feedback-overlay/dialog.tsx` | open / close reason | 组件文件、`src/types/foundation.ts` |
| `SconeConfirm` | `scone-wrapper` | 支持 | `src/components/feedback-overlay/confirm.tsx` | open / loading / destructive | 组件文件 |
| `SconeAlert` | `scone-wrapper` | 否 | `src/components/feedback-overlay/alert.tsx` | tone / action | 组件文件、`src/types/foundation.ts` |
| `SconeEmpty` | `scone-wrapper` | 否 | `src/components/feedback-overlay/empty.tsx` | empty / action | 组件文件 |
| `SconeLoading` | `scone-wrapper` | 否 | `src/components/feedback-overlay/loading.tsx` | loading | 组件文件 |
| `SconeProgress` | `scone-wrapper` | 否 | `src/components/feedback-overlay/progress.tsx` | status / percent | 组件文件、`src/types/foundation.ts` |
| `SconeToastProvider`、`toast` | `scone-wrapper` | Provider | `src/components/feedback-overlay/toast.tsx` | queued feedback | 组件文件 |
| `SconeNotificationProvider`、`notification` | `scone-wrapper` | Provider | `src/components/feedback-overlay/notification.tsx` | persistent notice | 组件文件 |

状态模型：

- Drawer/Dialog 使用 `open/defaultOpen/onOpenChange` 桥接 Radix 状态。
- Drawer/Dialog 额外提供 `onRequestClose(reason)` 表达用户请求关闭，不自动改变 `open`。
- `OverlayCloseReason` 使用 Foundation 中的 `escape`、`outside`、`closeButton`、`footerAction`、`programmatic`。
- Confirm 的 `onConfirm` 不执行业务删除、权限判断或请求；异步期间外部 `loading` 防止重复提交。
- Toast/Notification service 只管理 UI 队列和关闭，不承载持久化、订阅来源或已读状态。

DOM/ref/className 边界：

- Drawer/Dialog/Confirm ref 指向浮层 content；trigger、overlay、content、footer slot 的 className 边界按组件实现固定。
- Alert、Empty、Loading、Progress ref 指向状态容器。
- Toast/Notification provider 挂载队列 viewport；service function 不暴露内部 store。

可访问性边界：

- 浮层必须有可见标题或 `ariaLabel`。
- 保留 Radix/shadcn focus trap、focus restore、Escape、outside interaction 和 ARIA 行为。
- Drawer 长内容必须有明确滚动区域，footer 固定。
- Confirm 默认焦点应落在取消或安全动作上；危险确认必须有 description。
- Alert 错误信息必须可读，不只展示错误码。
- Loading 区域设置 `aria-busy`；Progress 使用可量化进度语义。

验证点：

- Feedback And Overlay 组件测试按组件文件同目录放置，验证 focus trap/restore、Escape/outside/close button reason、ariaLabel/title。
- 验证 Confirm 异步确认防重复、destructive 与 description。
- 验证 Toast/Notification provider/service API、稳定 id、队列和 placement。
- 验证 Alert/Empty/Loading/Progress 的状态语义和可访问性。

明确非目标：

- 不用 Dialog 承载长表单或复杂数据表。
- 不自写 focus trap、Escape 关闭或 ARIA role 替代 Radix。
- 不内置 dirty 判断、二次确认、请求、权限、路由、通知订阅、持久化或业务确认文案。

### Navigation

依据文件：

- `docs/10-specs/COMPONENT-SPEC-NAVIGATION-MEDIA.md`
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

导出清单和目标文件：

| 导出 | Source strategy | Compound | 目标文件 | 状态能力 | 类型位置 |
| --- | --- | --- | --- | --- | --- |
| `SconeBreadcrumb` | `vendored-shadcn` | 支持 | `src/components/navigation/breadcrumb.tsx` | current | `src/types/foundation.ts`、组件文件 |
| `SconePagination` | `custom` | 否 | `src/components/navigation/pagination.tsx` | disabled / page state | `src/types/foundation.ts` |
| `SconeTabs` | `vendored-shadcn` | 支持 | `src/components/navigation/tabs.tsx` | selected | 组件文件、`src/types/foundation.ts` |
| `SconeSegmented` | `vendored-shadcn` | 支持 | `src/components/navigation/segmented.tsx` | selected / disabled | 组件文件、`src/types/foundation.ts` |
| `SconeTree` | `custom` | 否 | `src/components/navigation/tree.tsx` | selected / checked / expanded | `src/types/foundation.ts`、组件文件 |
| `SconeDropdown` | `vendored-shadcn` | 支持 | `src/components/navigation/dropdown.tsx` | open / action select | `src/types/foundation.ts`、组件文件 |
| `SconeMenu` | `vendored-shadcn` 或自研 menu/list navigation | 支持 | `src/components/navigation/menu.tsx` | selected / expanded / collapsed | `src/types/foundation.ts`、组件文件 |
| `SconeTooltip` | `vendored-shadcn` | 支持 | `src/components/navigation/tooltip.tsx` | hover / focus | 组件文件 |
| `SconeCommand` | `scone-wrapper` | 支持 | `src/components/navigation/command.tsx` | loading / empty / selected | `src/types/foundation.ts`、组件文件 |
| `SconeAccordion` | `vendored-shadcn` | 支持 | `src/components/navigation/accordion.tsx` | expanded | `src/types/foundation.ts`、组件文件 |
| `SconeCollapsible` | `vendored-shadcn` | 支持 | `src/components/navigation/collapsible.tsx` | expanded | 组件文件 |

状态模型：

- Tabs、Segmented、Accordion 使用 `value/defaultValue/onValueChange` 或底层 Radix 等价模型。
- Dropdown、Tooltip、Collapsible 使用 `open/defaultOpen/onOpenChange`。
- Pagination 使用 `SconePaginationState` 和 `SconePaginationChangeReason`，只表达分页状态，不发起请求。
- Menu 只表达 UI 选中和展开，不等同权限或 URL 解析。
- Tree 以 `selectedKeys`、`checkedKeys`、`expandedKeys` 表达状态；异步加载、虚拟滚动、拖拽和 TreeSelect 不进入基础 Tree。

DOM/ref/className 边界：

- Breadcrumb、Tabs、Segmented、Dropdown、Menu、Tooltip、Accordion、Collapsible 保留底层 Radix/shadcn DOM 和 ref 语义。
- Tree ref 指向 tree 根容器，节点 DOM 边界必须稳定支持 roving focus。
- Command ref 指向 command 根容器或输入区域，item className 只影响可搜索项。
- Pagination ref 指向 nav 容器，按钮和 page item DOM 边界由组件内部稳定维护。

可访问性边界：

- Breadcrumb 最后一项默认 `aria-current="page"`。
- Tabs trigger/content 必须通过 ARIA 关联；manual 模式下焦点移动不自动切换内容。
- Segmented 当前项 selected 状态可查询；选项文案必须短。
- Dropdown 保留 roving focus、typeahead、Escape 关闭和焦点恢复。
- Tooltip 只放短解释，不放错误文案、表单说明、按钮或复杂交互。
- Tree 必须实现 ARIA tree、roving focus、方向键展开/收起、Home/End、checked/selected 状态。

验证点：

- Navigation 组件测试按组件文件同目录放置，验证受控状态、键盘交互、ARIA 关联、focus restore、selected/expanded 状态。
- Tree 单独验证 selected/checked/expanded、disabled 节点、Home/End 和方向键模型。
- Pagination 验证 pageSize 变化提交 `{ page: 1, pageSize, total }`。
- Command 验证输入过滤、方向键移动、Enter 选择、empty/loading 状态。

明确非目标：

- 不内置路由、权限过滤、菜单数据加载、URL 匹配或产品身份。
- Dropdown 不表达表单值，表单选值使用 Select/Combobox。
- Tabs 不做全局导航或路由系统。
- Tooltip 不承载必读说明、错误原因或可点击内容。

### Media

依据文件：

- `docs/10-specs/COMPONENT-SPEC-NAVIGATION-MEDIA.md`
- `docs/10-specs/components/media/SCONE-IMAGE.md`
- `docs/10-specs/components/media/SCONE-AVATAR.md`

导出清单和目标文件：

| 导出 | Source strategy | Compound | 目标文件 | 状态能力 | 类型位置 |
| --- | --- | --- | --- | --- | --- |
| `SconeImage` | `vendored-shadcn` | 否 | `src/components/media/image.tsx` | fallback / preview open | `src/components/media/image.tsx` |
| `SconeAvatar` | `vendored-shadcn` | 否 | `src/components/media/avatar.tsx` | fallback | `src/components/media/avatar.tsx` |

状态模型：

- Image preview 使用 `previewOpen/defaultPreviewOpen/onPreviewOpenChange`。
- Image 加载失败必须展示 fallback，不能只留下破图图标。
- Avatar 图片失败时必须显示 fallback 或 icon。
- Avatar 不内置在线状态、业务角色、权限标识或跳转行为。

DOM/ref/className 边界：

- Image ref 指向图片或图片容器的稳定边界，preview content 使用 overlay 规则。
- Avatar ref 指向 avatar 根容器，fallback/icon slot 必须尺寸稳定。
- `className` 透传到根容器，图片尺寸通过 `width`/`height` 稳定布局。

可访问性边界：

- Image `alt` 必须传入；装饰性图片由调用方显式传空字符串。
- Avatar `alt` 必须描述头像或对象标识；fallback 应短且稳定。
- preview 不绑定业务鉴权、下载或图片处理服务。

验证点：

- Media 组件测试按组件文件同目录放置，验证 alt、fallback、load/error、preview open 和尺寸稳定性。
- 验证 Avatar fallback 不造成布局跳动。

明确非目标：

- 品牌标识不使用 Avatar，按 Logo Recipe 组合。
- Image 不绑定业务鉴权、下载、转码、裁剪或图片处理服务。

## Admin Pattern Designs

依据文件：

- `docs/10-specs/ADMIN-PATTERNS-SPEC.md`
- `docs/10-specs/patterns/APP-SHELL.md`
- `docs/10-specs/patterns/PAGE.md`
- `docs/10-specs/patterns/SECTION.md`
- `docs/10-specs/patterns/FILTER-BAR.md`
- `docs/10-specs/patterns/DATA-TABLE.md`
- `docs/10-specs/patterns/FORM-PAGE.md`
- `docs/10-specs/patterns/DETAIL-PAGE.md`
- `docs/10-specs/patterns/SETTINGS-PAGE.md`
- `docs/10-specs/patterns/MASTER-DETAIL.md`

Pattern 总规则：

- Pattern 只表达高频 Admin 结构、slot、状态归属和组合边界。
- Pattern 不定义万能配置对象，不内置请求、权限、路由、业务字段或产品文案。
- Pattern parts 从 `src/patterns/index.ts` 和 `src/index.ts` 导出；内部 helper 不导出。
- Page 和 Section Pattern 固定使用 `Page`、`Section` 命名空间导出，不使用 `SconePage`、`SconeSection` 命名。

| Pattern | 目标文件 | Compound parts | 状态归属 | 验证点 |
| --- | --- | --- | --- | --- |
| AppShell | `src/patterns/app-shell.tsx` | `AppShell.Root/Sidebar/Header/Main/Aside` | Sidebar collapsed、Aside open 只管理展示状态 | 全局空间、Main 收缩、唯一 Page 入口 |
| Page | `src/patterns/page.tsx` | `Page.Root/Header/Content/StickyActions` | Page density/maxWidth/sticky padding；不拥有数据 | 主滚动唯一、actions 分层、StickyActions 不遮挡 |
| Section | `src/patterns/section.tsx` | `Section.Root/Header/Content/Footer` | Section density；不拥有数据 | 语义 section、Header actions 分区级、非视觉 Card |
| FilterBar | `src/patterns/filter-bar.tsx` | `FilterBar.Root/Search/Fields/Actions/Summary` 或等价 parts | searchValue、filters、expanded 由调用方或 Pattern bridge 管理 | onApply/onReset、窄屏换行、展开区 |
| DataTable | `src/patterns/data-table.tsx` | `DataTable.Root/FilterBar/Toolbar/BulkActions/TableRegion/Pagination` | sorting/filtering/pagination/selection/columnVisibility 由调用方拥有；DataTable 只留出 adapter/interface 边界 | TableRegion、loading/error/empty、pagination 唯一入口 |
| FormPage | `src/patterns/form-page.tsx` | 推荐组合，不强制单组件 API | 表单状态库由 adapter 或调用方拥有 | 长表单页面滚动、FormActions sticky |
| DetailPage | `src/patterns/detail-page.tsx` | 推荐组合，不强制单组件 API | 详情数据由调用方拥有 | Descriptions/List/Card 组合，不用 disabled input |
| SettingsPage | `src/patterns/settings-page.tsx` | 推荐组合，不强制单组件 API | 设置项状态由调用方拥有 | Section/Card 分组、危险区 Alert/Confirm |
| MasterDetail | `src/patterns/master-detail.tsx` | 推荐组合，不强制单组件 API | selected item 由调用方拥有 | SplitPane、窄屏单列降级 |

### AppShell

`AppShell.Root/Sidebar/Header/Main/Aside` 定义后台应用全局空间。`Sidebar` 管理 collapsed 展示状态，`Aside` 管理 open 展示状态；菜单数据、路由、权限和产品 logo 均由产品侧提供。

设计边界：

- `AppShell.Main` 内只承载一个 `Page.Root`。
- AppShell 不拥有页面滚动；滚动从 `AppShell.Main` 进入 `Page.Content`。
- `AppShell.Main` 必须允许内部滚动区域收缩，默认等价于 `min-height: 0` / `min-width: 0`。

### Page

`Page.Root/Header/Content/StickyActions` 是页面主结构。`Page.Content` 是页面唯一主滚动容器，`Page.Header.actions` 只放页面级动作，Table 批量操作不放这里。

设计边界：

- `Page.Root.maxWidth` 使用 preset：`narrow`、`content`、`wide`、`full`。
- `Page.StickyActions` 必须给 `Page.Content` 留出底部 padding。
- Page 不内置数据请求、权限判断或路由。

### Section

`Section.Root/Header/Content/Footer` 是页面结构分段，不是 Card 变体。Section 不增加边框、阴影或背景层级；需要视觉容器时使用 `SconeCard`。

设计边界：

- Header actions 是分区级动作，不是页面级动作。
- Section 不建立新的主滚动。
- `SconeFormSection` 是表单语境下的 Section helper/shorthand。

### FilterBar

FilterBar 是列表页筛选 Pattern，可作为 DataTable part 导出，也可单独组合。它只提交筛选意图，不直接修改 Table 内部状态。

状态和事件：

- `searchValue/defaultSearchValue/onSearchChange`
- `filters/defaultFilters/onFiltersChange`
- `onApply({ searchValue, filters })`
- `onReset()`
- `expanded/defaultExpanded/onExpandedChange`

设计边界：

- 简单筛选横向排布，窄屏允许换行。
- 超过 3-5 个筛选项时使用展开区或 Drawer recipe。
- 筛选表单不使用完整编辑表单的提交区样式。

### DataTable

DataTable 是数据管理 Pattern，由 `SconeTable`、`SconeToolbar`、FilterBar、Pagination 和批量操作组合。它不是完整 Ant Design Table，也不是一个接收所有状态和请求配置的万能对象。

固定 anatomy：

1. `DataTable.Root`
2. `DataTable.FilterBar`
3. `DataTable.Toolbar`
4. `DataTable.BulkActions`
5. `DataTable.TableRegion`
6. `DataTable.Pagination`

与基础组件的关系：

- `SconeTable` 只消费当前 `columns`、`dataSource`、`rowKey`、`density`、`scroll.x`、`onRow` 和 cell render。
- `SconePagination` 只在 `DataTable.Pagination` 中渲染，不作为 `SconeTable` prop。
- `FilterBar` 只提交筛选意图，不直接修改 Table 内部状态。
- `SconeToolbar` 只提供 `start/end/actions` 布局，不拥有 selected count 或权限状态。

状态归属：

- sorting、filtering、pagination、selection、column visibility 由调用方拥有。
- DataTable 不引入 TanStack Table 作为推荐 recipe 基座；只为外部表格状态库留出 adapter/interface 边界。
- `DataTable.TableRegion` 负责 loading、empty、error 容器、横向滚动边界和 selection column 注入。
- `selectedCount` 从 `selection.selectedRowKeys.length` 派生，不在 Toolbar 内单独维护。
- `BulkActions` 接收当前 selected keys/rows，不读取业务 store。
- `Pagination` 触发 `onChange(nextState, reason)` 后，由调用方更新查询状态和数据。

TableRegion 规则：

- loading/empty/error 状态优先级为 `loading > error > empty`。
- 横向滚动由 Region viewport 承载，`SconeTable.scroll.x` 只声明表格最小宽度或允许横向 overflow。
- 垂直滚动必须有 `heightPreset` 或父容器高度约束；禁止由 Table 自行接管 `overflow-y`。
- sticky header 只在 TableRegion viewport 内固定，不支持 fixed column。

非目标：

- 不内置请求状态机、权限判断或 URL 同步。
- 不提供完整 AntD Table `onChange` 聚合语义。
- 不支持虚拟滚动、可编辑单元格、复杂树表格、拖拽列宽、列顺序、fixed column 或完整 DataGrid 键盘模型。

### FormPage

FormPage 是 Page + `SconeForm` + `FormSection` + `FormActions` 的页面级组合。

设计边界：

- 编辑页和创建页使用页面滚动，长表单不放 Dialog。
- `FormActions` 可 sticky，但必须避免遮挡最后一个字段。
- 表单状态库通过 adapter 或调用方连接，不写入基础 Form。

### DetailPage

DetailPage 使用 Page + Section + Descriptions/List/Card 组合。

设计边界：

- 键值详情优先用 `SconeDescriptions`。
- 只读字段不要伪装成 disabled input，除非需要保持表单布局。
- 状态标签用 Tag，计数用 Badge，重要异常用 Alert。

### SettingsPage

SettingsPage 由多个 Section 或 Card 组成。

设计边界：

- 单项即时设置可用 Field + Switch/Select。
- 多字段设置使用 FormSection + FormActions。
- 危险区使用 Alert 或 Confirm recipe，不依赖红色 Card 标题表达风险。

### MasterDetail

MasterDetail 使用 SplitPane 或响应式 Page 组合。

设计边界：

- 左侧 master 承载列表、树或搜索结果。
- 右侧 detail 承载详情、编辑或预览。
- 窄屏优先切换为列表 -> 详情的单列导航，不强行保持双栏。

## Recipe Designs

依据文件：

- `docs/10-specs/recipes/DRAWER-FORM.md`
- `docs/10-specs/recipes/CONFIRMATION-FLOW.md`
- `docs/10-specs/recipes/POPOVER.md`
- `docs/10-specs/recipes/LOGO.md`
- `docs/10-specs/recipes/RESULT.md`
- `docs/10-specs/recipes/DASHBOARD-METRIC.md`
- `docs/10-specs/recipes/GRID.md`

Recipe 总规则：

- Recipe 是可复制组合方案，不产生新的正式 `Scone*` 组件 API。
- Recipe 可以复用组件、Layout 和 Pattern，但不新增业务流程、请求、权限或路由假设。
- `direct-docs-only` Recipe 不创建 wrapper，不从 `src/index.ts` 导出。
- 全部 Recipe 保持文档和示例边界，不创建 `src/recipes/` 源码入口。

| Recipe | 复用对象 | 目标落点 | 是否源码 | 不新增 `Scone*` API 的原因 | 验证方式 |
| --- | --- | --- | --- | --- | --- |
| DrawerForm | `SconeDrawer`、`SconeForm`、`SconeFormSection`、`SconeFormActions`、`SconeConfirm` | `docs/10-specs/recipes/DRAWER-FORM.md` | 否 | 是组合流程，不是通用任务容器 API | 文档结构和示例边界验证 |
| ConfirmationFlow | `SconeConfirm`、AlertDialog、Button | `docs/10-specs/recipes/CONFIRMATION-FLOW.md` | 否 | 危险确认由组件组合表达，业务动作由调用方处理 | Confirm 行为和文案结构验证 |
| Popover | Radix/shadcn Popover parts、Button、Stack | `docs/10-specs/recipes/POPOVER.md` | 否 | 底层组件足够，admin-ui 只记录边界 | docs-only 边界验证 |
| Logo | AppShell brand slot、Image/Text 或自定义节点 | `docs/10-specs/recipes/LOGO.md` | 否 | 产品身份不进入通用组件库 | docs-only 边界验证 |
| Result | Empty/Alert、Typography、Button | `docs/10-specs/recipes/RESULT.md` | 否 | 结果页结构强依赖产品动作 | docs-only 边界验证 |
| Dashboard Metric | `SconeStatistic`、Card、Grid recipe | `docs/10-specs/recipes/DASHBOARD-METRIC.md` | 否 | 指标业务口径由产品侧组合 | 文档结构和示例边界验证 |
| Grid | CSS grid/Tailwind utilities、Page/Section/Card | `docs/10-specs/recipes/GRID.md` | 否 | 布局 recipe 不需要独立 `SconeGrid` | 响应式列数和 token 间距验证 |

### DrawerForm

DrawerForm 适合短到中等长度创建/编辑任务。

组合边界：

- Drawer title 说明任务对象。
- 内容区放 `SconeForm` 和 `SconeFormSection`。
- footer 放取消和提交按钮。
- loading 时禁用重复提交。
- 超长表单、复杂表格和多步骤流程改用 FormPage。

Dirty close：

- Drawer 接收 `onRequestClose(reason)`。
- 调用方判断当前表单是否 dirty。
- 非 dirty 时直接设置 `open=false`。
- dirty 时打开 `SconeConfirm`，说明未保存内容的影响。
- 用户确认放弃后再设置 `open=false`。

### ConfirmationFlow

ConfirmationFlow 用于危险、不可逆或影响较大的动作。

组合边界：

- title 写动作结果，不写泛泛的“确认操作”。
- description 说明影响范围。
- `destructive` 只改变语义和视觉，不替代确认结构。
- 异步确认期间保持焦点稳定，并防止重复提交。
- 业务删除、权限判断和请求由调用方处理。

### Popover

Popover 是可交互浮层 recipe，不作为独立高层组件导出。

组合边界：

- 用 Radix/shadcn Popover parts 组合交互浮层。
- 用于按钮、筛选小面板或复杂说明。
- 内容不适合 Tooltip，但也不需要 Dialog 的任务隔离。
- 必须继承 Radix Popover 焦点和关闭行为。
- 不承载危险确认；危险确认使用 Confirm。

### Logo

Logo 是产品身份 recipe，不作为 `SconeLogo` 通用组件导出。

组合边界：

- AppShell 的 brand slot 中组合产品 logo、名称和跳转。
- 产品名、品牌图形和跳转目标由产品侧决定。
- 如需统一布局，在 AppShell recipe 中提供 brand slot。

### Result

Result 是结果页或结果区块 recipe，用于提交成功、无权限、异常中断或流程完成。

组合边界：

- 默认由 Empty/Alert、Typography、Button 组合。
- 产品侧决定返回、继续创建、查看详情等具体动作。
- 不作为独立组件导出，避免固定产品级结果页结构。

### Dashboard Metric

Dashboard Metric 是指标卡 recipe，不作为独立组件。

组合边界：

- 简单指标使用 `SconeStatistic` + Card。
- 多指标组使用 Grid + Card。
- 趋势、同比、业务含义由产品侧组合。

### Grid

Grid 是布局 recipe，不作为独立 `SconeGrid` 组件。

组合边界：

- 使用 CSS grid 或 Tailwind grid utilities，由 Page/Section/Card 提供外层语义。
- 列数使用响应式 preset，例如 `base: 1`、`md: 2`、`xl: 3`。
- 间距引用 Foundation `SconeSpacingToken`。
- Grid 不拥有数据状态；卡片组内每个 Card 独立表达 loading/empty/error。

Recipe 非目标：

- 不导出 `SconePopover`、`SconeLogo`、`SconeResult` 或 `SconeGrid`。
- 不创建 `src/recipes/` 源码入口或 recipe service。
- 不把产品身份、业务结果动作、指标口径、请求或权限写入通用库。

## Verification Design

依据文件：

- `docs/10-specs/ADMIN-UI-SPEC.md`
- `docs/10-specs/FOUNDATIONS-SPEC.md`
- `docs/10-specs/COMPONENT-SELECTION.md`

本文档只定义后续验证策略，不表示测试文件已经创建。

| 能力类型 | 验证对象 | 验证行为 | 目标入口 |
| --- | --- | --- | --- |
| Foundation/theme | CSS variables、Tailwind 映射、token 消费 | `src/styles/theme.css` 是唯一数值源；Tailwind 只映射变量；不创建第二套 `tokens.ts` 数值源。 | `src/types/foundation.test.ts`、静态检查 |
| Public exports | `src/index.ts`、组件族入口、Pattern 入口 | Export Groups 与 `docs/10-specs/COMPONENT-SELECTION.md` 一致；docs-only Recipe 不导出。 | `src/index.test.ts` |
| Component 基础行为 | `className`、`ref`、可访问名称、核心状态 | 每个组件的稳定 DOM 边界可透传 `className` 和 ref；无可见 label 时支持 `ariaLabel`。 | 与组件文件同目录的 `*.test.tsx` |
| Radix/shadcn wrapper | focus、keyboard、ARIA、close、`asChild` | wrapper 不破坏 focus trap、focus restore、roving focus、typeahead、Escape、outside interaction、ARIA 和 `asChild`。 | 与 wrapper 文件同目录的 `*.test.tsx` |
| Custom component | keyboard、ARIA、受控/非受控、边界条件 | Tree、SplitPane、NumberInput、DatePicker、Upload、Timeline 等 custom 能力必须单独验证交互模型。 | 与组件文件同目录的 `*.test.tsx` |
| Pattern | slot 组合、状态归属、滚动/sticky、业务职责不进入 | Page 主滚动唯一；DataTable 状态由调用方拥有并只留 adapter/interface；Pattern 不发起请求或判断权限。 | 与 Pattern 文件同目录的 `*.test.tsx` |
| Recipe | 组合可复制、无新增正式 API、关键状态可验证 | docs-only Recipe 明确无源码落点；不创建 `src/recipes/` 源码入口。 | 文档和示例验证 |
| Type/data structure | 公共类型导出、私有类型不泄漏、事件 payload、service options、ref 类型 | 公共类型从约定入口导出；回调不承载业务对象；service 类型不泄漏内部 queue/store。 | `src/types/foundation.test.ts`、`src/index.test.ts` |

最小验证清单：

- Form：label、description、message、invalid、required、disabled、readOnly 与 control 关联。
- Data Display：Table/List 的 `loading > error > empty` 优先级；Table 不承接 pagination、selection、请求。
- Layout：ScrollArea viewport、SplitPane 键盘 resize、Toolbar wrap 和 density。
- Feedback/Overlay：Drawer/Dialog/Confirm 的 focus trap、focus restore、close reason、ariaLabel/title。
- Navigation：Tabs ARIA 关联、Dropdown/Menu 键盘、Tree ARIA tree、Pagination state。
- Media：Image/Avatar fallback、alt、preview open。
- Pattern：DataTable.TableRegion、Page.Content 主滚动、Section 非 Card、FilterBar submit intent。
- Recipe：DrawerForm dirty close、ConfirmationFlow destructive description、Popover/Logo/Result docs-only。

## DESIGN Self Review

依据文件：

- `docs/30-designs/RUNBOOK-SPEC-TO-DESIGN.md`

自审结果：

| 检查项 | 结论 | 回改结果 |
| --- | --- | --- |
| Input Files 是否全部被覆盖，且引用精确到文件名。 | 已覆盖核心 SPEC、分组 SPEC、组件 SPEC、Pattern SPEC 和 Recipe SPEC。 | `Source Files` 已列出精确路径。 |
| File Placement Design 是否精确到目标文件名，且每个文件都有职责说明。 | 已覆盖 DESIGN、RUNBOOK、样式、类型、组件族入口、组件、Pattern、Recipe、测试和公共入口。 | `File Placement Design` 与 `Source Layout Design` 已补齐。 |
| Coverage Matrix 是否覆盖全部能力矩阵和 Export Groups。 | 已覆盖 `COMPONENT-SELECTION.md` 的能力矩阵和 Export Groups。 | `Coverage Matrix` 已补齐目标源码文件、类型位置和验证策略。 |
| Type And Data Structure Design 是否说明公共类型、私有类型、props、事件 payload、状态结构、compound part 类型、ref 类型、provider/service 类型。 | 已覆盖。 | `Type And Data Structure Design` 已补齐类型归属、命名、泛型、事件和 service 类型。 |
| Component Family Designs 是否覆盖全部 `Scone*` export 和 service export。 | 已覆盖 Form、Data Display、Layout、Feedback And Overlay、Navigation、Media。 | 已补齐各组件族导出、状态、DOM/ref/className、可访问性和验证点。 |
| Admin Pattern Designs 是否覆盖全部 Pattern，并明确状态归属和业务边界。 | 已覆盖。 | 已补齐 AppShell、Page、Section、FilterBar、DataTable、FormPage、DetailPage、SettingsPage、MasterDetail。 |
| Recipe Designs 是否覆盖全部 Recipe，并明确不新增正式 `Scone*` export 的原因。 | 已覆盖。 | 已补齐 DrawerForm、ConfirmationFlow、Popover、Logo、Result、Dashboard Metric、Grid。 |
| Verification Design 是否对每类能力给出可执行验证入口。 | 已覆盖。 | 已按能力类型和最小验证清单列出目标入口。 |
| Decision Traceability 是否能把关键决策追溯到精确 SPEC 文件。 | 已覆盖。 | 见 `Decision Traceability`。 |
| Review Questions 是否只保留影响实现结构或 API 的问题。 | 已收窄。 | 见 `Review Questions`。 |

自审后的设计状态：

- 本 DESIGN 仍是设计阶段文档，不声明源码、测试或覆盖证据已经完成。
- Review Questions 当前无影响实现结构或公共 API 的未决问题。
- `docs/40-readiness/IMPLEMENTATION-COVERAGE.md` 应记录设计覆盖和待实现状态，不应声明组件已实现。

## Decision Traceability

| 设计决策 | 依据文件 | DESIGN 落点 |
| --- | --- | --- |
| `scone-ui` 是 admin-ui 组件库和 UI 治理 workspace，不沉淀产品应用规则。 | `docs/10-specs/ADMIN-UI-SPEC.md` | `Purpose`、`Architecture Decisions` |
| 依赖方向为 Foundation -> Primitive -> Component/Layout -> Admin Pattern -> Recipe。 | `docs/10-specs/ADMIN-UI-SPEC.md` | `Architecture Decisions` |
| Source strategy 映射为 `vendored-shadcn`、`scone-wrapper`、`pattern-only`、`direct-docs-only`、`custom`、`no-component` 的不同设计形态。 | `docs/10-specs/ADMIN-UI-SPEC.md`、`docs/10-specs/COMPONENT-SELECTION.md` | `Architecture Decisions`、`Export Surface Design` |
| `src/styles/theme.css` 是 CSS variables 唯一数值源。 | `docs/10-specs/FOUNDATIONS-SPEC.md` | `File Placement Design`、`Theme And Foundation Design` |
| 不创建第二套 `tokens.ts` 数值源。 | `docs/10-specs/FOUNDATIONS-SPEC.md` | `Theme And Foundation Design` |
| Export Groups 决定 `src/index.ts` 公共导出。 | `docs/10-specs/COMPONENT-SELECTION.md` | `Export Surface Design`、`Coverage Matrix` |
| Pattern 只导出 compound parts，不设计万能配置对象。 | `docs/10-specs/ADMIN-UI-SPEC.md`、`docs/10-specs/ADMIN-PATTERNS-SPEC.md` | `Admin Pattern Designs` |
| Page 和 Section Pattern 固定使用 `Page`、`Section` 命名空间导出，不使用 `SconePage`、`SconeSection`。 | 用户审核结论、`docs/10-specs/COMPONENT-SELECTION.md` | `Admin Pattern Designs` |
| Recipe 不产生新的正式 `Scone*` API。 | `docs/10-specs/README.md`、`docs/10-specs/recipes/*.md` | `Recipe Designs` |
| 公共类型按组件族分散定义并从组件族入口汇总；`src/types/foundation.ts` 只保留跨组件共享词表和基础类型。 | 用户审核结论、`docs/10-specs/FOUNDATIONS-SPEC.md` | `Type And Data Structure Design` |
| DataTable 与 `SconeTable`、`SconePagination`、`FilterBar` 职责分离。 | `docs/10-specs/patterns/DATA-TABLE.md`、`docs/10-specs/components/data-display/SCONE-TABLE.md` | `Admin Pattern Designs / DataTable` |
| Toast 和 Notification 作为 provider/service export，service API 返回稳定 id，且不承载订阅来源、持久化或已读状态。 | 用户审核结论、`docs/10-specs/COMPONENT-SELECTION.md`、`docs/10-specs/components/feedback-overlay/SCONE-TOAST.md`、`docs/10-specs/components/feedback-overlay/SCONE-NOTIFICATION.md` | `Type And Data Structure Design`、`Feedback And Overlay` |
| DataTable 不引入 TanStack Table 作为推荐 recipe 基座，只留出外部状态库 adapter/interface 边界。 | 用户审核结论、`docs/10-specs/patterns/DATA-TABLE.md` | `Admin Pattern Designs / DataTable` |
| 测试文件按组件、Pattern、utility 同目录放置，命名为同名 `*.test.ts` 或 `*.test.tsx`。 | 用户审核结论 | `File Placement Design`、`Verification Design` |
| 全部 Recipe 保持文档和示例边界，不创建 `src/recipes/` 源码入口。 | 用户审核结论、`docs/10-specs/recipes/*.md` | `Recipe Designs` |
| Custom 能力必须单独定义键盘、ARIA、状态和验证策略。 | `docs/10-specs/ADMIN-UI-SPEC.md`、单组件 SPEC | `Coverage Matrix`、`Component Family Designs`、`Verification Design` |

## Review Questions

当前无影响实现结构或公共 API 的未决问题。
