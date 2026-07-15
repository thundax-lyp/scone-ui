---
title: SconeTable
sidebar_position: 20
---

# SconeTable

基础行列表格展示。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeTable` |
| 分类 | 数据展示 |
| 导入 | `import { SconeTable } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeTable } from "scone-ui";
import type { SconeTableProps } from "scone-ui";
```

## 使用

基础行列表格展示。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop          | 类型                                                                               | 说明                               |
| ------------- | ---------------------------------------------------------------------------------- | ---------------------------------- |
| `ariaLabel`   | `string`                                                                           | 表格可访问名称；无外部标题时必填。 |
| `columns`     | `SconeTableColumn&lt;T&gt;[]`                                                            | 列定义。                           |
| `dataSource`  | `T[]`                                                                              | 当前页或当前视图数据。             |
| `rowKey`      | `string \| ((record: T) => Key)`                                                   | 稳定行 key。                       |
| `renderEmpty` | `ReactNode \| (() => ReactNode)`                                                   | 单独使用 Table 时的空状态。        |
| `renderError` | `ReactNode \| (() => ReactNode)`                                                   | 单独使用 Table 时的错误状态。      |
| `loading`     | `boolean`                                                                          | 单独使用 Table 时的加载状态。      |
| `density`     | `"compact" \| "default" \| "comfortable"`                                          | 行高和内容密度。                   |
| `scroll`      | `SconeTableScroll`                                                                 | 明确的横向或局部滚动配置。         |
| `onRow`       | `(record: T) => HTMLAttributes&lt;HTMLTableRowElement&gt;`                               | 行级 DOM 行为。                    |
| `onCell`      | `(record: T, column: SconeTableColumn&lt;T&gt;) => HTMLAttributes&lt;HTMLTableCellElement&gt;` | 单元格级 DOM 行为。                |
| `className`   | `string`                                                                           | 样式。                             |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
