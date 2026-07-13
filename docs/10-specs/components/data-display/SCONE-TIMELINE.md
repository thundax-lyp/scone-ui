# SconeTimeline

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready |
| Layer | Component |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

时间线展示组件，用于通用事件序列、操作记录和状态历史展示。

| Prop        | 类型                  | 说明       |
| ----------- | --------------------- | ---------- |
| `items`     | `SconeTimelineItem[]` | 时间线项。 |
| `pending`   | `ReactNode`           | 进行中项。 |
| `reverse`   | `boolean`             | 是否倒序。 |
| `onItemClick` | `(item: SconeTimelineItem) => void` | 点击时间线项。 |
| `className` | `string`              | 样式。     |

## Usage

- 用于通用事件序列、操作记录和状态历史展示。
- 审批流程、权限操作和业务状态机由产品侧组合。

## Rules

- 只处理时间线结构和展示，不处理审计业务语义。
- 复杂审批、流程状态和权限操作属于业务组件。
