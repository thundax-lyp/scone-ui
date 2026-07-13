# Implementation Coverage

## Purpose

本文档记录 `docs/30-designs/DESIGN-ADMIN-UI.md` 对 admin-ui SPEC 的设计覆盖状态。

当前状态是设计覆盖记录，不是实现完成证据：

- 不声明 `src/` 代码已经创建。
- 不声明组件、Pattern、Recipe 或测试已经实现。
- 不替代后续实现任务中的测试结果、构建结果或发布准备记录。

## Source Documents

- `docs/30-designs/DESIGN-ADMIN-UI.md`
- `docs/10-specs/COMPONENT-SELECTION.md`
- `docs/10-specs/ADMIN-UI-SPEC.md`
- `docs/10-specs/FOUNDATIONS-SPEC.md`
- `docs/10-specs/ADMIN-PATTERNS-SPEC.md`

## Design Coverage Summary

| 覆盖对象 | 设计状态 | 依据 |
| --- | --- | --- |
| Foundation/theme | 已完成设计 | `DESIGN-ADMIN-UI.md` 的 Theme And Foundation Design |
| Type/data structure | 已完成设计 | `DESIGN-ADMIN-UI.md` 的 Type And Data Structure Design |
| Public export surface | 已完成设计 | `DESIGN-ADMIN-UI.md` 的 Export Surface Design 和 Coverage Matrix |
| Form components | 已完成设计 | `DESIGN-ADMIN-UI.md` 的 Component Family Designs / Form |
| Data display components | 已完成设计 | `DESIGN-ADMIN-UI.md` 的 Component Family Designs / Data Display |
| Layout primitives | 已完成设计 | `DESIGN-ADMIN-UI.md` 的 Component Family Designs / Layout |
| Feedback and overlay components | 已完成设计 | `DESIGN-ADMIN-UI.md` 的 Component Family Designs / Feedback And Overlay |
| Navigation components | 已完成设计 | `DESIGN-ADMIN-UI.md` 的 Component Family Designs / Navigation |
| Media components | 已完成设计 | `DESIGN-ADMIN-UI.md` 的 Component Family Designs / Media |
| Admin patterns | 已完成设计 | `DESIGN-ADMIN-UI.md` 的 Admin Pattern Designs |
| Recipes | 已完成设计 | `DESIGN-ADMIN-UI.md` 的 Recipe Designs |
| Verification strategy | 已完成设计 | `DESIGN-ADMIN-UI.md` 的 Verification Design |
| Design self review and traceability | 已完成设计 | `DESIGN-ADMIN-UI.md` 的 DESIGN Self Review 和 Decision Traceability |

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

1. 创建 DESIGN 指定的 `src/` 目录结构、公共入口和类型入口。
2. 按 `docs/10-specs/COMPONENT-SELECTION.md` 的 source strategy 实现 wrapper、vendored primitive、custom component、pattern-only 和 docs-only 边界。
3. 创建 `src/styles/theme.css`，并确认 Tailwind theme 映射是否需要新增 `tailwind.config.ts`。
4. 实现组件族、Pattern 和允许源码化的 Recipe；docs-only Recipe 不应导出新的正式 `Scone*` API。
5. 按 DESIGN 的 Verification Design 创建测试和静态检查，生成真正的实现覆盖证据。
6. 在实现后更新本 readiness 文档，区分已实现、已测试、未覆盖和延期项。

## Verification Plan

后续验证应至少覆盖：

- Foundation/theme：CSS variables 是唯一数值源，Tailwind 只映射变量。
- Public exports：`src/index.ts` 与 Export Groups 一致，docs-only Recipe 不导出。
- Accessibility：label、description、message、ARIA、keyboard、focus trap、focus restore。
- State semantics：loading、empty、error、disabled、readOnly、invalid、selected、expanded 的归属和优先级。
- Composition boundaries：Pattern 不发起请求、不判断权限、不承载产品流程。
- Recipe boundaries：Recipe 可复制组合，且不创建未批准的正式 `Scone*` API。
- Custom interactions：Tree、SplitPane、NumberInput、DatePicker、Upload、Timeline 的键盘和边界条件。

## Known Design Review Questions

以下问题仍需在实现前或实现初期确认：

- Pattern 导出命名使用 `Page`/`Section` 命名空间，还是使用 `SconePage`/`SconeSection`。
- 是否新增 `tailwind.config.ts` 作为必要目标文件。
- 公共类型集中在 `src/types/foundation.ts`，还是按组件族拆分后汇总导出。
- Toast 和 Notification service API 是否返回稳定 id，以及是否提供 `dismiss(id)`、`update(id, options)`。
- DataTable 是否引入 TanStack Table 作为推荐但非强制 recipe 基座。
- `src/recipes/` 是否存在源码示例目录，还是全部 Recipe 保持文档和示例边界。
- 测试文件采用同目录、`__tests__/`，还是集中 `tests/`。

## Current Status

设计覆盖：完成。

实现覆盖：未开始。

测试覆盖：未开始。
