# SconeSwitch

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

布尔切换。

| Prop                         | 类型                         | 说明                  |
| ---------------------------- | ---------------------------- | --------------------- |
| `checked` / `defaultChecked` | `boolean`                    | 当前开关状态。        |
| `onCheckedChange`            | `(checked: boolean) => void` | 状态变化。            |
| `disabled`                   | `boolean`                    | 禁用。                |
| `ariaLabel`                  | `string`                     | 无可见 label 时必填。 |
| `className`                  | `string`                     | 样式。                |

## Usage

- 即时启停设置使用 Switch。
- 多选集合或需要提交前确认的布尔值使用 Checkbox。

## Rules

- Switch 表达即时启停，不用于多选集合。
- 长说明放 FieldDescription，错误放 FieldMessage。
- shadcn mapping：基于 Radix Switch，保留 `role="switch"` 和 checked 语义。

测试：

- Space/Enter 可切换；disabled 不可切换；Field label 与控件关联。
