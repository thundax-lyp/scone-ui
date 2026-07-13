# SconeTable

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

基础数据表格，只负责稳定行列表达。列表页完整能力由 DataTable Pattern 组合。

| Prop          | 类型                                                 | 说明                               |
| ------------- | ---------------------------------------------------- | ---------------------------------- |
| `ariaLabel`   | `string`                                             | 表格可访问名称；无外部标题时必填。 |
| `columns`     | `SconeTableColumn<T>[]`                              | 列定义。                           |
| `dataSource`  | `T[]`                                                | 当前页或当前视图数据。             |
| `rowKey`      | `string \| ((record: T) => Key)`                     | 稳定行 key。                       |
| `renderEmpty` | `ReactNode \| (() => ReactNode)`                     | 单独使用 Table 时的空状态。        |
| `renderError` | `ReactNode \| (() => ReactNode)`                     | 单独使用 Table 时的错误状态。      |
| `loading`     | `boolean`                                            | 单独使用 Table 时的加载状态。      |
| `density`     | `"compact" \| "default" \| "comfortable"`            | 行高和内容密度。                   |
| `scroll`      | `SconeTableScroll`                                   | 明确的横向或局部滚动配置。         |
| `onRow`       | `(record: T) => HTMLAttributes<HTMLTableRowElement>` | 行级 DOM 行为。                    |
| `onCell`      | `(record: T, column: SconeTableColumn<T>) => HTMLAttributes<HTMLTableCellElement>` | 单元格级 DOM 行为。 |
| `className`   | `string`                                             | 样式。                             |

## Usage

- 只需要基础行列展示时使用 Table。
- 需要筛选、工具栏、分页交互、批量操作时使用 DataTable Pattern。

## Implementation Scope

- columns、rowKey、cell render、列宽、单行 ellipsis 和行操作列。
- 单独使用 Table 时可展示 loading、empty、error，优先级为 loading > error > empty。
- 横向 scroll，避免窄屏强行压缩列。

## Out Of Scope

- 完整 Ant Design `onChange` 聚合语义。
- 内置请求、服务端分页、权限过滤。
- 内置 filter bar、toolbar、pagination controls、selection checkbox column、bulk actions。
- 内置 `rowSelection`、`selectedCount` 或批量操作状态。
- 在 DataTable 内部重复渲染 loading、empty、error 或 pagination 区域。
- 虚拟滚动、可编辑单元格、复杂树表格、拖拽列宽、列顺序调整。
- fixed column、sticky header 和固定操作列；这些需要 DataTable/TableRegion 统一滚动和阴影边界。
- DataGrid 级别键盘模型。

## Column Rules

- `title` 使用可读文本或可访问节点。
- `dataIndex` 可用于简单取值；复杂展示使用 `render`。
- `render` 只负责单元格内容，不发起请求或修改全局状态。
- `width` 可以稳定列布局，但不保证固定列；固定列必须由 DataTable/TableRegion 统一滚动和阴影边界后再扩展。
- `ellipsis` 用于短文本单行截断；长说明、错误原因和必须阅读的信息不得只靠 ellipsis 隐藏。
- 操作列应有明确列标题或 `ariaLabel`，危险动作使用 `destructive` 并配合 Confirm recipe。

## shadcn/ui Mapping

- 可复用 shadcn Table 的基础结构和样式 token。
- 排序、筛选、列状态等复杂状态可在 DataTable recipe 中接入 TanStack Table。
- `SconeTable` 不暴露 TanStack 实例，也不复制 AntD Table API。
- `SconeTable` 放入 DataTable 时只渲染行列；selection column、selected count、pagination、loading/empty/error 区域由 `DataTable.TableRegion`、`DataTable.Toolbar` 和 `DataTable.Pagination` 负责。
