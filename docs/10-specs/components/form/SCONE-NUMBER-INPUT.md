# SconeNumberInput

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

数字输入。

| Prop                     | 类型                              | 说明             |
| ------------------------ | --------------------------------- | ---------------- |
| `value` / `defaultValue` | `number \| null`                  | 当前数值。       |
| `onValueChange`          | `(value: number \| null) => void` | 数值变化。       |
| `onValueCommit`          | `(value: number \| null) => void` | blur、Enter 或 stepper 完成后的提交值。 |
| `min` / `max`            | `number`                          | 数值范围。       |
| `step`                   | `number`                          | 步进。           |
| `precision`              | `number`                          | 小数位约束。     |
| `prefix` / `suffix`      | `ReactNode`                       | 单位或辅助符号。 |
| `disabled` / `readOnly`  | `boolean`                         | 禁用或只读。     |
| `invalid`                | `boolean`                         | 错误状态。       |
| `ariaLabel`              | `string`                          | 可访问名称。     |
| `className`              | `string`                          | 样式。           |

## Usage

- 精确数字输入、数量、阈值和百分比数值使用 NumberInput。
- 粗略视觉调节使用 Slider。

## Rules

- 基座使用原生 input；stepper 是可选 anatomy，不改变真实值模型。
- 显示格式和真实 number 值必须分离。
- 不内置货币、单位换算、业务范围或后端字段规则。

测试：

- 输入非法文本时不会提交错误 number；min/max/step/precision 行为可验证。
