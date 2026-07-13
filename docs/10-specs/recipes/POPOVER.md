# Popover Recipe

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready Boundary |
| Layer | Recipe |
| Authority | [`README.md`](../README.md) |

Recipe 不导出独立 `Scone*` 组件；按本文档组合底层组件并验证边界。

Popover 是可交互浮层 recipe，不作为独立高层组件导出。

Recipe API：

| 字段        | 类型                                     | 说明         |
| ----------- | ---------------------------------------- | ------------ |
| `trigger`   | `ReactNode`                              | 触发器。     |
| `content`   | `ReactNode`                              | 浮层内容。   |
| `side`      | `"top" \| "right" \| "bottom" \| "left"` | 出现方向。   |
| `align`     | `"start" \| "center" \| "end"`           | 对齐。       |
| `modal`     | `boolean`                                | 是否 modal。 |
| `className` | `string`                                 | 样式。       |

使用 Popover：

- 需要承载按钮、筛选小面板或复杂说明。
- 内容不适合 Tooltip，但也不需要 Dialog 的任务隔离。

## Usage

- 用 Radix/shadcn Popover parts 组合交互浮层。
- 产品侧提供具体内容和动作，admin-ui 只记录 recipe 边界。

## Rules

- 必须继承 Radix Popover 焦点和关闭行为。
- 不承载危险确认；危险确认使用 Confirm。
