# SconeEmpty

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

空状态。

| Prop          | 类型        | 说明           |
| ------------- | ----------- | -------------- |
| `title`       | `ReactNode` | 空态标题。     |
| `description` | `ReactNode` | 解释或下一步。 |
| `image`       | `ReactNode` | 可选图像。     |
| `action`      | `ReactNode` | 恢复操作。     |
| `className`   | `string`    | 样式。         |

## Usage

- 正常无数据、筛选无结果或首次使用空态使用 Empty。
- 错误、权限不足和加载失败使用 Alert。

## Rules

- 空状态必须说明当前没有什么。
- 可恢复时提供明确操作入口。
- 错误、权限不足或加载失败不用 Empty。
