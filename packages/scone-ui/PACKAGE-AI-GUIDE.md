# scone-ui AI 使用指南

本文档随 `scone-ui` npm 包发布，是面向 AI、IDE Agent 和代码生成器的独立使用指南。它必须能在只安装发布包、无法访问仓库设计文档的情况下独立使用。

`scone-ui` 是 React + Tailwind CSS 的后台 UI 组件库。AI 生成代码时，必须把它当作可复用组件包，不要把它当作产品应用框架、路由框架、请求层或业务规则来源。

## 公开入口

- 文档地址：[https://thundax-lyp.github.io/scone-ui/docs/](https://thundax-lyp.github.io/scone-ui/docs/)
- 示例地址：[https://thundax-lyp.github.io/scone-ui/example/](https://thundax-lyp.github.io/scone-ui/example/)
- GitHub 代码地址：[https://github.com/thundax-lyp/scone-ui](https://github.com/thundax-lyp/scone-ui)
- npm 地址：[https://www.npmjs.com/package/scone-ui](https://www.npmjs.com/package/scone-ui)

## 读取顺序

AI 生成或修改目标应用代码时，按此顺序读取：

1. `scone-ui/dist/index.d.ts`：当前安装版本的唯一类型权威。
2. `scone-ui/PACKAGE-AI-GUIDE.md`：组件选择、导入边界和生成规则。

如果本文档与 `dist/index.d.ts` 冲突，以 `dist/index.d.ts` 为准。仓库内部 specs、设计文档、runbook、TODO 和源码路径不是发布包 API。

## 安装和使用

目标应用必须安装 peer/runtime 依赖并引入样式：

```tsx
import "scone-ui/styles.css";

import { SconeButton, SconeForm, SconeInput } from "scone-ui";
import type { SconeButtonProps, SconeInputProps } from "scone-ui";
```

`scone-ui/styles.css` 是零配置样式入口，已包含默认主题变量、组件样式、Tailwind bridge、shadcn 动画支持和 Geist 字体导入。普通应用只导入这一项。

公开 CSS 入口：

| 入口                         | 用途                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------- |
| `scone-ui/styles.css`        | 推荐入口。完整组件库样式，包含默认 theme。                                      |
| `scone-ui/default.theme.css` | 默认 token 文件。用于主题审阅、单独对比或高级构建拆分。普通应用不需要额外导入。 |
| `scone-ui/styles/theme.css`  | 兼容入口，转发默认 theme。新代码不要优先使用。                                  |

调用方覆盖主题时，必须在 `scone-ui/styles.css` 之后声明 token：

```css
@import "scone-ui/styles.css";

:root {
    --scone-color-primary: #1677ff;
    --scone-color-success: #52c41a;
}

.dark,
[data-theme="dark"] {
    --scone-color-primary: #69b1ff;
}
```

不要在普通应用中同时导入 `scone-ui/styles.css` 和 `scone-ui/default.theme.css`，因为 `styles.css` 已包含默认 theme。

示例站 CSS 只服务在线 example 页面布局和演示视觉，不是发布包样式入口，也不是调用方应用的主题模板。

AI 只能从包入口导入公共组件和类型：

```tsx
import { SconeButton, SconeTable, SconeDrawer, DataTable } from "scone-ui";
import type { SconeTableColumn, SconeDrawerProps } from "scone-ui";
```

AI 不得导入源码、内部 primitive 或 shadcn 路径：

```tsx
import { Button } from "scone-ui/components/ui/button";
import { Button } from "@/components/ui/button";
import { Button } from "shadcn/ui";
```

## 公共 API 形态

- `Scone*`：公共基础组件，例如 `SconeButton`、`SconeSelect`、`SconeTable`。
- `AppShell`、`Page`、`Section`、`FilterBar`、`DataTable`：后台页面 Pattern，使用命名空间对象，例如 `Page.Root`、`DataTable.TableRegion`。
- `toast` / `notification`：服务型反馈 API，必须配套 `SconeToastProvider` / `SconeNotificationProvider`。
- `cn`、`composeRefs`、`useControllableState`、ARIA helpers：公共工具，只在 wrapper 或库内组合需要时使用。

内部边界：

- `components/ui/*` 是内部 shadcn/Radix primitive，不是公共 API。
- 不要暴露、导入或包装内部 `Button`、`Dialog`、`SelectTrigger` 等 primitive。
- Recipe 不是导出组件。不要生成 `SconeDrawerForm`、`SconePopover`、`SconeLogo`、`SconeResult`、`SconeGrid` 这类不存在的公共 API。

## 组件选择

AI 应优先选择能表达语义的组件，而不是拼装低层元素。

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

## Props 规则

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

## 公共导出

### 表单

组件：`SconeButton`、`SconeCheckbox`、`SconeCombobox`、`SconeDatePicker`、`SconeField`、`SconeFieldGroup`、`SconeForm`、`SconeFormActions`、`SconeFormSection`、`SconeInput`、`SconeNumberInput`、`SconePasswordInput`、`SconeRadioGroup`、`SconeSearchInput`、`SconeSelect`、`SconeSlider`、`SconeSwitch`、`SconeTextArea`、`SconeUpload`。

Hooks：`useSconeFieldContext`、`useSconeFormContext`。

类型：`SconeButtonProps`、`SconeCheckboxProps`、`SconeComboboxProps`、`SconeDatePickerProps`、`SconeFieldContextValue`、`SconeFieldControlProps`、`SconeFieldDescriptionProps`、`SconeFieldGroupProps`、`SconeFieldLabelProps`、`SconeFieldMessageProps`、`SconeFieldRootProps`、`SconeFormActionsProps`、`SconeFormContextValue`、`SconeFormProps`、`SconeFormSectionProps`、`SconeInputProps`、`SconeNumberInputProps`、`SconePasswordInputProps`、`SconeRadioGroupProps`、`SconeSearchInputProps`、`SconeSelectProps`、`SconeSliderProps`、`SconeSwitchProps`、`SconeTextAreaProps`、`SconeUploadProps`、`SconeUploadRejection`。

### 数据展示

组件：`SconeBadge`、`SconeCard`、`SconeDescriptions`、`SconeList`、`SconeParagraph`、`SconeStatistic`、`SconeTable`、`SconeTag`、`SconeText`、`SconeTimeline`、`SconeTitle`、`SconeTypography`。

类型：`SconeBadgeProps`、`SconeCardProps`、`SconeDescriptionItem`、`SconeDescriptionsProps`、`SconeListProps`、`SconeParagraphProps`、`SconeStatisticProps`、`SconeTableColumn`、`SconeTableProps`、`SconeTableScroll`、`SconeTagProps`、`SconeTextProps`、`SconeTimelineItem`、`SconeTimelineProps`、`SconeTitleProps`、`SconeTypographyElement`、`SconeTypographyProps`、`SconeTypographySize`、`SconeTypographyTone`、`SconeTypographyWeight`。

### 布局

组件：`SconeCompact`、`SconeInline`、`SconeScrollArea`、`SconeSeparator`、`SconeSplitPane`、`SconeStack`、`SconeToolbar`。

类型：`SconeCompactProps`、`SconeInlineProps`、`SconeScrollAreaProps`、`SconeSeparatorProps`、`SconeSplitPaneProps`、`SconeSplitPaneSizePreset`、`SconeStackProps`、`SconeToolbarProps`。

### 反馈和浮层

组件和服务：`SconeAlert`、`SconeConfirm`、`SconeDialog`、`SconeDrawer`、`SconeEmpty`、`SconeLoading`、`SconeNotificationProvider`、`SconeProgress`、`SconeToastProvider`、`notification`、`toast`。

类型：`NotificationCloseReason`、`NotificationOptions`、`NotificationPlacement`、`NotificationService`、`SconeAlertProps`、`SconeConfirmProps`、`SconeDialogProps`、`SconeDrawerProps`、`SconeEmptyProps`、`SconeLoadingProps`、`SconeNotificationItem`、`SconeNotificationProviderProps`、`SconeProgressProps`、`SconeToastItem`、`SconeToastProviderProps`、`ToastCloseReason`、`ToastOptions`、`ToastPosition`、`ToastService`。

### 导航和媒体

导航组件：`SconeAccordion`、`SconeBreadcrumb`、`SconeCollapsible`、`SconeCommand`、`SconeDropdown`、`SconeDropdownItem`、`SconeDropdownLabel`、`SconeDropdownSeparator`、`SconeMenu`、`SconePagination`、`SconeSegmented`、`SconeTabs`、`SconeTooltip`、`SconeTree`。

媒体组件：`SconeAvatar`、`SconeImage`。

类型：`SconeAccordionItem`、`SconeAccordionProps`、`SconeActionItem`、`SconeAvatarProps`、`SconeBreadcrumbItem`、`SconeBreadcrumbProps`、`SconeCollapsibleProps`、`SconeCommandItem`、`SconeCommandProps`、`SconeDropdownProps`、`SconeImageProps`、`SconeMenuProps`、`SconeNavigationItem`、`SconePaginationProps`、`SconeSegmentedProps`、`SconeTabsContentProps`、`SconeTabsItem`、`SconeTabsListProps`、`SconeTabsProps`、`SconeTabsTriggerProps`、`SconeTooltipProps`、`SconeTreeCheckInfo`、`SconeTreeExpandInfo`、`SconeTreeNode`、`SconeTreeProps`、`SconeTreeSelectInfo`。

### 后台 Pattern

Pattern 对象：`AppShell`、`DataTable`、`FilterBar`、`Page`、`Section`。

类型：`AppShellAsideProps`、`AppShellHeaderProps`、`AppShellMainProps`、`AppShellRootProps`、`AppShellSidebarProps`、`DataTableAction`、`DataTableBulkActionsProps`、`DataTableFilterBarProps`、`DataTablePaginationProps`、`DataTableRootProps`、`DataTableTableRegionProps`、`DataTableToolbarProps`、`FilterBarActionsProps`、`FilterBarFieldsProps`、`FilterBarFilters`、`FilterBarRootProps`、`FilterBarSearchProps`、`FilterBarState`、`FilterBarSummaryProps`、`PageContentProps`、`PageHeaderProps`、`PageMainProps`、`PageRootProps`、`PageStickyActionsProps`、`SectionActionsProps`、`SectionContentProps`、`SectionDescriptionProps`、`SectionFooterProps`、`SectionHeaderProps`、`SectionRootProps`、`SectionTitleProps`。

## 共享类型

共享类型从 `"scone-ui"` 导出。精确字段定义必须读取已安装包的 `dist/index.d.ts`。

| 类型                          | 典型用途                                  |
| ----------------------------- | ----------------------------------------- |
| `Key`                         | 行、树、菜单、时间线和列表的稳定 key。    |
| `SconeTone`                   | 语义化视觉色调。                          |
| `SconeStatus`                 | 通用状态。                                |
| `SconeControlSize`            | 表单控件尺寸。                            |
| `SconeDensity`                | 数据展示密度。                            |
| `SconeSpacingToken`           | 布局间距 token。                          |
| `SconeOption<Value>`          | Select、Combobox、RadioGroup 的选项模型。 |
| `SconeDescriptionItem`        | Descriptions 条目模型。                   |
| `SconeTableColumn<T>`         | 基础表格列模型。                          |
| `SconeTableScroll`            | 基础表格滚动配置。                        |
| `SconeRowSelection<T>`        | DataTable 行选择状态桥接。                |
| `SconePaginationState`        | 分页状态桥接。                            |
| `SconePaginationChangeReason` | 分页变化原因。                            |
| `OverlayCloseReason`          | Dialog 和 Drawer 的关闭原因。             |

## 代码示例

### 基础表单

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

### DataTable Pattern

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

### 反馈服务

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

## 生成规则

1. 所有公共组件、Pattern、service、hook、helper 和类型都从 `"scone-ui"` 导入。
2. 包样式只在应用入口或组件预览入口引入一次：`"scone-ui/styles.css"`。
3. 存在匹配的 `Scone*` 组件时，优先使用 `Scone*`，不要先写原生 HTML。
4. 后台页面优先使用 `AppShell`、`Page`、`Section`、`FilterBar`、`DataTable`。
5. 封装组件时使用公共 props 类型，例如 `SconeButtonProps`。
6. 发明 props、事件名、枚举值或 compound component parts 前，必须读取 `dist/index.d.ts`。
7. 请求、路由、权限、mutation、校验 schema 和产品文案必须留在目标应用中。
8. 不要使用包内部路径、源码 alias、shadcn primitive 路径或未文档化的子路径。
9. 不要发明新的导出名，例如不存在的 `SconeDrawerForm`、`SconePopover`、`SconeLogo`、`SconeResult`、`SconeGrid`。
10. 不要依赖仓库内部 specs、设计文档、RUNBOOK、TODO、PR 记录或源码路径。

## 给另一个 AI 的最小提示词

```text
Use scone-ui as an installed React component package.
Import CSS once: import "scone-ui/styles.css".
Import every component, pattern, service, hook, helper, and type from "scone-ui".
Public components are Scone-prefixed.
Admin Patterns are AppShell, Page, Section, FilterBar, and DataTable.
Use Scone*Props public types when wrapping components.
For exact props and event names, read scone-ui/dist/index.d.ts first.
Do not import from scone-ui/components/ui, src paths, @/components/ui, shadcn/ui, or undocumented subpaths.
Do not import scone-ui/default.theme.css together with scone-ui/styles.css in ordinary apps; styles.css already includes the default theme.
Do not invent SconeDrawerForm, SconePopover, SconeLogo, SconeResult, SconeGrid, or other recipe names as public APIs.
Keep fetching, routing, permissions, validation schemas, and product-specific text in the consuming app.
```
