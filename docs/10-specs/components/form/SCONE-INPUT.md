# SconeInput

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

单行文本输入。

| Prop                     | 类型                                       | 说明                  |
| ------------------------ | ------------------------------------------ | --------------------- |
| `value` / `defaultValue` | `string`                                   | 受控或非受控值。      |
| `onValueChange`          | `(value: string) => void`                  | 值变化。              |
| `onChange`               | React.ChangeEventHandler<HTMLInputElement> | 可选原生事件透传。    |
| `placeholder`            | `string`                                   | 占位说明。            |
| `allowClear`             | `boolean`                                  | 清空按钮。            |
| `onClear`                | `() => void`                               | 用户点击清空按钮。    |
| `disabled`               | `boolean`                                  | 禁用。                |
| `readOnly`               | `boolean`                                  | 只读。                |
| `prefix` / `suffix`      | `ReactNode`                                | 装饰或辅助元素。      |
| `size`                   | `"sm" \| "md" \| "lg"`                     | 控件尺寸。            |
| `ariaLabel`              | `string`                                   | 无可见 label 时必填。 |
| `className`              | `string`                                   | 样式。                |

## Usage

- 单行文本、编号、短值输入使用 Input。
- 需要多行文本使用 TextArea；需要选择值使用 Select/Combobox。

## Rules

- placeholder 不能替代 label。
- `invalid`、description 和 message 由 Field 关联。
- `readOnly` 必须与 disabled 可区分。
- shadcn mapping：基于 shadcn Input 样式调整和状态补充。
