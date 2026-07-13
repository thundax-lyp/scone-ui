# SconeProgress

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

可量化进度展示。

| Prop        | 类型                               | 说明               |
| ----------- | ---------------------------------- | ------------------ |
| `value`     | `number`                           | 当前值。           |
| `max`       | `number`                           | 最大值，默认 100。 |
| `status`    | `"active" \| "success" \| "error"` | 任务状态。         |
| `showLabel` | `boolean`                          | 是否显示文本。     |
| `className` | `string`                           | 样式。             |

## Usage

- 上传、导入、批处理等可量化任务使用 Progress。
- 无法估算进度时使用 Loading。

## Rules

- 长任务进度必须配合状态文案。
- 未知时长等待使用 Loading。
