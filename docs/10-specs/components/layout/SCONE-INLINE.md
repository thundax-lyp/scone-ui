# SconeInline

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Layout |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

水平排列容器，用于按钮组、短字段、标签组、表格行操作和紧凑元信息。

| Prop                  | 类型                                         | 说明                  |
| --------------------- | -------------------------------------------- | --------------------- |
| `gap`                 | SconeSpacingToken                                | 子项间距，默认 `sm`。 |
| `align`               | `"start" \| "center" \| "end" \| "baseline"` | 对齐方式。            |
| `wrap`                | `boolean`                                    | 是否换行。            |
| `split`               | `ReactNode`                                  | 可选分隔符。          |
| `children`            | `ReactNode`                                  | 子项。                |
| `className` / `style` | 通用                                         | 局部样式覆盖。        |

## Usage

- 水平排列按钮、标签、短元信息和表格行操作。
- 空间不足时打开 `wrap`，不要压缩文本到不可读。

## Rules

- 操作区默认使用 `wrap` 适配窄屏。
- `split` 只用于视觉分隔，不表达层级或状态。
