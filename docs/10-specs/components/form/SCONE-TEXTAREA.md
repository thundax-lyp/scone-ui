# SconeTextArea

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

多行文本输入。

| Prop                     | 类型                                                | 说明              |
| ------------------------ | --------------------------------------------------- | ----------------- |
| `value` / `defaultValue` | `string`                                            | 文本值。          |
| `onValueChange`          | `(value: string) => void`                           | 值变化。          |
| `rows`                   | `number`                                            | 默认行数。        |
| `autoSize`               | `boolean \| { minRows?: number; maxRows?: number }` | 自动高度。        |
| `maxLength`              | `number`                                            | 最大长度。        |
| `showCount`              | `boolean`                                           | 是否显示字数。    |
| `disabled`               | `boolean`                                           | 禁用。            |
| `readOnly`               | `boolean`                                           | 只读。            |
| `ariaLabel`              | `string`                                            | 无 label 时必填。 |
| `className`              | `string`                                            | 样式。            |

## Usage

- 多行备注、描述、JSON 片段等使用 TextArea。
- 富文本、Markdown 编辑不归入 TextArea。

## Rules

- 字数统计不能替代校验错误。
- 长文本错误信息由 Field message 承载。
- `autoSize` 不应造成布局抖动；超过 `maxRows` 后内部滚动。
- shadcn mapping：基于 Textarea 样式调整和 Field 状态补充。
