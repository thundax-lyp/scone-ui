# Admin UI Type And Data Structure Design

## Type And Data Structure Design

依据文件：

- `docs/10-specs/FOUNDATIONS-SPEC.md`
- `docs/10-specs/ADMIN-UI-SPEC.md`

类型文件归属：

| 文件                                               | 类型范围                                                                       | 导出边界                                                                                                    |
| -------------------------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `src/types/foundation.ts`                          | Foundation shared types、词表类型、跨组件基础状态桥接类型。                    | 从 `src/index.ts` 公开导出。                                                                                |
| `src/components/*/*.tsx`                           | 与单组件紧耦合的 props、item、state 和 event payload 类型。                    | 本族公共类型从对应 `src/components/*/index.ts` 汇总，再由 `src/index.ts` 汇总导出；内部 helper 类型不导出。 |
| `src/components/*/index.ts`                        | 组件族公共组件和本族公共类型汇总入口。                                         | 只导出本组件族 API，不导出其他组件族类型。                                                                  |
| `src/patterns/*.tsx`                               | Pattern compound parts props、slot props 和 Pattern 状态桥接。                 | Pattern 公共 props 可从 `src/patterns/index.ts` 和 `src/index.ts` 导出。                                    |
| `src/components/feedback-overlay/toast.tsx`        | Toast provider props、service options、queue item、返回 id 和关闭原因。        | Provider、service function 和公共 option 类型公开导出。                                                     |
| `src/components/feedback-overlay/notification.tsx` | Notification provider props、service options、queue item、返回 id 和关闭原因。 | Provider、service function 和公共 option 类型公开导出。                                                     |

公共 Foundation 类型：

| 类型                          | 定义位置                  | 导出 | 适用组件                                                   | 非目标                                      |
| ----------------------------- | ------------------------- | ---- | ---------------------------------------------------------- | ------------------------------------------- |
| `Breakpoint`                  | `src/types/foundation.ts` | 是   | `ResponsiveValue<T>`                                       | 不定义 `mobile/tablet/desktop` 第二套断点。 |
| `ResponsiveValue<T>`          | `src/types/foundation.ts` | 是   | Page、Drawer、SplitPane、Descriptions、Toolbar             | 不使用数组形态。                            |
| `Key`                         | `src/types/foundation.ts` | 是   | Tree、Table、Timeline、Descriptions、selection             | 不默认表达 URL 或网络 id 规范化。           |
| `SconeTone`                   | `src/types/foundation.ts` | 是   | Alert、Tag、Badge、Progress、Toast、Notification、Timeline | 不表达业务枚举、后端状态或流程阶段。        |
| `SconeSpacingToken`           | `src/types/foundation.ts` | 是   | Layout、section spacing、局部间距 API                      | 不接受任意 number 作为默认公共 API。        |
| `SconeControlSize`            | `src/types/foundation.ts` | 是   | 控件型组件                                                 | 不表达容器宽度。                            |
| `SconeDensity`                | `src/types/foundation.ts` | 是   | Table、List、Descriptions、Toolbar、DataTable              | 不替代控件高度。                            |
| `SconeOption<Value = string>` | `src/types/foundation.ts` | 是   | Select、Segmented、Combobox、RadioGroup                    | 不把整条业务对象作为默认 value。            |
| `OverlayCloseReason`          | `src/types/foundation.ts` | 是   | Drawer、Dialog、Confirm                                    | 不表达业务取消原因。                        |

词表类型：

| 类型               | 值                                   |
| ------------------ | ------------------------------------ |
| `SconeOrientation` | `horizontal`、`vertical`             |
| `SconeAlign`       | `start`、`center`、`end`             |
| `SconeSide`        | `top`、`right`、`bottom`、`left`     |
| `SconeStatus`      | `idle`、`active`、`success`、`error` |

数据结构类型：

| 类型                          | 定义位置                                           | 用途                                    | 设计边界                                                            |
| ----------------------------- | -------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------- |
| `SconeDescriptionItem`        | `src/components/data-display/descriptions.tsx`     | Descriptions 键值展示项。               | 不直接使用后端字段名；空值 fallback 由调用方或 recipe 处理。        |
| `SconePaginationState`        | `src/components/navigation/pagination.tsx`         | Pagination、Table、DataTable 分页桥接。 | 只表达 UI 和查询意图，不发起请求。                                  |
| `SconePaginationChangeReason` | `src/components/navigation/pagination.tsx`         | 分页变化原因。                          | 值限定为 `page`、`pageSize`。                                       |
| `SconeTableSorting`           | `src/patterns/data-table.tsx`                      | DataTable 排序状态桥接。                | 不在组件内发起请求。                                                |
| `SconeTableColumn<T>`         | `src/components/data-display/table.tsx`            | 基础表格列定义。                        | 不承载请求、权限、字典加载或业务动作执行。                          |
| `SconeTableScroll`            | `src/components/data-display/table.tsx`            | 基础表格横向滚动配置。                  | 不沿用 AntD `{ x, y }` 完整语义；垂直滚动由 TableRegion 管理。      |
| `SconeRowSelection<T>`        | `src/patterns/data-table.tsx`                      | DataTable selection UI 状态桥接。       | 不属于基础 `SconeTable` prop，不定义批量动作。                      |
| `SconeBaseItem`               | `src/types/foundation.ts`                          | 动作、导航、路径和命令项共享最小字段。  | 各组件必须扩展自己的 item 类型，不复用万能 schema。                 |
| `SconeActionItem`             | `src/components/navigation/dropdown.tsx`           | Dropdown 和行操作菜单。                 | `destructive` 不自动打开确认；权限过滤由调用方完成。                |
| `SconeNavigationItem`         | `src/components/navigation/menu.tsx`               | Menu、Sidebar 和导航集合。              | 不把 router API 写入 item schema；AppShell 复用该类型但不定义路由。 |
| `SconeBreadcrumbItem`         | `src/components/navigation/breadcrumb.tsx`         | Breadcrumb 路径。                       | 不支持 destructive 或动作回调。                                     |
| `SconeCommandItem`            | `src/components/navigation/command.tsx`            | Command 搜索项。                        | 不表达表单值；表单选择由 Combobox 增加语义。                        |
| `SconeTreeNode`               | `src/components/navigation/tree.tsx`               | Tree 和层级选择能力。                   | 异步加载、虚拟滚动和拖拽单独扩展。                                  |
| `SconeAccordionItem`          | `src/components/navigation/accordion.tsx`          | Accordion 简化配置。                    | 复杂内容优先使用 compound children。                                |
| `SconeTimelineItem`           | `src/components/data-display/timeline.tsx`         | Timeline 通用事件项。                   | 不承载审批、权限或流程状态机。                                      |
| `SconeToastItem`              | `src/components/feedback-overlay/toast.tsx`        | Toast 队列展示项。                      | 不承载业务来源、持久化或通知订阅状态。                              |
| `SconeNotificationItem`       | `src/components/feedback-overlay/notification.tsx` | Notification 队列展示项。               | 已读、订阅来源和持久化由产品侧处理。                                |

## Concrete Data Structure Definitions

以下定义是实现阶段的目标 TypeScript shape。实现时可以按 React 类型导入补齐 `ReactNode`、`ComponentPropsWithoutRef` 等基础类型，但不得改变字段语义、字段所有权或文件落点。

### Foundation Types

文件落点：`src/types/foundation.ts`。

```ts
export type Key = string | number;

export type Breakpoint = "sm" | "md" | "lg" | "xl";

export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

export type SconeTone = "neutral" | "info" | "success" | "warning" | "danger";

export type SconeSpacingToken = "none" | "xs" | "sm" | "md" | "lg" | "xl";

export type SconeControlSize = "sm" | "md" | "lg";

export type SconeDensity = "compact" | "default" | "comfortable";

export type SconeOrientation = "horizontal" | "vertical";

export type SconeAlign = "start" | "center" | "end";

export type SconeSide = "top" | "right" | "bottom" | "left";

export type SconeStatus = "idle" | "active" | "success" | "error";

export type OverlayCloseReason =
    "escape" | "outside" | "closeButton" | "footerAction" | "programmatic";

export interface SconeOption<Value = string> {
    value: Value;
    label: React.ReactNode;
    disabled?: boolean;
    description?: React.ReactNode;
}

export interface SconeBaseItem {
    key: Key;
    label: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
    description?: React.ReactNode;
}
```

### Data Display Structures

文件落点：`src/components/data-display/descriptions.tsx`。

```ts
export interface SconeDescriptionItem {
    key: Key;
    label: React.ReactNode;
    value: React.ReactNode;
    span?: 1 | 2 | 3 | 4;
    emptyFallback?: React.ReactNode;
}
```

文件落点：`src/components/data-display/table.tsx`。

```ts
export interface SconeTableColumn<T> {
    key: Key;
    title: React.ReactNode;
    dataIndex?: keyof T | readonly (string | number)[];
    width?: number | string;
    minWidth?: number;
    align?: SconeAlign;
    sortable?: boolean;
    render?: (value: unknown, record: T, index: number) => React.ReactNode;
    className?: string;
    headerClassName?: string;
}

export interface SconeTableScroll {
    x?: number | string | true;
}
```

文件落点：`src/components/data-display/timeline.tsx`。

```ts
export interface SconeTimelineItem {
    key: Key;
    title: React.ReactNode;
    description?: React.ReactNode;
    time?: React.ReactNode;
    tone?: SconeTone;
    icon?: React.ReactNode;
}
```

### Navigation Structures

文件落点：`src/components/navigation/pagination.tsx`。

```ts
export interface SconePaginationState {
    page: number;
    pageSize: number;
    total?: number;
}

export type SconePaginationChangeReason = "page" | "pageSize";
```

文件落点：`src/components/navigation/dropdown.tsx`。

```ts
export interface SconeActionItem extends SconeBaseItem {
    onSelect?: () => void;
    destructive?: boolean;
    shortcut?: React.ReactNode;
}
```

文件落点：`src/components/navigation/menu.tsx`。

```ts
export interface SconeNavigationItem extends SconeBaseItem {
    href?: string;
    active?: boolean;
    children?: SconeNavigationItem[];
}
```

文件落点：`src/components/navigation/breadcrumb.tsx`。

```ts
export interface SconeBreadcrumbItem {
    key: Key;
    label: React.ReactNode;
    href?: string;
    current?: boolean;
}
```

文件落点：`src/components/navigation/command.tsx`。

```ts
export interface SconeCommandItem extends SconeBaseItem {
    value: string;
    group?: string;
    keywords?: string[];
    onSelect?: (value: string) => void;
}
```

文件落点：`src/components/navigation/tree.tsx`。

```ts
export interface SconeTreeNode {
    key: Key;
    label: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
    children?: SconeTreeNode[];
}
```

文件落点：`src/components/navigation/accordion.tsx`。

```ts
export interface SconeAccordionItem {
    value: string;
    trigger: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
}
```

### Feedback Service Structures

文件落点：`src/components/feedback-overlay/toast.tsx`。

```ts
export type ToastPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export type ToastCloseReason = "timeout" | "closeButton" | "programmatic";

export interface ToastOptions {
    id?: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    tone?: SconeTone;
    duration?: number;
    action?: React.ReactNode;
    onAction?: (id: string) => void;
    onDismiss?: (id: string, reason: ToastCloseReason) => void;
}

export interface SconeToastItem extends ToastOptions {
    id: string;
}

export interface SconeToastProviderProps {
    children: React.ReactNode;
    position?: ToastPosition;
    duration?: number;
    maxVisible?: number;
    onOpenChange?: (items: SconeToastItem[]) => void;
}

export interface ToastService {
    show: (options: ToastOptions) => string;
    success: (options: ToastOptions) => string;
    error: (options: ToastOptions) => string;
    update: (id: string, options: Partial<ToastOptions>) => void;
    dismiss: (id: string, reason?: ToastCloseReason) => void;
    clear: () => void;
}
```

文件落点：`src/components/feedback-overlay/notification.tsx`。

```ts
export type NotificationPlacement = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export type NotificationCloseReason = "closeButton" | "programmatic";

export interface NotificationOptions {
    id?: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    tone?: SconeTone;
    time?: React.ReactNode;
    persistent?: boolean;
    action?: React.ReactNode;
    onAction?: (id: string) => void;
    onClose?: (id: string, reason: NotificationCloseReason) => void;
}

export interface SconeNotificationItem extends NotificationOptions {
    id: string;
}

export interface SconeNotificationProviderProps {
    children: React.ReactNode;
    placement?: NotificationPlacement;
    maxVisible?: number;
    onOpenChange?: (items: SconeNotificationItem[]) => void;
}

export interface NotificationService {
    open: (options: NotificationOptions) => string;
    update: (id: string, options: Partial<NotificationOptions>) => void;
    close: (id: string, reason?: NotificationCloseReason) => void;
    clear: () => void;
}
```

### Pattern State Structures

文件落点：`src/patterns/filter-bar.tsx`。

```ts
export type FilterValue =
    string | number | boolean | null | undefined | readonly (string | number | boolean)[];

export type FilterBarFilters = Record<string, FilterValue>;

export interface FilterBarState {
    searchValue: string;
    filters: FilterBarFilters;
}
```

文件落点：`src/patterns/data-table.tsx`。

```ts
export interface SconeTableSorting {
    key: Key;
    direction: "asc" | "desc";
}

export interface SconeRowSelection<T> {
    selectedRowKeys: Key[];
    selectedRows?: T[];
    onChange?: (selectedRowKeys: Key[], selectedRows: T[]) => void;
}

export interface DataTableState<T> {
    sorting?: SconeTableSorting;
    filters?: FilterBarFilters;
    pagination?: SconePaginationState;
    selection?: SconeRowSelection<T>;
    columnVisibility?: Record<Key, boolean>;
}
```

实现边界：

- 以上数据结构只表达组件库 UI 状态、展示数据和调用方意图；不得加入请求函数、权限表达式、router 对象、业务实体 schema 或后端字段约定。
- 同名类型必须定义在表中指定文件，并由对应组件族入口或 `src/patterns/index.ts` 汇总；只有跨组件共享类型可提升到 `src/types/foundation.ts`。
- `DataTableState<T>` 是可选的状态聚合类型，不是 DataTable 的万能配置对象；各 part props 仍应按 slot 拆分。

## Public Props Contracts

以下 props contract 是实现阶段的最小公共 API。实现可在对应文件中继承原生 HTML props 或 Radix/shadcn props，但必须保留这些字段名、受控状态组合和业务边界。

### Shared Props Building Blocks

文件落点：按使用组件所在文件定义；跨组件共享词表仍来自 `src/types/foundation.ts`。

```ts
export interface SconeCommonProps {
    className?: string;
    children?: React.ReactNode;
}

export interface SconeAriaLabelProps {
    ariaLabel?: string;
}

export interface SconeLoadingStateProps {
    loading?: boolean;
}

export interface SconeDisabledProps {
    disabled?: boolean;
}

export interface SconeReadonlyProps {
    readOnly?: boolean;
}

export interface SconeInvalidProps {
    invalid?: boolean;
}

export interface SconeOpenStateProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export interface SconeValueStateProps<Value> {
    value?: Value;
    defaultValue?: Value;
    onValueChange?: (value: Value) => void;
}

export interface SconeCheckedStateProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}
```

### Form Props

文件落点：`src/components/form/*.tsx`。

```ts
export interface SconeButtonProps
    extends SconeCommonProps, SconeAriaLabelProps, SconeLoadingStateProps, SconeDisabledProps {
    variant?: "primary" | "secondary" | "ghost" | "destructive";
    size?: SconeControlSize;
    icon?: React.ReactNode;
    iconPosition?: "start" | "end";
    asChild?: boolean;
}

export interface SconeInputProps
    extends
        SconeCommonProps,
        SconeAriaLabelProps,
        SconeDisabledProps,
        SconeReadonlyProps,
        SconeInvalidProps,
        SconeValueStateProps<string> {
    placeholder?: string;
    size?: SconeControlSize;
}

export interface SconeSearchInputProps extends SconeInputProps, SconeLoadingStateProps {
    clearable?: boolean;
    onClear?: () => void;
}

export interface SconePasswordInputProps extends SconeInputProps {
    visibilityLabel?: string;
    defaultVisible?: boolean;
}

export interface SconeTextAreaProps extends SconeInputProps {
    rows?: number;
    autoSize?: boolean;
    maxLength?: number;
    showCount?: boolean;
}

export interface SconeSelectProps<Value = string>
    extends
        SconeCommonProps,
        SconeAriaLabelProps,
        SconeDisabledProps,
        SconeReadonlyProps,
        SconeInvalidProps,
        SconeOpenStateProps,
        SconeValueStateProps<Value> {
    options?: SconeOption<Value>[];
    placeholder?: string;
    size?: SconeControlSize;
}

export interface SconeFormProps extends SconeCommonProps {
    disabled?: boolean;
    readOnly?: boolean;
    requiredMark?: boolean | "optional";
}

export interface SconeFieldProps
    extends SconeCommonProps, SconeDisabledProps, SconeReadonlyProps, SconeInvalidProps {
    id?: string;
    label?: React.ReactNode;
    description?: React.ReactNode;
    message?: React.ReactNode;
    required?: boolean;
}

export interface SconeFieldGroupProps extends SconeCommonProps {
    legend?: React.ReactNode;
    description?: React.ReactNode;
    orientation?: SconeOrientation;
}

export interface SconeFormSectionProps extends SconeCommonProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
}

export interface SconeFormActionsProps extends SconeCommonProps {
    align?: "start" | "end" | "between";
    sticky?: boolean;
}

export interface SconeComboboxProps<Value = string>
    extends SconeSelectProps<Value>, SconeLoadingStateProps {
    empty?: React.ReactNode;
    searchValue?: string;
    defaultSearchValue?: string;
    onSearchChange?: (value: string) => void;
}

export interface SconeSwitchProps
    extends SconeCommonProps, SconeDisabledProps, SconeInvalidProps, SconeCheckedStateProps {}

export interface SconeCheckboxProps
    extends SconeCommonProps, SconeDisabledProps, SconeInvalidProps {
    checked?: boolean | "indeterminate";
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean | "indeterminate") => void;
}

export interface SconeRadioGroupProps<Value = string>
    extends SconeCommonProps, SconeDisabledProps, SconeInvalidProps, SconeValueStateProps<Value> {
    options?: SconeOption<Value>[];
    orientation?: SconeOrientation;
}

export interface SconeNumberInputProps
    extends
        SconeCommonProps,
        SconeAriaLabelProps,
        SconeDisabledProps,
        SconeReadonlyProps,
        SconeInvalidProps,
        SconeValueStateProps<number | null> {
    min?: number;
    max?: number;
    step?: number;
    placeholder?: string;
}

export interface SconeSliderProps
    extends
        SconeCommonProps,
        SconeDisabledProps,
        SconeInvalidProps,
        SconeValueStateProps<number[]> {
    min?: number;
    max?: number;
    step?: number;
}

export interface SconeDatePickerProps
    extends
        SconeCommonProps,
        SconeAriaLabelProps,
        SconeDisabledProps,
        SconeReadonlyProps,
        SconeInvalidProps,
        SconeOpenStateProps,
        SconeValueStateProps<Date | null> {
    placeholder?: string;
    disabledDate?: (date: Date) => boolean;
}

export interface SconeUploadFile {
    id: string;
    file: File;
    status?: "ready" | "uploading" | "success" | "error";
    error?: React.ReactNode;
}

export interface SconeUploadReject {
    file: File;
    reason: "type" | "size" | "count" | "custom";
    message?: React.ReactNode;
}

export interface SconeUploadProps extends SconeCommonProps, SconeDisabledProps {
    files?: SconeUploadFile[];
    defaultFiles?: SconeUploadFile[];
    onFilesChange?: (files: SconeUploadFile[]) => void;
    accept?: string;
    multiple?: boolean;
    maxFiles?: number;
    maxSize?: number;
    beforeAdd?: (file: File) => boolean | Promise<boolean>;
    onReject?: (reject: SconeUploadReject) => void;
}
```

### Data Display Props

文件落点：`src/components/data-display/*.tsx`。

```ts
export interface SconeDescriptionsProps extends SconeCommonProps {
    items: SconeDescriptionItem[];
    columns?: ResponsiveValue<1 | 2 | 3 | 4>;
    density?: SconeDensity;
    bordered?: boolean;
}

export interface SconeTableProps<T> extends SconeCommonProps, SconeAriaLabelProps {
    columns: SconeTableColumn<T>[];
    dataSource: T[];
    rowKey: keyof T | ((record: T) => Key);
    density?: SconeDensity;
    loading?: boolean;
    empty?: React.ReactNode;
    error?: React.ReactNode;
    scroll?: SconeTableScroll;
    onRow?: (record: T, index: number) => React.HTMLAttributes<HTMLTableRowElement>;
}

export interface SconeCardProps extends SconeCommonProps, SconeLoadingStateProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
    footer?: React.ReactNode;
}

export interface SconeTagProps extends SconeCommonProps {
    tone?: SconeTone;
    closable?: boolean;
    onClose?: () => void;
}

export interface SconeBadgeProps extends SconeCommonProps, SconeAriaLabelProps {
    count?: number;
    dot?: boolean;
    tone?: SconeTone;
    overflowCount?: number;
}

export interface SconeListProps<T> extends SconeCommonProps {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    rowKey?: keyof T | ((item: T) => Key);
    density?: SconeDensity;
    loading?: boolean;
    empty?: React.ReactNode;
    error?: React.ReactNode;
}

export interface SconeTypographyProps extends SconeCommonProps {
    as?: "span" | "p" | "div";
    tone?: SconeTone;
    truncate?: boolean;
}

export interface SconeTextProps extends SconeTypographyProps {}

export interface SconeTitleProps extends SconeCommonProps {
    level?: 1 | 2 | 3 | 4;
}

export interface SconeParagraphProps extends SconeTypographyProps {}

export interface SconeStatisticProps extends SconeCommonProps {
    label: React.ReactNode;
    value: React.ReactNode;
    tone?: SconeTone;
    suffix?: React.ReactNode;
}

export interface SconeTimelineProps extends SconeCommonProps {
    items: SconeTimelineItem[];
    pending?: React.ReactNode;
    reverse?: boolean;
    onItemClick?: (key: Key) => void;
}
```

### Layout Props

文件落点：`src/components/layout/*.tsx`。

```ts
export interface SconeStackProps extends SconeCommonProps {
    gap?: SconeSpacingToken;
    align?: SconeAlign;
}

export interface SconeInlineProps extends SconeCommonProps {
    gap?: SconeSpacingToken;
    align?: SconeAlign;
    wrap?: boolean;
}

export interface SconeCompactProps extends SconeCommonProps {
    orientation?: SconeOrientation;
}

export interface SconeToolbarProps extends SconeCommonProps {
    start?: React.ReactNode;
    end?: React.ReactNode;
    actions?: React.ReactNode;
    density?: SconeDensity;
    wrap?: boolean;
}

export interface SconeSplitPaneProps extends SconeCommonProps {
    leading: React.ReactNode;
    trailing: React.ReactNode;
    orientation?: SconeOrientation;
    size?: string;
    defaultSize?: string;
    onSizeChange?: (size: string) => void;
    minSize?: string;
    maxSize?: string;
}

export interface SconeSeparatorProps extends SconeCommonProps {
    orientation?: SconeOrientation;
    decorative?: boolean;
}

export interface SconeScrollAreaProps extends SconeCommonProps {
    viewportClassName?: string;
    onScroll?: React.UIEventHandler<HTMLDivElement>;
}
```

### Feedback And Overlay Props

文件落点：`src/components/feedback-overlay/*.tsx`。

```ts
export interface SconeDrawerProps
    extends SconeCommonProps, SconeOpenStateProps, SconeLoadingStateProps, SconeAriaLabelProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    footer?: React.ReactNode;
    widthPreset?: "sm" | "md" | "lg" | "full";
    onRequestClose?: (reason: OverlayCloseReason) => void;
}

export interface SconeDialogProps
    extends SconeCommonProps, SconeOpenStateProps, SconeAriaLabelProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    footer?: React.ReactNode;
    onRequestClose?: (reason: OverlayCloseReason) => void;
}

export interface SconeConfirmProps
    extends SconeCommonProps, SconeOpenStateProps, SconeLoadingStateProps {
    title: React.ReactNode;
    description?: React.ReactNode;
    destructive?: boolean;
    confirmText?: React.ReactNode;
    cancelText?: React.ReactNode;
    onConfirm?: () => void | Promise<void>;
    onCancel?: () => void;
}

export interface SconeAlertProps extends SconeCommonProps {
    tone?: SconeTone;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: React.ReactNode;
}

export interface SconeEmptyProps extends SconeCommonProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: React.ReactNode;
}

export interface SconeLoadingProps extends SconeCommonProps {
    label?: React.ReactNode;
    size?: SconeControlSize;
}

export interface SconeProgressProps extends SconeCommonProps {
    value?: number;
    max?: number;
    status?: SconeStatus;
    label?: React.ReactNode;
}
```

### Navigation And Media Props

文件落点：`src/components/navigation/*.tsx` 和 `src/components/media/*.tsx`。

```ts
export interface SconeBreadcrumbProps extends SconeCommonProps {
    items: SconeBreadcrumbItem[];
}

export interface SconePaginationProps extends SconeCommonProps, SconeDisabledProps {
    state: SconePaginationState;
    pageSizeOptions?: number[];
    onChange?: (nextState: SconePaginationState, reason: SconePaginationChangeReason) => void;
}

export interface SconeTabsProps<Value = string>
    extends SconeCommonProps, SconeValueStateProps<Value> {
    orientation?: SconeOrientation;
    activationMode?: "automatic" | "manual";
}

export interface SconeSegmentedProps<Value = string>
    extends SconeCommonProps, SconeValueStateProps<Value> {
    options: SconeOption<Value>[];
}

export interface SconeTreeProps extends SconeCommonProps {
    nodes: SconeTreeNode[];
    selectedKeys?: Key[];
    checkedKeys?: Key[];
    expandedKeys?: Key[];
    onSelectedKeysChange?: (keys: Key[]) => void;
    onCheckedKeysChange?: (keys: Key[]) => void;
    onExpandedKeysChange?: (keys: Key[]) => void;
}

export interface SconeDropdownProps extends SconeCommonProps, SconeOpenStateProps {
    trigger: React.ReactNode;
    items?: SconeActionItem[];
    onSelect?: (key: Key) => void;
}

export interface SconeMenuProps extends SconeCommonProps {
    items: SconeNavigationItem[];
    selectedKey?: Key;
    expandedKeys?: Key[];
    collapsed?: boolean;
    onSelect?: (key: Key) => void;
    onExpandedKeysChange?: (keys: Key[]) => void;
}

export interface SconeTooltipProps extends SconeCommonProps, SconeOpenStateProps {
    content: React.ReactNode;
}

export interface SconeCommandProps extends SconeCommonProps {
    items?: SconeCommandItem[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    onSelect?: (value: string) => void;
    loading?: boolean;
    empty?: React.ReactNode;
}

export interface SconeAccordionProps
    extends SconeCommonProps, SconeValueStateProps<string | string[]> {
    items?: SconeAccordionItem[];
    type?: "single" | "multiple";
}

export interface SconeCollapsibleProps extends SconeCommonProps, SconeOpenStateProps {}

export interface SconeImageProps extends SconeCommonProps, SconeAriaLabelProps {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    fallback?: React.ReactNode;
    previewOpen?: boolean;
    defaultPreviewOpen?: boolean;
    onPreviewOpenChange?: (open: boolean) => void;
}

export interface SconeAvatarProps extends SconeCommonProps {
    src?: string;
    alt: string;
    fallback: React.ReactNode;
}
```

Props 类型命名：

- 单组件 props 使用 `{ExportName}Props`，例如 `SconeButtonProps`、`SconeTableProps`。
- Compound part props 使用 `{Namespace}{Part}Props`，例如 `PageRootProps`、`DataTableTableRegionProps`。
- Provider props 使用 `{ExportName}ProviderProps`，例如 `SconeToastProviderProps`。
- Service option 类型使用 PascalCase service 名称，例如 `ToastOptions`、`NotificationOptions`。
- 组件内部 helper 类型不从 `src/index.ts` 导出。

泛型策略：

- `SconeOption<Value = string>` 默认 value 为 string；Select、Combobox、RadioGroup、Segmented 可通过泛型扩展。
- `SconeTableColumn<T>` 和 `SconeRowSelection<T>` 的 `T` 代表调用方数据行类型；组件不假设业务字段。
- `SconeTreeNode` 默认 key 使用 `Key`，不以数组 index 作为稳定标识。
- 回调 payload 使用稳定值、key 或 UI 状态，不传递整条业务对象作为默认行为；确需 `record` 的表格 render 和 selection 场景由泛型显式表达。

事件 payload：

| 回调                    | 参数设计                                                                                                                         | DOM event | 业务对象 |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| `onValueChange`         | `(value: Value) => void`                                                                                                         | 否        | 否       |
| `onOpenChange`          | `(open: boolean) => void`                                                                                                        | 否        | 否       |
| `onCheckedChange`       | `(checked: boolean) => void`                                                                                                     | 否        | 否       |
| `onSelect`              | Dropdown：`(key: Key) => void`；Command：`(value: string) => void`；Tree：`(keys: Key[]) => void`。                              | 否        | 否       |
| `onConfirm`             | `() => void \| Promise<void>`。                                                                                                  | 否        | 否       |
| `onCancel`              | `() => void`。                                                                                                                   | 否        | 否       |
| `onClear`               | `() => void`                                                                                                                     | 否        | 否       |
| `onApply`               | `(state: FilterBarState) => void`，用于 FilterBar/DataTable 筛选提交。                                                           | 否        | 否       |
| `onReset`               | `() => void`                                                                                                                     | 否        | 否       |
| `onDismiss` / `onClose` | Toast：`(id: string, reason: ToastCloseReason) => void`；Notification：`(id: string, reason: NotificationCloseReason) => void`。 | 否        | 否       |

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

| 服务         | 公共导出                                                                                                             | 类型边界                                                                                          |
| ------------ | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Toast        | `SconeToastProvider`、`toast`、`ToastOptions`、`SconeToastItem`、`ToastPosition`                                     | service 生成或接收 id，返回稳定 id；不承载业务来源或持久化。                                      |
| Notification | `SconeNotificationProvider`、`notification`、`NotificationOptions`、`SconeNotificationItem`、`NotificationPlacement` | service 生成或接收 id，返回稳定 id；支持 persistent UI 语义；已读、订阅来源和持久化由产品侧处理。 |

类型验证入口：

- `src/types/foundation.test.ts` 验证公共类型导出和关键泛型默认值。
- `src/index.test.ts` 验证公共类型和 service 类型没有从私有文件隐式泄漏。
- 组件族测试验证 props、事件 payload、ref 和可访问名称行为。
