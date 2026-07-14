# Implementation Coverage

## Purpose

本文档记录 `docs/30-designs/DESIGN-ADMIN-UI.md` 及 `docs/30-designs/admin-ui/` 下拆分设计文档对 admin-ui SPEC 的设计覆盖状态，并记录已经完成实现闭环的组件族证据。

除本文明确列出的实现证据外，其他能力仍只表示设计覆盖，不代表源码、测试或发布准备已经完成：

- 未列入实现证据的组件、Pattern、Recipe 或测试不声明已经实现。
- 本文不替代发布说明；只记录实现覆盖、验证命令和剩余延期项。

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

以下能力已在 DESIGN 中完成设计落点和验证规划。Data Display 已在本文件的实现证据中标记完成；未标记的组件族仍需实现代码与测试：

- Typography：`SconeTypography`、`SconeText`、`SconeTitle`、`SconeParagraph`。
- Form components：`SconeButton`、`SconeInput`、`SconeSearchInput`、`SconePasswordInput`、`SconeTextArea`、`SconeSelect`、`SconeForm`、`SconeField`。
- Form helpers：`SconeFieldGroup`、`SconeFormSection`、`SconeFormActions`。
- Additional form inputs：`SconeCombobox`、`SconeSwitch`、`SconeCheckbox`、`SconeRadioGroup`、`SconeNumberInput`、`SconeSlider`、`SconeDatePicker`、`SconeUpload`。
- Layout primitives：`SconeStack`、`SconeInline`、`SconeCompact`、`SconeToolbar`、`SconeSplitPane`、`SconeSeparator`、`SconeScrollArea`。
- Data display：`SconeDescriptions`、`SconeTable`、`SconeCard`、`SconeTag`、`SconeBadge`、`SconeList`、`SconeStatistic`、`SconeTimeline`。
- Navigation and media：`SconeBreadcrumb`、`SconePagination`、`SconeTabs`、`SconeSegmented`、`SconeTree`、`SconeDropdown`、`SconeMenu`、`SconeTooltip`、`SconeCommand`、`SconeAccordion`、`SconeCollapsible`、`SconeImage`、`SconeAvatar`。
- Feedback：`SconeDrawer`、`SconeDialog`、`SconeConfirm`、`SconeAlert`、`SconeEmpty`、`SconeLoading`、`SconeProgress`、`SconeToastProvider`、`toast`、`SconeNotificationProvider`、`notification`。
- Admin Pattern exports：`AppShell`、`Page`、`Section`、`FilterBar`、`DataTable` compound parts。
- Recipes：DrawerForm、ConfirmationFlow、Popover、Logo、Result、Dashboard Metric、Grid。

## Implementation Evidence

### Data Display

实现状态：已完成。

测试状态：已完成。

公共导出：

- `src/components/data-display/index.ts`
- `src/index.ts`

已实现文件：

- `src/components/data-display/typography.tsx`
- `src/components/data-display/tag.tsx`
- `src/components/data-display/badge.tsx`
- `src/components/data-display/card.tsx`
- `src/components/data-display/statistic.tsx`
- `src/components/data-display/descriptions.tsx`
- `src/components/data-display/list.tsx`
- `src/components/data-display/table.tsx`
- `src/components/data-display/timeline.tsx`

已测试文件：

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

已覆盖能力：

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

未覆盖或延期项：

- 基础 `SconeTable` 不包含 `DataTable` Pattern 的筛选、分页、selection、bulk actions、fixed column、sticky header、虚拟滚动或 DataGrid 键盘模型。
- `SconeStatistic` 不包含趋势计算、同比语义、业务口径格式化或 `trend`/`delta`/`precision` 字段。
- Tag/Badge 的业务枚举到 `SconeTone` 映射由调用方处理。

## Pending Implementation Work

后续实现阶段至少需要完成：

1. 继续创建 DESIGN 指定的剩余 `src/` 目录结构、公共入口和组件族类型入口。
2. 按 `docs/10-specs/COMPONENT-SELECTION.md` 的 source strategy 实现 wrapper、vendored primitive、custom component、pattern-only 和 docs-only 边界。
3. 继续维护 `src/styles/theme.css` 作为 CSS variables 唯一数值源，并维护默认 `tailwind.config.ts` 到 CSS variables 的映射。
4. 实现剩余组件族和 Pattern；Recipe 全部保持文档和示例边界，不创建 `src/recipes/` 源码入口。
5. 按 DESIGN 的 Verification Design 在被测文件同目录创建 `*.test.ts` 或 `*.test.tsx`，并生成真正的实现覆盖证据。
6. 在实现后更新本 readiness 文档，区分已实现、已测试、未覆盖和延期项。

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

实现覆盖：Data Display 已完成；其余组件族和 Pattern 未开始。

测试覆盖：Data Display 已完成；其余组件族和 Pattern 未开始。
