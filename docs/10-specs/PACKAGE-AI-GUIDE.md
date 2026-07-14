# Package AI Guide

## Purpose

本文档用于随 `scone-ui` 安装包发布，引导 AI、IDE 和调用方理解公共组件、导入方式、props 权威来源和禁止使用的内部边界。

适用对象：

- 使用 `scone-ui` 的产品仓库。
- 生成 `scone-ui` 示例代码、迁移代码或 wrapper 的 AI。
- 需要快速查找公共组件和 props 类型的开发者。

## Package Contract

发布包必须把 TypeScript declaration 作为第一层机器可读 API，并把本文档随包发布：

```json
{
    "exports": {
        ".": {
            "types": "./dist/index.d.ts",
            "import": "./dist/index.js"
        }
    },
    "types": "./dist/index.d.ts"
}
```

发布包内 AI 不应依赖 `docs/30-designs/*`。设计文档是仓库内部设计证据，不是安装包 API 文档。

AI 生成代码时必须优先从包入口导入：

```ts
import { SconeButton, SconeForm, SconeTable } from "scone-ui";
import type { SconeButtonProps, SconeTableProps } from "scone-ui";
```

禁止从源码目录或 shadcn primitive 导入：

```ts
import { Button } from "scone-ui/components/ui/button";
import { Button } from "@/components/ui/button";
```

## Public Import Rules

- 公共组件统一使用 `Scone*` 前缀，例如 `SconeButton`、`SconeTable`、`SconeDrawer`。
- Admin Pattern 使用无 `Scone` 前缀的命名空间对象：`AppShell`、`Page`、`Section`、`FilterBar`、`DataTable`。
- 服务型反馈 API 使用 provider + service：`SconeToastProvider` / `toast`、`SconeNotificationProvider` / `notification`。
- `src/components/ui/*` 是内部 shadcn/Radix primitive，不是公共 API。
- Recipe 是 docs-only 组合说明，不导出 `SconeDrawerForm`、`SconePopover`、`SconeLogo`、`SconeResult`、`SconeGrid` 等 wrapper。
- 不确定 props 字段时，读取安装包 `.d.ts` 和本文档链接的包内 SPEC；不要猜测 Ant Design、shadcn 或 HTML 原生 API。

## Props Authority

props 的权威优先级：

1. 当前安装包的 `dist/index.d.ts`。
2. 包内单组件 SPEC 文件中的 `Prop` 表。
3. 包内 [`FOUNDATIONS-SPEC.md`](./FOUNDATIONS-SPEC.md) 中的共享类型定义。
4. 仓库源码开发模式下的 `src/index.ts` 和同目录测试。

当 SPEC 与已安装包版本不一致时，以安装包 `.d.ts` 为准；当准备修改本仓库时，以源码和同目录测试为准。发布包内不包含设计文档时，不应回退到设计文档猜测 API。

## Shared Types

共享类型来自包内 [`FOUNDATIONS-SPEC.md`](./FOUNDATIONS-SPEC.md) 和公共入口：

| 类型                 | 用途                                                         |
| -------------------- | ------------------------------------------------------------ |
| `Key`                | 行、树、菜单、时间线等稳定 key。                             |
| `SconeTone`          | `neutral`、`info`、`success`、`warning`、`danger` 等语义色。 |
| `SconeStatus`        | `idle`、`active`、`success`、`error` 等状态。                |
| `SconeControlSize`   | `sm`、`md`、`lg` 控件尺寸。                                  |
| `SconeDensity`       | `compact`、`default`、`comfortable` 密度。                   |
| `SconeSpacingToken`  | `none`、`xs`、`sm`、`md`、`lg`、`xl` 间距。                  |
| `SconeOption`        | Select、Combobox、RadioGroup 等选项。                        |
| `SconeRowSelection`  | DataTable 选择状态。                                         |
| `OverlayCloseReason` | Dialog、Drawer、Confirm close reason。                       |

## Component Registry

本表是 AI 选择组件和定位 props 的入口。具体字段读取对应包内 SPEC 的 `Prop` 表和公共 props type；如果包内未发布单组件 SPEC，则读取 `dist/index.d.ts`。

### Form

| 公共导出             | Props / Types                                                                                                                                             | SPEC                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `SconeButton`        | `SconeButtonProps`                                                                                                                                        | [`SCONE-BUTTON.md`](./components/form/SCONE-BUTTON.md)                 |
| `SconeInput`         | `SconeInputProps`                                                                                                                                         | [`SCONE-INPUT.md`](./components/form/SCONE-INPUT.md)                   |
| `SconeSearchInput`   | `SconeSearchInputProps`                                                                                                                                   | [`SCONE-SEARCH-INPUT.md`](./components/form/SCONE-SEARCH-INPUT.md)     |
| `SconePasswordInput` | `SconePasswordInputProps`                                                                                                                                 | [`SCONE-PASSWORD-INPUT.md`](./components/form/SCONE-PASSWORD-INPUT.md) |
| `SconeTextArea`      | `SconeTextAreaProps`                                                                                                                                      | [`SCONE-TEXTAREA.md`](./components/form/SCONE-TEXTAREA.md)             |
| `SconeSelect`        | `SconeSelectProps`、`SconeOption`                                                                                                                         | [`SCONE-SELECT.md`](./components/form/SCONE-SELECT.md)                 |
| `SconeForm`          | `SconeFormProps`、`SconeFormContextValue`                                                                                                                 | [`SCONE-FORM.md`](./components/form/SCONE-FORM.md)                     |
| `SconeField`         | `SconeFieldRootProps`、`SconeFieldLabelProps`、`SconeFieldDescriptionProps`、`SconeFieldMessageProps`、`SconeFieldControlProps`、`SconeFieldContextValue` | [`SCONE-FIELD.md`](./components/form/SCONE-FIELD.md)                   |
| `SconeFieldGroup`    | `SconeFieldGroupProps`                                                                                                                                    | [`SCONE-FIELD-GROUP.md`](./components/form/SCONE-FIELD-GROUP.md)       |
| `SconeFormSection`   | `SconeFormSectionProps`                                                                                                                                   | [`SCONE-FORM-SECTION.md`](./components/form/SCONE-FORM-SECTION.md)     |
| `SconeFormActions`   | `SconeFormActionsProps`                                                                                                                                   | [`SCONE-FORM-ACTIONS.md`](./components/form/SCONE-FORM-ACTIONS.md)     |
| `SconeCombobox`      | `SconeComboboxProps`、`SconeOption`                                                                                                                       | [`SCONE-COMBOBOX.md`](./components/form/SCONE-COMBOBOX.md)             |
| `SconeSwitch`        | `SconeSwitchProps`                                                                                                                                        | [`SCONE-SWITCH.md`](./components/form/SCONE-SWITCH.md)                 |
| `SconeCheckbox`      | `SconeCheckboxProps`                                                                                                                                      | [`SCONE-CHECKBOX.md`](./components/form/SCONE-CHECKBOX.md)             |
| `SconeRadioGroup`    | `SconeRadioGroupProps`、`SconeOption`                                                                                                                     | [`SCONE-RADIO-GROUP.md`](./components/form/SCONE-RADIO-GROUP.md)       |
| `SconeNumberInput`   | `SconeNumberInputProps`                                                                                                                                   | [`SCONE-NUMBER-INPUT.md`](./components/form/SCONE-NUMBER-INPUT.md)     |
| `SconeSlider`        | `SconeSliderProps`                                                                                                                                        | [`SCONE-SLIDER.md`](./components/form/SCONE-SLIDER.md)                 |
| `SconeDatePicker`    | `SconeDatePickerProps`                                                                                                                                    | [`SCONE-DATE-PICKER.md`](./components/form/SCONE-DATE-PICKER.md)       |
| `SconeUpload`        | `SconeUploadProps`、`SconeUploadRejection`                                                                                                                | [`SCONE-UPLOAD.md`](./components/form/SCONE-UPLOAD.md)                 |

### Data Display

| 公共导出            | Props / Types                                                                                                           | SPEC                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `SconeTypography`   | `SconeTypographyProps`、`SconeTypographyElement`、`SconeTypographySize`、`SconeTypographyWeight`、`SconeTypographyTone` | [`SCONE-TYPOGRAPHY.md`](./components/data-display/SCONE-TYPOGRAPHY.md)     |
| `SconeText`         | `SconeTextProps`                                                                                                        | [`SCONE-TYPOGRAPHY.md`](./components/data-display/SCONE-TYPOGRAPHY.md)     |
| `SconeTitle`        | `SconeTitleProps`                                                                                                       | [`SCONE-TYPOGRAPHY.md`](./components/data-display/SCONE-TYPOGRAPHY.md)     |
| `SconeParagraph`    | `SconeParagraphProps`                                                                                                   | [`SCONE-TYPOGRAPHY.md`](./components/data-display/SCONE-TYPOGRAPHY.md)     |
| `SconeDescriptions` | `SconeDescriptionsProps`、`SconeDescriptionItem`                                                                        | [`SCONE-DESCRIPTIONS.md`](./components/data-display/SCONE-DESCRIPTIONS.md) |
| `SconeTable`        | `SconeTableProps`、`SconeTableColumn`、`SconeTableScroll`                                                               | [`SCONE-TABLE.md`](./components/data-display/SCONE-TABLE.md)               |
| `SconeCard`         | `SconeCardProps`                                                                                                        | [`SCONE-CARD.md`](./components/data-display/SCONE-CARD.md)                 |
| `SconeTag`          | `SconeTagProps`                                                                                                         | [`SCONE-TAG.md`](./components/data-display/SCONE-TAG.md)                   |
| `SconeBadge`        | `SconeBadgeProps`                                                                                                       | [`SCONE-BADGE.md`](./components/data-display/SCONE-BADGE.md)               |
| `SconeList`         | `SconeListProps`                                                                                                        | [`SCONE-LIST.md`](./components/data-display/SCONE-LIST.md)                 |
| `SconeStatistic`    | `SconeStatisticProps`                                                                                                   | [`SCONE-STATISTIC.md`](./components/data-display/SCONE-STATISTIC.md)       |
| `SconeTimeline`     | `SconeTimelineProps`、`SconeTimelineItem`                                                                               | [`SCONE-TIMELINE.md`](./components/data-display/SCONE-TIMELINE.md)         |

### Layout

| 公共导出          | Props / Types                                     | SPEC                                                               |
| ----------------- | ------------------------------------------------- | ------------------------------------------------------------------ |
| `SconeStack`      | `SconeStackProps`                                 | [`SCONE-STACK.md`](./components/layout/SCONE-STACK.md)             |
| `SconeInline`     | `SconeInlineProps`                                | [`SCONE-INLINE.md`](./components/layout/SCONE-INLINE.md)           |
| `SconeCompact`    | `SconeCompactProps`                               | [`SCONE-COMPACT.md`](./components/layout/SCONE-COMPACT.md)         |
| `SconeToolbar`    | `SconeToolbarProps`                               | [`SCONE-TOOLBAR.md`](./components/layout/SCONE-TOOLBAR.md)         |
| `SconeSplitPane`  | `SconeSplitPaneProps`、`SconeSplitPaneSizePreset` | [`SCONE-SPLIT-PANE.md`](./components/layout/SCONE-SPLIT-PANE.md)   |
| `SconeSeparator`  | `SconeSeparatorProps`                             | [`SCONE-SEPARATOR.md`](./components/layout/SCONE-SEPARATOR.md)     |
| `SconeScrollArea` | `SconeScrollAreaProps`                            | [`SCONE-SCROLL-AREA.md`](./components/layout/SCONE-SCROLL-AREA.md) |

### Feedback And Overlay

| 公共导出                                    | Props / Types                                                                                                                                               | SPEC                                                                           |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `SconeDrawer`                               | `SconeDrawerProps`、`OverlayCloseReason`                                                                                                                    | [`SCONE-DRAWER.md`](./components/feedback-overlay/SCONE-DRAWER.md)             |
| `SconeDialog`                               | `SconeDialogProps`、`OverlayCloseReason`                                                                                                                    | [`SCONE-DIALOG.md`](./components/feedback-overlay/SCONE-DIALOG.md)             |
| `SconeConfirm`                              | `SconeConfirmProps`                                                                                                                                         | [`SCONE-CONFIRM.md`](./components/feedback-overlay/SCONE-CONFIRM.md)           |
| `SconeAlert`                                | `SconeAlertProps`                                                                                                                                           | [`SCONE-ALERT.md`](./components/feedback-overlay/SCONE-ALERT.md)               |
| `SconeEmpty`                                | `SconeEmptyProps`                                                                                                                                           | [`SCONE-EMPTY.md`](./components/feedback-overlay/SCONE-EMPTY.md)               |
| `SconeLoading`                              | `SconeLoadingProps`                                                                                                                                         | [`SCONE-LOADING.md`](./components/feedback-overlay/SCONE-LOADING.md)           |
| `SconeProgress`                             | `SconeProgressProps`                                                                                                                                        | [`SCONE-PROGRESS.md`](./components/feedback-overlay/SCONE-PROGRESS.md)         |
| `SconeToastProvider`、`toast`               | `SconeToastProviderProps`、`SconeToastItem`、`ToastOptions`、`ToastPosition`、`ToastCloseReason`、`ToastService`                                            | [`SCONE-TOAST.md`](./components/feedback-overlay/SCONE-TOAST.md)               |
| `SconeNotificationProvider`、`notification` | `SconeNotificationProviderProps`、`SconeNotificationItem`、`NotificationOptions`、`NotificationPlacement`、`NotificationCloseReason`、`NotificationService` | [`SCONE-NOTIFICATION.md`](./components/feedback-overlay/SCONE-NOTIFICATION.md) |

### Navigation

| 公共导出           | Props / Types                                                                                                | SPEC                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `SconeBreadcrumb`  | `SconeBreadcrumbProps`、`SconeBreadcrumbItem`                                                                | [`SCONE-BREADCRUMB.md`](./components/navigation/SCONE-BREADCRUMB.md)   |
| `SconePagination`  | `SconePaginationProps`、`SconePaginationState`、`SconePaginationChangeReason`                                | [`SCONE-PAGINATION.md`](./components/navigation/SCONE-PAGINATION.md)   |
| `SconeTabs`        | `SconeTabsProps`、`SconeTabsItem`、`SconeTabsListProps`、`SconeTabsTriggerProps`、`SconeTabsContentProps`    | [`SCONE-TABS.md`](./components/navigation/SCONE-TABS.md)               |
| `SconeSegmented`   | `SconeSegmentedProps`                                                                                        | [`SCONE-SEGMENTED.md`](./components/navigation/SCONE-SEGMENTED.md)     |
| `SconeTree`        | `SconeTreeProps`、`SconeTreeNode`、`SconeTreeSelectInfo`、`SconeTreeExpandInfo`、`SconeTreeCheckInfo`        | [`SCONE-TREE.md`](./components/navigation/SCONE-TREE.md)               |
| `SconeDropdown`    | `SconeDropdownProps`、`SconeDropdownItem`、`SconeDropdownLabel`、`SconeDropdownSeparator`、`SconeActionItem` | [`SCONE-DROPDOWN.md`](./components/navigation/SCONE-DROPDOWN.md)       |
| `SconeMenu`        | `SconeMenuProps`、`SconeNavigationItem`                                                                      | [`SCONE-MENU.md`](./components/navigation/SCONE-MENU.md)               |
| `SconeTooltip`     | `SconeTooltipProps`                                                                                          | [`SCONE-TOOLTIP.md`](./components/navigation/SCONE-TOOLTIP.md)         |
| `SconeCommand`     | `SconeCommandProps`、`SconeCommandItem`                                                                      | [`SCONE-COMMAND.md`](./components/navigation/SCONE-COMMAND.md)         |
| `SconeAccordion`   | `SconeAccordionProps`、`SconeAccordionItem`                                                                  | [`SCONE-ACCORDION.md`](./components/navigation/SCONE-ACCORDION.md)     |
| `SconeCollapsible` | `SconeCollapsibleProps`                                                                                      | [`SCONE-COLLAPSIBLE.md`](./components/navigation/SCONE-COLLAPSIBLE.md) |

### Media

| 公共导出      | Props / Types      | SPEC                                                    |
| ------------- | ------------------ | ------------------------------------------------------- |
| `SconeImage`  | `SconeImageProps`  | [`SCONE-IMAGE.md`](./components/media/SCONE-IMAGE.md)   |
| `SconeAvatar` | `SconeAvatarProps` | [`SCONE-AVATAR.md`](./components/media/SCONE-AVATAR.md) |

### Admin Patterns

| 公共导出    | Parts / Types                                                                                                                                                                                                                                                 | SPEC                                        |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `AppShell`  | `Root`、`Sidebar`、`Header`、`Main`、`Aside`; `AppShellRootProps`、`AppShellSidebarProps`、`AppShellHeaderProps`、`AppShellMainProps`、`AppShellAsideProps`                                                                                                   | [`APP-SHELL.md`](./patterns/APP-SHELL.md)   |
| `Page`      | `Root`、`Header`、`Main`、`Content`、`StickyActions`; `PageRootProps`、`PageHeaderProps`、`PageMainProps`、`PageContentProps`、`PageStickyActionsProps`                                                                                                       | [`PAGE.md`](./patterns/PAGE.md)             |
| `Section`   | `Root`、`Header`、`Title`、`Description`、`Actions`、`Content`、`Footer`; `SectionRootProps`、`SectionHeaderProps`、`SectionTitleProps`、`SectionDescriptionProps`、`SectionActionsProps`、`SectionContentProps`、`SectionFooterProps`                        | [`SECTION.md`](./patterns/SECTION.md)       |
| `FilterBar` | `Root`、`Search`、`Fields`、`Actions`、`Summary`; `FilterBarRootProps`、`FilterBarSearchProps`、`FilterBarFieldsProps`、`FilterBarActionsProps`、`FilterBarSummaryProps`、`FilterBarFilters`、`FilterBarState`                                                | [`FILTER-BAR.md`](./patterns/FILTER-BAR.md) |
| `DataTable` | `Root`、`FilterBar`、`Toolbar`、`BulkActions`、`TableRegion`、`Pagination`; `DataTableRootProps`、`DataTableFilterBarProps`、`DataTableToolbarProps`、`DataTableBulkActionsProps`、`DataTableTableRegionProps`、`DataTablePaginationProps`、`DataTableAction` | [`DATA-TABLE.md`](./patterns/DATA-TABLE.md) |

## AI Generation Rules

AI 生成 `scone-ui` 代码时必须遵守：

1. 优先选择 `Scone*` 公共组件，不直接使用 shadcn primitive。
2. 只从 `"scone-ui"` 包入口导入组件和类型。
3. wrapper 类型使用公共 `Scone*Props`，不要重新声明不完整 props。
4. 表格管理页优先使用 `DataTable` Pattern；基础行列展示才使用 `SconeTable`。
5. 长表单编辑优先使用 `SconeDrawer` 或 FormPage recipe；不要把复杂长表单塞进 Dialog。
6. 错误提示使用 `SconeAlert`，空状态使用 `SconeEmpty`，未知时长等待使用 `SconeLoading`，可量化进度使用 `SconeProgress`。
7. 组件不应承担请求、权限、路由、业务字段规则或产品文案。
8. Recipe 只能按文档组合现有组件，不创造新的 `Scone*` API。

## Prompt Block

给 AI 的最小上下文可以直接使用以下文本：

```text
Use scone-ui public APIs only.
Import components and types from "scone-ui".
Public components are Scone-prefixed, for example SconeButton, SconeForm, SconeTable, SconeDrawer.
Admin Patterns are AppShell, Page, Section, FilterBar, and DataTable.
Do not import from src/components/ui, @/components/ui, or shadcn/ui primitives.
Use Scone*Props public types for wrappers.
For exact props, read the installed dist/index.d.ts or the package-shipped docs/10-specs/PACKAGE-AI-GUIDE.md and linked component SPEC files.
Do not depend on docs/30-designs; design documents are not part of the package API.
```
