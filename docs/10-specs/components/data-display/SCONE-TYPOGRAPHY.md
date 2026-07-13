# SconeTypography

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

文本、标题、段落的基础排版能力。

导出目标：

- `SconeText`
- `SconeTitle`
- `SconeParagraph`

| Prop        | 类型                                                         | 说明             |
| ----------- | ------------------------------------------------------------ | ---------------- |
| `as`        | keyof JSX.IntrinsicElements                                            | 渲染标签。       |
| `size`      | `"sm" \| "md" \| "lg"`                                       | 文本尺寸。       |
| `weight`    | `"regular" \| "medium" \| "semibold"`                        | 字重。           |
| `tone`      | `"default" \| "muted" \| "danger" \| "success" \| "warning"` | 文本语义。       |
| `truncate`  | `boolean \| number`                                          | 单行或多行截断。 |
| `children`  | `ReactNode`                                                  | 内容。           |
| `className` | `string`                                                     | 样式。           |

## Usage

- `SconeTitle` 用于 section/card 内标题，不替代 PageHeader。
- `SconeText` 用于短文本、元信息和标签旁说明。
- `SconeParagraph` 用于说明段落和长文本。

## Rules

- 保持可读对比度和语义 HTML。
- 不内置业务文案样式。
