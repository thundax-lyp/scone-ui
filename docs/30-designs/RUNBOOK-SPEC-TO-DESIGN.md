# RUNBOOK: 根据 SPEC 制定 DESIGN

## Purpose

本 RUNBOOK 规定如何把 `docs/10-specs/` 中的 admin-ui SPEC 转换为一份可审核的 DESIGN 文档。

目标 DESIGN 文件为 `docs/30-designs/DESIGN-ADMIN-UI.md`。该 DESIGN 是设计阶段产物，必须服务后续人工审核和任务拆解，清晰说明目录、导出、组件族、Pattern、Recipe、状态、可访问性和验证策略。DESIGN 不记录执行过程，不描述阶段进度，不落代码。

## Scope

DESIGN 必须覆盖 `docs/10-specs/COMPONENT-SELECTION.md` 中列为当前范围的全部能力：

- Foundation：API vocabulary、theme token、spacing、size、density、layout preset、loading categories、icon policy、shared types、accessibility。
- Source strategy：`vendored-shadcn`、`scone-wrapper`、`pattern-only`、`direct-docs-only`、`custom`、`no-component`。
- Export surface：Component、Layout、Admin Pattern、Recipe、Toast/Notification service export。
- Component families：Form、Data Display、Layout、Feedback And Overlay、Navigation、Media。
- Admin Patterns：App Shell、Page、Section、FilterBar、DataTable、FormPage、DetailPage、SettingsPage、MasterDetail。
- Recipes：DrawerForm、ConfirmationFlow、Popover、Logo、Result、Dashboard Metric、Grid。
- Type and data structure：公共类型、组件私有类型、props 类型、事件 payload、compound parts 类型、provider/service API 类型、generic 策略、状态结构边界。
- File placement：DESIGN 文档自身落点、后续源码文件、类型文件、样式文件、测试文件、示例文件和 docs-only Recipe 文件落点。
- Verification：类型导出、稳定 DOM 边界、`className`、`ref`、可访问名称、状态优先级、Radix/shadcn 行为保持、custom 组件交互。

## Input Files

DESIGN 必须按以下文件读取和引用，引用时精确到文件名，不使用“相关 SPEC”“组件文档”等模糊说法。

### Governance

- `docs/AGENTS.md`：文档路由和最小读取原则。
- `docs/00-governance/DOCUMENT-RULES.md`：RUNBOOK 与 DESIGN 文档归属、命名、语言和关闭规则。

### Core SPEC

- `docs/10-specs/README.md`：SPEC 读取顺序、文件合同、组件和 Pattern 索引。
- `docs/10-specs/ADMIN-UI-SPEC.md`：仓库定位、Layer Model、source strategy、API principles、props/events policy、verification 基线。
- `docs/10-specs/FOUNDATIONS-SPEC.md`：跨组件词汇、theme contract、token、size、density、layout preset、shared types。
- `docs/10-specs/COMPONENT-SELECTION.md`：当前实现范围、source strategy、export groups、state matrix、anti-patterns。
- `docs/10-specs/ADMIN-PATTERNS-SPEC.md`：Admin Pattern 与 Recipe 索引。

### Group SPEC

- `docs/10-specs/COMPONENT-SPEC-FORM.md`
- `docs/10-specs/COMPONENT-SPEC-DATA-DISPLAY.md`
- `docs/10-specs/COMPONENT-SPEC-LAYOUT.md`
- `docs/10-specs/COMPONENT-SPEC-FEEDBACK-OVERLAY.md`
- `docs/10-specs/COMPONENT-SPEC-NAVIGATION-MEDIA.md`

### Component SPEC

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

### Pattern SPEC

- `docs/10-specs/patterns/APP-SHELL.md`
- `docs/10-specs/patterns/PAGE.md`
- `docs/10-specs/patterns/SECTION.md`
- `docs/10-specs/patterns/FILTER-BAR.md`
- `docs/10-specs/patterns/DATA-TABLE.md`
- `docs/10-specs/patterns/FORM-PAGE.md`
- `docs/10-specs/patterns/DETAIL-PAGE.md`
- `docs/10-specs/patterns/SETTINGS-PAGE.md`
- `docs/10-specs/patterns/MASTER-DETAIL.md`

### Recipe SPEC

- `docs/10-specs/recipes/DRAWER-FORM.md`
- `docs/10-specs/recipes/CONFIRMATION-FLOW.md`
- `docs/10-specs/recipes/POPOVER.md`
- `docs/10-specs/recipes/LOGO.md`
- `docs/10-specs/recipes/RESULT.md`
- `docs/10-specs/recipes/DASHBOARD-METRIC.md`
- `docs/10-specs/recipes/GRID.md`

## DESIGN Granularity

DESIGN 的颗粒度必须达到以下要求：

- 每个章节先列出依据文件，文件名精确到上述 Input Files 中的路径。
- 每个组件族必须列出包含的 `Scone*` export、source strategy、是否 compound、状态能力、实现形态和验证点。
- 每个 Admin Pattern 必须列出 compound parts、slot 边界、状态归属、禁止承接的业务职责和验证点。
- 每个 Recipe 必须列出复用的组件或 Pattern、组合边界、为何不产生新的 `Scone*` API。
- 每个公共类型必须说明来源 SPEC、定义位置、导出位置、命名、泛型参数、适用组件和不适用场景。
- 每个组件族必须说明 props 类型、事件类型、slot/compound part 类型、ref 类型、provider/service 类型是否公开导出。
- 每个组件、Pattern、Recipe 和 shared utility 必须说明后续目标文件路径；路径要精确到文件名，不只写目录。
- 每个事件必须说明 callback 命名、参数结构、是否承载 DOM event、是否承载业务对象；不得设计万能 `onChange` payload。
- 每个状态结构必须说明状态所有权、受控/非受控字段、默认值字段、回调字段和内部派生状态边界。
- 每个 `custom` 能力必须单独说明键盘行为、ARIA 语义、状态模型和测试策略。
- 每个 `scone-wrapper` 能力必须说明 wrapper 增加的 Admin 语义，以及保留的 shadcn/Radix 行为。
- 每个 `vendored-shadcn` 能力必须说明允许调整的 token、density、class 边界，以及不得破坏的 `ref`、`asChild`、DOM 和可访问性行为。
- 每个 `pattern-only` 能力必须说明导出的 parts，不得设计万能配置对象。
- 每个 `direct-docs-only` Recipe 必须说明没有 wrapper 的原因和可验证组合方式。
- 每个验证项必须写清验证对象、验证行为和验证入口；不得只写“补测试”“验证可访问性”。

DESIGN 不需要逐行展开每个 prop，但必须把会影响实现结构、导出 API、状态所有权、DOM 边界、可访问性或测试成本的决策写清楚。

DESIGN 必须包含覆盖矩阵，逐项证明 `docs/10-specs/COMPONENT-SELECTION.md` 中的每个能力都已被纳入设计。矩阵至少包含能力名称、SPEC 文件、层级、source strategy、导出形态、目标源码文件、类型定义位置、测试文件、验证策略和 DESIGN 章节。

DESIGN 必须包含决策追溯，所有会影响目录、导出、类型、状态所有权、可访问性或验证成本的设计决策，都要指向一个或多个精确 SPEC 文件名。

DESIGN 初稿完成后必须进行一次自审和修改。自审不是总结状态，而是用本 RUNBOOK 的 Verification 清单逐项检查 DESIGN 文档本身；发现遗漏、模糊、文件名不精确、覆盖不完整、类型边界不清或验证点不可执行时，必须直接修改 DESIGN 后再交付审核。

## Required DESIGN Structure

`docs/30-designs/DESIGN-ADMIN-UI.md` 必须使用以下章节。

### Purpose

说明 DESIGN 产物用于指导 `scone-ui` admin-ui 组件库实现，不是产品应用设计，不是阶段进度报告。

### Source Files

列出本 DESIGN 实际依据的 SPEC 文件。必须包含 `docs/10-specs/README.md`、`docs/10-specs/ADMIN-UI-SPEC.md`、`docs/10-specs/FOUNDATIONS-SPEC.md`、`docs/10-specs/COMPONENT-SELECTION.md`、`docs/10-specs/ADMIN-PATTERNS-SPEC.md`，并按组件族、Pattern、Recipe 分组列出具体文件名。

### Architecture Decisions

说明 Layer Model、依赖方向、source strategy 到实现形态的映射、禁止业务规则进入通用库的边界。

### File Placement Design

说明 DESIGN 文档自身和后续相关文件的目标落点。必须精确到文件名，不只写目录。该章节只描述目标文件，不创建或修改代码文件。

必须覆盖：

- DESIGN 文档：`docs/30-designs/DESIGN-ADMIN-UI.md`。
- 临时执行手册：`docs/30-designs/RUNBOOK-SPEC-TO-DESIGN.md`。
- 主题文件：`src/styles/theme.css`、`src/styles.css`、`tailwind.config.*`。
- Foundation 类型文件：例如 `src/types/foundation.ts` 或 DESIGN 选择的等价文件。
- 组件族入口文件：例如 `src/components/form/index.ts`、`src/components/data-display/index.ts`、`src/components/layout/index.ts`、`src/components/feedback-overlay/index.ts`、`src/components/navigation/index.ts`、`src/components/media/index.ts`。
- 单组件实现文件：每个 `Scone*` export 对应的 `.tsx` 文件。
- 单组件类型文件：若类型不放在实现文件内，必须列出每个组件对应的类型文件。
- Pattern 文件：每个 Admin Pattern 对应的实现文件、类型文件和入口文件。
- Recipe 文件：说明是 `src/recipes/*.tsx`、`docs/10-specs/recipes/*.md`、示例文件，还是 docs-only 无源码文件。
- Provider/service 文件：Toast 和 Notification 的 provider、imperative service、类型文件和入口文件。
- shared utilities 文件：`className` 合并、polymorphic/asChild 类型、controlled/uncontrolled state helper、ARIA/id helper 等若被设计采用，必须列出目标文件名。
- 测试文件：每个组件族、Pattern、Recipe 或 shared utility 的最小测试文件落点。
- 库入口文件：`src/index.ts` 以及是否存在分组 subpath export 文件。

每个文件落点必须说明职责、对应 SPEC 来源、导出对象、是否公共 API、是否允许承载私有 helper。

### Source Layout Design

说明后续源码目录结构和文件组织原则。该章节应引用 File Placement Design 中的具体文件，不得只停留在目录级别。至少覆盖：

- `src/styles/theme.css`
- `src/styles.css`
- `tailwind.config.*`
- `src/components/form/`
- `src/components/data-display/`
- `src/components/layout/`
- `src/components/feedback-overlay/`
- `src/components/navigation/`
- `src/components/media/`
- `src/patterns/`
- `src/recipes/` 或 docs-only Recipe 归属
- `src/lib/` 或 shared utilities 归属
- `src/index.ts`

该章节只给设计，不创建或修改上述文件。

### Theme And Foundation Design

说明 CSS variables、Tailwind 映射、token families、size、density、layout preset、loading categories、icon policy、shared types。必须明确 `src/styles/theme.css` 是唯一数值源，不创建第二套 `tokens.ts` 数值源。

### Type And Data Structure Design

说明 TypeScript 类型和数据结构的设计边界，至少覆盖：

- Foundation shared types：`ResponsiveValue<T>`、`SconeOption<Value = string>`、`Key`、`SconeTone`，以及 size、density、status、orientation、align、side 等词表类型。
- 类型文件归属：公共类型、组件私有类型、Pattern 类型、Recipe 示例类型、provider/service 类型分别放在哪里。
- 导出规则：哪些类型从 `src/index.ts` 导出，哪些只从组件族入口导出，哪些保持内部私有。
- props 类型命名：组件 props、compound part props、provider props、service option 类型的命名规则。
- 泛型策略：Select、Combobox、RadioGroup、Segmented、Table、Tree 等值类型或数据项类型如何使用泛型，默认泛型是什么。
- 事件 payload：`onValueChange`、`onOpenChange`、`onCheckedChange`、`onSelect`、`onConfirm`、`onCancel`、`onClear`、`onApply`、`onReset`、`onDismiss` 等回调参数如何保持语义单一。
- 状态结构：受控值、默认值、回调、内部派生状态、loading/empty/error/invalid/selected/expanded 的归属边界。
- slot 和 compound parts：compound parts 的 props 类型如何命名、导出和避免和底层 Radix/shadcn 类型冲突。
- DOM/ref 类型：每个组件或 part 的 ref 指向哪个稳定 DOM 边界，是否需要 polymorphic 或 `asChild` 类型。
- service 类型：Toast 和 Notification 的 provider props、imperative function options、返回值、队列项结构和关闭原因。

该章节不得提前写完整源码类型定义，但必须把类型定义位置、命名、导出和约束讲清楚。

### Export Surface Design

按 `docs/10-specs/COMPONENT-SELECTION.md` 的 Export Groups 列出所有导出。每一组必须说明：

- 导出名称。
- 所属文件路径。
- 是否 `Scone*` export、Pattern parts、provider/service export 或 docs-only Recipe。
- 是否 compound。
- 对应 source strategy。
- 对应公共类型或私有类型的归属。
- 对应验证入口。

### Coverage Matrix

用表格逐项覆盖 `docs/10-specs/COMPONENT-SELECTION.md` 中的能力矩阵和 Export Groups。每行至少包含：

- 能力名称。
- SPEC 文件名。
- 层级。
- source strategy。
- 导出名称。
- 目标源码文件。
- 类型定义位置。
- 测试文件。
- 状态能力。
- 验证策略。
- DESIGN 章节。

该矩阵用于证明 DESIGN 没有遗漏任何当前范围能力。

### Component Family Designs

分别建立以下小节：

- Form：覆盖 `SconeButton`、`SconeInput`、`SconeSearchInput`、`SconePasswordInput`、`SconeTextArea`、`SconeSelect`、`SconeForm`、`SconeField`、`SconeFieldGroup`、`SconeFormSection`、`SconeFormActions`、`SconeCombobox`、`SconeSwitch`、`SconeCheckbox`、`SconeRadioGroup`、`SconeNumberInput`、`SconeSlider`、`SconeDatePicker`、`SconeUpload`。
- Data Display：覆盖 `SconeDescriptions`、`SconeTable`、`SconeCard`、`SconeTag`、`SconeBadge`、`SconeList`、`SconeTypography`、`SconeText`、`SconeTitle`、`SconeParagraph`、`SconeStatistic`、`SconeTimeline`。
- Layout：覆盖 `SconeStack`、`SconeInline`、`SconeCompact`、`SconeToolbar`、`SconeSplitPane`、`SconeSeparator`、`SconeScrollArea`。
- Feedback And Overlay：覆盖 `SconeDrawer`、`SconeDialog`、`SconeConfirm`、`SconeAlert`、`SconeEmpty`、`SconeLoading`、`SconeProgress`、`SconeToastProvider`、`toast`、`SconeNotificationProvider`、`notification`。
- Navigation：覆盖 `SconeBreadcrumb`、`SconePagination`、`SconeTabs`、`SconeSegmented`、`SconeTree`、`SconeDropdown`、`SconeMenu`、`SconeTooltip`、`SconeCommand`、`SconeAccordion`、`SconeCollapsible`。
- Media：覆盖 `SconeImage`、`SconeAvatar`。

每个小节必须包含：依据文件、导出清单、状态模型、DOM/ref/className 边界、可访问性边界、source strategy 处理、验证点、明确非目标。

### Admin Pattern Designs

分别覆盖 `AppShell`、`Page`、`Section`、`FilterBar`、`DataTable`、`FormPage`、`DetailPage`、`SettingsPage`、`MasterDetail`。每个 Pattern 必须包含：依据文件、compound parts、slot anatomy、状态所有权、滚动或 sticky 规则、禁止承接的产品职责、验证点。

`DataTable` 必须单独说明它与 `SconeTable`、`SconePagination`、`FilterBar` 的关系，并明确不承接请求状态机、权限判断或万能 `onChange`。

### Recipe Designs

分别覆盖 DrawerForm、ConfirmationFlow、Popover、Logo、Result、Dashboard Metric、Grid。每个 Recipe 必须包含：依据文件、复用的组件或 Pattern、组合边界、docs-only 或 direct-docs-only 原因、验证方式、为什么不新增正式 `Scone*` export。

### Verification Design

按能力类型列出验证策略：

- Foundation/theme：CSS variables、Tailwind 映射、token 消费。
- Component：类型导出、`className`、`ref`、可访问名称、核心状态。
- Radix/shadcn wrapper：键盘、焦点、关闭、`asChild`、ARIA 保持。
- Custom component：键盘、ARIA、状态、受控/非受控、边界条件。
- Pattern：slot 组合、状态归属、滚动/sticky、业务职责不进入。
- Recipe：组合可复制、无新增 API、关键状态可验证。
- Type/data structure：公共类型导出、组件私有类型不泄漏、泛型默认值、事件 payload、service options、ref 类型。

### DESIGN Self Review

记录 DESIGN 文档自审结果和修改结论。该章节不是执行进度，不写“已完成第几步”；只写最终 DESIGN 经过自审后仍需人工确认的结构性问题。

自审必须检查：

- Input Files 是否全部被覆盖，且引用精确到文件名。
- File Placement Design 是否精确到目标文件名，且每个文件都有职责说明。
- Coverage Matrix 是否覆盖全部能力矩阵和 Export Groups。
- Type And Data Structure Design 是否说明公共类型、私有类型、props、事件 payload、状态结构、compound part 类型、ref 类型、provider/service 类型。
- Component Family Designs 是否覆盖全部 `Scone*` export 和 service export。
- Admin Pattern Designs 是否覆盖全部 Pattern，并明确状态归属和业务边界。
- Recipe Designs 是否覆盖全部 Recipe，并明确不新增正式 `Scone*` export 的原因。
- Verification Design 是否对每类能力给出可执行验证入口。
- Decision Traceability 是否能把关键决策追溯到精确 SPEC 文件。
- Review Questions 是否只保留影响实现结构或 API 的问题。

如自审发现问题，必须修改 DESIGN 正文和相关矩阵，不得只在自审章节记录缺口。

### Decision Traceability

列出关键设计决策和依据文件。至少覆盖：

- source strategy 到实现形态的映射。
- `src/styles/theme.css` 作为唯一 token 数值源。
- DESIGN 文档和后续源码、类型、测试、Recipe 文件落点。
- 不创建第二套 `tokens.ts` 数值源。
- `Scone*` export、Pattern parts、provider/service export、docs-only Recipe 的边界。
- 类型定义和导出边界。
- DataTable 与 `SconeTable`、`SconePagination`、`FilterBar` 的职责划分。
- Toast 和 Notification service API 形态。
- `custom` 能力的键盘、ARIA 和验证成本。

### Review Questions

只列影响后续实现结构或 API 的问题。建议至少包含：

- Pattern 导出命名使用 `Page`/`Section` 命名空间还是 `SconePage`/`SconeSection`。
- Toast 和 Notification service API 的 provider、imperative function、队列语义如何固定。
- DataTable 是否引入 TanStack Table 作为推荐但非强制的组合基座。
- `src/recipes/` 是否存在源码目录，还是 Recipe 全部保持文档和示例边界。
- 公共类型是集中在 shared types 入口，还是按组件族分散后由 `src/index.ts` 汇总导出。
- 测试文件采用按组件同目录放置，还是集中在 `src/**/__tests__/` 或 `tests/` 下。

## Non-goals

- 不提交代码。
- 不创建或修改组件源码、样式源码、测试源码、构建配置或导出入口。
- 不把 DESIGN 写成实现进度、阶段记录或中间状态。
- 不新增产品应用级 UI 政策、业务字段、权限规则、接口协议、路由假设或运行时请求状态机。
- 不复制完整 Ant Design API。
- 不为每个 shadcn/ui 能力创建没有额外语义的 `Scone*` wrapper。
- 不把 Recipe 提升为新的 `Scone*` 组件 API。

## Plan

1. 读取 `docs/AGENTS.md` 和 `docs/00-governance/DOCUMENT-RULES.md`，确认文档路由、命名、语言和 RUNBOOK 关闭规则。
2. 读取 `docs/10-specs/README.md`，确认 SPEC 读取顺序、文件合同和索引。
3. 读取 Core SPEC：`docs/10-specs/ADMIN-UI-SPEC.md`、`docs/10-specs/FOUNDATIONS-SPEC.md`、`docs/10-specs/COMPONENT-SELECTION.md`、`docs/10-specs/ADMIN-PATTERNS-SPEC.md`。
4. 按组件族读取 Group SPEC 和 Component SPEC，逐项提取 export、source strategy、状态能力、compound 模型、DOM/ref/className 边界、可访问性边界和 out-of-scope。
5. 按 Pattern 读取 `docs/10-specs/patterns/*.md`，逐项提取 anatomy、slot、状态所有权、滚动/sticky 和业务边界。
6. 按 Recipe 读取 `docs/10-specs/recipes/*.md`，逐项提取组合方式、复用对象、docs-only 边界和不导出原因。
7. 从 `docs/10-specs/FOUNDATIONS-SPEC.md`、`docs/10-specs/ADMIN-UI-SPEC.md` 和单组件 SPEC 提取类型、事件、状态和 shared data structure 约束。
8. 建立 File Placement Design，逐项列出 DESIGN 文档、源码、类型、样式、测试、Recipe、Provider/service 和 shared utility 的目标文件名。
9. 编写 `docs/30-designs/DESIGN-ADMIN-UI.md`，严格使用 Required DESIGN Structure。
10. 建立 Coverage Matrix，逐项对齐 `docs/10-specs/COMPONENT-SELECTION.md` 的能力矩阵和 Export Groups。
11. 建立 Decision Traceability，保证关键设计决策均能追溯到精确 SPEC 文件。
12. 对照 DESIGN Granularity 和 Verification 清单自审 DESIGN 文档。
13. 根据自审结果直接修改 DESIGN 正文、File Placement Design、Coverage Matrix、Type And Data Structure Design、Verification Design 和 Decision Traceability。
14. 再次检查每个章节是否达到文件名、导出名、目标文件路径、类型、状态、边界和验证点级别。
15. 保留 Review Questions 给人工审核，不提交。

## Verification

DESIGN 完成后只做文档级验证：

- `docs/30-designs/RUNBOOK-SPEC-TO-DESIGN.md` 和 `docs/30-designs/DESIGN-ADMIN-UI.md` 均符合 `docs/00-governance/DOCUMENT-RULES.md` 的目录和命名要求。
- DESIGN 的每个章节都列出精确依据文件名。
- DESIGN 覆盖 `docs/10-specs/COMPONENT-SELECTION.md` 中的全部 Export Groups。
- DESIGN 覆盖 Input Files 中列出的所有 Component SPEC、Pattern SPEC 和 Recipe SPEC。
- DESIGN 包含 File Placement Design，且明确 DESIGN 自身、后续源码、类型、样式、测试、Recipe、Provider/service 和 shared utility 的目标文件名。
- DESIGN 包含 Coverage Matrix，且矩阵覆盖 `docs/10-specs/COMPONENT-SELECTION.md` 的全部能力矩阵和 Export Groups。
- DESIGN 包含 Type And Data Structure Design，且说明公共类型、私有类型、props 类型、事件 payload、状态结构、compound part 类型、ref 类型、provider/service 类型。
- DESIGN 包含 DESIGN Self Review，且自审发现的问题已经回写到 DESIGN 正文和相关矩阵。
- DESIGN 包含 Decision Traceability，且关键目录、导出、类型、状态、可访问性和验证决策都指向精确 SPEC 文件名。
- DESIGN 不包含实现进度描述、提交计划、代码片段或源码改动清单。
- DESIGN 不引入产品应用规则、业务工作流、后端契约、权限策略或路由假设。
- DESIGN 明确哪些能力导出 `Scone*`，哪些只导出 Pattern parts，哪些是 provider/service export，哪些只作为 Recipe 或 docs-only 边界。
- DESIGN 对每个导出能力都写明目标源码文件、类型文件和测试文件；docs-only 能力必须明确没有源码落点的原因。
- DESIGN 对每个 `custom` 能力都写明键盘、ARIA、状态和测试策略。
- DESIGN 对每个公共类型和 service 类型都写明导出边界，避免类型散落或隐式泄漏私有结构。
- `git diff -- docs/30-designs/` 只显示文档新增或文档调整。

## Closure

本 RUNBOOK 在 DESIGN 审核通过并完成后续任务拆解时删除。若 DESIGN 中形成长期有效的工程规则，先迁移到 `docs/00-governance/`；若形成实现覆盖度或验证证据，先迁移到 `docs/40-readiness/`。
