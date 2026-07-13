# Admin UI Type And Data Structure Design

## Type And Data Structure Design

依据文件：

- `docs/10-specs/FOUNDATIONS-SPEC.md`
- `docs/10-specs/ADMIN-UI-SPEC.md`

类型文件归属：

| 文件 | 类型范围 | 导出边界 |
| --- | --- | --- |
| `src/types/foundation.ts` | Foundation shared types、词表类型、跨组件基础状态桥接类型。 | 从 `src/index.ts` 公开导出。 |
| `src/components/*/*.tsx` | 与单组件紧耦合的 props、item、state 和 event payload 类型。 | 本族公共类型从对应 `src/components/*/index.ts` 汇总，再由 `src/index.ts` 汇总导出；内部 helper 类型不导出。 |
| `src/components/*/index.ts` | 组件族公共组件和本族公共类型汇总入口。 | 只导出本组件族 API，不导出其他组件族类型。 |
| `src/patterns/*.tsx` | Pattern compound parts props、slot props 和 Pattern 状态桥接。 | Pattern 公共 props 可从 `src/patterns/index.ts` 和 `src/index.ts` 导出。 |
| `src/components/feedback-overlay/toast.tsx` | Toast provider props、service options、queue item、返回 id 和关闭原因。 | Provider、service function 和公共 option 类型公开导出。 |
| `src/components/feedback-overlay/notification.tsx` | Notification provider props、service options、queue item、返回 id 和关闭原因。 | Provider、service function 和公共 option 类型公开导出。 |

公共 Foundation 类型：

| 类型 | 定义位置 | 导出 | 适用组件 | 非目标 |
| --- | --- | --- | --- | --- |
| `Breakpoint` | `src/types/foundation.ts` | 是 | `ResponsiveValue<T>` | 不定义 `mobile/tablet/desktop` 第二套断点。 |
| `ResponsiveValue<T>` | `src/types/foundation.ts` | 是 | Page、Drawer、SplitPane、Descriptions、Toolbar | 不使用数组形态。 |
| `Key` | `src/types/foundation.ts` | 是 | Tree、Table、Timeline、Descriptions、selection | 不默认表达 URL 或网络 id 规范化。 |
| `SconeTone` | `src/types/foundation.ts` | 是 | Alert、Tag、Badge、Progress、Toast、Notification、Timeline | 不表达业务枚举、后端状态或流程阶段。 |
| `SconeSpacingToken` | `src/types/foundation.ts` | 是 | Layout、section spacing、局部间距 API | 不接受任意 number 作为默认公共 API。 |
| `SconeControlSize` | `src/types/foundation.ts` | 是 | 控件型组件 | 不表达容器宽度。 |
| `SconeDensity` | `src/types/foundation.ts` | 是 | Table、List、Descriptions、Toolbar、DataTable | 不替代控件高度。 |
| `SconeOption<Value = string>` | `src/types/foundation.ts` | 是 | Select、Segmented、Combobox、RadioGroup | 不把整条业务对象作为默认 value。 |
| `OverlayCloseReason` | `src/types/foundation.ts` | 是 | Drawer、Dialog、Confirm | 不表达业务取消原因。 |

词表类型：

| 类型 | 值 |
| --- | --- |
| `SconeOrientation` | `horizontal`、`vertical` |
| `SconeAlign` | `start`、`center`、`end` |
| `SconeSide` | `top`、`right`、`bottom`、`left` |
| `SconeStatus` | `idle`、`active`、`success`、`error` |

数据结构类型：

| 类型 | 定义位置 | 用途 | 设计边界 |
| --- | --- | --- | --- |
| `SconeDescriptionItem` | `src/components/data-display/descriptions.tsx` | Descriptions 键值展示项。 | 不直接使用后端字段名；空值 fallback 由调用方或 recipe 处理。 |
| `SconePaginationState` | `src/components/navigation/pagination.tsx` | Pagination、Table、DataTable 分页桥接。 | 只表达 UI 和查询意图，不发起请求。 |
| `SconePaginationChangeReason` | `src/components/navigation/pagination.tsx` | 分页变化原因。 | 值限定为 `page`、`pageSize`。 |
| `SconeTableSorting` | `src/patterns/data-table.tsx` | DataTable 排序状态桥接。 | 不在组件内发起请求。 |
| `SconeTableColumn<T>` | `src/components/data-display/table.tsx` | 基础表格列定义。 | 不承载请求、权限、字典加载或业务动作执行。 |
| `SconeTableScroll` | `src/components/data-display/table.tsx` | 基础表格横向滚动配置。 | 不沿用 AntD `{ x, y }` 完整语义；垂直滚动由 TableRegion 管理。 |
| `SconeRowSelection<T>` | `src/patterns/data-table.tsx` | DataTable selection UI 状态桥接。 | 不属于基础 `SconeTable` prop，不定义批量动作。 |
| `SconeBaseItem` | `src/types/foundation.ts` | 动作、导航、路径和命令项共享最小字段。 | 各组件必须扩展自己的 item 类型，不复用万能 schema。 |
| `SconeActionItem` | `src/components/navigation/dropdown.tsx` 或 `src/components/navigation/menu.tsx` | Dropdown、ActionMenu 和行操作菜单。 | `destructive` 不自动打开确认；权限过滤由调用方完成。 |
| `SconeNavigationItem` | `src/components/navigation/menu.tsx` 或 `src/patterns/app-shell.tsx` | Menu、Sidebar 和导航集合。 | 不把 router API 写入 item schema。 |
| `SconeBreadcrumbItem` | `src/components/navigation/breadcrumb.tsx` | Breadcrumb 路径。 | 不支持 destructive 或动作回调。 |
| `SconeCommandItem` | `src/components/navigation/command.tsx` | Command 搜索项。 | 不表达表单值；表单选择由 Combobox 增加语义。 |
| `SconeTreeNode` | `src/components/navigation/tree.tsx` | Tree 和层级选择能力。 | 异步加载、虚拟滚动和拖拽单独扩展。 |
| `SconeAccordionItem` | `src/components/navigation/accordion.tsx` | Accordion 简化配置。 | 复杂内容优先使用 compound children。 |
| `SconeTimelineItem` | `src/components/data-display/timeline.tsx` | Timeline 通用事件项。 | 不承载审批、权限或流程状态机。 |
| `SconeToastItem` | `src/components/feedback-overlay/toast.tsx` | Toast 队列展示项。 | 不承载业务来源、持久化或通知订阅状态。 |
| `SconeNotificationItem` | `src/components/feedback-overlay/notification.tsx` | Notification 队列展示项。 | 已读、订阅来源和持久化由产品侧处理。 |

Props 类型命名：

- 单组件 props 使用 `{ExportName}Props`，例如 `SconeButtonProps`、`SconeTableProps`。
- Compound part props 使用 `{Namespace}{Part}Props`，例如 `PageRootProps`、`DataTableTableRegionProps`。
- Provider props 使用 `{ExportName}ProviderProps`，例如 `SconeToastProviderProps`。
- Service option 类型使用 `{serviceName}Options` 或 `{ExportName}Options`，例如 `ToastOptions`、`NotificationOptions`。
- 组件内部 helper 类型不从 `src/index.ts` 导出。

泛型策略：

- `SconeOption<Value = string>` 默认 value 为 string；Select、Combobox、RadioGroup、Segmented 可通过泛型扩展。
- `SconeTableColumn<T>` 和 `SconeRowSelection<T>` 的 `T` 代表调用方数据行类型；组件不假设业务字段。
- `SconeTreeNode` 默认 key 使用 `Key`，不以数组 index 作为稳定标识。
- 回调 payload 使用稳定值、key 或 UI 状态，不传递整条业务对象作为默认行为；确需 `record` 的表格 render 和 selection 场景由泛型显式表达。

事件 payload：

| 回调 | 参数设计 | DOM event | 业务对象 |
| --- | --- | --- | --- |
| `onValueChange` | `(value: Value) => void` | 否 | 否 |
| `onOpenChange` | `(open: boolean) => void` | 否 | 否 |
| `onCheckedChange` | `(checked: boolean) => void` | 否 | 否 |
| `onSelect` | `(keyOrValue) => void`，具体类型由组件定义。 | 否 | 否 |
| `onConfirm` | `() => void` 或 `(reason)`，仅在 SPEC 明确时扩展。 | 否 | 否 |
| `onCancel` | `() => void` 或 `(reason)`，仅在 SPEC 明确时扩展。 | 否 | 否 |
| `onClear` | `() => void` | 否 | 否 |
| `onApply` | `(state) => void`，用于 FilterBar/DataTable 等 Pattern 状态。 | 否 | 否 |
| `onReset` | `() => void` | 否 | 否 |
| `onDismiss` | `(id: string) => void` 或 close reason，按 service 定义。 | 否 | 否 |

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

| 服务 | 公共导出 | 类型边界 |
| --- | --- | --- |
| Toast | `SconeToastProvider`、`toast`、`ToastOptions`、`SconeToastItem`、`ToastPosition` | service 生成或接收 id，返回稳定 id；不承载业务来源或持久化。 |
| Notification | `SconeNotificationProvider`、`notification`、`NotificationOptions`、`SconeNotificationItem`、`NotificationPlacement` | service 生成或接收 id，返回稳定 id；支持 persistent UI 语义；已读、订阅来源和持久化由产品侧处理。 |

类型验证入口：

- `src/types/foundation.test.ts` 验证公共类型导出和关键泛型默认值。
- `src/index.test.ts` 验证公共类型和 service 类型没有从私有文件隐式泄漏。
- 组件族测试验证 props、事件 payload、ref 和可访问名称行为。
