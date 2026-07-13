# SconeButton

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

基础按钮。

| Prop          | 类型                                            | 说明                         |
| ------------- | ----------------------------------------------- | ---------------------------- |
| `variant`     | `"primary" \| "secondary" \| "ghost" \| "link"` | 视觉层级。                   |
| `tone`        | SconeTone                                 | 语义色，默认 `default`。     |
| `destructive` | `boolean`                                       | 危险动作语义。               |
| `size`        | `"sm" \| "md" \| "lg"`                          | 控件尺寸。                   |
| `block`       | `boolean`                                       | 是否占满可用宽度。           |
| `type`        | `"button" \| "submit" \| "reset"`               | 原生按钮类型。               |
| `onClick`     | React.MouseEventHandler<HTMLButtonElement>                               | 点击事件。                   |
| `asChild`     | `boolean`                                       | 保留 shadcn/Radix 组合能力。 |
| `icon`        | `ReactNode`                                     | 图标。                       |
| `loading`     | `boolean`                                       | 加载。                       |
| `disabled`    | `boolean`                                       | 禁用。                       |
| `ariaLabel`   | `string`                                        | 无可见文本时必填。           |
| `className`   | `string`                                        | 样式。                       |

## Usage

- 普通操作、提交、链接式操作和图标按钮都使用 Button。
- 危险动作使用 `destructive`，确认流程由 Confirm 或业务侧组合。

## Rules

- `destructive` 不自动提供确认流程，危险确认使用 Confirm recipe。
- `loading` 默认禁用重复点击并保留内容尺寸。
- 表单提交按钮必须显式使用 `type="submit"`。
- shadcn mapping：基于 shadcn Button 样式调整和轻量包装，保留 `asChild` 与 `ref`。
