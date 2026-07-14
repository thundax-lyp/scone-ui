# SconeStatistic

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Component                                                |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

指标展示 primitive，可与 Card/Grid 组成 Dashboard Metric recipe。

| Prop          | 类型        | 说明         |
| ------------- | ----------- | ------------ |
| `title`       | `ReactNode` | 指标标题。   |
| `value`       | `ReactNode` | 指标值。     |
| `prefix`      | `ReactNode` | 前缀。       |
| `suffix`      | `ReactNode` | 后缀或单位。 |
| `description` | `ReactNode` | 辅助说明。   |
| `tone`        | SconeTone   | 语义色。     |
| `className`   | `string`    | 样式。       |

## Usage

- 单个指标用 Statistic；多个指标用 Card/Grid recipe 排列。
- 趋势解释、同比含义和业务口径由产品侧提供。

## Rules

- 只展示 title、value、prefix、suffix 和辅助说明。
- 趋势含义、同比和业务解释由产品侧组合。
