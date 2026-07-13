# Grid Recipe

## Metadata

| Field | Value |
| ----- | ----- |
| Status | Ready Boundary |
| Layer | Recipe |
| Authority | [`README.md`](../README.md) |

Recipe 不定义万能组件 API；按本文档组合基础组件、Layout 和 Pattern。

Grid 是布局 recipe，不作为独立 `SconeGrid` 组件。它用于指标卡组、设置项矩阵、对象卡片组和详情辅助区。

## Recommended Structure

- 使用 CSS grid 或 Tailwind grid utilities，由 Page/Section/Card 提供外层语义。
- 列数使用响应式 preset，例如 `base: 1`、`md: 2`、`xl: 3`，不在组件库中新增任意 `columns` API。
- 间距引用 Foundation `SconeSpacingToken`，默认跟随所在 Section 的 density。
- 卡片组内每个 Card 独立表达 loading/empty/error；Grid 不拥有数据状态。

## Usage

- 多个同类 Card、Statistic 或设置块需要规则排列。
- Dashboard Metric、SettingsPage 和对象摘要区需要响应式列数。

## Non Goals

- 需要行列语义、排序、分页或选择时，使用 Table/DataTable。
- 只是字段排列时，使用 Form layout、FieldGroup 或 Stack/Inline。
- 需要主从视图或可调整宽度时，使用 SplitPane/MasterDetail。
