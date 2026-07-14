# SconeCompact

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Layout                                                   |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

紧凑组合容器，用于按钮组、输入组合和表格行操作。

| Prop          | 类型                         | 说明                        |
| ------------- | ---------------------------- | --------------------------- |
| `orientation` | `"horizontal" \| "vertical"` | 排列方向，默认 horizontal。 |
| `size`        | `"sm" \| "md"`               | 子项协调尺寸。              |
| `children`    | `ReactNode`                  | 子项。                      |
| `className`   | `string`                     | 样式。                      |

## Usage

- 紧邻组合多个按钮或输入附加操作。
- 需要单选切换时使用 Segmented，不用 Compact 模拟状态。

## Rules

- 默认水平排列，子项之间共享边界或紧邻排布。
- 不新增业务文案，不推导选中状态。
- 表格行操作优先使用图标按钮或短文本，溢出操作进入 Dropdown recipe。
- Compact 只负责视觉组合，不负责 roving focus；需要单选模式切换时使用 Segmented。
- 子项 disabled/loading 状态由子项自身管理。
- shadcn mapping：可基于 Button Group/Input Group 组合样式实现，不引入新的交互 primitive。
