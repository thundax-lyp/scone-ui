# SconeSlider

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

范围或数值滑杆，用于可视化调节低风险数值。

| Prop                     | 类型                        | 说明         |
| ------------------------ | --------------------------- | ------------ |
| `value` / `defaultValue` | `number[]`                  | 当前值。     |
| `onValueChange`          | `(value: number[]) => void` | 拖动变化。   |
| `onValueCommit`          | `(value: number[]) => void` | 拖动结束或键盘调整完成。 |
| `min` / `max`            | `number`                    | 范围。       |
| `step`                   | `number`                    | 步进。       |
| `disabled`               | `boolean`                   | 禁用。       |
| `ariaLabel`              | `string`                    | 可访问名称。 |
| `className`              | `string`                    | 样式。       |

## Usage

- 低风险、可视化的范围或数值调节使用 Slider。
- 需要精确输入时与 NumberInput 组合。

## Rules

- Slider 不替代精确数字输入；需要精确值时与 NumberInput 组合。
- 业务单位和影响说明放 FieldDescription。
- shadcn mapping：基于 Radix Slider。

测试：

- 键盘可调整值；min/max/step 生效；多 thumb 不互相穿越。
