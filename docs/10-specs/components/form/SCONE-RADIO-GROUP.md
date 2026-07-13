# SconeRadioGroup

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

互斥单选组，用于少量互斥选项。

| Prop                     | 类型                         | 说明         |
| ------------------------ | ---------------------------- | ------------ |
| `options`                | `SconeOption<string>[]`      | 选项。       |
| `value` / `defaultValue` | `string`                     | 当前值。     |
| `onValueChange`          | `(value: string) => void`    | 状态变化。   |
| `orientation`            | `"horizontal" \| "vertical"` | 排列方向。   |
| `disabled`               | `boolean`                    | 整组禁用。   |
| `ariaLabel`              | `string`                     | 可访问名称。 |
| `className`              | `string`                     | 样式。       |

## Usage

- 少量互斥选项且需要直接比较时使用 RadioGroup。
- 选项多、需要搜索或远程加载时使用 Select/Combobox。

## Rules

- 选项少且需要直接比较时使用 RadioGroup。
- 选项多、需要搜索或远程加载时使用 Select/Combobox。
- shadcn mapping：基于 Radix Radio Group，保留 roving focus。

测试：

- 方向键切换选项；Field label/message 可关联；disabled option 不可选择。
