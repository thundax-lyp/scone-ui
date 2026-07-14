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
- Form components：`SconeButton`、`SconeInput`、`SconeSearchInput`、`SconePasswordInput`、`SconeTextArea`、`SconeSelect`、`SconeForm`、`SconeField`。
- Form helpers：`SconeFieldGroup`、`SconeFormSection`、`SconeFormActions`。
- Additional form inputs：`SconeCombobox`、`SconeSwitch`、`SconeCheckbox`、`SconeRadioGroup`、`SconeNumberInput`、`SconeSlider`、`SconeDatePicker`、`SconeUpload`。
- Layout primitives：已实现并测试 `SconeStack`、`SconeInline`、`SconeCompact`、`SconeToolbar`、`SconeSplitPane`、`SconeSeparator`、`SconeScrollArea`。
- Data display：已实现并测试 `SconeDescriptions`、`SconeTable`、`SconeCard`、`SconeTag`、`SconeBadge`、`SconeList`、`SconeStatistic`、`SconeTimeline`。
- Navigation and media：`SconeBreadcrumb`、`SconePagination`、`SconeTabs`、`SconeSegmented`、`SconeTree`、`SconeDropdown`、`SconeMenu`、`SconeTooltip`、`SconeCommand`、`SconeAccordion`、`SconeCollapsible`、`SconeImage`、`SconeAvatar`。
- Feedback：已实现并测试 `SconeDrawer`、`SconeDialog`、`SconeConfirm`、`SconeAlert`、`SconeEmpty`、`SconeLoading`、`SconeProgress`、`SconeToastProvider`、`toast`、`SconeNotificationProvider`、`notification`。
- Admin Pattern exports：`AppShell`、`Page`、`Section`、`FilterBar`、`DataTable` compound parts。
- Recipes：DrawerForm、ConfirmationFlow、Popover、Logo、Result、Dashboard Metric、Grid。

## Implementation Coverage Evidence

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

## Pending Implementation Work

后续实现阶段至少需要完成：

1. 创建 DESIGN 指定的其余 `src/` 目录结构、公共入口和组件族类型入口。
2. 按 `docs/10-specs/COMPONENT-SELECTION.md` 的 source strategy 实现 wrapper、vendored primitive、custom component、pattern-only 和 docs-only 边界。
3. 继续维护 `src/styles/theme.css` 作为 CSS variables 唯一数值源，并维护默认 `tailwind.config.ts` 到 CSS variables 的映射。
4. 实现 Data Display、Layout primitives 和 Feedback / Overlay 以外的组件族和 Pattern；Recipe 全部保持文档和示例边界，不创建 `src/recipes/` 源码入口。
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

实现覆盖：部分完成。Data Display、Layout primitives 与 Feedback / Overlay 已实现；其余组件族、Pattern 和 Recipe 未完成。

测试覆盖：部分完成。Data Display、Layout primitives 与 Feedback / Overlay 已测试；其余组件族、Pattern 和 Recipe 未完成。
