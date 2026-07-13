# DataTable

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Admin Pattern |
| Authority | [`ADMIN-PATTERNS-SPEC.md`](../ADMIN-PATTERNS-SPEC.md) |

Pattern 的层级、导出和组合边界以 [`ADMIN-UI-SPEC.md`](../ADMIN-UI-SPEC.md) 与 [`COMPONENT-SELECTION.md`](../COMPONENT-SELECTION.md) 为准。

Export status: Admin Pattern export. 可导出 compound parts；不得导出一个接收所有状态和请求配置的万能 `DataTable` 对象。

## Scope

DataTable 是数据管理 Pattern，由 `SconeTable`、`SconeToolbar`、FilterBar、Pagination 和批量操作组合。它不是完整 Ant Design Table。

## Anatomy

固定顺序：

1. `DataTable.Root`：承载状态上下文和布局边界。
2. `DataTable.FilterBar`：可选，承载搜索和筛选提交。
3. `DataTable.Toolbar`：承载标题补充、selected count、列设置入口和主要操作。
4. `DataTable.BulkActions`：可选，仅在有选中行时显示，通常靠近 toolbar。
5. `DataTable.TableRegion`：承载 `SconeTable`、loading、empty、error 和横向滚动。
6. `DataTable.Pagination`：承载 `SconePagination`，默认放在表格下方右侧或两端布局。

## State Ownership

- 调用方或 TanStack recipe 拥有 sorting、filtering、pagination、selection 和 column visibility 状态。
- `SconeTable` 只消费当前 `columns`、`dataSource`、`rowKey`、`density`、`scroll.x`、`onRow` 和 cell render。
- `DataTable.TableRegion` 负责 loading、empty、error 容器、横向滚动边界，以及 selection column 注入。
- `DataTable.Pagination` 是唯一分页交互区域；`SconeTable` 不接收 pagination prop。
- `TableRegion` 是表格局部滚动边界；垂直滚动需要显式高度 preset 或父容器约束，并通过 `SconeScrollArea` viewport slot 承载。
- `FilterBar` 只提交筛选意图，不直接修改 Table 内部状态。
- `selectedCount` 从 `selection.selectedRowKeys.length` 派生，不在 Toolbar 内单独维护。
- `BulkActions` 接收当前 selected keys/rows，不读取业务 store。
- `Pagination` 触发 `onChange(nextState, reason)` 后，由调用方更新查询状态和数据。
- `pageSize` 变化默认将 `page` 重置为 1；调用方需要保持当前页时必须显式计算 next state。

## Props And Events

| Part / prop | 类型 | 说明 |
| ----------- | ---- | ---- |
| `DataTable.Root` | `children`、`density`、`className` | 布局和上下文边界。 |
| `sorting` / `onSortingChange` | `SconeTableSorting[]` / `(sorting) => void` | 排序状态桥接；不在 Table 内聚合请求。 |
| `filters` / `onFiltersChange` | `Record<string, unknown>` / `(filters) => void` | 筛选状态桥接。 |
| `columnVisibility` / `onColumnVisibilityChange` | `Record<string, boolean>` / `(state) => void` | 列显隐状态桥接。 |
| `rowSelection` | `SconeRowSelection<T>` | 行选择状态桥接；变化事件只使用 `rowSelection.onChange`。 |
| `pagination` / `onPaginationChange` | `SconePaginationState` / `(nextState, reason) => void` | 分页状态桥接。 |
| `DataTable.Toolbar` | `title`、`start`、`end`、`actions`、`selectedCount` | 工具栏 slot，不拥有状态。 |
| `DataTable.BulkActions` | `selectedKeys`、`selectedRows`、`actions`、`onClearSelection()` | 批量操作区；清空选择时调用方应更新 `rowSelection.selectedRowKeys`。 |

## TableRegion Contract

| 能力                      | 所属层                              | 规则                                                                              |
| ------------------------- | ----------------------------------- | --------------------------------------------------------------------------------- |
| selection checkbox column | `DataTable.TableRegion`             | 根据 `DataTable.Root.rowSelection` 注入，基础 `SconeTable` 不拥有该 prop。        |
| selected count            | `DataTable.Toolbar` / `BulkActions` | 从 selection 派生，只展示不另存状态。                                             |
| pagination controls       | `DataTable.Pagination`              | 使用 `SconePagination`，不出现在 `SconeTable` 内。                                |
| loading/empty/error       | `DataTable.TableRegion`             | 状态优先级为 `loading > error > empty`；嵌入 DataTable 时基础 Table 只渲染 rows。 |
| horizontal scroll         | `SconeTable` + `TableRegion`        | Table 接收 `scroll.x`，Region 提供 overflow 容器。                                |
| vertical scroll           | `TableRegion`                       | 需要 `heightPreset` 或父约束；不支持虚拟滚动。                                    |

## TableRegion Props

| Part / prop          | 说明                                                                 |
| -------------------- | -------------------------------------------------------------------- |
| `children`           | 通常是 `SconeTable`，也可以是 TanStack recipe 产出的 table 组合。     |
| `loading`            | 数据加载状态；优先级高于 error 和 empty。                            |
| `error`              | 可读错误区块；优先级高于 empty。                                     |
| `empty`              | 空数据区块；仅在非 loading、非 error 且无数据时显示。                |
| `rowSelection`       | 不作为 `TableRegion` prop；由 `DataTable.Root.rowSelection` 提供，Region 只消费并注入选择列。 |
| `heightPreset`       | `sm`、`md`、`lg`、`full`；引用 Foundation layout size contract。      |
| `viewportClassName`  | 传给局部 scroll viewport；用于特殊页面覆盖，不改变主滚动所有权。     |
| `stickyHeader`       | `boolean`；只在 TableRegion viewport 内固定表头，不支持 fixed column。 |

## TableRegion Scroll Rules

- 横向滚动由 Region viewport 承载，`SconeTable.scroll.x` 只声明表格最小宽度或允许横向 overflow。
- 垂直滚动必须有 `heightPreset` 或父容器高度约束；禁止由 Table 自行接管 `overflow-y`。
- loading、empty、error 容器必须放在同一 viewport 边界内，保证 sticky、横向滚动和空态宽度一致。
- `SconePagination` 永远在 `DataTable.Pagination` 中渲染，不作为 `TableRegion` 或 `SconeTable` 的 prop。

## Recommended Structure

```tsx
<DataTable.Root>
    <DataTable.FilterBar />
    <DataTable.Toolbar />
    <DataTable.BulkActions />
    <DataTable.TableRegion>
        <SconeTable />
    </DataTable.TableRegion>
    <DataTable.Pagination />
</DataTable.Root>
```

## Implementation Scope

- columns、rowKey、cell render、row actions。
- loading、empty、error 容器。
- row selection column、selected count 和 bulk actions recipe。
- pagination 状态桥接。
- sorting 状态桥接。
- filtering 状态桥接。
- column visibility。
- sticky header。
- toolbar start/end slots。
- bulk actions recipe。

## Out of Scope

- 虚拟滚动。
- 可编辑单元格。
- 复杂树表格。
- 拖拽列宽和列顺序。
- fixed column / fixed action column。
- 完整 DataGrid 键盘模型。

## TanStack Table

复杂排序、筛选、分页和列状态可在 DataTable recipe 中使用 TanStack Table。`SconeTable` 不暴露 TanStack 实例，也不把 TanStack 作为所有基础表格的强依赖。
