# SconeStack

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Layout |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

垂直排列容器，用于字段组、内容段落、列表局部区域和页面内轻量 rhythm。

| Prop                  | 类型                                        | 说明                  |
| --------------------- | ------------------------------------------- | --------------------- |
| `gap`                 | SconeSpacingToken                               | 子项间距，默认 `md`。 |
| `align`               | `"start" \| "center" \| "end" \| "stretch"` | 交叉轴对齐。          |
| `children`            | `ReactNode`                                 | 子项。                |
| `className` / `style` | 通用                                        | 局部样式覆盖。        |

## Usage

- 垂直堆叠字段组、段落、列表片段和局部内容块。
- 页面根结构使用 Page Pattern，不用 Stack 承担整页布局。

## Rules

- 不改变子项语义，不自动插入标题、分隔线或状态。
- 不用作页面根容器；页面根使用 Page Pattern。
- `gap` 不接受任意 number；特殊间距通过 `className` 处理。
