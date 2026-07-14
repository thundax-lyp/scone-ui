# SconeToolbar

## Metadata

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Status    | Ready                                                    |
| Layer     | Layout                                                   |
| Authority | [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) |

源策略、导出状态和跨组件词汇以 [`COMPONENT-SELECTION.md`](../../COMPONENT-SELECTION.md) 与 [`FOUNDATIONS-SPEC.md`](../../FOUNDATIONS-SPEC.md) 为准。

操作区布局 primitive。它只解决 start/end/children 的布局，不判断操作属于页面、表格还是批量选择。

| Prop        | 类型                     | 说明                                           |
| ----------- | ------------------------ | ---------------------------------------------- |
| `start`     | `ReactNode`              | 左侧内容，通常是筛选摘要、标题补充或批量状态。 |
| `end`       | `ReactNode`              | 右侧操作，通常是按钮组或更多操作。             |
| `children`  | `ReactNode`              | 完全自定义内容。                               |
| `density`   | `"compact" \| "default"` | 工具栏信息密度。                               |
| `className` | `string`                 | 样式。                                         |

## Usage

- 页面头部、表格上方、批量操作条都可以复用 Toolbar 做 start/end 布局。
- 业务状态、选中数量和权限判断由 Pattern 或调用方提供。

## Rules

- header 右侧操作统一称为 `actions`，但 Toolbar primitive 自身使用 `start` / `end` 描述布局。
- 工具栏窄屏允许换行；主操作保留在可见区域，次要操作收纳到 Dropdown。
- 不内置 selected count、filter open 或权限逻辑。
