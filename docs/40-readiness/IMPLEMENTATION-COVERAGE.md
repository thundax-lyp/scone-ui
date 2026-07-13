# Implementation Coverage

## Purpose

本文档记录 `docs/30-designs/DESIGN-ADMIN-UI.md` 及 `docs/30-designs/admin-ui/` 下拆分设计文档对 admin-ui SPEC 的设计覆盖状态。

当前状态是设计覆盖记录，不是实现完成证据：

- 不声明 `src/` 代码已经创建。
- 不声明组件、Pattern、Recipe 或测试已经实现。
- 不替代后续实现任务中的测试结果、构建结果或发布准备记录。

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

| 覆盖对象 | 设计状态 | 依据 |
| --- | --- | --- |
| Foundation/theme | 已完成设计 | `docs/30-designs/admin-ui/FOUNDATION-DESIGN.md` |
| Type/data structure | 已完成设计 | `docs/30-designs/admin-ui/TYPE-DATA-DESIGN.md` |
| Public export surface | 已完成设计 | `docs/30-designs/admin-ui/EXPORT-SURFACE-DESIGN.md` |
| Form components | 已完成设计 | `docs/30-designs/admin-ui/COMPONENT-FAMILY-DESIGN.md` |
| Data display components | 已完成设计 | `docs/30-designs/admin-ui/COMPONENT-FAMILY-DESIGN.md` |
| Layout primitives | 已完成设计 | `docs/30-designs/admin-ui/COMPONENT-FAMILY-DESIGN.md` |
| Feedback and overlay components | 已完成设计 | `docs/30-designs/admin-ui/COMPONENT-FAMILY-DESIGN.md` |
| Navigation components | 已完成设计 | `docs/30-designs/admin-ui/COMPONENT-FAMILY-DESIGN.md` |
| Media components | 已完成设计 | `docs/30-designs/admin-ui/COMPONENT-FAMILY-DESIGN.md` |
| Admin patterns | 已完成设计 | `docs/30-designs/admin-ui/PATTERN-DESIGN.md` |
| Recipes | 已完成设计 | `docs/30-designs/admin-ui/RECIPE-DESIGN.md` |
| Verification strategy | 已完成设计 | `docs/30-designs/admin-ui/VERIFICATION-DESIGN.md` |
| Design self review and traceability | 已完成设计 | `docs/30-designs/admin-ui/REVIEW-TRACEABILITY.md` |

## Capability Coverage

以下能力已在 DESIGN 中完成设计落点和验证规划，后续仍需实现代码与测试：

- Typography：`SconeTypography`、`SconeText`、`SconeTitle`、`SconeParagraph`。
- Form components：`SconeButton`、`SconeInput`、`SconeSearchInput`、`SconePasswordInput`、`SconeTextArea`、`SconeSelect`、`SconeForm`、`SconeField`。
- Form helpers：`SconeFieldGroup`、`SconeFormSection`、`SconeFormActions`。
- Additional form inputs：`SconeCombobox`、`SconeSwitch`、`SconeCheckbox`、`SconeRadioGroup`、`SconeNumberInput`、`SconeSlider`、`SconeDatePicker`、`SconeUpload`。
- Layout primitives：`SconeStack`、`SconeInline`、`SconeCompact`、`SconeToolbar`、`SconeSplitPane`、`SconeSeparator`、`SconeScrollArea`。
- Data display：`SconeDescriptions`、`SconeTable`、`SconeCard`、`SconeTag`、`SconeBadge`、`SconeList`、`SconeStatistic`、`SconeTimeline`。
- Navigation and media：`SconeBreadcrumb`、`SconePagination`、`SconeTabs`、`SconeSegmented`、`SconeTree`、`SconeDropdown`、`SconeMenu`、`SconeTooltip`、`SconeCommand`、`SconeAccordion`、`SconeCollapsible`、`SconeImage`、`SconeAvatar`。
- Feedback：`SconeDrawer`、`SconeDialog`、`SconeConfirm`、`SconeAlert`、`SconeEmpty`、`SconeLoading`、`SconeProgress`、`SconeToastProvider`、`toast`、`SconeNotificationProvider`、`notification`。
- Admin Pattern exports：`Page`、`Section`、`DataTable` compound parts。
- Recipes：DrawerForm、ConfirmationFlow、Popover、Logo、Result、Dashboard Metric、Grid。

## Pending Implementation Work

后续实现阶段至少需要完成：

1. 创建 DESIGN 指定的 `src/` 目录结构、公共入口和组件族类型入口。
2. 按 `docs/10-specs/COMPONENT-SELECTION.md` 的 source strategy 实现 wrapper、vendored primitive、custom component、pattern-only 和 docs-only 边界。
3. 创建 `src/styles/theme.css`，并维护默认 `tailwind.config.ts` 到 CSS variables 的映射。
4. 实现组件族和 Pattern；Recipe 全部保持文档和示例边界，不创建 `src/recipes/` 源码入口。
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

## Known Design Review Questions

当前无影响实现结构或公共 API 的未决问题。

## Current Status

设计覆盖：完成。

实现覆盖：未开始。

测试覆盖：未开始。
