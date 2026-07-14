# FilterBar

## Metadata

| Field     | Value                                                 |
| --------- | ----------------------------------------------------- |
| Status    | Ready                                                 |
| Layer     | Admin Pattern                                         |
| Authority | [`ADMIN-PATTERNS-SPEC.md`](../ADMIN-PATTERNS-SPEC.md) |

Pattern 的层级、导出和组合边界以 [`ADMIN-UI-SPEC.md`](../ADMIN-UI-SPEC.md) 与 [`COMPONENT-SELECTION.md`](../COMPONENT-SELECTION.md) 为准。

Export status: Admin Pattern export. FilterBar 可作为 DataTable part 导出，也可在列表页单独组合。

## Scope

FilterBar 是列表页筛选 Pattern，不是字段状态库。

## Anatomy

- search input：主搜索。
- filter fields：少量高频筛选项。
- actions：查询、重置、展开更多。
- summary：可选，展示已选筛选条件。

## Props And Events

| Prop / event                         | 类型                                                                         | 说明               |
| ------------------------------------ | ---------------------------------------------------------------------------- | ------------------ |
| `searchValue` / `defaultSearchValue` | `string`                                                                     | 主搜索文本。       |
| `onSearchChange`                     | `(value: string) => void`                                                    | 搜索文本变化。     |
| `filters` / `defaultFilters`         | `Record<string, unknown>`                                                    | 筛选值集合。       |
| `onFiltersChange`                    | `(filters: Record<string, unknown>) => void`                                 | 任一筛选值变化。   |
| `onApply`                            | `(state: { searchValue: string; filters: Record<string, unknown> }) => void` | 用户提交筛选。     |
| `onReset`                            | `() => void`                                                                 | 用户重置筛选。     |
| `expanded` / `defaultExpanded`       | `boolean`                                                                    | 更多筛选展开状态。 |
| `onExpandedChange`                   | `(expanded: boolean) => void`                                                | 展开状态变化。     |
| `children`                           | `ReactNode`                                                                  | 自定义筛选字段。   |
| `className`                          | `string`                                                                     | 样式。             |

## Rules

- 简单筛选优先横向排布，窄屏允许换行。
- 超过 3-5 个筛选项时使用展开区或 Drawer recipe。
- `onApply` 和 `onReset` 属于 Pattern 回调，不进入基础 input/select。
- 筛选表单不使用完整编辑表单的提交区样式。
