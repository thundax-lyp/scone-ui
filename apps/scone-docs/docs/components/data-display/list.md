---
title: SconeList
sidebar_position: 20
---

# SconeList

简单记录列表。

## 快速信息

| 项 | 值 |
| --- | --- |
| 导出 | `SconeList` |
| 分类 | 数据展示 |
| 导入 | `import { SconeList } from "scone-ui";` |
| 类型权威 | `scone-ui/dist/index.d.ts` |

## 导入

```tsx
import { SconeList } from "scone-ui";
import type { SconeListProps } from "scone-ui";
```

## 使用

简单记录列表。

请求、路由、权限、校验 schema 和产品文案留在调用方应用。

## Props

Props 表用于快速阅读组件能力；精确类型、默认值和泛型以 `scone-ui/dist/index.d.ts` 为准。

| Prop          | 类型                                      | 说明         |
| ------------- | ----------------------------------------- | ------------ |
| `dataSource`  | `T[]`                                     | 数据源。     |
| `renderItem`  | `(item: T) => ReactNode`                  | 项渲染。     |
| `rowKey`      | `string \| ((item: T) => Key)`            | 稳定项 key。 |
| `loading`     | `boolean`                                 | 加载。       |
| `renderEmpty` | `ReactNode \| (() => ReactNode)`          | 空状态。     |
| `renderError` | `ReactNode \| (() => ReactNode)`          | 错误状态。   |
| `density`     | `"compact" \| "default" \| "comfortable"` | 信息密度。   |
| `bordered`    | `boolean`                                 | 边框。       |
| `className`   | `string`                                  | 样式。       |

## 规则

- 只从 `"scone-ui"` 导入公共组件、服务和类型。
- 不使用 `scone-ui/components/ui/*`、源码路径、`@/components/ui`、`shadcn/ui` 或未文档化子路径。
- 不要套用其他库或原生元素的 props；不确定时读 `dist/index.d.ts`。
