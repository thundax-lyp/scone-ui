# SconeAlert

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

页面内或区域内状态提示。

| Prop          | 类型        | 说明                       |
| ------------- | ----------- | -------------------------- |
| `tone`        | SconeTone   | 语义色。                   |
| `title`       | `ReactNode` | 标题。                     |
| `description` | `ReactNode` | 说明。                     |
| `icon`        | `ReactNode` | 图标。                     |
| `action`      | `ReactNode` | 与提示直接相关的单个操作。 |
| `role`        | `AriaRole`  | 覆盖默认播报语义。         |
| `className`   | `string`    | 样式。                     |

## Usage

- 页面内、区域内错误、警告、成功或信息提示使用 Alert。
- 空数据使用 Empty，短暂反馈使用 Toast。

## Rules

- 错误信息必须可读，不只展示错误码。
- `action` 只放与提示直接相关的操作。
- 不用 Alert 表达正常无数据；使用 Empty。
- `danger` 和 `warning` 默认使用 `role="alert"`；`neutral`、`info`、`success` 默认使用 `role="status"`；显式 `role` 优先。
