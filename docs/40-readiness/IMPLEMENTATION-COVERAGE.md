# Implementation Coverage

## Purpose

本文档记录 `docs/30-designs/DESIGN-ADMIN-UI.md` 及 `docs/30-designs/admin-ui/` 下拆分设计文档对 admin-ui SPEC 的设计覆盖状态，并记录已经完成实现闭环的组件族证据。

当前状态同时记录设计覆盖和已完成的实现覆盖证据：

- 未列入实现覆盖证据的组件、Pattern、Recipe 仍只表示已完成设计落点。
- 已列入实现覆盖证据的范围必须同时记录源码、测试和验证命令。
- 不替代发布准备记录。

## Source Documents

- `docs/30-designs/DESIGN-ADMIN-UI.md`
- `docs/30-designs/admin-ui/ARCHITECTURE-DESIGN.md`
- `docs/30-designs/admin-ui/FILE-PLACEMENT-DESIGN.md`
- `docs/30-designs/admin-ui/FOUNDATION-DESIGN.md`
- `docs/30-designs/admin-ui/TYPE-DATA-DESIGN.md`
- `docs/30-designs/admin-ui/EXPORT-SURFACE-DESIGN.md`
- `docs/30-designs/admin-ui/COMPONENT-FAMILY-DESIGN.md`
- `docs/30-designs/admin-ui/PATTERN-DESIGN.md`
- `docs/30-designs/admin-ui/RECIPE-DESIGN.md`
- `docs/30-designs/admin-ui/VERIFICATION-DESIGN.md`
- `docs/30-designs/admin-ui/REVIEW-TRACEABILITY.md`
- `docs/10-specs/COMPONENT-SELECTION.md`
- `docs/10-specs/ADMIN-UI-SPEC.md`
- `docs/10-specs/FOUNDATIONS-SPEC.md`
- `docs/10-specs/ADMIN-PATTERNS-SPEC.md`

## Design Coverage Summary

| 覆盖对象                            | 设计状态   | 依据                                                  |
| ----------------------------------- | ---------- | ----------------------------------------------------- |
| Foundation/theme                    | 已完成设计 | `docs/30-designs/admin-ui/FOUNDATION-DESIGN.md`       |
| Type/data structure                 | 已完成设计 | `docs/30-designs/admin-ui/TYPE-DATA-DESIGN.md`        |
| Public export surface               | 已完成设计 | `docs/30-designs/admin-ui/EXPORT-SURFACE-DESIGN.md`   |
| Form components                     | 已完成设计 | `docs/30-designs/admin-ui/COMPONENT-FAMILY-DESIGN.md` |
| Data display components             | 已完成设计 | `docs/30-designs/admin-ui/COMPONENT-FAMILY-DESIGN.md` |
| Layout primitives                   | 已完成设计 | `docs/30-designs/admin-ui/COMPONENT-FAMILY-DESIGN.md` |
| Feedback and overlay components     | 已完成设计 | `docs/30-designs/admin-ui/COMPONENT-FAMILY-DESIGN.md` |
| Navigation components               | 已完成设计 | `docs/30-designs/admin-ui/COMPONENT-FAMILY-DESIGN.md` |
| Media components                    | 已完成设计 | `docs/30-designs/admin-ui/COMPONENT-FAMILY-DESIGN.md` |
| Admin patterns                      | 已完成设计 | `docs/30-designs/admin-ui/PATTERN-DESIGN.md`          |
| Recipes                             | 已完成设计 | `docs/30-designs/admin-ui/RECIPE-DESIGN.md`           |
| Verification strategy               | 已完成设计 | `docs/30-designs/admin-ui/VERIFICATION-DESIGN.md`     |
| Design self review and traceability | 已完成设计 | `docs/30-designs/admin-ui/REVIEW-TRACEABILITY.md`     |

## Capability Coverage

以下能力已在 DESIGN 中完成设计落点和验证规划。已实现条目在本节明确标注；未标注实现状态的能力仍需后续实现代码与测试：

- Typography：已实现并测试 `SconeTypography`、`SconeText`、`SconeTitle`、`SconeParagraph`。
- Form components：已实现并测试 `SconeButton`、`SconeInput`、`SconeSearchInput`、`SconePasswordInput`、`SconeTextArea`、`SconeSelect`、`SconeForm`、`SconeField`。
- Form helpers：已实现并测试 `SconeFieldGroup`、`SconeFormSection`、`SconeFormActions`。
- Additional form inputs：已实现并测试 `SconeCombobox`、`SconeSwitch`、`SconeCheckbox`、`SconeRadioGroup`、`SconeNumberInput`、`SconeSlider`、`SconeDatePicker`、`SconeUpload`。
- Layout primitives：已实现并测试 `SconeStack`、`SconeInline`、`SconeCompact`、`SconeToolbar`、`SconeSplitPane`、`SconeSeparator`、`SconeScrollArea`。
- Data display：已实现并测试 `SconeDescriptions`、`SconeTable`、`SconeCard`、`SconeTag`、`SconeBadge`、`SconeList`、`SconeStatistic`、`SconeTimeline`。
- Navigation and media：已实现并测试 `SconeBreadcrumb`、`SconeTabs`、`SconeSegmented`、`SconeTree`、`SconeDropdown`、`SconeMenu`、`SconeTooltip`、`SconeCommand`、`SconeAccordion`、`SconeCollapsible`、`SconePagination`、`SconeImage`、`SconeAvatar`。
- Feedback：已实现并测试 `SconeDrawer`、`SconeDialog`、`SconeConfirm`、`SconeAlert`、`SconeEmpty`、`SconeLoading`、`SconeProgress`、`SconeToastProvider`、`toast`、`SconeNotificationProvider`、`notification`。
- Admin Pattern exports：已实现并测试 `DataTable` compound parts；`AppShell`、`Page`、`Section`、`FilterBar`。
- Recipes：DrawerForm、ConfirmationFlow、Popover、Logo、Result、Dashboard Metric、Grid。

## Implementation Coverage Evidence

### Form

实现状态：已完成。

测试状态：已完成。

源码文件：

- `src/components/form/form.tsx`
- `src/components/form/field.tsx`
- `src/components/form/control.ts`
- `src/components/form/button.tsx`
- `src/components/form/input.tsx`
- `src/components/form/search-input.tsx`
- `src/components/form/password-input.tsx`
- `src/components/form/textarea.tsx`
- `src/components/form/select.tsx`
- `src/components/form/combobox.tsx`
- `src/components/form/switch.tsx`
- `src/components/form/checkbox.tsx`
- `src/components/form/radio-group.tsx`
- `src/components/form/number-input.tsx`
- `src/components/form/slider.tsx`
- `src/components/form/date-picker.tsx`
- `src/components/form/upload.tsx`
- `src/components/form/field-group.tsx`
- `src/components/form/form-section.tsx`
- `src/components/form/form-actions.tsx`
- `src/components/form/index.ts`
- `src/index.ts`

测试文件：

- `src/components/form/form.test.tsx`
- `src/components/form/button.test.tsx`
- `src/components/form/input.test.tsx`
- `src/components/form/search-input.test.tsx`
- `src/components/form/password-input.test.tsx`
- `src/components/form/textarea.test.tsx`
- `src/components/form/select.test.tsx`
- `src/components/form/combobox.test.tsx`
- `src/components/form/switch.test.tsx`
- `src/components/form/checkbox.test.tsx`
- `src/components/form/radio-group.test.tsx`
- `src/components/form/number-input.test.tsx`
- `src/components/form/slider.test.tsx`
- `src/components/form/date-picker.test.tsx`
- `src/components/form/upload.test.tsx`
- `src/components/form/field-group.test.tsx`
- `src/components/form/form-section.test.tsx`
- `src/components/form/form-actions.test.tsx`
- `src/index.test.ts`

覆盖能力：

- Form shell：`SconeForm` 提供 disabled、readOnly、requiredMark 上下文；`SconeField` 提供 Root、Label、Control、Description、Message 组合和 label/description/message ARIA 关联。
- Basic controls：`SconeButton`、`SconeInput`、`SconeSearchInput`、`SconePasswordInput`、`SconeTextArea`、`SconeSelect` 支持受控/非受控值、size、invalid、disabled/readOnly、Field 上下文和公共 props type。
- Additional inputs：`SconeCombobox`、`SconeSwitch`、`SconeCheckbox`、`SconeRadioGroup`、`SconeNumberInput`、`SconeSlider`、`SconeDatePicker`、`SconeUpload` 支持核心交互、受控状态、Field 上下文和公共 props type。
- Form helpers：`SconeFieldGroup`、`SconeFormSection`、`SconeFormActions` 支持分组、分区、动作区布局和 ref/className 透传。
- Public exports：Form 组件族入口和库级入口导出所有组件、hooks、props 类型和 `SconeUploadRejection`。

验证结果：

- `pnpm format`：通过。
- `pnpm lint`：通过，0 errors，12 warnings；warning 为 `react-refresh/only-export-components`，其中 Form 相关 warning 来自 `src/components/form/field.tsx`、`src/components/form/form.tsx`。
- `pnpm build`：通过。
- `pnpm test`：通过，53 个 test files、172 个 tests。
- `pnpm typecheck`：通过。
- `pnpm format:check`：通过。

说明：

- Form 组件族只提供组件库层表单控件和组合语义，不内置表单校验 schema、提交状态机、后端请求、业务字段规则或产品工作流。
- `SconeCombobox`、`SconeDatePicker` 为组件库基础交互实现；复杂异步数据源、时区策略、范围选择和业务日期禁用规则由调用方组合。
- `SconeUpload` 只处理文件选择、accept/maxSize/maxFiles/beforeAdd 基础约束和 rejection 回调，不执行上传请求或持久化。

### Data Display

实现状态：已完成。

测试状态：已完成。

源码文件：

- `src/components/data-display/typography.tsx`
- `src/components/data-display/tag.tsx`
- `src/components/data-display/badge.tsx`
- `src/components/data-display/card.tsx`
- `src/components/data-display/statistic.tsx`
- `src/components/data-display/descriptions.tsx`
- `src/components/data-display/list.tsx`
- `src/components/data-display/table.tsx`
- `src/components/data-display/timeline.tsx`
- `src/components/data-display/index.ts`
- `src/index.ts`

测试文件：

- `src/components/data-display/typography.test.tsx`
- `src/components/data-display/tag.test.tsx`
- `src/components/data-display/badge.test.tsx`
- `src/components/data-display/card.test.tsx`
- `src/components/data-display/statistic.test.tsx`
- `src/components/data-display/descriptions.test.tsx`
- `src/components/data-display/list.test.tsx`
- `src/components/data-display/table.test.tsx`
- `src/components/data-display/timeline.test.tsx`
- `src/index.test.ts`

覆盖能力：

- Typography：`SconeTypography`、`SconeText`、`SconeTitle`、`SconeParagraph`。
- Display labels：`SconeTag`、`SconeBadge`。
- Containers and metrics：`SconeCard`、`SconeStatistic`。
- Structured data：`SconeDescriptions`、`SconeList`、`SconeTable`。
- Event sequence：`SconeTimeline`。
- Public exports：Data Display 组件族入口和库级入口。

验证结果：

- `pnpm test`：通过，17 个 test files、64 个 tests。
- `pnpm typecheck`：通过。
- `pnpm lint`：通过。
- `pnpm build`：通过。

说明：

- 基础 `SconeTable` 不包含 `DataTable` Pattern 的筛选、分页、selection、bulk actions、fixed column、sticky header、虚拟滚动或 DataGrid 键盘模型。
- `SconeStatistic` 不包含趋势计算、同比语义、业务口径格式化或 `trend`/`delta`/`precision` 字段。
- Tag/Badge 的业务枚举到 `SconeTone` 映射由调用方处理。

### Layout Primitives

实现状态：已完成。

源码文件：

- `src/components/layout/stack.tsx`
- `src/components/layout/inline.tsx`
- `src/components/layout/compact.tsx`
- `src/components/layout/toolbar.tsx`
- `src/components/layout/separator.tsx`
- `src/components/layout/scroll-area.tsx`
- `src/components/layout/split-pane.tsx`
- `src/index.ts`

测试文件：

- `src/components/layout/stack.test.tsx`
- `src/components/layout/inline.test.tsx`
- `src/components/layout/compact.test.tsx`
- `src/components/layout/toolbar.test.tsx`
- `src/components/layout/separator.test.tsx`
- `src/components/layout/scroll-area.test.tsx`
- `src/components/layout/split-pane.test.tsx`
- `src/index.test.ts`

覆盖能力：

- `SconeStack`：token gap、垂直排列、align、ref、`className`、`style`。
- `SconeInline`：token gap、水平排列、align、wrap、decorative `split`、ref、`className`、`style`。
- `SconeCompact`：horizontal/vertical、`size="sm" | "md"`、根 class 协调紧凑边界、不 clone 子项。
- `SconeToolbar`：`start` / `end` 布局、`children` 自定义内容优先、`density="compact" | "default"`、窄屏换行 class、ref。
- `SconeSeparator`：horizontal/vertical、decorative、semantic separator、Radix/shadcn ref 语义。
- `SconeScrollArea`：根 class、viewport class、viewport `onScroll`、根 ref、局部滚动边界。
- `SconeSplitPane`：两个面板、resize handle、preset、受控 CSS 长度、鼠标拖拽、键盘调整、`onSizeChange`、`onSizeCommit`、ARIA separator 语义、CSS 长度单位校验。
- Public exports：Layout 组件和 public props type 已从 `src/index.ts` 导出。

验证结果：

- `pnpm format`：通过。
- `pnpm lint`：通过。
- `pnpm build`：通过。
- `pnpm test -- src/components/layout`：通过，15 个测试文件、45 个测试。
- `pnpm test -- src/index.test.ts src/components/layout`：通过，15 个测试文件、45 个测试。
- `pnpm typecheck`：通过。

说明：

- `pnpm typecheck` 首次运行时因本地 `node_modules` 缺少已声明的 `@types/node` 失败；执行 `pnpm install --frozen-lockfile` 补齐依赖后通过，未改变 `package.json` 或 `pnpm-lock.yaml`。

### Feedback / Overlay

实现状态：已完成。

源码文件：

- `src/components/feedback-overlay/alert.tsx`
- `src/components/feedback-overlay/empty.tsx`
- `src/components/feedback-overlay/loading.tsx`
- `src/components/feedback-overlay/progress.tsx`
- `src/components/feedback-overlay/drawer.tsx`
- `src/components/feedback-overlay/dialog.tsx`
- `src/components/feedback-overlay/confirm.tsx`
- `src/components/feedback-overlay/toast.tsx`
- `src/components/feedback-overlay/notification.tsx`
- `src/index.ts`

测试文件：

- `src/components/feedback-overlay/alert.test.tsx`
- `src/components/feedback-overlay/empty.test.tsx`
- `src/components/feedback-overlay/loading.test.tsx`
- `src/components/feedback-overlay/progress.test.tsx`
- `src/components/feedback-overlay/drawer.test.tsx`
- `src/components/feedback-overlay/dialog.test.tsx`
- `src/components/feedback-overlay/confirm.test.tsx`
- `src/components/feedback-overlay/toast.test.tsx`
- `src/components/feedback-overlay/notification.test.tsx`
- `src/index.test.ts`

覆盖能力：

- `SconeAlert`、`SconeEmpty`、`SconeLoading`、`SconeProgress` 状态反馈组件。
- `SconeDrawer`、`SconeDialog`、`SconeConfirm` 阻断浮层组件。
- `SconeToastProvider` / `toast` 与 `SconeNotificationProvider` / `notification` 队列反馈 service。
- Public exports：Feedback / Overlay 组件、Provider、service 和 public props type 已从 `src/index.ts` 导出。

验证结果：

- `pnpm lint`：通过。
- `pnpm build`：通过。
- `pnpm test`：通过，17 个测试文件、51 个测试。
- `pnpm typecheck`：通过。

说明：

- 其他组件族、Pattern 和 Recipe 仍未进入实现覆盖。

### Navigation / Media

实现状态：已完成。

测试状态：已完成。

源码文件：

- `src/components/navigation/breadcrumb.tsx`
- `src/components/navigation/tabs.tsx`
- `src/components/navigation/segmented.tsx`
- `src/components/navigation/tree.tsx`
- `src/components/navigation/dropdown.tsx`
- `src/components/navigation/menu.tsx`
- `src/components/navigation/tooltip.tsx`
- `src/components/navigation/command.tsx`
- `src/components/navigation/accordion.tsx`
- `src/components/navigation/collapsible.tsx`
- `src/components/navigation/pagination.tsx`
- `src/components/navigation/index.ts`
- `src/components/media/image.tsx`
- `src/components/media/avatar.tsx`
- `src/components/media/index.ts`
- `src/types/foundation.ts`
- `src/index.ts`

测试文件：

- `src/components/navigation/breadcrumb.test.tsx`
- `src/components/navigation/tabs.test.tsx`
- `src/components/navigation/segmented.test.tsx`
- `src/components/navigation/tree.test.tsx`
- `src/components/navigation/dropdown.test.tsx`
- `src/components/navigation/menu.test.tsx`
- `src/components/navigation/tooltip.test.tsx`
- `src/components/navigation/command.test.tsx`
- `src/components/navigation/accordion.test.tsx`
- `src/components/navigation/collapsible.test.tsx`
- `src/components/media/image.test.tsx`
- `src/components/media/avatar.test.tsx`
- `src/components/navigation/pagination.test.tsx`
- `src/types/foundation.test.ts`
- `src/index.test.ts`

覆盖能力：

- Breadcrumb：路径项渲染、分隔符、`maxItems` 折叠、disabled 项、`onItemClick`。
- Tabs：受控和非受控选中、水平和垂直方向、自动和手动激活、键盘切换、禁用项。
- Segmented：受控和非受控选择、禁用控件和禁用选项、`sm` / `md` 尺寸。
- Tree：选中、展开、勾选、多选、禁用节点、键盘导航、父子层级可见性。
- Dropdown：trigger 开合、动作项选择、禁用项、destructive 样式、separator、键盘关闭和移动焦点。
- Menu：选中项、展开项、嵌套菜单、水平和垂直键盘移动、collapsed 标题提示、禁用项。
- Tooltip：hover、focus、受控和非受控 open、延迟显示、Escape 关闭、方向 class。
- Command：搜索过滤、分组、空态、loading、键盘选择、禁用项、`onSelect`。
- Accordion：single / multiple 展开、受控和非受控值、禁用项、`collapsible`。
- Collapsible：受控和非受控展开、禁用 trigger、`onOpenChange`。
- Image：加载、错误回退、比例、object-fit、caption、懒加载。
- Avatar：图片、fallback、尺寸、形状、状态点、图片错误回退。
- `SconePaginationState`：`page`、`pageSize`、`total` 受控分页状态。
- `SconePaginationChangeReason`：`"page"` 与 `"pageSize"` 变更原因。
- `SconePagination`：`nav` 语义、上一页、下一页、页码按钮、page size `select`、总数文本、`aria-current`、边界 disabled、density、`className`、ref。
- `pageSize` 变化默认提交 `{ page: 1, pageSize, total }`。
- Public exports：Navigation 和 Media 组件族入口、库级入口及 public props type。

验证结果：

- `pnpm format`：通过。
- `pnpm lint`：通过。
- `pnpm typecheck`：通过。
- `pnpm test -- src/components/navigation src/components/media src/index.test.ts`：通过，45 个 test files、166 个 tests。
- `pnpm build`：通过。

说明：

- Navigation / Media 不引入路由、权限过滤、菜单数据加载、图片鉴权、下载服务或产品级导航策略。
- `SconeDropdown` 保持动作菜单边界，不作为表单值选择控件；表单值选择仍归属 Select / Combobox。
- `SconeTooltip` 仅覆盖短提示，不承载错误说明、必读说明或可点击内容。
- Pagination 只表达受控分页状态和交互，不发起请求、不读取 URL、不持久化分页状态。
- 服务端分页、游标分页和 URL 同步仍由调用方或后续 recipe 处理。

### Admin Pattern / DataTable

实现状态：已完成。

测试状态：已完成。

源码文件：

- `src/patterns/data-table.tsx`
- `src/patterns/index.ts`
- `src/components/navigation/pagination.tsx`
- `src/components/data-display/table.tsx`
- `src/components/layout/toolbar.tsx`
- `src/types/foundation.ts`
- `src/index.ts`

测试文件：

- `src/patterns/data-table.test.tsx`
- `src/components/navigation/pagination.test.tsx`
- `src/components/data-display/table.test.tsx`
- `src/components/layout/toolbar.test.tsx`
- `src/types/foundation.test.ts`
- `src/index.test.ts`

覆盖能力：

- `DataTable.Root`：density、rowSelection、pagination、onPaginationChange context。
- `DataTable.FilterBar`：slot 边界，不定义筛选 schema。
- `DataTable.Toolbar`：复用 `SconeToolbar`，展示 title、start、end、actions 和 selected count。
- `DataTable.BulkActions`：根据 selected count 展示 action，支持清空选择。
- `DataTable.TableRegion`：`loading > error > empty` 状态优先级、局部 viewport、数据模式组合 `SconeTable`、selection column 注入、children escape hatch。
- `DataTable.Pagination`：唯一 DataTable 分页入口，组合 `SconePagination` 并透传 props/context 状态。
- Public exports：Pattern 局部入口和库级入口。

验证结果：

- `pnpm format`：通过。
- `pnpm lint`：通过；`src/patterns/data-table.tsx` 保留 compound parts 触发的 `react-refresh/only-export-components` warning，退出码为 0。
- `pnpm build`：通过。
- `pnpm test`：通过，35 个 test files、128 个 tests。
- `pnpm test -- src/types/foundation.test.ts`：通过，35 个 test files、128 个 tests。
- `pnpm test -- src/components/navigation/pagination.test.tsx src/patterns/data-table.test.tsx`：通过，35 个 test files、128 个 tests。
- `pnpm test -- src/index.test.ts`：通过，35 个 test files、128 个 tests。
- `pnpm typecheck`：通过。

说明：

- `SconeTable` 公共 API 未加入 `pagination` 或 `rowSelection`；selection column 只由 `DataTable.TableRegion` 在数据模式下注入。
- `DataTable.FilterBar` 本轮只实现 slot，不实现独立 `src/patterns/filter-bar.tsx`。
- `DataTable` 不发起请求、不判断权限、不读取业务 store，不引入 TanStack Table 默认依赖。

## Pending Implementation Work

后续实现阶段至少需要完成：

1. 创建 DESIGN 指定的其余 `src/` 目录结构、公共入口和组件族类型入口。
2. 按 `docs/10-specs/COMPONENT-SELECTION.md` 的 source strategy 实现 wrapper、vendored primitive、custom component、pattern-only 和 docs-only 边界。
3. 继续维护 `src/styles/theme.css` 作为 CSS variables 唯一数值源，并维护默认 `tailwind.config.ts` 到 CSS variables 的映射。
4. 实现已完成 Data Display、Layout primitives、Feedback / Overlay、Navigation / Media 和 `DataTable` 以外的组件族和 Pattern；Recipe 全部保持文档和示例边界，不创建 `src/recipes/` 源码入口。
5. 按 DESIGN 的 Verification Design 在被测文件同目录创建 `*.test.ts` 或 `*.test.tsx`，并生成真正的实现覆盖证据。
6. 在后续实现后更新本 readiness 文档，区分已实现、已测试、未覆盖和延期项。

## Verification Plan

后续验证应至少覆盖：

- Foundation/theme：CSS variables 是唯一数值源，Tailwind 只映射变量。
- Public exports：`src/index.ts` 与 Export Groups 一致，docs-only Recipe 不导出。
- Accessibility：label、description、message、ARIA、keyboard、focus trap、focus restore。
- State semantics：loading、empty、error、disabled、readOnly、invalid、selected、expanded 的归属和优先级。
- Composition boundaries：Pattern 不发起请求、不判断权限、不承载产品流程。
- Recipe boundaries：Recipe 可复制组合，全部保持文档和示例边界，且不创建正式 `Scone*` API 或 `src/recipes/` 源码入口。
- Custom interactions：Tree、SplitPane、NumberInput、DatePicker、Upload、Timeline 的键盘和边界条件。

## Design Review Status

当前无未决审核问题。`AppShell.*` 和独立 `FilterBar.*` 已按用户审核结论补入 DESIGN 公共 Pattern 导出面；关键公共数据结构、公共组件 props、Pattern part props 和 service API 已补齐字段级 TypeScript shape 和定义文件落点。

## Current Status

设计覆盖：完成。

实现覆盖：部分完成。Data Display、Layout primitives、Feedback / Overlay、Navigation / Media 与 `DataTable` 已实现；其余组件族、Pattern 和 Recipe 未完成。

测试覆盖：部分完成。Data Display、Layout primitives、Feedback / Overlay、Navigation / Media 与 `DataTable` 已测试；其余组件族、Pattern 和 Recipe 未完成。
