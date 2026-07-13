# SconeList

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

基础列表展示。

| Prop          | 类型                                      | 说明       |
| ------------- | ----------------------------------------- | ---------- |
| `dataSource`  | `T[]`                                     | 数据源。   |
| `renderItem`  | `(item: T) => ReactNode`                  | 项渲染。   |
| `rowKey`      | `string \| ((item: T) => Key)`            | 稳定项 key。 |
| `loading`     | `boolean`                                 | 加载。     |
| `renderEmpty` | `ReactNode \| (() => ReactNode)`          | 空状态。   |
| `renderError` | `ReactNode \| (() => ReactNode)`          | 错误状态。 |
| `density`     | `"compact" \| "default" \| "comfortable"` | 信息密度。 |
| `bordered`    | `boolean`                                 | 边框。     |
| `className`   | `string`                                  | 样式。     |

## Usage

- 用于结构相同的重复项。
- 需要列对齐、排序或选择时使用 Table。

## Rules

- loading > error > empty。
- 列表项操作由 `renderItem` 组合，不内置业务 action schema。
