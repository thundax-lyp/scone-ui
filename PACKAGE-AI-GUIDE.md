# Package AI Guide

本文档随 `scone-ui` npm 包发布，面向 AI、IDE Agent 和调用方。它必须能在只安装发布包、无法访问仓库设计文档的情况下独立使用。

`scone-ui` 是 React + Tailwind CSS 的后台 UI 组件库。生成代码时，把它当作“可复用组件包”，不要把它当作产品应用框架、路由框架、请求层或业务规则来源。

## Read This First

AI 生成或修改调用方代码时按此顺序读取：

1. `scone-ui/dist/index.d.ts`：当前安装版本的唯一类型权威。
2. `scone-ui/PACKAGE-AI-GUIDE.md`：组件选择、导入边界和生成规则。
3. `scone-ui/docs/10-specs/FOUNDATIONS-SPEC.md`：共享类型、状态、尺寸、密度、可访问性词汇。
4. `scone-ui/docs/10-specs/COMPONENT-*.md` 和 `ADMIN-PATTERNS-SPEC.md`：补充语义和组合规则。

如果文档与 `dist/index.d.ts` 冲突，以 `dist/index.d.ts` 为准。设计文档、runbook、TODO 和源码路径不是发布包 API。

## Install And Use

调用方必须安装 peer/runtime 依赖并引入样式：

```tsx
import "scone-ui/styles.css";

import { SconeButton, SconeForm, SconeInput } from "scone-ui";
import type { SconeButtonProps, SconeInputProps } from "scone-ui";
```

只从包入口导入公共组件和类型：

```tsx
import { SconeButton, SconeTable, SconeDrawer, DataTable } from "scone-ui";
import type { SconeTableColumn, SconeDrawerProps } from "scone-ui";
```

禁止导入源码、内部 primitive 或 shadcn 路径：

```tsx
import { Button } from "scone-ui/components/ui/button";
import { Button } from "@/components/ui/button";
import { Button } from "shadcn/ui";
```

## Public API Shape

- `Scone*`：公共基础组件，例如 `SconeButton`、`SconeSelect`、`SconeTable`。
- `AppShell`、`Page`、`Section`、`FilterBar`、`DataTable`：后台页面 Pattern，使用命名空间对象，例如 `Page.Root`、`DataTable.TableRegion`。
- `toast` / `notification`：服务型反馈 API，必须配套 `SconeToastProvider` / `SconeNotificationProvider`。
- `cn`、`composeRefs`、`useControllableState`、ARIA helpers：公共工具，只在 wrapper 或库内组合需要时使用。

内部边界：

- `components/ui/*` 是内部 shadcn/Radix primitive，不是公共 API。
- 不要暴露、导入或包装内部 `Button`、`Dialog`、`SelectTrigger` 等 primitive。
- Recipe 不是导出组件。不要生成 `SconeDrawerForm`、`SconePopover`、`SconeLogo`、`SconeResult`、`SconeGrid` 这类不存在的公共 API。

## Component Selection

优先选择能表达语义的组件，而不是拼装低层元素。

| 需求                         | 首选 API                                                                             | 不要优先使用                   |
| ---------------------------- | ------------------------------------------------------------------------------------ | ------------------------------ |
| 普通按钮、提交按钮、加载按钮 | `SconeButton`                                                                        | shadcn `Button`、原生 `button` |
| 文本、数字、密码、搜索输入   | `SconeInput`、`SconeNumberInput`、`SconePasswordInput`、`SconeSearchInput`           | 自己拼 input + icon            |
| 下拉、组合搜索、单选、多选   | `SconeSelect`、`SconeCombobox`、`SconeRadioGroup`、`SconeCheckbox`                   | 直接使用 Radix primitive       |
| 表单布局                     | `SconeForm`、`SconeField`、`SconeFieldGroup`、`SconeFormSection`、`SconeFormActions` | 自定义 label/error 结构        |
| 基础数据展示表               | `SconeTable`                                                                         | `DataTable`                    |
| 管理页数据表、筛选、批量操作 | `DataTable` Pattern                                                                  | 只用 `SconeTable` 再手写工具栏 |
| 页面骨架                     | `AppShell`、`Page`、`Section`                                                        | 产品仓库自造布局协议           |
| 筛选区域                     | `FilterBar` Pattern                                                                  | 临时 div + input + button      |
| 详情字段列表                 | `SconeDescriptions`                                                                  | 手写 `dl` 样式                 |
| 弹窗确认                     | `SconeConfirm`                                                                       | 手写 dialog                    |
| 长表单编辑                   | `SconeDrawer` + form components                                                      | 把复杂长表单塞进 `SconeDialog` |
| 空、错、加载、进度           | `SconeEmpty`、`SconeAlert`、`SconeLoading`、`SconeProgress`                          | 自定义状态容器                 |
| 全局提示                     | `toast`、`notification`                                                              | 业务仓库自造全局消息服务       |

## Props Rules

具体字段以 `dist/index.d.ts` 为准。AI 不确定时必须读取公共 props type，不要猜 Ant Design、shadcn、HTML 或 Radix 的字段。

常见公共 props 约定：

| 类型/字段                | 约定                                                                                   |
| ------------------------ | -------------------------------------------------------------------------------------- |
| `size`                   | 控件尺寸通常是 `SconeControlSize`，可用值为 `sm`、`md`、`lg`。                         |
| `density`                | 数据展示密度通常是 `SconeDensity`，可用值为 `compact`、`default`、`comfortable`。      |
| `tone`                   | 语义色通常是 `SconeTone`，可用值为 `neutral`、`info`、`success`、`warning`、`danger`。 |
| `value` / `defaultValue` | 受控/非受控值。不要同时依赖二者作为单一真相。                                          |
| `onValueChange`          | 组件值变化回调。不要猜成 `onChange`，除非 `.d.ts` 明确写出。                           |
| `ariaLabel`              | 包装组件提供的人类可读标签字段，内部映射到 `aria-label`。                              |
| `invalid` / `readOnly`   | 组件级状态字段，会与表单上下文合并。                                                   |
| `className`              | 作用在公共组件 root。不要依赖内部 DOM 结构选择器。                                     |
| `children`               | 只在 `.d.ts` 或文档语义允许时传入。数据驱动组件优先使用 `items`/`options`。            |

当需要封装组件：

```tsx
import { SconeButton } from "scone-ui";
import type { SconeButtonProps } from "scone-ui";

export function SaveButton(props: SconeButtonProps) {
    return <SconeButton type="submit" {...props} />;
}
```

不要重新声明不完整 props：

```tsx
type SaveButtonProps = {
    children: string;
    onClick: () => void;
};
```

## Public Exports

### Form

Components: `SconeButton`, `SconeCheckbox`, `SconeCombobox`, `SconeDatePicker`, `SconeField`, `SconeFieldGroup`, `SconeForm`, `SconeFormActions`, `SconeFormSection`, `SconeInput`, `SconeNumberInput`, `SconePasswordInput`, `SconeRadioGroup`, `SconeSearchInput`, `SconeSelect`, `SconeSlider`, `SconeSwitch`, `SconeTextArea`, `SconeUpload`.

Hooks: `useSconeFieldContext`, `useSconeFormContext`.

Types: `SconeButtonProps`, `SconeCheckboxProps`, `SconeComboboxProps`, `SconeDatePickerProps`, `SconeFieldContextValue`, `SconeFieldControlProps`, `SconeFieldDescriptionProps`, `SconeFieldGroupProps`, `SconeFieldLabelProps`, `SconeFieldMessageProps`, `SconeFieldRootProps`, `SconeFormActionsProps`, `SconeFormContextValue`, `SconeFormProps`, `SconeFormSectionProps`, `SconeInputProps`, `SconeNumberInputProps`, `SconePasswordInputProps`, `SconeRadioGroupProps`, `SconeSearchInputProps`, `SconeSelectProps`, `SconeSliderProps`, `SconeSwitchProps`, `SconeTextAreaProps`, `SconeUploadProps`, `SconeUploadRejection`.

Supplement: [`docs/10-specs/COMPONENT-SPEC-FORM.md`](./docs/10-specs/COMPONENT-SPEC-FORM.md).

### Data Display

Components: `SconeBadge`, `SconeCard`, `SconeDescriptions`, `SconeList`, `SconeParagraph`, `SconeStatistic`, `SconeTable`, `SconeTag`, `SconeText`, `SconeTimeline`, `SconeTitle`, `SconeTypography`.

Types: `SconeBadgeProps`, `SconeCardProps`, `SconeDescriptionItem`, `SconeDescriptionsProps`, `SconeListProps`, `SconeParagraphProps`, `SconeStatisticProps`, `SconeTableColumn`, `SconeTableProps`, `SconeTableScroll`, `SconeTagProps`, `SconeTextProps`, `SconeTimelineItem`, `SconeTimelineProps`, `SconeTitleProps`, `SconeTypographyElement`, `SconeTypographyProps`, `SconeTypographySize`, `SconeTypographyTone`, `SconeTypographyWeight`.

Supplement: [`docs/10-specs/COMPONENT-SPEC-DATA-DISPLAY.md`](./docs/10-specs/COMPONENT-SPEC-DATA-DISPLAY.md).

### Layout

Components: `SconeCompact`, `SconeInline`, `SconeScrollArea`, `SconeSeparator`, `SconeSplitPane`, `SconeStack`, `SconeToolbar`.

Types: `SconeCompactProps`, `SconeInlineProps`, `SconeScrollAreaProps`, `SconeSeparatorProps`, `SconeSplitPaneProps`, `SconeSplitPaneSizePreset`, `SconeStackProps`, `SconeToolbarProps`.

Supplement: [`docs/10-specs/COMPONENT-SPEC-LAYOUT.md`](./docs/10-specs/COMPONENT-SPEC-LAYOUT.md).

### Feedback And Overlay

Components and services: `SconeAlert`, `SconeConfirm`, `SconeDialog`, `SconeDrawer`, `SconeEmpty`, `SconeLoading`, `SconeNotificationProvider`, `SconeProgress`, `SconeToastProvider`, `notification`, `toast`.

Types: `NotificationCloseReason`, `NotificationOptions`, `NotificationPlacement`, `NotificationService`, `SconeAlertProps`, `SconeConfirmProps`, `SconeDialogProps`, `SconeDrawerProps`, `SconeEmptyProps`, `SconeLoadingProps`, `SconeNotificationItem`, `SconeNotificationProviderProps`, `SconeProgressProps`, `SconeToastItem`, `SconeToastProviderProps`, `ToastCloseReason`, `ToastOptions`, `ToastPosition`, `ToastService`.

Supplement: [`docs/10-specs/COMPONENT-SPEC-FEEDBACK-OVERLAY.md`](./docs/10-specs/COMPONENT-SPEC-FEEDBACK-OVERLAY.md).

### Navigation And Media

Navigation components: `SconeAccordion`, `SconeBreadcrumb`, `SconeCollapsible`, `SconeCommand`, `SconeDropdown`, `SconeDropdownItem`, `SconeDropdownLabel`, `SconeDropdownSeparator`, `SconeMenu`, `SconePagination`, `SconeSegmented`, `SconeTabs`, `SconeTooltip`, `SconeTree`.

Media components: `SconeAvatar`, `SconeImage`.

Types: `SconeAccordionItem`, `SconeAccordionProps`, `SconeActionItem`, `SconeAvatarProps`, `SconeBreadcrumbItem`, `SconeBreadcrumbProps`, `SconeCollapsibleProps`, `SconeCommandItem`, `SconeCommandProps`, `SconeDropdownProps`, `SconeImageProps`, `SconeMenuProps`, `SconeNavigationItem`, `SconePaginationProps`, `SconeSegmentedProps`, `SconeTabsContentProps`, `SconeTabsItem`, `SconeTabsListProps`, `SconeTabsProps`, `SconeTabsTriggerProps`, `SconeTooltipProps`, `SconeTreeCheckInfo`, `SconeTreeExpandInfo`, `SconeTreeNode`, `SconeTreeProps`, `SconeTreeSelectInfo`.

Supplement: [`docs/10-specs/COMPONENT-SPEC-NAVIGATION-MEDIA.md`](./docs/10-specs/COMPONENT-SPEC-NAVIGATION-MEDIA.md).

### Admin Patterns

Pattern objects: `AppShell`, `DataTable`, `FilterBar`, `Page`, `Section`.

Types: `AppShellAsideProps`, `AppShellHeaderProps`, `AppShellMainProps`, `AppShellRootProps`, `AppShellSidebarProps`, `DataTableAction`, `DataTableBulkActionsProps`, `DataTableFilterBarProps`, `DataTablePaginationProps`, `DataTableRootProps`, `DataTableTableRegionProps`, `DataTableToolbarProps`, `FilterBarActionsProps`, `FilterBarFieldsProps`, `FilterBarFilters`, `FilterBarRootProps`, `FilterBarSearchProps`, `FilterBarState`, `FilterBarSummaryProps`, `PageContentProps`, `PageHeaderProps`, `PageMainProps`, `PageRootProps`, `PageStickyActionsProps`, `SectionActionsProps`, `SectionContentProps`, `SectionDescriptionProps`, `SectionFooterProps`, `SectionHeaderProps`, `SectionRootProps`, `SectionTitleProps`.

Supplement: [`docs/10-specs/ADMIN-PATTERNS-SPEC.md`](./docs/10-specs/ADMIN-PATTERNS-SPEC.md), [`docs/10-specs/patterns/DATA-TABLE.md`](./docs/10-specs/patterns/DATA-TABLE.md), [`docs/10-specs/patterns/FILTER-BAR.md`](./docs/10-specs/patterns/FILTER-BAR.md), [`docs/10-specs/patterns/PAGE.md`](./docs/10-specs/patterns/PAGE.md), [`docs/10-specs/patterns/SECTION.md`](./docs/10-specs/patterns/SECTION.md), [`docs/10-specs/patterns/APP-SHELL.md`](./docs/10-specs/patterns/APP-SHELL.md).

## Shared Types

Shared types are exported from `"scone-ui"` and documented in [`docs/10-specs/FOUNDATIONS-SPEC.md`](./docs/10-specs/FOUNDATIONS-SPEC.md).

| Type                          | Typical use                                     |
| ----------------------------- | ----------------------------------------------- |
| `Key`                         | Stable row, tree, menu, timeline, and list key. |
| `SconeTone`                   | Semantic visual tone.                           |
| `SconeStatus`                 | Generic status state.                           |
| `SconeControlSize`            | Form control size.                              |
| `SconeDensity`                | Data density.                                   |
| `SconeSpacingToken`           | Layout gap and spacing token.                   |
| `SconeOption<Value>`          | Select, Combobox, RadioGroup, Segmented option. |
| `SconeDescriptionItem`        | Descriptions item model.                        |
| `SconeTableColumn<T>`         | Basic table column model.                       |
| `SconeTableScroll`            | Basic table scroll model.                       |
| `SconeRowSelection<T>`        | DataTable row selection bridge.                 |
| `SconePaginationState`        | Pagination state bridge.                        |
| `SconePaginationChangeReason` | Pagination change reason.                       |
| `OverlayCloseReason`          | Dialog and Drawer close reason.                 |

## Code Examples

### Basic Form

```tsx
import { SconeButton, SconeField, SconeForm, SconeInput } from "scone-ui";

export function AccountForm() {
    return (
        <SconeForm onSubmit={(event) => event.preventDefault()}>
            <SconeField.Root name="email" required>
                <SconeField.Label>Email</SconeField.Label>
                <SconeField.Control>
                    <SconeInput type="email" ariaLabel="Email" />
                </SconeField.Control>
                <SconeField.Message />
            </SconeField.Root>
            <SconeButton type="submit">Save</SconeButton>
        </SconeForm>
    );
}
```

### Data Table Pattern

```tsx
import { DataTable } from "scone-ui";
import type { SconeTableColumn } from "scone-ui";

type User = { id: string; name: string; email: string };

const columns: Array<SconeTableColumn<User>> = [
    { key: "name", title: "Name", dataIndex: "name" },
    { key: "email", title: "Email", dataIndex: "email" },
];

export function UsersTable({ users }: { users: User[] }) {
    return (
        <DataTable.Root>
            <DataTable.Toolbar title="Users" />
            <DataTable.TableRegion columns={columns} dataSource={users} rowKey="id" />
        </DataTable.Root>
    );
}
```

### Feedback Service

```tsx
import { SconeToastProvider, SconeButton, toast } from "scone-ui";

export function SaveAction() {
    return (
        <SconeToastProvider>
            <SconeButton onClick={() => toast.success("Saved")}>Save</SconeButton>
        </SconeToastProvider>
    );
}
```

## Generation Rules

1. Import all public components, patterns, services, hooks, helpers, and types from `"scone-ui"`.
2. Import package CSS once from `"scone-ui/styles.css"` at the app root or library preview root.
3. Prefer `Scone*` components over raw HTML when a matching component exists.
4. Prefer Admin Patterns for backend pages: `AppShell`, `Page`, `Section`, `FilterBar`, `DataTable`.
5. Use public props types such as `SconeButtonProps` for wrappers.
6. Read `dist/index.d.ts` before inventing props, event names, enum values, or compound component parts.
7. Keep business data fetching, routing, permissions, mutations, validation schema, and product copy outside `scone-ui`.
8. Do not use package-internal paths, source aliases, shadcn primitive paths, or undocumented subpath imports.
9. Do not create new exported `Scone*` names unless changing this package source and `src/index.ts`.
10. Treat docs under `docs/10-specs` as package guidance; do not depend on `docs/30-designs`, runbooks, TODO files, or PR notes.

## Minimal Prompt For Another AI

```text
Use scone-ui as an installed React component package.
Import CSS once: import "scone-ui/styles.css".
Import every component, pattern, service, hook, helper, and type from "scone-ui".
Public components are Scone-prefixed.
Admin Patterns are AppShell, Page, Section, FilterBar, and DataTable.
Use Scone*Props public types when wrapping components.
For exact props and event names, read scone-ui/dist/index.d.ts first.
Do not import from scone-ui/components/ui, src paths, @/components/ui, shadcn/ui, or undocumented subpaths.
Do not invent SconeDrawerForm, SconePopover, SconeLogo, SconeResult, SconeGrid, or other recipe names as public APIs.
Keep fetching, routing, permissions, validation schemas, and product-specific text in the consuming app.
```
