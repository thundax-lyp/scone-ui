# SconeSeparator

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Layout                                                   |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

分隔线，用于表单分组、菜单分组、详情区域和工具栏中的视觉分隔。

| Prop          | 类型                         | 说明       |
| ------------- | ---------------------------- | ---------- |
| `orientation` | `"horizontal" \| "vertical"` | 分隔方向。 |
| `decorative`  | `boolean`                    | 是否装饰。 |
| `className`   | `string`                     | 样式。     |

## Usage

- 用于菜单组、字段组、工具栏中的轻量视觉分隔。
- 语义分段使用 Section/FormSection，不靠 Separator 表达结构。

## Rules

- 默认作为装饰性分隔，不表达业务状态。
- 语义分段优先使用 Section，不靠 Separator 制造文档结构。
- shadcn mapping：基于 Separator 样式调整，保留 Radix 语义。
