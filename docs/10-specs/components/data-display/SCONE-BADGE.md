# SconeBadge

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

计数、状态点和极轻量提示。

| Prop        | 类型               | 说明                           |
| ----------- | ------------------ | ------------------------------ |
| `count`     | `number \| string` | 计数。                         |
| `dot`       | `boolean`          | 点状状态。                     |
| `tone`      | SconeTone    | 语义色。                       |
| `overflow`  | `number`           | 数字溢出阈值，默认由实现定义。 |
| `ariaLabel` | `string`           | 无可读文本或 dot 状态时必填。  |
| `children`  | `ReactNode`        | 被标记对象。                   |
| `className` | `string`           | 样式。                         |

## Usage

- 用于计数、未读点或对象旁的轻量提示。
- 长状态文案使用 Tag。

## Rules

- Badge 不承载长文本枚举。
- 计数溢出必须稳定，例如超过 `overflow` 后展示 `99+`；不得在不同页面各自决定。
- `dot` 不能只靠颜色传递状态；必须通过相邻文本、`ariaLabel` 或被标记对象的可读状态说明补足语义。
- 空计数是否隐藏由实现固定，不让调用方在同一语义下产生两套展示规则。
