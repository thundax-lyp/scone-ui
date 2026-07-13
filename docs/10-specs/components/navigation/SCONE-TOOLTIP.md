# SconeTooltip

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

短提示，用于解释图标按钮、缩写或轻量辅助信息。

| Prop        | 类型                                     | 说明         |
| ----------- | ---------------------------------------- | ------------ |
| `content`   | `ReactNode`                              | 短提示内容。 |
| `children`  | `ReactNode`                              | 触发元素。   |
| `open` / `defaultOpen` | `boolean`                      | 打开状态。   |
| `onOpenChange` | `(open: boolean) => void`             | 打开状态变化。 |
| `side`      | `"top" \| "right" \| "bottom" \| "left"` | 出现方向。   |
| `delay`     | `number`                                 | 出现延迟。   |
| `className` | `string`                                 | 样式。       |

## Usage

- 图标按钮、缩写或短辅助说明使用 Tooltip。
- 必读说明、错误原因和可点击内容不用 Tooltip。

## Rules

- Tooltip 只放短解释，不放按钮、表单或复杂交互。
- 必读说明、错误原因和阻断性信息使用 FieldDescription、FieldMessage 或 Alert。
- shadcn mapping：基于 Tooltip 包装，source strategy 为 `vendored-shadcn`；统一 delay、side、token 和可访问测试。

测试：

- hover/focus 显示，Escape 或 blur 关闭；触发器可通过可访问名称查询。
