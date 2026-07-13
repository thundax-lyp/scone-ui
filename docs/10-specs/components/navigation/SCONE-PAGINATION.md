# SconePagination

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

分页控制，用于表格、列表和搜索结果。

| Prop        | 类型                                                                             | 说明           |
| ----------- | -------------------------------------------------------------------------------- | -------------- |
| `state`     | `SconePaginationState`                                                           | 受控分页状态。 |
| `onChange`  | `(nextState: SconePaginationState, reason: SconePaginationChangeReason) => void` | 状态变化。     |
| `density`   | `"compact" \| "default"`                                                         | 信息密度。     |
| `className` | `string`                                                                         | 样式。         |

## Usage

- 表格、列表和搜索结果的分页控制使用 Pagination。
- 数据请求、URL 同步和游标分页由调用方或 DataTable Pattern 处理。

## Rules

- Pagination 只表达分页状态和交互，不发起请求。
- DataTable Pattern 决定它放在 toolbar、table footer 或页面底部。
- `pageSize` 变化默认提交 `{ page: 1, pageSize, total }`。
- 窄屏下可折叠为简化上一页/下一页模式。
