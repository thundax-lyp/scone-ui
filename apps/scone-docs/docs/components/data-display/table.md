---
title: SconeTable
sidebar_position: 20
---

# SconeTable

基础行列表格展示。

## 定位

- 站点分类：数据展示
- 导入入口：`"scone-ui"`
- API 权威：当前安装包的 `scone-ui/dist/index.d.ts`
- 规则来源：`scone-ui/PACKAGE-AI-GUIDE.md` 和仓库 specs

## 导入

```tsx
import { SconeTable } from "scone-ui";
```

类型也从 `"scone-ui"` 导入；封装组件时优先复用公共 props 类型，不要重新声明不完整 props。

## 何时使用

基础行列表格展示。

需要业务请求、权限判断、路由跳转、校验 schema 或产品文案时，由调用方应用组合，不写入组件内部。

## Props

下表来自 Scone specs，用于快速阅读组件能力。精确类型、默认值、泛型和 compound parts 仍以当前安装版本的 `scone-ui/dist/index.d.ts` 为准。

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

## 边界

- 不导入 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不按 Ant Design、shadcn、HTML 或历史记忆猜 props。
- 不在组件内实现产品业务流程。
