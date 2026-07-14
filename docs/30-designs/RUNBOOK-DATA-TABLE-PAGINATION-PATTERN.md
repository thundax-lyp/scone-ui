# DataTable + Pagination Pattern RUNBOOK

## Purpose

完成列表管理页核心闭环：`SconePagination`、`DataTable` compound parts、selection、loading/error/empty、Toolbar、BulkActions、TableRegion 和 FilterBar slot 能以受控状态方式组合，形成可测试、可导出的 admin-ui Pattern。

闭环完成后，调用方可以按以下结构组合列表管理页，不需要把分页、批量操作、筛选状态或数据请求逻辑塞进基础 `SconeTable`：

```tsx
<DataTable.Root rowSelection={rowSelection} pagination={pagination}>
    <DataTable.FilterBar>{filterControls}</DataTable.FilterBar>
    <DataTable.Toolbar title="Users" actions={createAction} />
    <DataTable.BulkActions actions={bulkActions} />
    <DataTable.TableRegion columns={columns} dataSource={rows} rowKey="id" />
    <DataTable.Pagination />
</DataTable.Root>
```

## Scope

- `src/components/navigation/pagination.tsx`
- `src/components/navigation/pagination.test.tsx`
- `src/components/navigation/index.ts`
- `src/patterns/data-table.tsx`
- `src/patterns/data-table.test.tsx`
- `src/patterns/index.ts`
- `src/index.ts`
- `src/types/foundation.ts`
- `src/types/foundation.test.ts`

实现目标以以下文档为准：

- `docs/10-specs/components/navigation/SCONE-PAGINATION.md`
- `docs/10-specs/patterns/DATA-TABLE.md`
- `docs/10-specs/FOUNDATIONS-SPEC.md`
- `docs/30-designs/admin-ui/PATTERN-DESIGN.md`
- `docs/30-designs/admin-ui/VERIFICATION-DESIGN.md`

## Non-goals

- 不实现独立 `src/patterns/filter-bar.tsx`；本轮 `DataTable.FilterBar` 只提供 slot 边界。
- 不实现产品级筛选字段、业务查询、权限判断、路由同步、请求状态机或筛选 schema。
- 不把 `pagination`、`rowSelection`、批量操作或 FilterBar 状态加入基础 `SconeTable` props。
- 不引入 TanStack Table 作为默认依赖；外部状态库只能通过调用方持有的 props/callback 接入。
- 不实现虚拟滚动、可编辑单元格、树表格、拖拽列宽、拖拽列顺序、fixed column 或完整 DataGrid 键盘模型。
- 不新增产品应用 UI 规则或业务页面 recipe。

## Data Structures

本轮新增或补齐的数据结构必须精确到以下字段；字段名和事件语义不得漂移。

### `SconePaginationState`

文件：`src/types/foundation.ts`。

```ts
export interface SconePaginationState {
    page: number;
    pageSize: number;
    total: number;
}
```

- `page`：当前页，从 1 开始。
- `pageSize`：每页条数。
- `total`：总条数。

### `SconePaginationChangeReason`

文件：`src/types/foundation.ts`。

```ts
export type SconePaginationChangeReason = "page" | "pageSize";
```

- `"page"`：上一页、下一页或页码按钮触发。
- `"pageSize"`：每页条数控件触发；默认提交的 next state 必须把 `page` 设为 `1`。

### `SconeRowSelection<T>`

文件：`src/types/foundation.ts`。

```ts
export interface SconeRowSelection<T> {
    selectedRowKeys: Key[];
    onChange?: (keys: Key[], rows: T[]) => void;
    getCheckboxProps?: (record: T) => {
        disabled?: boolean;
        ariaLabel?: string;
    };
}
```

- `selectedRowKeys`：当前选中行 key，由调用方持有。
- `onChange`：选择变化事件；DataTable 只发出 keys 和 rows，不写业务 store。
- `getCheckboxProps`：逐行选择控件属性；仅支持 `disabled` 与 `ariaLabel`。

### `DataTable.Root` 状态桥接字段

文件：`src/patterns/data-table.tsx`。

```ts
export interface DataTableRootProps<T> extends React.HTMLAttributes<HTMLDivElement> {
    density?: SconeDensity;
    rowSelection?: SconeRowSelection<T>;
    pagination?: SconePaginationState;
    onPaginationChange?: (
        nextState: SconePaginationState,
        reason: SconePaginationChangeReason,
    ) => void;
}
```

- `density`：传给 Toolbar、TableRegion 和 Table 的密度默认值。
- `rowSelection`：Root 持有并供 `TableRegion`、`Toolbar`、`BulkActions` 消费。
- `pagination` / `onPaginationChange`：Root 持有并供 `DataTable.Pagination` 消费。

### `SconePaginationProps`

文件：`src/components/navigation/pagination.tsx`。

```ts
export interface SconePaginationProps
    extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
    ariaLabel?: string;
    state: SconePaginationState;
    onChange?: (nextState: SconePaginationState, reason: SconePaginationChangeReason) => void;
    pageSizeOptions?: number[];
    density?: "compact" | "default";
}
```

- `ariaLabel`：传给根 `nav`；默认可使用 `"Pagination"`。
- `state`：唯一分页数据来源。
- `onChange`：唯一分页变更出口。
- `pageSizeOptions`：page size `select` 的选项；默认值由组件内固定，如 `[10, 20, 50, 100]`。
- `density`：控制按钮和 select 的高度、间距，不改变交互语义。

### `DataTable` Action 字段

文件：`src/patterns/data-table.tsx`。

```ts
export interface DataTableAction {
    key: Key;
    label: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}
```

- `key`：action 列表稳定 key。
- `label`：按钮展示内容。
- `onClick`：按钮点击事件，只表达 UI 意图。
- `disabled`：按钮禁用状态。

`DataTable.Toolbar` 与 `DataTable.BulkActions` 都使用该字段，不引入业务 command、权限或请求描述。

### `DataTable.TableRegion` 数据模式字段

文件：`src/patterns/data-table.tsx`。

```ts
export interface DataTableTableRegionProps<T>
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    ariaLabel?: string;
    columns?: SconeTableColumn<T>[];
    dataSource?: T[];
    rowKey?: string | ((record: T) => Key);
    children?: React.ReactNode;
    loading?: boolean;
    error?: React.ReactNode | (() => React.ReactNode);
    empty?: React.ReactNode | (() => React.ReactNode);
    heightPreset?: "sm" | "md" | "lg" | "full";
    viewportClassName?: string;
    stickyHeader?: boolean;
    scroll?: SconeTableScroll;
}
```

- 数据模式：当 `columns`、`dataSource`、`rowKey` 同时存在时，`TableRegion` 内部渲染 `SconeTable`，并根据 `Root.rowSelection` 注入 selection column。
- children 模式：当使用 `children` 时，`TableRegion` 只提供 viewport 和状态容器，不自动注入 selection column。
- 状态优先级固定为 `loading > error > empty > table content`。

### `DataTable.Pagination` 字段

文件：`src/patterns/data-table.tsx`。

```ts
export interface DataTablePaginationProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    state?: SconePaginationState;
    onChange?: (nextState: SconePaginationState, reason: SconePaginationChangeReason) => void;
    pageSizeOptions?: number[];
}
```

- 未传 `state` 时读取 `DataTable.Root.pagination`。
- 未传 `onChange` 时读取 `DataTable.Root.onPaginationChange`。
- `pageSizeOptions` 透传给 `SconePagination`。
- 当 props 与 Root context 同时存在时，props 优先，便于局部覆盖和测试。

## Plan

### Task 1: Foundation Types

文件：

- `src/types/foundation.ts`
- `src/types/foundation.test.ts`
- `src/index.ts`

产出：

- 新增 `SconePaginationState`、`SconePaginationChangeReason`、`SconeRowSelection<T>`。
- `SconeRowSelection<T>.selectedRowKeys` 使用既有 `Key[]`。
- `SconeRowSelection<T>.getCheckboxProps(record)` 只允许返回 `disabled` 和 `ariaLabel`。
- `src/index.ts` 导出新增类型。

测试断言：

- `SconePaginationState` 允许 `{ page: 1, pageSize: 10, total: 57 }`。
- `SconePaginationChangeReason` 只接受 `"page"` 和 `"pageSize"`。
- `SconeRowSelection<T>` 的 `onChange` 参数顺序固定为 `(keys, rows)`。
- 类型测试不创建组件、不引入运行时状态。

### Task 2: SconePagination Component

文件：

- `src/components/navigation/pagination.tsx`
- `src/components/navigation/pagination.test.tsx`
- `src/components/navigation/index.ts`
- `src/index.ts`

产出：

- 新增 `SconePagination` 和 `SconePaginationProps`。
- 新建 `src/components/navigation/index.ts`，导出 `SconePagination` 和 `SconePaginationProps`。
- `src/index.ts` 汇总导出 navigation 组件和分页类型。

前端控件和操作：

- 根节点使用 `nav` 语义，支持 `aria-label`。
- 上一页按钮：当前 `page <= 1` 时 disabled；点击提交 `{ ...state, page: page - 1 }`，reason 为 `"page"`。
- 下一页按钮：当前 `page >= pageCount` 时 disabled；点击提交 `{ ...state, page: page + 1 }`，reason 为 `"page"`。
- 页码按钮：显示当前页附近的页码；点击提交 `{ ...state, page }`，reason 为 `"page"`；当前页有 `aria-current="page"`。
- page size 控件：使用原生 `select`；变更提交 `{ page: 1, pageSize, total: state.total }`，reason 为 `"pageSize"`。
- 总数文本：展示 `total` 和当前页范围，例如 `1-10 / 57`；只展示，不参与计算状态所有权。
- `density="compact"` 缩小按钮和 select 高度；`density="default"` 使用默认控制高度。

测试断言：

- 组件只消费 `state` 并发出 `onChange`，不发起请求、不读取 URL、不内部持久化分页状态。
- `page=1` 时上一页按钮 disabled。
- `page=pageCount` 时下一页按钮 disabled。
- 点击页码按钮调用 `onChange(nextState, "page")`。
- 修改 page size 调用 `onChange({ page: 1, pageSize, total }, "pageSize")`。
- 当前页按钮存在 `aria-current="page"`。
- `density` 和 `className` 落到可断言 DOM。

### Task 3: DataTable Root, Toolbar, BulkActions, FilterBar Slot

文件：

- `src/patterns/data-table.tsx`
- `src/patterns/data-table.test.tsx`
- `src/patterns/index.ts`
- `src/index.ts`

产出：

- 新增 `DataTable.Root`、`DataTable.FilterBar`、`DataTable.Toolbar`、`DataTable.BulkActions`。
- 新增 `DataTableAction` 以及上述 parts 的 props 类型。
- 新建 `src/patterns/index.ts`，导出 `DataTable` 与 DataTable 类型。
- `src/index.ts` 汇总导出 pattern 公共面。

前端控件和操作：

- `DataTable.Root`：渲染纵向布局容器，提供 density、rowSelection、pagination 和 onPaginationChange context。
- `DataTable.FilterBar`：渲染 slot 容器；接受 `children`，不定义 search 字段、不定义 filters schema、不提交筛选状态。
- `DataTable.Toolbar`：复用 `SconeToolbar`；支持 `title`、`start`、`end`、`actions`；当 Root 有 selection 时展示 selected count。
- `DataTable.BulkActions`：当 selected count 为 0 时不渲染批量操作控件；当 selected count 大于 0 时展示 selected count、`actions` 和清空选择按钮。
- action 按钮：按 `DataTableAction[]` 渲染 `button type="button"`；`disabled` 时不可点击；点击调用对应 `onClick`。
- 清空选择按钮：点击调用 `onClearSelection`；若未传入 `onClearSelection` 且 Root 有 `rowSelection.onChange`，提交 `([], [])`。

测试断言：

- Toolbar 和 BulkActions 只展示状态和发出意图，不读取业务 store。
- `selectedCount` 从 `rowSelection.selectedRowKeys.length` 派生，不单独维护。
- `DataTable.FilterBar` 本轮只作为 slot；后续独立 FilterBar Pattern 不在本任务实现。
- `DataTable.Toolbar` DOM 中能识别 `data-scone-layout="toolbar"`。
- `selectedRowKeys.length === 0` 时 `BulkActions` 不显示 action 按钮。
- 点击清空选择按钮会提交空 keys 和空 rows。

### Task 4: DataTable TableRegion and Pagination

文件：

- `src/patterns/data-table.tsx`
- `src/patterns/data-table.test.tsx`
- `src/components/navigation/pagination.tsx`
- `src/index.ts`

产出：

- 新增 `DataTable.TableRegion` 和 `DataTable.Pagination`。
- `DataTable.TableRegion` 数据模式内部组合既有 `SconeTable`，但不修改 `SconeTableProps`。
- `DataTable.Pagination` 内部组合 `SconePagination`。

前端控件和操作：

- `DataTable.TableRegion`：渲染局部 viewport，负责表格区域的 loading、error、empty 和横向滚动边界。
- loading 状态：显示 `role="status"`，隐藏 error、empty 和 table content。
- error 状态：显示 `role="alert"`，隐藏 empty 和 table content。
- empty 状态：仅在非 loading、非 error 且 `dataSource.length === 0` 时显示。
- 数据模式 selection column：当 Root 存在 `rowSelection` 且 TableRegion 使用 `columns/dataSource/rowKey` 时，在最左侧注入 checkbox column。
- 表头 checkbox：全选当前可选页数据；indeterminate 时通过 `aria-checked="mixed"` 表达。
- 行 checkbox：根据 `getCheckboxProps(record).disabled` 禁用；点击后调用 `rowSelection.onChange(nextKeys, nextRows)`。
- children 模式：保留 `children` 渲染，不自动注入 selection column。
- `DataTable.Pagination`：唯一渲染 `SconePagination`；从 Root 读取 `pagination` 和 `onPaginationChange`。

测试断言：

- 不把 `rowSelection` 或 `pagination` 加进 `SconeTableProps`。
- `SconeTable` 如需配合 DataTable，应只接受已有 `columns`、`dataSource`、`rowKey`、`density`、`scroll` 和 render 相关 props。
- `DataTable.Pagination` 不允许出现在 `TableRegion` 内部。
- loading 优先于 error 和 empty。
- error 优先于 empty。
- 空数组数据在非 loading/error 时显示 empty。
- 数据模式会出现表头 checkbox 和行 checkbox。
- disabled row checkbox 不参与全选。
- children 模式不会自动出现 selection checkbox。
- `DataTable.Pagination` 会把 `SconePagination` 的 `onChange` 透传到 Root 或 props 回调。

### Task 5: Export and Integration Tests

文件：

- `src/index.ts`
- `src/index.test.ts`
- `src/components/navigation/index.ts`
- `src/patterns/index.ts`

产出：

- `src/components/navigation/index.ts` 导出 `SconePagination` 和 `SconePaginationProps`。
- `src/patterns/index.ts` 导出 `DataTable` 和 DataTable props 类型。
- `src/index.ts` 汇总导出 navigation、patterns 和 foundation 新类型。
- 不修改 root `README.md` 作为实现依据。

测试断言：

- `src/index.test.ts` 可以从公共入口导入 `SconePagination`。
- `src/index.test.ts` 可以从公共入口导入 `DataTable`。
- `src/index.test.ts` 可以从公共入口导入分页和 selection 类型。
- 不要求在 `src/index.test.ts` 重复测试组件交互。

## Verification

执行实现后，至少运行：

```bash
pnpm test -- src/types/foundation.test.ts
pnpm test -- src/components/navigation/pagination.test.tsx src/patterns/data-table.test.tsx
pnpm test -- src/index.test.ts
pnpm typecheck
pnpm lint
```

验收标准：

- `SconePagination` 只表达受控分页状态，不发起请求。
- `pageSize` 变化默认提交第一页。
- `DataTable.Pagination` 是 DataTable 内唯一分页入口。
- `DataTable.TableRegion` 的状态优先级固定为 `loading > error > empty`。
- selection 状态由调用方拥有，DataTable 只通过 props/context 展示和发出选择意图。
- `SconeTable` 公共 API 不被扩展成列表管理页万能表格。
- 公共导出面与 spec 中的 Navigation 和 Admin Pattern export 保持一致。

## Closure

任务完成并经审核后删除本 RUNBOOK。若实现过程中产生长期有效的验证证据，将结论沉淀到 `docs/40-readiness/`；若产生稳定规则变更，先迁移到 `docs/00-governance/`，再删除本 RUNBOOK。
